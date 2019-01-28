const circle = document.querySelector('#circle');
let scoreCount = 0;


setInterval(function() {
    const randomPosX = Math.floor((Math.random() * 100));
    const randomPosY = Math.floor((Math.random() * 100));
    const randomSize = Math.floor(Math.random() * 75) + 10;
    circle.style.left = randomPosX + 'px';
    circle.style.top = randomPosY + 'px';
    circle.style.width = randomSize + 'px';
    circle.style.height = randomSize + 'px';
}, 1000);

circle.addEventListener("click", function() {
    scoreCount++;
    document.querySelector('#score').innerHTML = scoreCount;
});
