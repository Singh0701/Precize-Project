const prompt = require('prompt-sync')();

class SATResults {
  constructor(name, address, city, country, pincode, score) {
    this.name = name;
    this.address = address;
    this.city = city;
    this.country = country;
    this.pincode = pincode;
    this.score = score;
    this.passed = score > 30 ? 'Pass' : 'Fail';
  }
}

const satData = [];

function insertData() {
  const name = prompt('Enter name: ');
  const address = prompt('Enter address: ');
  const city = prompt('Enter city: ');
  const country = prompt('Enter country: ');
  const pincode = prompt('Enter pincode: ');
  let score = parseInt(prompt('Enter SAT score: '));

  while (isNaN(score)) {
    score = parseInt(prompt('Invalid score. Enter a valid SAT score: '));
  }

  const satResult = new SATResults(name, address, city, country, pincode, score);
  satData.push(satResult);

  console.log('Data inserted successfully!');
  mainMenu();
}

function viewAllData() {
  console.log(satData);
  mainMenu();
}

function getRank() {
  const name = prompt('Enter name to get rank: ');

  const sortedData = [...satData].sort((a, b) => b.score - a.score);
  const rank = sortedData.findIndex(data => data.name === name);

  if (rank !== -1) {
    console.log(`${name} has rank ${rank + 1}`);
  } else {
    console.log(`${name} not found in the data`);
  }

  mainMenu();
}

function updateScore() {
  const name = prompt('Enter name to update score: ');
  let newScore = parseInt(prompt('Enter new SAT score: '));

  while (isNaN(newScore)) {
    newScore = parseInt(prompt('Invalid score. Enter a valid SAT score: '));
  }

  const satResult = satData.find(data => data.name === name);
  if (satResult) {
    satResult.score = newScore;
    satResult.passed = newScore > 30 ? 'Pass' : 'Fail';
    console.log('Score updated successfully!');
  } else {
    console.log(`${name} not found in the data`);
  }

  mainMenu();
}

function deleteRecord() {
  const name = prompt('Enter name to delete record: ');

  const index = satData.findIndex(data => data.name === name);
  if (index !== -1) {
    satData.splice(index, 1);
    console.log('Record deleted successfully!');
  } else {
    console.log(`${name} not found in the data`);
  }

  mainMenu();
}

function exitProgram() {
  console.log('Exiting the program...');
  process.exit(0);
}

function mainMenu() {
  console.log(`Menu:
  1. Insert data
  2. View all data
  3. Get rank
  4. Update score
  5. Delete one record
  6. Exit`);

  const option = parseInt(prompt('Enter your choice: '));

  switch (option) {
    case 1:
      insertData();
      break;
    case 2:
      viewAllData();
      break;
    case 3:
      getRank();
      break;
    case 4:
      updateScore();
      break;
    case 5:
      deleteRecord();
      break;
    case 6:
      exitProgram();
      break;
    default:
      console.log('Invalid option');
      mainMenu();
  }
}

mainMenu();
