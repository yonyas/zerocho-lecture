//스코프 배웠으니까 함수끼리 변수명 같은것도 쓸것
var 가로 = 4;
var 세로 = 3;
var 색깔후보 = ['red', 'red', 'orange', 'orange', 'yellow', 'yellow', 'green', 'green', 'white', 'white', 'pink', 'pink'];
var 색깔 = [];
var 클릭카드 = [];
var 클릭플래그 = true; //true일때만 클릭 가능하게

for (var i = 0; 색깔후보.length > 0; i += 1) {
  색깔 = 색깔.concat(색깔후보.splice(Math.floor(Math.random() * 색깔후보.length), 1));
}
console.log(색깔);

function 카드세팅(가로, 세로) {
  클릭플래그 = false;
  for (var i = 0; i < 가로 * 세로; i += 1) {
    var card = document.createElement('div');
    // card.classList.add('card')
    // card.className.add('card')   //하나만 추가할 때, 그냥 class만 하면 안됨
    card.className = 'card';
    var cardInner = document.createElement('div');
    cardInner.className = 'card-inner';
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
        if (클릭플래그) {
          c.classList.toggle('flipped');
          클릭카드.push(c);
          if (클릭카드.length ===2) {
            // console.log(클릭카드[0].querySelector('.card-back'), 클릭카드[0].querySelector('.card-back').style.backgroundColor);
            // console.log(클릭카드[1].querySelector('.card-back'), 클릭카드[1].querySelector('.card-back').style.backgroundColor);
            if (클릭카드[0].querySelector('.card-back').style.backgroundColor === 클릭카드[1].querySelector('.card-back').style.backgroundColor) {
              클릭카드 = [];
            } else { // 두개 색이 다르면
              클릭플래그 = false;
              setTimeout(function() {
                클릭카드[0].classList.remove('flipped');
                클릭카드[1].classList.remove('flipped');
                클릭플래그 = true;
                클릭카드 = [];
              }, 1000);
            }
            // 클릭카드 = [];  //초기화하려고 했는데 이렇게하면 비동기보다 먼저 실행 > 클릭카드[0]이 없음
          }
        }
      });
    })(card);
    document.body.appendChild(card);
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
  }, 5000);
};

카드세팅(가로, 세로);
