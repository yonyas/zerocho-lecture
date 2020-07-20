var 상대 = {
    영웅: document.getElementById('rival-hero'),
    덱: document.getElementById('rival-deck'),
    필드: document.getElementById('rival-cards'),
    코스트: document.getElementById('rival-cost'),
    덱data: [],
    영웅data: [],
    필드data: [],
    선택카드: null,
    선택카드data: null,
};

var 나 = {
    영웅: document.getElementById('my-hero'),
    덱: document.getElementById('my-deck'),
    필드: document.getElementById('my-cards'),
    코스트: document.getElementById('my-cost'),
    덱data: [],
    영웅data: [],
    필드data: [],
    선택카드: null,
    선택카드data: null,
};


var 턴버튼 = document.getElementById('turn-btn');
var 턴 = true; // true면 내턴, false면 니턴

function 덱에서필드로(데이터, 내턴) { //코스트가 남을 경우 가상데이터에 클릭한 데이터 넣고 옮기기
    //^ 여기는 데이터가 스코프에 없어서 카드돔연결(데이터)에서 가져와야 하기 때문에 인자 넣어줌
    var 객체 = 내턴 ? 나 : 상대;
    //^ 삼항연산자(if 대체 가능) 조건 ? 참 : 거짓
    var 현재코스트 = Number(객체.코스트.textContent); //textContet는 정수 
    if (현재코스트 < 데이터.cost) {
        return 'end'; // 현재코스트가 작으면 'end' 리턴 
    } //리턴문 리팩토링하는 경우 어떤함수를 return하는지 알아야 함.
    var idx = 객체.덱data.indexOf(데이터);
    객체.덱data.splice(idx, 1);
    객체.필드data.push(데이터);
    객체.덱.innerHTML = '';
    객체.필드.innerHTML = '';
    객체.필드data.forEach(function (data) {
        카드돔연결(data, 객체.필드);
    })
    객체.덱data.forEach(function (data) {
        카드돔연결(data, 객체.덱);
    });
    데이터.field = true;
    //^ 참조관계 활용해서 원하는 데이터 쉽게 변경 가능. 굳이 안 찾아도.
    //필드와 영웅의 field를 true로 함으로써 덱과 구분
    객체.코스트.textContent = 현재코스트 - 데이터.cost;
}

function 필드다시그리기(객체) {
    객체.필드.innerHTML = '';
    객체.필드data.forEach(function (data) {
        카드돔연결(data, 객체.필드);
    })
}

function 덱다시그리기(객체) {
    객체.덱.innerHTML = '';
    객체.덱data.forEach(function (data) {
        카드돔연결(data, 객체.덱);
    });
}

function 영웅다시그리기(객체) {
    객체.영웅.innerHTML = '';
    카드돔연결(객체.영웅data, 객체.영웅, true);
}

function 화면다시그리기(내화면) {
    var 객체 = 내화면 ? 나 : 상대; // 조건 ? 참 : 거짓;
    필드다시그리기(객체);
    덱다시그리기(객체);
    영웅다시그리기(객체);
}

function 턴액션수행(카드, 데이터, 내가) {
    // 스코프 체인 때문에 카드, 데이터 넣어줘야 함
    var 아군 = 내가 ? 나 : 상대;
    var 적군 = 내가 ? 상대 : 나;

    // 턴이 끝난 카드가 아니면 공격
    if (카드.classList.contains('card-turnover')) {
        return;
    }
    // 상대카드면 && 내카드가 선택된 상태면

    var 적군카드 = 내가 ? !데이터.mine : 데이터.mine;
    if (적군카드 && 아군.선택카드) {
        데이터.hp = 데이터.hp - 아군.선택카드data.att;

        //죽은 카드 정리하기
        if (데이터.hp <= 0) {
            //제로초 코드
            var 인덱스 = 적군.필드data.indexOf(데이터);
            if (인덱스 > -1) { // 쫄병이 죽었을 때
                적군.필드data.splice(인덱스, 1); // splice는 중간에 있는거 빼기
            } else { // 영웅이 죽었을 때
                alert('승리하셨습니다!');
                초기세팅();
            }
            //왜 아래 코드는 안될까?
            // 카드.querySelector('.card-hp').textContent = '죽었다';
        };
        화면다시그리기(!내가);
        아군.선택카드.classList.remove('card-selected');
        아군.선택카드.classList.add('card-turnover');
        아군.선택카드 = null;
        아군.선택카드data = null;
        return; //종료
    } else if (적군카드) { // 상대카드면
        return;
    }
    if (데이터.field) { // 필드카드면

        //필드카드와 영웅카드가 동시 선택되는 에러를 수정하고 싶어
        //생각1) 영웅을 잡아서 선택을 해제하자
        // 나.영웅.children.classList.remove('card-selected');  <-- 안먹힘..

        //카드.parentNode.querySelectorAll('.card').forEach(function (card) {  <-- 제로초 에러코드
        document.querySelectorAll('.card').forEach(function (card) { // 수정코드
            card.classList.remove('card-selected');
        });

        //생각2) 카드.querySelectorAll('.card').classList.toggle('card-selected');
        //카드(누른것)에서 .card해봤자 영웅까지 선택하지는 못함
        카드.classList.toggle('card-selected');
        아군.선택카드 = 카드;
        아군.선택카드data = 데이터;
    } else { // 덱카드 누르면
        if (덱에서필드로(데이터, true) !== 'end') { //함수는 리턴이 없으면 undefined > false  
            내턴 ? 내덱생성(1) : 상대덱생성(1);
        }
    }
};


