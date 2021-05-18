---
layout: page
title: About me
permalink: /about/
---

Hello my name is Jonas Frey. 

I am currently a master student at the **ETH Zurich** in **Robotic, Systems and Control**.
This blog documents my personal projects and especially my master's thesis.
I will dive into topics I personally find interesting and worth sharing.

Everything I publish is just my personal opinion and I am not representing the ETH or any other affiliated institutions.

**Contact me:** [jonfrey@ethz.ch](mailto:jonfrey@ethz.ch)  
**GitHub:** [https://github.com/JonasFrey96/]()  
**LinkedIn:** [www.linkedin.com/in/jonasfrey96]()  
**CV:** [ Jonas_Frey_CV.pdf ](<https://github.com/JonasFrey96/jonasfrey96.github.io/blob/master/images/about/Jonas_Frey_CV.pdf>)
## Projects

### 2021 - Continual Learning of Semantic Segmentation for mobile Robots

<p float="middle">
	<img align="middle" src="{{ site.baseurl }}/images/about/MasterThesis_Previes.gif" alt="Logo"/>
</p>


**Scope**: Master's Thesis at the Autonomous Systems Lab (ETH Zurich) 

**Objective**:  Allowing mobile robots to integrate new knowledge acquired during a mission into a pre-trained semantic segmentation network unsupervised. 
Allows for online-domain adaptation to novel environments. Utilizing tools of the continual learning community to a real world problem. 

**Tools**: C++ 14, Python, PyTorch, Cluster Computing, Containerization, Nvidia Jetson AX Xavier, ROS Noetic, [ETH SuperMegaBot (Robot)](https://github.com/ethz-asl/eth_supermegabot)

**Repository**: [https://github.com/JonasFrey96/ASL](https://github.com/JonasFrey96/ASl) 

**Supervisors**: Hermann Blum, Milano Francesco, Dr. Cadena Lerma, Prof. Roland Siegwart  
  
<br />

### 2021 - Visual Odometry Pipeline

<p float="middle">
	<img align="middle" src="https://github.com/JonasFrey96/Visual-Odom-Pipeline/blob/master/docs/kitti.gif?raw=true" alt="Logo"/>
</p>

**Scope**: Lecture by Robotics and Perception Group (http://rpg.ifi.uzh.ch/index.html)[PRG] University of Zurich

**Objective**: Implementation of a Visual Odometry Pipeline including Bundle Adjustment from Scratch using OpenCV.
Including local bundle adjustment, evaluation on recorded dataset and benchmarking on various other datasets.

**Tools**: Python, OpenCV

**Repository**: [https://github.com/JonasFrey96/Visual-Odom-Pipeline]()

**Collaborators**: Carter Fang  
  
<br />

### 2020 - FlowPose6D: Flow Driven 6D Pose Estimation

**Scope**: Semester Project at the Autonomous Systems Lab (ETH Zurich)  
<p float="middle">
	<img align="right" src="https://github.com/JonasFrey96/FlowPose6D/blob/master/docs/full_network.png?raw=true" alt="Logo"/>
	<img align="left" src="https://github.com/JonasFrey96/FlowPose6D/blob/master/docs/overview_network.png?raw=true" alt="Logo"/>
</p>
 
**Objective**: Leveraging state of the art methods for 6D object pose estimation and tracking to allow further downstream robotics applications including planning, manipulation, interaction. Focusing on instance level object detection with known geometric and visual information of rigid objects. Leverages state of the art optical flow estimation methods to establish correspondences between the rendered believed object pose and the captured RGB image. Real-time capable and fully functioning.
Evaluated on the YCB-Video Dataset

**Repository**: [https://github.com/JonasFrey96/FlowPose6D](https://github.com/JonasFrey96/FlowPose6D)

**Supervisor**: Blomqvist Kenneth Tor, Prof. Roland Siegwart  
  
<br />

### 2020 - ARBotics: Simulation and visualization framework in AR for robotic systems based on ROS

<p float="middle">
	<img align="right" src="https://github.com/EricVoll/ARbotics/wiki/images/Report/acc_plot_planning_robot2.png" alt="Logo" width="350"/>
	<img align="left" src="https://github.com/EricVoll/ARbotics/wiki/images/Report/acc_planning_done2.png" alt="Logo" width="350"/>
</p>

**Scope**: Fun Project + 3D Vision ([CVG ETH Zurich](https://www.cvg.ethz.ch/teaching/3dvision/) & [Microsoft Mixed Reality & AI Lab](https://www.microsoft.com/en-us/research/lab/mixed-reality-ai-zurich/))  

**Objective**:
A soft real-time interactive simulation and visualization framework in AR for robotic systems based on ROS. This project allows you to integrate Augmented Reality / Mixed Reality (AR/MR) applications in your ROS based robotic system easily. It provides functionalities for an easy setup and configuration, utilizes commonly used tools and standards (urdf files, etc.) and is easily extendable.

**Tools**: Python, Containerization, WEB-APIs, HoloLens 1&2, ROS 1 Melodic, ROS2, Gazebo, Unity

**Repository**: [https://github.com/EricVoll/ARbotics ]( https://github.com/EricVoll/ARbotics )

**Collaborators**: Eric Vollenweider, Raffael Theiler, Turcan Tuna  
  
<br />

### 2019 - SEW-EURODRIVE Handling assistant
<p float="middle">
	<img align="middle" src="https://master.sew-eurodrive.com/media/sew_eurodrive/videos/industrie_4_1/griff_in_die_kiste_390x220.jpg" alt="Logo" width = "350"/>
	<img align="middle" src="https://master.sew-eurodrive.com/media/sew_eurodrive/automatisierung/mfa/handling-assistant-up-to-400kg_800x450.jpg" alt="Logo" width = "350"/>
	 
</p>  
  
**Scope**: Full-Time Robotics Engineer

**Objective**:
Implementing the software for the mobile handling assistant MAXO-MS-HA equipped with a Kuka Agilus manipulator.
Applying to industrial standards and development of path planning software stack for industrial environments. 
Allowing bin picking operation of a mobile robot at different stations in an industrial setting. 

**Tools**: ROS, C++, PLC Programming IEC-61131-3, Ensenso N35 Camera, Kuka Agilus

**Project Homepage**: [https://www.sew-eurodrive.de/automation/factory-automation/mobile-assistance-systems/handling-assistants/handling-assistants.html]()  
  
<br />
  	
### 2018 - Dynamical Deformation Network: 

**Scope**: Bachelor's Thesis Nara Institute of Science and Technology (Japan)

**Objective**:
A deep generative model for 3d voxel object deformation using Kalman variational auto-encoder. 
Non-parametric learning of deformation properties of soft-objects under external forces. Application for robotic surgical systems, human tissue, food manipulation or cloth folding. 

**Tools**: Python, C++ 11, Tensorflow, ROS, Universal Robot 5, Intel Realsense 

**Supervised**: Prof. Takamitsu Matsubara (NAIST), Prof. Tamim Asfour (KIT)
  
<br />
  
### 2016-2018 - Humanoid Robot ARMAR-6:  
<p float="right">
	<img align="right" src="https://h2t.anthropomatik.kit.edu/img/A6_cropped_hq_fixed_tablet4_rdax_1200x2048.png" alt="Logo" height = "250"/>
</p>

**Scope**: Research Assistant at the Chair for High Performance Humanoid Technologies (Karlsruhe Institute of Technology)

**Objective**:
A High-Performance Humanoid for Human-Robot Collaboration in Real-World Scenarios. I significantly contributed from design to the implementation of the Power and Battery Management System. It allows hot-plug functionality, recharging, safety precautions, delivering 100A @ 48V and between 2-4h battery operation. Established the basis for numerous downstream research results and experiments.

**Project Homepage**: [https://h2t.anthropomatik.kit.edu/english/397.php]()  

**Resulting Project Paper**: [https://ieeexplore.ieee.org/document/8886589]()

**Supervised**: Lukas Kaul, Prof. Tamim Asfour (KIT)

<br />

### 2008-2015 - RoboCup Junior:

**Scope**: High-School Robotics

**Objective**:
We successfully participated for 7 years at the RoboCup Junior in all available categories including Soccer, Rescue and Dance. We started out building small robots using Lego Mindstorms and transitioned to manufacturing and layouting costume PCBs, CNC, laser cutted parts and programmed robots from scratch. We developed costume sensors that helped the robot to autonomously achieve their task and even established connectivity between multiple robots for coordinaten. We used motors, IMU, ultrasonics-sensor, cameras, light sensor, infrared sensors. We mainly used C and C++ for programming and relied on ATMEL microcontrollers starting with Arduinos and the typical Maker/DIY scene. 

<br />

## Thanks

Special thanks to Dr. Cadena Lerma, Cesar Dario (ETH Zurich, ASL) for pushing me to start writing blog articles.
Also thanks for all the supervision during my masters to:
Hermann Blum, 
Blomqvist Kenneth Tor,
Milano Francesco

Best Jonas

