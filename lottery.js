let random = [];
let winNumbers = [];
let bonusNumbers = [];
const winNumber = document.getElementById('winNumber');
const bonusNumber = document.getElementById('bonusNumber');
const guess = document.querySelector('#guess');
const another = document.querySelector('#another');
const guessInput1 = document.querySelector('#guessInput1');
const guessInput2 = document.querySelector('#guessInput2');
const guessInput3 = document.querySelector('#guessInput3');
const guessInput4 = document.querySelector('#guessInput4');
const guessInput5 = document.querySelector('#guessInput5');
const guessInput6 = document.querySelector('#guessInput6');
const inputBox = document.querySelectorAll('.inputBox');
const result = document.querySelector('#result');
let guessNum = [];
let hitNum = 0;
let hitBonusNum = 0;
let stopflag = false;

//랜덤배열 뽑기
// winNumbers & bonusNumbers 변수 세팅됨
var candidate = Array(45).fill().map(function (value, i) {
    return i + 1;
});
while (candidate.length > 39) {
    let temp = candidate.splice(candidate[Math.floor(Math.random() * candidate.length)], 1)[0];
    random.push(temp);

}
for (let i = 0; i < 5; i++) {
    winNumbers.push(random[i]);
};
bonusNumbers = random[5];
winNumbers = winNumbers.sort(function (p, c) {
    return p - c;
});


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
}

setTimeout(function () {
    ballDisplay(winNumbers[0], winNumber);
}, 100);

setTimeout(function () {
    ballDisplay(winNumbers[1], winNumber);
}, 200);

setTimeout(function () {
    ballDisplay(winNumbers[2], winNumber);
}, 300);

setTimeout(function () {
    ballDisplay(winNumbers[3], winNumber);
}, 400);

setTimeout(function () {
    ballDisplay(winNumbers[4], winNumber);
}, 500);

setTimeout(function () {
    ballDisplay(bonusNumbers, bonusNumber);
}, 600);

guess.addEventListener('submit', function (e) {
    e.preventDefault();
    if (stopflag) {
        return;
    }
    guessNum.push(Number(guessInput1.value));
    guessNum.push(Number(guessInput2.value));
    guessNum.push(Number(guessInput3.value));
    guessNum.push(Number(guessInput4.value));
    guessNum.push(Number(guessInput5.value));
    guessNum.push(Number(guessInput6.value));
    guessNum = guessNum.map(String);
    console.log("guessNum" + guessNum); // 입력값

    // guessNum = guessNum.split('');
    //타입을 스트링으로 지정 안해주니까 split코드가 안됨. 
    //split은 string to array니까 string 으로 먼저 지정을 해줘야 하는듯.
    //guessNum은 ["1", "2", "3"] 인데 반해 winNumbers는 [1,2,3] 임. 전자배열(array literal)이 낫다고 함. 후자를 바꿔보자
    winNumbers = winNumbers.map(String);

    //입력값 가져와서 맞힌 개수 세기
    for (var i = 0; i < 5; i++) {
        for (var j = 0; j < 6; j++) {
            if (winNumbers[i] === guessNum[j]) {
                hitNum++;
                console.log("hit" + hitNum);
            }
        }
    }
    for (var i = 0; i < 6; i++) {
        if (String(bonusNumbers) === guessNum[i]) {
            hitBonusNum++;
            console.log("Bonus" + hitBonusNum);
        }
    }

    if (hitBonusNum > 0) {
        hitBonusGuide = "맞췄습니다."
    } else {
        hitBonusGuide = "틀렸습니다."
    }
    result.textContent = hitNum + "개의 숫자를 맞췄습니다." + " 보너스 숫자는 " + hitBonusGuide;
    stopflag = true;
});

another.addEventListener('submit', function (e) {
    e.preventDefault();
    for (var i = 0; i < 6; i++) {
        inputBox[i].value = '';
    }
    guessNum = [];
});

//TODO:  랜덤에 중복숫자 뜨는것 해결  / 탭 기능 추가 
