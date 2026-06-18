export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  rating?: number;
}

export interface Team {
  id: number;
  section: 'eee-a' | 'eee-b';
  name: string;
  description: string;
  longDescription: string;
  progress: number;
  leader: TeamMember;
  members: TeamMember[];
  projectImages: string[];
}

// Team data updated with classmate names and roll numbers
export const teamsData: Team[] = [
  {
    id: 1,
    name: "team1",
    description: "Project Title (TBD)",
    longDescription: "Project details and abstract will be updated soon.",
    progress: 0,
    leader: {
      id: 3,
      name: "Leader 1",
      role: "",
      image: "#"
    },
    members: [
      { id: 101, name: "Person 1", role: "", image: "" },
      { id: 102, name: "Person 2", role: "", image: "" },
      { id: 103, name: "Person 3", role: "", image: "" },
      { id: 104, name: "Person 4", role: "", image: "" },
      { id: 105, name: "Person 5", role: "", image: "" },
      { id: 106, name: "Person 6", role: "", image: "" }
    ],
    projectImages: ["#", "#"],
    section: "eee-a"
  },
  {
    id: 3,
    name: "team3",
    description: "Project Title (TBD)",
    longDescription: "Project details and abstract will be updated soon.",
    progress: 0,
    leader: {
      id: 9,
      name: "Leader 3",
      role: "",
      image: "#"
    },
    members: [
      { id: 301, name: "Person 1", role: "", image: "" },
      { id: 302, name: "Person 2", role: "", image: "" },
      { id: 303, name: "Person 3", role: "", image: "" },
      { id: 304, name: "Person 4", role: "", image: "" },
      { id: 305, name: "Person 5", role: "", image: "" },
      { id: 306, name: "Person 6", role: "", image: "" }
    ],
    projectImages: ["#", "#"],
    section: "eee-a"
  },
  {
    id: 4,
    name: "team4",
    description: "Project Title (TBD)",
    longDescription: "Project details and abstract will be updated soon.",
    progress: 0,
    leader: {
      id: 12,
      name: "Leader 4",
      role: "",
      image: "#"
    },
    members: [
      { id: 401, name: "Person 1", role: "", image: "" },
      { id: 402, name: "Person 2", role: "", image: "" },
      { id: 403, name: "Person 3", role: "", image: "" },
      { id: 404, name: "Person 4", role: "", image: "" },
      { id: 405, name: "Person 5", role: "", image: "" },
      { id: 406, name: "Person 6", role: "", image: "" }
    ],
    projectImages: ["#", "#"],
    section: "eee-a"
  },
  {
    id: 5,
    name: "team5",
    description: "Project Title (TBD)",
    longDescription: "Project details and abstract will be updated soon.",
    progress: 0,
    leader: {
      id: 15,
      name: "Leader 5",
      role: "",
      image: "#"
    },
    members: [
      { id: 501, name: "Person 1", role: "", image: "" },
      { id: 502, name: "Person 2", role: "", image: "" },
      { id: 503, name: "Person 3", role: "", image: "" },
      { id: 504, name: "Person 4", role: "", image: "" },
      { id: 505, name: "Person 5", role: "", image: "" },
      { id: 506, name: "Person 6", role: "", image: "" }
    ],
    projectImages: ["#", "#"],
    section: "eee-a"
  },
  {
    id: 2,
    name: "team2",
    description: "Gesture Based Intelligent Appliance Control",
    longDescription: "Gesture Based Intelligent Appliance Control is an innovative system that allows users to control computer functions and electrical appliances using hand gestures. The project uses OpenCV and MediaPipe for real-time hand gesture detection and interpretation. By integrating Arduino UNO and LED modules, the system demonstrates appliance control without physical switches or remote controls. This improves user convenience, accessibility, and serves as a foundation for future smart home automation.",
    progress: 50,
    leader: {
      id: 5, // random ID based on old pattern
      name: "B. Hema Shekar",
      role: "24KD1A0224",
      image: "#"
    },
    members: [
      {
        id: 201,
        name: "B. Jaya Lakshmi",
        role: "24KD1A0214",
        image: ""
      },
      {
        id: 202,
        name: "B. Yekavali",
        role: "24KD1A0215",
        image: ""
      },
      {
        id: 203,
        name: "B. Yamini",
        role: "24KD1A0217",
        image: ""
      },
      {
        id: 204,
        name: "B. Durga Prasad",
        role: "24KD1A0218",
        image: ""
      },
      {
        id: 205,
        name: "B. Mohan",
        role: "24KD1A0219",
        image: ""
      },
      {
        id: 206,
        name: "B. Hema Shekar",
        role: "24KD1A0224",
        image: ""
      }
    ],
    projectImages: [
      "#",
      "#"
    ],
    section: "eee-a"
  },
  {
    id: 6,
    name: "team6",
    description: "Emergency Assistance and Alert Application",
    longDescription: "The Emergency Assistance and Alert Application is a mobile app designed to provide immediate help during emergencies. The application enables users to quickly access nearby police stations, hospitals, ambulance services, and fire stations. Special emergency features such as Fire, Health, and SOS alerts allow users to share their live location and seek assistance instantly. The system improves personal safety by ensuring faster communication and coordination with emergency response services.",
    progress: 50,
    leader: {
      id: 17, // random ID based on old pattern
      name: "Korada Ramana Pradeep",
      role: "24KD1A0266",
      image: "#"
    },
    members: [
      {
        id: 601,
        name: "K. Koteswara Rao",
        role: "24KD1A0265",
        image: ""
      },
      {
        id: 602,
        name: "K. Ramana Pradeep",
        role: "24KD1A0266",
        image: ""
      },
      {
        id: 603,
        name: "K. Tarun",
        role: "24KD1A0269",
        image: ""
      },
      {
        id: 604,
        name: "L. Venkat Lakshmi",
        role: "24KD1A0275",
        image: ""
      },
      {
        id: 605,
        name: "M. Dinesh",
        role: "24KD1A0276",
        image: ""
      },
      {
        id: 606,
        name: "M. Lokesh",
        role: "24KD1A0277",
        image: ""
      },
      {
        id: 607,
        name: "M. Laxman",
        role: "24KD1A0278",
        image: ""
      }
    ],
    projectImages: [
      "#",
      "#"
    ],
    section: "eee-a"
  },
  {
    id: 7,
    name: "team7",
    description: "IoT Based Smart Dustbin",
    longDescription: "The Smart Garbage Monitoring System automatically monitors garbage levels inside a dustbin using sensors. It uses an ultrasonic sensor and microcontroller to detect the fill level of waste and display the status on an LCD screen. The system can also generate alerts when the dustbin is nearly full, ensuring timely waste collection. This project helps reduce garbage overflow, improves cleanliness and hygiene, and supports smart city initiatives through efficient waste management.",
    progress: 50,
    leader: {
      id: 20, // random ID based on old pattern
      name: "M. Thanuja",
      role: "",
      image: "#"
    },
    members: [
      {
        id: 701,
        name: "P. Mamini",
        role: "24KD1A0280",
        image: ""
      },
      {
        id: 702,
        name: "M. Lavanya",
        role: "24KD1A0283",
        image: ""
      },
      {
        id: 703,
        name: "M. Jayathi",
        role: "24KD1A0284",
        image: ""
      },
      {
        id: 704,
        name: "M. Mohitha Sri",
        role: "24KD1A0285",
        image: ""
      },
      {
        id: 705,
        name: "N. Krishnaveni",
        role: "24KD1A0287",
        image: ""
      },
      {
        id: 706,
        name: "P. Balaji",
        role: "24KD1A0292",
        image: ""
      }
    ],
    projectImages: [
      "#",
      "#"
    ],
    section: "eee-a"
  },
  {
    id: 8,
    name: "team8",
    description: "Smart Gas Leakage Detection and Safety System",
    longDescription: "The Smart Gas Leakage Detection and Safety System is designed to detect gas leaks in real time and automatically activate safety measures. The system uses a gas sensor, microcontroller, relay module, and IoT components to monitor gas concentration levels. When leakage is detected, the system triggers a buzzer alarm, LED indicator, and exhaust fan. It can also send alerts to users and optionally shut off the gas supply through a solenoid valve. The project provides an affordable and effective solution for enhancing safety in homes and industries.",
    progress: 50,
    leader: {
      id: 23, // random ID based on old pattern
      name: "P. Keerthi",
      role: "24KD1A0294",
      image: "#"
    },
    members: [
      {
        id: 801,
        name: "P. Keerthi",
        role: "24KD1A0294",
        image: ""
      },
      {
        id: 802,
        name: "P. Hemanth Sai",
        role: "24KD1A0298",
        image: ""
      },
      {
        id: 803,
        name: "P. Koteswara Rao",
        role: "24KD1A0299",
        image: ""
      },
      {
        id: 804,
        name: "P. Abhilash",
        role: "24KD1A02A1",
        image: ""
      },
      {
        id: 805,
        name: "R. Tejaswani",
        role: "24KD1A02A3",
        image: ""
      },
      {
        id: 806,
        name: "R. Sowjanya",
        role: "24KD1A02A5",
        image: ""
      },
      {
        id: 807,
        name: "R. Uma Maheshwara Rao",
        role: "24KD1A02A6",
        image: ""
      }
    ],
    projectImages: [
      "#",
      "#"
    ],
    section: "eee-a"
  },
  {
    id: 9,
    name: "team9",
    description: "Government Scheme Finder",
    longDescription: "Government Scheme Finder is a web-based platform that helps citizens discover government welfare schemes that match their profile and requirements. Users can enter details such as age, gender, occupation, income, and category. Based on the provided information, the system analyzes eligibility and recommends suitable schemes. It displays scheme descriptions, benefits, eligibility criteria, and application links in a simple and user-friendly manner. The platform improves awareness, accessibility, and utilization of government welfare programs.",
    progress: 50,
    leader: {
      id: 26, // random ID based on old pattern
      name: "S. Mounika",
      role: "24KD1A02B6",
      image: "#"
    },
    members: [
      {
        id: 901,
        name: "R. Rajeswari",
        role: "24KD1A02A7",
        image: ""
      },
      {
        id: 902,
        name: "R. Rakesh",
        role: "24KD1A02A8",
        image: ""
      },
      {
        id: 903,
        name: "S. Jyotshna Sri",
        role: "24KD1A02B1",
        image: ""
      },
      {
        id: 904,
        name: "S. Bhargavi",
        role: "24KD1A02B4",
        image: ""
      },
      {
        id: 905,
        name: "S. Mounika",
        role: "24KD1A02B6",
        image: ""
      },
      {
        id: 906,
        name: "T. Kuldeep Kumar",
        role: "24KD1A02B8",
        image: ""
      },
      {
        id: 907,
        name: "T. Mohith Sai",
        role: "24KD1A02B9",
        image: ""
      }
    ],
    projectImages: [
      "#",
      "#"
    ],
    section: "eee-a"
  },
  {
    id: 10,
    name: "team10",
    description: "Smart Energy Guardian",
    longDescription: "Smart Energy Guardian is a smart home automation project that enables users to remotely monitor and control electrical appliances through a mobile website. The system utilizes an ESP32-based microcontroller, Wi-Fi connectivity, relay modules, and a web application developed using HTML, CSS, and JavaScript. Users can switch appliances ON or OFF using their smartphones from any location with internet access. The project improves convenience, accessibility, and energy management while providing a low-cost foundation for future smart home automation systems.",
    progress: 50,
    leader: {
      id: 29, // random ID based on old pattern
      name: "V. Arun Kumar",
      role: "24KD1A02C6",
      image: "#"
    },
    members: [
      {
        id: 1001,
        name: "T. Kavya",
        role: "24KD1A02C0",
        image: ""
      },
      {
        id: 1002,
        name: "T. Hemalatha",
        role: "24KD1A02C1",
        image: ""
      },
      {
        id: 1003,
        name: "T. Chandu",
        role: "24KD1A02C3",
        image: ""
      },
      {
        id: 1004,
        name: "U. Bhargavi",
        role: "24KD1A02C4",
        image: ""
      },
      {
        id: 1005,
        name: "U. Umamaheswari",
        role: "24KD1A02C5",
        image: ""
      },
      {
        id: 1006,
        name: "V. Arun Kumar",
        role: "24KD1A02C6",
        image: ""
      },
      {
        id: 1007,
        name: "Y. Janaki",
        role: "24KD1A02C9",
        image: ""
      },
      {
        id: 1008,
        name: "Y. Navya Sri",
        role: "24KD1A02D0",
        image: ""
      }
    ],
    projectImages: [
      "#",
      "#"
    ],
    section: "eee-a"
  },
  {
    id: 1,
    name: "team4",
    description: "Wet and Dry Waste Segregation",
    longDescription: "Our project focuses on efficient segregation of wet and dry waste to promote sustainable waste management. By implementing smart sorting mechanisms, we aim to reduce environmental pollution and improve recycling efficiency. This system encourages responsible disposal practices, helping communities maintain cleaner surroundings while supporting eco-friendly habits and reducing landfill burden through automated or manual separation techniques.",
    progress: 100,
    leader: {
      id: 38,
      name: "Leader 4",
      role: "",
      image: "#"
    },
    members: [
      {
        id: 1301,
        name: "Person 1",
        role: "",
        image: ""
      },
      {
        id: 1302,
        name: "Person 2",
        role: "",
        image: ""
      },
      {
        id: 1303,
        name: "Person 3",
        role: "",
        image: ""
      },
      {
        id: 1304,
        name: "Person 4",
        role: "",
        image: ""
      },
      {
        id: 1305,
        name: "Person 5",
        role: "",
        image: ""
      },
      {
        id: 1306,
        name: "Person 6",
        role: "",
        image: ""
      }
    ],
    projectImages: [
      "#",
      "#"
    ],
    section: "eee-b"
  },
  {
    id: 2,
    section: "eee-b",
    name: "Fault detection in transmission lines with IOT",
    description: "Fault Detection in Transmission Lines Using IoT",
    longDescription: "Fault Detection in Transmission Lines Using IoT is a smart monitoring system designed to detect faults in power transmission lines quickly and efficiently. The system uses voltage and current sensors connected to an ESP32/Arduino microcontroller to continuously monitor line conditions. The collected data is transmitted through IoT technology to a cloud platform, enabling real-time monitoring and instant fault alerts. This solution helps reduce power outages, maintenance time, and operational costs while improving the reliability and safety of the electrical power transmission system.",
    progress: 50,
    leader: {
      id: 200,
      name: "D.Krishna kumar",
      role: "24kd1a0232",
      image: "#"
    },
    members: [
      {
        id: 201,
        name: "B.praveen",
        role: "24kd1a0220",
        image: ""
      },
      {
        id: 202,
        name: "B.dileep",
        role: "24kd1a0223",
        image: ""
      },
      {
        id: 203,
        name: "CH.Rohith",
        role: "24kd1a0229",
        image: ""
      },
      {
        id: 204,
        name: "D Lokeaswari",
        role: "24kd1a0231",
        image: ""
      },
      {
        id: 205,
        name: "D.sai kumar",
        role: "24kd1a0233",
        image: ""
      },
      {
        id: 206,
        name: "G lavanya",
        role: "24kd1a0238",
        image: ""
      }
    ],
    projectImages: [
      "#",
      "#"
    ]
  },
  {
    id: 3,
    name: "team6",
    description: "Smart Leave Management System",
    longDescription: "A Smart Leave Management System for colleges is an automated platform that simplifies leave applications, approvals, and tracking for students, faculty, and staff. It eliminates manual paperwork, reduces errors, and ensures adherence to institutional policies. Students can apply for leave online, faculty can approve/reject requests, and administration can maintain records efficiently. Features include real-time leave balance tracking, automated notifications, customizable policies, and seamless integration with attendance management systems.",
    progress: 80,
    leader: {
      id: 44,
      name: "Leader 6",
      role: "",
      image: "#"
    },
    members: [
      {
        id: 1501,
        name: "Person 1",
        role: "",
        image: ""
      },
      {
        id: 1502,
        name: "Person 2",
        role: "",
        image: ""
      },
      {
        id: 1503,
        name: "Person 3",
        role: "",
        image: ""
      },
      {
        id: 1504,
        name: "Person 4",
        role: "",
        image: ""
      },
      {
        id: 1505,
        name: "Person 5",
        role: "",
        image: ""
      },
      {
        id: 1506,
        name: "Person 6",
        role: "",
        image: ""
      }
    ],
    projectImages: [
      "#",
      "#"
    ],
    section: "eee-b"
  },
  {
    id: 4,
    name: "team7",
    description: "Smart Parking System",
    longDescription: "The Internet of Things (IoT)-based Battery Monitoring System using Arduino is designed to remotely monitor the status and performance of batteries in real-time, enhancing safety, efficiency, and reliability. This system continuously measures key battery parameters such as voltage, current, temperature, and state of charge (SoC) using appropriate sensors interfaced with an Arduino microcontroller. The collected data is then transmitted to an IoT platform (like Blynk or Thingspeak) via a Wi-Fi module (e.g., ESP8266), enabling users to access live battery statistics through a web or mobile application. Alerts for abnormal conditions such as overcharging, deep discharging, or overheating are also generated to prevent damage and extend battery lifespan. This project is particularly useful for remote energy systems, electric vehicles, and UPS setups, providing an effective and low-cost solution for battery health monitoring and maintenance.",
    progress: 42,
    leader: {
      id: 47,
      name: "Leader 7",
      role: "",
      image: "#"
    },
    members: [
      {
        id: 1601,
        name: "Person 1",
        role: "",
        image: ""
      },
      {
        id: 1602,
        name: "Person 2",
        role: "",
        image: ""
      },
      {
        id: 1603,
        name: "Person 3",
        role: "",
        image: ""
      },
      {
        id: 1604,
        name: "Person 4",
        role: "",
        image: ""
      },
      {
        id: 1605,
        name: "Person 5",
        role: "",
        image: ""
      },
      {
        id: 1606,
        name: "Person 6",
        role: "",
        image: ""
      }
    ],
    projectImages: [
      "#",
      "#"
    ],
    section: "eee-b"
  },
  {
    id: 5,
    section: "eee-b",
    name: "Power consumption monitoring system using ESP32",
    description: "Power consumption monitoring system using ESP32",
    longDescription: "The ESP32-Based Power Consumption Monitoring System is designed to monitor electricity usage in real time. It uses an ESP32, a current sensor (ACS712), and a voltage sensing circuit to measure voltage, current, and power consumption. The system helps users identify high energy-consuming appliances, reduce electricity wastage, and improve energy efficiency through continuous monitoring.",
    progress: 50,
    leader: {
      id: 500,
      name: "K. PRARDAVA RAO",
      role: "24KD1A0268",
      image: "#"
    },
    members: [
      {
        id: 501,
        name: "K. RISHITA",
        role: "24KD1A0267",
        image: ""
      },
      {
        id: 502,
        name: "L. CHARAN TEJA",
        role: "24KD1A0270",
        image: ""
      },
      {
        id: 503,
        name: "L. MOHAN",
        role: "24KD1A0271",
        image: ""
      },
      {
        id: 504,
        name: "L. DHARMENDRA",
        role: "24KD1A0272",
        image: ""
      },
      {
        id: 505,
        name: "L. RAVI",
        role: "24KD1A0273",
        image: ""
      },
      {
        id: 506,
        name: "L. SHYAM",
        role: "24KD1A0274",
        image: ""
      }
    ],
    projectImages: [
      "#",
      "#"
    ]
  },
  {
    id: 6,
    name: "team9",
    description: "Sample Description",
    longDescription: "Sample Long Description.",
    progress: 50,
    leader: {
      id: 53,
      name: "Leader 9",
      role: "",
      image: "#"
    },
    members: [
      {
        id: 1801,
        name: "Person 1",
        role: "",
        image: ""
      },
      {
        id: 1802,
        name: "Person 2",
        role: "",
        image: ""
      },
      {
        id: 1803,
        name: "Person 3",
        role: "",
        image: ""
      },
      {
        id: 1804,
        name: "Person 4",
        role: "",
        image: ""
      },
      {
        id: 1805,
        name: "Person 5",
        role: "",
        image: ""
      },
      {
        id: 1806,
        name: "Person 6",
        role: "",
        image: ""
      }
    ],
    projectImages: [
      "#",
      "#"
    ],
    section: "eee-b"
  },
  {
    id: 7,
    section: "eee-b",
    name: "FOOTSTEP POWER GENERATION",
    description: "FOOTSTEP POWER GENERATION",
    longDescription: "Footstep Power Generation is a system that converts the mechanical energy of human footsteps into electrical energy. The problem identified is the wastage of energy produced while walking in crowded areas. The proposed solution uses piezoelectric sensors to generate electricity from foot pressure. Technologies used include piezoelectric sensors, energy storage batteries, and voltage regulation circuits. The expected outcome is clean, renewable, and eco-friendly power generation for small electrical applications.",
    progress: 50,
    leader: {
      id: 700,
      name: "P.Dileep",
      role: "24KD1A0296",
      image: "#"
    },
    members: [
      {
        id: 701,
        name: "P.Rajeev",
        role: "24KD1A0293",
        image: ""
      },
      {
        id: 702,
        name: "P.Vamsi",
        role: "24KD1A0295",
        image: ""
      },
      {
        id: 703,
        name: "P.Hemanth",
        role: "24KD1A0297",
        image: ""
      },
      {
        id: 704,
        name: "P.Hemanth",
        role: "24KD1A02A0",
        image: ""
      },
      {
        id: 705,
        name: "R.Sagar",
        role: "24KD1A02A2",
        image: ""
      },
      {
        id: 706,
        name: "R.Vinay kumar",
        role: "24KD1A02A4",
        image: ""
      }
    ],
    projectImages: [
      "#",
      "#"
    ]
  },
  {
    id: 8,
    name: "Team 20",
    description: "Sample Description",
    longDescription: "Sample Long Description.",
    progress: 50,
    leader: {
      id: 200,
      name: "Leader 20",
      role: "",
      image: "#"
    },
    members: [
      {
        id: 2001,
        name: "Person 1",
        role: "",
        image: ""
      },
      {
        id: 2002,
        name: "Person 2",
        role: "",
        image: ""
      },
      {
        id: 2003,
        name: "Person 3",
        role: "",
        image: ""
      },
      {
        id: 2004,
        name: "Person 4",
        role: "",
        image: ""
      },
      {
        id: 2005,
        name: "Person 5",
        role: "",
        image: ""
      },
      {
        id: 2006,
        name: "Person 6",
        role: "",
        image: ""
      }
    ],
    projectImages: [
      "#",
      "#"
    ],
    section: "eee-b"
  },
  {
    id: 9,
    section: "eee-b",
    name: "PATS TRANSFORMABLE WHEELS",
    description: "PATS Transformable Wheels",
    longDescription: "The PATS Transformable Wheels project aims to improve vehicle movement on different terrains where conventional wheels may face difficulties. The proposed wheel can transform its shape to provide better traction, stability, and mobility on rough or uneven surfaces. This project uses mechanical design and pneumatic actuation technology to enable wheel transformation. The expected outcome is improved vehicle performance, better adaptability to different terrains, and enhanced efficiency for applications such as rescue, exploration, and off-road transportation.",
    progress: 50,
    leader: {
      id: 900,
      name: "BHOGAPURAPU MANOJ KUMAR",
      role: "25KD5A0202",
      image: "#"
    },
    members: [
      {
        id: 901,
        name: "VARANASI JASWANTH",
        role: "24KD1A02C7",
        image: ""
      },
      {
        id: 902,
        name: "YADLA UDAYA SRI",
        role: "24KD1A02C8",
        image: ""
      },
      {
        id: 903,
        name: "BEVARA SRIKAR",
        role: "25KD5A0201",
        image: ""
      },
      {
        id: 904,
        name: "CHINTHADA NAVYA",
        role: "25KD5A0203",
        image: ""
      },
      {
        id: 905,
        name: "GEDDAM MANISHA",
        role: "25KD5A0204",
        image: ""
      },
      {
        id: 906,
        name: "KOPPALA CHANDINI",
        role: "25KD5A0206",
        image: ""
      }
    ],
    projectImages: [
      "#",
      "#"
    ]
  },
  {
    id: 10,
    name: "Smart Traffic Light Controller",
    description: "Smart Traffic Light Controller for Emergency Vehicles",
    longDescription: "A Smart Traffic Light Controller for Emergency Vehicles gives priority to ambulances, fire trucks, and police vehicles at traffic signals. Using sensors or cameras, it detects approaching emergency vehicles and automatically turns the signal green. This reduces delays, improves traffic flow, enables faster emergency response, and helps save lives during critical situations. 🚑🚦",
    progress: 50,
    leader: {
      id: 220,
      name: "MADASI DINESH",
      role: "25kd5a0208",
      image: "#"
    },
    members: [
      {
        id: 2201,
        name: "LAKKOJU PUJITHA",
        role: "25kd5a0207",
        image: ""
      },
      {
        id: 2202,
        name: "NATTA ARPITHA LILLY",
        role: "25kd5a0209",
        image: ""
      },
      {
        id: 2203,
        name: "RAVADA SAIKUMAR",
        role: "25kd5a0210",
        image: ""
      },
      {
        id: 2204,
        name: "VANKARA BHANU PRASAD",
        role: "25kd5a0211",
        image: ""
      },
      {
        id: 2205,
        name: "VUPPALA PAVAN KUMAR",
        role: "25kd5a0212",
        image: ""
      },
      {
        id: 2206,
        name: "CHAPPA YASWANTH KUMAR",
        role: "25kd5a0213",
        image: ""
      }
    ],
    projectImages: [
      "#",
      "#"
    ],
    section: "eee-b"
  },
  {
    id: 11,
    name: "Team 23",
    description: "Sample Description",
    longDescription: "Sample Long Description.",
    progress: 50,
    leader: {
      id: 230,
      name: "Leader 23",
      role: "",
      image: "#"
    },
    members: [
      {
        id: 2301,
        name: "Person 1",
        role: "",
        image: ""
      },
      {
        id: 2302,
        name: "Person 2",
        role: "",
        image: ""
      },
      {
        id: 2303,
        name: "Person 3",
        role: "",
        image: ""
      },
      {
        id: 2304,
        name: "Person 4",
        role: "",
        image: ""
      },
      {
        id: 2305,
        name: "Person 5",
        role: "",
        image: ""
      },
      {
        id: 2306,
        name: "Person 6",
        role: "",
        image: ""
      }
    ],
    projectImages: [
      "#",
      "#"
    ],
    section: "eee-b"
  },
  {
    id: 12,
    name: "Team 24",
    description: "Sample Description",
    longDescription: "Sample Long Description.",
    progress: 50,
    leader: {
      id: 240,
      name: "Leader 24",
      role: "",
      image: "#"
    },
    members: [
      {
        id: 2401,
        name: "Person 1",
        role: "",
        image: ""
      },
      {
        id: 2402,
        name: "Person 2",
        role: "",
        image: ""
      },
      {
        id: 2403,
        name: "Person 3",
        role: "",
        image: ""
      },
      {
        id: 2404,
        name: "Person 4",
        role: "",
        image: ""
      },
      {
        id: 2405,
        name: "Person 5",
        role: "",
        image: ""
      },
      {
        id: 2406,
        name: "Person 6",
        role: "",
        image: ""
      }
    ],
    projectImages: [
      "#",
      "#"
    ],
    section: "eee-b"
  }
];

// Information about the department mentor
export const mentorData = {
  name: "Bugatha Ram Vara Prasad",
  title: "Assistant Professor, Dept. Of EEE",
  image: "#",
  bio: "Ram Vara Prasad Bugatha is an Assistant Professor in the Department of Electrical and Electronics Engineering (EEE) with over four years of experience in academia. His expertise lies in Power and Industrial Drives, and he holds an M.Tech degree, currently pursuing a Ph.D. Passionate about technological advancements, he has actively participated in numerous Faculty Development Programs (FDPs) and workshops on Industrial Automation, IoT, Embedded Systems, and Power Systems.An accomplished researcher, he has published extensively in reputed journals and conferences, focusing on Smart Electric Vehicles, Renewable Energy Applications, Power Quality Enhancement, and Advanced Motor Control Strategies. He has also presented his work at national and international conferences, contributing to the discourse on sustainable and efficient energy solutions.Beyond research, he has guided several student projects, including IoT-based home automation, smart electric vehicles, and solar-powered charging stations for EVs. A dedicated mentor, he holds multiple NPTEL certifications and actively engages in professional bodies such as ISTE, IAENG, and IFERP, fostering academic excellence and innovation in electrical engineering."
};