function 카드돔연결(데이터, 돔, 영웅) {
    var 카드 = document.querySelector('.card-hidden .card').cloneNode(true);
    카드.querySelector('.card-cost').textContent = 데이터.cost;
    카드.querySelector('.card-att').textContent = 데이터.att;
    카드.querySelector('.card-hp').textContent = 데이터.hp;
    if (영웅) {
        카드.querySelector('.card-cost').style.display = 'none';
        var 이름 = document.createElement('div');
        이름.textContent = '영웅';
        카드.appendChild(이름)
    };

    카드.addEventListener('click', function () { //눌렀는데 
        console.log(카드, 데이터);

        턴액션수행(데이터, 카드, 턴);
    });
    돔.appendChild(카드);
};

function 상대덱생성(개수) {
    for (var i = 0; i < 개수; i++) {
        상대.덱data.push(카드공장());
    }
    // 상대.덱.innerHTML = '';
    // 상대.덱data.forEach(function (data) {
    //     카드돔연결(data, 상대.덱);
    // });
    덱다시그리기(상대);
};

function 내덱생성(개수) {
    for (var i = 0; i < 개수; i++) {
        나.덱data.push(카드공장(false, true));
    }
    // 나.덱.innerHTML = '';
    // 나.덱data.forEach(function (data) {
    //     카드돔연결(data, 나.덱);
    // })
    덱다시그리기(나);
}

function 내영웅생성() {
    나.영웅data = 카드공장(true, true);
    카드돔연결(나.영웅data, 나.영웅, true);
}

function 상대영웅생성() {
    상대.영웅data = 카드공장(true);
    카드돔연결(상대.영웅data, 상대.영웅, true);
}

function Card(영웅, 내카드) {
    if (영웅) {
        this.att = Math.ceil(Math.random() * 2);
        this.hp = Math.ceil(Math.random() * 5) + 25;
        this.hero = true;
        this.field = true;
    } else {
        this.att = Math.ceil(Math.random() * 5);
        this.hp = Math.ceil(Math.random() * 5);
        this.cost = Math.floor((this.att + this.hp) / 2);
    }
    if (내카드) {
        this.mine = true;
    }
}

function 카드공장(영웅, 내카드) {
    //여기에 function Card()  넣어도 되지만 계속 선언을 막기위해 따로 뺐음.
    return new Card(영웅, 내카드);
}

function 초기세팅() {
    //왜 안먹히는지 모르겠음
    // 나.덱data = null;
    // 나.필드data = null;
    // 나.영웅data = null;
    // 상대.덱data = null;
    // 상대.필드data = null;
    // 상대.영웅data = null;

    // > 배열 초기화의 경우에 위에가 아니라
    // 덱data = [];   <-- 이런식으로 해야함
    // 그리고 선택카드와 선택카드data도 수정해야 함

    [상대, 나].forEach(function (item) {
        item.덱data = [];
        item.영웅data = [];
        item.필드data = [];
        item.선택카드 = [];
        item.선택카드data = [];
    });

    상대덱생성(5);
    내덱생성(5);
    내영웅생성();
    상대영웅생성();

    화면다시그리기(true);
    화면다시그리기(false);
}
//턴버튼 누를 때 turn-over 클래스 삭제하기 

턴버튼.addEventListener('click', function () {
    //data를 건드는게 아니기 때문에 다시 그려도 문제 없음 
    var 객체 = 턴 ? 나 : 상대;
    document.getElementById('rival').classList.toggle('turn');
    document.getElementById('my').classList.toggle('turn');

    // 객체.필드.innerHTML = '';
    // 객체.필드data.forEach(function (data) {
    //     카드돔연결(data, 객체.필드);
    // })
    // 객체.영웅.innerHTML = '';
    // 카드돔연결(객체.영웅data, 객체.영웅, true);
    필드다시그리기(객체);
    영웅다시그리기(객체);

    //위 코드 위치 잘 생각하기: 턴 넘기기 전에 실행되어야 함
    턴 = !턴; // 턴을 넘기는 코드     
    if (턴) {
        나.코스트.textContent = 10;
    } else {
        상대.코스트.textContent = 10;
    }
    //누구 턴인지 표시해주는 쿄드


    //이 코드도 됨 ! 내가 짠 코드
    // document.querySelectorAll('.card').forEach(function (card) {
    //     card.classList.remove('card-turnover');

});


초기세팅();
