function loadJava(){



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
    //            $('#resultIframe').contents().find('html').html("<style>"+fileData["main.css"].code+"</style>"+fileData["index.html"].code);
                     
    //    document.getElementById('resultIframe').contentWindow.eval( fileData["main.js"].code );
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
        "main.java": {
            code: "",
            type: "ace/mode/java"
        },
        "index.txt": {
            code: "",
            type: "ace/mode/text"
        }
    }
    
    window.currentFile = "main.java";
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
            title: "Write a program to sort linked list. See Task View for detail.",
            taskContent: "<br /><h4>Task 1: Write a program to sort linked list.</h4><br /><p>Sample input is given in input.txt</p>",
            questions: [
                {
                    regex: function(html, js, css, scss){
                        html.indexOf("!DOCTYPE html")
                    },
                    question: "What sorting algorithm does Java inbuilt sort function use?",
                    options: [
                        "Merge Sort", "Quick Sort" , "Double Pivot Quick Sort", "Insertion Sort"
                    ],
                    answer: "Double Pivot Quick Sort",
                    wrongCallback: function(){
    
                    },
                    followup: {
                        question: "What is the worst case time complexity of Quick Sort",
                        options: [
                            "O(n^2)", "O(n^3)" , "O(nlogn)", "O(n)"
                        ],
                        answer: "O(n^2)"
                    }
                }
            ],
            checklist: [
                {
                    check: function(){ // Return statement missing
                        var content = fileData["main.java"].code;
                        if(!content){
                            content = " ";
                        }
                        var idx = content.indexOf("== null");
                        if (idx == -1){
                            return false;
                        }
                        return true;
    
                    },
                    "title": "Null check for linked list missing"
                },
                {
                    check: function(){ // Return statement missing
                        var content = fileData["main.java"].code;
                        if(!content){
                            content = " ";
                        }
                        var idx = content.indexOf("return");
                        if (idx == -1){
                            return false;
                        }
                        return true;
    
                    },
                    "title": "No return statement"
                }
            ]
        },
        {
            title: "Write a program to determine a if a linked list is palindrome.",
            taskContent: "<br /><h4>Write a program to determine a if a linked list is palindrome.</h4><br /><p>You need to create the linked list yourself.</p>",
            questions: [
                {
                    regex: function(java, string, linked_list){
                        html.indexOf(".equals")
                    },
                    question: "How does Java internally compare two objects are equal?",
                    options: [
                        "Memory allocation is same", "Value is same" , "Variable name is same"
                    ],
                    answer: "Memory allocation is same",
                    followup: {
                        question: "How is memory allocated in linked list ",
                        options: [
                            "Dynamic in heap", "Static in heap" , "Static in stack", "Dynamic in stack"
                        ],
                        answer: "Dynamic in heap"
                    }
                }
            ],
            checklist: [
                {
                    check: function(){ // main method is missing 
                        var content = fileData["main.java"].code;
                        if(!content){
                            content = " ";
                        }
                        // else{
                        //     content = content[1];
                        // }
                        var idx = content.indexOf("findPalindrome()");
                        if (idx == -1){
                            return false;
                        }
                        return true;
                    },
                    "title": "No input items."
                },
                {
                    check: function(){ // Return statement missing
                        var content = fileData["main.java"].code;
                        if(!content){
                            content = " ";
                        }
                       
                        var idx = content.indexOf("return");
                        if (idx == -1){
                            return false;
                        }
                        return true;
    
                    },
                    "title": "No return statement"
                }
            ]
        },
      
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