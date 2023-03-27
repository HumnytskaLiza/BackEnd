const fs = require("fs");

// Read scenario
const text = fs.readFileSync("./scenario.txt").toString();

// Get indexes of starts and ends of lines
let a = text;
const res = {};
const b = [...a.matchAll(/^(Triss|Geralt|Max|Yennefer):/gim)];
for (let i = 0; i < b.length; i += 1) {
  const match = b[i];
  const [_1, characterName] = match;
  const { index } = match;
  if (res[characterName]) {
    res[characterName].push({
      start: index,
      end: b[i + 1] ? b[i + 1].index : a.length,
    });
    console.log;
  } else {
    res[characterName] = [
      {
        start: index,
        end: b[i + 1] ? b[i + 1].index : -1,
      },
    ];
  }
}

// Find lines of each person by indexes of their starts and ends
let result = [];
// Loop through Object "res" and get every person
for (let i = 0; i < Object.keys(res).length; i++) {
  let arrInd = res[Object.keys(res)[i]]; // Get array with indexes for each person

  let size = res[Object.keys(res)[i]].length; // Get size of array with indexes for each person
  let line = "";

  // Loop through array with indexes
  for (let j = 0; j < size; j++) {
    // Loop between "start" and "end"
    for (let r = arrInd[j].start; r < arrInd[j].end; r++) {
      // Write every character in the line
      line = line + text.charAt(r);
    }
    // Push lines in array without the name of person
    result[j] = line.replace(`${Object.keys(res)[i]}: `, "");
    // Create text file with lines
    fs.writeFileSync(`./lines/${Object.keys(res)[i]}.txt`, result.join("\n"));
    line = "";
  }
  console.log(`${i}: `, result);
  console.log(`${i}: `, result.length);
  result = [];
}
