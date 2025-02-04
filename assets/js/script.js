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
            { text: "50 Cent", correct: false }
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
    currentQuestionsIndex = 0; 
    score = 0;
    nextButton.innerHTML = 'Next';
    nextButton.style.display = 'none'; // Hide the next button initially
    progressBar.style.display = "block"; 
    updateProgressBar(); // Reset the progress bar
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

    nextButton.style.display = 'none'; // Hide the next button initially
}

function resetState() {
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
    const buttonContainer = document.querySelector('.scr-btn-container');
    if (buttonContainer) {
        buttonContainer.remove();
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
        selectedButton.classList.add('shake');
        setTimeout(() => {
            selectedButton.classList.remove('shake');
        }, 500); // Removes the shake class after the animation completes
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
    nextButton.style.display = "none"; // Hide the next button
    progressBar.style.display = "none"; // Hide the progress bar

    const retryButton = document.createElement('button');
    retryButton.innerHTML = "Retry";
    retryButton.classList.add('btn', 'btn-retry');
    retryButton.addEventListener('click', () => {
        startQuiz(); // Restart the quiz
    });

    const homeButton = document.createElement('button');
    homeButton.innerHTML = "Home";
    homeButton.classList.add('btn', 'btn-home');
    homeButton.addEventListener('click', () => {
        window.location.href = 'index.html'; // Redirect to the homepage
    });

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('scr-btn-container');
    buttonContainer.appendChild(retryButton);
    buttonContainer.appendChild(homeButton);

    document.querySelector('.Quiz').appendChild(buttonContainer); // Append the button container
}
    
//Update the progress bar
const progressBar = document.getElementById('progress-bar');
const totalQuestions = questions.length; // Use the length of the questions array
let currentQuestionsIndex = 0;

function updateProgressBar() {
    const progress = (currentQuestionsIndex / totalQuestions) * 100;
    progressBar.style.width = progress + '%';
}

function handleNextButton() {
    currentQuestionIndex++;
    currentQuestionsIndex++; // Increases the progress bar by one
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
    updateProgressBar(); // Updates the progress bar after showing the next question
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
