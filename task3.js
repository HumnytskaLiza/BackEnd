const fs = require("fs");

// const text = fs.readFileSync("./scenario.txt").toString();

const text = `Max: Quod equidem non reprehendo;
Geralt: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quibus natura iure responderit non esse verum aliunde finem beate vivendi, a se principia rei gerendae peti; Quae enim adhuc protulisti, popularia sunt, ego autem a te elegantiora desidero. Duo Reges: constructio interrete. Tum Lucius: Mihi vero ista valde probata sunt, quod item fratri puto. Bestiarum vero nullum iudicium puto. Nihil enim iam habes, quod ad corpus referas; Deinde prima illa, quae in congressu solemus: Quid tu, inquit, huc? Et homini, qui ceteris animantibus plurimum praestat, praecipue a natura nihil datum esse dicemus?

Yennefer: Iam id ipsum absurdum, maximum malum neglegi. Quod ea non occurrentia fingunt, vincunt Aristonem; Atqui perspicuum est hominem e corpore animoque constare, cum primae sint animi partes, secundae corporis. Fieri, inquam, Triari, nullo pacto potest, ut non dicas, quid non probes eius, a quo dissentias. Equidem e Cn. An dubium est, quin virtus ita maximam partem optineat in rebus humanis, ut reliquas obruat?

Geralt: Quis istum dolorem timet?
Summus dolor plures dies manere non potest? Dicet pro me ipsa virtus nec dubitabit isti vestro beato M. Tubulum fuisse, qua illum, cuius is condemnatus est rogatione, P. Quod si ita sit, cur opera philosophiae sit danda nescio.

Triss: Ex eorum enim scriptis et institutis cum omnis doctrina liberalis, omnis historia.
Quod si ita est, sequitur id ipsum, quod te velle video, omnes semper beatos esse sapientes. Cum enim fertur quasi torrens oratio, quamvis multa cuiusque modi rapiat, nihil tamen teneas, nihil apprehendas, nusquam orationem rapidam coerceas. Ita redarguitur ipse a sese, convincunturque scripta eius probitate ipsius ac moribus. At quanta conantur! Mundum hunc omnem oppidum esse nostrum! Incendi igitur eos, qui audiunt, vides. Vide, ne magis, inquam, tuum fuerit, cum re idem tibi, quod mihi, videretur, non nova te rebus nomina inponere. Qui-vere falsone, quaerere mittimus-dicitur oculis se privasse; Si ista mala sunt, in quae potest incidere sapiens, sapientem esse non esse ad beate vivendum satis. At vero si ad vitem sensus accesserit, ut appetitum quendam habeat et per se ipsa moveatur, quid facturam putas?

Max: Quem si tenueris, non modo meum Ciceronem, sed etiam me ipsum abducas licebit.
Triss: Stulti autem malorum memoria torquentur, sapientes bona praeterita grata recordatione renovata delectant.
Esse enim quam vellet iniquus iustus poterat inpune.
Triss: Quae autem natura suae primae institutionis oblita est?
Verum tamen cum de rebus grandioribus dicas, ipsae res verba rapiunt;
Hoc est non modo cor non habere, sed ne palatum quidem.
Triss: Voluptatem cum summum bonum diceret, primum in eo ipso parum vidit, deinde hoc quoque alienum; Sed tu istuc dixti bene Latine, parum plane. Nam haec ipsa mihi erunt in promptu, quae modo audivi, nec ante aggrediar, quam te ab istis, quos dicis, instructum videro. Fatebuntur Stoici haec omnia dicta esse praeclare, neque eam causam Zenoni desciscendi fuisse. Non autem hoc: igitur ne illud quidem. Ratio quidem vestra sic cogit. Cum audissem Antiochum, Brute, ut solebam, cum M. An quod ita callida est, ut optime possit architectari voluptates?

Geralt: Idemne, quod iucunde?
Max: Haec mihi videtur delicatior, ut ita dicam, molliorque ratio, quam virtutis vis gravitasque postulat. Sed quoniam et advesperascit et mihi ad villam revertendum est, nunc quidem hactenus; Cuius ad naturam apta ratio vera illa et summa lex a philosophis dicitur. Neque solum ea communia, verum etiam paria esse dixerunt. Sed nunc, quod agimus; A mene tu?`;

// const result = text.match(/^[A-Z][a-z]+:/gm);

// const characters = [];
// result.forEach((characterName) => {
//   if (!characters.includes(characterName)) {
//     characters.push(
//       // characterName.replace(':', '')
//       // characterName.slice(0, characterName.length - 1)
//       characterName.slice(0, -1)
//     );
//   }
// });

//console.log("characters:", characters);

// Get lines of Max
const resultMax = text.match(/Max:.+/gm);

const MaxLines = [];
resultMax.forEach((lines) => {
  MaxLines.push(lines.replace(/Max: /g, ""));
});

fs.writeFileSync("./lines/Max.txt", MaxLines.join("\n"));

console.log("Max: ", MaxLines);

// Get lines of Geralt
// const resultGeralt = text.match(/Geralt:.+\s[^Max:][^Yennefer:][^Triss:].+/gm);
const resultGeralt = text.match(
  /^Geralt:[ a-zA-z,\.;:?]+((\n[ a-zA-z,\.;:?]+)+)/gm
);

const GeraltLines = [];
resultGeralt.forEach((lines) => {
  GeraltLines.push(lines.replace(/Geralt: /g, ""));
});

fs.writeFileSync("./lines/Geralt.txt", GeraltLines.join("\n"));

console.log("Geralt: ", GeraltLines);

// Get lines of Triss
const resultTriss = text.match(
  /Triss.+\s[^Max:][^Yennefer:][^Geralt:].+\s.+\s.+\s.+/gm
);

const TrissLines = [];
resultTriss.forEach((lines) => {
  TrissLines.push(lines.replace(/Triss: /g, ""));
});

fs.writeFileSync("./lines/Triss.txt", TrissLines.join("\n"));

console.log("Triss", TrissLines);

// Get lines of Yennefer
const resultYennefer = text.match(/Yennefer:.+/gm);

const YenneferLines = [];
resultYennefer.forEach((lines) => {
  YenneferLines.push(lines.replace(/Yennefer: /g, ""));
});

fs.writeFileSync("./lines/Yennefer.txt", YenneferLines.join("\n"));

console.log("Yennefer", YenneferLines);
