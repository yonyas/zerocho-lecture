const screen = document.querySelector('#screen');
const guide = document.querySelector('#guide');
const result = document.querySelector('#result');
const startGame = document.querySelector('#startGame');
let startTime = 0;
let endTime = 0;
let 기록 = [];
let timeOut;
let stopflag = 0;
let count = 0;
let newGame = false;

screen.classList.remove('waiting');
screen.classList.remove('toClick');
screen.classList.add('result');


screen.textContent = '시작하려면 클릭';


screen.addEventListener('click', function () {
    if (screen.classList.contains('waiting')) { // 빨 > 초록화면 toClick (저절로 넘어감)
        //부정클릭 막기 
        if (stopflag !== 1) { // 0이면 클릭안됨 
            clearTimeout(timeOut);
            console.log('block');
            screen.textContent = '기다렸다가 누르세요';
            screen.classList.remove('waiting');
            screen.classList.add('result');
            // stopflag = 1;

        } else {
            screen.classList.remove('waiting');
            screen.classList.add('toClick');
            screen.textContent = '클릭!!!!!!';
            stopflag = 0;
            count++;

        }

    } else if (screen.classList.contains('toClick')) { // 초 > 파랑화면 result
        screen.classList.remove('toClick');
        screen.classList.add('result');
        stopflag = 0;

        //끝시간 체크
        endTime = new Date();
        console.log('elapsed time', endTime - startTime)
        screen.textContent = (endTime - startTime + "초 걸렸습니다. 다시");
        기록.push(endTime - startTime);
        if (count > 2) {
            console.log('5times already')
            기록.sort(function (p, c) {
                return p - c
            })
            result.textContent = "기록 순서대로 " + 기록;
            newGame = true;
        }

    } else if (screen.classList.contains('result')) { // 파 > 빨강화면 waiting
        if (newGame) {
            return;
        }
        screen.classList.remove('result');
        screen.classList.add('waiting');
        screen.textContent = '초록색이 되면 클릭하세요.';
        stopflag = 0; //클릭가능 

        let randomSecond = (Math.random() * 2000) + 1000;

        //빨강화면 넘어간 후 랜덤시간 후 클릭 (>> 초록색)
        timeOut = setTimeout(function () {
            //시작시간 체크
            startTime = new Date();
            stopflag = 1; //클릭가능 
            screen.click();
        }, randomSecond);
    }
});

startGame.addEventListener('click', function () {
    newGame = false;
})
