"use strict";

var mode = "code"; //code\question

var episode = "0.-1";

var answerCallback = function answerCallback() {
  //Start initial test
  $(".mCSB_container").html("");
  next();
};

var taskIndex = -1;

function next() {
  $(".mCSB_container").html("");
  var e1 = parseInt(episode.split('.')[0]);
  var e2 = parseInt(episode.split('.')[1]);
  var taskCount = tasks.length;

  if (mode == "code") {
    var checkCount = tasks[e1];

    if (e2 == checkCount) {
      e1 += 1;
      e2 = 0;
    } else {
      e2 += 1;
    }
  }

  if (mode == "question") {
    var questionCount = tasks[e1];

    if (e2 == questionCount) {
      e1 += 1;
      e2 = 0;
    } else {
      e2 += 1;
    }
  }

  episode = e1 + "." + e2;

  if (e1 == taskCount) {
    $(".mCSB_container").html("");
    insertMessageText("Thanks! You have succesfully completed the test.");
  }

  if (mode == "code") {
    insertMessageText(tasks[e1].title);

    if (tasks[e1].taskContent) {
      $("#task-content").html(tasks[e1].taskContent);
    } else {
      $("#task-content").html(tasks[e1].title);
    }

    insertMessageText("You can say 'Done' when you are done, or 'Skip' to skip the problem.");
  } else if (mode == "question") {
    // insertMessageText(tasks[e1].title);
    if (e2 == tasks[e1].questions.length) {
      mode = "code";
      e1 += 1;
      e2 += -1;
      episode = e1 + "." + e2;
      next();
      return;
    }

    askQuestion(tasks[e1].questions[e2]);
  }
}

function initChatbot() {
  insertMessageText("Hi, I am Iris, I will be your Adaptive Interviewing Assistant");
  setTimeout(function () {
    askQuestion({
      question: "I hope you are having a good day. Shall we start the interview?",
      options: ["Sure"],
      answer: "Sure"
    });
  }, 2000);
}

function askQuestion(questionObj) {
  if (questionObj.question.trim() == '') {
    return false;
  }

  $(".mCSB_container").html("");
  $('<div class="message loading new"><figure class="avatar"><img src="http://askavenue.com/img/17.jpg" /></figure><span></span></div>').appendTo($('.mCSB_container'));
  updateScrollbar();
  setTimeout(function () {
    $('.message.loading').remove();
    var $elem = $('<div class="message new"><figure class="avatar"><img src="http://askavenue.com/img/17.jpg" /></figure>' + questionObj.question + '</div>');
    $elem.appendTo($('.mCSB_container')).addClass('new');
    setDate();
    updateScrollbar();

    answerSelected = function answerSelected(answer) {
      if (answer == questionObj.answer) {
        if (questionObj.followup) {
          askQuestion(questionObj.followup);
        } else {
          next();
        }
      }
    };

    addOptions(questionObj);
  }, 1000 + Math.random() * 20 * 100);
}

function addOptions(questionObj) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = questionObj.options[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var option = _step.value;
      var $elem = $("<button class='btn btn-primary msg_option'>" + option + "</button>");
      $elem.appendTo($('.mCSB_container')).addClass('new');
      $elem.click(function () {
        answerSelected($(this).text());
      });
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}

function nextTask() {
  insertMessageText("I hope you are having a good day. Shall we start the interview?");
}

function answerSelected(option) {
  answerCallback(option);
}

