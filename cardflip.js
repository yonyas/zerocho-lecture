const 가로 = 3;
const 세로 = 4;
let 색깔 = [];
let 이동값 = [];
let 클릭카드 = [];
let 완성카드 = [];
let stopFlag = true; //트루일때만 클릭 가능하게
const 색깔후보 = ['red', 'red', 'orange', 'orange', 'yellow', 'yellow', 'green', 'green', 'pink', 'pink', 'purple', 'purple']
let startTime = [];
let endTime;

function 셔플() {
    while (색깔후보.length > 0) {
        이동값 = 색깔후보.splice(Math.floor(Math.random() * 색깔후보.length), 1)[0];
        색깔.push(이동값);
    }
}

function 카드세팅(가로, 세로) {
    stopFlag = false;
    for (let i = 0; i < 가로 * 세로; i++) { // 0 ~ 11 개의 카드 세팅
        const card = document.createElement('div');
        card.classList.add('card')
        const cardInner = document.createElement('div');
        cardInner.classList.add('card-inner')
        const cardFront = document.createElement('div');
        cardFront.classList.add('card-front')
        const cardBack = document.createElement('div');
        cardBack.classList.add('card-back')
        cardBack.style.backgroundColor = 색깔[i];
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);

        //카드 맞추기 
        (function (c) {
            card.addEventListener('click', function () {
                if (stopFlag && !완성카드.includes(c)) {
                    c.classList.toggle('flipped');
                    클릭카드.push(c);

                    let startTemp = Date.now();
                    startTime.push(startTemp);

                    //두번 클릭했을 때 
                    if (클릭카드.length === 2) {
                        //같은 색깔이면
                        if (클릭카드[0].querySelector('.card-back').style.backgroundColor === 클릭카드[1].querySelector('.card-back').style.backgroundColor) {
                            완성카드.push(클릭카드[0]);
                            완성카드.push(클릭카드[1]);
                            클릭카드 = [];

                            //다 눌렀을 때 초기화
                            if (완성카드.length === 12) {
                                endTime = Date.now();
                                console.log(endTime);
                                console.log(startTime);
                                console.log(endTime - startTime[0]);
                                startTime = [];
                                endTime = [];
                                완성카드 = [];
                                document.querySelector('#wrapper').innerHTML = '';
                                셔플();
                                카드세팅(가로, 세로);
                            }
                            //다른 색깔이면
                        } else {
                            stopFlag = false;
                            setTimeout(function () {
                                클릭카드[0].classList.remove('flipped');
                                클릭카드[1].classList.remove('flipped');
                                클릭카드 = [];
                                stopFlag = true;
                            }, 1000);
                        }
                    }
                }
            });
        })(card);
        document.querySelector('#wrapper').appendChild(card);
    };

    //외울시간 주기
    document.querySelectorAll('.card').forEach(function (card, i) {
        setTimeout(function () {
            card.classList.add('flipped');
        }, 500 + 50 * i)
    });
    document.querySelectorAll('.card').forEach(function (card, i) {
        setTimeout(function () {
            card.classList.remove('flipped');
            stopFlag = true;
        }, 3000)
    });
}

셔플();
카드세팅(가로, 세로);
