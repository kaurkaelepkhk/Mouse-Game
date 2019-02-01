const circle = document.querySelector('#circle');
const ring = document.querySelector('.ringring');
const score = document.querySelector('#score');
const introtext = document.getElementById('introtext');
const freeroam = document.querySelector('#freeroam');
const reaction = document.querySelector('#reaction');
const timer = document.querySelector('#timer');
const timerDisplay = document.getElementById('TimeDisplay');
let scoreCount = 0;

/*
FREEROAM GAMEMODE - how many points you can get, no timer will be set, the player can play as long as he wants, he can set the speed of the circle and the mode of the circle
REACTION GAMEMODE - how fast can you flick to the circle and click it. A reaction timer will be shown on every circle click and an average reaction time will be drawn
TIMER GAMEMODE - how many points can you get in a given timeframe (the player could set the timer amount)
*/


// Some mathsss

// Calculate the size of the circle

function calculateSize() {
    const randomSize = Math.floor(Math.random() * 75) + 10;
    return randomSize;
}

// Calculate X and Y axis of the circle

function calculatePos() {
    const randomPosX = Math.floor((Math.random() * 100));
    const randomPosY = Math.floor((Math.random() * 100));
    return [randomPosX, randomPosY];
}

// Circle function positioning and sizing

function circleElems() {
    const randomSize = calculateSize();
    const randomPosX = calculatePos()[0];
    const randomPosY = calculatePos()[1];
    let posX = circle.style.left = randomPosX + 'px';
    let posY = circle.style.top = randomPosY + 'px';
    let sW = circle.style.width = randomSize + 'px';
    let sH = circle.style.height = randomSize + 'px';
    ring.style.left = posX;
    ring.style.top = posY;
    ring.style.width = sW;
    ring.style.height = sH;
}

// Circle function

function circleFunc(timeout) {
    setInterval(function () {
        circleElems();
    }, timeout);
}

// Display circle

function displayCircle(e) {
    if (circle.style.display == 'block') {
        circle.style.display = 'none';
    } else {
        circle.style.display = 'block'
    }
}

/************ FREEROAM GAMEMODE START *************/


function freeroamStart() {
    introtext.innerHTML = 'You are about to start the FREEROAM gamemode. You have unlimited time and will be able to select the speed of the circle and if the circle moves on a timer or on a click. <br> <select id="speedSelect"> <option value="500" id="500">0.5 sec</option> <option value="750" id="750">0.75 sec</option> <option value="1000" id="1000">1 sec</option> <option value="1250" id="1250"> 1.25 sec</option> <option value="1500" id="1500"> 1.5 sec</option> <option value="1750" id="1750"> 1.75 sec</option> <option value="2000" id="2000"> 2 sec</option></select> <select name="manualorauto" id="manualorauto"><option value="1">Timer</option><option value="2">On click</option></select><br> <button id="startFreeroam">START</button>';
}

// On FREEROAM gamemode button click
freeroam.addEventListener("click", function () {

    // Give info, choices and start button
    freeroamStart();

    // START button
    const start = document.getElementById('startFreeroam');

    // On START click do these
    start.addEventListener("click", function () {

        // Display circle
        displayCircle();

        // Get user choices
        const speedSelect = document.getElementById("speedSelect");
        const speedValue = speedSelect.options[speedSelect.selectedIndex].value;
        const timingSelect = document.getElementById('manualorauto');
        const manualorauto = timingSelect.options[timingSelect.selectedIndex].value;

        // Timer or Manual positioning choice by user
        if (manualorauto == 1) {
            circleFunc(speedValue);
        } else {
            circleElems();
            circle.addEventListener("click", circleElems);
        }

        // Remove intro text
        introtext.innerText = '';

        // add to score

        function addScore() {
            scoreCount++;
            score.innerHTML = scoreCount;
        };


        circle.addEventListener("click", addScore);
    });
});


/************ FREEROAM GAMEMODE END *************/

/************ REACTION GAMEMODE START *************/

function reactionCircle() {
    circleElems();
    createdTime = Date.now();
}

// Set intro text

function reactionStart() {
    introtext.innerHTML = 'You are about to start the REACTION gamemode, which will test your cursor precision and mouse tracking skills. In 30 successful clicks, your average reaction time will be drawn. <br> <button id="startReaction">START</button>';
}

// When clicking the gamemode REACTION button

reaction.addEventListener("click", function () {

    // Initiate intro text
    reactionStart();


    // Get START button ID
    const startSpeed = document.getElementById('startReaction');

    // Start this when START button is pressed
    startSpeed.addEventListener("click", function () {

        // Display circle
        displayCircle();

        // Remove intro text
        introtext.innerHTML = '';

        // Get the circle for the reaction gamemode

        reactionCircle();

        // Set the reaction time array
        reactionArr = [];

        // On circle click
        circle.addEventListener("click", function () {
            // Calculate average
            clickedTime = Date.now();
            reactionTime = (clickedTime - createdTime) / 1000;
            reactionArr.push(reactionTime);
            if (reactionArr.length) {
                let sum = reactionArr.reduce(function (a, b) {
                    return a + b;
                });
                let avg = sum / reactionArr.length;
                console.log('reactionTime: ' + reactionTime);
                console.log('average: ' + avg);
            }
            introtext.innerHTML = 'Last reaction speed:' + reactionTime;
            clickedTime = 0;
            createdTime = 0;
            reactionCircle();

            if (reactionArr.length == 30) {
                introtext.innerHTML = 'Game over. Your average reaction time is: ' + reactionTime;

                // Hide circle
                displayCircle();
            }
        });

        // prevent multiple clicks


    })
});


/************ SPEED GAMEMODE END *************/

/************ TIMER GAMEMODE START *************/

function timerStart() {
    introtext.innerHTML = 'You are about to start the TIMER gamemode. You have 30 seconds to get as many points as you can. <br> <button id="startTimer">START</button>';
}

timer.addEventListener("click", function timer() {

    // Intro text
    timerStart();

    const startTimer = document.getElementById('startTimer');

    startTimer.addEventListener("click", function () {

        // Display circle
        displayCircle();

        // Set introtext to empty
        introtext.innerHTML = '';

        // Listen for clicks overall
        clickCount = 0;

        document.addEventListener("click", function() {
            clickCount++;
        });


        // Start the countdown
        let sec = 5;
        let timer = setInterval(function () {
            timerDisplay.innerHTML = sec;
            sec--;

            // If the countdown is over
            if (sec < 0) {
                clearInterval(timer);
                timerDisplay.innerHTML = 'Game over, you clicked on the circle ' + scoreCount + ' times <br> You missed ' + (clickCount-scoreCount) + ' times';
                // Hide circle
                displayCircle();
            }
        }, 1000);

        // Call the circle function

        circleFunc(450);

        // add to score

        function addScore() {
            scoreCount++;
            score.innerHTML = scoreCount;
        };

        circle.addEventListener("click", addScore);
    });
});
