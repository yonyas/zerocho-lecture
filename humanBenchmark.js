var 스크린 = document.querySelector('#screen');

var 시작시간 = new Date();

스크린.addEventListener("click", function() {
  var 끝시간 = new Date();
  console.log((끝시간 - 시작시간) / 1000);
  if (스크린.classList.contains('waiting')) {
    //contains는 현재 클래스 파악
    스크린.classList.remove('waiting');
    스크린.classList.add('ready');
    //스크린.style.backgroundColor = 'red' 도 가능하지만 class가 여러개 한번에 적용, 좋음
    스크린.textContent = '초록색이 되면 클릭하세요.';
  } else if (스크린.classList.contains('ready')) {
    스크린.classList.remove('ready');
    스크린.classList.add('now');
    스크린.textContent = '클릭하세요!';
  } else if (스크린.classList.contains('now')) {
    스크린.classList.remove('now');
    스크린.classList.add('waiting');
    스크린.textContent = '클릭해서 시작하세요';
  }
});
