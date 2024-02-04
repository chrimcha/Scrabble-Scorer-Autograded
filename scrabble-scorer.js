// This assignment is inspired by a problem on Exercise (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

let word = '';

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
   word = word.split("");
   // console.log(word);
	let letterPoints = [];
   let totalPoints = 0;

	for (let i = 0; i < word.length; i++) {

	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
         letterPoints.push(pointValue);
         // console.log(totalPoints);
			// letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
	  }
	}

   // console.log(letterPoints);
   
   letterPoints.forEach( num => {
      num = Number(num);
      totalPoints += num;
   })

	return totalPoints;
 }

//  const simplePointStructure = {
//    1: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
//  };

 function simplePointScorer(word) {
	word = word.toUpperCase();
   word = word.split("");
   // console.log(word);
	// let letterPoints = word.length;
   // console.log(word);

	// for (let i = 0; i < word.length; i++) {

	//   for (const pointValue in simplePointStructure) {
 
	// 	 if (simplePointStructure[pointValue].includes(word[i])) {
	// 		letterPoints += `Points for '${word[i]}': ${pointValue}\n`
	// 	 }
 
	//   }
	// }
	// return letterPoints;
   return word.length;
 }
 
 const vowelPointStructure = {
   1: ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'],
   3: ['A', 'E', 'I', 'O', 'U']
 };

 function vowelPointScorer(word) {
	word = word.toUpperCase();
   word = word.split("");
   // console.log(word);
	let letterPoints = [];
   let totalPoints = 0;

	for (let i = 0; i < word.length; i++) {

	  for (const pointValue in vowelPointStructure) {
 
		 if (vowelPointStructure[pointValue].includes(word[i])) {
         letterPoints.push(pointValue);
			// letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}

	// console.log(letterPoints);
   
   letterPoints.forEach( num => {
      num = Number(num);
      totalPoints += num;
   })

	return totalPoints;
 }

 const pointScoringFunctions = [simplePointScorer, vowelPointScorer, oldScrabbleScorer];

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some scrabble! \n");
   let question = input.question("Enter a word to score: ");
   word = question;
   // console.log("Current word: ", word);
};

let simpleScorer = {
   name: "Simple Score",
   description: "Each letter is worth 1 point.",
   scoringFunction: function () {return simplePointScorer(word)}
      //{return word.length}
};

let vowelBonusScorer = {
   name: "Bonus Vowels",
   description: "Vowels are 3 pts, consonants are 1 pt.",
   scoringFunction: function () {return vowelPointScorer(word)}
};

let scrabbleScorer = {
   name: "Scrabble",
   description: "The traditional scoring algorithm.",
   scoringFunction: function () {return oldScrabbleScorer(word)}
};

const scoringAlgorithms = [simpleScorer, vowelBonusScorer, scrabbleScorer];

function scorerPrompt() {
   console.log(`\n0 - Scoring Type: ${scoringAlgorithms[0].name}:  \t${scoringAlgorithms[0].description}`);
   console.log(`1 - Scoring Type: ${scoringAlgorithms[1].name}:  \t${scoringAlgorithms[1].description}`);
   console.log(`2 - Scoring Type: ${scoringAlgorithms[2].name}:\t \t${scoringAlgorithms[2].description}`);

   let selectAScorer = input.question("\nSelect a scoring algorithm from the list above! (Enter: 0, 1, or 2) ");
   let selectedNumber = Number(selectAScorer);

   if (selectedNumber === 0) {
      return console.log(`Score for '${word}': ${scoringAlgorithms[0].scoringFunction(word)}`);
   } else if (selectedNumber === 1) {
      return console.log(`Score for '${word}': ${scoringAlgorithms[1].scoringFunction(word)}`);
   } else if (selectedNumber === 2) {
      return console.log(`Score for '${word}': ${scoringAlgorithms[2].scoringFunction(word)}`);
   } else {
      console.log("\nInvalid Selection: Try Again!\n");
      return runProgram();
   }
}

// word = "pineapple"
// console.log(scoringAlgorithms[0].scoringFunction());
///NEED TO FIGURE OUT WHY scoringFunction is undefined

// console.log(scoringAlgorithms[0].scoringFunction(input.question("Enter a word to score: ")));

function transform() {};

let newPointStructure;

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
