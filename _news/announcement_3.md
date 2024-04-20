---
layout: post
date: 2024-4-20 12:00:00-0400
inline: true
related_posts: false
---

Our paper "Resilient Legged Local Navigation: Learning to Traverse with Compromised Perception End-to-End," has been nominated for the Best Paper Award for ICRA2024!
Key Insights:

- **Unreliable Perception Systems**: It's impossible to always guarantee the reliability of perception systems.
- **Need for Advanced Planning**: There is a critical need for planners that can detect failures in perception systems and react appropriately.
- **Use of Proprioceptive Data**: Detecting these failures is feasible through the use of proprioceptive data.
- **Limitations of Traditional Methods**: Classical planning methods often fail to utilize such data effectively, prompting the need for innovative solutions.
- **Using RL to Discover Emerging Navigation Strategies**: Rather than relying on handcrafted heuristics, we use reinforcement learning (RL) and expose the robot to an environment with various types of perception failures. Our asymmetric actor-critic framework discovers emerging navigation strategies.
