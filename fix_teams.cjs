const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/data/teamsData.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Use regex to extract the teamsData array
const match = content.match(/export const teamsData: Team\[\] = (\[[\s\S]*?\]);\n\n\/\//);
if (match) {
  let teams = eval(match[1]);
  
  // Update existing teams
  teams = teams.map((team, index) => {
    // Trim members to 6
    if (team.members && team.members.length > 6) {
      team.members = team.members.slice(0, 6);
    }
    return team;
  });

  // Add missing teams up to 24
  while (teams.length < 24) {
    const id = teams.length + 1;
    teams.push({
      id: id,
      name: `Team ${id}`,
      description: "Sample Description",
      longDescription: "Sample Long Description.",
      progress: 50,
      leader: {
        id: id * 10,
        name: `Leader ${id}`,
        role: "",
        image: "#"
      },
      members: Array.from({ length: 6 }).map((_, i) => ({
        id: id * 100 + i + 1,
        name: `Person ${i + 1}`,
        role: "",
        image: ""
      })),
      projectImages: ["#", "#"]
    });
  }

  // Convert back to string and replace in file
  const newTeamsStr = JSON.stringify(teams, null, 2).replace(/"([^"]+)":/g, '$1:');
  const newContent = content.replace(/export const teamsData: Team\[\] = (\[[\s\S]*?\]);\n\n\/\//, `export const teamsData: Team[] = ${newTeamsStr};\n\n//`);
  
  fs.writeFileSync(filePath, newContent);
  console.log('Successfully updated teamsData.ts with 24 teams and 6 members each.');
} else {
  console.log('Failed to parse teamsData.ts');
}
