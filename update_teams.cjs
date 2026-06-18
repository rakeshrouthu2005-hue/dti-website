const fs = require('fs');

const data = {
    2: {
        name: "team2",
        description: "Gesture Based Intelligent Appliance Control",
        longDescription: "Gesture Based Intelligent Appliance Control is an innovative system that allows users to control computer functions and electrical appliances using hand gestures. The project uses OpenCV and MediaPipe for real-time hand gesture detection and interpretation. By integrating Arduino UNO and LED modules, the system demonstrates appliance control without physical switches or remote controls. This improves user convenience, accessibility, and serves as a foundation for future smart home automation.",
        leader: { name: "B. Hema Shekar", role: "24KD1A0224" },
        members: [
            { name: "B. Jaya Lakshmi", role: "24KD1A0214" },
            { name: "B. Yekavali", role: "24KD1A0215" },
            { name: "B. Yamini", role: "24KD1A0217" },
            { name: "B. Durga Prasad", role: "24KD1A0218" },
            { name: "B. Mohan", role: "24KD1A0219" },
            { name: "B. Hema Shekar", role: "24KD1A0224" }
        ]
    },
    6: {
        name: "team6",
        description: "Emergency Assistance and Alert Application",
        longDescription: "The Emergency Assistance and Alert Application is a mobile app designed to provide immediate help during emergencies. The application enables users to quickly access nearby police stations, hospitals, ambulance services, and fire stations. Special emergency features such as Fire, Health, and SOS alerts allow users to share their live location and seek assistance instantly. The system improves personal safety by ensuring faster communication and coordination with emergency response services.",
        leader: { name: "Korada Ramana Pradeep", role: "24KD1A0266" },
        members: [
            { name: "K. Koteswara Rao", role: "24KD1A0265" },
            { name: "K. Ramana Pradeep", role: "24KD1A0266" },
            { name: "K. Tarun", role: "24KD1A0269" },
            { name: "L. Venkat Lakshmi", role: "24KD1A0275" },
            { name: "M. Dinesh", role: "24KD1A0276" },
            { name: "M. Lokesh", role: "24KD1A0277" },
            { name: "M. Laxman", role: "24KD1A0278" }
        ]
    },
    7: {
        name: "team7",
        description: "IoT Based Smart Dustbin",
        longDescription: "The Smart Garbage Monitoring System automatically monitors garbage levels inside a dustbin using sensors. It uses an ultrasonic sensor and microcontroller to detect the fill level of waste and display the status on an LCD screen. The system can also generate alerts when the dustbin is nearly full, ensuring timely waste collection. This project helps reduce garbage overflow, improves cleanliness and hygiene, and supports smart city initiatives through efficient waste management.",
        leader: { name: "M. Thanuja", role: "" },
        members: [
            { name: "P. Mamini", role: "24KD1A0280" },
            { name: "M. Lavanya", role: "24KD1A0283" },
            { name: "M. Jayathi", role: "24KD1A0284" },
            { name: "M. Mohitha Sri", role: "24KD1A0285" },
            { name: "N. Krishnaveni", role: "24KD1A0287" },
            { name: "P. Balaji", role: "24KD1A0292" }
        ]
    },
    8: {
        name: "team8",
        description: "Smart Gas Leakage Detection and Safety System",
        longDescription: "The Smart Gas Leakage Detection and Safety System is designed to detect gas leaks in real time and automatically activate safety measures. The system uses a gas sensor, microcontroller, relay module, and IoT components to monitor gas concentration levels. When leakage is detected, the system triggers a buzzer alarm, LED indicator, and exhaust fan. It can also send alerts to users and optionally shut off the gas supply through a solenoid valve. The project provides an affordable and effective solution for enhancing safety in homes and industries.",
        leader: { name: "P. Keerthi", role: "24KD1A0294" },
        members: [
            { name: "P. Keerthi", role: "24KD1A0294" },
            { name: "P. Hemanth Sai", role: "24KD1A0298" },
            { name: "P. Koteswara Rao", role: "24KD1A0299" },
            { name: "P. Abhilash", role: "24KD1A02A1" },
            { name: "R. Tejaswani", role: "24KD1A02A3" },
            { name: "R. Sowjanya", role: "24KD1A02A5" },
            { name: "R. Uma Maheshwara Rao", role: "24KD1A02A6" }
        ]
    },
    9: {
        name: "team9",
        description: "Government Scheme Finder",
        longDescription: "Government Scheme Finder is a web-based platform that helps citizens discover government welfare schemes that match their profile and requirements. Users can enter details such as age, gender, occupation, income, and category. Based on the provided information, the system analyzes eligibility and recommends suitable schemes. It displays scheme descriptions, benefits, eligibility criteria, and application links in a simple and user-friendly manner. The platform improves awareness, accessibility, and utilization of government welfare programs.",
        leader: { name: "S. Mounika", role: "24KD1A02B6" },
        members: [
            { name: "R. Rajeswari", role: "24KD1A02A7" },
            { name: "R. Rakesh", role: "24KD1A02A8" },
            { name: "S. Jyotshna Sri", role: "24KD1A02B1" },
            { name: "S. Bhargavi", role: "24KD1A02B4" },
            { name: "S. Mounika", role: "24KD1A02B6" },
            { name: "T. Kuldeep Kumar", role: "24KD1A02B8" },
            { name: "T. Mohith Sai", role: "24KD1A02B9" }
        ]
    },
    10: {
        name: "team10", // Updated from team1
        description: "Smart Energy Guardian",
        longDescription: "Smart Energy Guardian is a smart home automation project that enables users to remotely monitor and control electrical appliances through a mobile website. The system utilizes an ESP32-based microcontroller, Wi-Fi connectivity, relay modules, and a web application developed using HTML, CSS, and JavaScript. Users can switch appliances ON or OFF using their smartphones from any location with internet access. The project improves convenience, accessibility, and energy management while providing a low-cost foundation for future smart home automation systems.",
        leader: { name: "V. Arun Kumar", role: "24KD1A02C6" },
        members: [
            { name: "T. Kavya", role: "24KD1A02C0" },
            { name: "T. Hemalatha", role: "24KD1A02C1" },
            { name: "T. Chandu", role: "24KD1A02C3" },
            { name: "U. Bhargavi", role: "24KD1A02C4" },
            { name: "U. Umamaheswari", role: "24KD1A02C5" },
            { name: "V. Arun Kumar", role: "24KD1A02C6" },
            { name: "Y. Janaki", role: "24KD1A02C9" },
            { name: "Y. Navya Sri", role: "24KD1A02D0" }
        ]
    }
};

