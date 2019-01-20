var mode = "code"; //code\question
var episode = "0.-1";

var answerCallback = function(){
    //Start initial test
    $(".mCSB_container").html("");
    next();
};
var taskIndex = -1;

function next(){
    $(".mCSB_container").html("");
    var e1 = parseInt(episode.split('.')[0]);
    var e2 = parseInt(episode.split('.')[1]);
    var taskCount = tasks.length;
    if(mode == "code"){
        var checkCount = tasks[e1];
        if(e2 == checkCount){
            e1 += 1;
            e2 = 0;
        }
        else{
            e2 += 1;
        }
    }
    if(mode == "question"){
        var questionCount = tasks[e1];
        if(e2 == questionCount){
            e1 += 1;
            e2 = 0;
        }
        else{
            e2 += 1;
        }
    }
    episode = e1+"."+e2;
    if (e1 == taskCount){
        $(".mCSB_container").html("");
        insertMessageText("Thanks! You have succesfully completed the test.");
    }
    if(mode == "code"){
        insertMessageText(tasks[e1].title);
        if (tasks[e1].taskContent){
            $("#task-content").html(tasks[e1].taskContent);
        }
        else{
            $("#task-content").html(tasks[e1].title);
        }
        insertMessageText("You can say 'Done' when you are done, or 'Skip' to skip the problem.");
    }
    else if(mode == "question"){
        // insertMessageText(tasks[e1].title);
        if(e2 == tasks[e1].questions.length){
            mode = "code";
            e1 += 1;
            e2 += -1;
            episode = e1+"."+e2;
            next();
            return;
        }
        askQuestion(tasks[e1].questions[e2]);

    }

}

function initChatbot(){
    insertMessageText("Hi, I am Iris, I will be your Adaptive Interviewing Assistant");
    setTimeout(function(){
        askQuestion({
            question: "I hope you are having a good day. Shall we start the interview?",
            options: ["Sure"],
            answer: "Sure"
        })
    }, 2000);
}

function askQuestion(questionObj){
    if (questionObj.question.trim() == '') {
        return false;
    }
    $(".mCSB_container").html("");
    $('<div class="message loading new"><figure class="avatar"><img src="http://askavenue.com/img/17.jpg" /></figure><span></span></div>').appendTo($('.mCSB_container'));
    updateScrollbar();

    setTimeout(function() {
        $('.message.loading').remove();
        var $elem = $('<div class="message new"><figure class="avatar"><img src="http://askavenue.com/img/17.jpg" /></figure>' + questionObj.question + '</div>');
        
        $elem.appendTo($('.mCSB_container')).addClass('new');
        setDate();
        updateScrollbar();
        answerSelected = function(answer) {
            if(answer == questionObj.answer){
                if(questionObj.followup){
                    askQuestion(questionObj.followup);
                }
                else{
                    next();
                }
            }
        }
        addOptions(questionObj);
    }, 1000 + (Math.random() * 20) * 100);

    
}

function addOptions(questionObj){
    for(const option of questionObj.options){
        var $elem = $("<button class='btn btn-primary msg_option'>"+option+"</button>");
        $elem.appendTo($('.mCSB_container')).addClass('new');
        $elem.click(function(){
            answerSelected($(this).text());
        });
    }
}

function nextTask(){
    insertMessageText("I hope you are having a good day. Shall we start the interview?");
}

function answerSelected(option){
    answerCallback(option);
}


function checkList(checklist){
    for(const checkObj of checklist){
        if(!checkObj.check()){
            $(".mCSB_container").html("");
            insertMessageText(checkObj.title);
            return;
        }
        if(checkObj["skipped"]){
            continue;
        }
    }
    var e1 = parseInt(episode.split('.')[0]);
    var e2 = parseInt(episode.split('.')[1]);
    e2 = -1;
    episode = e1+"."+e2;
    mode = "question";
    next();
}