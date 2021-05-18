---
layout: post
title: Continual Learning - Basics
---
<img align="right" src="{{ site.baseurl }}/images/procreator/symbol.jpg" height="75"/>
In this post we will have a first glance into continual learning.




## Motivation
<!-- <p align="right"> -->

<!-- </p> -->
Currently machine learning relies on large datasets that densely sample the data distribution of the target domain to achieve a generalization to the test data.
Most architectures rely on gradient based optimization procedures which rely on the assumption of independent and identically distributed samples (i.i.d). This assumption is necessary such that the gradient points towards a meaningful direction that leads to good convergence behavior and avoids local minimas.
This procedure has shown great success at a variety of tasks but this training procedure comes with intrinsic limitations:

### Distribution Change

<img src="{{ site.baseurl }}/images/procreator/domain.jpg" alt="drawing"/>

**Domain Shift**: It is often the case that your available training data does not align with your target data domain.
In the above figure on the left the ideal scenario is presented.
You were able to capture data points (red) within your training set such that they cover the same space as the target data distribution. We can assume that a network that performs well on the training data generalizes to the target data.

On the right a domain shift between the target and training domain is present.
We don't expect a model trained on the training data to generalize to the test data.
This is for example the case when you train on data generated in a simulator and perform inference on real world data. (Sim-To-Real Use Case) 

<img src="{{ site.baseurl }}/images/sim_to_real.png" alt="drawing" height="100"/>

**Temporal Domain Shift**:
In other scenarios the target domain undergoes temporal changes.
For example when recognizing the street in an autonomous vehicle the appearance of the street changes from day to night and across seasons.
Another example might be if you want to have a model that learns about the political landscape across nations.


Given that for certain applications it is not possible to create a training dataset that covers all information that is needed in the future a dire need for a tool or procedure that allows to continually integrate new information into a network is present. **Continual learning faces this challenge**


### Does this boil down to generalization?
Why do we want to research continual learning? One might argue that in both cases the problem is a lack of data. In theory we can scale up the training dataset and include the new data points.
Therefore our networks would be able to generalize to a larger data domain. We would not need to invest time and resources with continual learning. 

You are right! This procedure is currently executed when a network is employed in real-world applications. The networks are either fine-tuned or fully re-trained on an enriched dataset that includes the new data. A whole ecosystem and tool-chains have been created to manage datasets and constant retraining and employing of updated networks.


But there are multiple reasons why this is not the right way going forward.  
**1. Cost:** Retraining a network from scratch is expensive and a single large scale language model can cost multiple 100k$ to train. With growing network sizes this problem will even get worse in the future.  
**2. Non-stationary data:** Given that our world is highly dynamic the data distribution is constantly changing. For some applications given the fast change of the data retraining from scratch is simply impossible.  
**3. Supervision:** When creating a dataset the highest investment is not the collection of the data but the labeling of it. Therefore constantly enlarging the dataset is expensive.    


<!-- Given that the leaders change over time the network needs to be capable of constantly incorporating new knowledge about politics. Otherwise it is not possible to know that Joe Biden is the current president of the United States.

In the later scenario it's clear that integrating knowledge over time is essential. This is currently done bei either fine-tuning the network or fully retraining the network on an enriched dataset that includes data that has to be collected from the shifted domain.For large scale networks this is time and resource intensive. -->
### Human Learning as a role model
<img src="{{ site.baseurl }}/images/learning_comic.jpg" alt="drawing" width="300"/>

Humans are capable of learning from a continual stream of incoming sensory information.
We are able to actively explore our environment and make use of the incoming information. 
Our brain therefore (while fully functioning) performs continual learning, which has shown to be an evolutionary advantage compared to other species.
Our brain is the working example that it's possible to create a learning system that constantly integrates new knowledge.

### Plasticity-stability dilemma
**Plasticity** is a term used in biology to describe the ability of a brain to acquire, learn or integrate new knowledge. The major functionality of the human brain is established by about 10^11 neurons. Each neuron is in average connected by 7000 synapses to other neurons. To incorporate new knowledge the neurons are constantly rewired. 
<img src="{{ site.baseurl }}/images/continual-learning/plasticity.png" alt="drawing" height="300"/>  

In the above figure the strength of the lines visualize the weight between two fully-connected layers. When the network is trained the weights of these connection changes such that new information is acquired

**Stability** on the other hand describes the phenomenon that we are able to keep a stable memory and representation of our acquired knowledge.  



When training neural networks both of these properties are desirable but also **counteract** each other. This is the reason why this is doubt the **Plasticity-stability dilemma**. For example a DNN is able to perfectly fit data given for a new task, when no constraint of preserving the knowledge learned for the previous task. Therefore the plasticity in this training procedure is maximized. On the other hand, if we do not change any parameters in our neural network when facing a new task stability is perfectly guaranteed but on the down side nothing new is learned. In continual learning we want to simultaneously maximize plasticity while preserving stability.

<!-- ### Difference to RL

<img src="{{ site.baseurl }}/images/rl.jpg" alt="drawing" height="200"/> -->

## Continual Learning Basics 

### **Task**
We define a task $$T_i$$ as a learning objective, where data x should be mapped to the label $$y$$. This learning objective corresponds to finding a target function $$g: g(x)=y$$.

In this definition each task $$T_i$$ indexed by $$i$$ is defined as a separate learning experience.
In reality often task boundaries are not clearly defined.
Therefore the current learning task index $$i$$ is not known.
Also there might be overlap between the training data from one task and another.


