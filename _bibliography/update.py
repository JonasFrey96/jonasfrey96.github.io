import bibtexparser

if __name__ == "__main__":
    input_file = "papers.bib"
    output_file = input_file.replace('.bib', '_tagged.bib')
    
    # Define tags and their matching criteria
    tags = {
        'icra': {
            'fields': ['booktitle', 'journal'],
            'keywords': ['International Conference on Robotics and Automation', 'ICRA'],
        },
        'iros': {
            'fields': ['booktitle', 'journal'],
            'keywords': [
                'Intelligent Robots and Systems',
                'IROS'
            ],
        },
        'rss': {
            'fields': ['booktitle', 'journal'],
            'keywords': [
                'Robotics: Science and Systems',
                'RSS'
            ],
        },
        'ral': {
            'fields': ['booktitle', 'journal', 'venue'],
            'keywords': [
                'Robotics and Automation Letters',
                'RAL'
            ],
        },
        'cvpr': {
            'fields': ['booktitle', 'journal'],
            'keywords': [
                'Computer Vision and Pattern Recognition',
                'CVPR'
            ],
        },
        'icml': {
            'fields': ['booktitle', 'journal'],
            'keywords': [
                'International Conference on Machine Learning',
                'ICML'
            ],
        },
        'corl': {
            'fields': ['booktitle', 'journal'],
            'keywords': [
                'Conference on Robot Learning',
                'CoRL'
            ],
        },
        'ram': {
            'fields': ['booktitle', 'journal'],
            'keywords': [
                'IEEE Robotics & Automation Magazine',
                'Robotics & Automation Magazine',
                'RAM'
            ],
        },
        'neurips': {
            'fields': ['booktitle', 'journal'],
            'keywords': [
                'Neural Information Processing Systems',
                'NeurIPS'
            ],
        },
        'tro': {
        'fields': ['booktitle', 'journal'],
        'keywords': [
            'IEEE Transactions on Robotics',
            'TRO'
        ],
        },
        'ram': {
            'fields': ['booktitle', 'journal'],
            'keywords': [
                'IEEE Robotics & Automation Magazine',
                'Robotics & Automation Magazine',
                'RAM'
            ],
        },
        'ijrr': {
            'fields': ['booktitle', 'journal'],
            'keywords': [
                'International Journal of Robotics Research',
                'IJRR'
            ],
        },
        'auro': {
            'fields': ['booktitle', 'journal'],
            'keywords': [
                'Autonomous Robots',
                'AuRo'
            ],
        },
        'tfr': {
            'fields': ['booktitle', 'journal'],
            'keywords': [
                'IEEE Transactions on Field Robotics',
                'Field Robotics',
                'TFR'
            ],
        },
    }
    
    def check_keywords(entry, tag_config):
        """Check if any of the specified fields contain the keywords"""
        for field_name in tag_config['fields']:
            if field_name in entry:
                field_value = entry[field_name].lower()
                for keyword in tag_config['keywords']:
                    if keyword.lower() in field_value and entry.get("workshop", "false") != "true":
                        return True
        return False
    
    # Read and parse the BibTeX file
    with open(input_file, 'r', encoding='utf-8') as f:
        bib_database = bibtexparser.load(f)

    # Process each entry
    for entry in bib_database.entries:
        # Check for tag matches
        for tag_name, tag_config in tags.items():
            if check_keywords(entry, tag_config):
                entry[tag_name] = "true"
    
    # Write the modified database to output file
    with open(output_file, 'w', encoding='utf-8') as f:
        bibtexparser.dump(bib_database, f)
    
    print(f"Processing complete. Tagged file saved as: {output_file}")
    print(f"Processed {len(bib_database.entries)} entries")
