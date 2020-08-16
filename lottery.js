let random = [];
let winNumbers = [];
let bonusNumbers = [];
const winNumber = document.getElementById('winNumber');
// const result = document.getElementById('result');
// const bonus = document.getElementById('bonus');
const bonusNumber = document.getElementById('bonusNumber');

const candidate = Array(45).fill().map(function (value, i) {
    return i + 1;
});

[1, 2, 3, 4, 5, 6].forEach(function () {
    random.push(candidate[Math.floor(Math.random() * candidate.length)]);
});

for (let i = 0; i < 5; i++) {
    winNumbers.push(random[i]);
};
bonusNumbers = random[5];

winNumbers = winNumbers.sort(function (p, c) {
    return p - c;
});

// winNumbers & bonusNumbers 변수 세팅됨

function ballDisplay(numbers, col) {
    var ball = document.createElement('div');
    ball.textContent = numbers;
    ball.style.display = 'inline-block';
    ball.style.marginRight = '10px';
    ball.style.border = '1px solid black';
    ball.style.borderRadius = '50%';
    ball.style.width = '30px';
    ball.style.height = '30px';
    ball.style.textAlign = 'center';

    if (numbers <= 10) {
        ball.style.backgroundColor = 'yellow';
    } else if (numbers <= 20) {
        ball.style.backgroundColor = 'blue';
    } else if (numbers <= 30) {
        ball.style.backgroundColor = 'red';
    } else {
        ball.style.backgroundColor = 'green';
    }

    col.append(ball);

    //제로초 코드가 더 나은듯 
    //     var 배경색;
    //   if (숫자 <= 10) {
    //     배경색 = 'red';
    //   } else if (숫자 <= 20) {
    //     배경색 = 'orange';
    //   } else if (숫자 <= 30) {
    //     배경색 = 'yellow';
    //   } else if (숫자 <= 40) {
    //     배경색 = 'blue';
    //   } else {
    //     배경색 = 'green';
    //   }

    //   공.style.background = 배경색;
    //   결과창.appendChild(공);
    // }
}

setTimeout(function () {
    ballDisplay(winNumbers[0], winNumber);
}, 1000);

setTimeout(function () {
    ballDisplay(winNumbers[1], winNumber);
}, 2000);

setTimeout(function () {
    ballDisplay(winNumbers[2], winNumber);
}, 3000);

setTimeout(function () {
    ballDisplay(winNumbers[3], winNumber);
}, 4000);

setTimeout(function () {
    ballDisplay(winNumbers[4], winNumber);
}, 5000);

setTimeout(function () {
    ballDisplay(bonusNumbers, bonusNumber);
}, 6000);