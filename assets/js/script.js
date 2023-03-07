   function validateName (name) {
      const nameRegex = /^[a-zA-Z\s'-]+$/;
      return nameRegex.test(name);
   }
   
   
   // Defining a variable to store the player's name
 let playerName;

 // Storing the player's name when they submit the name field
 function storeName() {

    document.getElementById('submit-name').removeEventListener('click', storeName);

    const nameInput = document.getElementById('name');

    const name = nameInput.value.trim();

    if(name.length === 0) {

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
   
   
   const quizAnswerRef = Array.from(document.querySelectorAll('.quiz-answers'))

   // Family Quiz Game Section 

    let questions = [];
    let currentQuestionIndex = 0;
    let score = 0;

    function addQuestionsToQuiz(results) {
      questions = results.map(result => {
        return {
          question: result.question,
          correctAnswer: result.correct_answer,
          answers: [...result.incorrect_answers, result.correct_answer].sort(() => Math.random() - 0.5)
        };
      });
    }

    // Function that adds quiz questions to the quiz container
    function addQuestionsToQuiz(questions) {

    const quizElement = document.getElementById('family-quiz');

    questions.forEach((question, index) => {
    
    // Adding a new <div> element for each question
    const questionElement = document.createElement('div');
    generateAnswers(question.incorrect_answers)
    questionElement.classList.add('question');

    // Adding the question text to the <div> with style
    const questionText = document.createElement('p');
    questionText.textContent = `Question ${index + 1} ) ${question.question}`;
    questionText.classList.add('question-text');
    questionText.setAttribute('class', 'question-text');
    questionElement.appendChild(questionText);

    // Adding a horizontal rule to the <div>
   const hrElement = document.createElement('hr');
   hrElement.classList.add('question-hr')
   questionElement.appendChild(hrElement);
   
   // Adding the question to the quiz container
    quizElement.appendChild(questionElement);
  });
}

    // Function that loads quiz questions from API
    function loadQuestion() {
    const APIUrl = `https://opentdb.com/api.php?amount=1&category=16&type=multiple`;
    fetch(APIUrl)
      .then(result => result.json())
      .then(data => addQuestionsToQuiz(data.results));
      return {
      addQuestionsToQuiz([questionData]); 
      generateAnswers(data.results[0].incorrect_answers);
    };


    loadQuestion();


   // Assign Letters to quiz answers 

   const answerLetters = ['A', 'B', 'C', 'D'];

   
   function generateAnswers(listofAnswers){
   console.log(listofAnswers)
   quizAnswerRef.forEach((link , i ) => {
       link.innerHTML = listofAnswers[i]
   })
   }
   for (let i = 0; i < question.answers.length; i++) {
     const answerText = question.answers[i];
     const answerElement = document.createElement('p');
     answerElement.textContent = `${answerLetters[i]}) ${answerText}`;
     
     // Add a class to the answer element based on the corresponding letter
     answerElement.classList.add(`answer-${answerLetters[i]}`);
   
     questionElement.appendChild(answerElement);
   } 

  