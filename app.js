var quiz = {
    // first answer is the correct one
    questions: [
        ["Who invented Ferrari?", ["Enzo Ferrari", "Erno Ferrari", "Joe Ferrari", "Peter Ferrari"]],
        ["How long is the Great Wall of China?", ["4000 miles", "2660 miles", "6200 miles", "1820 miles"]],
        ["What is the largest number of five digits?", ["99999", "55555", "90000", "11111"]],
        ["Which South American country is named after Venice?", ["Venezuela", "Argentina", "Uruguay", "Peru"]],
        ["What colour to do you get when you mix red and white?", ["Pink", "Organe", "Yellow", "Purple"]],
        ["What is the national sport in Japan?", ["Sumo Wrestling", "Golf", "Boxing", "Baseball"]],
        ["What was the Olympic city of 1992?", ["Barcelona", "London", "Atlanta", "Beijing"]],
        ["When was Google founded?", ["1998", "1992", "2004", "1976"]],
        ["What is Django?", ["Python Web framework", "Javascript library", "Integrated development environment", "C++ library"]],
        ["In computing what is Ram short for?", ["Random Access Memory", "Real Access Memory", "Read Access Memory", "Resistive Access Memory"]]
    ]
};

var state = {
    questionNr: 0,
    correctlyGuessed: 0,
    NrOfQuestions: quiz.questions.length
};

function getQuestionTemplate() {

    var buttons = ['<button id="js-c0">' + quiz.questions[state.questionNr][1][0] + '</button>',
        '<button id="js-c1">' + quiz.questions[state.questionNr][1][1] + '</button>',
        '<button id="js-c2">' + quiz.questions[state.questionNr][1][2] + '</button>',
        '<button id="js-c3">' + quiz.questions[state.questionNr][1][3] + '</button>'
    ];

    buttons = shuffle(buttons); // shuffle list of buttons

    return (
        '<h1 class="question" id="js-question">' + quiz.questions[state.questionNr][0] + '</h1>' +
        '<div class="options js-choices">' + buttons[0] + buttons[1] + buttons[2] + buttons[3] + '</div>'
    );
}

function handleButtonPress() {

    var quizElement = $('.js-quiz-container');

    quizElement.on('click', '#js-start', function () {
        handleNextQuestion();
    });

    quizElement.on('click', '#js-c0', function () {
        state.correctlyGuessed++;
        handleButtonEvents(null, false);
    });

    quizElement.on('click', '#js-c1', function () {
        handleButtonEvents($('#js-c1'), true);
    });

    quizElement.on('click', '#js-c2', function () {
        handleButtonEvents($('#js-c2'), true);
    });

    quizElement.on('click', '#js-c3', function () {
        handleButtonEvents($('#js-c3'), true);
    });

    quizElement.on('click', "#js-playagain", function () {
        handlePlayAgain();
    });
}

function handleButtonEvents(buttonElement, wrongAns) {
    if (wrongAns) buttonElement.css('background-color', 'red');
    $('#js-c0').css('background-color', '#0CB863');
    $(':button').prop('disabled', true);
    setTimeout(function(){handleNextQuestion();}, 1000);
}

function handlePlayAgain() {
    var quizElement = $('.js-quiz-container');

    // revert states back to inital
    quizElement.children().remove();
    quizElement.append('<h1 class="play-menu-text">Can you beat this Quiz?</h1>' +
        '<button class="play" id="js-start">Play</button></main>');
    state.questionNr = 0;
    state.correctlyGuessed = 0;
}

function getResultMessage() {
    if (state.correctlyGuessed === 10) {
        return ["Perfect!", "green"];
    } else if (state.correctlyGuessed >= 8) {
        return ["Nice!", "yellow"];
    } else if (state.correctlyGuessed >= 5) {
        return ["Good!", "orange"];
    } else {
        return ["Awful!", "red"];
    }
}
function handleNextQuestion() {
    $(':button').prop('disabled', false);
    var quizCointainerElement = $('.js-quiz-container');

    // remove start page stuff
    if (state.questionNr === 0) {
        $('#js-start').remove();
        $('h1').remove();
        $('#js-counter').removeClass('hidden')
    }

    // remove old questions and choices
    $('#js-question').remove();
    $('.js-choices').remove();

    // go to results page
    if (state.questionNr === 10) {
        $('#js-counter').addClass('hidden');
        var message = getResultMessage()[0];
        var color = getResultMessage()[1];
        quizCointainerElement.append('<h1 class="result">Quiz Over!</h1><h2 class=' + color + '>' + message + '<br>' +
            'Correct: ' + state.correctlyGuessed + ' / ' + state.NrOfQuestions + '</h2>' +
            '<button class="playagain" id="js-playagain">Play again</button>');
        return;
    }

    quizCointainerElement.append(getQuestionTemplate()); // add html for new question
    state.questionNr += 1;
    $('#js-q-nr').text(state.questionNr); // update question number
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

$(function () {
    quiz.questions = shuffle(quiz.questions); // shuffle questions for a random order
    handleButtonPress();
});
