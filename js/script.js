const circle = document.querySelector('#circle');
const ring = document.querySelector('.ringring');
let scoreCount = 0;


setInterval(function() {
    const randomPosX = Math.floor((Math.random() * 100));
    const randomPosY = Math.floor((Math.random() * 100));
    const randomSize = Math.floor(Math.random() * 75) + 10;
    let posX = circle.style.left = randomPosX + 'px';
    let posY = circle.style.top = randomPosY + 'px';
    let sW = circle.style.width = randomSize + 'px';
    let sH = circle.style.height = randomSize + 'px';
    ring.style.left = posX;
    ring.style.top = posY;
    ring.style.width = sW;
    ring.style.height = sH;
}, 1000);

circle.addEventListener("click", function() {
    scoreCount++;
    document.querySelector('#score').innerHTML = scoreCount;
});
