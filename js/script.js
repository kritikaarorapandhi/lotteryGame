// Arrays to store picked and drawn numbers
const pickedNumbers = [];
const drawnNumbers = [];

// Getting the elements from HTML
const luckyDipButton = document.getElementById('lucky-dip-btn');
const startGameButton = document.getElementById('start-game-btn');
const resetButton = document.getElementById('reset-btn');
const drawnOutput = document.getElementById('drawn-output');
const prizeOutput = document.getElementById('prize-output');

// Event listeners for buttons
luckyDipButton.addEventListener('click', function () {
  // Clear previously picked numbers
  pickedNumbers.length = 0;

  // Generate 6 unique random numbers and add them to the picked numbers array
  while (pickedNumbers.length < 6) {
    const randomNum = generateRandomNumber(1, 59);
    if (!pickedNumbers.includes(randomNum)) {
      pickedNumbers.push(randomNum);
    }
  }

  // Display the picked numbers
  displayPickedNumbers();
});

startGameButton.addEventListener('click', function () {
  // Clear previously drawn numbers
  drawnNumbers.length = 0;

  // Generate 6 unique random numbers and add them to the drawn numbers array
  while (drawnNumbers.length < 6) {
    const randomNum = generateRandomNumber(1, 59);
    if (!drawnNumbers.includes(randomNum)) {
      drawnNumbers.push(randomNum);
    }
  }

  // Display the drawn numbers
  displayDrawnNumbers();

  // Calculate the prize based on the number of matched numbers
  calculatePrize();
});

resetButton.addEventListener('click', function () {
  // Clear picked and drawn numbers arrays, and reset the output fields
  pickedNumbers.length = 0;
  drawnNumbers.length = 0;
  drawnOutput.textContent = '';
  prizeOutput.textContent = '';
});

// Event listener for manual number selection
const numberInputs = Array.from(document.getElementById('picked-numbers').querySelectorAll('input'));
numberInputs.forEach(input => {
  input.addEventListener('input', function () {
    // Clear the picked numbers array
    pickedNumbers.length = 0;

    // Retreiving the values from the input fields and add them to the picked numbers array
    numberInputs.forEach(input => {
      const num = parseInt(input.value);
      if (!isNaN(num) && num >= 1 && num <= 59 && !pickedNumbers.includes(num)) {
        pickedNumbers.push(num);
      }
    });
  });
});

// Function to generate a random number
function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to display the picked numbers in the input fields
function displayPickedNumbers() {
  numberInputs.forEach((input, index) => {
    input.value = pickedNumbers[index];
  });
}

// Function to display the drawn numbers in the output field
function displayDrawnNumbers() {
  drawnOutput.textContent = drawnNumbers.join(', ');
}

// Function to calculate the prize based on the number of matched numbers
function calculatePrize() {
  const matchedNumbers = pickedNumbers.filter(num => drawnNumbers.includes(num));
  const matchedCount = matchedNumbers.length;
  let prize = 0;

  if (matchedCount === 3) {
    prize = '50';
  } else if (matchedCount === 4) {
    prize = '100';
  } else if (matchedCount === 5) {
    prize = '200';
  } else if (matchedCount === 6) {
    prize = '500';
  }

  prizeOutput.textContent = `Matched numbers: ${matchedCount}, Prize: ${'£'+prize}`;
}