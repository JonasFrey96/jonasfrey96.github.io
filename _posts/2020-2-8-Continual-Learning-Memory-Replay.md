---
layout: post
title: Continual Learning - Memory Replay
---
<img align="right" src="{{ site.baseurl }}/images/procreator/symbol.jpg" height="75"/>
In this blog post I will walk you through one of the most promising methods to avoid catastrophic forgetting in neural networks.
At first will elaborate the working principles of a memory buffer. 
In a short math section we will formulate learning without forgetting.

Then I will introduce all design considerations of a replay buffer when training a neural network. 
All conducted experiments will be based on a semantic segmentation network and the ML-Hypersim dataset. 


## Working Principle of a Memory Buffer
As mentioned in the previous blog post [Continual Learning Basics](https://jonasfrey96.github.io/Continual-Learning-Basics/) a major challenge in continual learning is carastrophic forgetting. This problem can be mitigated by memory replay. We use the terms rehearsal and replay interchangable in the following. 

<p align="center">
  <img src="{{ site.baseurl }}/images/procreator/rehearsal_only.jpg" height="300"/>
</p>

Memory replay works as follows: \
1. While training on a task a set of **samples** is **stored** in the memory buffer M.

2. When training on a new task, samples from the new task and **replayed samples** from the memory buffer are feed to the network. The weight update of the network is performed according to the gradient induced by the new and old data.

3. Loss induced by the old samples task samples **motivates plasticity** (preserving the previously learned knowledge) while the loss induced by the new task **motivates integrating new knowledge**.


## Math Section:
We can formulate the training object as a constrained optimization problem.
Our network is function f_{\Theta} parametrized by \Theta. We want to find the optimal parameters for the i-th sample (x_i,y_i) such that the performance on the previous samples is not decreasing.

To achieve this we have to solve the following constrained optimization problem:  
<p align="center">
<img src="https://latex.codecogs.com/gif.latex?\theta_i^* \quad = \quad  argmin_{ \theta} \: l( f_\theta(x_i), y_i)">
</p>
<p align="center">
<img src="https://latex.codecogs.com/gif.latex?st.  \quad  l( f_\theta(x_j), y_j) \; \leq \; l( f_{\theta_{i-1}}(x_j), y_j); \quad \forall j \in [0..i-1]">
</p>


Obviously solving this optimization problem is not traceable. For each new data-point a further constraint is established.
Despite this formulating training a network on new samples as a optimization problem gives a nice insight.
At some point when in theory solving this optimization problem and the number of constraints add up we are not allowed to change the parameter vector \Theta in any direction given that one of the constraints will be violated. Also given that we have a lot of constraints we can assume that some are redundant. This means some constraints (samples) can be removed without changing the optimization problem.

Given this insight naturally the question arises which data-points (constrains) are non-redundant.
This directly motivates why we do not need to keep track of all previously learned data-points.


Gradient based sample selection for online continual
learning:
https://arxiv.org/pdf/1903.08671.pdf

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
A simple baseline for the optimal performance that can be achieved over all tasks is by training the network on the data of all tasks T_i simultaneously. We use the accuracy as a measurement.
<p align="center">
<img src="https://latex.codecogs.com/gif.latex?Accuracy = \frac{TP\: + \: TN}{TP \: + \: TN \: + \: FP\:  + \: FN}" /> 
</p>
This training procedure results in the following acc-scores for each task.
We can observe that some tasks are harder than other ("Lower accurary") but all are high.
[ 0.84, 0.84, 0.73, 0.78]


For training we use 4xRTX2080Ti and train for 4 hours. 
This correspondences to 50 epochs when one epoch is considered the full 10.000 Images. 
We use an effective batch size of 64 and use data distributed parallel training backend. 
We are roughly able to train on 35 Images/s. For more implementation details we refer to the publicly available code on [https://github.com/JonasFrey96/ASL](https://github.com/JonasFrey96/ASL).

<!-- As an optimizer we use ADAM with a learning rate of 0.003 and a polynomial learning rate schedule. -->
### Naive implementation
The show the significance of catastrophic forgetting we trained 4 Task sequentially. Each time we simply changed the optimizer and monitor at the end of each training epoch the validation performance for each task.
The background color of the task indicate the currently trained on task.

<p align="center">
<img src="{{ site.baseurl }}/images/memory-replay/acc_line_plot.png"/>
</p>

We can observe that the accuracy for the currently trained task increases rapidly, while the accuracy for the other task decreases.
When only logging the accuracy achieved after training for a task we can create the following matrix:

<p align="center">
<img src="{{ site.baseurl }}/images/memory-replay/acc_matrix.png" width="500" />
</p>

Eac row correspondences to training on a task. So in the 0-th we log the validation results achieved on al tasks after training on task 0. In the 1th row we have been training of task 0 and 1. We can observe that the diagonal elements are the highest. This is due to the training procedure just has been applied for this task. What we ideally would like to have is that the lower left diagonal values are all high. The first colum indicates the forgetting for task 0. We can see that the accuracy for task 0 is decreasing over the training procedure.



## Design Considerations of Memory Buffers:


<p align="center">
<img src="{{ site.baseurl }}/images/procreator/buffer_size.jpg"/>
</p> 

### Filling
What do we want to achieve.
Support Vector Graphics

- random
- criterion driven:
  - uncertainity
  - loss
### Sampling
- random
- proportional
- metric driven
	- loss
### Augmentation


### Labels
#### Student Teacher Explained
#### Hard
#### Soft
#### Ground Truth


### Training
#### When to stop
#### Learning rates per layer
