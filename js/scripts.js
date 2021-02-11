var questions = [{
  question: "Are you a renter with a primary residence in New York State? ",
  choices: ["Yes", "No"],
  correctAnswer: 0
}, {
  question: "Have you lost income during the period of April 1, 2020 to July 31, 2020? (Note: unemployment benefits is considered a source of income.)",
  choices: ["Yes", "No"],
  correctAnswer: 0
}, {
  question: "Before March 7, 2020 and at the time of your application, was your income at or below 80% of the Area Median Income?",
  choices: ["Yes", "No"],
  correctAnswer: 0
}, {
  question: "From April 1, 2020 to July 31, 2020, did you spend at least 30% of your monthly household income on rent?",
  choices: ["Yes", "No"],
  correctAnswer: 0
}];



var questionCounter = 0;
var selections = []; //Array containing user choices
var quiz = $('#quiz');
var quizStart = false;

$(document).ready(function() {


  $(this).find(".quizMessage").hide();

  //Quiz introduction page
  if (quizStart === false) {
    $(".intro").show();
    $("#begin").show();
    $("#next").hide();
  }

  $('#begin').on('click', function(e) {
    e.preventDefault();

    if (quiz.is(':animated')) {
      return false;
    }
    quizStart = true;
    $(".intro").hide();
    $("#begin").hide();
    displayNext();
  });


  // Click handler for the 'next' button
  $('#next').on('click', function(e) {
    e.preventDefault();

    // Suspend click listener during fade animation
    if (quiz.is(':animated')) {
      return false;
    }
    choose();


    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter])) {
      $(document).find(".quizMessage").text("Please select an answer!");
      $(document).find(".quizMessage").show();
    } else {
      $(document).find(".quizMessage").hide();
      questionCounter++;
      displayNext();
    }
  });

  // Click handler for the 'prev' button
  $('#prev').on('click', function(e) {
    e.preventDefault();

    if (quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    $(document).find(".quizMessage").hide();
    displayNext();
  });

  // Click handler for the 'Start Over' button
  $('#startOver').on('click', function(e) {
    e.preventDefault();

    if (quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    $('#startOver').hide();
    $('.callToAct').hide();
    $('#next').hide();
    $('#quiz').hide();
    $('.intro').show();
    $('#begin').show();
  });

  // Animates buttons on hover
  $('.button').on('mouseenter', function() {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function() {
    $(this).removeClass('active');
  });

  // Creates and returns the div that contains the questions and the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });

    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);

    var question = $('<p>').append(questions[index].question);
    qElement.append(question);

    var radioButtons = createRadios(index);
    qElement.append(radioButtons);

    return qElement;
  }

  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }

  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }

  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();

      if (questionCounter < questions.length && quizStart == true) {
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).show();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value=' + selections[questionCounter] + ']').prop('checked', true);
        }

        // Controls display of 'prev' button
        if (questionCounter === 1) {
          $('#prev').show();
        } else if (questionCounter === 0) {

          $('#prev').hide();
          $('#next').show();
        }
      } else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).show();
        $('#next').hide();
        $('#prev').hide();
        $('.callToAct').show();
        $('#startOver').show();
      }
    });
  }

  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = $('<p>', {
      id: 'question'
    });

    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }
    score.append('You fulfilled ' + numCorrect + ' out of ' +
      questions.length + ' eligibility requirements.');
    return score;
  }
  })();
