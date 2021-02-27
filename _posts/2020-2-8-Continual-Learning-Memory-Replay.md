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
As mentioned in the previous blog post [Continual Learning Basics](https://jonasfrey96.github.io/Continual-Learning-Basics/) continual learning can be achieved by memory replay. We use the terms rehearsal and replay interchangele in the following.

<p align="center">
  <img src="{{ site.baseurl }}/images/procreator/rehearsal_only.jpg" height="300"/>
</p>

Memory replay works as follows:
While training on a task a set of samples is stored in the memory buffer M.
When training on a new task, samples from the new task and the memory buffer are feed to the network.
This allows training on a new task while preserving the knowledge on the previous task.




## Math Section:
We can forumlate the training object as a constrained optimization problem.
Our network is function f_{\Theta} parametrized by \Theta. We want to find the optimal parameters for the i-th sample (x_i,y_i) such that the performance on the previous samples is not decreasing.

To achieve this we have to solve the following optimization problem:  
<p align="center">
<img src="https://latex.codecogs.com/gif.latex?\theta_i^* \quad = \quad  argmin_{ \theta} \: l( f_\theta(x_i), y_i)">
</p>
<p align="center">
<img src="https://latex.codecogs.com/gif.latex?st.  \quad  l( f_\theta(x_j), y_j) \; \leq \; l( f_{\theta_{i-1}}(x_j), y_j); \quad \forall j \in [0..i-1]">
</p>


Obviously sloving this optimization problem is not traceable. For each new data-point a further constraint is established.
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
The images are rendered photorealitically and are seperated into different scenes. A total of 461 indoor scenes are available with multiple camera trajectories with dense ground truth annotations for depth and semantic labels. The objects in the scene are labeled according to the NYU40 classes.

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

A car drives around in a novel city (1). Meanwhile it is able to unsupervised create labels for the new scenery (2). The generation of the labels is achieved by fusing information from various sources such as depth estimation, optical flow or the pose of the car. Creating these labels is computational expensive and can not be performed in real-time such that the labels can not be used while driving. 
Incorporating the labels into the semantic segmentation network of the car which operates in real-time is desirable. (3) 
When we are able to continually learn from the provided labels that are created during the mission ("while driving around in the city"), the semantic segmentation estimate can improve when the car revisits the same street in this city (4).

## Learning Baselines

A simple baseline for the optimal performance that can be achieved over all tasks is by training the network on the data of all tasks T_i simultaneously. We use the accuracy as a measurement.
<p align="center">
<img src="https://latex.codecogs.com/gif.latex?Accuracy = \frac{TP\: + \: TN}{TP \: + \: TN \: + \: FP\:  + \: FN}" /> 
</p>



For training we use 4xRTX2080Ti and train for 4 hours. 
This correspondences to 50 epochs when one epoch is considered the full 10.000 Images. 
We use an effective batch size of 64 and use data distributed parallel training backend. 
We are roughly able to train on 35 Images/s.
As an optimizer we use ADAM with a learning rate of 0.003 and a polynomial learning rate schedule.


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