function checkList(checklist) {
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = checklist[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var checkObj = _step2.value;

      if (!checkObj.check()) {
        $(".mCSB_container").html("");
        insertMessageText(checkObj.title);
        return;
      }

      if (checkObj["skipped"]) {
        continue;
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  var e1 = parseInt(episode.split('.')[0]);
  var e2 = parseInt(episode.split('.')[1]);
  e2 = -1;
  episode = e1 + "." + e2;
  mode = "question";
  next();
}
"use strict";

function loadWeb() {
  $(document).ready(function () {
    //to make each section resizable
    $("#htmlSec").resizable({
      handles: 'e, w'
    }); //   $("#cssSec").resizable({
    //     handles: 'e, w'
    //   })
    //   $("#jsSec").resizable({
    //     handles:'e, w'
    //   })

    $("#resultSec").resizable({
      handle: 'e,w'
    }); //makes the buttons toggable to hide and unhide each section
    //   $("#htmlButton").click(function(){
    //       $("#htmlSec").toggle(1000);
    //   });
    //   $("#cssButton").click(function(){
    //       $("#cssSec").toggle(1000);
    //   });
    //   $("#jsButton").click(function() {
    //       $("#jsSec").toggle(1000);
    //   });

    $("#resultsButton").click(function () {
      $("#resultSec").toggle(1000);
    });
    $("#run").click(function () {
      fileData[currentFile].code = editor.getValue();
      $('#resultIframe').contents().find('html').html("<style>" + fileData["main.css"].code + "</style>" + fileData["index.html"].code);
      document.getElementById('resultIframe').contentWindow.eval(fileData["main.js"].code);
    });
  });
  var $messages = $('.messages-content'),
      d,
      h,
      m,
      i = 0;
  $(window).load(function () {
    $messages.mCustomScrollbar();
    setTimeout(function () {
      // fakeMessage();
      initChatbot();
    }, 100);
  });
  window.updateScrollbar = updateScrollbar;

  function updateScrollbar() {
    $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
      scrollInertia: 10,
      timeout: 0
    });
  }

  window.setDate = setDate;

  function setDate() {
    d = new Date();

    if (m != d.getMinutes()) {
      m = d.getMinutes();
      $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
      $('<div class="checkmark-sent-delivered">&check;</div>').appendTo($('.message:last'));
      $('<div class="checkmark-read">&check;</div>').appendTo($('.message:last'));
    }
  }

  window.insertMessage = insertMessage;

  function insertMessage() {
    var msg = $('.message-input').val();

    if ($.trim(msg) == '') {
      return false;
    }

    if (msg.trim().toLowerCase() == "done") {
      //If current condition is not passed, then skip
      var e1 = parseInt(episode.split('.')[0]);
      var e2 = parseInt(episode.split('.')[1]);
      checkList(tasks[e1].checklist);
    }

    if (msg.trim().toLowerCase() == "skip") {
      var e1 = parseInt(episode.split('.')[0]);
      var e2 = parseInt(episode.split('.')[1]);
      e1 += 1;
      e2 = -1;
      episode = e1 + "." + e2;
      next();
    }

    if (msg.trim().toLowerCase() == "skip check") {
      var e1 = parseInt(episode.split('.')[0]);
      var e2 = parseInt(episode.split('.')[1]);
      tasks[e1].checklist[e2]["skipped"] = true;
      next();
    }

    $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
    setDate();
    $('.message-input').val(null);
    updateScrollbar(); //   setTimeout(function() {
    //     fakeMessage();
    //   }, 1000 + (Math.random() * 20) * 100);
  }

  window.insertMessageText = insertMessageText;

  function insertMessageText(msg) {
    if (msg.trim() == '') {
      return false;
    }

    $('<div class="message loading new"><figure class="avatar"><img src="http://askavenue.com/img/17.jpg" /></figure><span></span></div>').appendTo($('.mCSB_container'));
    updateScrollbar();
    setTimeout(function () {
      $('.message.loading').remove();
      $('<div class="message new"><figure class="avatar"><img src="http://askavenue.com/img/17.jpg" /></figure>' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
      setDate();
      updateScrollbar();
    }, 1000 + Math.random() * 20 * 100);
  }

  $('.message-submit').click(function () {
    insertMessage();
  });
  $(window).on('keydown', function (e) {//   if (e.which == 13) {
    //     insertMessage();
    //     return false;
    //   }
  });
  var Fake = ['Hi there, I\'m Jesse and you?', 'Nice to meet you', 'How are you?', 'Not too bad, thanks', 'What do you do?', 'That\'s awesome', 'Codepen is a nice place to stay', 'I think you\'re a nice person', 'Why do you think that?', 'Can you explain?', 'Anyway I\'ve gotta go now', 'It was a pleasure chat with you', 'Time to make a new codepen', 'Bye', ':)'];

  function fakeMessage() {
    if ($('.message-input').val() != '') {
      return false;
    }

    $('<div class="message loading new"><figure class="avatar"><img src="http://askavenue.com/img/17.jpg" /></figure><span></span></div>').appendTo($('.mCSB_container'));
    updateScrollbar();
    setTimeout(function () {
      $('.message.loading').remove();
      $('<div class="message new"><figure class="avatar"><img src="http://askavenue.com/img/17.jpg" /></figure>' + Fake[i] + '</div>').appendTo($('.mCSB_container')).addClass('new');
      setDate();
      updateScrollbar();
      i++;
    }, 1000 + Math.random() * 20 * 100);
  }

  $('.button').click(function () {
    $('.menu .items span').toggleClass('active');
    $('.menu .button').toggleClass('active');
  });

  function initEditor() {// window.editor = ace.edit("editor");
    // editor.setTheme("ace/theme/monokai");
    // editor.getSession().setMode("ace/mode/html");
    // window.JavaScriptMode = ace.require("ace/mode/javascript").Mode;
    // window.HTMLMode = ace.require("ace/mode/html").Mode;
    // window.CSSMode = ace.require("ace/mode/css").Mode;
    // editor.session.setMode(new HTMLMode());
  }

  initEditor();
  window.fileData = {
    "main.js": {
      code: "",
      type: "ace/mode/javascript"
    },
    "main.css": {
      code: "",
      type: "ace/mode/css"
    },
    "index.html": {
      code: "",
      type: "ace/mode/html"
    },
    "main.scss": {
      code: "",
      type: "ace/mode/css"
    }
  };
  window.currentFile = "index.html";
  window.changeFile = changeFile;

  function changeFile(fileName) {
    // var fileName = currentFile;
    if (!fileData[fileName]) return;
    var lastCode = editor.getValue();
    fileData[currentFile].code = lastCode;
    editor.setValue(fileData[fileName].code);
    currentFile = fileName;
    editor.getSession().setMode(fileData[fileName].type);
  }

  function snapShotImage() {
    // var body = $("#resultIframe").contents().find('body')[0];
    // iframe2image(document.getElementById("resultIframe"), function (err, img) {
    //     // If there is an error, log it
    //     if (err) { return console.error(err); }
    //     console.log(img);
    //     $("body").append(img);
    //     var $img_src = img.src;
    //     var link = document.createElement("a");
    //     link.download = "image"+".png";
    //     link.href = $img_src;
    //     link.target = "_blank";
    //     link.click();
    // // Otherwise, add the image to the canvas
    //     context.drawImage(img, 0, 0);
    //   });
    var iHtml = $('#resultIframe').contents().find('body');
    html2canvas(iHtml, {
      onrendered: function onrendered(canvas) {
        console.log(canvas); // var theCanvas = canvas;

        document.body.appendChild(canvas); // Convert and download as image 
        //  Canvas2Image.saveAsPNG(canvas); 

        var dataString = canvas.toDataURL("image/png");
        var link = document.createElement("a");
        link.download = "image" + ".png";
        link.href = dataString;
        link.target = "_blank";
        link.click(); // $content.replaceWith($cloned);

        $("body").append("<div id='img-out'></div>");
        $("#img-out").append(canvas); // Clean up 
        //document.body.removeChild(canvas);
      }
    });
  } // Tasks 


  var progress = {
    status: 2,
    task1: false,
    task2: false,
    task3: false,
    task4: false,
    task5: false // Main task 

  };
  window.tasks = [{
    title: "In this task, you need to create a simple HTML form, as shown in on your Task tab. Please check 'Task' tab for image. You will be evaluated based on how closely your output matches the required, and your code quality.",
    taskContent: "<br /><h4>Task 1: Create a HTML login form as shown below.</h4><br /><img src='img/task1_web.png'/>",
    questions: [{
      regex: function regex(html, js, css, scss) {
        html.indexOf("!DOCTYPE html");
      },
      question: "What HTML version does this correspond to ? : <!DOCTYPE html>",
      options: ["HTML5 Transactional", "HTML4", "HTML5", "HTML 1.0"],
      answer: "HTML5",
      wrongCallback: function wrongCallback() {},
      followup: {
        question: "What is the latest HTML version?",
        options: ["HTML6", "HTML3", "HTML5", "HTML7"],
        answer: "HTML5"
      }
    }],
    checklist: [{
      check: function check() {
        // var htmlContent = $("input", $(fileData["index.html"].code));
        if (fileData["index.html"].code.indexOf("<input") == -1) {
          return false;
        }

        return true;
      },
      "title": "No input items.",
      skipped: false
    }, {
      check: function check() {
        // var label = $("input", $(fileData["index.html"].code)).parent().find("label");
        if (fileData["index.html"].code.indexOf("<label") == -1) {
          return false;
        }

        return true;
      },
      "title": "No labels for inputs",
      skipped: false
    }, {
      check: function check() {
        // var htmlContent = $("font", $(fileData["index.html"].code));
        if (fileData["index.html"].code.indexOf("<font") != -1) {
          return false;
        }

        return true;
      },
      "title": "Deprecated HTML elements",
      skipped: false
    }]
  }, {
    title: "You need to create a card grid as shown in 'Tasks' tab. The grid needs to be responsive, optimized for mobile and web. \n You need to define a json array 'items', which needs to be used to populate the grid. \n Parent html element contaning list elements should have id 'list-elements'",
    taskContent: "<br /><h4>Task 2: Create a HTML Grid as shown below.</h4><br /><img src='img/task2_web.PNG'/>",
    checklist: [{
      check: function check() {
        if (fileData["main.js"].code.indexOf(" items") == -1) {
          return false;
        }

        return true;
      },
      "title": "'items' array do not exist."
    }],
    questions: []
  }, {
    condition: "main.scss is empty.",
    check: function check() {
      if (fileData["main.scss"].trim().length == 0) {
        return true;
      }

      return false;
    },
    title: "It seems that you have used CSS. I was wondering, if you know about CSS Precompilers like LESS or SCSS",
    checklist: [{
      check: function check() {
        var htmlContent = fileData["main.scss"].code.length;

        if (htmlContent.length == 0) {
          return false;
        }

        return true;
      },
      "title": "SCSS is still empty"
    }],
    questions: [{
      "regex": "@extend",
      "question": "Can we have multiple inheritence in SCSS?",
      "options": ["Yes", "No"],
      "answer": "Yes"
    }] // {
    //     title: "Great. Add two buttons One to add a card and one to delete, keep the content same as the last card in your grid. \n Add button id should be add-btn \n Delete button id should be 'delete-btn'",
    // },

  }];
  window.navItemClick = navItemClick;

  function navItemClick(id, con_id) {
    $(".nav-item").removeClass("active");
    $("#" + id).addClass("active");
    $(".sec").addClass("hidden");
    $("#" + con_id).removeClass("hidden");
  }
}
"use strict";

function loadJava() {
  $(document).ready(function () {
    //to make each section resizable
    $("#htmlSec").resizable({
      handles: 'e, w'
    }); //   $("#cssSec").resizable({
    //     handles: 'e, w'
    //   })
    //   $("#jsSec").resizable({
    //     handles:'e, w'
    //   })

    $("#resultSec").resizable({
      handle: 'e,w'
    }); //makes the buttons toggable to hide and unhide each section
    //   $("#htmlButton").click(function(){
    //       $("#htmlSec").toggle(1000);
    //   });
    //   $("#cssButton").click(function(){
    //       $("#cssSec").toggle(1000);
    //   });
    //   $("#jsButton").click(function() {
    //       $("#jsSec").toggle(1000);
    //   });

    $("#resultsButton").click(function () {
      $("#resultSec").toggle(1000);
    });
    $("#run").click(function () {
      fileData[currentFile].code = editor.getValue(); //            $('#resultIframe').contents().find('html').html("<style>"+fileData["main.css"].code+"</style>"+fileData["index.html"].code);
      //    document.getElementById('resultIframe').contentWindow.eval( fileData["main.js"].code );
    });
  });
  var $messages = $('.messages-content'),
      d,
      h,
      m,
      i = 0;
  $(window).load(function () {
    $messages.mCustomScrollbar();
    setTimeout(function () {
      // fakeMessage();
      initChatbot();
    }, 100);
  });
  window.updateScrollbar = updateScrollbar;

  function updateScrollbar() {
    $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
      scrollInertia: 10,
      timeout: 0
    });
  }

  window.setDate = setDate;

  function setDate() {
    d = new Date();

    if (m != d.getMinutes()) {
      m = d.getMinutes();
      $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
      $('<div class="checkmark-sent-delivered">&check;</div>').appendTo($('.message:last'));
      $('<div class="checkmark-read">&check;</div>').appendTo($('.message:last'));
    }
  }

  window.insertMessage = insertMessage;

  function insertMessage() {
    var msg = $('.message-input').val();

    if ($.trim(msg) == '') {
      return false;
    }

    if (msg.trim().toLowerCase() == "done") {
      //If current condition is not passed, then skip
      var e1 = parseInt(episode.split('.')[0]);
      var e2 = parseInt(episode.split('.')[1]);
      checkList(tasks[e1].checklist);
    }

    if (msg.trim().toLowerCase() == "skip") {
      var e1 = parseInt(episode.split('.')[0]);
      var e2 = parseInt(episode.split('.')[1]);
      e1 += 1;
      e2 = -1;
      episode = e1 + "." + e2;
      next();
    }

    if (msg.trim().toLowerCase() == "skip check") {
      var e1 = parseInt(episode.split('.')[0]);
      var e2 = parseInt(episode.split('.')[1]);
      tasks[e1].checklist[e2]["skipped"] = true;
      next();
    }

    $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
    setDate();
    $('.message-input').val(null);
    updateScrollbar(); //   setTimeout(function() {
    //     fakeMessage();
    //   }, 1000 + (Math.random() * 20) * 100);
  }

  window.insertMessageText = insertMessageText;

  function insertMessageText(msg) {
    if (msg.trim() == '') {
      return false;
    }

    $('<div class="message loading new"><figure class="avatar"><img src="http://askavenue.com/img/17.jpg" /></figure><span></span></div>').appendTo($('.mCSB_container'));
    updateScrollbar();
    setTimeout(function () {
      $('.message.loading').remove();
      $('<div class="message new"><figure class="avatar"><img src="http://askavenue.com/img/17.jpg" /></figure>' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
      setDate();
      updateScrollbar();
    }, 1000 + Math.random() * 20 * 100);
  }

  $('.message-submit').click(function () {
    insertMessage();
  });
  $(window).on('keydown', function (e) {//   if (e.which == 13) {
    //     insertMessage();
    //     return false;
    //   }
  });
  var Fake = ['Hi there, I\'m Jesse and you?', 'Nice to meet you', 'How are you?', 'Not too bad, thanks', 'What do you do?', 'That\'s awesome', 'Codepen is a nice place to stay', 'I think you\'re a nice person', 'Why do you think that?', 'Can you explain?', 'Anyway I\'ve gotta go now', 'It was a pleasure chat with you', 'Time to make a new codepen', 'Bye', ':)'];

  function fakeMessage() {
    if ($('.message-input').val() != '') {
      return false;
    }

    $('<div class="message loading new"><figure class="avatar"><img src="http://askavenue.com/img/17.jpg" /></figure><span></span></div>').appendTo($('.mCSB_container'));
    updateScrollbar();
    setTimeout(function () {
      $('.message.loading').remove();
      $('<div class="message new"><figure class="avatar"><img src="http://askavenue.com/img/17.jpg" /></figure>' + Fake[i] + '</div>').appendTo($('.mCSB_container')).addClass('new');
      setDate();
      updateScrollbar();
      i++;
    }, 1000 + Math.random() * 20 * 100);
  }

  $('.button').click(function () {
    $('.menu .items span').toggleClass('active');
    $('.menu .button').toggleClass('active');
  });

  function initEditor() {// window.editor = ace.edit("editor");
    // editor.setTheme("ace/theme/monokai");
    // editor.getSession().setMode("ace/mode/html");
    // window.JavaScriptMode = ace.require("ace/mode/javascript").Mode;
    // window.HTMLMode = ace.require("ace/mode/html").Mode;
    // window.CSSMode = ace.require("ace/mode/css").Mode;
    // editor.session.setMode(new HTMLMode());
  }

  initEditor();
  window.fileData = {
    "main.java": {
      code: "",
      type: "ace/mode/java"
    },
    "index.txt": {
      code: "",
      type: "ace/mode/text"
    }
  };
  window.currentFile = "main.java";
  window.changeFile = changeFile;

  function changeFile(fileName) {
    // var fileName = currentFile;
    if (!fileData[fileName]) return;
    var lastCode = editor.getValue();
    fileData[currentFile].code = lastCode;
    editor.setValue(fileData[fileName].code);
    currentFile = fileName;
    editor.getSession().setMode(fileData[fileName].type);
  }

  function snapShotImage() {
    // var body = $("#resultIframe").contents().find('body')[0];
    // iframe2image(document.getElementById("resultIframe"), function (err, img) {
    //     // If there is an error, log it
    //     if (err) { return console.error(err); }
    //     console.log(img);
    //     $("body").append(img);
    //     var $img_src = img.src;
    //     var link = document.createElement("a");
    //     link.download = "image"+".png";
    //     link.href = $img_src;
    //     link.target = "_blank";
    //     link.click();
    // // Otherwise, add the image to the canvas
    //     context.drawImage(img, 0, 0);
    //   });
    var iHtml = $('#resultIframe').contents().find('body');
    html2canvas(iHtml, {
      onrendered: function onrendered(canvas) {
        console.log(canvas); // var theCanvas = canvas;

        document.body.appendChild(canvas); // Convert and download as image 
        //  Canvas2Image.saveAsPNG(canvas); 

        var dataString = canvas.toDataURL("image/png");
        var link = document.createElement("a");
        link.download = "image" + ".png";
        link.href = dataString;
        link.target = "_blank";
        link.click(); // $content.replaceWith($cloned);

        $("body").append("<div id='img-out'></div>");
        $("#img-out").append(canvas); // Clean up 
        //document.body.removeChild(canvas);
      }
    });
  } // Tasks 


  var progress = {
    status: 2,
    task1: false,
    task2: false,
    task3: false,
    task4: false,
    task5: false // Main task 

  };
  window.tasks = [{
    title: "Write a program to sort linked list. See Task View for detail.",
    taskContent: "<br /><h4>Task 1: Write a program to sort linked list.</h4><br /><p>Sample input is given in input.txt</p>",
    questions: [{
      regex: function regex(html, js, css, scss) {
        html.indexOf("!DOCTYPE html");
      },
      question: "What sorting algorithm does Java inbuilt sort function use?",
      options: ["Merge Sort", "Quick Sort", "Double Pivot Quick Sort", "Insertion Sort"],
      answer: "Double Pivot Quick Sort",
      wrongCallback: function wrongCallback() {},
      followup: {
        question: "What is the worst case time complexity of Quick Sort",
        options: ["O(n^2)", "O(n^3)", "O(nlogn)", "O(n)"],
        answer: "O(n^2)"
      }
    }],
    checklist: [{
      check: function check() {
        // Return statement missing
        var content = fileData["main.java"].code;

        if (!content) {
          content = " ";
        }

        var idx = content.indexOf("== null");

        if (idx == -1) {
          return false;
        }

        return true;
      },
      "title": "Null check for linked list missing"
    }, {
      check: function check() {
        // Return statement missing
        var content = fileData["main.java"].code;

        if (!content) {
          content = " ";
        }

        var idx = content.indexOf("return");

        if (idx == -1) {
          return false;
        }

        return true;
      },
      "title": "No return statement"
    }]
  }, {
    title: "Write a program to determine a if a linked list is palindrome.",
    taskContent: "<br /><h4>Write a program to determine a if a linked list is palindrome.</h4><br /><p>You need to create the linked list yourself.</p>",
    questions: [{
      regex: function regex(java, string, linked_list) {
        html.indexOf(".equals");
      },
      question: "How does Java internally compare two objects are equal?",
      options: ["Memory allocation is same", "Value is same", "Variable name is same"],
      answer: "Memory allocation is same",
      followup: {
        question: "How is memory allocated in linked list ",
        options: ["Dynamic in heap", "Static in heap", "Static in stack", "Dynamic in stack"],
        answer: "Dynamic in heap"
      }
    }],
    checklist: [{
      check: function check() {
        // main method is missing 
        var content = fileData["main.java"].code;

        if (!content) {
          content = " ";
        } // else{
        //     content = content[1];
        // }


        var idx = content.indexOf("findPalindrome()");

        if (idx == -1) {
          return false;
        }

        return true;
      },
      "title": "No input items."
    }, {
      check: function check() {
        // Return statement missing
        var content = fileData["main.java"].code;

        if (!content) {
          content = " ";
        }

        var idx = content.indexOf("return");

        if (idx == -1) {
          return false;
        }

        return true;
      },
      "title": "No return statement"
    }]
  }];
  window.navItemClick = navItemClick;

  function navItemClick(id, con_id) {
    $(".nav-item").removeClass("active");
    $("#" + id).addClass("active");
    $(".sec").addClass("hidden");
    $("#" + con_id).removeClass("hidden");
  }
}
// window.vueApp = new Vue({
//     el: '#vue-app',
//     data: {
//         message: 'Hello user!',
//         noneSelected: true,
//         selectedState: "",
//         playerDetail: {
//             name: "<Player Name>"
//         },
//         overviewFilters: {},
//         selectedMap: 1
//     },
//     mounted: function(){
//         loadD3();
//     }
// });
"use strict";
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNoYXRib3QuanMiLCJtYWluLmpzIiwibWFpbl9qYXZhLmpzIiwidnVlX21vZGVsLmpzIl0sIm5hbWVzIjpbIm1vZGUiLCJlcGlzb2RlIiwiYW5zd2VyQ2FsbGJhY2siLCIkIiwiaHRtbCIsIm5leHQiLCJ0YXNrSW5kZXgiLCJlMSIsInBhcnNlSW50Iiwic3BsaXQiLCJlMiIsInRhc2tDb3VudCIsInRhc2tzIiwibGVuZ3RoIiwiY2hlY2tDb3VudCIsInF1ZXN0aW9uQ291bnQiLCJpbnNlcnRNZXNzYWdlVGV4dCIsInRpdGxlIiwidGFza0NvbnRlbnQiLCJxdWVzdGlvbnMiLCJhc2tRdWVzdGlvbiIsImluaXRDaGF0Ym90Iiwic2V0VGltZW91dCIsInF1ZXN0aW9uIiwib3B0aW9ucyIsImFuc3dlciIsInF1ZXN0aW9uT2JqIiwidHJpbSIsImFwcGVuZFRvIiwidXBkYXRlU2Nyb2xsYmFyIiwicmVtb3ZlIiwiJGVsZW0iLCJhZGRDbGFzcyIsInNldERhdGUiLCJhbnN3ZXJTZWxlY3RlZCIsImZvbGxvd3VwIiwiYWRkT3B0aW9ucyIsIk1hdGgiLCJyYW5kb20iLCJvcHRpb24iLCJjbGljayIsInRleHQiLCJuZXh0VGFzayIsImNoZWNrTGlzdCIsImNoZWNrbGlzdCIsImNoZWNrT2JqIiwiY2hlY2siLCJsb2FkV2ViIiwiZG9jdW1lbnQiLCJyZWFkeSIsInJlc2l6YWJsZSIsImhhbmRsZXMiLCJoYW5kbGUiLCJ0b2dnbGUiLCJmaWxlRGF0YSIsImN1cnJlbnRGaWxlIiwiY29kZSIsImVkaXRvciIsImdldFZhbHVlIiwiY29udGVudHMiLCJmaW5kIiwiZ2V0RWxlbWVudEJ5SWQiLCJjb250ZW50V2luZG93IiwiZXZhbCIsIiRtZXNzYWdlcyIsImQiLCJoIiwibSIsImkiLCJ3aW5kb3ciLCJsb2FkIiwibUN1c3RvbVNjcm9sbGJhciIsInNjcm9sbEluZXJ0aWEiLCJ0aW1lb3V0IiwiRGF0ZSIsImdldE1pbnV0ZXMiLCJnZXRIb3VycyIsImluc2VydE1lc3NhZ2UiLCJtc2ciLCJ2YWwiLCJ0b0xvd2VyQ2FzZSIsIm9uIiwiZSIsIkZha2UiLCJmYWtlTWVzc2FnZSIsInRvZ2dsZUNsYXNzIiwiaW5pdEVkaXRvciIsInR5cGUiLCJjaGFuZ2VGaWxlIiwiZmlsZU5hbWUiLCJsYXN0Q29kZSIsInNldFZhbHVlIiwiZ2V0U2Vzc2lvbiIsInNldE1vZGUiLCJzbmFwU2hvdEltYWdlIiwiaUh0bWwiLCJodG1sMmNhbnZhcyIsIm9ucmVuZGVyZWQiLCJjYW52YXMiLCJjb25zb2xlIiwibG9nIiwiYm9keSIsImFwcGVuZENoaWxkIiwiZGF0YVN0cmluZyIsInRvRGF0YVVSTCIsImxpbmsiLCJjcmVhdGVFbGVtZW50IiwiZG93bmxvYWQiLCJocmVmIiwidGFyZ2V0IiwiYXBwZW5kIiwicHJvZ3Jlc3MiLCJzdGF0dXMiLCJ0YXNrMSIsInRhc2syIiwidGFzazMiLCJ0YXNrNCIsInRhc2s1IiwicmVnZXgiLCJqcyIsImNzcyIsInNjc3MiLCJpbmRleE9mIiwid3JvbmdDYWxsYmFjayIsInNraXBwZWQiLCJjb25kaXRpb24iLCJodG1sQ29udGVudCIsIm5hdkl0ZW1DbGljayIsImlkIiwiY29uX2lkIiwicmVtb3ZlQ2xhc3MiLCJsb2FkSmF2YSIsImNvbnRlbnQiLCJpZHgiLCJqYXZhIiwic3RyaW5nIiwibGlua2VkX2xpc3QiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsSUFBSSxHQUFHLE1BQVgsQyxDQUFtQjs7QUFDbkIsSUFBSUMsT0FBTyxHQUFHLE1BQWQ7O0FBRUEsSUFBSUMsY0FBYyxHQUFHLFNBQWpCQSxjQUFpQixHQUFVO0FBQzNCO0FBQ0FDLEVBQUFBLENBQUMsQ0FBQyxpQkFBRCxDQUFELENBQXFCQyxJQUFyQixDQUEwQixFQUExQjtBQUNBQyxFQUFBQSxJQUFJO0FBQ1AsQ0FKRDs7QUFLQSxJQUFJQyxTQUFTLEdBQUcsQ0FBQyxDQUFqQjs7QUFFQSxTQUFTRCxJQUFULEdBQWU7QUFDWEYsRUFBQUEsQ0FBQyxDQUFDLGlCQUFELENBQUQsQ0FBcUJDLElBQXJCLENB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QUNWLGlCQUFPLEtBQVA7QUFDSDs7QUFDRCxlQUFPLElBQVA7QUFFSCxPQWJMO0FBY0ksZUFBUztBQWRiLEtBbEJPO0FBdEJmLEdBM0RXLENBQWY7QUE0SEFoRSxFQUFBQSxNQUFNLENBQUMwRCxZQUFQLEdBQXNCQSxZQUF0Qjs7QUFDQSxXQUFTQSxZQUFULENBQXNCQyxFQUF0QixFQUEwQkMsTUFBMUIsRUFBaUM7QUFDN0I5SCxJQUFBQSxDQUFDLENBQUMsV0FBRCxDQUFELENBQWUrSCxXQUFmLENBQTJCLFFBQTNCO0FBQ0EvSCxJQUFBQSxDQUFDLENBQUMsTUFBSTZILEVBQUwsQ0FBRCxDQUFVaEcsUUFBVixDQUFtQixRQUFuQjtBQUVBN0IsSUFBQUEsQ0FBQyxDQUFDLE1BQUQsQ0FBRCxDQUFVNkIsUUFBVixDQUFtQixRQUFuQjtBQUNBN0IsSUFBQUEsQ0FBQyxDQUFDLE1BQUk4SCxNQUFMLENBQUQsQ0FBY0MsV0FBZCxDQUEwQixRQUExQjtBQUNIO0FBR0E7QUN2YUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIG1vZGUgPSBcImNvZGVcIjsgLy9jb2RlXFxxdWVzdGlvblxyXG52YXIgZXBpc29kZSA9IFwiMC4tMVwiO1xyXG5cclxudmFyIGFuc3dlckNhbGxiYWNrID0gZnVuY3Rpb24oKXtcclxuICAgIC8vU3RhcnQgaW5pdGlhbCB0ZXN0XHJcbiAgICAkKFwiLm1DU0JfY29udGFpbmVyXCIpLmh0bWwoXCJcIik7XHJcbiAgICBuZXh0KCk7XHJcbn07XHJcbnZhciB0YXNrSW5kZXggPSAtMTtcclxuXHJcbmZ1bmN0aW9uIG5leHQoKXtcclxuICAgICQoXCIubUNTQl9jb250YWluZXJcIikuaHRtbChcIlwiKTtcclxuICAgIHZhciBlMSA9IHBhcnNlSW50KGVwaXNvZGUuc3BsaXQoJy4nKVswXSk7XHJcbiAgICB2YXIgZTIgPSBwYXJzZUludChlcGlzb2RlLnNwbGl0KCcuJylbMV0pO1xyXG4gICAgdmFyIHRhc2tDb3VudCA9IHRhc2tzLmxlbmd0aDtcclxuICAgIGlmKG1vZGUgPT0gXCJjb2RlXCIpe1xyXG4gICAgICAgIHZhciBjaGVja0NvdW50ID0gdGFza3NbZTFdO1xyXG4gICAgICAgIGlmKGUyID09IGNoZWNrQ291bnQpe1xyXG4gICAgICAgICAgICBlMSArPSAxO1xyXG4gICAgICAgICAgICBlMiA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGUyICs9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYobW9kZSA9PSBcInF1ZXN0aW9uXCIpe1xyXG4gICAgICAgIHZhciBxdWVzdGlvbkNvdW50ID0gdGFza3NbZTFdO1xyXG4gICAgICAgIGlmKGUyID09IHF1ZXN0aW9uQ291bnQpe1xyXG4gICAgICAgICAgICBlMSArPSAxO1xyXG4gICAgICAgICAgICBlMiA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGUyICs9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZXBpc29kZSA9IGUxK1wiLlwiK2UyO1xyXG4gICAgaWYgKGUxID09IHRhc2tDb3VudCl7XHJcbiAgICAgICAgJChcIi5tQ1NCX2NvbnRhaW5lclwiKS5odG1sKFwiXCIpO1xyXG4gICAgICAgIGluc2VydE1lc3NhZ2VUZXh0KFwiVGhhbmtzISBZb3UgaGF2ZSBzdWNjZXNmdWxseSBjb21wbGV0ZWQgdGhlIHRlc3QuXCIpO1xyXG4gICAgfVxyXG4gICAgaWYobW9kZSA9PSBcImNvZGVcIil7XHJcbiAgICAgICAgaW5zZXJ0TWVzc2FnZVRleHQodGFza3NbZTFdLnRpdGxlKTtcclxuICAgICAgICBpZiAodGFza3NbZTFdLnRhc2tDb250ZW50KXtcclxuICAgICAgICAgICAgJChcIiN0YXNrLWNvbnRlbnRcIikuaHRtbCh0YXNrc1tlMV0udGFza0NvbnRlbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAkKFwiI3Rhc2stY29udGVudFwiKS5odG1sKHRhc2tzW2UxXS50aXRsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGluc2VydE1lc3NhZ2VUZXh0KFwiWW91IGNhbiBzYXkgJ0RvbmUnIHdoZW4geW91IGFyZSBkb25lLCBvciAnU2tpcCcgdG8gc2tpcCB0aGUgcHJvYmxlbS5cIik7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmKG1vZGUgPT0gXCJxdWVzdGlvblwiKXtcclxuICAgICAgICAvLyBpbnNlcnRNZXNzYWdlVGV4dCh0YXNrc1tlMV0udGl0bGUpO1xyXG4gICAgICAgIGlmKGUyID09IHRhc2tzW2UxXS5xdWVzdGlvbnMubGVuZ3RoKXtcclxuICAgICAgICAgICAgbW9kZSA9IFwiY29kZVwiO1xyXG4gICAgICAgICAgICBlMSArPSAxO1xyXG4gICAgICAgICAgICBlMiArPSAtMTtcclxuICAgICAgICAgICAgZXBpc29kZSA9IGUxK1wiLlwiK2UyO1xyXG4gICAgICAgICAgICBuZXh0KCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgYXNrUXVlc3Rpb24odGFza3NbZTFdLnF1ZXN0aW9uc1tlMl0pO1xyXG5cclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXRDaGF0Ym90KCl7XHJcbiAgICBpbnNlcnRNZXNzYWdlVGV4dChcIkhpLCBJIGFtIElyaXMsIEkgd2lsbCBiZSB5b3VyIEFkYXB0aXZlIEludGVydmlld2luZyBBc3Npc3RhbnRcIik7XHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgYXNrUXVlc3Rpb24oe1xyXG4gICAgICAgICAgICBxdWVzdGlvbjogXCJJIGhvcGUgeW91IGFyZSBoYXZpbmcgYSBnb29kIGRheS4gU2hhbGwgd2Ugc3RhcnQgdGhlIGludGVydmlldz9cIixcclxuICAgICAgICAgICAgb3B0aW9uczogW1wiU3VyZVwiXSxcclxuICAgICAgICAgICAgYW5zd2VyOiBcIlN1cmVcIlxyXG4gICAgICAgIH0pXHJcbiAgICB9LCAyMDAwKTtcclxufVxyXG5cclxuZnVuY3Rpb24gYXNrUXVlc3Rpb24ocXVlc3Rpb25PYmope1xyXG4gICAgaWYgKHF1ZXN0aW9uT2JqLnF1ZXN0aW9uLnRyaW0oKSA9PSAnJykge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgICQoXCIubUNTQl9jb250YWluZXJcIikuaHRtbChcIlwiKTtcclxuICAgICQoJzxkaXYgY2xhc3M9XCJtZXNzYWdlIGxvYWRpbmcgbmV3XCI+PGZpZ3VyZSBjbGFzcz1cImF2YXRhclwiPjxpbWcgc3JjPVwiaHR0cDovL2Fza2F2ZW51ZS5jb20vaW1nLzE3LmpwZ1wiIC8+PC9maWd1cmU+PHNwYW4+PC9zcGFuPjwvZGl2PicpLmFwcGVuZFRvKCQoJy5tQ1NCX2NvbnRhaW5lcicpKTtcclxuICAgIHVwZGF0ZVNjcm9sbGJhcigpO1xyXG5cclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCgnLm1lc3NhZ2UubG9hZGluZycpLnJlbW92ZSgpO1xyXG4gICAgICAgIHZhciAkZWxlbSA9ICQoJzxkaXYgY2xhc3M9XCJtZXNzYWdlIG5ld1wiPjxmaWd1cmUgY2xhc3M9XCJhdmF0YXJcIj48aW1nIHNyYz1cImh0dHA6Ly9hc2thdmVudWUuY29tL2ltZy8xNy5qcGdcIiAvPjwvZmlndXJlPicgKyBxdWVzdGlvbk9iai5xdWVzdGlvbiArICc8L2Rpdj4nKTtcclxuICAgICAgICBcclxuICAgICAgICAkZWxlbS5hcHBlbmRUbygkKCcubUNTQl9jb250YWluZXInKSkuYWRkQ2xhc3MoJ25ldycpO1xyXG4gICAgICAgIHNldERhdGUoKTtcclxuICAgICAgICB1cGRhdGVTY3JvbGxiYXIoKTtcclxuICAgICAgICBhbnN3ZXJTZWxlY3RlZCA9IGZ1bmN0aW9uKGFuc3dlcikge1xyXG4gICAgICAgICAgICBpZihhbnN3ZXIgPT0gcXVlc3Rpb25PYmouYW5zd2VyKXtcclxuICAgICAgICAgICAgICAgIGlmKHF1ZXN0aW9uT2JqLmZvbGxvd3VwKXtcclxuICAgICAgICAgICAgICAgICAgICBhc2tRdWVzdGlvbihxdWVzdGlvbk9iai5mb2xsb3d1cCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIG5leHQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBhZGRPcHRpb25zKHF1ZXN0aW9uT2JqKTtcclxuICAgIH0sIDEwMDAgKyAoTWF0aC5yYW5kb20oKSAqIDIwKSAqIDEwMCk7XHJcblxyXG4gICAgXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZE9wdGlvbnMocXVlc3Rpb25PYmope1xyXG4gICAgZm9yKGNvbnN0IG9wdGlvbiBvZiBxdWVzdGlvbk9iai5vcHRpb25zKXtcclxuICAgICAgICB2YXIgJGVsZW0gPSAkKFwiPGJ1dHRvbiBjbGFzcz0nYnRuIGJ0bi1wcmltYXJ5IG1zZ19vcHRpb24nPlwiK29wdGlvbitcIjwvYnV0dG9uPlwiKTtcclxuICAgICAgICAkZWxlbS5hcHBlbmRUbygkKCcubUNTQl9jb250YWluZXInKSkuYWRkQ2xhc3MoJ25ldycpO1xyXG4gICAgICAgICRlbGVtLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGFuc3dlclNlbGVjdGVkKCQodGhpcykudGV4dCgpKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gbmV4dFRhc2soKXtcclxuICAgIGluc2VydE1lc3NhZ2VUZXh0KFwiSSBob3BlIHlvdSBhcmUgaGF2aW5nIGEgZ29vZCBkYXkuIFNoYWxsIHdlIHN0YXJ0IHRoZSBpbnRlcnZpZXc/XCIpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhbnN3ZXJTZWxlY3RlZChvcHRpb24pe1xyXG4gICAgYW5zd2VyQ2FsbGJhY2sob3B0aW9uKTtcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIGNoZWNrTGlzdChjaGVja2xpc3Qpe1xyXG4gICAgZm9yKGNvbnN0IGNoZWNrT2JqIG9mIGNoZWNrbGlzdCl7XHJcbiAgICAgICAgaWYoIWNoZWNrT2JqLmNoZWNrKCkpe1xyXG4gICAgICAgICAgICAkKFwiLm1DU0JfY29udGFpbmVyXCIpLmh0bWwoXCJcIik7XHJcbiAgICAgICAgICAgIGluc2VydE1lc3NhZ2VUZXh0KGNoZWNrT2JqLnRpdGxlKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihjaGVja09ialtcInNraXBwZWRcIl0pe1xyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB2YXIgZTEgPSBwYXJzZUludChlcGlzb2RlLnNwbGl0KCcuJylbMF0pO1xyXG4gICAgdmFyIGUyID0gcGFyc2VJbnQoZXBpc29kZS5zcGxpdCgnLicpWzFdKTtcclxuICAgIGUyID0gLTE7XHJcbiAgICBlcGlzb2RlID0gZTErXCIuXCIrZTI7XHJcbiAgICBtb2RlID0gXCJxdWVzdGlvblwiO1xyXG4gICAgbmV4dCgpO1xyXG59IiwiZnVuY3Rpb24gbG9hZFdlYigpe1xyXG5cclxuXHJcblxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xyXG4gICAgLy90byBtYWtlIGVhY2ggc2VjdGlvbiByZXNpemFibGVcclxuXHJcbiQoXCIjaHRtbFNlY1wiKS5yZXNpemFibGUoe1xyXG4gICAgaGFuZGxlczogJ2UsIHcnXHJcbiAgfSk7XHJcbiAgXHJcbi8vICAgJChcIiNjc3NTZWNcIikucmVzaXphYmxlKHtcclxuLy8gICAgIGhhbmRsZXM6ICdlLCB3J1xyXG4vLyAgIH0pXHJcbiAgXHJcbi8vICAgJChcIiNqc1NlY1wiKS5yZXNpemFibGUoe1xyXG4vLyAgICAgaGFuZGxlczonZSwgdydcclxuLy8gICB9KVxyXG4gIFxyXG4gICQoXCIjcmVzdWx0U2VjXCIpLnJlc2l6YWJsZSh7XHJcbiAgICBoYW5kbGU6ICdlLHcnXHJcbiAgfSlcclxuICBcclxuICAvL21ha2VzIHRoZSBidXR0b25zIHRvZ2dhYmxlIHRvIGhpZGUgYW5kIHVuaGlkZSBlYWNoIHNlY3Rpb25cclxuICBcclxuLy8gICAkKFwiI2h0bWxCdXR0b25cIikuY2xpY2soZnVuY3Rpb24oKXtcclxuLy8gICAgICAgJChcIiNodG1sU2VjXCIpLnRvZ2dsZSgxMDAwKTtcclxuLy8gICB9KTtcclxuICBcclxuLy8gICAkKFwiI2Nzc0J1dHRvblwiKS5jbGljayhmdW5jdGlvbigpe1xyXG4vLyAgICAgICAkKFwiI2Nzc1NlY1wiKS50b2dnbGUoMTAwMCk7XHJcbiAgXHJcbi8vICAgfSk7XHJcbiAgXHJcbi8vICAgJChcIiNqc0J1dHRvblwiKS5jbGljayhmdW5jdGlvbigpIHtcclxuLy8gICAgICAgJChcIiNqc1NlY1wiKS50b2dnbGUoMTAwMCk7XHJcbi8vICAgfSk7XHJcbiAgXHJcbiAgJChcIiNyZXN1bHRzQnV0dG9uXCIpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgICQoXCIjcmVzdWx0U2VjXCIpLnRvZ2dsZSgxMDAwKTtcclxuICB9KTtcclxuICBcclxuICAkKFwiI3J1blwiKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgZmlsZURhdGFbY3VycmVudEZpbGVdLmNvZGUgPSBlZGl0b3IuZ2V0VmFsdWUoKTtcclxuICAgICAgICAgICAkKCcjcmVzdWx0SWZyYW1lJykuY29udGVudHMoKS5maW5kKCdodG1sJykuaHRtbChcIjxzdHlsZT5cIitmaWxlRGF0YVtcIm1haW4uY3NzXCJdLmNvZGUrXCI8L3N0eWxlPlwiK2ZpbGVEYXRhW1wiaW5kZXguaHRtbFwiXS5jb2RlKTtcclxuICAgICAgICAgICAgICAgICBcclxuICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc3VsdElmcmFtZScpLmNvbnRlbnRXaW5kb3cuZXZhbCggZmlsZURhdGFbXCJtYWluLmpzXCJdLmNvZGUgKTtcclxuICAgfSk7XHJcbiAgIFxyXG4gICBcclxufSk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG52YXIgJG1lc3NhZ2VzID0gJCgnLm1lc3NhZ2VzLWNvbnRlbnQnKSxcclxuICAgIGQsIGgsIG0sXHJcbiAgICBpID0gMDtcclxuXHJcbiQod2luZG93KS5sb2FkKGZ1bmN0aW9uKCkge1xyXG4gICRtZXNzYWdlcy5tQ3VzdG9tU2Nyb2xsYmFyKCk7XHJcbiAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgIC8vIGZha2VNZXNzYWdlKCk7XHJcbiAgICBpbml0Q2hhdGJvdCgpO1xyXG4gIH0sIDEwMCk7XHJcbn0pO1xyXG5cclxud2luZG93LnVwZGF0ZVNjcm9sbGJhciAgPSB1cGRhdGVTY3JvbGxiYXIgO1xyXG5mdW5jdGlvbiB1cGRhdGVTY3JvbGxiYXIoKSB7XHJcbiAgJG1lc3NhZ2VzLm1DdXN0b21TY3JvbGxiYXIoXCJ1cGRhdGVcIikubUN1c3RvbVNjcm9sbGJhcignc2Nyb2xsVG8nLCAnYm90dG9tJywge1xyXG4gICAgc2Nyb2xsSW5lcnRpYTogMTAsXHJcbiAgICB0aW1lb3V0OiAwXHJcbiAgfSk7XHJcbn1cclxud2luZG93LnNldERhdGUgPSBzZXREYXRlO1xyXG5mdW5jdGlvbiBzZXREYXRlKCl7XHJcbiAgZCA9IG5ldyBEYXRlKClcclxuICBpZiAobSAhPSBkLmdldE1pbnV0ZXMoKSkge1xyXG4gICAgbSA9IGQuZ2V0TWludXRlcygpO1xyXG4gICAgJCgnPGRpdiBjbGFzcz1cInRpbWVzdGFtcFwiPicgKyBkLmdldEhvdXJzKCkgKyAnOicgKyBtICsgJzwvZGl2PicpLmFwcGVuZFRvKCQoJy5tZXNzYWdlOmxhc3QnKSk7XHJcbiAgICAkKCc8ZGl2IGNsYXNzPVwiY2hlY2ttYXJrLXNlbnQtZGVsaXZlcmVkXCI+JmNoZWNrOzwvZGl2PicpLmFwcGVuZFRvKCQoJy5tZXNzYWdlOmxhc3QnKSk7XHJcbiAgICAkKCc8ZGl2IGNsYXNzPVwiY2hlY2ttYXJrLXJlYWRcIj4mY2hlY2s7PC9kaXY+JykuYXBwZW5kVG8oJCgnLm1lc3NhZ2U6bGFzdCcpKTtcclxuICB9XHJcbn1cclxuXHJcbndpbmRvdy5pbnNlcnRNZXNzYWdlPSBpbnNlcnRNZXNzYWdlO1xyXG5mdW5jdGlvbiBpbnNlcnRNZXNzYWdlKCkge1xyXG4gIHZhciBtc2cgPSAkKCcubWVzc2FnZS1pbnB1dCcpLnZhbCgpO1xyXG4gIGlmICgkLnRyaW0obXNnKSA9PSAnJykge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuICBpZihtc2cudHJpbSgpLnRvTG93ZXJDYXNlKCkgPT0gXCJkb25lXCIpe1xyXG4gICAgICAgIC8vSWYgY3VycmVudCBjb25kaXRpb24gaXMgbm90IHBhc3NlZCwgdGhlbiBza2lwXHJcbiAgICAgICAgdmFyIGUxID0gcGFyc2VJbnQoZXBpc29kZS5zcGxpdCgnLicpWzBdKTtcclxuICAgICAgICB2YXIgZTIgPSBwYXJzZUludChlcGlzb2RlLnNwbGl0KCcuJylbMV0pO1xyXG4gICAgICAgIGNoZWNrTGlzdCh0YXNrc1tlMV0uY2hlY2tsaXN0KTtcclxuICAgICAgICBcclxuICB9XHJcbiAgaWYobXNnLnRyaW0oKS50b0xvd2VyQ2FzZSgpID09IFwic2tpcFwiKXtcclxuICAgICAgICB2YXIgZTEgPSBwYXJzZUludChlcGlzb2RlLnNwbGl0KCcuJylbMF0pO1xyXG4gICAgICAgIHZhciBlMiA9IHBhcnNlSW50KGVwaXNvZGUuc3BsaXQoJy4nKVsxXSk7XHJcbiAgICAgICAgZTEgKz0gMTtcclxuICAgICAgICBlMiA9IC0xO1xyXG4gICAgICAgIGVwaXNvZGUgPSBlMStcIi5cIitlMjtcclxuICAgICAgICBuZXh0KCk7XHJcbiAgfVxyXG4gIGlmKG1zZy50cmltKCkudG9Mb3dlckNhc2UoKSA9PSBcInNraXAgY2hlY2tcIil7XHJcbiAgICB2YXIgZTEgPSBwYXJzZUludChlcGlzb2RlLnNwbGl0KCcuJylbMF0pO1xyXG4gICAgdmFyIGUyID0gcGFyc2VJbnQoZXBpc29kZS5zcGxpdCgnLicpWzFdKTtcclxuICAgIHRhc2tzW2UxXS5jaGVja2xpc3RbZTJdW1wic2tpcHBlZFwiXSA9IHRydWU7XHJcbiAgICBuZXh0KCk7XHJcbn1cclxuICAkKCc8ZGl2IGNsYXNzPVwibWVzc2FnZSBtZXNzYWdlLXBlcnNvbmFsXCI+JyArIG1zZyArICc8L2Rpdj4nKS5hcHBlbmRUbygkKCcubUNTQl9jb250YWluZXInKSkuYWRkQ2xhc3MoJ25ldycpO1xyXG4gIHNldERhdGUoKTtcclxuICAkKCcubWVzc2FnZS1pbnB1dCcpLnZhbChudWxsKTtcclxuICB1cGRhdGVTY3JvbGxiYXIoKTtcclxuLy8gICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4vLyAgICAgZmFrZU1lc3NhZ2UoKTtcclxuLy8gICB9LCAxMDAwICsgKE1hdGgucmFuZG9tKCkgKiAyMCkgKiAxMDApO1xyXG59XHJcbndpbmRvdy5pbnNlcnRNZXNzYWdlVGV4dCA9IGluc2VydE1lc3NhZ2VUZXh0O1xyXG5mdW5jdGlvbiBpbnNlcnRNZXNzYWdlVGV4dChtc2cpIHtcclxuICAgIGlmIChtc2cudHJpbSgpID09ICcnKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgJCgnPGRpdiBjbGFzcz1cIm1lc3NhZ2UgbG9hZGluZyBuZXdcIj48ZmlndXJlIGNsYXNzPVwiYXZhdGFyXCI+PGltZyBzcmM9XCJodHRwOi8vYXNrYXZlbnVlLmNvbS9pbWcvMTcuanBnXCIgLz48L2ZpZ3VyZT48c3Bhbj48L3NwYW4+PC9kaXY+JykuYXBwZW5kVG8oJCgnLm1DU0JfY29udGFpbmVyJykpO1xyXG4gICAgdXBkYXRlU2Nyb2xsYmFyKCk7XHJcblxyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAkKCcubWVzc2FnZS5sb2FkaW5nJykucmVtb3ZlKCk7XHJcbiAgICAgICAgJCgnPGRpdiBjbGFzcz1cIm1lc3NhZ2UgbmV3XCI+PGZpZ3VyZSBjbGFzcz1cImF2YXRhclwiPjxpbWcgc3JjPVwiaHR0cDovL2Fza2F2ZW51ZS5jb20vaW1nLzE3LmpwZ1wiIC8+PC9maWd1cmU+JyArIG1zZyArICc8L2Rpdj4nKS5hcHBlbmRUbygkKCcubUNTQl9jb250YWluZXInKSkuYWRkQ2xhc3MoJ25ldycpO1xyXG4gICAgICAgIHNldERhdGUoKTtcclxuICAgICAgICB1cGRhdGVTY3JvbGxiYXIoKTtcclxuICAgIH0sIDEwMDAgKyAoTWF0aC5yYW5kb20oKSAqIDIwKSAqIDEwMCk7XHJcbn1cclxuXHJcbiQoJy5tZXNzYWdlLXN1Ym1pdCcpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gIGluc2VydE1lc3NhZ2UoKTtcclxufSk7XHJcblxyXG4kKHdpbmRvdykub24oJ2tleWRvd24nLCBmdW5jdGlvbihlKSB7XHJcbi8vICAgaWYgKGUud2hpY2ggPT0gMTMpIHtcclxuLy8gICAgIGluc2VydE1lc3NhZ2UoKTtcclxuLy8gICAgIHJldHVybiBmYWxzZTtcclxuLy8gICB9XHJcbn0pXHJcblxyXG52YXIgRmFrZSA9IFtcclxuICAnSGkgdGhlcmUsIElcXCdtIEplc3NlIGFuZCB5b3U/JyxcclxuICAnTmljZSB0byBtZWV0IHlvdScsXHJcbiAgJ0hvdyBhcmUgeW91PycsXHJcbiAgJ05vdCB0b28gYmFkLCB0aGFua3MnLFxyXG4gICdXaGF0IGRvIHlvdSBkbz8nLFxyXG4gICdUaGF0XFwncyBhd2Vzb21lJyxcclxuICAnQ29kZXBlbiBpcyBhIG5pY2UgcGxhY2UgdG8gc3RheScsXHJcbiAgJ0kgdGhpbmsgeW91XFwncmUgYSBuaWNlIHBlcnNvbicsXHJcbiAgJ1doeSBkbyB5b3UgdGhpbmsgdGhhdD8nLFxyXG4gICdDYW4geW91IGV4cGxhaW4/JyxcclxuICAnQW55d2F5IElcXCd2ZSBnb3R0YSBnbyBub3cnLFxyXG4gICdJdCB3YXMgYSBwbGVhc3VyZSBjaGF0IHdpdGggeW91JyxcclxuICAnVGltZSB0byBtYWtlIGEgbmV3IGNvZGVwZW4nLFxyXG4gICdCeWUnLFxyXG4gICc6KSdcclxuXVxyXG5cclxuZnVuY3Rpb24gZmFrZU1lc3NhZ2UoKSB7XHJcbiAgaWYgKCQoJy5tZXNzYWdlLWlucHV0JykudmFsKCkgIT0gJycpIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbiAgJCgnPGRpdiBjbGFzcz1cIm1lc3NhZ2UgbG9hZGluZyBuZXdcIj48ZmlndXJlIGNsYXNzPVwiYXZhdGFyXCI+PGltZyBzcmM9XCJodHRwOi8vYXNrYXZlbnVlLmNvbS9pbWcvMTcuanBnXCIgLz48L2ZpZ3VyZT48c3Bhbj48L3NwYW4+PC9kaXY+JykuYXBwZW5kVG8oJCgnLm1DU0JfY29udGFpbmVyJykpO1xyXG4gIHVwZGF0ZVNjcm9sbGJhcigpO1xyXG5cclxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgJCgnLm1lc3NhZ2UubG9hZGluZycpLnJlbW92ZSgpO1xyXG4gICAgJCgnPGRpdiBjbGFzcz1cIm1lc3NhZ2UgbmV3XCI+PGZpZ3VyZSBjbGFzcz1cImF2YXRhclwiPjxpbWcgc3JjPVwiaHR0cDovL2Fza2F2ZW51ZS5jb20vaW1nLzE3LmpwZ1wiIC8+PC9maWd1cmU+JyArIEZha2VbaV0gKyAnPC9kaXY+JykuYXBwZW5kVG8oJCgnLm1DU0JfY29udGFpbmVyJykpLmFkZENsYXNzKCduZXcnKTtcclxuICAgIHNldERhdGUoKTtcclxuICAgIHVwZGF0ZVNjcm9sbGJhcigpO1xyXG4gICAgaSsrO1xyXG4gIH0sIDEwMDAgKyAoTWF0aC5yYW5kb20oKSAqIDIwKSAqIDEwMCk7XHJcblxyXG59XHJcblxyXG4kKCcuYnV0dG9uJykuY2xpY2soZnVuY3Rpb24oKXtcclxuICAkKCcubWVudSAuaXRlbXMgc3BhbicpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgJCgnLm1lbnUgLmJ1dHRvbicpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKTtcclxufSk7XHJcblxyXG5mdW5jdGlvbiBpbml0RWRpdG9yKCl7XHJcbiAgICAvLyB3aW5kb3cuZWRpdG9yID0gYWNlLmVkaXQoXCJlZGl0b3JcIik7XHJcbiAgICAvLyBlZGl0b3Iuc2V0VGhlbWUoXCJhY2UvdGhlbWUvbW9ub2thaVwiKTtcclxuICAgIC8vIGVkaXRvci5nZXRTZXNzaW9uKCkuc2V0TW9kZShcImFjZS9tb2RlL2h0bWxcIik7XHJcbiAgICAvLyB3aW5kb3cuSmF2YVNjcmlwdE1vZGUgPSBhY2UucmVxdWlyZShcImFjZS9tb2RlL2phdmFzY3JpcHRcIikuTW9kZTtcclxuICAgIC8vIHdpbmRvdy5IVE1MTW9kZSA9IGFjZS5yZXF1aXJlKFwiYWNlL21vZGUvaHRtbFwiKS5Nb2RlO1xyXG4gICAgLy8gd2luZG93LkNTU01vZGUgPSBhY2UucmVxdWlyZShcImFjZS9tb2RlL2Nzc1wiKS5Nb2RlO1xyXG4gICAgLy8gZWRpdG9yLnNlc3Npb24uc2V0TW9kZShuZXcgSFRNTE1vZGUoKSk7XHJcblxyXG4gICAgXHJcbn1cclxuXHJcbmluaXRFZGl0b3IoKTtcclxuXHJcbndpbmRvdy5maWxlRGF0YSA9IHtcclxuICAgIFwibWFpbi5qc1wiOiB7XHJcbiAgICAgICAgY29kZTogXCJcIixcclxuICAgICAgICB0eXBlOiBcImFjZS9tb2RlL2phdmFzY3JpcHRcIlxyXG4gICAgfSxcclxuICAgIFwibWFpbi5jc3NcIjoge1xyXG4gICAgICAgIGNvZGU6IFwiXCIsXHJcbiAgICAgICAgdHlwZTogXCJhY2UvbW9kZS9jc3NcIlxyXG4gICAgfSxcclxuICAgIFwiaW5kZXguaHRtbFwiOiB7XHJcbiAgICAgICAgY29kZTogXCJcIixcclxuICAgICAgICB0eXBlOiBcImFjZS9tb2RlL2h0bWxcIlxyXG4gICAgfSxcclxuICAgIFwibWFpbi5zY3NzXCI6IHtcclxuICAgICAgICBjb2RlOiBcIlwiLFxyXG4gICAgICAgIHR5cGU6IFwiYWNlL21vZGUvY3NzXCJcclxuICAgIH1cclxufVxyXG5cclxud2luZG93LmN1cnJlbnRGaWxlID0gXCJpbmRleC5odG1sXCI7XHJcbndpbmRvdy5jaGFuZ2VGaWxlID0gY2hhbmdlRmlsZTtcclxuZnVuY3Rpb24gY2hhbmdlRmlsZShmaWxlTmFtZSl7XHJcbiAgICAvLyB2YXIgZmlsZU5hbWUgPSBjdXJyZW50RmlsZTtcclxuICAgIGlmKCFmaWxlRGF0YVtmaWxlTmFtZV0pcmV0dXJuO1xyXG5cclxuICAgIHZhciBsYXN0Q29kZSA9IGVkaXRvci5nZXRWYWx1ZSgpO1xyXG4gICAgZmlsZURhdGFbY3VycmVudEZpbGVdLmNvZGUgPSBsYXN0Q29kZTtcclxuICAgIGVkaXRvci5zZXRWYWx1ZShmaWxlRGF0YVtmaWxlTmFtZV0uY29kZSk7XHJcbiAgICBjdXJyZW50RmlsZSA9IGZpbGVOYW1lO1xyXG4gICAgZWRpdG9yLmdldFNlc3Npb24oKS5zZXRNb2RlKGZpbGVEYXRhW2ZpbGVOYW1lXS50eXBlKTtcclxufVxyXG5cclxuXHJcblxyXG5cclxuZnVuY3Rpb24gc25hcFNob3RJbWFnZSgpe1xyXG4gICAgLy8gdmFyIGJvZHkgPSAkKFwiI3Jlc3VsdElmcmFtZVwiKS5jb250ZW50cygpLmZpbmQoJ2JvZHknKVswXTtcclxuICAgIC8vIGlmcmFtZTJpbWFnZShkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJlc3VsdElmcmFtZVwiKSwgZnVuY3Rpb24gKGVyciwgaW1nKSB7XHJcbiAgICAvLyAgICAgLy8gSWYgdGhlcmUgaXMgYW4gZXJyb3IsIGxvZyBpdFxyXG4gICAgLy8gICAgIGlmIChlcnIpIHsgcmV0dXJuIGNvbnNvbGUuZXJyb3IoZXJyKTsgfVxyXG4gICAgLy8gICAgIGNvbnNvbGUubG9nKGltZyk7XHJcbiAgICAvLyAgICAgJChcImJvZHlcIikuYXBwZW5kKGltZyk7XHJcbiAgICAvLyAgICAgdmFyICRpbWdfc3JjID0gaW1nLnNyYztcclxuICAgIC8vICAgICB2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xyXG4gICAgLy8gICAgIGxpbmsuZG93bmxvYWQgPSBcImltYWdlXCIrXCIucG5nXCI7XHJcbiAgICAvLyAgICAgbGluay5ocmVmID0gJGltZ19zcmM7XHJcbiAgICAvLyAgICAgbGluay50YXJnZXQgPSBcIl9ibGFua1wiO1xyXG5cclxuICAgIC8vICAgICBsaW5rLmNsaWNrKCk7XHJcbiAgICAvLyAvLyBPdGhlcndpc2UsIGFkZCB0aGUgaW1hZ2UgdG8gdGhlIGNhbnZhc1xyXG4gICAgLy8gICAgIGNvbnRleHQuZHJhd0ltYWdlKGltZywgMCwgMCk7XHJcbiAgICAvLyAgIH0pO1xyXG4gICAgICB2YXIgaUh0bWwgPSAkKCcjcmVzdWx0SWZyYW1lJykuY29udGVudHMoKS5maW5kKCdib2R5Jyk7XHJcbiAgICBodG1sMmNhbnZhcyhpSHRtbCwge1xyXG4gICAgICAgIG9ucmVuZGVyZWQ6IGZ1bmN0aW9uKGNhbnZhcykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhjYW52YXMpO1xyXG4gICAgICAgICAgICAvLyB2YXIgdGhlQ2FudmFzID0gY2FudmFzO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNhbnZhcyk7XHJcblxyXG4gICAgICAgICAgICAvLyBDb252ZXJ0IGFuZCBkb3dubG9hZCBhcyBpbWFnZSBcclxuICAgICAgICAgIC8vICBDYW52YXMySW1hZ2Uuc2F2ZUFzUE5HKGNhbnZhcyk7IFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIGRhdGFTdHJpbmcgPSBjYW52YXMudG9EYXRhVVJMKFwiaW1hZ2UvcG5nXCIpO1xyXG4gICAgICAgICAgICB2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xyXG4gICAgICAgICAgICBsaW5rLmRvd25sb2FkID0gXCJpbWFnZVwiK1wiLnBuZ1wiO1xyXG4gICAgICAgICAgICBsaW5rLmhyZWYgPSBkYXRhU3RyaW5nO1xyXG4gICAgICAgICAgICBsaW5rLnRhcmdldCA9IFwiX2JsYW5rXCI7XHJcbiAgIFxyXG4gICAgICAgICAgICBsaW5rLmNsaWNrKCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyAkY29udGVudC5yZXBsYWNlV2l0aCgkY2xvbmVkKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICQoXCJib2R5XCIpLmFwcGVuZChcIjxkaXYgaWQ9J2ltZy1vdXQnPjwvZGl2PlwiKTtcclxuICAgICAgICAgICAgJChcIiNpbWctb3V0XCIpLmFwcGVuZChjYW52YXMpO1xyXG4gICAgICAgICAgICAvLyBDbGVhbiB1cCBcclxuICAgICAgICAgICAgLy9kb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGNhbnZhcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcblxyXG5cclxuLy8gVGFza3MgXHJcblxyXG52YXIgcHJvZ3Jlc3MgPSB7XHJcbiAgICBzdGF0dXM6IDIsXHJcbiAgICB0YXNrMTogZmFsc2UsXHJcbiAgICB0YXNrMjogZmFsc2UsXHJcbiAgICB0YXNrMzogZmFsc2UsXHJcbiAgICB0YXNrNDogZmFsc2UsXHJcbiAgICB0YXNrNTogZmFsc2UsXHJcbn1cclxuLy8gTWFpbiB0YXNrIFxyXG53aW5kb3cudGFza3MgPSBbXHJcbiAgICB7XHJcbiAgICAgICAgdGl0bGU6IFwiSW4gdGhpcyB0YXNrLCB5b3UgbmVlZCB0byBjcmVhdGUgYSBzaW1wbGUgSFRNTCBmb3JtLCBhcyBzaG93biBpbiBvbiB5b3VyIFRhc2sgdGFiLiBQbGVhc2UgY2hlY2sgJ1Rhc2snIHRhYiBmb3IgaW1hZ2UuIFlvdSB3aWxsIGJlIGV2YWx1YXRlZCBiYXNlZCBvbiBob3cgY2xvc2VseSB5b3VyIG91dHB1dCBtYXRjaGVzIHRoZSByZXF1aXJlZCwgYW5kIHlvdXIgY29kZSBxdWFsaXR5LlwiLFxyXG4gICAgICAgIHRhc2tDb250ZW50OiBcIjxiciAvPjxoND5UYXNrIDE6IENyZWF0ZSBhIEhUTUwgbG9naW4gZm9ybSBhcyBzaG93biBiZWxvdy48L2g0PjxiciAvPjxpbWcgc3JjPSdpbWcvdGFzazFfd2ViLnBuZycvPlwiLFxyXG4gICAgICAgIHF1ZXN0aW9uczogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZWdleDogZnVuY3Rpb24oaHRtbCwganMsIGNzcywgc2Nzcyl7XHJcbiAgICAgICAgICAgICAgICAgICAgaHRtbC5pbmRleE9mKFwiIURPQ1RZUEUgaHRtbFwiKVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHF1ZXN0aW9uOiBcIldoYXQgSFRNTCB2ZXJzaW9uIGRvZXMgdGhpcyBjb3JyZXNwb25kIHRvID8gOiA8IURPQ1RZUEUgaHRtbD5cIixcclxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IFtcclxuICAgICAgICAgICAgICAgICAgICBcIkhUTUw1IFRyYW5zYWN0aW9uYWxcIiwgXCJIVE1MNFwiICwgXCJIVE1MNVwiLCBcIkhUTUwgMS4wXCJcclxuICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICBhbnN3ZXI6IFwiSFRNTDVcIixcclxuICAgICAgICAgICAgICAgIHdyb25nQ2FsbGJhY2s6IGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZvbGxvd3VwOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcXVlc3Rpb246IFwiV2hhdCBpcyB0aGUgbGF0ZXN0IEhUTUwgdmVyc2lvbj9cIixcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiSFRNTDZcIiwgXCJIVE1MM1wiICwgXCJIVE1MNVwiLCBcIkhUTUw3XCJcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIGFuc3dlcjogXCJIVE1MNVwiXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdLFxyXG4gICAgICAgIGNoZWNrbGlzdDogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjaGVjazogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICAvLyB2YXIgaHRtbENvbnRlbnQgPSAkKFwiaW5wdXRcIiwgJChmaWxlRGF0YVtcImluZGV4Lmh0bWxcIl0uY29kZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWxlRGF0YVtcImluZGV4Lmh0bWxcIl0uY29kZS5pbmRleE9mKFwiPGlucHV0XCIpID09IC0xKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBcInRpdGxlXCI6IFwiTm8gaW5wdXQgaXRlbXMuXCIsXHJcbiAgICAgICAgICAgICAgICBza2lwcGVkOiBmYWxzZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjaGVjazogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICAvLyB2YXIgbGFiZWwgPSAkKFwiaW5wdXRcIiwgJChmaWxlRGF0YVtcImluZGV4Lmh0bWxcIl0uY29kZSkpLnBhcmVudCgpLmZpbmQoXCJsYWJlbFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBpZihmaWxlRGF0YVtcImluZGV4Lmh0bWxcIl0uY29kZS5pbmRleE9mKFwiPGxhYmVsXCIpID09IC0xKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgXCJ0aXRsZVwiOiBcIk5vIGxhYmVscyBmb3IgaW5wdXRzXCIsXHJcbiAgICAgICAgICAgICAgICBza2lwcGVkOiBmYWxzZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjaGVjazogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICAvLyB2YXIgaHRtbENvbnRlbnQgPSAkKFwiZm9udFwiLCAkKGZpbGVEYXRhW1wiaW5kZXguaHRtbFwiXS5jb2RlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbGVEYXRhW1wiaW5kZXguaHRtbFwiXS5jb2RlLmluZGV4T2YoXCI8Zm9udFwiKSAhPSAtMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIFwidGl0bGVcIjogXCJEZXByZWNhdGVkIEhUTUwgZWxlbWVudHNcIixcclxuICAgICAgICAgICAgICAgIHNraXBwZWQ6IGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIHRpdGxlOiBcIllvdSBuZWVkIHRvIGNyZWF0ZSBhIGNhcmQgZ3JpZCBhcyBzaG93biBpbiAnVGFza3MnIHRhYi4gVGhlIGdyaWQgbmVlZHMgdG8gYmUgcmVzcG9uc2l2ZSwgb3B0aW1pemVkIGZvciBtb2JpbGUgYW5kIHdlYi4gXFxuIFlvdSBuZWVkIHRvIGRlZmluZSBhIGpzb24gYXJyYXkgJ2l0ZW1zJywgd2hpY2ggbmVlZHMgdG8gYmUgdXNlZCB0byBwb3B1bGF0ZSB0aGUgZ3JpZC4gXFxuIFBhcmVudCBodG1sIGVsZW1lbnQgY29udGFuaW5nIGxpc3QgZWxlbWVudHMgc2hvdWxkIGhhdmUgaWQgJ2xpc3QtZWxlbWVudHMnXCIsXHJcbiAgICAgICAgdGFza0NvbnRlbnQ6IFwiPGJyIC8+PGg0PlRhc2sgMjogQ3JlYXRlIGEgSFRNTCBHcmlkIGFzIHNob3duIGJlbG93LjwvaDQ+PGJyIC8+PGltZyBzcmM9J2ltZy90YXNrMl93ZWIuUE5HJy8+XCIsXHJcbiAgICAgICAgY2hlY2tsaXN0OiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNoZWNrOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWxlRGF0YVtcIm1haW4uanNcIl0uY29kZS5pbmRleE9mKFwiIGl0ZW1zXCIpID09IC0xKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBcInRpdGxlXCI6IFwiJ2l0ZW1zJyBhcnJheSBkbyBub3QgZXhpc3QuXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgcXVlc3Rpb25zOiBbXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBjb25kaXRpb246IFwibWFpbi5zY3NzIGlzIGVtcHR5LlwiLFxyXG4gICAgICAgIGNoZWNrOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBpZihmaWxlRGF0YVtcIm1haW4uc2Nzc1wiXS50cmltKCkubGVuZ3RoID09IDApe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdGl0bGU6IFwiSXQgc2VlbXMgdGhhdCB5b3UgaGF2ZSB1c2VkIENTUy4gSSB3YXMgd29uZGVyaW5nLCBpZiB5b3Uga25vdyBhYm91dCBDU1MgUHJlY29tcGlsZXJzIGxpa2UgTEVTUyBvciBTQ1NTXCIsXHJcbiAgICAgICAgY2hlY2tsaXN0OiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNoZWNrOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBodG1sQ29udGVudCA9IGZpbGVEYXRhW1wibWFpbi5zY3NzXCJdLmNvZGUubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChodG1sQ29udGVudC5sZW5ndGggPT0gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgXCJ0aXRsZVwiOiBcIlNDU1MgaXMgc3RpbGwgZW1wdHlcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgcXVlc3Rpb25zOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwicmVnZXhcIjogXCJAZXh0ZW5kXCIsXHJcbiAgICAgICAgICAgICAgICBcInF1ZXN0aW9uXCI6IFwiQ2FuIHdlIGhhdmUgbXVsdGlwbGUgaW5oZXJpdGVuY2UgaW4gU0NTUz9cIixcclxuICAgICAgICAgICAgICAgIFwib3B0aW9uc1wiOiBbXCJZZXNcIiwgXCJOb1wiXSxcclxuICAgICAgICAgICAgICAgIFwiYW5zd2VyXCI6IFwiWWVzXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgIH1cclxuICAgIC8vIHtcclxuICAgIC8vICAgICB0aXRsZTogXCJHcmVhdC4gQWRkIHR3byBidXR0b25zIE9uZSB0byBhZGQgYSBjYXJkIGFuZCBvbmUgdG8gZGVsZXRlLCBrZWVwIHRoZSBjb250ZW50IHNhbWUgYXMgdGhlIGxhc3QgY2FyZCBpbiB5b3VyIGdyaWQuIFxcbiBBZGQgYnV0dG9uIGlkIHNob3VsZCBiZSBhZGQtYnRuIFxcbiBEZWxldGUgYnV0dG9uIGlkIHNob3VsZCBiZSAnZGVsZXRlLWJ0bidcIixcclxuICAgIC8vIH0sXHJcbl1cclxuXHJcblxyXG53aW5kb3cubmF2SXRlbUNsaWNrID0gbmF2SXRlbUNsaWNrIDtcclxuZnVuY3Rpb24gbmF2SXRlbUNsaWNrKGlkLCBjb25faWQpe1xyXG4gICAgJChcIi5uYXYtaXRlbVwiKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcclxuICAgICQoXCIjXCIraWQpLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xyXG5cclxuICAgICQoXCIuc2VjXCIpLmFkZENsYXNzKFwiaGlkZGVuXCIpO1xyXG4gICAgJChcIiNcIitjb25faWQpLnJlbW92ZUNsYXNzKFwiaGlkZGVuXCIpO1xyXG59XHJcblxyXG5cclxufSIsImZ1bmN0aW9uIGxvYWRKYXZhKCl7XHJcblxyXG5cclxuXHJcbiAgICAkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xyXG4gICAgICAgIC8vdG8gbWFrZSBlYWNoIHNlY3Rpb24gcmVzaXphYmxlXHJcbiAgICBcclxuICAgICQoXCIjaHRtbFNlY1wiKS5yZXNpemFibGUoe1xyXG4gICAgICAgIGhhbmRsZXM6ICdlLCB3J1xyXG4gICAgICB9KTtcclxuICAgICAgXHJcbiAgICAvLyAgICQoXCIjY3NzU2VjXCIpLnJlc2l6YWJsZSh7XHJcbiAgICAvLyAgICAgaGFuZGxlczogJ2UsIHcnXHJcbiAgICAvLyAgIH0pXHJcbiAgICAgIFxyXG4gICAgLy8gICAkKFwiI2pzU2VjXCIpLnJlc2l6YWJsZSh7XHJcbiAgICAvLyAgICAgaGFuZGxlczonZSwgdydcclxuICAgIC8vICAgfSlcclxuICAgICAgXHJcbiAgICAgICQoXCIjcmVzdWx0U2VjXCIpLnJlc2l6YWJsZSh7XHJcbiAgICAgICAgaGFuZGxlOiAnZSx3J1xyXG4gICAgICB9KVxyXG4gICAgICBcclxuICAgICAgLy9tYWtlcyB0aGUgYnV0dG9ucyB0b2dnYWJsZSB0byBoaWRlIGFuZCB1bmhpZGUgZWFjaCBzZWN0aW9uXHJcbiAgICAgIFxyXG4gICAgLy8gICAkKFwiI2h0bWxCdXR0b25cIikuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgIC8vICAgICAgICQoXCIjaHRtbFNlY1wiKS50b2dnbGUoMTAwMCk7XHJcbiAgICAvLyAgIH0pO1xyXG4gICAgICBcclxuICAgIC8vICAgJChcIiNjc3NCdXR0b25cIikuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgIC8vICAgICAgICQoXCIjY3NzU2VjXCIpLnRvZ2dsZSgxMDAwKTtcclxuICAgICAgXHJcbiAgICAvLyAgIH0pO1xyXG4gICAgICBcclxuICAgIC8vICAgJChcIiNqc0J1dHRvblwiKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgIC8vICAgICAgICQoXCIjanNTZWNcIikudG9nZ2xlKDEwMDApO1xyXG4gICAgLy8gICB9KTtcclxuICAgICAgXHJcbiAgICAgICQoXCIjcmVzdWx0c0J1dHRvblwiKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgICAgICAgJChcIiNyZXN1bHRTZWNcIikudG9nZ2xlKDEwMDApO1xyXG4gICAgICB9KTtcclxuICAgICAgXHJcbiAgICAgICQoXCIjcnVuXCIpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgZmlsZURhdGFbY3VycmVudEZpbGVdLmNvZGUgPSBlZGl0b3IuZ2V0VmFsdWUoKTtcclxuICAgIC8vICAgICAgICAgICAgJCgnI3Jlc3VsdElmcmFtZScpLmNvbnRlbnRzKCkuZmluZCgnaHRtbCcpLmh0bWwoXCI8c3R5bGU+XCIrZmlsZURhdGFbXCJtYWluLmNzc1wiXS5jb2RlK1wiPC9zdHlsZT5cIitmaWxlRGF0YVtcImluZGV4Lmh0bWxcIl0uY29kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgLy8gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc3VsdElmcmFtZScpLmNvbnRlbnRXaW5kb3cuZXZhbCggZmlsZURhdGFbXCJtYWluLmpzXCJdLmNvZGUgKTtcclxuICAgICAgIH0pO1xyXG4gICAgICAgXHJcbiAgICAgICBcclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICBcclxuICAgIFxyXG4gICAgXHJcbiAgICBcclxuICAgIFxyXG4gICAgXHJcbiAgICB2YXIgJG1lc3NhZ2VzID0gJCgnLm1lc3NhZ2VzLWNvbnRlbnQnKSxcclxuICAgICAgICBkLCBoLCBtLFxyXG4gICAgICAgIGkgPSAwO1xyXG4gICAgXHJcbiAgICAkKHdpbmRvdykubG9hZChmdW5jdGlvbigpIHtcclxuICAgICAgJG1lc3NhZ2VzLm1DdXN0b21TY3JvbGxiYXIoKTtcclxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyBmYWtlTWVzc2FnZSgpO1xyXG4gICAgICAgIGluaXRDaGF0Ym90KCk7XHJcbiAgICAgIH0sIDEwMCk7XHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgd2luZG93LnVwZGF0ZVNjcm9sbGJhciAgPSB1cGRhdGVTY3JvbGxiYXIgO1xyXG4gICAgZnVuY3Rpb24gdXBkYXRlU2Nyb2xsYmFyKCkge1xyXG4gICAgICAkbWVzc2FnZXMubUN1c3RvbVNjcm9sbGJhcihcInVwZGF0ZVwiKS5tQ3VzdG9tU2Nyb2xsYmFyKCdzY3JvbGxUbycsICdib3R0b20nLCB7XHJcbiAgICAgICAgc2Nyb2xsSW5lcnRpYTogMTAsXHJcbiAgICAgICAgdGltZW91dDogMFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIHdpbmRvdy5zZXREYXRlID0gc2V0RGF0ZTtcclxuICAgIGZ1bmN0aW9uIHNldERhdGUoKXtcclxuICAgICAgZCA9IG5ldyBEYXRlKClcclxuICAgICAgaWYgKG0gIT0gZC5nZXRNaW51dGVzKCkpIHtcclxuICAgICAgICBtID0gZC5nZXRNaW51dGVzKCk7XHJcbiAgICAgICAgJCgnPGRpdiBjbGFzcz1cInRpbWVzdGFtcFwiPicgKyBkLmdldEhvdXJzKCkgKyAnOicgKyBtICsgJzwvZGl2PicpLmFwcGVuZFRvKCQoJy5tZXNzYWdlOmxhc3QnKSk7XHJcbiAgICAgICAgJCgnPGRpdiBjbGFzcz1cImNoZWNrbWFyay1zZW50LWRlbGl2ZXJlZFwiPiZjaGVjazs8L2Rpdj4nKS5hcHBlbmRUbygkKCcubWVzc2FnZTpsYXN0JykpO1xyXG4gICAgICAgICQoJzxkaXYgY2xhc3M9XCJjaGVja21hcmstcmVhZFwiPiZjaGVjazs8L2Rpdj4nKS5hcHBlbmRUbygkKCcubWVzc2FnZTpsYXN0JykpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHdpbmRvdy5pbnNlcnRNZXNzYWdlPSBpbnNlcnRNZXNzYWdlO1xyXG4gICAgZnVuY3Rpb24gaW5zZXJ0TWVzc2FnZSgpIHtcclxuICAgICAgdmFyIG1zZyA9ICQoJy5tZXNzYWdlLWlucHV0JykudmFsKCk7XHJcbiAgICAgIGlmICgkLnRyaW0obXNnKSA9PSAnJykge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgICBpZihtc2cudHJpbSgpLnRvTG93ZXJDYXNlKCkgPT0gXCJkb25lXCIpe1xyXG4gICAgICAgICAgICAvL0lmIGN1cnJlbnQgY29uZGl0aW9uIGlzIG5vdCBwYXNzZWQsIHRoZW4gc2tpcFxyXG4gICAgICAgICAgICB2YXIgZTEgPSBwYXJzZUludChlcGlzb2RlLnNwbGl0KCcuJylbMF0pO1xyXG4gICAgICAgICAgICB2YXIgZTIgPSBwYXJzZUludChlcGlzb2RlLnNwbGl0KCcuJylbMV0pO1xyXG4gICAgICAgICAgICBjaGVja0xpc3QodGFza3NbZTFdLmNoZWNrbGlzdCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICB9XHJcbiAgICAgIGlmKG1zZy50cmltKCkudG9Mb3dlckNhc2UoKSA9PSBcInNraXBcIil7XHJcbiAgICAgICAgICAgIHZhciBlMSA9IHBhcnNlSW50KGVwaXNvZGUuc3BsaXQoJy4nKVswXSk7XHJcbiAgICAgICAgICAgIHZhciBlMiA9IHBhcnNlSW50KGVwaXNvZGUuc3BsaXQoJy4nKVsxXSk7XHJcbiAgICAgICAgICAgIGUxICs9IDE7XHJcbiAgICAgICAgICAgIGUyID0gLTE7XHJcbiAgICAgICAgICAgIGVwaXNvZGUgPSBlMStcIi5cIitlMjtcclxuICAgICAgICAgICAgbmV4dCgpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmKG1zZy50cmltKCkudG9Mb3dlckNhc2UoKSA9PSBcInNraXAgY2hlY2tcIil7XHJcbiAgICAgICAgdmFyIGUxID0gcGFyc2VJbnQoZXBpc29kZS5zcGxpdCgnLicpWzBdKTtcclxuICAgICAgICB2YXIgZTIgPSBwYXJzZUludChlcGlzb2RlLnNwbGl0KCcuJylbMV0pO1xyXG4gICAgICAgIHRhc2tzW2UxXS5jaGVja2xpc3RbZTJdW1wic2tpcHBlZFwiXSA9IHRydWU7XHJcbiAgICAgICAgbmV4dCgpO1xyXG4gICAgfVxyXG4gICAgICAkKCc8ZGl2IGNsYXNzPVwibWVzc2FnZSBtZXNzYWdlLXBlcnNvbmFsXCI+JyArIG1zZyArICc8L2Rpdj4nKS5hcHBlbmRUbygkKCcubUNTQl9jb250YWluZXInKSkuYWRkQ2xhc3MoJ25ldycpO1xyXG4gICAgICBzZXREYXRlKCk7XHJcbiAgICAgICQoJy5tZXNzYWdlLWlucHV0JykudmFsKG51bGwpO1xyXG4gICAgICB1cGRhdGVTY3JvbGxiYXIoKTtcclxuICAgIC8vICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgIC8vICAgICBmYWtlTWVzc2FnZSgpO1xyXG4gICAgLy8gICB9LCAxMDAwICsgKE1hdGgucmFuZG9tKCkgKiAyMCkgKiAxMDApO1xyXG4gICAgfVxyXG4gICAgd2luZG93Lmluc2VydE1lc3NhZ2VUZXh0ID0gaW5zZXJ0TWVzc2FnZVRleHQ7XHJcbiAgICBmdW5jdGlvbiBpbnNlcnRNZXNzYWdlVGV4dChtc2cpIHtcclxuICAgICAgICBpZiAobXNnLnRyaW0oKSA9PSAnJykge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICQoJzxkaXYgY2xhc3M9XCJtZXNzYWdlIGxvYWRpbmcgbmV3XCI+PGZpZ3VyZSBjbGFzcz1cImF2YXRhclwiPjxpbWcgc3JjPVwiaHR0cDovL2Fza2F2ZW51ZS5jb20vaW1nLzE3LmpwZ1wiIC8+PC9maWd1cmU+PHNwYW4+PC9zcGFuPjwvZGl2PicpLmFwcGVuZFRvKCQoJy5tQ1NCX2NvbnRhaW5lcicpKTtcclxuICAgICAgICB1cGRhdGVTY3JvbGxiYXIoKTtcclxuICAgIFxyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICQoJy5tZXNzYWdlLmxvYWRpbmcnKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgJCgnPGRpdiBjbGFzcz1cIm1lc3NhZ2UgbmV3XCI+PGZpZ3VyZSBjbGFzcz1cImF2YXRhclwiPjxpbWcgc3JjPVwiaHR0cDovL2Fza2F2ZW51ZS5jb20vaW1nLzE3LmpwZ1wiIC8+PC9maWd1cmU+JyArIG1zZyArICc8L2Rpdj4nKS5hcHBlbmRUbygkKCcubUNTQl9jb250YWluZXInKSkuYWRkQ2xhc3MoJ25ldycpO1xyXG4gICAgICAgICAgICBzZXREYXRlKCk7XHJcbiAgICAgICAgICAgIHVwZGF0ZVNjcm9sbGJhcigpO1xyXG4gICAgICAgIH0sIDEwMDAgKyAoTWF0aC5yYW5kb20oKSAqIDIwKSAqIDEwMCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgICQoJy5tZXNzYWdlLXN1Ym1pdCcpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICBpbnNlcnRNZXNzYWdlKCk7XHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgJCh3aW5kb3cpLm9uKCdrZXlkb3duJywgZnVuY3Rpb24oZSkge1xyXG4gICAgLy8gICBpZiAoZS53aGljaCA9PSAxMykge1xyXG4gICAgLy8gICAgIGluc2VydE1lc3NhZ2UoKTtcclxuICAgIC8vICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAvLyAgIH1cclxuICAgIH0pXHJcbiAgICBcclxuICAgIHZhciBGYWtlID0gW1xyXG4gICAgICAnSGkgdGhlcmUsIElcXCdtIEplc3NlIGFuZCB5b3U/JyxcclxuICAgICAgJ05pY2UgdG8gbWVldCB5b3UnLFxyXG4gICAgICAnSG93IGFyZSB5b3U/JyxcclxuICAgICAgJ05vdCB0b28gYmFkLCB0aGFua3MnLFxyXG4gICAgICAnV2hhdCBkbyB5b3UgZG8/JyxcclxuICAgICAgJ1RoYXRcXCdzIGF3ZXNvbWUnLFxyXG4gICAgICAnQ29kZXBlbiBpcyBhIG5pY2UgcGxhY2UgdG8gc3RheScsXHJcbiAgICAgICdJIHRoaW5rIHlvdVxcJ3JlIGEgbmljZSBwZXJzb24nLFxyXG4gICAgICAnV2h5IGRvIHlvdSB0aGluayB0aGF0PycsXHJcbiAgICAgICdDYW4geW91IGV4cGxhaW4/JyxcclxuICAgICAgJ0FueXdheSBJXFwndmUgZ290dGEgZ28gbm93JyxcclxuICAgICAgJ0l0IHdhcyBhIHBsZWFzdXJlIGNoYXQgd2l0aCB5b3UnLFxyXG4gICAgICAnVGltZSB0byBtYWtlIGEgbmV3IGNvZGVwZW4nLFxyXG4gICAgICAnQnllJyxcclxuICAgICAgJzopJ1xyXG4gICAgXVxyXG4gICAgXHJcbiAgICBmdW5jdGlvbiBmYWtlTWVzc2FnZSgpIHtcclxuICAgICAgaWYgKCQoJy5tZXNzYWdlLWlucHV0JykudmFsKCkgIT0gJycpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgJCgnPGRpdiBjbGFzcz1cIm1lc3NhZ2UgbG9hZGluZyBuZXdcIj48ZmlndXJlIGNsYXNzPVwiYXZhdGFyXCI+PGltZyBzcmM9XCJodHRwOi8vYXNrYXZlbnVlLmNvbS9pbWcvMTcuanBnXCIgLz48L2ZpZ3VyZT48c3Bhbj48L3NwYW4+PC9kaXY+JykuYXBwZW5kVG8oJCgnLm1DU0JfY29udGFpbmVyJykpO1xyXG4gICAgICB1cGRhdGVTY3JvbGxiYXIoKTtcclxuICAgIFxyXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoJy5tZXNzYWdlLmxvYWRpbmcnKS5yZW1vdmUoKTtcclxuICAgICAgICAkKCc8ZGl2IGNsYXNzPVwibWVzc2FnZSBuZXdcIj48ZmlndXJlIGNsYXNzPVwiYXZhdGFyXCI+PGltZyBzcmM9XCJodHRwOi8vYXNrYXZlbnVlLmNvbS9pbWcvMTcuanBnXCIgLz48L2ZpZ3VyZT4nICsgRmFrZVtpXSArICc8L2Rpdj4nKS5hcHBlbmRUbygkKCcubUNTQl9jb250YWluZXInKSkuYWRkQ2xhc3MoJ25ldycpO1xyXG4gICAgICAgIHNldERhdGUoKTtcclxuICAgICAgICB1cGRhdGVTY3JvbGxiYXIoKTtcclxuICAgICAgICBpKys7XHJcbiAgICAgIH0sIDEwMDAgKyAoTWF0aC5yYW5kb20oKSAqIDIwKSAqIDEwMCk7XHJcbiAgICBcclxuICAgIH1cclxuICAgIFxyXG4gICAgJCgnLmJ1dHRvbicpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgICQoJy5tZW51IC5pdGVtcyBzcGFuJykudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgJCgnLm1lbnUgLmJ1dHRvbicpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICBmdW5jdGlvbiBpbml0RWRpdG9yKCl7XHJcbiAgICAgICAgLy8gd2luZG93LmVkaXRvciA9IGFjZS5lZGl0KFwiZWRpdG9yXCIpO1xyXG4gICAgICAgIC8vIGVkaXRvci5zZXRUaGVtZShcImFjZS90aGVtZS9tb25va2FpXCIpO1xyXG4gICAgICAgIC8vIGVkaXRvci5nZXRTZXNzaW9uKCkuc2V0TW9kZShcImFjZS9tb2RlL2h0bWxcIik7XHJcbiAgICAgICAgLy8gd2luZG93LkphdmFTY3JpcHRNb2RlID0gYWNlLnJlcXVpcmUoXCJhY2UvbW9kZS9qYXZhc2NyaXB0XCIpLk1vZGU7XHJcbiAgICAgICAgLy8gd2luZG93LkhUTUxNb2RlID0gYWNlLnJlcXVpcmUoXCJhY2UvbW9kZS9odG1sXCIpLk1vZGU7XHJcbiAgICAgICAgLy8gd2luZG93LkNTU01vZGUgPSBhY2UucmVxdWlyZShcImFjZS9tb2RlL2Nzc1wiKS5Nb2RlO1xyXG4gICAgICAgIC8vIGVkaXRvci5zZXNzaW9uLnNldE1vZGUobmV3IEhUTUxNb2RlKCkpO1xyXG4gICAgXHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGluaXRFZGl0b3IoKTtcclxuICAgIFxyXG4gICAgd2luZG93LmZpbGVEYXRhID0ge1xyXG4gICAgICAgIFwibWFpbi5qYXZhXCI6IHtcclxuICAgICAgICAgICAgY29kZTogXCJcIixcclxuICAgICAgICAgICAgdHlwZTogXCJhY2UvbW9kZS9qYXZhXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiaW5kZXgudHh0XCI6IHtcclxuICAgICAgICAgICAgY29kZTogXCJcIixcclxuICAgICAgICAgICAgdHlwZTogXCJhY2UvbW9kZS90ZXh0XCJcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHdpbmRvdy5jdXJyZW50RmlsZSA9IFwibWFpbi5qYXZhXCI7XHJcbiAgICB3aW5kb3cuY2hhbmdlRmlsZSA9IGNoYW5nZUZpbGU7XHJcbiAgICBmdW5jdGlvbiBjaGFuZ2VGaWxlKGZpbGVOYW1lKXtcclxuICAgICAgICAvLyB2YXIgZmlsZU5hbWUgPSBjdXJyZW50RmlsZTtcclxuICAgICAgICBpZighZmlsZURhdGFbZmlsZU5hbWVdKXJldHVybjtcclxuICAgIFxyXG4gICAgICAgIHZhciBsYXN0Q29kZSA9IGVkaXRvci5nZXRWYWx1ZSgpO1xyXG4gICAgICAgIGZpbGVEYXRhW2N1cnJlbnRGaWxlXS5jb2RlID0gbGFzdENvZGU7XHJcbiAgICAgICAgZWRpdG9yLnNldFZhbHVlKGZpbGVEYXRhW2ZpbGVOYW1lXS5jb2RlKTtcclxuICAgICAgICBjdXJyZW50RmlsZSA9IGZpbGVOYW1lO1xyXG4gICAgICAgIGVkaXRvci5nZXRTZXNzaW9uKCkuc2V0TW9kZShmaWxlRGF0YVtmaWxlTmFtZV0udHlwZSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIFxyXG4gICAgXHJcbiAgICBcclxuICAgIGZ1bmN0aW9uIHNuYXBTaG90SW1hZ2UoKXtcclxuICAgICAgICAvLyB2YXIgYm9keSA9ICQoXCIjcmVzdWx0SWZyYW1lXCIpLmNvbnRlbnRzKCkuZmluZCgnYm9keScpWzBdO1xyXG4gICAgICAgIC8vIGlmcmFtZTJpbWFnZShkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJlc3VsdElmcmFtZVwiKSwgZnVuY3Rpb24gKGVyciwgaW1nKSB7XHJcbiAgICAgICAgLy8gICAgIC8vIElmIHRoZXJlIGlzIGFuIGVycm9yLCBsb2cgaXRcclxuICAgICAgICAvLyAgICAgaWYgKGVycikgeyByZXR1cm4gY29uc29sZS5lcnJvcihlcnIpOyB9XHJcbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKGltZyk7XHJcbiAgICAgICAgLy8gICAgICQoXCJib2R5XCIpLmFwcGVuZChpbWcpO1xyXG4gICAgICAgIC8vICAgICB2YXIgJGltZ19zcmMgPSBpbWcuc3JjO1xyXG4gICAgICAgIC8vICAgICB2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xyXG4gICAgICAgIC8vICAgICBsaW5rLmRvd25sb2FkID0gXCJpbWFnZVwiK1wiLnBuZ1wiO1xyXG4gICAgICAgIC8vICAgICBsaW5rLmhyZWYgPSAkaW1nX3NyYztcclxuICAgICAgICAvLyAgICAgbGluay50YXJnZXQgPSBcIl9ibGFua1wiO1xyXG4gICAgXHJcbiAgICAgICAgLy8gICAgIGxpbmsuY2xpY2soKTtcclxuICAgICAgICAvLyAvLyBPdGhlcndpc2UsIGFkZCB0aGUgaW1hZ2UgdG8gdGhlIGNhbnZhc1xyXG4gICAgICAgIC8vICAgICBjb250ZXh0LmRyYXdJbWFnZShpbWcsIDAsIDApO1xyXG4gICAgICAgIC8vICAgfSk7XHJcbiAgICAgICAgICB2YXIgaUh0bWwgPSAkKCcjcmVzdWx0SWZyYW1lJykuY29udGVudHMoKS5maW5kKCdib2R5Jyk7XHJcbiAgICAgICAgaHRtbDJjYW52YXMoaUh0bWwsIHtcclxuICAgICAgICAgICAgb25yZW5kZXJlZDogZnVuY3Rpb24oY2FudmFzKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhjYW52YXMpO1xyXG4gICAgICAgICAgICAgICAgLy8gdmFyIHRoZUNhbnZhcyA9IGNhbnZhcztcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY2FudmFzKTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gQ29udmVydCBhbmQgZG93bmxvYWQgYXMgaW1hZ2UgXHJcbiAgICAgICAgICAgICAgLy8gIENhbnZhczJJbWFnZS5zYXZlQXNQTkcoY2FudmFzKTsgXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHZhciBkYXRhU3RyaW5nID0gY2FudmFzLnRvRGF0YVVSTChcImltYWdlL3BuZ1wiKTtcclxuICAgICAgICAgICAgICAgIHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XHJcbiAgICAgICAgICAgICAgICBsaW5rLmRvd25sb2FkID0gXCJpbWFnZVwiK1wiLnBuZ1wiO1xyXG4gICAgICAgICAgICAgICAgbGluay5ocmVmID0gZGF0YVN0cmluZztcclxuICAgICAgICAgICAgICAgIGxpbmsudGFyZ2V0ID0gXCJfYmxhbmtcIjtcclxuICAgICAgIFxyXG4gICAgICAgICAgICAgICAgbGluay5jbGljaygpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvLyAkY29udGVudC5yZXBsYWNlV2l0aCgkY2xvbmVkKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgJChcImJvZHlcIikuYXBwZW5kKFwiPGRpdiBpZD0naW1nLW91dCc+PC9kaXY+XCIpO1xyXG4gICAgICAgICAgICAgICAgJChcIiNpbWctb3V0XCIpLmFwcGVuZChjYW52YXMpO1xyXG4gICAgICAgICAgICAgICAgLy8gQ2xlYW4gdXAgXHJcbiAgICAgICAgICAgICAgICAvL2RvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoY2FudmFzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBcclxuICAgIFxyXG4gICAgLy8gVGFza3MgXHJcbiAgICBcclxuICAgIHZhciBwcm9ncmVzcyA9IHtcclxuICAgICAgICBzdGF0dXM6IDIsXHJcbiAgICAgICAgdGFzazE6IGZhbHNlLFxyXG4gICAgICAgIHRhc2syOiBmYWxzZSxcclxuICAgICAgICB0YXNrMzogZmFsc2UsXHJcbiAgICAgICAgdGFzazQ6IGZhbHNlLFxyXG4gICAgICAgIHRhc2s1OiBmYWxzZSxcclxuICAgIH1cclxuICAgIC8vIE1haW4gdGFzayBcclxuICAgIHdpbmRvdy50YXNrcyA9IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRpdGxlOiBcIldyaXRlIGEgcHJvZ3JhbSB0byBzb3J0IGxpbmtlZCBsaXN0LiBTZWUgVGFzayBWaWV3IGZvciBkZXRhaWwuXCIsXHJcbiAgICAgICAgICAgIHRhc2tDb250ZW50OiBcIjxiciAvPjxoND5UYXNrIDE6IFdyaXRlIGEgcHJvZ3JhbSB0byBzb3J0IGxpbmtlZCBsaXN0LjwvaDQ+PGJyIC8+PHA+U2FtcGxlIGlucHV0IGlzIGdpdmVuIGluIGlucHV0LnR4dDwvcD5cIixcclxuICAgICAgICAgICAgcXVlc3Rpb25zOiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVnZXg6IGZ1bmN0aW9uKGh0bWwsIGpzLCBjc3MsIHNjc3Mpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBodG1sLmluZGV4T2YoXCIhRE9DVFlQRSBodG1sXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBxdWVzdGlvbjogXCJXaGF0IHNvcnRpbmcgYWxnb3JpdGhtIGRvZXMgSmF2YSBpbmJ1aWx0IHNvcnQgZnVuY3Rpb24gdXNlP1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJNZXJnZSBTb3J0XCIsIFwiUXVpY2sgU29ydFwiICwgXCJEb3VibGUgUGl2b3QgUXVpY2sgU29ydFwiLCBcIkluc2VydGlvbiBTb3J0XCJcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIGFuc3dlcjogXCJEb3VibGUgUGl2b3QgUXVpY2sgU29ydFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdyb25nQ2FsbGJhY2s6IGZ1bmN0aW9uKCl7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGZvbGxvd3VwOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXN0aW9uOiBcIldoYXQgaXMgdGhlIHdvcnN0IGNhc2UgdGltZSBjb21wbGV4aXR5IG9mIFF1aWNrIFNvcnRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJPKG5eMilcIiwgXCJPKG5eMylcIiAsIFwiTyhubG9nbilcIiwgXCJPKG4pXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYW5zd2VyOiBcIk8obl4yKVwiXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBjaGVja2xpc3Q6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjaGVjazogZnVuY3Rpb24oKXsgLy8gUmV0dXJuIHN0YXRlbWVudCBtaXNzaW5nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb250ZW50ID0gZmlsZURhdGFbXCJtYWluLmphdmFcIl0uY29kZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoIWNvbnRlbnQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudCA9IFwiIFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpZHggPSBjb250ZW50LmluZGV4T2YoXCI9PSBudWxsXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaWR4ID09IC0xKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0aXRsZVwiOiBcIk51bGwgY2hlY2sgZm9yIGxpbmtlZCBsaXN0IG1pc3NpbmdcIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjaGVjazogZnVuY3Rpb24oKXsgLy8gUmV0dXJuIHN0YXRlbWVudCBtaXNzaW5nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb250ZW50ID0gZmlsZURhdGFbXCJtYWluLmphdmFcIl0uY29kZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoIWNvbnRlbnQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudCA9IFwiIFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpZHggPSBjb250ZW50LmluZGV4T2YoXCJyZXR1cm5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpZHggPT0gLTEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBcInRpdGxlXCI6IFwiTm8gcmV0dXJuIHN0YXRlbWVudFwiXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGl0bGU6IFwiV3JpdGUgYSBwcm9ncmFtIHRvIGRldGVybWluZSBhIGlmIGEgbGlua2VkIGxpc3QgaXMgcGFsaW5kcm9tZS5cIixcclxuICAgICAgICAgICAgdGFza0NvbnRlbnQ6IFwiPGJyIC8+PGg0PldyaXRlIGEgcHJvZ3JhbSB0byBkZXRlcm1pbmUgYSBpZiBhIGxpbmtlZCBsaXN0IGlzIHBhbGluZHJvbWUuPC9oND48YnIgLz48cD5Zb3UgbmVlZCB0byBjcmVhdGUgdGhlIGxpbmtlZCBsaXN0IHlvdXJzZWxmLjwvcD5cIixcclxuICAgICAgICAgICAgcXVlc3Rpb25zOiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVnZXg6IGZ1bmN0aW9uKGphdmEsIHN0cmluZywgbGlua2VkX2xpc3Qpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBodG1sLmluZGV4T2YoXCIuZXF1YWxzXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBxdWVzdGlvbjogXCJIb3cgZG9lcyBKYXZhIGludGVybmFsbHkgY29tcGFyZSB0d28gb2JqZWN0cyBhcmUgZXF1YWw/XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIk1lbW9yeSBhbGxvY2F0aW9uIGlzIHNhbWVcIiwgXCJWYWx1ZSBpcyBzYW1lXCIgLCBcIlZhcmlhYmxlIG5hbWUgaXMgc2FtZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBhbnN3ZXI6IFwiTWVtb3J5IGFsbG9jYXRpb24gaXMgc2FtZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZvbGxvd3VwOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXN0aW9uOiBcIkhvdyBpcyBtZW1vcnkgYWxsb2NhdGVkIGluIGxpbmtlZCBsaXN0IFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkR5bmFtaWMgaW4gaGVhcFwiLCBcIlN0YXRpYyBpbiBoZWFwXCIgLCBcIlN0YXRpYyBpbiBzdGFja1wiLCBcIkR5bmFtaWMgaW4gc3RhY2tcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbnN3ZXI6IFwiRHluYW1pYyBpbiBoZWFwXCJcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIGNoZWNrbGlzdDogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrOiBmdW5jdGlvbigpeyAvLyBtYWluIG1ldGhvZCBpcyBtaXNzaW5nIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY29udGVudCA9IGZpbGVEYXRhW1wibWFpbi5qYXZhXCJdLmNvZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCFjb250ZW50KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQgPSBcIiBcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgY29udGVudCA9IGNvbnRlbnRbMV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlkeCA9IGNvbnRlbnQuaW5kZXhPZihcImZpbmRQYWxpbmRyb21lKClcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpZHggPT0gLTEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0aXRsZVwiOiBcIk5vIGlucHV0IGl0ZW1zLlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrOiBmdW5jdGlvbigpeyAvLyBSZXR1cm4gc3RhdGVtZW50IG1pc3NpbmdcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvbnRlbnQgPSBmaWxlRGF0YVtcIm1haW4uamF2YVwiXS5jb2RlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZighY29udGVudCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50ID0gXCIgXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlkeCA9IGNvbnRlbnQuaW5kZXhPZihcInJldHVyblwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlkeCA9PSAtMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIFwidGl0bGVcIjogXCJObyByZXR1cm4gc3RhdGVtZW50XCJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgIFxyXG4gICAgICAgIC8vIHtcclxuICAgICAgICAvLyAgICAgdGl0bGU6IFwiR3JlYXQuIEFkZCB0d28gYnV0dG9ucyBPbmUgdG8gYWRkIGEgY2FyZCBhbmQgb25lIHRvIGRlbGV0ZSwga2VlcCB0aGUgY29udGVudCBzYW1lIGFzIHRoZSBsYXN0IGNhcmQgaW4geW91ciBncmlkLiBcXG4gQWRkIGJ1dHRvbiBpZCBzaG91bGQgYmUgYWRkLWJ0biBcXG4gRGVsZXRlIGJ1dHRvbiBpZCBzaG91bGQgYmUgJ2RlbGV0ZS1idG4nXCIsXHJcbiAgICAgICAgLy8gfSxcclxuICAgIF1cclxuICAgIFxyXG4gICAgXHJcbiAgICB3aW5kb3cubmF2SXRlbUNsaWNrID0gbmF2SXRlbUNsaWNrIDtcclxuICAgIGZ1bmN0aW9uIG5hdkl0ZW1DbGljayhpZCwgY29uX2lkKXtcclxuICAgICAgICAkKFwiLm5hdi1pdGVtXCIpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgICQoXCIjXCIraWQpLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xyXG4gICAgXHJcbiAgICAgICAgJChcIi5zZWNcIikuYWRkQ2xhc3MoXCJoaWRkZW5cIik7XHJcbiAgICAgICAgJChcIiNcIitjb25faWQpLnJlbW92ZUNsYXNzKFwiaGlkZGVuXCIpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBcclxuICAgIH0iLCIvLyB3aW5kb3cudnVlQXBwID0gbmV3IFZ1ZSh7XHJcbi8vICAgICBlbDogJyN2dWUtYXBwJyxcclxuLy8gICAgIGRhdGE6IHtcclxuLy8gICAgICAgICBtZXNzYWdlOiAnSGVsbG8gdXNlciEnLFxyXG4vLyAgICAgICAgIG5vbmVTZWxlY3RlZDogdHJ1ZSxcclxuLy8gICAgICAgICBzZWxlY3RlZFN0YXRlOiBcIlwiLFxyXG4vLyAgICAgICAgIHBsYXllckRldGFpbDoge1xyXG4vLyAgICAgICAgICAgICBuYW1lOiBcIjxQbGF5ZXIgTmFtZT5cIlxyXG4vLyAgICAgICAgIH0sXHJcbi8vICAgICAgICAgb3ZlcnZpZXdGaWx0ZXJzOiB7fSxcclxuLy8gICAgICAgICBzZWxlY3RlZE1hcDogMVxyXG4vLyAgICAgfSxcclxuLy8gICAgIG1vdW50ZWQ6IGZ1bmN0aW9uKCl7XHJcbi8vICAgICAgICAgbG9hZEQzKCk7XHJcbi8vICAgICB9XHJcbi8vIH0pOyJdfQ==
