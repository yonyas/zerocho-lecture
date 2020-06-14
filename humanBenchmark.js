var 스크린 = document.querySelector('#screen');
var 시작시간; // scope문제로 위에서 선언
// var 시작시간 = undefined  생략된 것과 같다.
var 끝시간;
var 기록 = [];
var 타임아웃;

스크린.addEventListener("click", function() {
  if (스크린.classList.contains('waiting')) { // 대기 상태 (aqua)
    //contains는 현재 클래스 파악
    스크린.classList.remove('waiting');
    스크린.classList.add('ready');
    //스크린.style.backgroundColor = 'red' 도 가능하지만 class가 여러개 한번에 적용, 좋음
    스크린.textContent = '초록색이 되면 클릭하세요.';
    var 타임아웃 = setTimeout(function() {
      시작시간 = new Date();
      스크린.click();
    }, Math.floor(Math.random() * 1000) + 2000);  // 2000 ~ 3000사이의 수
    // ^ 화면이 red로 전환되고 그 후에 실행됨.

  } else if (스크린.classList.contains('ready')) { // 준비 상태 (red)
    //부정 클릭, 색변하기 전에 클릭했을 경우 취소하기
    if (!시작시간) {  // 시작시간이 없을때 누르면 부정클릭
      // !는 true > false, false > true 바꿈
      // false : undefined, 0 NaN, null, flase, '' 6개
      clearTimeout(타임아웃);
      스크린.classList.remove('ready');
      스크린.classList.add('waiting');
      스크린.textContent = '너무 성급하시군요';
    } else {
      스크린.classList.remove('ready');
      스크린.classList.add('now');
      스크린.textContent = '클릭하세요!';
    }

  } else if (스크린.classList.contains('now')) { // 시작 상태 (greenyellow)
    끝시간 = new Date();
    console.log('반응속도', 끝시간 - 시작시간, 'ms', 끝시간, 시작시간);
    기록.push(끝시간 - 시작시간);
    시작시간 = null;  // 전 게임 초기화
    끝시간 = null;
    스크린.classList.remove('now');
    스크린.classList.add('waiting');
    스크린.textContent = '클릭해서 시작하세요';
  }
});
