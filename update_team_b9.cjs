const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/data/teamsData.ts');
let content = fs.readFileSync(filePath, 'utf8');

const match = content.match(/export const teamsData: Team\[\] = (\[[\s\S]*?\]);\n\n\/\//);
if (match) {
  let teams = eval(match[1]);
  
  const teamIndex = teams.findIndex(t => t.section === 'eee-b' && t.id === 9);
  if (teamIndex !== -1) {
    teams[teamIndex] = {
      id: 9,
      section: 'eee-b',
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
        { id: 901, name: "VARANASI JASWANTH", role: "24KD1A02C7", image: "" },
        { id: 902, name: "YADLA UDAYA SRI", role: "24KD1A02C8", image: "" },
        { id: 903, name: "BEVARA SRIKAR", role: "25KD5A0201", image: "" },
        { id: 904, name: "CHINTHADA NAVYA", role: "25KD5A0203", image: "" },
        { id: 905, name: "GEDDAM MANISHA", role: "25KD5A0204", image: "" },
        { id: 906, name: "KOPPALA CHANDINI", role: "25KD5A0206", image: "" }
      ],
      projectImages: ["#", "#"]
    };
    
    const newTeamsStr = JSON.stringify(teams, null, 2).replace(/"([^"]+)":/g, '$1:');
    const newContent = content.replace(/export const teamsData: Team\[\] = (\[[\s\S]*?\]);\n\n\/\//, `export const teamsData: Team[] = ${newTeamsStr};\n\n//`);
    
    fs.writeFileSync(filePath, newContent);
    console.log('Successfully updated Team 9 of EEE-B.');
  } else {
    console.log('Team 9 of EEE-B not found.');
  }
} else {
  console.log('Failed to parse teamsData.ts');
}
