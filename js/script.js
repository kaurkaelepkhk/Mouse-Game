const circle = document.querySelector('#circle');
const ring = document.querySelector('.ringring');
const score = document.querySelector('#score');
let scoreCount = 0;
let clickCount = 0;


// Calculate the size of the circle

function calculateSize() {
    const randomSize = Math.floor(Math.random() * 75) + 10;
    return randomSize;
};

// Calculate X and Y axis of the circle

function calculatePos() {
    const randomPosX = Math.floor((Math.random() * 700));
    const randomPosY = Math.floor((Math.random() * 700));
    return [randomPosX, randomPosY];
};

// circle function


function circleFunc() {
    setInterval(function () {
        const randomS = calculateSize();
        console.log(randomS);
        const randomPosX = calculatePos()[0];
        const randomPosY = calculatePos()[1];
        let posX = circle.style.left = randomPosX + 'px';
        let posY = circle.style.top = randomPosY + 'px';
        let sW = circle.style.width = randomS + 'px';
        let sH = circle.style.height = randomS + 'px';
        ring.style.left = posX;
        ring.style.top = posY;
        ring.style.width = sW;
        ring.style.height = sH;
    }, 1000);
}

// prevent multiple clicks


// add to score - GAMEMODE -REACTION-

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
    clickCount++;
};


circle.addEventListener("click", addScore);

circleFunc();
