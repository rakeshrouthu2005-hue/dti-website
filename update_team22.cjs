const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/data/teamsData.ts');
let content = fs.readFileSync(filePath, 'utf8');

const match = content.match(/export const teamsData: Team\[\] = (\[[\s\S]*?\]);\n\n\/\//);
if (match) {
  let teams = eval(match[1]);
  
  const teamIndex = teams.findIndex(t => t.id === 22);
  if (teamIndex !== -1) {
    teams[teamIndex] = {
      id: 22,
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
        { id: 2201, name: "LAKKOJU PUJITHA", role: "25kd5a0207", image: "" },
        { id: 2202, name: "NATTA ARPITHA LILLY", role: "25kd5a0209", image: "" },
        { id: 2203, name: "RAVADA SAIKUMAR", role: "25kd5a0210", image: "" },
        { id: 2204, name: "VANKARA BHANU PRASAD", role: "25kd5a0211", image: "" },
        { id: 2205, name: "VUPPALA PAVAN KUMAR", role: "25kd5a0212", image: "" },
        { id: 2206, name: "CHAPPA YASWANTH KUMAR", role: "25kd5a0213", image: "" }
      ],
      projectImages: ["#", "#"]
    };
    
    const newTeamsStr = JSON.stringify(teams, null, 2).replace(/"([^"]+)":/g, '$1:');
    const newContent = content.replace(/export const teamsData: Team\[\] = (\[[\s\S]*?\]);\n\n\/\//, `export const teamsData: Team[] = ${newTeamsStr};\n\n//`);
    
    fs.writeFileSync(filePath, newContent);
    console.log('Successfully updated Team 22 (Team 10 of EEE-B).');
  } else {
    console.log('Team 22 not found.');
  }
} else {
  console.log('Failed to parse teamsData.ts');
}
