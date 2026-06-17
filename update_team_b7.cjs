const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/data/teamsData.ts');
let content = fs.readFileSync(filePath, 'utf8');

const match = content.match(/export const teamsData: Team\[\] = (\[[\s\S]*?\]);\n\n\/\//);
if (match) {
  let teams = eval(match[1]);
  
  const teamIndex = teams.findIndex(t => t.section === 'eee-b' && t.id === 7);
  if (teamIndex !== -1) {
    teams[teamIndex] = {
      id: 7,
      section: 'eee-b',
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
        { id: 701, name: "P.Rajeev", role: "24KD1A0293", image: "" },
        { id: 702, name: "P.Vamsi", role: "24KD1A0295", image: "" },
        { id: 703, name: "P.Hemanth", role: "24KD1A0297", image: "" },
        { id: 704, name: "P.Hemanth", role: "24KD1A02A0", image: "" },
        { id: 705, name: "R.Sagar", role: "24KD1A02A2", image: "" },
        { id: 706, name: "R.Vinay kumar", role: "24KD1A02A4", image: "" }
      ],
      projectImages: ["#", "#"]
    };
    
    const newTeamsStr = JSON.stringify(teams, null, 2).replace(/"([^"]+)":/g, '$1:');
    const newContent = content.replace(/export const teamsData: Team\[\] = (\[[\s\S]*?\]);\n\n\/\//, `export const teamsData: Team[] = ${newTeamsStr};\n\n//`);
    
    fs.writeFileSync(filePath, newContent);
    console.log('Successfully updated Team 7 of EEE-B.');
  } else {
    console.log('Team 7 of EEE-B not found.');
  }
} else {
  console.log('Failed to parse teamsData.ts');
}
