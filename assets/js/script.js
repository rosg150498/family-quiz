// Family Quiz Game Section 

const questions = [];


// Function that loads quiz questions from API

function loadQuestion() {
    const APIUrl = `https://opentdb.com/api.php?amount=1&category=16&type=multiple`;
    fetch(APIUrl)
        .then(result => result.json())
        .then(data => showQuestion(data.results));
}

