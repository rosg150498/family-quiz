    // Family Quiz Game Section 

    const questions = [];


    // Function that adds quiz questions to the quiz container
    function addQuestionsToQuiz(questions) {

    const quizElement = document.getElementById('family-quiz');

    questions.forEach((question, index) => {
    
    // Adding a new <div> element for each question
    const questionElement = document.createElement('div');
    
    questionElement.classList.add('question');

    // Adding the question text to the <div> with style
    const questionText = document.createElement('p');
    questionText.textContent = `${index + 1}. ${question.question}`;
    questionText.style.fontSize = '24px';
    questionText.style.color = '#FFFFFF';
    questionText.style.fontWeight = 'bold';
    questionText.style.marginTop = '-22rem';
    questionText.style.marginLeft = '20rem';
    questionText.setAttribute('class', 'question-text');
    questionElement.appendChild(questionText);
    

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