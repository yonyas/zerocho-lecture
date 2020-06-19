var 가로 = 4;
var 세로 = 3;
var 색깔들 = ['red', 'red', 'orange', 'orange', 'yellow', 'yellow', 'green', 'green', 'white', 'white', 'pink', 'pink'];
var 색깔후보 = 색깔들.slice();  // 참조관계 끊기 //백업, 초기화를 위해
var 색깔 = [];
var 클릭카드 = [];
var 완성카드 = [];
var 시작시간;
var 클릭플래그 = true; //true일때만 클릭 가능하게
function 셔플 () {
  for (var i = 0; 색깔후보.length > 0; i += 1) {  //색깔후보에서 하나씩 뺼 때 색깔들도 바뀜,,참조관계 문
    색깔 = 색깔.concat(색깔후보.splice(Math.floor(Math.random() * 색깔후보.length), 1));
  }
}

function 카드세팅(가로, 세로) {
  클릭플래그 = false;
  for (var i = 0; i < 가로 * 세로; i += 1) {
    var card = document.createElement('div');
    card.className = 'card';
    var cardInner = document.createElement('div');  //이건 html
    cardInner.className = 'card-inner';             //이건 css
    var cardFront = document.createElement('div');
    cardFront.className = 'card-front';
    var cardBack = document.createElement('div');
    cardBack.className = 'card-back';
    cardBack.style.backgroundColor = 색깔[i];

    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);

    //즉시실행함수로 감싸서 클로저 문제 해결하기.  card를 함수 안으로 넣기
    (function (c) {
      card.addEventListener('click', function() {
        if (클릭플래그 && !완성카드.includes(c)) {
          c.classList.toggle('flipped');
          클릭카드.push(c);
          if (클릭카드.length ===2) {
            // console.log(클릭카드[0].querySelector('.card-back'), 클릭카드[0].querySelector('.card-back').style.backgroundColor);
            // console.log(클릭카드[1].querySelector('.card-back'), 클릭카드[1].querySelector('.card-back').style.backgroundColor);
            if (클릭카드[0].querySelector('.card-back').style.backgroundColor === 클릭카드[1].querySelector('.card-back').style.backgroundColor) {
              완성카드.push(클릭카드[0]);
              완성카드.push(클릭카드[1]);
              클릭카드 = [];
              if (완성카드.length === 12) {
                var 끝시간 = new Date();
                alert('축하합니다! 성공!' + (끝시간 - 시작시간) / 1000 + '초 걸렸습니다.');
                document.querySelector('#wrapper').innerHTML = ''; // 내부태그 다 지우기 (낱개 지우기는 나중에)
                색깔후보 = 색깔들.slice();
                색깔 = [];
                완성카드 = [];
                시작시간 = null;
                셔플();
                카드세팅(가로, 세로);
              }
            } else { // 두개 색이 다르면
              클릭플래그 = false;
              setTimeout(function() {
                클릭카드[0].classList.remove('flipped');
                클릭카드[1].classList.remove('flipped');
                클릭플래그 = true;
                클릭카드 = [];
              }, 1000);
            }
            // 클릭카드 = [];  //초기화하려고 했는데 여기에 쓰면 비동기보다 먼저 실행되니까 안됨 > 클릭카드[0]이 부존재
          }
        }
      });
    })(card);
    document.querySelector('#wrapper').appendChild(card);
  }

  document.querySelectorAll('.card').forEach(function (card, index) {
    setTimeout(function() {
      card.classList.add('flipped');
    }, 1000 + 100 * index  );
  });

  setTimeout(function() {
    document.querySelectorAll('.card').forEach(function (card, index) {
     card.classList.remove('flipped');
   });
   클릭플래그 = true;  //5초 뒤 세팅 끝났을 때
   시작시간 = new Date();  //호출스택과 스코프 때문에 위로 따로 뻄
  }, 5000);   // setTimeout의 괄호 끝에서 ms 넣어야함. 헷갈리지 말기
};

셔플();
카드세팅(가로, 세로);
