var tbody = document.querySelector('#table tbody');  //scope땜에 밖으로 꺼냄
var dataset = [];

document.querySelector('#exec').addEventListener('click', function() {
  tbody.innerHTML = '';  //실행할때마다 초기화
  dataset = [];
  var hor = parseInt(document.querySelector('#hor').value);
  var ver = parseInt(document.querySelector('#ver').value);
  var mine = parseInt(document.querySelector('#mine').value);
  console.log(hor, ver, mine);

//@지뢰위치 뽑기
//1~100까지 배열 만들기 (로또추첨 생각) array, fill, map 외우기
var 후보군 = Array(hor * ver).fill().map(function (요소, 인덱스) {
  return 인덱스;
});

//이 방법명 : 피셔예이츠 셔플
var 셔플 = [];
while (후보군.length > 80) { //20개만 뽑기
  var 이동값 = 후보군.splice(Math.floor(Math.random() * 후보군.length), 1)[0];
  셔플.push(이동값);
}

console.log('셔플', 셔플);

// @지뢰 테이블 만들기
//입력받은 hor, ver값에 따라 tr, td 테이블 생성하기
//화면의 모양과 콘솔의 모양을 생각
for (var i = 0; i < ver; i+= 1) {
  var arr = [];
  var tr = document.createElement('tr');
  dataset.push(arr);
  for (var j = 0; j < hor; j+= 1) {
    arr.push(1);
    //^이거 없어도 되지만 콘솔안의 배열에 [1,1,1..] 넣으려면 필요(데이터와 화면 일치)
    //arr배열 여러개를 한번에 잡고 그 안에 1을 하나씩 추가
    var td = document.createElement('td');
    td.addEventListener('contextmenu', function (e) {
      e.preventDefault();
      var 부모tr = e.currentTarget.parentNode;
      // e.target : ^차이가 있음, 보통 current
      //예)tbody에 적용할때 Target은 <td>, current는 <tbody>가 잡힘
      var 부모tbody = e.currentTarget.parentNode.parentNode;
      var 칸 = Array.prototype.indexOf.call(부모tr.children, e.currentTarget);
      var 줄 = Array.prototype.indexOf.call(부모tbody.children, 부모tr);
      //INdexOf는 원래 배열에만 사용 가능한데, 배열이 아닌 부모tr.children에도 쓰려면
      //Array.prototype의 방법 사용
      console.log(부모tr, 부모tbody, e.currentTarget, 칸, 줄);
      if (e.currentTarget.textContent === '' || e.currentTarget.textContent === 'X') {
        e.currentTarget.textContent = '!';
      } else if (e.currentTarget.textContent === '!') {
        e.currentTarget.textContent = '?';
      } else if (e.currentTarget.textContent === '?') {
        if (dataset[줄][칸] === 1) {
          e.currentTarget.textContent = '';
        } else if (dataset[줄][칸] === 'X') {
          e.currentTarget.textContent = 'X';
        }
      }
    });
    td.addEventListener('click', function (e) {
      //클릭했을 때 주변 지뢰 개수
      var 부모tr = e.currentTarget.parentNode;
      var 부모tbody = e.currentTarget.parentNode.parentNode;
      var 칸 = Array.prototype.indexOf.call(부모tr.children, e.currentTarget);
      var 줄 = Array.prototype.indexOf.call(부모tbody.children, 부모tr);

      e.currentTarget.classList.add('opened'); //태크.classList로 태그의 클래스에 접근, add나 remove로 추가삭제
      if (dataset[줄][칸] === 'X') { //지뢰누르면 화면상 '펑'
        e.currentTarget.textContent = '펑';
      } else {             //지뢰 말고 다른거누르면 '주변 지뢰 개수'
        var 주변 = [       //끝줄칸은 -1하면 에러나기때문에 이렇게 해주는것
         dataset[줄][칸-1], dataset[줄][칸+1],
       ];
       if (dataset[줄-1]) {
         주변 = 주변.concat([dataset[줄-1][칸-1], dataset[줄-1][칸], dataset[줄-1][칸+1]]);
         // 주변.push(dataset[줄-1][칸-1]);     <- 이것과 같다
         // 주변.push(dataset[줄-1][칸]);
         // 주변.push(dataset[줄-1][칸+1]);
       }
       if (dataset[줄+1]) {
         주변 = 주변.concat([dataset[줄+1][칸-1], dataset[줄+1][칸], dataset[줄+1][칸+1]]);
       }
       console.log(주변);
       var 주변지뢰개수   = 주변.filter(function(v) {
          return v === 'X'
        }).length;
         //filter 는 배열에서 필터링하는것, 배열요소가 x인것
         //concat은 배열과 배열을 합침, 원래 '주변'함수가 변하는건 아님. concat한 상태만 변함
         e.currentTarget.textContent = 주변지뢰개수;
         if (주변지뢰개수 === 0) {
           //주변 8칸 동시 오픈 (재귀함수)
           //주변지뢰개수를 찾는 것처럼 주변칸을 배열로 모으는 코드
           var 주변칸 = [];
           if (tbody.children[줄-1]) {
             주변칸 = 주변칸.concat([
               tbody.children[줄-1].children[칸-1],
               tbody.children[줄-1].children[칸],
               tbody.children[줄-1].children[칸+1],
             ]);
           }
           주변칸 = 주변칸.concat([
             tbody.children[줄].children[칸-1],
             tbody.children[줄].children[칸+1],
           ]);

           if (tbody.children[줄+1]) {
             주변칸 = 주변칸.concat([
               tbody.children[줄+1].children[칸-1],
               tbody.children[줄+1].children[칸],
               tbody.children[줄+1].children[칸+1],
             ]);
           }
           주변칸.filter(function(v) { return !!v }).forEach(function(옆칸) {
             옆칸.click();
           });
           //!!는 주변의 0, null, undefined 제거하는 코드
         }
      }
    });
    tr.appendChild(td);
    // td.textContent = 1;
  }
  tbody.appendChild(tr);
}

   //@지뢰심기
   for (var k = 0; k < 셔플.length; k++) {  // 예 60
     var 세로 = Math.floor(셔플[k] / 10);   // 6
     var 가로 = 셔플[k] % 10;               // 0
     console.log(세로, 가로);
     tbody.children[세로].children[가로].textContent = 'X';
     dataset[세로][가로] = 'X';
   }
   console.log('dataset',dataset);
});
