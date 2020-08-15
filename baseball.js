const body = document.body;
const guide = document.createElement('div');
const form = document.createElement('form');
const input = document.createElement('input');
input.type = 'number';
input.maxLength = 4; //안먹힘 
const btn = document.createElement('button');
const result = document.createElement('result');
let randomIndex;
let randomNumber = [];
let inputValue;
let ball = 0;
let strike = 0;
let wrongTimes = 0;

body.append(guide, form, result);
form.append(input, btn);
guide.textContent = '4개 숫자를 맞춰보세요';
btn.textContent = 'Enter';

function 숫자뽑기() {
    //10개 배열 생성
    let array = Array(10).fill().map(function (value, i) {
        return i;
    })
    //shuffle
    while (array.length > 6) {
        randomIndex = Math.floor(Math.random() * array.length);
        randomNumber += array.splice(randomIndex, 1);
    };
    //randomNumber (string > array) 변경  > 변경하니까 숫자비교가 안됨 
    // randomNumber = randomNumber.split('');
}
숫자뽑기();
console.log('randomNumber', randomNumber);

//input 받아서 맞춘 변수 불러오기
form.addEventListener('submit', function (e) {
    e.preventDefault();
    inputValue = input.value;
    console.log('inputValue', inputValue)

    //비교하기
    if (inputValue === randomNumber) {
        console.log('good');
        input.value = '';
        randomNumber = '';
        숫자뽑기();
        wrongTimes = 0;
        console.log('randomNumber', randomNumber);
    } else {
        if (wrongTimes > 9) {
            result.textContent = '10times over !';
            wrongTimes = 0;
            strike = 0;
            ball = 0;
            input.value = '';
            input.focus();
            숫자뽑기();
            btn.textContent = 'Start again'
            console.log(randomNumber);
        } else {
            wrongTimes++;
            for (var i = 0; i < 4; i++) {
                //스트라이크
                if (randomNumber[i] === inputValue[i]) {
                    console.log('same');
                    strike++;
                }
                //ball
                else if (String(randomNumber[i]).indexOf(inputValue[i]) > -1) {
                    console.log('di');
                    ball++;
                }

                // for (var j = 0; j < 4; j++) {
                //     if (randomNumber[i] === inputValue[j] && i === j) {
                //         strike++;
                //         // wrongTimes++;
                //         console.log("WT", wrongTimes);
                //     } else if (randomNumber[i] === inputValue[j]) {
                //         ball++;
                //         // wrongTimes++;
                //         console.log("WT", wrongTimes);

                //     }
                result.textContent = "strike " + strike + "개 입니다. " + 'ball은 ' + ball + '개 입니다';
            }
        }
    }

    console.log(strike, 'ball', ball);


    strike = 0;
    ball = 0;
    input.value = '';
    input.focus();
});