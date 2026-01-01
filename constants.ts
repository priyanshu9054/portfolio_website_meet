
import { Project, SkillCard, TimelineItem, BlogPost, Certification } from './types';

export const SKILLS = [
  'Python', 'PyTorch', 'TensorFlow', 'MATLAB', 'C++', 'Embedded C', 
  'RL', 'MARL', 'ROS', 'OpenCV', 'CUDA', 'FPGA'
];

export const PROJECTS: Project[] = [
  {
    id: 'jerboa',
    title: 'Jerboa Running Controller',
    description: 'Tailed monopod robot controller combining Inertial Reorientation and SLIP.',
    longDescription: 'Derived and simulated dynamics for a Simplified Helicopter and a falling cat model. Integrated SLIP models for the Jerboa monopod. Implemented Stance, Flight, and Raibert stepping controllers to achieve stable hopping.',
    tags: ['Robotics', 'Control', 'Dynamics', 'UPenn'],
    image: 'https://images.unsplash.com/photo-1531746790731-6c087fdec69a?q=80&w=800&auto=format&fit=crop',
    github: 'https://github.com/meetkumar-doshi'
  },
  {
    id: 'slip-anchoring',
    title: 'Anchoring SLIP in Mechanisms',
    description: 'Hybrid systems modeling for Spring Loaded Inverted Pendulums (SLIP).',
    longDescription: 'Derived dynamics for Lossless and Energy-loss SLIP. Extended the model to a realistic 5-bar-linkage design, deriving full dynamics and building custom controllers for multi-jointed locomotion.',
    tags: ['Hybrid Systems', 'Kinematics', 'UPenn'],
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800&auto=format&fit=crop',
    github: 'https://github.com/meetkumar-doshi'
  },
  {
    id: 'hopper',
    title: 'Vertical Stable Hopper',
    description: 'Active hopper simulation with linear, air, and virtual electromagnetic springs.',
    longDescription: 'Started with Mass-Spring-Damper mechanics for a bouncing ball with thrust injection. Transitioned to an active pogo-stick hopper with 5-bar-linkage leg kinematics.',
    tags: ['Actuation', 'Stability', 'UPenn'],
    image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=800&auto=format&fit=crop',
    github: 'https://github.com/meetkumar-doshi'
  },
  {
    id: 'brachiating',
    title: 'Brachiating Robot Controller',
    description: 'Energy-based control for double-pendulum arm-swinging behavior.',
    longDescription: 'Analyzed LTI systems, energy basins, and stable fixed points. Wrote a systematic controller for double pendulum swinging behavior based on system parameters and joint velocities.',
    tags: ['LTI Systems', 'Dynamics', 'UPenn'],
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop',
    github: 'https://github.com/meetkumar-doshi'
  },
  {
    id: 'sawyer',
    title: 'Sawyer 7-DOF Modeling',
    description: 'Full rigid body dynamics modeling for the Rethink Robotics Sawyer manipulator.',
    longDescription: 'Computed homogeneous transformations, Jacobians, and full Lagrangian equations of motion. Calculated Inertial Matrix and total Kinetic Energy for the 7-degree-of-freedom arm.',
    tags: ['Kinematics', 'Jacobians', 'UPenn'],
    image: 'https://images.unsplash.com/photo-1535378917042-10a22c95961a?q=80&w=800&auto=format&fit=crop',
    github: 'https://github.com/meetkumar-doshi'
  },
  {
    id: 'optical-flow',
    title: 'Multiscale Optical Flow',
    description: 'Pyramidal feature detection and image warping based on optical flow estimation.',
    longDescription: 'Implemented a multiscale optical flow estimation function to warp images. Used pyramidal approaches for robust feature detection across varying image scales.',
    tags: ['Computer Vision', 'Perception', 'UPenn'],
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop',
    github: 'https://github.com/meetkumar-doshi'
  },
  {
    id: 'gyrotor',
    title: 'GYROTOR Targeting Robot',
    description: 'Motion controlled, IR targeting robot based on sensor fusion of IMU data.',
    longDescription: 'Final year project involving Accelerometer and Gyroscope sensor fusion. Built a custom motion-controlled platform capable of precise IR targeting and autonomous navigation.',
    tags: ['Embedded Systems', 'Sensor Fusion', 'Robotics'],
    image: 'https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?q=80&w=800&auto=format&fit=crop',
    github: 'https://github.com/meetkumar-doshi'
  }
];

