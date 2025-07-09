// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "About",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-publications",
          title: "Publications",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-teaching-amp-honors",
          title: "Teaching &amp; Honors",
          description: "Teaching Experience.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/teaching/";
          },
        },{id: "nav-cv",
          title: "CV",
          description: "Academic CV.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/the_godfather/";
            },},{id: "news-i-received-my-master-from-eth-zurich-in-robotics-systems-and-contol-graduating-with-summa-cum-laude",
          title: 'I received my Master from ETH Zurich in Robotics Systems and Contol graduating...',
          description: "",
          section: "News",},{id: "news-our-work-sparkles-continual-learning-of-semantic-segmentation-using-complementary-2d-3d-data-representations-sparkles-received-the-best-paper-runner-up-award-at-neurips-2021-4th-robot-learning-workshop-self-supervised-and-lifelong-learning-link",
          title: 'Our work: :sparkles: “Continual Learning of Semantic Segmentation using Complementary 2D-3D Data Representations”...',
          description: "",
          section: "News",},{id: "news-we-re-thrilled-to-announce-that-our-grant-application-for-sparkles-fostering-research-on-mobile-robotics-with-high-quality-data-and-open-tooling-sparkles-has-been-accepted-we-aim-to-provide-researchers-with-tailored-high-quality-data-for-legged-robots-to-establish-standardized-benchmarks-and-foster-the-development-of-future-algorithms-stay-tuned-for-updates-as-we-advance-mobile-robotics-research-special-thanks-to-turcan-tuna-marco-hutter-and-cesar-cadena-learn-more-about-the-open-research-data-initiative-here-link",
          title: 'We’re thrilled to announce that our grant application for :sparkles: “Fostering Research on...',
          description: "",
          section: "News",},{id: "news-our-paper-resilient-legged-local-navigation-learning-to-traverse-with-compromised-perception-end-to-end-has-been-nominated-for-the-best-paper-award-for-icra2024-key-insights-unreliable-perception-systems-it-s-impossible-to-always-guarantee-the-reliability-of-perception-systems-need-for-advanced-planning-there-is-a-critical-need-for-planners-that-can-detect-failures-in-perception-systems-and-react-appropriately-use-of-proprioceptive-data-detecting-these-failures-is-feasible-through-the-use-of-proprioceptive-data-limitations-of-traditional-methods-classical-planning-methods-often-fail-to-utilize-such-data-effectively-prompting-the-need-for-innovative-solutions-using-rl-to-discover-emerging-navigation-strategies-rather-than-relying-on-handcrafted-heuristics-we-use-reinforcement-learning-rl-and-expose-the-robot-to-an-environment-with-various-types-of-perception-failures-our-asymmetric-actor-critic-framework-discovers-emerging-navigation-strategies",
          title: 'Our paper “Resilient Legged Local Navigation: Learning to Traverse with Compromised Perception End-to-End,”...',
          description: "",
          section: "News",},{id: "news-i-ve-officially-finished-my-ph-d-supervised-by-marco-hutter-georg-martius-and-cesar-cadena-deep-thanks-to-my-committee-members-and-long-term-collaborators-maurice-fallon-and-shehryar-khattak-for-their-support-over-the-years",
          title: 'I’ve officially finished my Ph.D., supervised by Marco Hutter, Georg Martius, and Cesar...',
          description: "",
          section: "News",},{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
