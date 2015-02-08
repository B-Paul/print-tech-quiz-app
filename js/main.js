$(document).ready(function () {
  'use strict';
  var quiz, bod, form, question, choices, feedback, score;

  quiz = [
    {
      prompt: 'The dominant method used in commercial printing is called—',
      options: [
        'Flexography',
        'Inkjetting',
        'Offset lithography',
        'Die sublimation'
      ],
      answer: 2,
      feedback: 'The term “lithography” comes from the early use of a ' + 
        'limestone block as the image carrier, though, now, flexible ' + 
        'aluminum and polymer plates are used.',
      scheme: 'scheme-1'
    },
    {
      prompt: 'Printing a photograph for a magazine or newspaper ' +
        'traditionally requires how many ink colors?',
      options: [
        '3',
        '4',
        '8',
        '12'
      ],
      answer: 1,
      feedback: 'Traditional four-color process printing uses black, ' + 
        'magenta, cyan, and yellow inks to build a gamut of millions of ' + 
        'possible colors. Some advanced applications may use green, orange, ' +
        'or other inks to expand the range of printable colors even more.',
      scheme: 'scheme-2'
    },
    {
      prompt: 'Paper might be fed into a commercial press either as ' +
        'separate sheets or on a roll. What is the type of press called that ' +
        'takes paper from a roll?',
      options: [
        'Flexographic press',
        'Gutenberg press',
        'Reel-to-reel press',
        'Web press'
      ],
      answer: 3,
      feedback: 'Maintaining the correct tension on the “web” (the loops of ' +
        'paper that run through the area inside the machine) is essential to ' +
        'the proper operation of this type of press.',
      scheme: 'scheme-3'
    },
    {
      prompt: 'Most workplaces use laser printers. What is one advantage ' +
        'that these and other digital printers have over traditional ' +
        'methods?',
      options: [
        'Each image printed may be different from the last',
        'They print more pages per minute than other types of printers',
        'They can print on a wide variety of materials',
        'They frustrate the hell out of your boss'
      ],
      answer: 0,
      feedback: 'Traditional print processes set the image in some physical ' +
        'medium, such as a plate or a screen. Images are changed by removing ' +
        'the plate from the machine and attaching another one, but digital ' +
        'processes change the image by changing a digital signal.',
      scheme: 'scheme-4'
    },
    {
      prompt: 'What is the term for a page that is printed all the way to ' +
        'the edge with color or graphics?',
      options: [
        'Full width',
        'Fit to page',
        'Full bleed',
        'Calendered'
      ],
      answer: 2,
      feedback: 'In order to create a full bleed page, most printers must ' +
        'print an image that is slightly larger on all sides than the ' +
        'desired final size of the page. After printing, paper-cutting ' +
        'equipment may be used to trimmed away the unprinted margins and ' +
        'just a little bit of the print, leaving a perfect, clean edge.',
      scheme: 'scheme-5'
    }
  ];

  bod = $(document.body);
  form = $('#quiz');
  question = $('.question');
  choices = $('.choice');
  feedback = $('#feedback');

  form.on('submit', function (event) {
    event.preventDefault();
    form.hasClass('give-feedback')
      ? displayQuestion(quiz.shift())
      : displayFeedback();
  });

  score = 0;
  displayQuestion(quiz.shift());

  function displayQuestion(q) {
    if (q === void 0) { return endQuiz(); }
    bod.removeClass().addClass(q.scheme);
    form.removeClass('give-feedback')
      .find('input').prop('disabled', false).end()
      .get(0).reset();
    question.text(q.prompt);
    choices
      .removeClass('reveal correct')
      .addClass('incorrect')
      .each(function (i) {
        $('.choice-text', this).text(q.options[i]);
      })
      .eq(q.answer)
        .removeClass('incorrect')
        .addClass('correct');
    feedback.removeClass('feedback').addClass('hidden').text(q.feedback);
  }

  function displayFeedback() {
    form.addClass('give-feedback')
      .find('input')
        .prop('disabled', true)
        .filter(':checked')
          .parent()
          .hasClass('correct') && score++;
    choices.addClass('reveal');
    feedback.toggleClass('feedback hidden');
  }

  function endQuiz() {
    $('.submit').animate({'height': 0});
    feedback.text('You scored ' + score + ' out of 5. Thank you for playing!');
  }
});