export const KNOWLEDGE_CARDS: SkillCard[] = [
  {
    id: 'rl',
    title: 'Reinforcement Learning',
    summary: 'Decision-making and optimization under uncertainty for robotic control.',
    details: 'Deep expertise in Actor-Critic methods and Policy Gradients. Applied RL concepts to stabilize hopping and running patterns in monopod systems.',
    projects: ['Jerboa Running Controller', 'Vertical Stable Hopper'],
    tools: ['PyTorch', 'OpenAI Gym', 'Stable Baselines', 'NumPy']
  },
  {
    id: 'dynamics-control',
    title: 'Dynamics & Control',
    summary: 'Modeling cyber-physical systems and multi-jointed mechanisms.',
    details: 'Derived and simulated dynamics for systems ranging from simplified helicopters to 7-DOF manipulators like Sawyer.',
    projects: ['Sawyer 7-DOF Modeling', 'Brachiating Robot Controller', 'PUMA Kinematics'],
    tools: ['MATLAB', 'State Space', 'Simulink', 'Dynamics']
  },
  {
    id: 'embedded-ai',
    title: 'Applied Edge AI',
    summary: 'Bridging algorithms with hardware-aware constraints for safety-critical apps.',
    details: 'Industrial experience in FPGA acceleration and safety systems (<2μs shutdown). Developing for real-world hardware constraints.',
    projects: ['GYROTOR Targeting Robot', 'FPGA Acceleration'],
    tools: ['Embedded C', 'C++', 'FPGA', 'Real-time OS']
  },
  {
    id: 'vision-perception',
    title: 'Vision & Perception',
    summary: 'Multiscale feature detection and image processing for autonomous sensing.',
    details: 'Implemented multiscale optical flow and Laplacian encoding. Specialized in Poisson image editing and gradient-domain blending.',
    projects: ['Multiscale Optical Flow', 'Poisson Image Editing'],
    tools: ['OpenCV', 'PyTorch', 'Image Processing']
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'upenn-mm',
    title: 'MicroMasters in Robotics',
    issuer: 'University of Pennsylvania',
    date: 'Nov 2020',
    credentialId: 'b35b1b71286846b89a51f757a4e90c26',
    link: 'https://credentials.edx.org/credentials/b35b1b71286846b89a51f757a4e90c26/',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/9/92/UPenn_shield_with_banner.svg'
  },
  {
    id: 'upenn-loco',
    title: 'Robotics: Locomotion Engineering',
    issuer: 'University of Pennsylvania',
    date: 'Nov 2020',
    credentialId: 'c787b5f2db7f4609a3916de4e8f377f9',
    link: 'https://courses.edx.org/certificates/c787b5f2db7f4609a3916de4e8f377f9',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/9/92/UPenn_shield_with_banner.svg'
  },
  {
    id: 'upenn-vision',
    title: 'Robotics: Vision Intelligence & ML',
    issuer: 'University of Pennsylvania',
    date: 'Nov 2020',
    credentialId: '8210341c38354609aa52da60fd61b4e5',
    link: 'https://courses.edx.org/certificates/8210341c38354609aa52da60fd61b4e5',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/9/92/UPenn_shield_with_banner.svg'
  },
  {
    id: 'upenn-control',
    title: 'Robotics: Dynamics and Control',
    issuer: 'University of Pennsylvania',
    date: 'Oct 2020',
    credentialId: '44eb1890e7c447bab23d084fce3ce9c7',
    link: 'https://courses.edx.org/certificates/44eb1890e7c447bab23d084fce3ce9c7',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/9/92/UPenn_shield_with_banner.svg'
  },
  {
    id: 'upenn-kin',
    title: 'Robotics: Kinematics Foundations',
    issuer: 'University of Pennsylvania',
    date: 'Sep 2020',
    credentialId: 'f6294bde27d54a53b3965b17afeb8efb',
    link: 'https://courses.edx.org/certificates/f6294bde27d54a53b3965b17afeb8efb',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/9/92/UPenn_shield_with_banner.svg'
  },
  {
    id: 'matlab',
    title: 'MATLAB Onramp',
    issuer: 'MathWorks',
    date: 'Sep 2019',
    link: 'https://drive.google.com/file/d/1J5_bYDIlgWTDM5RjKBj4fg6TCzX3uiKw/view',
    logo: 'https://www.mathworks.com/matlabcentral/images/matlab-logo.png'
  },
  {
    id: 'hacking',
    title: 'Ethical Hacking (Basics)',
    issuer: 'Internshala',
    date: 'Mar 2019',
    credentialId: '3C1D4E1A-DC12-DEF7-A1CC-8E06666B302F',
    link: 'https://drive.google.com/file/d/1WuJsFfNkVhI4nE9JHhWkBS0ap7Ar1ZaS/view',
    logo: 'https://internshala.com/static/images/common/internshala_logo.svg'
  },
  {
    id: 'iot',
    title: 'Internet of Things',
    issuer: 'Internshala',
    date: 'Mar 2019',
    credentialId: 'C6C39109-3EA0-97E1-F2C6-D826A1E674A4',
    link: 'https://drive.google.com/file/d/1UpWiwf0RvdqWCmvBDu5yNGP6KKEXi2wK/view',
    logo: 'https://internshala.com/static/images/common/internshala_logo.svg'
  },
  {
    id: 'cpp',
    title: 'C++ Course',
    issuer: 'Sololearn',
    date: 'Jan 2018',
    credentialId: '#1051-3895775',
    link: 'https://www.sololearn.com/Certificate/CT-ALONUTNY/pdf',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/1/18/ISO_C%2B%2B_Logo.svg'
  },
  {
    id: 'scada',
    title: 'Basics of SCADA',
    issuer: 'Siemens CoE, MSU Baroda',
    date: 'Jul 2017',
    link: 'https://drive.google.com/file/d/1BrvwN5CxzATWXsvTp8BI_1uNINpRHcIY/view',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Siemens-logo.svg'
  },
  {
    id: 'low-voltage',
    title: 'Low Voltage Switch Gears',
    issuer: 'Siemens CoE, MSU Baroda',
    date: 'Jun 2017',
    link: 'https://drive.google.com/file/d/1Kn-bAp0WX4ZLo8Y0S9PHOpVubFI_8yJy/view',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Siemens-logo.svg'
  },
  {
    id: 'python-int',
    title: 'Programming with Python',
    issuer: 'Internshala',
    date: 'Jun 2017',
    credentialId: '440684844595241cf2144f',
    link: 'https://drive.google.com/file/d/1A5ZEdzJXSRb3NmF-y2HfbE-FmKtyd-Ju/view',
    logo: 'https://internshala.com/static/images/common/internshala_logo.svg'
  },
  {
    id: 'simple-cv',
    title: 'Image Processing - SimpleCV',
    issuer: 'Internshala',
    date: 'Mar 2017',
    credentialId: '88419223057a62a1d9ad2b',
    link: 'https://drive.google.com/file/d/1J8dWMfHGbalyn-FG_b_CXyMDL0AtU0XV/view',
    logo: 'https://internshala.com/static/images/common/internshala_logo.svg'
  },
  {
    id: 'vhdl',
    title: 'VLSI using VHDL',
    issuer: 'Internshala',
    date: 'Mar 2017',
    credentialId: '1910914545771610011a6e',
    link: 'https://drive.google.com/file/d/13SrT79tYRoIQDdeglqIbmOWquOm-CpNC/view',
    logo: 'https://internshala.com/static/images/common/internshala_logo.svg'
  },
  {
    id: 'plc',
    title: 'Basics of PLC',
    issuer: 'Siemens CoE, MSU Baroda',
    date: 'Jan 2016',
    link: 'https://drive.google.com/file/d/1ddQfEBPpeYZD2bD-zVD08yOar1e1hlAm/view',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Siemens-logo.svg'
  },
  {
    id: 'process-inst',
    title: 'Process Instrumentation',
    issuer: 'Siemens CoE, MSU Baroda',
    date: 'Jan 2016',
    link: 'https://drive.google.com/file/d/19saK7j9dZub9M4dBrQ9fzEjkzHhqI99x/view',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Siemens-logo.svg'
  }
];

