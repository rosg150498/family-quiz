   const quizAnswerRef = Array.from(document.querySelectorAll('.quiz-answers'))

   // Family Quiz Game Section 

    const questions = [];

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
}

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

  