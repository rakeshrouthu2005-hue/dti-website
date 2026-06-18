const fs = require('fs');
const filepath = '/Users/hemanthkumar/dti-website/dti-website/src/data/teamsData.ts';
let content = fs.readFileSync(filepath, 'utf8');

const idsToRemove = [1, 3, 4, 5, 11, 12];

for (const id of idsToRemove) {
    // Only match 'id: X,' if it is followed by 'name:' inside the main object, and preceded by '  {'
    const regex = new RegExp(`  {\\s*id: ${id},\\s*name:[\\s\\S]*?section: "eee-a"\\s*},?\n?`);
    content = content.replace(regex, '');
}

fs.writeFileSync(filepath, content, 'utf8');
console.log('Removed specific teams safely');