const filepath = '/Users/hemanthkumar/dti-website/dti-website/src/data/teamsData.ts';
let content = fs.readFileSync(filepath, 'utf8');

// The file has a structured object for each team. We can replace each object with our new object.
// To do this reliably, we can search for the start of the object and end of the object for a given ID and eee-a.

for (let i = 0; i < 12; i++) {
    // we need to only modify ids in our data object
    const teamId = i + 1;
    if (!data[teamId]) continue;
    const teamData = data[teamId];
    
    // We are looking for something like:
    //   {
    //     id: 2,
    //     ...
    //     section: "eee-a"
    //   },
    // Since some fields might be reordered, the safest way is a regex that captures the whole block from "id: X," until "section: "eee-a"\n  },"
    
    // Regular expression to match an entire object in the array where id is teamId and section is eee-a.
    // It starts with \n  {\n    id: X, ... and ends with section: "eee-a"\n  },
    const regex = new RegExp(`  {\\s*id: ${teamId},[\\s\\S]*?section: "eee-a"\\s*},`);
    
    const match = content.match(regex);
    if (match) {
        // Construct replacement text
        let membersText = teamData.members.map((m, idx) => `      {
        id: ${teamId}0${idx + 1},
        name: "${m.name}",
        role: "${m.role}",
        image: ""
      }`).join(',\n');

        let replacement = `  {
    id: ${teamId},
    name: "${teamData.name}",
    description: "${teamData.description}",
    longDescription: "${teamData.longDescription}",
    progress: 50,
    leader: {
      id: ${teamId * 3 - 1}, // random ID based on old pattern
      name: "${teamData.leader.name}",
      role: "${teamData.leader.role}",
      image: "#"
    },
    members: [
${membersText}
    ],
    projectImages: [
      "#",
      "#"
    ],
    section: "eee-a"
  },`;
        content = content.replace(regex, replacement);
    } else {
        console.log(`Could not find team ${teamId} in eee-a`);
    }
}

fs.writeFileSync(filepath, content, 'utf8');
console.log('Done');
