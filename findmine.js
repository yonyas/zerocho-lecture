const table = document.createElement('table');
let dataset = [];
let length = 10;
let height = 10;
let minePlace = [];
let place = [];
const result = document.querySelector('#result');
const again = document.querySelector('#again');
const time2 = document.querySelector('#time2');
const 지뢰표 = {
    빈칸: 0,
    지뢰칸: 1,
    연빈칸: 2,
    연지뢰칸: 3,
    물음표빈칸: 4,
    물음표지뢰칸: 5,
}
let stopflag = false;
let 연칸개수 = 0;

again.addEventListener('click', function () {
    //초기화
    stopflag = false;
    dataset = [];
    minePlace = [];
    place = [];
    table.innerHTML = '';
    연칸개수 = 0;
    const startTime = Date.now();
    console.log(startTime / 1000);

    //모양 만들기 (화면, 데이터)
    for (let i = 0; i < height; i++) {
        let tr = document.createElement('tr');
        table.appendChild(tr);
        let col = [];
        dataset.push(col);
        for (let i = 0; i < length; i++) {
            let td = document.createElement('td');
            tr.appendChild(td);
            col.push(0);

            //우클릭으로 물음표, 느낌표 심기
            td.addEventListener('contextmenu', function (e) {
                e.preventDefault();
                if (stopflag) {
                    return;
                }
                let 부모tr = e.currentTarget.parentNode;
                let 부모table = e.currentTarget.parentNode.parentNode;
                let 줄 = Array.prototype.indexOf.call(부모table.children, 부모tr);
                let 칸 = Array.prototype.indexOf.call(부모tr.children, e.currentTarget);
                console.log(부모tr, 부모table, 줄, 칸);

                if (e.currentTarget.textContent === '') {
                    e.currentTarget.textContent = '!';
                    dataset[줄][칸] = 지뢰표.물음표빈칸;
                    e.currentTarget.classList.add('flag');

                } else if (e.currentTarget.textContent === 'X') {
                    e.currentTarget.textContent = '!';
                    dataset[줄][칸] = 지뢰표.물음표지뢰칸;
                    e.currentTarget.classList.add('flag');

                } else if (e.currentTarget.textContent === '!') {
                    e.currentTarget.textContent = '?';

                } else if (e.currentTarget.textContent === '?') {
                    if (dataset[줄][칸] === 지뢰표.물음표빈칸) {
                        e.currentTarget.textContent = '';
                        dataset[줄][칸] === 지뢰표.빈칸;
                        e.currentTarget.classList.remove('flag');

                    } else if (dataset[줄][칸] === 지뢰표.물음표지뢰칸) {
                        e.currentTarget.classList.remove('flag');
                        e.currentTarget.textContent = 'X';
                        dataset[줄][칸] === 지뢰표.지뢰칸;
                    }
                }
            });

            //주변지뢰개수 세서 화면에 넣기 
            td.addEventListener('click', function (e) {
                e.preventDefault();
                if (stopflag) {
                    return;
                }
                let 부모tr = e.currentTarget.parentNode;
                let 부모table = e.currentTarget.parentNode.parentNode;
                let 줄 = Array.prototype.indexOf.call(부모table.children, 부모tr);
                let 칸 = Array.prototype.indexOf.call(부모tr.children, e.currentTarget);
                // console.log(부모tr, 부모table, 줄, 칸);

                if (dataset[줄][칸] === 지뢰표.물음표빈칸 || dataset[줄][칸] === 지뢰표.물음표지뢰칸) {
                    return;
                }
                console.log('여기', 줄, 칸, dataset[줄][칸]);
                e.currentTarget.classList.add('opened');

                //주변지뢰개수 잡기 
                let 주변 = [dataset[줄][칸 - 1], dataset[줄][칸 + 1]]
                if (dataset[줄 - 1]) {
                    주변 = 주변.concat([dataset[줄 - 1][칸 - 1], dataset[줄 - 1][칸], dataset[줄 - 1][칸 + 1]])
                }
                if (dataset[줄 + 1]) {
                    주변 = 주변.concat([dataset[줄 + 1][칸 - 1], dataset[줄 + 1][칸], dataset[줄 + 1][칸 + 1]])
                }
                주변 = 주변.filter(function (v) {
                    return v === 1;
                });


                //지금 칸에 주변지뢰개수 넣기 
                if (dataset[줄][칸] === 지뢰표.빈칸) {
                    //주변 중 1(지뢰표.지뢰칸)의 개수를 세야함 
                    //주변지뢰개수가 0일때는 체크하지 말기 
                    e.currentTarget.textContent = 주변.length || '';
                    e.currentTarget.classList.add('opened');

                    dataset[줄][칸] = 지뢰표.연빈칸;
                    연칸개수++;
                    // console.log(지뢰표.연빈칸);
                    if (연칸개수 === 80) {
                        result.textContent = '승리!';
                        let winTime = Date.now();
                        // time.textContent = winTime - startTime;
                    }

                    //지뢰 밟으면 
                } else if (dataset[줄][칸] === 지뢰표.지뢰칸) {
                    result.textContent = '끝 ㅠㅠ';
                    e.currentTarget.textContent = '펑';
                    stopflag = true;
                    let loseTime = Date.now();
                    console.log(loseTime - startTime);
                    let elapsedTime = loseTime - startTime;
                    time2.textContent = Math.floor(elapsedTime / 1000) + '초 걸렸습니다.';
                    // time.textContent = loseTime - startTime;
                    console.log(elapsedTime);
                }

                //주변지뢰개수가 0이면 주변8칸을 클릭한다.
                if (주변.length === 0) {
                    let 주변칸 = [부모tr.children[칸 - 1], 부모tr.children[칸 + 1]]
                    if (부모tr.children[줄 - 1]) {
                        주변칸 = 주변칸.concat([부모table.children[줄 - 1].children[칸 - 1], 부모table.children[줄 - 1].children[칸], 부모table.children[줄 - 1].children[칸 + 1]])
                    }
                    if (부모tr.children[줄 + 1]) {
                        주변칸 = 주변칸.concat([부모table.children[줄 + 1].children[칸 - 1], 부모table.children[줄 + 1].children[칸], 부모table.children[줄 + 1].children[칸 + 1]])
                    }
                    주변칸.filter(function (v) { //filter는 주변의 0, null, undefined 제거하는 코드
                        return !!v // v는 <td>/td>코드는 null이 아닌 값으로 봄. td값이 있다고 봄. 테이블 넘어가는거 가리는코드임
                    }).forEach(function (옆칸) {
                        let 부모tr = 옆칸.parentNode;
                        let 부모table = 옆칸.parentNode.parentNode;
                        let 옆칸칸 = Array.prototype.indexOf.call(부모tr.children, 옆칸);
                        let 옆칸줄 = Array.prototype.indexOf.call(부모table.children, 부모tr);
                        if (dataset[옆칸줄][옆칸칸] !== 지뢰표.연빈칸) {
                            옆칸.click();
                        }
                    });
                }
            });
        };
    };
    document.body.append(table);

    //지뢰위치 잡기
    place = Array(100).fill().map((value, i) => {
        return i // [0,1,2, ... 49]
    });
    // console.log(place);
    while (place.length > 80) {
        let mineTemp = place.splice(Math.floor(Math.random() * place.length), 1)[0];
        minePlace.push(mineTemp);
    }
    console.log("minePlace", minePlace)


    //지뢰 심기
    for (var k = 0; k < minePlace.length; k++) {
        var 몇칸 = Math.floor(minePlace[k] / 10);
        var 몇줄 = minePlace[k] % 10

        table.childNodes[몇줄].childNodes[몇칸].textContent = 'X';
        dataset[몇줄][몇칸] = 지뢰표.지뢰칸;
    }
});
// console.log(몇칸, 몇줄);
