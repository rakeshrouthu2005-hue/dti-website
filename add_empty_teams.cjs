const fs = require('fs');

const filepath = '/Users/hemanthkumar/dti-website/dti-website/src/data/teamsData.ts';
let content = fs.readFileSync(filepath, 'utf8');

const emptyTeams = [1, 3, 4, 5].map(id => `  {
    id: ${id},
    name: "team${id}",
    description: "Project Title (TBD)",
    longDescription: "Project details and abstract will be updated soon.",
    progress: 0,
    leader: {
      id: ${id * 3},
      name: "Leader ${id}",
      role: "",
      image: "#"
    },
    members: [
      { id: ${id}01, name: "Person 1", role: "", image: "" },
      { id: ${id}02, name: "Person 2", role: "", image: "" },
      { id: ${id}03, name: "Person 3", role: "", image: "" },
      { id: ${id}04, name: "Person 4", role: "", image: "" },
      { id: ${id}05, name: "Person 5", role: "", image: "" },
      { id: ${id}06, name: "Person 6", role: "", image: "" }
    ],
    projectImages: ["#", "#"],
    section: "eee-a"
  }`).join(',\n');

// Insert after `export const teamsData: Team[] = [\n`
content = content.replace('export const teamsData: Team[] = [\n', `export const teamsData: Team[] = [\n${emptyTeams},\n`);

fs.writeFileSync(filepath, content, 'utf8');
console.log('Empty teams added');
