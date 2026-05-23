export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  rating?: number;
}

export interface Team {
  id: number;
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
    description: "Solar Power Bank",
    longDescription: "This project presents the design and development of a solar power bank, a portable device that harness solar energy to charge electronic gadgets such as smartphones, tablets, and other USB-powered devices. With the increasing demand for sustainable energy solutions and mobile charging options, the solar power bank offers a convenient and eco-friendly alternative to conventional electricity-dependent chargers. The system integrates photovoltaic (PV) panels to convert sunlight into electrical energy, which is stored in rechargeable lithium-ion batteries. A charge controller regulates the input to ensure safe and efficient charging, while USB output ports provide compatibility with various devices. The power bank is equipped with  dual charging modes: solar and USB input. This project demonstrates the potential of solar energy in addressing power needs in off-grid locations, during travel, or in emergency situations, promoting clean energy use and reducing reliance on non-renewable sources.",
    progress: 85,
    leader: {
      id: 1,
      name: "A Divya Sri",
      role: "23KD1A0201",
      image: "#"
    },
    members: [
      { id: 101, name: 'Person 1', role: '', image: '' },
      { id: 102, name: 'Person 2', role: '', image: '' },
      { id: 103, name: 'Person 3', role: '', image: '' },
      { id: 104, name: 'Person 4', role: '', image: '' },
      { id: 105, name: 'Person 5', role: '', image: '' },
      { id: 106, name: 'Person 6', role: '', image: '' },
      { id: 107, name: 'Person 7', role: '', image: '' },
      { id: 108, name: 'Person 8', role: '', image: '' }
    ],
    projectImages: [
      "#",
      "#"
    ]
  },
  {
    id: 2,
    name: "team2",
    description: "Smart Doorbell",
    longDescription: "Smart Doorbell with Visitor Notifications is an innovative IoT-based security solution that enhances home safety and convenience. It features a smart doorbell equipped with a camera,and real-time notification capabilities. When a visitor arrives, the system captures their presence and instantly sends alerts to the homeowner’s smartphone. It also integrates AI for facial recognition and cloud storage for visitor logs. With remote access and smart integration, this solution ensures better security and seamless communication. Designed for modern homes, it offers a smarter way to monitor and manage visitors efficiently.",
    progress: 72,
    leader: {
      id: 5,
      name: "B Sai Samanvitha",
      role: "23KD1A0214",
      image: "#"
    },
    members: [
      { id: 201, name: 'Person 1', role: '', image: '' },
      { id: 202, name: 'Person 2', role: '', image: '' },
      { id: 203, name: 'Person 3', role: '', image: '' },
      { id: 204, name: 'Person 4', role: '', image: '' },
      { id: 205, name: 'Person 5', role: '', image: '' },
      { id: 206, name: 'Person 6', role: '', image: '' },
      { id: 207, name: 'Person 7', role: '', image: '' },
      { id: 208, name: 'Person 8', role: '', image: '' }
    ],
    projectImages: [
      "#",
      "#"
    ]
  },
  {
    id: 3,
    name: "team3",
    description: "Smart Water Leakage Detector Using IOT",
    longDescription: "This project presents an IoT based water leakage detection system utilizes sensors to monitor water flow and pressure in real time. The system employs anomaly detection algorithms to identify potential leaks, triggering alerts to authorities via SMS or mobile app , now enabling prompt response to leaks, the system minimizes a water leakage, reduce damage and optimizes maintainance, supporting, sustainable resource management and enhanced water conservation efforts.",
    progress: 60,
    leader: {
      id: 8,
      name: "G Hyma",
      role: "23KD1A0234",
      image: "#"
    },
    members: [
      { id: 301, name: 'Person 1', role: '', image: '' },
      { id: 302, name: 'Person 2', role: '', image: '' },
      { id: 303, name: 'Person 3', role: '', image: '' },
      { id: 304, name: 'Person 4', role: '', image: '' },
      { id: 305, name: 'Person 5', role: '', image: '' },
      { id: 306, name: 'Person 6', role: '', image: '' },
      { id: 307, name: 'Person 7', role: '', image: '' },
      { id: 308, name: 'Person 8', role: '', image: '' }
    ],
    projectImages: [
      "#",
      "#"
    ]
  },
  {
    id: 4,
    name: "team4",
    description: "Train Accident Prevention",
    longDescription: "AudioSpace is revolutionizing the way we experience sound through innovative spatial audio technology. Our system creates immersive 3D soundscapes that can be customized for various environments without requiring specialized headphones or equipment. The technology has applications in virtual reality, home entertainment systems, and public spaces where directional sound can enhance user experience while reducing overall noise pollution.",
    progress: 45,
    leader: {
      id: 11,
      name: "K Ramya",
      role: "23KD1A0253",
      image: "#"
    },
    members: [
      { id: 401, name: 'Person 1', role: '', image: '' },
      { id: 402, name: 'Person 2', role: '', image: '' },
      { id: 403, name: 'Person 3', role: '', image: '' },
      { id: 404, name: 'Person 4', role: '', image: '' },
      { id: 405, name: 'Person 5', role: '', image: '' },
      { id: 406, name: 'Person 6', role: '', image: '' },
      { id: 407, name: 'Person 7', role: '', image: '' },
      { id: 408, name: 'Person 8', role: '', image: '' }
    ],
    projectImages: [
      "#",
      "#"
    ]
  },
  {
    id: 5,
    name: "team5",
    description: "Smart Dustbin Using Bluetooth Module",
    longDescription: "The Line Follower Smart Dustbin is an innovative solution aimed at enhancing waste management systems through automation and robotics. This smart dustbin is designed to autonomously navigate along a predefined path using line-following technology, guided by infrared or optical sensors. Equipped with a microcontroller, motor drivers, and obstacle detection sensors, the dustbin can follow black or white lines on the floor to reach specific waste collection points or return to its charging station. The automation helps in reducing human effort in large facilities like hospitals, offices, and shopping malls, thereby promoting hygiene and operational efficiency. The integration of smart technologies in this project demonstrates a cost-effective and scalable approach to modern waste disposal and collection.",
    progress: 65,
    leader: {
      id: 14,
      name: "G Pavani",
      role: "23KD1A0238",
      image: "#"
    },
    members: [
      { id: 501, name: 'Person 1', role: '', image: '' },
      { id: 502, name: 'Person 2', role: '', image: '' },
      { id: 503, name: 'Person 3', role: '', image: '' },
      { id: 504, name: 'Person 4', role: '', image: '' },
      { id: 505, name: 'Person 5', role: '', image: '' },
      { id: 506, name: 'Person 6', role: '', image: '' },
      { id: 507, name: 'Person 7', role: '', image: '' },
      { id: 508, name: 'Person 8', role: '', image: '' }
    ],
    projectImages: [
      "#",
      "#"
    ]
  },
  {
    id: 6,
    name: "team6",
    description: "Transmission Line Fault Detection",
    longDescription: "The Transmission Line Fault Detection project is a significant advancement in the field of power systems. The project utilizes a combination of relay modules, thermistor sensors, and transformers to detect faults ontransmission lines and improve the reliability of the power system. The use of these technologies allows for a timely and accurate detection of faults, preventing power outages and ensuring a safe and sustainable power system.The project also brings numerous benefits to society, including reduced energy losses, improved reliability, increased safety, and cost savings. The integration of the project with other systems, and continued advancements in technology, will lead to even greater benefits for society in the future.",
    progress: 55,
    leader: {
      id: 17,
      name: "J Gayatri",
      role: "23KD1A0246",
      image: "#"
    },
    members: [
      { id: 601, name: 'Person 1', role: '', image: '' },
      { id: 602, name: 'Person 2', role: '', image: '' },
      { id: 603, name: 'Person 3', role: '', image: '' },
      { id: 604, name: 'Person 4', role: '', image: '' },
      { id: 605, name: 'Person 5', role: '', image: '' },
      { id: 606, name: 'Person 6', role: '', image: '' },
      { id: 607, name: 'Person 7', role: '', image: '' },
      { id: 608, name: 'Person 8', role: '', image: '' }
    ],
    projectImages: [
      "#",
      "#"
    ]
  },
  {
    id: 7,
    name: "team7",
    description: "Automatic Plant Watering System Using Solar Panel",
    longDescription: "WasteZero is developing an integrated waste management system that combines IoT-enabled smart bins with an efficient collection network and recycling analytics platform. Our smart bins use sensors to monitor fill levels and waste composition, optimizing collection routes and schedules. The analytics platform provides insights into waste patterns, helping communities and businesses implement effective recycling programs and reduce landfill waste. This holistic approach aims to transform waste management from a linear process to a circular economy model.",
    progress: 80,
    leader: {
      id: 20,
      name: "G Anjali",
      role: "23KD1A0233",
      image: "#"
    },
    members: [
      { id: 701, name: 'Person 1', role: '', image: '' },
      { id: 702, name: 'Person 2', role: '', image: '' },
      { id: 703, name: 'Person 3', role: '', image: '' },
      { id: 704, name: 'Person 4', role: '', image: '' },
      { id: 705, name: 'Person 5', role: '', image: '' },
      { id: 706, name: 'Person 6', role: '', image: '' },
      { id: 707, name: 'Person 7', role: '', image: '' },
      { id: 708, name: 'Person 8', role: '', image: '' }
    ],
    projectImages: [
      "#",
      "#"
    ]
  },
  {
    id: 8,
    name: "team8",
    description: "Road Accident Prevention in Hilly Areas",
    longDescription: "CyberShield is creating a comprehensive security solution for IoT networks that protects against emerging threats without compromising device performance. Our approach combines lightweight encryption algorithms, behavioral anomaly detection, and a distributed security architecture that can scale from small home networks to large industrial installations. As IoT devices become increasingly integrated into critical infrastructure, CyberShield aims to establish new standards for secure connectivity while maintaining the ease of use that consumers expect.",
    progress: 30,
    leader: {
      id: 23,
      name: "Ch Hemalatha",
      role: "23KD1A0224",
      image: "#"
    },
    members: [
      { id: 801, name: 'Person 1', role: '', image: '' },
      { id: 802, name: 'Person 2', role: '', image: '' },
      { id: 803, name: 'Person 3', role: '', image: '' },
      { id: 804, name: 'Person 4', role: '', image: '' },
      { id: 805, name: 'Person 5', role: '', image: '' },
      { id: 806, name: 'Person 6', role: '', image: '' },
      { id: 807, name: 'Person 7', role: '', image: '' },
      { id: 808, name: 'Person 8', role: '', image: '' }
    ],
    projectImages: [
      "#",
      "#"
    ]
  },
  {
    id: 9,
    name: "team9",
    description: "Home Automation",
    longDescription: "MediSync is building a comprehensive healthcare monitoring platform that connects patients, healthcare providers, and medical devices through a secure, unified interface. The system allows for remote monitoring of chronic conditions, automated medication management, and early detection of health deterioration through trend analysis. By centralizing patient data while maintaining strict privacy controls, MediSync improves care coordination and empowers patients to take a more active role in managing their health conditions.",
    progress: 48,
    leader: {
      id: 26,
      name: "K Vasavi",
      role: "23KD1A0251",
      image: "#"
    },
    members: [
      { id: 901, name: 'Person 1', role: '', image: '' },
      { id: 902, name: 'Person 2', role: '', image: '' },
      { id: 903, name: 'Person 3', role: '', image: '' },
      { id: 904, name: 'Person 4', role: '', image: '' },
      { id: 905, name: 'Person 5', role: '', image: '' },
      { id: 906, name: 'Person 6', role: '', image: '' },
      { id: 907, name: 'Person 7', role: '', image: '' },
      { id: 908, name: 'Person 8', role: '', image: '' }
    ],
    projectImages: [
      "#",
      "#"
    ]
  },
  {
    id: 10,
    name: "team1",
    description: "IOT Based Battery Monitoring System",
    longDescription: "The Internet of Things (IoT)-based Battery Monitoring System using Arduino is designed to remotely monitor the status and performance of batteries in real-time, enhancing safety, efficiency, and reliability. This system continuously measures key battery parameters such as voltage, current, temperature, and state of charge (SoC) using appropriate sensors interfaced with an Arduino microcontroller. The collected data is then transmitted to an IoT platform (like Blynk or Thingspeak) via a Wi-Fi module (e.g., ESP8266), enabling users to access live battery statistics through a web or mobile application. Alerts for abnormal conditions such as overcharging, deep discharging, or overheating are also generated to prevent damage and extend battery lifespan. This project is particularly useful for remote energy systems, electric vehicles, and UPS setups, providing an effective and low-cost solution for battery health monitoring and maintenance.",
    progress: 70,
    leader: {
      id: 29,
      name: "Ch Pujitha",
      role: "23KD1A0222",
      image: "#"
    },
    members: [
      { id: 1001, name: 'Person 1', role: '', image: '' },
      { id: 1002, name: 'Person 2', role: '', image: '' },
      { id: 1003, name: 'Person 3', role: '', image: '' },
      { id: 1004, name: 'Person 4', role: '', image: '' },
      { id: 1005, name: 'Person 5', role: '', image: '' },
      { id: 1006, name: 'Person 6', role: '', image: '' },
      { id: 1007, name: 'Person 7', role: '', image: '' },
      { id: 1008, name: 'Person 8', role: '', image: '' }
    ],
    projectImages: [
      "#",
      "#"
    ]
  },
  {
    id: 11,
    name: "team2",
    description: "Alcohol Detector and Engine Locking System",
    longDescription: "This project aims to develop a cutting-edge system that integrates alcohol detection with vehicle engine locking to prevent drunk driving. Utilizing a breathalyzer sensor, the system detects the driver's blood alcohol concentration (BAC) in real-time. If the BAC exceeds the legal limit, the system automatically locks the engine, preventing the vehicle from starting. This technology combines safety, innovation, and compliance with road safety regulations..",
    progress: 35,
    leader: {
      id: 32,
      name: "A Rupa Rani",
      role: "24KD5A0202",
      image: "#"
    },
    members: [
      { id: 1101, name: 'Person 1', role: '', image: '' },
      { id: 1102, name: 'Person 2', role: '', image: '' },
      { id: 1103, name: 'Person 3', role: '', image: '' },
      { id: 1104, name: 'Person 4', role: '', image: '' },
      { id: 1105, name: 'Person 5', role: '', image: '' },
      { id: 1106, name: 'Person 6', role: '', image: '' },
      { id: 1107, name: 'Person 7', role: '', image: '' },
      { id: 1108, name: 'Person 8', role: '', image: '' }
    ],
    projectImages: [
      "#",
      "#"
    ]
  },
  {
    id: 12,
    name: "team3",
    description: "Smart Energy Meter",
    longDescription: "This project presents the design and implementation of a Smart Energy Meter using an ESP32 microcontroller, ACS712 current sensor, ZMPT101B voltage sensor, and a 16x2 LCD display. The aim is to monitor and display real-time electrical energy consumption of household appliances. By measuring current and voltage accurately, the system calculates power consumption and displays it on the LCD. The ESP32 acts as the brain of the system, processing sensor data and providing future options for IoT-based energy tracking. This low-cost and compact setup helps users become more energy-aware and supports smart energy management in households.",
    progress: 55,
    leader: {
      id: 35,
      name: "G Tarun Sai",
      role: "23KD1A0237",
      image: "#"
    },
    members: [
      { id: 1201, name: 'Person 1', role: '', image: '' },
      { id: 1202, name: 'Person 2', role: '', image: '' },
      { id: 1203, name: 'Person 3', role: '', image: '' },
      { id: 1204, name: 'Person 4', role: '', image: '' },
      { id: 1205, name: 'Person 5', role: '', image: '' },
      { id: 1206, name: 'Person 6', role: '', image: '' },
      { id: 1207, name: 'Person 7', role: '', image: '' },
      { id: 1208, name: 'Person 8', role: '', image: '' }
    ],
    projectImages: [
      "#",
      "#"
    ]
  },
  {
    id: 13,
    name: "team4",
    description: "Wet and Dry Waste Segregation",
    longDescription: "Our project focuses on efficient segregation of wet and dry waste to promote sustainable waste management. By implementing smart sorting mechanisms, we aim to reduce environmental pollution and improve recycling efficiency. This system encourages responsible disposal practices, helping communities maintain cleaner surroundings while supporting eco-friendly habits and reducing landfill burden through automated or manual separation techniques.",
    progress: 100,
    leader: {
      id: 38,
      name: "Ch Sohitha Sai",
      role: "23KD1A0219",
      image: "#"
    },
    members: [
      { id: 1301, name: 'Person 1', role: '', image: '' },
      { id: 1302, name: 'Person 2', role: '', image: '' },
      { id: 1303, name: 'Person 3', role: '', image: '' },
      { id: 1304, name: 'Person 4', role: '', image: '' },
      { id: 1305, name: 'Person 5', role: '', image: '' },
      { id: 1306, name: 'Person 6', role: '', image: '' },
      { id: 1307, name: 'Person 7', role: '', image: '' },
      { id: 1308, name: 'Person 8', role: '', image: '' }
    ],
    projectImages: [
      "#",
      "#"
    ]
  },
  {
    id: 14,
    name: "team5",
    description: "Solar Power Irrigation System",
    longDescription: "UrbanFarm is developing compact, efficient vertical farming systems specifically designed for urban environments. Our modular hydroponic units can be installed in various spaces from residential buildings to unused urban lots, enabling local food production with minimal water and energy usage. The system incorporates automated climate control, nutrient delivery, and lighting to optimize plant growth while requiring minimal maintenance. This project addresses challenges in urban food security, reduces the carbon footprint of food transportation, and creates green spaces in densely populated areas.",
    progress: 75,
    leader: {
      id: 41,
      name: "K Sandeep Babu",
      role: "23KD1A0257",
      image: "#"
    },
    members: [
      { id: 1401, name: 'Person 1', role: '', image: '' },
      { id: 1402, name: 'Person 2', role: '', image: '' },
      { id: 1403, name: 'Person 3', role: '', image: '' },
      { id: 1404, name: 'Person 4', role: '', image: '' },
      { id: 1405, name: 'Person 5', role: '', image: '' },
      { id: 1406, name: 'Person 6', role: '', image: '' },
      { id: 1407, name: 'Person 7', role: '', image: '' },
      { id: 1408, name: 'Person 8', role: '', image: '' }
    ],
    projectImages: [
      "#",
      "#"
    ]
  },
  {
    id: 15,
    name: "team6",
    description: "Smart Leave Management System",
    longDescription: "A Smart Leave Management System for colleges is an automated platform that simplifies leave applications, approvals, and tracking for students, faculty, and staff. It eliminates manual paperwork, reduces errors, and ensures adherence to institutional policies. Students can apply for leave online, faculty can approve/reject requests, and administration can maintain records efficiently. Features include real-time leave balance tracking, automated notifications, customizable policies, and seamless integration with attendance management systems.",
    progress: 80,
    leader: {
      id: 44,
      name: "Ch Hemanth Kumar",
      role: "23KD1A0220",
      image: "#"
    },
    members: [
      { id: 1501, name: 'Person 1', role: '', image: '' },
      { id: 1502, name: 'Person 2', role: '', image: '' },
      { id: 1503, name: 'Person 3', role: '', image: '' },
      { id: 1504, name: 'Person 4', role: '', image: '' },
      { id: 1505, name: 'Person 5', role: '', image: '' },
      { id: 1506, name: 'Person 6', role: '', image: '' },
      { id: 1507, name: 'Person 7', role: '', image: '' },
      { id: 1508, name: 'Person 8', role: '', image: '' }
    ],
    projectImages: [
      "#",
      "#"
    ]
  },
  {
    id: 16,
    name: "team7",
    description: "Smart Parking System",
    longDescription: "The Internet of Things (IoT)-based Battery Monitoring System using Arduino is designed to remotely monitor the status and performance of batteries in real-time, enhancing safety, efficiency, and reliability. This system continuously measures key battery parameters such as voltage, current, temperature, and state of charge (SoC) using appropriate sensors interfaced with an Arduino microcontroller. The collected data is then transmitted to an IoT platform (like Blynk or Thingspeak) via a Wi-Fi module (e.g., ESP8266), enabling users to access live battery statistics through a web or mobile application. Alerts for abnormal conditions such as overcharging, deep discharging, or overheating are also generated to prevent damage and extend battery lifespan. This project is particularly useful for remote energy systems, electric vehicles, and UPS setups, providing an effective and low-cost solution for battery health monitoring and maintenance.",
    progress: 42,
    leader: {
      id: 47,
      name: "G Kavitha",
      role: "23KD1A0239",
      image: "#"
    },
    members: [
      { id: 1601, name: 'Person 1', role: '', image: '' },
      { id: 1602, name: 'Person 2', role: '', image: '' },
      { id: 1603, name: 'Person 3', role: '', image: '' },
      { id: 1604, name: 'Person 4', role: '', image: '' },
      { id: 1605, name: 'Person 5', role: '', image: '' },
      { id: 1606, name: 'Person 6', role: '', image: '' },
      { id: 1607, name: 'Person 7', role: '', image: '' },
      { id: 1608, name: 'Person 8', role: '', image: '' }
    ],
    projectImages: [
      "#",
      "#"
    ]
  },
  {
    id: 17,
    name: "team8",
    description: "Smart Blind Stick",
    longDescription: "CloudCast is creating a hyperlocal weather prediction system that provides precise forecasts for small geographic areas. By combining data from distributed weather sensors, satellite imagery, and machine learning algorithms, our system can predict microclimate variations that traditional forecasting methods miss. The technology is particularly valuable for agriculture, outdoor event planning, and emergency management during severe weather events. We're also developing specialized applications for renewable energy production forecasting to help optimize solar and wind farm operations.",
    progress: 65,
    leader: {
      id: 50,
      name: "M Adhi Lakshmi",
      role: "23KD1A0264",
      image: "#"
    },
    members: [
      { id: 1701, name: 'Person 1', role: '', image: '' },
      { id: 1702, name: 'Person 2', role: '', image: '' },
      { id: 1703, name: 'Person 3', role: '', image: '' },
      { id: 1704, name: 'Person 4', role: '', image: '' },
      { id: 1705, name: 'Person 5', role: '', image: '' },
      { id: 1706, name: 'Person 6', role: '', image: '' },
      { id: 1707, name: 'Person 7', role: '', image: '' },
      { id: 1708, name: 'Person 8', role: '', image: '' }
    ],
    projectImages: [
      "#",
      "#"
    ]
  },
  {
    id: 18,
    name: "team9",
    description: "Sample Description",
    longDescription: "Sample Long Description.",
    progress: 50,
    leader: {
      id: 53,
      name: "Leader Name",
      role: "Sample Role",
      image: "#"
    },
    members: [
      { id: 1801, name: 'Person 1', role: '', image: '' },
      { id: 1802, name: 'Person 2', role: '', image: '' },
      { id: 1803, name: 'Person 3', role: '', image: '' },
      { id: 1804, name: 'Person 4', role: '', image: '' },
      { id: 1805, name: 'Person 5', role: '', image: '' },
      { id: 1806, name: 'Person 6', role: '', image: '' },
      { id: 1807, name: 'Person 7', role: '', image: '' },
      { id: 1808, name: 'Person 8', role: '', image: '' }
    ],
    projectImages: [
      "#",
      "#"
    ]
  }
];

// Information about the department mentor
export const mentorData = {
  name: "Bugatha Ram Vara Prasad",
  title: "Assistant Professor, Dept. Of EEE",
  image: "#",
  bio: "Ram Vara Prasad Bugatha is an Assistant Professor in the Department of Electrical and Electronics Engineering (EEE) with over four years of experience in academia. His expertise lies in Power and Industrial Drives, and he holds an M.Tech degree, currently pursuing a Ph.D. Passionate about technological advancements, he has actively participated in numerous Faculty Development Programs (FDPs) and workshops on Industrial Automation, IoT, Embedded Systems, and Power Systems.An accomplished researcher, he has published extensively in reputed journals and conferences, focusing on Smart Electric Vehicles, Renewable Energy Applications, Power Quality Enhancement, and Advanced Motor Control Strategies. He has also presented his work at national and international conferences, contributing to the discourse on sustainable and efficient energy solutions.Beyond research, he has guided several student projects, including IoT-based home automation, smart electric vehicles, and solar-powered charging stations for EVs. A dedicated mentor, he holds multiple NPTEL certifications and actively engages in professional bodies such as ISTE, IAENG, and IFERP, fostering academic excellence and innovation in electrical engineering."
};
