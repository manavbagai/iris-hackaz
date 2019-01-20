function loadWeb(){



$(document).ready(function(){
    //to make each section resizable

$("#htmlSec").resizable({
    handles: 'e, w'
  });
  
//   $("#cssSec").resizable({
//     handles: 'e, w'
//   })
  
//   $("#jsSec").resizable({
//     handles:'e, w'
//   })
  
  $("#resultSec").resizable({
    handle: 'e,w'
  })
  
  //makes the buttons toggable to hide and unhide each section
  
//   $("#htmlButton").click(function(){
//       $("#htmlSec").toggle(1000);
//   });
  
//   $("#cssButton").click(function(){
//       $("#cssSec").toggle(1000);
  
//   });
  
//   $("#jsButton").click(function() {
//       $("#jsSec").toggle(1000);
//   });
  
  $("#resultsButton").click(function(){
      $("#resultSec").toggle(1000);
  });
  
  $("#run").click(function(){
    fileData[currentFile].code = editor.getValue();
           $('#resultIframe').contents().find('html').html("<style>"+fileData["main.css"].code+"</style>"+fileData["index.html"].code);
                 
   document.getElementById('resultIframe').contentWindow.eval( fileData["main.js"].code );
   });
   
   
});







var $messages = $('.messages-content'),
    d, h, m,
    i = 0;

$(window).load(function() {
  $messages.mCustomScrollbar();
  setTimeout(function() {
    // fakeMessage();
    initChatbot();
  }, 100);
});

window.updateScrollbar  = updateScrollbar ;
function updateScrollbar() {
  $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
    scrollInertia: 10,
    timeout: 0
  });
}
window.setDate = setDate;
function setDate(){
  d = new Date()
  if (m != d.getMinutes()) {
    m = d.getMinutes();
    $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
    $('<div class="checkmark-sent-delivered">&check;</div>').appendTo($('.message:last'));
    $('<div class="checkmark-read">&check;</div>').appendTo($('.message:last'));
  }
}

window.insertMessage= insertMessage;
function insertMessage() {
  var msg = $('.message-input').val();
  if ($.trim(msg) == '') {
    return false;
  }
  if(msg.trim().toLowerCase() == "done"){
        //If current condition is not passed, then skip
        var e1 = parseInt(episode.split('.')[0]);
        var e2 = parseInt(episode.split('.')[1]);
        checkList(tasks[e1].checklist);
        
  }
  if(msg.trim().toLowerCase() == "skip"){
        var e1 = parseInt(episode.split('.')[0]);
        var e2 = parseInt(episode.split('.')[1]);
        e1 += 1;
        e2 = -1;
        episode = e1+"."+e2;
        next();
  }
  if(msg.trim().toLowerCase() == "skip check"){
    var e1 = parseInt(episode.split('.')[0]);
    var e2 = parseInt(episode.split('.')[1]);
    tasks[e1].checklist[e2]["skipped"] = true;
    next();
}
  $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
  setDate();
  $('.message-input').val(null);
  updateScrollbar();
//   setTimeout(function() {
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

    setTimeout(function() {
        $('.message.loading').remove();
        $('<div class="message new"><figure class="avatar"><img src="http://askavenue.com/img/17.jpg" /></figure>' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
        setDate();
        updateScrollbar();
    }, 1000 + (Math.random() * 20) * 100);
}

$('.message-submit').click(function() {
  insertMessage();
});

$(window).on('keydown', function(e) {
//   if (e.which == 13) {
//     insertMessage();
//     return false;
//   }
})

var Fake = [
  'Hi there, I\'m Jesse and you?',
  'Nice to meet you',
  'How are you?',
  'Not too bad, thanks',
  'What do you do?',
  'That\'s awesome',
  'Codepen is a nice place to stay',
  'I think you\'re a nice person',
  'Why do you think that?',
  'Can you explain?',
  'Anyway I\'ve gotta go now',
  'It was a pleasure chat with you',
  'Time to make a new codepen',
  'Bye',
  ':)'
]

function fakeMessage() {
  if ($('.message-input').val() != '') {
    return false;
  }
  $('<div class="message loading new"><figure class="avatar"><img src="http://askavenue.com/img/17.jpg" /></figure><span></span></div>').appendTo($('.mCSB_container'));
  updateScrollbar();

  setTimeout(function() {
    $('.message.loading').remove();
    $('<div class="message new"><figure class="avatar"><img src="http://askavenue.com/img/17.jpg" /></figure>' + Fake[i] + '</div>').appendTo($('.mCSB_container')).addClass('new');
    setDate();
    updateScrollbar();
    i++;
  }, 1000 + (Math.random() * 20) * 100);

}

$('.button').click(function(){
  $('.menu .items span').toggleClass('active');
   $('.menu .button').toggleClass('active');
});

function initEditor(){
    // window.editor = ace.edit("editor");
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
}

window.currentFile = "index.html";
window.changeFile = changeFile;
function changeFile(fileName){
    // var fileName = currentFile;
    if(!fileData[fileName])return;

    var lastCode = editor.getValue();
    fileData[currentFile].code = lastCode;
    editor.setValue(fileData[fileName].code);
    currentFile = fileName;
    editor.getSession().setMode(fileData[fileName].type);
}




function snapShotImage(){
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
        onrendered: function(canvas) {
            console.log(canvas);
            // var theCanvas = canvas;
            document.body.appendChild(canvas);

            // Convert and download as image 
          //  Canvas2Image.saveAsPNG(canvas); 
            
            var dataString = canvas.toDataURL("image/png");
            var link = document.createElement("a");
            link.download = "image"+".png";
            link.href = dataString;
            link.target = "_blank";
   
            link.click();
            
            // $content.replaceWith($cloned);
            
            $("body").append("<div id='img-out'></div>");
            $("#img-out").append(canvas);
            // Clean up 
            //document.body.removeChild(canvas);
        }
    });
}



