var 바디 = document.body;
var 테이블 = document.createElement('table');
var 줄들 = [];
var 칸들 = [];
var 턴 = 'O';
var 결과 = document.createElement('div');

// 세칸 다 차면 true를 리턴
function checkResult(몇줄, 몇칸) {
    // 세칸 다 채워졌나?
    var 다참 = false;
    // 가로줄 검사
    if (
        칸들[몇줄][0].textContent === 턴 &&
        칸들[몇줄][1].textContent === 턴 &&
        칸들[몇줄][2].textContent === 턴
    ) {
        다참 = true;
    }
    // 세로줄 검사
    if (
        칸들[0][몇칸].textContent === 턴 &&
        칸들[1][몇칸].textContent === 턴 &&
        칸들[2][몇칸].textContent === 턴
    ) {
        다참 = true;
    }
    // 대각선 검사
    if (
        칸들[0][0].textContent === 턴 &&
        칸들[1][1].textContent === 턴 &&
        칸들[2][2].textContent === 턴
    ) {
        다참 = true;
    }
    if (
        칸들[0][2].textContent === 턴 &&
        칸들[1][1].textContent === 턴 &&
        칸들[2][0].textContent === 턴
    ) {
        다참 = true;
    }
    return 다참;
}

// 클릭할 때 
var 비동기콜백 = function (이벤트) {
    턴 = "O";
    var 몇줄 = 줄들.indexOf(이벤트.target.parentNode);
    var 몇칸 = 칸들[몇줄].indexOf(이벤트.target);
    console.log(몇줄, 몇칸, 이벤트.target.parentNode);

    if (칸들[몇줄][몇칸].textContent !== '') { // 칸이 이미 채워져 있는가?
        console.log('빈 칸아닙니다.');
    } else { // 빈 칸이면
        console.log('빈 칸입니다');
        칸들[몇줄][몇칸].textContent = 턴;

        //무승부일때 : 빈칸이 없는 경우
        var 후보칸 = [];
        칸들.forEach(function (줄) {
            줄.forEach(function (칸) {
                후보칸.push(칸);
            });
        });
        후보칸 = 후보칸.filter(function (빈칸) {
            return !빈칸.textContent
        })

        //승리여부 체크
        var 승리여부 = checkResult(몇줄, 몇칸); // 세칸 다 차면 true를 리턴
        if (승리여부) {
            결과.textContent = 턴 + ' 님의 승리입니다';
            init();
        } else if (후보칸.length === 0) { // 무승부 
            결과.textContent = '무승부';
            init();
        } else {
            if (턴 === 'O') {
                턴 = 'X';
            }
        }

        //컴퓨터 시작
        setTimeout(function () {
            var 선택칸 = 후보칸[Math.floor(Math.random() * 후보칸.length)];
            선택칸.textContent = "X";

            //몇줄 몇칸 재정의 (컴퓨터의 값)
            var 몇줄 = 줄들.indexOf(선택칸.parentNode);
            var 몇칸 = 칸들[몇줄].indexOf(선택칸);
            var 승리여부 = checkResult(몇줄, 몇칸);

            if (승리여부) {
                결과.textContent = 턴 + ' 님의 승리입니다';
                init();
            }

            턴 = "O";
        }, 100);
    }
}

// 무승부 or 승리 결판 날 때 초기화
function init() {
    console.log('초기화');
    setTimeout(function () {
        결과.textContent = '';
        칸들.forEach(function (줄) {
            줄.forEach(function (칸) {
                칸.textContent = '';
            })
        });
        턴 = 'X';
    }, 1000);
}


//모양 만들기 
for (var i = 1; i <= 3; i += 1) {
    var 줄 = document.createElement('tr');
    줄들.push(줄);
    칸들.push([]);
    for (var j = 1; j <= 3; j += 1) {
        var 칸 = document.createElement('td');
        칸.addEventListener('click', 비동기콜백);
        칸들[i - 1].push(칸);
        줄.appendChild(칸);
    }
    테이블.appendChild(줄);
}
바디.appendChild(테이블);
바디.appendChild(결과);
