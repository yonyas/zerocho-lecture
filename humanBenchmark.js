var 스크린 = document.querySelector('#screen');
var 시작시간; // scope문제로 위에서 선언
var 끝시간;

스크린.addEventListener("click", function() {
  if (스크린.classList.contains('waiting')) { // 대기 상태 (aqua)
    //contains는 현재 클래스 파악
    스크린.classList.remove('waiting');
    스크린.classList.add('ready');
    //스크린.style.backgroundColor = 'red' 도 가능하지만 class가 여러개 한번에 적용, 좋음
    스크린.textContent = '초록색이 되면 클릭하세요.';
    setTimeout(function() {
      시작시간 = new Date();
      스크린.click();
    }, Math.floor(Math.random() * 1000) + 2000);  // 2000 ~ 3000사이의 수
    // ^ 화면이 red로 전환되고 그 후에 실행됨.

  } else if (스크린.classList.contains('ready')) { // 준비 상태 (red)
    스크린.classList.remove('ready');
    스크린.classList.add('now');
    스크린.textContent = '클릭하세요!';

  } else if (스크린.classList.contains('now')) { // 시작 상태 (greenyellow)
    끝시간 = new Date();
    console.log('반응속도', 끝시간 - 시작시간, 'ms', 끝시간, 시작시간);
    스크린.classList.remove('now');
    스크린.classList.add('waiting');
    스크린.textContent = '클릭해서 시작하세요';
  }
});