// Tasks 

var progress = {
    status: 2,
    task1: false,
    task2: false,
    task3: false,
    task4: false,
    task5: false,
}
// Main task 
window.tasks = [
    {
        title: "In this task, you need to create a simple HTML form, as shown in on your Task tab. Please check 'Task' tab for image. You will be evaluated based on how closely your output matches the required, and your code quality.",
        taskContent: "<br /><h4>Task 1: Create a HTML login form as shown below.</h4><br /><img src='img/task1_web.png'/>",
        questions: [
            {
                regex: function(html, js, css, scss){
                    html.indexOf("!DOCTYPE html")
                },
                question: "What HTML version does this correspond to ? : <!DOCTYPE html>",
                options: [
                    "HTML5 Transactional", "HTML4" , "HTML5", "HTML 1.0"
                ],
                answer: "HTML5",
                wrongCallback: function(){

                },
                followup: {
                    question: "What is the latest HTML version?",
                    options: [
                        "HTML6", "HTML3" , "HTML5", "HTML7"
                    ],
                    answer: "HTML5"
                }
            }
        ],
        checklist: [
            {
                check: function(){
                    // var htmlContent = $("input", $(fileData["index.html"].code));
                    if (fileData["index.html"].code.indexOf("<input") == -1){
                        return false;
                    }
                    return true;
                },
                "title": "No input items.",
                skipped: false
            },
            {
                check: function(){
                    // var label = $("input", $(fileData["index.html"].code)).parent().find("label");
                    if(fileData["index.html"].code.indexOf("<label") == -1){
                        return false;
                    }
                    return true;

                },
                "title": "No labels for inputs",
                skipped: false
            },
            {
                check: function(){
                    // var htmlContent = $("font", $(fileData["index.html"].code));
                    if (fileData["index.html"].code.indexOf("<font") != -1){
                        return false;
                    }
                    return true;

                },
                "title": "Deprecated HTML elements",
                skipped: false
            }
        ]
    },
    {
        title: "You need to create a card grid as shown in 'Tasks' tab. The grid needs to be responsive, optimized for mobile and web. \n You need to define a json array 'items', which needs to be used to populate the grid. \n Parent html element contaning list elements should have id 'list-elements'",
        taskContent: "<br /><h4>Task 2: Create a HTML Grid as shown below.</h4><br /><img src='img/task2_web.PNG'/>",
        checklist: [
            {
                check: function(){
                    if (fileData["main.js"].code.indexOf(" items") == -1){
                        return false;
                    }
                    return true;
                },
                "title": "'items' array do not exist."
            }
        ],
        questions: []
    },
    {
        condition: "main.scss is empty.",
        check: function(){
            if(fileData["main.scss"].trim().length == 0){
                return true;
            }
            return false;
        },
        title: "It seems that you have used CSS. I was wondering, if you know about CSS Precompilers like LESS or SCSS",
        checklist: [
            {
                check: function(){
                    var htmlContent = fileData["main.scss"].code.length;
                    if (htmlContent.length == 0){
                        return false;
                    }
                    return true;
                },
                "title": "SCSS is still empty"
            }
            
        ],
        questions: [
            {
                "regex": "@extend",
                "question": "Can we have multiple inheritence in SCSS?",
                "options": ["Yes", "No"],
                "answer": "Yes"
            }
        ]
    }
    // {
    //     title: "Great. Add two buttons One to add a card and one to delete, keep the content same as the last card in your grid. \n Add button id should be add-btn \n Delete button id should be 'delete-btn'",
    // },
]


window.navItemClick = navItemClick ;
function navItemClick(id, con_id){
    $(".nav-item").removeClass("active");
    $("#"+id).addClass("active");

    $(".sec").addClass("hidden");
    $("#"+con_id).removeClass("hidden");
}


}