var playing = false
var score
var timeremaining = 60
var correctAnswer = 0

// Background music

window.onload = setInterval(Gameloop, 1000 / 10); //10fps

let myAudio = new Audio();

myAudio.src = 'no-story-70330.mp3';

function Gameloop() {
    myAudio.play();
    if (myAudio.paused == true) {
        myAudio.play();
    }
}

// To store the output of setInterval() method
var action

// Step 1: Click on the start/reset button
document.getElementById("startreset").onclick = function () {
    //1. if we are playing - reload page
    if(playing == true) {
        location.reload()
    }else {
        //2. if we are not playing -

        // changing playing to be true
        playing = true

        //      a) show countdown box
        showElement("timeremaining")
        document.getElementById("timeremainingvalue").innerHTML = timeremaining

        //      b) reduce time by 1 sec in loops
        startCountdown()
        //      c) set score to 0
        score = 0
        document.getElementById("scorevalue").innerHTML = score
        
        // Ḥiding the Game Over box from previous games
        hideElement("gameover")
        //      change button to reset
        document.getElementById("startreset").innerHTML = "Reset Game"
        //      generate new question
        generateQA()
    }
}

//3. Click on the answer box -
for(i=1; i<5; i++) {
    document.getElementById("box"+i).onclick = function() {
        //   check if we are playing
        if(playing == true){
            //      1. correct -
            if(this.innerHTML == correctAnswer){
                //  a) increase score by 1 and dislay the updated score
                score++
                document.getElementById("scorevalue").innerHTML = score
                //  b) show correct button for 2 sec and hide the wrong button
                hideElement("wrong")
                showElement("correct")
                setTimeout(function(){
                    hideElement("correct")
                },2000)
                //  c) generate new Question
                generateQA()
            }
            // 2. Wrong -
            else{ 
               //  a) show wrong button for 2 sec and hide the correct button
               hideElement("correct")
               showElement("wrong")
               setTimeout(function(){
                   hideElement("wrong")
               },2000) 
            }
        }
    }
}







// To start the countdown
function startCountdown() {
    action = setInterval(() => {
        timeremaining-=1
        if(timeremaining == 0) {
            stopCountdown()
            document.getElementById("gameover").innerHTML = "<p> Game Over!</p> <p> Your Score is " + score + ".</p>"
            showElement("gameover")
            hideElement("timeremaining")
            hideElement("correct")
            hideElement("wrong")
            playing = false
            document.getElementById("startreset").innerHTML = "Start Game"
            timeremaining = 60
        }
        document.getElementById("timeremainingvalue").innerHTML = timeremaining 
    }, 1000); 
}

// To stop the countdown
function stopCountdown() {
    clearInterval(action)
}

// To hide the elements
function hideElement(Id) {
    document.getElementById(Id).style.display = "none"
}

// To show the elements
function showElement(Id) {
    document.getElementById(Id).style.display = "block"
}

// To generate Question and answers
function generateQA() {
    var question
    var operators = ["+","X","-"]
    var x = Math.floor(Math.random()*9) + 1
    var y = Math.floor(Math.random()*9) + 1
    
    question = x + "X" +  y
    correctAnswer = x * y

    // filling the question in the question box
    document.getElementById("question").innerHTML = question
    // filling the boxes with choices
    var correctPosition = Math.round(Math.random() * 3) + 1
    document.getElementById("box"+correctPosition).innerHTML = correctAnswer
    // array to store the generated answers and to avoid replicating values in choices
    var store = []
    store[correctPosition] = correctAnswer

    for(i=1;i<5;i++){
        if(i != correctPosition) {
            var wrongAnswer = 0
            do {
                    wrongAnswer = (Math.floor(Math.random()*9) + 1) * (Math.floor(Math.random()*9) + 1)
            }while(store.includes(wrongAnswer) == true)
            
            document.getElementById("box"+i).innerHTML = wrongAnswer
            store[i] = wrongAnswer
        }
    }

}