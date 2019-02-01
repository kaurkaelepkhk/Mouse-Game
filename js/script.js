const circle = document.querySelector('#circle');
const ring = document.querySelector('.ringring');
const score = document.querySelector('#score');
const introtext = document.getElementById('introtext');
const freeroam = document.querySelector('#freeroam');
const reaction = document.querySelector('#reaction');
const timer = document.querySelector('#timer');
let scoreCount = 0;

/*
FREEROAM GAMEMODE - how many points you can get, no timer will be set, the player can play as long as he wants, he can set the speed of the circle
REACTION GAMEMODE - how fast can you flick to the circle and click it. A reaction timer will be shown on every circle click and an average reaction time will be drawn
TIMER GAMEMODE - how many points can you get in a given timeframe (the player could set the timer amount)
*/


// Some mathsss

// Calculate the size of the circle

function calculateSize() {
    const randomSize = Math.floor(Math.random() * 75) + 10;
    return randomSize;
};

// Calculate X and Y axis of the circle

function calculatePos() {
    const randomPosX = Math.floor((Math.random() * 100));
    const randomPosY = Math.floor((Math.random() * 100));
    return [randomPosX, randomPosY];
};

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
};

/************ FREEROAM GAMEMODE START *************/


function freeroamStart() {
    introtext.innerHTML = 'You are about to start the FREEROAM gamemode. You have unlimited time and will be able to select the speed of the circle and if the circle moves on a timer or on a click. <br> <select id="speedSelect"> <option value="500" id="500">0.5 sec</option> <option value="750" id="750">0.75 sec</option> <option value="1000" id="1000">1 sec</option> <option value="1250" id="1250"> 1.25 sec</option> <option value="1500" id="1500"> 1.5 sec</option> <option value="1750" id="1750"> 1.75 sec</option> <option value="2000" id="2000"> 2 sec</option></select> <select name="manualorauto" id="manualorauto"><option value="1">Timer</option><option value="2">On click</option></select><br> <button id="startFreeroam">START</button>';
};

// On FREEROAM gamemode button click
freeroam.addEventListener("click", function () {

    // Give info, choices and start button
    freeroamStart();

    // START button
    const start = document.getElementById('startFreeroam');

    // On START click do these
    start.addEventListener("click", function () {

        // Get user choices
        const speedSelect = document.getElementById("speedSelect");
        const speedValue = speedSelect.options[speedSelect.selectedIndex].value;
        const timingSelect = document.getElementById('manualorauto');
        const manualorauto = timingSelect.options[timingSelect.selectedIndex].value

        // Timer or Manual positioning choice by user
        if (manualorauto == 1) {
            circleFunc(speedValue);
        } else {
            circleElems();
            circle.addEventListener("click", circleElems);
        }

        // Remove intro text
        introtext.innerText = '';
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
    introtext.innerHTML = 'You are about to start the REACTION gamemode. In 30 seconds, click as fast as you can, in the end, your average reaction time will be drawn. <br> <button id="startReaction">START</button>';
};

// When clicking the gamemode REACTION button

reaction.addEventListener("click", function () {

    // Initiate intro text
    reactionStart();


    // Get START button ID
    const startSpeed = document.getElementById('startReaction');

    // Start this when START button is pressed
    startSpeed.addEventListener("click", function () {
        // Remove intro text
        introtext.innerHTML = '';

        // Get the circle for the reaction gamemode

        reactionCircle();

        // Initiate circle function with predetermined timeout value

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

            if (reactionArr.length == 15) {
                introtext.innerHTML = 'Game over. Your average reaction time is: ' + reactionTime;
                circle.remove();
            }
        });

        // prevent multiple clicks


        // add to score

        const addScore = function () {
            const addScoreCalc = calculateSize();
            if (addScoreCalc < 15) {
                scoreCount += 75;
            } else if (addScoreCalc < 30) {
                scoreCount += 50;
            } else if (addScoreCalc < 50) {
                scoreCount += 20;
            } else if (addScoreCalc < 65) {
                scoreCount += 10;
            } else {
                scoreCount += 5;
            }
            score.innerHTML = scoreCount;
            console.log('Added:' + addScoreCalc);
        };


        circle.addEventListener("click", addScore);
    })
});


/************ SPEED GAMEMODE END *************/

/************ TIMER GAMEMODE START *************/

function speedStart() {
    introtext.innerHTML = 'You are about to start the TIMER gamemode. You have 60 seconds to get as many points as you can. <br> <button id="startTimer">START</button>';
};

timer.addEventListener("click", function timer() {
    let sec = 30;
    let timer = setInterval(function () {
        document.getElementById('safeTimerDisplay').innerHTML = '00:' + sec;
        sec--;
        if (sec < 0) {
            clearInterval(timer);
        }
    }, 1000);
});

