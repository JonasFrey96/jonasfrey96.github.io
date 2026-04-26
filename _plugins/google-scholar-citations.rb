require "active_support/all"
require 'nokogiri'
require 'open-uri'
require 'json'
require 'fileutils'

module Helpers
  extend ActiveSupport::NumberHelper
end

module Jekyll
  class GoogleScholarCitationsTag < Liquid::Tag
    CACHE_FILE = File.join(Dir.pwd, '_data', 'citations_cache.json')

    # In-memory cache for the current build (formatted strings, e.g. "1.2K").
    Citations = {}

    # Persisted cache from previous successful builds. Loaded once at startup.
    PreviousCitations = if File.exist?(CACHE_FILE)
                          begin
                            JSON.parse(File.read(CACHE_FILE))
                          rescue JSON::ParserError
                            {}
                          end
                        else
                          {}
                        end

    def initialize(tag_name, params, tokens)
      super
      splitted = params.split(" ").map(&:strip)
      @scholar_id = splitted[0]
      @article_id = splitted[1]

      if @scholar_id.nil? || @scholar_id.empty?
        puts "Invalid scholar_id provided"
      end

      if @article_id.nil? || @article_id.empty?
        puts "Invalid article_id provided"
      end
    end

    def render(context)
      article_id = context[@article_id.strip]
      scholar_id = context[@scholar_id.strip]
      article_url = "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=#{scholar_id}&citation_for_view=#{scholar_id}:#{article_id}"

      # Skip fetching outside of production builds — return a random placeholder
      # so local `docker compose up` doesn't hit Google Scholar for every paper.
      if ENV['JEKYLL_ENV'] != 'production'
        GoogleScholarCitationsTag::Citations[article_id] ||= rand(0..100).to_s
        return GoogleScholarCitationsTag::Citations[article_id]
      end

      # Already resolved this article in the current build.
      if GoogleScholarCitationsTag::Citations[article_id]
        return GoogleScholarCitationsTag::Citations[article_id]
      end

      citation_count = nil

      begin
          # Sleep for a random amount of time to avoid being blocked
          sleep(rand(1.5..3.5))

          # Fetch the article page
          doc = Nokogiri::HTML(URI.open(article_url, "User-Agent" => "Ruby/#{RUBY_VERSION}"))

          # Look for meta tags with "name" attribute set to "description"
          description_meta = doc.css('meta[name="description"]')
          og_description_meta = doc.css('meta[property="og:description"]')

          if !description_meta.empty?
            cited_by_text = description_meta[0]['content']
            matches = cited_by_text.match(/Cited by (\d+[,\d]*)/)

            if matches
              citation_count = matches[1].sub(",", "").to_i
            end

          elsif !og_description_meta.empty?
            cited_by_text = og_description_meta[0]['content']
            matches = cited_by_text.match(/Cited by (\d+[,\d]*)/)

            if matches
              citation_count = matches[1].sub(",", "").to_i
            end
          end

      rescue Exception => e
        # Print the error message including the exception class and message
        puts "Error fetching citation count for #{article_id} in #{article_url}: #{e.class} - #{e.message}"
        citation_count = nil
      end

      if citation_count.nil?
        # Fetch failed (timeout, blocked, page structure changed, etc.).
        # Fall back to the previously cached value so we never overwrite a
        # known-good count with 0/N/A.
        if GoogleScholarCitationsTag::PreviousCitations.key?(article_id)
          cached = GoogleScholarCitationsTag::PreviousCitations[article_id]
          puts "Could not fetch citation count for #{article_id}; using cached value: #{cached}"
          citation_count = cached
        else
          puts "Could not fetch citation count for #{article_id} and no cached value exists; returning N/A"
          citation_count = "N/A"
        end
      else
        citation_count = Helpers.number_to_human(citation_count, :format => '%n%u', :precision => 2, :units => { :thousand => 'K', :million => 'M', :billion => 'B' })
      end

      GoogleScholarCitationsTag::Citations[article_id] = citation_count
      persist_cache
      return "#{citation_count}"
    end

    private

    def persist_cache
      # Merge previous cache with this run's results so we don't lose entries
      # that weren't requested in this build. Skip "N/A" entries — they don't
      # represent a known-good value worth persisting.
      merged = GoogleScholarCitationsTag::PreviousCitations.merge(
        GoogleScholarCitationsTag::Citations.reject { |_, v| v == "N/A" }
      )

      FileUtils.mkdir_p(File.dirname(CACHE_FILE))
      File.write(CACHE_FILE, JSON.pretty_generate(merged))
    rescue => e
      puts "Failed to persist citations cache: #{e.class} - #{e.message}"
    end
  end
end

Liquid::Template.register_tag('google_scholar_citations', Jekyll::GoogleScholarCitationsTag)
