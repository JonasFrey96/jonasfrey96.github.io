---
layout: post
title: Continual Learning - Basics
---

In this post we will have a first glance into continual learning.

## Motivation
Currently machine learning relies on large datasets that densely sample the data distribution of of the target domain to achieve a generalizing to the test data domain.
Currently DNNs are trained by gradient based methods which rely on the notion of independent and identically distributed samples. (i.i.d)
A batch of randomly selected samples is used in stochastic gradient descent to calculate the weight update for the neural network. 
This procedure has shown great success on a variety of tasks but this approach suffers multiple limitation:

1. Changing data distribution
In a lot of scenarios the target domain undergoes temporal changes.
For example when recognizing the street in an autonomous vehicle the appearance of the street changes from day to night or across seasons.
An other example might be if you want to have a model that learns about political landscape across nations. Given that the leaders change over time the network needs to be capable to constantly incorporate new know about politics. Otherwise it is not able to know that Joe Biden is the current president of the United States. 
In the later scenario its clear that integrating knowledge over time is essential. This is currently done bei either fine-tuning the network or fully retraining the network on an enriched dataset that includes data that has to be collected from the shifted domain.For large scale networks this is time and resource intensive.
### Human Learning as a role model
Humans are capable to learn from a continual stream of incoming sensory information. 
A human is able to actively explore his environment and make us of the incoming information by its environment. 
We therefore entangle exploration and learning.


### Plasticity-stability
Plasticity is term used in biology to describe the ability of a brain to aquire and learn new knowledge. A major part of the capability of the human brain is established by rougly 10^11 neorons. Each neuron is in average connected by 7000 synapses to other neurons. To incorporate new knowledge the neurons are constantly rewired. Stability on the other hand describes the pheonomen that we are able to keep a stable memory and representation of our aquired knowledge.

<![_config.yml]({{ site.baseurl }}/images/continual-learning/plasticity.png)>

When training neural networks both of these properties are desirable but also counteract each other. For example a DNN is able to perfectly fit data given for a new task, when no constaint of perserving the knowledge learned for the previous task. Therfore the plastisticy in this form of training is maximed. The oher way around if we do not change any parameters in our neural network when faceing a new task stability is perfectly garuanted but on the down side nothing new is learned. In continual learning we face the problem of simultaneously allowing plastisticy and preserving stability.


### Adaptability and Scalability


### Difference to RL


## Continual Learning Basics 

Task
-task boundaries

Data
- data size
- type

Supervison

Prior Knowledge

Constraints:
- Computation
- Memory


## Continual Learning Scenarios:
Steam or Online Learning
- samples are visited only once
s
Sequential Task Learning
- relaxes constraints
- batch learning
- hard task boundaries
- example of MNIST digit classification


## Continual Learning Algorithms:
<![_config.yml]({{ site.baseurl }}/images/continual-learning/types.png)>


### Regularization

### Architectural

### Rehearsal
### Generative Replay





<!-- <![_config.yml]({{ site.baseurl }}/images/config.png)> -->
