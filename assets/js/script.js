const submitButton = document.getElementById('submit-answer');
const nameInput = document.getElementById('name');
const quizContainer = document.getElementById('quiz-container');
const familyQuiz = document.getElementById('family-name');
const questionElement = document.getElementById('question');


function validateName(name) {
  const nameRegex = /^[a-zA-Z\s'-]+$/;
  return nameRegex.test(name);
}

// Defining a variable to store the player's name
let playerName;


  // Storing the player's name when they submit the name field
  function storeName() {
 
  const name = nameInput.value.trim();

  if (name.length === 0) {
    const errorElement = document.createElement('p');
    errorElement.textContent = 'Please enter your name';
    errorElement.classList.add('error-message');

    
    quizContainer.insertBefore(errorElement, quizContainer.firstChild);

    return;
  }

  playerName = name;

  // Creating a <p> element to display the name
  const nameDisplayElement = document.createElement('p');
  nameDisplayElement.textContent = `Family Name: ${playerName}`;
  nameDisplayElement.classList.add('family-name');

  // Appending the name element to the container above the quiz questions
  
  familyQuiz.insertBefore(nameDisplayElement, familyQuiz.children[1]);

  document.getElementById('submit-name').removeEventListener('click', storeName);
}

// Adding a click event listener to the submit button
document.getElementById('submit-name').addEventListener('click', storeName);

const quizAnswerRef = Array.from(document.querySelectorAll('.answer'));

// Family Quiz Game Section

let questions = [];
let currentQuestionIndex = 0;
let score = 0;

  // Function that loads quiz questions from API
function loadQuestion() {
  const APIUrl = `https://opentdb.com/api.php?amount=1&category=16&type=multiple`;
  fetch(APIUrl)
    .then(result => result.json())
    .then(data => addQuestionsToQuiz(data.results));
}

// Function that adds quiz questions to the questions array
function addQuestionsToQuiz(questionsData) {
  questionsData.forEach(entry => {
    const question = {
      question: entry.question,
      correct_answer: entry.correct_answer,
      answers: [...entry.incorrect_answers, entry.correct_answer]
    };
    questions.push(question);
  });
}

// Displaying the current question
function displayQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  
  questionElement.textContent = currentQuestion.question;

  // Create an unordered list element to hold the answer options
  const answerList = document.createElement('ul');

}



function addQuestionsToQuiz(questionsData) {
  questionsData.forEach(entry => {
    const question = {
      question: entry.question,
      correct_answer: entry.correct_answer,
      answers: [...entry.incorrect_answers, entry.correct_answer]
    };
    questions.push(question);
  });

  displayQuestion();
}

function loadQuestion() {
  const APIUrl = `https://opentdb.com/api.php?amount=1&category=16&type=multiple`;
  fetch(APIUrl)
    .then(result => result.json())
    .then(data => addQuestionsToQuiz(data.results));
}

  
// Assign Letters to quiz answers
const answerLetters = ['A', 'B', 'C', 'D'];

function generateAnswers(listofAnswers) {
  quizAnswerRef.forEach((link, i) => {
    const answerLetter = answerLetters[i];
    const answerElement = link;
    answerElement.innerHTML = `${answerLetter}) ${listofAnswers[i]}`;
    answerElement.classList.remove('selected');
  });
}


// Starting the quiz
loadQuestion();


