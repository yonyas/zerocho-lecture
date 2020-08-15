var body = document.body;
var cols = [];
var dataset = [];
var table = document.createElement('table');
var col = [];
var row = [];
var turn = 'o';


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
        console.log(turn + 'v');
    }
    //TODO: Check col
    else if (
        col.children[0].textContent === 'o' && col.children[1].textContent === 'o' && col.children[2].textContent === 'o' ||
        col.children[0].textContent === 'x' && col.children[1].textContent === 'x' && col.children[2].textContent === 'x'
    ) {
        console.log(turn + ' v')
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
