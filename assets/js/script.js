const submitButton = document.getElementById('submit-answer');
const nameInput = document.getElementById('name');
const quizContainer = document.getElementById('quiz-container');
const familyQuiz = document.getElementById('family-name');
const questionElement = document.getElementById('question');
const quizAnswers = document.getElementsByClassName('quiz-answers')[0];
const mainMenu = document.getElementById('main-menu');
const quizGame = document.getElementById('family-quiz');
const backToMainMenuButton = document.getElementById('quiz-main-menu');
const submitNameButton = document.getElementById('submit-name');
const quizScore = document.getElementById('score');


function validateName(name) {
  const nameRegex = /^[a-zA-Z\s'-]+$/;
  return nameRegex.test(name);
}

// Defining a variable to store the player's name
let playerName;


// Storing the player's name when they submit the name field
  
function storeName(event) {
  event.preventDefault();
  
  const name = nameInput.value.trim();
  
  if (name.length === 0) {
    const errorElement = document.createElement('p');
    errorElement.textContent = 'Please enter your name';
    errorElement.classList.add('error-message');
  
    quizContainer.insertBefore(errorElement, quizContainer.firstChild);
  
    return;
  }
  
  playerName = name;
  
  // Update the family name element to include the player's name and score
  const familyNameDiv = document.getElementById('family-name');
  familyNameDiv.textContent = `Welcome ${playerName} to Trivia Family Quiz, Your Score is: ${score}`;
  
  // Removing the name input field and show the quiz section
  familyQuiz.classList.remove('hidden');

  // Hide the main menu div
  mainMenu.style.display = "none";

  // Move the quiz game div to the top of the page
  quizGame.style.position = "absolute";
  quizGame.style.marginTop = "0.5rem";
  
  // Load the first question and display it
  loadQuestion();
  displayQuestion();
}

submitNameButton.addEventListener('click', storeName);


// Family Quiz Game Section

let questions = [];
let currentQuestionIndex = 0;
let score = 0;


// Displaying the current question
function displayQuestion() {
  const currentQuestion = questions[currentQuestionIndex];

  // Adding the Family Name and Score Element to the container
  const familyNameDiv = document.getElementById('family-name');
  familyNameDiv.textContent = `Welcome ${playerName} to Trivia Family Quiz, Your Score is: ${score}`;
  

  questionElement.textContent = currentQuestion.question;

  quizAnswers.innerHTML = ''; // clear the quiz answers section

  // Create an unordered list element to hold the answer options
  const answerList = document.createElement('ul');
  answerList.style.listStyle = 'none';

  // Loop through each answer option and create a list item element for it
  currentQuestion.answers.forEach((answer, index) => {
    const answerItem = document.createElement('li');
    answerItem.style.marginTop = '4rem';

    // Adding a label element with a radio input for the answer option
    const answerLabel = document.createElement('label');
    const answerInput = document.createElement('input');
    answerInput.type = 'radio';
    answerInput.name = 'answer';
    answerInput.value = answer;
    answerInput.id = `answer-${index}`;
    answerLabel.setAttribute('for', `answer-${index}`);

    // Adding the answer option text to the label element
    answerLabel.textContent = `${answerLetters[index]}) ${answer}`;

    // Appending the input and label elements to the list item
    answerItem.appendChild(answerInput);
    answerItem.appendChild(answerLabel);

    // Appending the list item to the answer list
    answerList.appendChild(answerItem);
  });

  // Appending the answer list to the quiz answers section
  quizAnswers.appendChild(answerList);
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

let numQuestionsLoaded = 0;

function loadQuestion() {
  const APIUrl = `https://opentdb.com/api.php?amount=10&category=16&type=multiple`;
  fetch(APIUrl)
    .then(result => result.json())
    .then(data => {
      addQuestionsToQuiz(data.results);
      numQuestionsLoaded++;
      if (numQuestionsLoaded >= 10) {
        alert('Quiz completed!');
        
      }
    });
}

  
// Assign Letters to quiz answers
const answerLetters = ['A', 'B', 'C', 'D'];

submitButton.addEventListener('click', () => {
  const selectedAnswer = document.querySelector('input[name="answer"]:checked');

  if (!selectedAnswer) {
    const errorElement = document.createElement('p');
    errorElement.textContent = 'Please select an answer';
    errorElement.classList.add('error-message');

    quizContainer.insertBefore(errorElement, quizContainer.firstChild);
    return;
  }

  const playerAnswer = selectedAnswer.value;

  if (playerAnswer === questions[currentQuestionIndex].correct_answer) {
    score += 10;
    alert('Congrats, You have selected the Correct answer!');
  } else {
    alert('Sorry, You have selected the Wrong answer!');
  }

  currentQuestionIndex++;

  if (currentQuestionIndex === questions.length) {
    alert('Quiz completed!');
    return;
  }

  document.getElementById('score').textContent = `Score: ${score}`;

  loadQuestion();
  displayQuestion();
});

// Starting the quiz
loadQuestion();




  document.querySelector("#quiz-main-menu").addEventListener("click", function() {
    
    // Hide the family-quiz div
    document.querySelector("#family-quiz").style.display = "none";
    
    // Display the main menu
    document.querySelector("#main-menu").style.display = "block";
  });



  document.querySelector("#submit-name").addEventListener("click", function() {
    
    // Retriving the value of the family name input box
    var familyName = document.querySelector("#name").value;
  
    // Checking if the family name is valid (i.e. not empty)
    if (familyName.trim() !== "") {
      
      // Display the family-quiz div
      document.querySelector("#family-quiz").style.display = "block";
      
      // Hiding the main menu
      document.querySelector("#main-menu").style.display = "none";
    } else {
      
      // Displaying an error message if family name is empty
      alert("Please enter a valid family name.");
    }


    document.querySelector('#submit-name').addEventListener('click', (event) => {
      event.preventDefault();

      const familyName = document.querySelector('#name-input').value;
      
      // check if the family name is valid and proceed to display the family-quiz div
      if (familyName.trim() !== '') {
        familyQuiz.style.display = 'block';
      }



  });

 
  const highScores = [];

  const scoreObject = {
    name: playerName,
    score: score
  };
  
  highScores.push(scoreObject);

  highScores.sort((a, b) => b.score - a.score);

  highScores.forEach((scoreObject, index) => {
    const scoreElement = document.createElement('p');
    scoreElement.textContent = `${index + 1}. ${scoreObject.name}: ${scoreObject.score}`;
  });

});