export const EDUCATION: TimelineItem[] = [
  {
    id: 'gt',
    institution: 'Georgia Institute of Technology',
    role: 'M.S. in Computer Science (AI Track)',
    duration: '2022 — 2025',
    description: 'Deep specialization in ML, DL, and Reinforcement Learning. Grade: A.'
  },
  {
    id: 'upenn',
    institution: 'University of Pennsylvania',
    role: 'MicroMasters in Robotics',
    duration: '2020 — 2020',
    description: 'Intensive series covering Kinematics, Dynamics, Control, and Vision-based Navigation.'
  },
  {
    id: 'msu',
    institution: 'MSU Baroda',
    role: 'B.E. in Electronics (Instrumentation)',
    duration: '2013 — 2017',
    description: 'Focused on Embedded Systems and Signal Processing. Graduated with Distinction.'
  }
];

export const EXPERIENCE: TimelineItem[] = [
  {
    id: 'aatman',
    institution: 'Aatman Electro Magnetics',
    role: 'Design & Development Engineer',
    duration: '2018 — 2022',
    description: 'Architected FPGA pipelines for floating-point acceleration. Led development of dual-core embedded platforms for industrial safety-critical control.'
  },
  {
    id: 'lt',
    institution: 'L&T Technology Services',
    role: 'Associate Engineer',
    duration: '2018 — 2018',
    description: 'Embedded software programming and platform coordination for industrial instrumentation.'
  }
];

