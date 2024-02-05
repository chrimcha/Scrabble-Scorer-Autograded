// This assignment is inspired by a problem on Exercise (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
   A: 1,
   B: 3,
   C: 3,
   D: 2,
   E: 1,
   F: 4,
   G: 2,
   H: 4,
   I: 1,
   J: 8,
   K: 5,
   L: 1,
   M: 3,
   N: 1,
   O: 1,
   P: 3,
   Q: 10,
   R: 1,
   S: 1,
   T: 1,
   U: 1,
   V: 4,
   W: 4,
   X: 8,
   Y: 4,
   Z: 10,
};

const simplePointStructure = {
   1: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
 };

const vowelPointStructure = {
   1: ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'],
   3: ['A', 'E', 'I', 'O', 'U']
 };

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

let newPointStructure = transform(oldPointStructure);
newPointStructure[' '] = 0;

function transform(pointStructureObject) {
   for (items in pointStructureObject) {
      let arrayOfKeysValues = Object.entries(pointStructureObject);

      let newArrayLowerCaseKeys = arrayOfKeysValues.map(function(a) { 
          a[0] = a[0].toLowerCase();
          return a; 
          } 
      );

      const newPointStructureObj  = Object.fromEntries(newArrayLowerCaseKeys);

      return newPointStructureObj;
   }
};

let word = '';

function initialPrompt() {
   console.log("Let's play some scrabble! \n");
   let question = input.question("Enter a word to score: ");
   word = question;

   if (typeof word !== "string") {
      console.log("\nInvalid Selection: Try Again!\n");
      return initialPrompt();
   }
};

let simpleScorer =  function(word) {
	word = word.toUpperCase();
   word = word.split("");

	let letterPoints = [];
   let totalPoints = 0;

	for (let i = 0; i < word.length; i++) {

	  for (const pointValue in simplePointStructure) {
 
		 if (simplePointStructure[pointValue].includes(word[i])) {
         letterPoints.push(pointValue);
		 }
 
	  }

	}
   
   letterPoints.forEach( num => {
      num = Number(num);
      totalPoints += num;
   })

	return totalPoints;
};

let vowelBonusScorer =  function(word) {
	word = word.toUpperCase();
   word = word.split("");

	let letterPoints = [];
   let totalPoints = 0;

	for (let i = 0; i < word.length; i++) {

	  for (const pointValue in vowelPointStructure) {
 
		 if (vowelPointStructure[pointValue].includes(word[i])) {
         letterPoints.push(pointValue);
		 }
 
	  }

	}
   
   letterPoints.forEach( num => {
      num = Number(num);
      totalPoints += num;
   })

	return totalPoints;
};

let scrabbleScorer = function(word) {
	word = word.toLowerCase();
   word = word.split("");

   let letterPoints = [];
   let totalPoints = 0;
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const keys in newPointStructure) {
        
        if (keys === (word[i])) {
            letterPoints.push(newPointStructure[word[i]]);
        }

	  }

	}
    
   letterPoints.forEach( num => {
        num = Number(num);
        totalPoints += num;
   })

	return totalPoints;
};

let simpleScore = {
   name: "Simple Score",
   description: "Each letter is worth 1 point.",
   scorerFunction: simpleScorer
};

let bonusVowels = {
   name: "Bonus Vowels",
   description: "Vowels are 3 pts, consonants are 1 pt.",
   scorerFunction: vowelBonusScorer
};

let scrabble = {
   name: "Scrabble",
   description: "The traditional scoring algorithm.",
   scorerFunction: scrabbleScorer
};

const scoringAlgorithms = [simpleScore, bonusVowels, scrabble];

function scorerPrompt() {
   console.log(`\n0 - Scoring Type: ${scoringAlgorithms[0].name}:  \t${scoringAlgorithms[0].description}`);
   console.log(`1 - Scoring Type: ${scoringAlgorithms[1].name}:  \t${scoringAlgorithms[1].description}`);
   console.log(`2 - Scoring Type: ${scoringAlgorithms[2].name}:\t \t${scoringAlgorithms[2].description}`);

   let selectAScorer = input.question("\nSelect a scoring algorithm from the list above! (Enter: 0, 1, or 2) ");
   let selectedNumber = Number(selectAScorer);

   if (selectedNumber === 0) {
      return console.log(`Score for '${word}': ${scoringAlgorithms[0].scorerFunction(word)}`);
   } else if (selectedNumber === 1) {
      return console.log(`Score for '${word}': ${scoringAlgorithms[1].scorerFunction(word)}`);
   } else if (selectedNumber === 2) {
      return console.log(`Score for '${word}': ${scoringAlgorithms[2].scorerFunction(word)}`);
   } else {
      console.log("\n-----Invalid Selection: Try Again!-----\n");
      return runProgram();
   }
}

function runProgram() {
   initialPrompt();
   scorerPrompt();
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
