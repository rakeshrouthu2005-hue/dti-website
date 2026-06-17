const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/data/teamsData.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Update Interface
content = content.replace(
  /export interface Team {\n  id: number;/,
  "export interface Team {\n  id: number;\n  section: 'eee-a' | 'eee-b';"
);

// Update Array
const match = content.match(/export const teamsData: Team\[\] = (\[[\s\S]*?\]);\n\n\/\//);
if (match) {
  let teams = eval(match[1]);
  
  teams = teams.map((team, index) => {
    // 0-11 -> eee-a (id: 1-12)
    // 12-23 -> eee-b (id: 1-12)
    const isSectionA = index < 12;
    team.section = isSectionA ? 'eee-a' : 'eee-b';
    team.id = isSectionA ? index + 1 : index - 11;
    return team;
  });

  const newTeamsStr = JSON.stringify(teams, null, 2).replace(/"([^"]+)":/g, '$1:');
  content = content.replace(/export const teamsData: Team\[\] = (\[[\s\S]*?\]);\n\n\/\//, `export const teamsData: Team[] = ${newTeamsStr};\n\n//`);
  
  fs.writeFileSync(filePath, content);
  console.log('Successfully restructured teamsData.ts with section info and local IDs.');
} else {
  console.log('Failed to parse teamsData.ts');
}
