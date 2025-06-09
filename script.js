// Science & Nature Quiz - with accessibility and sound effects and symbol feedback

const questionsPool = [
  {
    question: "What process do plants use to convert sunlight into energy?",
    options: ["Photosynthesis", "Respiration", "Transpiration", "Germination"],
    answer: "Photosynthesis",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    answer: "Mars",
  },
  {
    question: "What gas do humans need to breathe to survive?",
    options: ["Carbon Dioxide", "Oxygen", "Nitrogen", "Hydrogen"],
    answer: "Oxygen",
  },
  {
    question: "Which animal is the largest mammal on Earth?",
    options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    answer: "Blue Whale",
  },
  {
    question: "What is the hardest natural substance on Earth?",
    options: ["Gold", "Iron", "Diamond", "Quartz"],
    answer: "Diamond",
  },
  {
    question: "Which organ in the human body filters blood?",
    options: ["Liver", "Heart", "Kidneys", "Lungs"],
    answer: "Kidneys",
  },
  {
    question: "What is the chemical symbol for water?",
    options: ["HO", "H2O", "O2", "OH"],
    answer: "H2O",
  },
  {
    question: "What force keeps planets orbiting the sun?",
    options: ["Magnetism", "Gravity", "Friction", "Electricity"],
    answer: "Gravity",
  },
  {
    question: "Which type of animal lays eggs?",
    options: ["Mammals", "Birds", "Reptiles", "Both B and C"],
    answer: "Both B and C",
  },
  {
    question: "What do bees collect and use to make honey?",
    options: ["Pollen", "Nectar", "Sap", "Dew"],
    answer: "Nectar",
  },
];

// Sound files
const correctSound = new Audio('https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg'); 
const wrongSound = new Audio('https://actions.google.com/sounds/v1/cartoon/cartoon_boing.ogg'); 

// DOM elements
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const resultBox = document.getElementById('result-box');
const scoreEl = document.getElementById('score');
const restartBtn = document.getElementById('restart-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  resultBox.classList.add('hidden');
  nextBtn.disabled = true;
  showQuestion();
}

function showQuestion() {
  clearOptions();
  nextBtn.disabled = true;
  const currentQ = questionsPool[currentQuestionIndex];
  questionEl.textContent = currentQ.question;

  currentQ.options.forEach(optionText => {
    const btn = document.createElement('button');
    btn.textContent = optionText;
    btn.setAttribute('type', 'button');
    btn.addEventListener('click', () => selectOption(btn, optionText, currentQ.answer));
    optionsEl.appendChild(btn);
  });
  questionEl.parentElement.classList.add('show');
  optionsEl.classList.add('show');
}

function clearOptions() {
  optionsEl.innerHTML = '';
  questionEl.parentElement.classList.remove('show');
  optionsEl.classList.remove('show');
}

function selectOption(button, selected, correct) {
  // Disable all buttons after selection
  Array.from(optionsEl.children).forEach(btn => btn.disabled = true);

  // Remove any existing symbols
  Array.from(optionsEl.children).forEach(btn => {
    btn.textContent = btn.textContent.replace(/ ✅| ❌/g, '');
  });

  if (selected === correct) {
    score++;
    correctSound.play();
    // Append ✅ symbol
    button.textContent += ' ✅';
  } else {
    wrongSound.play();
    // Append ❌ symbol
    button.textContent += ' ❌';
    // Highlight correct answer with ✅
    Array.from(optionsEl.children).forEach(btn => {
      if (btn.textContent === correct) {
        btn.textContent += ' ✅';
      }
    });
  }

  nextBtn.disabled = false;
}

nextBtn.addEventListener('click', () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questionsPool.length) {
    showQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  clearOptions();
  questionEl.textContent = '';
  nextBtn.disabled = true;
  resultBox.classList.remove('hidden');
  scoreEl.textContent = `You scored ${score} out of ${questionsPool.length}`;
}

restartBtn.addEventListener('click', () => {
  resultBox.classList.add('hidden');
  nextBtn.disabled = true;
  startQuiz();
});

// Initialize quiz
startQuiz();
