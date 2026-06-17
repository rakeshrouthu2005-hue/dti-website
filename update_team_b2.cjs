const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/data/teamsData.ts');
let content = fs.readFileSync(filePath, 'utf8');

const match = content.match(/export const teamsData: Team\[\] = (\[[\s\S]*?\]);\n\n\/\//);
if (match) {
  let teams = eval(match[1]);
  
  const teamIndex = teams.findIndex(t => t.section === 'eee-b' && t.id === 2);
  if (teamIndex !== -1) {
    teams[teamIndex] = {
      id: 2,
      section: 'eee-b',
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
        { id: 201, name: "B.praveen", role: "24kd1a0220", image: "" },
        { id: 202, name: "B.dileep", role: "24kd1a0223", image: "" },
        { id: 203, name: "CH.Rohith", role: "24kd1a0229", image: "" },
        { id: 204, name: "D Lokeaswari", role: "24kd1a0231", image: "" },
        { id: 205, name: "D.sai kumar", role: "24kd1a0233", image: "" },
        { id: 206, name: "G lavanya", role: "24kd1a0238", image: "" }
      ],
      projectImages: ["#", "#"]
    };
    
    const newTeamsStr = JSON.stringify(teams, null, 2).replace(/"([^"]+)":/g, '$1:');
    const newContent = content.replace(/export const teamsData: Team\[\] = (\[[\s\S]*?\]);\n\n\/\//, `export const teamsData: Team[] = ${newTeamsStr};\n\n//`);
    
    fs.writeFileSync(filePath, newContent);
    console.log('Successfully updated Team 2 of EEE-B.');
  } else {
    console.log('Team 2 of EEE-B not found.');
  }
} else {
  console.log('Failed to parse teamsData.ts');
}
