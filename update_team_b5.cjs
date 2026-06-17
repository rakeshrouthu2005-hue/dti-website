const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/data/teamsData.ts');
let content = fs.readFileSync(filePath, 'utf8');

const match = content.match(/export const teamsData: Team\[\] = (\[[\s\S]*?\]);\n\n\/\//);
if (match) {
  let teams = eval(match[1]);
  
  const teamIndex = teams.findIndex(t => t.section === 'eee-b' && t.id === 5);
  if (teamIndex !== -1) {
    teams[teamIndex] = {
      id: 5,
      section: 'eee-b',
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
        { id: 501, name: "K. RISHITA", role: "24KD1A0267", image: "" },
        { id: 502, name: "L. CHARAN TEJA", role: "24KD1A0270", image: "" },
        { id: 503, name: "L. MOHAN", role: "24KD1A0271", image: "" },
        { id: 504, name: "L. DHARMENDRA", role: "24KD1A0272", image: "" },
        { id: 505, name: "L. RAVI", role: "24KD1A0273", image: "" },
        { id: 506, name: "L. SHYAM", role: "24KD1A0274", image: "" }
      ],
      projectImages: ["#", "#"]
    };
    
    const newTeamsStr = JSON.stringify(teams, null, 2).replace(/"([^"]+)":/g, '$1:');
    const newContent = content.replace(/export const teamsData: Team\[\] = (\[[\s\S]*?\]);\n\n\/\//, `export const teamsData: Team[] = ${newTeamsStr};\n\n//`);
    
    fs.writeFileSync(filePath, newContent);
    console.log('Successfully updated Team 5 of EEE-B.');
  } else {
    console.log('Team 5 of EEE-B not found.');
  }
} else {
  console.log('Failed to parse teamsData.ts');
}