export const BLOGS: BlogPost[] = [
  {
    id: 'b1',
    title: 'The Dance of the Jerboa: Tailed Monopod Dynamics',
    excerpt: 'Exploring how Inertial Reorientation and SLIP models create biological agility in machines.',
    date: 'Jan 2025',
    tags: ['Robotics', 'Dynamics', 'UPenn'],
    content: 'The Jerboa is a fascinating monopod robot. In my UPenn research, I combined Inertial Reorientation with the Spring Loaded Inverted Pendulum (SLIP) model. By implementing discrete phases for Stance and Flight, we can simulate complex hopping patterns that mirror nature\'s most efficient jumpers...'
  },
  {
    id: 'b2',
    title: 'Why Embedded AI is the Backbone of Robotics',
    excerpt: 'Bridging high-level neural foundations with low-latency hardware constraints.',
    date: 'Nov 2024',
    tags: ['Edge AI', 'Embedded'],
    content: 'In safety-critical control, model performance isn\'t just about accuracy—it\'s about latency. During my time at Aatman, I designed systems with <2μs emergency shutdown speeds. Scaling AI to the edge requires a deep understanding of FPGA acceleration and real-time operating systems...'
  },
  {
    id: 'b3',
    title: 'Reinforcement Learning vs Classic Control',
    excerpt: 'My journey from UPenn Dynamics to Georgia Tech AI Specialization.',
    date: 'Sep 2024',
    tags: ['RL', 'AI', 'Georgia Tech'],
    content: 'Coming from a rigorous control background at UPenn, transitioning to Reinforcement Learning at Georgia Tech opened new doors. While classic PID and state-space controllers offer stability guarantees, RL allows us to handle uncertainty in ways that purely mathematical models struggle with...'
  }
];
