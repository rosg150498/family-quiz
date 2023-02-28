// Family Quiz Game Section 

const questions = [];


// Function that loads quiz questions from API

function loadQuestion() {
    const APIUrl = `https://opentdb.com/api.php?amount=1&category=16&type=multiple`;
    fetch(APIUrl)
        .then(result => result.json())
        .then(data => showQuestion(data.results));
}


// Function that returns quiz questions and answers data

function showQuestion(data) {
    const something = data.map(item => {
        return {
            difficulty: item.difficulty,
            question: item.question,
            correctAnswer: item.correct_answer,
            answers: [...item.incorrect_answers, item.correct_answer]
        };
    });
    
    questions.push(...something);
    console.log(questions);
}

loadQuestion();
