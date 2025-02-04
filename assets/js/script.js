const questions = [
    { 
        question: "Which popular tv show featured House, Targaryen and Stark?",
        answers: [
            { text: "Suits", correct: false },
            { text: "Game of Thrones", correct: true },
            { text: "Breaking Bad", correct: false },
            { text: "The Walking Dead", correct: false }
        ]
    },
    { 
        question: "Which rapper did Kendrick Lamar take aim at in his 2024 single, “Not Like Us”?",
        answers: [
            { text: "Drake", correct: true },
            { text: "J Cole", correct: false },
            { text: "Big Sean", correct: false },
            { text: "Big Sean", correct: false }
        ]
        
    },
    { 
        question: "Which wrestler-turned actor voices a character in Disney’s Moana movies?",
        answers: [
            { text: "John Cena", correct: false },
            { text: "The Rock", correct: true },
            { text: "Stone Cold Steve Austin", correct: false },
            { text: "Hulk Hogan", correct: false }
        ]
    },
    { 
        question: "Celebrity stylist Law Roach is best known for his collaborations with which star?",
        answers: [
            { text: "Beyonce", correct: false },
            { text: "Rihanna", correct: false },
            { text: "Zendaya", correct: true },
            { text: "Lady Gaga", correct: false }
        ]
    },
    { 
        question: "What movie is this line from: “Say hello to my little friend”?",
        answers: [
            { text: "Scarface", correct: true },
            { text: "The Godfather", correct: false },
            { text: "Goodfellas", correct: false },
            { text: "The Departed", correct: false }
        ]   
    },
    {
        question: "What netflix show has the most streaming views in 2021?",
        answers: [
            { text: "The Crown", correct: false },
            { text: "Money Heist", correct: false },
            { text: "Stranger Things", correct: false },
            { text: "Squid Game", correct: true }
        ]
    },
    {
        question: "Who is the current hose of Love Island UK?",
        answers: [
            { text: "Laura Whitmore", correct: false },
            { text: "Caroline Flack", correct: false },
            { text: "Maya Jama", correct: true },
            { text: "Davina McCall", correct: false }
        ]
    },
    {
        question: "What singer holds the record for most Grammy nominations?",
        answers: [
            { text: "Beyonce", correct: true },
            { text: "Adele", correct: false },
            { text: "Taylor Swift", correct: false },
            { text: "Rihanna", correct: false }
        ]
    },
    {
        question: "Who is the most followed person on instagram?",
        answers: [
            { text: "Kim Kardashian", correct: false },
            { text: "Kylie Jenner", correct: false },
            { text: "Cristiano Ronaldo", correct: true},
            { text: "Ariana Grande", correct: false }
        ]
        
    },
    {
        question: "What artist has the most streams on spotify?",
        answers: [
            { text: "Drake", correct: false },
            { text: "Ed Sheeran", correct: false },
            { text: "Justin Bieber", correct: false },
            { text: "Taylor Swift", correct: true }
        ]
        }
    ];
    
const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
 

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = 'Next';
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + '. ' + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }    
        button.addEventListener('click', selectAnswer);
    });
}

function resetState() {
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === 'true';
    if (isCorrect) {
        selectedButton.classList.add('correct');
        score++;
    } else {
        selectedButton.classList.add('incorrect');
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === 'true') {
            button.classList.add('correct');
        }
        button.disabled = true;
    });
    nextButton.style.display = 'block';
}
function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "Block";
}
    

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}


nextButton.addEventListener('click', () => {
    if (nextButton.innerHTML === 'Next') {
        handleNextButton();
    } else {
        if (currentQuestionIndex < questions.length) {
            handleNextButton();
        } else { 
            startQuiz();
        }
    }
});
startQuiz();