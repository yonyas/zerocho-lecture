var body = document.body;
var cols = [];
var dataset = [];
var table = document.createElement('table');
var col = [];
var row = [];
var turn = 'o';
var result = document.createElement('div');
body.appendChild(result);
result.textContent = ' 1';
var full = false;


function init() {
    setTimeout(function () {
        result.textContent = '다시 시작';
        for (var k = 0; k < 3; k++) { // 0 1 2 
            for (var l = 0; l < 3; l++) { // 0 1 2 
                table.childNodes[k].childNodes[l].textContent = '';
            }
        }
    }, 1000);
}

function draw(table, result) {
    for (var k = 0; k < 3; k++) { // 0 1 2 
        for (var l = 0; l < 3; l++) { // 0 1 2 
            if (table.childNodes[k].childNodes[l].filter(function (칸) {
                    return !칸.textContent
                })) {
                result.textContent = '무승부';
            }
        }
    }
}


function click(e) {
    e.preventDefault();
    //Find col, row of 'click', and Change textContent to "O" 
    row = e.currentTarget.parentNode;
    col = e.currentTarget.parentNode.parentNode;
    // console.log(e.currentTarget, row, col);
    var colNumber = Array.prototype.indexOf.call(col.children, row);
    var rowNumber = Array.prototype.indexOf.call(row.childNodes, e.currentTarget);
    //제로초 코드: tr td를 변수로 만들었음
    //Check! .children은 Element에만 쓰이고, .childNodes는 Node에 쓰임, 보통 Children 사용, 후자는 text or comment loop하므로..
    console.log(rowNumber, colNumber);

    //빈칸일때 클릭되기
    if (turn === 'o' && e.currentTarget.textContent === '') {
        e.currentTarget.textContent = 'x';
        turn = 'x';
    } else if (turn === 'x' && e.currentTarget.textContent === '') {
        e.currentTarget.textContent = 'o';
        turn = 'o';
    }

    //승리 체크
    //Check row
    if (
        row.children[0].textContent === 'o' && row.children[1].textContent === 'o' && row.children[2].textContent === 'o' ||
        row.children[0].textContent === 'x' && row.children[1].textContent === 'x' && row.children[2].textContent === 'x'
    ) {
        console.log(turn + ' row win');
        full = true;
    }
    //TODO: Check col, 클로저 문제로 안되는 것 같은데 해결법을 모르겠음 ㅠㅠ.. 
    for (var i = 0; i < 3; i++) { // 0 1 2 
        for (var j = 0; j < 3; j++) { // 0 1 2 
            (function (i, j, turn, full, table) {
                if (
                    table.childNodes[j].childNodes[i].textContent === 'o' && table.childNodes[j].childNodes[i].textContent === 'o' && table.childNodes[j].childNodes[i].textContent === 'o' ||
                    table.childNodes[j].childNodes[i].textContent === 'x' && table.childNodes[j].childNodes[i].textContent === 'x' && table.childNodes[j].childNodes[i].textContent === 'x'
                ) {
                    console.log(turn + ' col win');
                    full = true;

                }
            });

        }
    }

    //아래처럼 하면 에러 
    // else if (
    //     row.children[0][0].textContent === 'o' && row.children[0][1].textContent === 'o' && row.children[0][2].textContent === 'o' ||
    //     row.children[0][0].textContent === 'x' && row.children[0][1].textContent === 'x' && row.children[0][2].textContent === 'x'
    // ) {
    //     console.log(turn + ' v')
    // }

    // 다 찼으면
    if (full) {
        console.log(turn + '님의 승리!');
        result.textContent = 'win';
        turn = 'o';
        init();
    } else {
        draw(table, result);
        init();
    }
}


for (var i = 0; i < 3; i++) {
    var tr = document.createElement('tr');
    dataset.push(cols);
    cols.push(0);

    for (var j = 0; j < 3; j++) {
        var td = document.createElement('td');
        td.addEventListener('click', click);
        tr.appendChild(td);
    }
    table.appendChild(tr);
}
body.appendChild(table);
