let word = document.querySelector("#word");
let result = document.querySelector('#result');
const btn = document.querySelector('#btn');
let input = document.querySelector("#input");
const start = document.querySelector('#start');
const again = document.querySelector('#again');
const words = ['시작단어', '도레미', '리어카', '원숭이', '조랑말', '도장', '물장구'];
const timeStamp = document.querySelector('#timeStamp');
let startStamp;
let endTime;
let stopflag = false;
let countClicks = 0;

//시작버튼: 누르면 단어 제시되고 게임 시작
start.addEventListener('click', function () {
    if (stopflag) {
        start.disabled;
    } else {
        result.textContent = '';
        input.value = '';
        timeStamp.textContent = '';

        let startWord = words[Math.floor(Math.random() * words.length)];
        word.textContent = startWord;
        startStamp = Number(Date.now());
    }

})

//다시 버튼
again.addEventListener('click', function () {
    result.textContent = '';
    input.value = '';
    timeStamp.textContent = '';
    stopflag = false;
    word.textContent = '';

})

//btn 누르면 word의 끝과 내가 입력한 값의 첫값을 비교한다.
//입력버튼
btn.addEventListener('click', function (startTime) {
    if (stopflag) {
        start.disabled;
    } else {
        //초기화
        result.textContent = '';
        //word의 끝, input의 시작 불러오기  
        let endWord = word.textContent[word.textContent.length - 1];
        let firstWord = input.value[0];

        if (endWord === firstWord) {
            //같으면 인풋값을 word에 넣는다.
            word.textContent = input.value;
            countClicks++;
        } else {
            result.textContent = "게임오버"
            endTime = Date.now();
            timeStamp.textContent = (endTime - startStamp) / 100 + '초에 ' + countClicks + '개'
            stopflag = true;
            // if (stopflag) {
            //     start.disabled;
            // }
        }
        input.value = '';
    }
});



//TODO:  몇개 맞췄나 개수 세기, 