### **Data**
Each task $$T_i$$ is associated with a dataset which contains data
$$ \mathit{D} = \{ \mathbf{x}_i, \mathbf{y}_i \} $$ 
The datasets might vary in size and data-types.
One task might be detection cars from images. 
The other recognizes pedestrians from RADAR data.

### **Supervision**  
<img src="{{ site.baseurl }}/images/procreator/supervision.jpg" alt="drawing"/>  

It is important when formulating a continual learning scenario which kind of supervision is given. We can categorize datasets into the following categories:

**1. Supervised:** For **ALL** training examples $$x_j$$ a correct label $$y_j$$ is available.
This is the most expensive data given the cost of labeling. 
On the other hand fully supervised learning results often in the best performance.

**2. Semi-Supervised:** For **SOME** training examples $$x_j$$ a correct label $$y_j$$ is available.
This is often used when labeling is expensive but large amount of data is available.

**3. Unsupervised:** For **NON** training example a supervision signal is present.
This is commonly used for clustering or in scenarios where a supervision signal can be generated by the model.
For example, language models are trained to predict the next word in a sentence.
The training signal is created by masking the original sentence without any human supervision.



### **Prior Knowledge**  
What information do we know about the learning task?
Can we integrate this knowledge into our model or training procedure? 
One example might be when performing object classification in images. Here we know it doesn't matter where an object is present in the image. 
Therefore translation invariance would be a great property for our model architecture. This is achieved by using convolutional filters. 
Therefore when we manually design our model architecture we can encode our prior knowledge about the task.
When we know a-priori when a new task $$ T_i $$ starts we can use this information for tuning our training strategy. 


### **Constraints**  
1. **Computation:**  
How fast do we need to integrate the new knowledge? (Training Time / Hardware)  
How fast do we need to perform inference? (Inference Time / Hardware)  

2. **Memory:**  
What are the memory limitations?
GPU Memory Size / Model Size, Memory size, Size of a Single Datapoint, Number of Datapoints, Write/Read Speed of the Memory (RAM -> GPU, SSD -> GPU, HDD -> GPU))


## Continual Learning Scenarios:

<!-- <img src="{{ site.baseurl }}/images/stream_sequential_learning.jpg" alt="drawing"/> -->

<p align="center">
<img src="{{ site.baseurl }}/images/procreator/sequences.jpg"/>
</p>


Steam/Online Learning
- samples are visited only once
- samples are non i.i.d
- most realistic scenario for many applications
- most challenging
- no clear task boundaries

Sequential Task Learning
- relaxes constraints
- task boundaries
- each task is described by a batch of data

Both scenarios can have known and unknown class boundaries.
Most significant in sequential task learning is that all data for a task is **available at once**. The data within this task may be shuffled.
This is not the case for stream learning where for example data is acquired by a continual sensory input such as a camera video stream. 

## Continual Learning Strategies:
### Architectural
<img src="{{ site.baseurl }}/images/procreator/architecture.jpg" alt="drawing"/>  

For each new task the model architecture is expanded.
Given that a new task increases the overall data complexity it is reasonable to also increase the model complexity.
Most of the time separate task specific prediction heads are added to the model. 
The common layers can be interpreted as a backbone feature extraction module that has to extract good features over all tasks (shown in grey). The task specific layers only have to handle data points by its task. Therefore these layers are highly specialized for each task.
It's clear that this procedure is limited when no clear task boundaries are present.

### Regularization

There are multiple studied regularization approaches. One might freeze specific layers in the model architecture when training for a new task. Another approach might penalize the weight shift of the model compared to the weight when trained for the previous task. 
The underlying assumption is that the performance on the previous task will be better when the network weights ("The learned mapping from $$x$$ to $$y$$") is not changing drastically when training for a new task. This regularization should reduce overfitting on the new task and might be compared to classic L2 penalty in linear regression. In linear regression the L2 penalty functions as a penalty term to find a simple model that fits the data best. In our scenario the penalty term motivates to find a model that is close (in weight space) to the model

<img src="{{ site.baseurl }}/images/procreator/loss_regularization.jpg" alt="drawing"/>  

In the above figure the weight spaces of our model is illustrated. For simplicity our model consists of 2 weights $$w1$$ and $$w2$$.
When training for Task $$ T_1 $$ the optimal parameters $$ w_T1^* $$ was found. Now the equipotential lines for $$T_2$$ are illustrated. Without any regularization we would obtain $$w_T_2^*$$ as our new optima. (left Figure.)
Given the constraint that our new parameters should be close in weight space the loss landscape is modified and $$ w\hat_t2 $$ is the found optima. 

### Rehearsal
<img src="{{ site.baseurl }}/images/procreator/rehearsal.jpg" alt="drawing"/>

The idee of rehearsal methods is to gather samples from previous tasks. These samples can then be mixed with the new data. Therefore during training the weight update includes samples from previous tasks, which will motivate the network to perform well on the stored samples as well as the new data. Storing the samples from previous tasks is memory intensive. For most applications a carefully selected subset of the data of the previous task is chosen to be stored. 
With the growing number of tasks the training procedure takes longer given that more data from previous tasks has to be replayed.

### Generative Replay

Instead of storing the data-point and the associated label a generative network is trained to fit the data distribution of the previous task. 
In contrast to the normal rehearsal approach the samples of an old task can be generated by sampling from the generator network. 
Also during training for a new task a generative model and the actual model of interest have to be trained. 
The size of the generative model weights are often orders of magnitudes smaller than the actual samples. 
Also the generator network might be able to filter out noise such that only relevant information is retained.
Training a generative network from the perspective of information theory can be interpreted as compressing the previous task data into the model weights of the generator.
On the downside training a generative network might be burdensome, computational expensive and might miss important information of the original data. 


