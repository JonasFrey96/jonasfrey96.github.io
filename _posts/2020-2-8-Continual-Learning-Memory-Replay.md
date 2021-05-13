---
layout: post
title: Continual Learning - Memory Replay
---
<img align="right" src="{{ site.baseurl }}/images/procreator/symbol.jpg" height="75"/>

In this blog post I will walk you through one of the most promising methods to avoid catastrophic forgetting in neural networks: **Memory Replay**. At first will elaborate the working principles of a memory buffer. In a short math section we will formulate learning without forgetting.

Then we will introduce all design considerations of a replay buffer when training a neural network. 


## Working Principle of a Memory Buffer

As mentioned in the previous blog post[ Continual Learning Basics](https://jonasfrey96.github.io/Continual-Learning-Basics/) a major challenge in continual learning is catastrophic forgetting. This problem can be mitigated by memory replay. We use the terms rehearsal and memory replay and experience replay interchangeable. All of them refer to methods that mitigate catastrophic forgetting by storing samples from previous tasks.

Core working principle:

1. While training on a task a set of **samples** is **stored** in the memory buffer $$M$$.
2. When training on a new task, samples from the new task and **replayed samples** from the memory are utilized  to calculate the weight update of  the network.
3. The knowledge over the old samples motivates **plasticity** (preserving the previously learned knowledge) while the new samples **motivate integrating new knowledge**.


### Formulation: Learning without Forgetting:

We can formulate the training object as a constrained optimization problem. Our network is a function $$f_{\theta}$$ parametrized by $$\theta $$.
We want to find a parameter updated for the i-th sample $$ (\mathbf{x}_i,\mathbf{y}_i) $$ such that the performance on the previous samples is not decreased.

To achieve this we have to solve the following constrained optimization problem:

$$ \theta^t = \operatorname*{argmin}_\theta l(f(x_t;\theta),y_t) $$

$$st. l(f(x_i; \theta),y_i) \leq l(f(x_i ; \theta ^{t-1}),y_i); \forall i \in [0..t-1] $$ 

Where $$ l $$ is the loss function. Finding the best current weights $$\theta^t$$ is constrained to not increase the loss on an previously seen samples $$ i \in [0..t-1] $$.

For each new data-point a further constraint is established. The number of constraints therefore grows linearly with the number of previously seen samples. Solving this optimization problem is not traceable for a large number of samples $$ t $$. 

Despite this formulating training, a network of new samples as an optimization problem leads us to the following insight. At some point when in theory solving this optimization problem and the number of constraints add up we are not allowed to change the parameter vector in any direction given that one of the constraints will be violated. Also given that we have a lot of constraints we can assume that some are redundant. This means some constraints (samples) can be removed without changing the optimization problem.

Given this insight naturally the question arises which data-points (constraints) are non-redundant. [**Q1**] This is part of the motivation why we want to use memory buffers and are not keeping track of all previously learned data-points. Also what is a good number of samples of pervious task to keep track off [**Q2**].

[Formulation Learning without forgetting](https://arxiv.org/pdf/1903.08671.pdf)

### Optimization using SGD
Stochastic Gradient Descent is defined by the following update rule:

$$ \theta_{t+1} = w_t + \mu \frac{\theta}{d\theta} \Sigma_i^{BS} l(f_w(x_i),y_i) $$ 

The first order gradient with respect to the models parameters is calculated over the loss induced by the sum off all elements in the batch. When we now differentiate between replayed and new samples we can assign explicitly the contribution to the weight updated split into new and replayed samples.

$$ \theta_{t+1} = w_t + \mu( \frac{\theta}{d\theta} \Sigma_i^{new} l(f_w(x_i),y_i) + \frac{\theta}{d\theta} \Sigma_j^{old} l(f_\theta(x_j),y_j) )$$ 

We enumerate samples form a previous task using j and i for the new tasks.
In the upper formula we introduced the $$ new $$, and $$ old $$ which specify the number of new samples and replayed samples used to calculate the weight update. These are essential parameters for the experience replay continual learning strategy and how do we set them correctly [**Q3**]. In vanilla SGD we randomly sample the elements of each batch. What is a good procedure to sample the elements of the memory replay buffer [**Q4**]. Interestingly usually one parameter that is often overseen in the Continual Learning literature when evaluating new methods is the learning rate $$ \mu $$. If we use a very low learning rate the plasticity is guaranteed because effectively we freeze the model weights. On the other hand using a higher learning rate allows us to increase the overall plasticity of the learning system while risking the stability of previously learned knowledge.


## Experiments
By just looking at a few euations and properties of the optimization procedure, used to train neural networks we were facing mutiple question on how we actually implement memory replay and what kind of hyper-parameters we should be aware of.

## Experiment Setup:
To conduct experiments we have chosen the semantic segmentation network  [Fast-SCNN](https://arxiv.org/abs/1902.04502). This networks is relatively small and shows good performance while being extremely fast during inference. Also the architecture is separated into different modules which produce feature representations at different scales, which we will use later. 

<p align="center">
<img src="{{ site.baseurl }}/images/ml-hypersim/fast-scnn.png" height="200" />
</p>

We implement all experiments using PyTorch / PyTorchLightning and provide the training results in form of NeptunAI logs.


We conduct all experiments on the [ML-Hypersim](https://github.com/apple/ml-hypersim) dataset provided by Apple which consists of rendered indoor scenes.
The images are rendered photorealitically and are separated into different scenes. A total of 461 indoor scenes are available with multiple camera trajectories with dense ground truth annotations for depth and semantic labels. The objects in the scene are labeled according to the NYU40 classes.

<p float="middle">
  <img src="{{ site.baseurl }}/images/ml-hypersim/1.jpg" width="170" />
  <img src="{{ site.baseurl }}/images/ml-hypersim/2.jpg" width="170" /> 
  <img src="{{ site.baseurl }}/images/ml-hypersim/3.jpg" width="170" />
  <img src="{{ site.baseurl }}/images/ml-hypersim/4.jpg" width="170" />
</p>
The separation into scenes allows us to create sequential learning tasks for each scene or an ensemble of scenes.

For our experiments we group 15 scenes into one task. Given that no official test/training split exists we use the last 20% of each trajectory as the validation data.
Each task consist of ~2000 training images and ~500 validation images.
To study continual learning with memory buffer we observed that all relevant effect are visible when training on 4 tasks in total. In total our datasets consists of a total of 10000 images.

#### Why did we choose semantic segmentation:
Semantic segmentation often builds the foundation for follow up components in robotics, autonomous driving, video editing and many more.

In recent work by [] is shown that it is possible to create semantic segmentation labels in a fully unsupervised manner.


This can enable the following use-case:  

<!-- <p align="center">
<img src="{{ site.baseurl }}/images/car_example.jpg" />
</p> -->

<p align="center">
<img src="{{ site.baseurl }}/images/procreator/usecase.jpg"/>
</p>

A robot drives around in a novel city (1). Meanwhile it is able to unsupervised create labels for the new scenery (2). The generation of the labels is achieved by fusing information from various sources such as depth estimation, optical flow or the pose of the car. Creating these labels is computational expensive and can not be performed in real-time such that the labels can not be used while driving. 
Continual learning on the generated labels allows the robot to adapt to its environment (3).  
When continual learning is implement successfully this allows to improve the semantic segmentation estimate while on the mission when revisiting the same street in the city while preserving on knowledge (4).

## Learning Baselines

### Optimal solution
A simple baseline for the optimal performance that can be achieved over all tasks is by training the network on the data of all tasks T_i simultaneously. We use the accuracy (Percentage of correctly classified labels) as performance measurement for the semantic segmentation network.
<p align="center">
<img src="https://latex.codecogs.com/gif.latex?Accuracy = \frac{TP\: + \: TN}{TP \: + \: TN \: + \: FP\:  + \: FN}" /> 
</p>
This training procedure results in the following acc-scores for each task.
We can observe that some tasks are harder than other ("Lower accurary") but all are high.
[ 0.84, 0.84, 0.73, 0.78]


#### Training Details:
For training we use 4xRTX2080Ti and train for 4 hours. 
This correspondences to 50 epochs when one epoch is considered the full 10.000 Images. 
We use an effective batch size of 64 and use data distributed parallel training backend. For more implementation details we refer to the publicly available code on [https://github.com/JonasFrey96/ASL](https://github.com/JonasFrey96/ASL).

<!-- As an optimizer we use ADAM with a learning rate of 0.003 and a polynomial learning rate schedule. -->
### Naive implementation
To show the significance of catastrophic forgetting we trained 4 tasks sequentially with standard gradient based optimization. We validate the performance on all tasks after each epoch and plot the performance in figure (2.). The background color of the task indicates the currently trained task.

<p align="center">
<img src="{{ site.baseurl }}/images/memory-replay/acc_line_plot.png"/>
</p>

We can observe that the accuracy for the currently trained task increases rapidly, while the accuracy for the other task decreases.
When only logging the accuracy achieved after training for a task we can create the following matrix:

<p align="center">
<img src="{{ site.baseurl }}/images/memory-replay/acc_matrix.png" width="500" />
</p>

Each row correspondences to training on a task. So in the 0-th row we log the validation results achieved on all tasks after training on task 0. In the 1-th row we have been training on task 0 and 1. We can observe that the diagonal elements are the highest. This is due to that the training procedure just has been applied to this task without any regularization or other measures that motivate knowledge preservation of the previous task. Ideally we would like to achieve high values on the lower left and diagonal elements. The first colum indicates the forgetting for task 0. We can see that the accuracy for task 0 is decreasing over the training procedure. 

When implementing the naive sequential learning we can observe that nearly all knowledge learned on the previous task is directly forgotten.

### Random Replay Buffer:
We now implement a **template random replay buffer**. For each task we create a buffer which we randomly populate with samples from the current task. When we train on the next task we randomly sample with a probability *p* a element form the buffers of the previous tasks.
We set the probability of sampling form the buffer in an task-specific adaptive fashion according to the following formula:
 
p_{T_i} = \frac{i-1}{i} 

This results in an increased rehearsal probability with increasing task number.
The underlying assumption for this formula is that each task should be equally likely sampled. 
With this template random replay buffer we were able to successfully mitigate catastrophic forgetting and the following validation performance is achieved:

<p align="center">
<img src="{{ site.baseurl }}/images/memory-replay/acc_matrix.png" width="200" />
</p>


We also plot the number of samples from the current task and the rehearseled. 

When training a new task we reset the counter for both new and reharseled samples. We can observe that the slope of the new samples is decreasing while the slope for rehearsaled elements is increasing. 

In the matrix-result block we can observe that all lower diagonal increased significantly. Despite this we are not able to match optimal solution which was achieved by training simultaneously on all tasks.

## Design Considerations of Memory Buffers:

<p align="center">
<img src="{{ site.baseurl }}/images/procreator/buffer_size.jpg"/>
</p> 

In the prior experiments we have seen a naive and optimal baselines. We have also observed that a random memory buffer is able to avoid catastrophic forgetting. In the following we will perform modifications to the template random replay buffer. This allows us to discuss importance of certain parameters and design choices.

We will procedure in this section as follows:
1. Empirically motivate why we look into this aspect of the replay buffer 
2. Suggest modifications, different strategies and hyper-parameters choices 
3. Perform and evaluate experiments
4. Conclude if they align with our intuition or set them in context.
5. What is the take a way for your project.

### Buffer Size



One of the most important parameters is the size of the buffer. We set it to 10% of the training data. We performed the same experiment with 1%, 20%, 100%. 100% results in store all the samples in the training set. In the table we plot the accuracy achieved on each task after the full training procedure with different memory buffer sizes.



| Method      | Task 0 | Task 1 | Task 2 | Task 3 |
|-------------|--------|--------|--------|--------|
| 1           |        |        |        |        |
| 10          |        |        |        |        |
| 20          |        |        |        |        |
| 100         |        |        |        |        |
| Optimal     |        |        |        |        |
| Naive       |        |        |        |        |



We can observe that even though we are able to store all the samples in the buffer the solution deviates from the optimal one. This is due to the fact the while training on the first task only samples for the first task are available.


### Sampling

As we have seen previously there are multiple design considerations when we think about sampling from the buffer. Previously we have seen adoptive sampling where the probability of obtaining a buffer sample is chosen individual for each task according to the following formula:

Latex  
p_{T_i} = \frac{i-1}{i}   
Latex


We also perform experiments with different fixed rehearsel probabilities with probability p_{fix}. 

The downside of this method is that after training the 4 task a sample form task 1 is visited more often then a sample from the final task.

In general we can observe that increasing the replay probability will motivate knowledge preservation but hinder integrating new knowledge.


### Training time: 

#### Step based
One very important factor when training for a new task is the number of steps/epochs. When oberserving the learning progress of the validation accurracy we can clearly correlate performance increase on the current task with performance decrease on previous task. To showcase the significance on the results we have trained the network with the template replay buffer method for different amount of epochs per task. We have chosen, [10,50,100]. Here one **step based epoch** is defined as fixed number of training steps =  |Task_i|/BS.

To avoid the dependency on the rehearsel probability we can define an **effective epoch**. This is defined by the number of times a sample from the current task has been feed to the network.
For example with a rehearsel probability of 0.5 when training for task 1 with 2000 samples and being in **Step based epoch**=10. The network was trained with 2000/BS x 10 update steps. Given the rehearsel probability of 0.5 each sample was seen 10x(1-0.5)=5 times by the network. This leads to 5 effective epochs.

#### Metric based
<!-- When looking at the results in matrix from we can see that the diagonal elements (performance on the currently active task) increases with training time and the knoledge preservation decreases (lower diagonal elements).  -->

Naturally the question arises what is the best number of epochs or training time. In classical neural network training early stopping has shown to be a valuable tool to determine when to stop training a network. For this the accuracy on the validation dataset is monitored and used to determine when **overfitting** is reached and training should be stopped. We can perform the same when training for each task individually. The downside of this early stopping based method is that we do not take the previous task performance into account.
**Forgetting based** early stopping:
Instead of using the validation accuracy on the current task we can limit the amount of "toleratable forgetting".

We define forgetting based on the following formula:

Latex  
ma ma ma   
Latex  

Obviously a combination of current task performance and forgetting measurement can be used. By this method we introduce new hyper-parameters that might need tuning for training the neural network but we avoid simply choosing some empirically number of training epochs. The number of steps to train might change drastically from task to task but metric based methods might generalize better from task to task.

### Augmentation
A key element we observed while training the neural network is data augmentation. Data augmentation is shown to avoid overfitting increase the generalization capability of neural networks. This is especially useful in scenarios where limited data is available.
The transformations such as color jitter, illumination changes or random cropping for vision task should not change the network prediction. Therefore we motivate the network to become invariant to these transforms. We can encode our prior domain knowledge in the neural network by designing augmentation methods that preserve the label. 


Because its to expensive to store all samples from previous tasks, we assume that augmenting the samples stored in the replay buffer is key. Otherwise no general concepts of these samples are learned but the network is only able to perform simple memorization of the samples within the buffer.

We ran the reference random replay buffer with and without data augmentation. The resulting performance is seen in figure ().

<p align="center">
<img src="{{ site.baseurl }}/images/memory-replay/acc_matrix.png" width="200" />
<img src="{{ site.baseurl }}/images/memory-replay/acc_matrix.png" width="200" />
</p>


The performance increase is drastic. We can conclude that whenever we are able to implement data augmentation this should be done.


### Advanced Filling
What do we want to achieve.
Support Vector Graphics

- random
- criterion driven:
  - uncertainity
  - loss
### Advanced Sampling
- random
- proportional
- metric driven
	- loss

### Labels
#### Student Teacher Explained
#### Hard
#### Soft
#### Ground Truth
