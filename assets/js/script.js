const submitButton = document.getElementById('submit-answer');

function validateName(name) {
  const nameRegex = /^[a-zA-Z\s'-]+$/;
  return nameRegex.test(name);
}

// Defining a variable to store the player's name
let playerName;

// Storing the player's name when they submit the name field
function storeName() {
  const nameInput = document.getElementById('name');
  const name = nameInput.value.trim();

  if (name.length === 0) {
    const errorElement = document.createElement('p');
    errorElement.textContent = 'Please enter your name';
    errorElement.classList.add('error-message');

    const quizContainer = document.getElementById('quiz-container');
    quizContainer.insertBefore(errorElement, quizContainer.firstChild);

    return;
  }

  playerName = name;

  // Creating a <p> element to display the name
  const nameDisplayElement = document.createElement('p');
  nameDisplayElement.textContent = `Family Name: ${playerName}`;
  nameDisplayElement.classList.add('family-name');

  // Appending the name element to the container above the quiz questions
  const familyQuiz = document.getElementById('family-name');
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

function loadQuestion() {
  const APIUrl = `https://opentdb.com/api.php?amount=1&category=16&type=multiple`;
  fetch(APIUrl)
    .then(result => result.json())
    .then(data => {
      addQuestionsToQuiz(data.results);
      displayQuestion();
    })
    .catch(error => console.error(error));
}


// Adding a click event listener to the submit button
submitButton.addEventListener('click', checkAnswer);

// Starting the quiz
loadQuestion();


function displayQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  const questionElement = document.getElementById('question');
  questionElement.textContent = currentQuestion.question;

  const answerElements = document.querySelectorAll('.answer');
  answerElements.forEach((element, i) => {
    element.innerHTML = `${answerLetters[i]}) ${currentQuestion.answers[i]}`;
    element.classList.remove('selected');
    element.addEventListener('click', () => {
      answerElements.forEach(element => {
        element.classList.remove('selected');
      });
      element.classList.add('selected');
    });
  });

  for (let i = 0; i < currentQuestion.answers.length; i++) {
    const answerText = currentQuestion.answers[i];
    const answerElement = document.createElement('p');
    answerElement.textContent = `${answerLetters[i]}) ${answerText}`;
     
     // Add a class to the answer element based on the corresponding letter
     answerElement.classList.add(`answer-${answerLetters[i]}`);
   
     questionElement.appendChild(answerElement);
   } 


  // Add a class to the answer element based on the corresponding letter
  const answerLetter = answerLetters[i];
  answerElement.classList.add(`answer-${answerLetter}`);


   // Add the answer element to the quiz container
   const answerContainer = document.getElementById('answers');
   answerContainer.appendChild(answerElement);
 }