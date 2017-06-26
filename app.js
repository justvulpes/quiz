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

    buttons = shuffle(buttons);

    return (
        '<h1 id="js-question">' + quiz.questions[state.questionNr][0] + '</h1>' +
        '<div class="js-choices">' + buttons[0] + buttons[1] + buttons[2] + buttons[3] + '</div>'
    );
}

function handleButtonPress() {

    var correctAns = 3;
    var quizElement = $('.quiz-container');

    quizElement.on('click', '#js-start', function () {
        handleNextQuestion();
    });

    quizElement.on('click', '#js-c0', function () {
        if (correctAns === 0) {
            state.correctlyGuessed++;
        }
        handleNextQuestion();
        console.log("Pressed js-c0");
    });

    quizElement.on('click', '#js-c1', function () {
        if (correctAns === 1) {
            state.correctlyGuessed++;
        }
        handleNextQuestion();
        console.log("Pressed js-c1");
    });

    quizElement.on('click', '#js-c2', function () {
        if (correctAns === 2) {
            state.correctlyGuessed++;
        }
        handleNextQuestion();
        console.log("Pressed js-c2");
    });

    quizElement.on('click', '#js-c3', function () {
        if (correctAns === 3) {
            state.correctlyGuessed++;
        }
        handleNextQuestion();
        console.log("Pressed js-c3");
    });

}

function handleNextQuestion() {
    var quizCointainerElement = $('.quiz-container');

    if (state.questionNr === 0) $('#js-start').remove();
    if (state.questionNr === 10) {
        $('header').remove();
        quizCointainerElement.append('<h1>' + 'Game over' + '</h1>');
    }
    $('#js-question').remove();
    $('.js-choices').remove();
    quizCointainerElement.append(getQuestionTemplate());
    state.questionNr += 1;
    changeQuestionNumberTo(state.questionNr)
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

function changeQuestionNumberTo(nr) {
    $('#js-q-nr').text(nr);
}

$(function () {
    quiz.questions = shuffle(quiz.questions);
    handleButtonPress();
});