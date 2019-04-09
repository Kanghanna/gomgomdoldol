window.onload = init;
var doldol_state = 0; // 감고있는 상태
var next = 0;
var url = "Game_over_pop.png";
var move = 0;
// true or false
var see_tf = 0;
var close_tf = 1; // 눈을 감은 채로 시작하므로 true
//초기 곰곰&돌돌의 좌표
var gom_top = 400;
var gom_left = 20;
var dol_top = 50;
var dol_left = 650;
// 이동할 때마다 카운트 되는 변수
var g_walk = 0;
var d_walk = 0;
var d_sc = 0;
//아이디로 불러오는 변수
var gomId = document.getElementById("gom");
var dolId = document.getElementById("dol");
var moveId = document.getElementById("move");
var touchId = document.getElementById("touch");
var playId = document.getElementById("play");
var stopId = document.getElementById("stop");
var popId = document.getElementById("pop");
var effectId = document.getElementById("effect");
var firstId = document.getElementById("first");
var bgmId = document.getElementById("bgm");
var f_gom_top = gomId.style.top;
var dol_src = dolId.src;
var audio = new Audio('BGM.mp3'); // 오디오

function init() {

    //setInterval을 사용해서 술래가 1.2초에 한번 씩 뒤돌아보기
    //술래 터치 버튼으로 바뀌었을 때 중단
    window.see_close = setInterval(function see_close() {
        d_sc++;
        if (d_sc % 2 == 0) {
            dolId.src = "doldol_close.png";
            doldol_state = 0;
        }
        else {
            dolId.src = "doldol_see.png";
            doldol_state = 1;
        }
    }, 1200);


    //술래터치 버튼을 누르면 술래가 잡으러 이동(0.2초에 20px씩)
    if (Touch_tagger()) {
        setTimeout(function () { }, 1000); //1초 뒤에 술래가 움직임
        window.gom_catch = setInterval(function gom_catch() {
            d_walk++;
            dol_top += 10;
            dol_left -= 20;
            dolId.style.top = dol_top + 'px';
            dolId.style.left = dol_left + 'px';
            if (d_walk % 2 == 0) {
                dolId.src = "doldol_move1.png"
            }

            else { dolId.src = "doldol_move2.png"; }

            if (dol_top == 350) clearInterval(gom_catch);
        }, 300);
    }
    //플레이어와 술래의 좌표가 겹치고,
    //플레이어가 출발선 안에 없을 때 gameover화면 출력

} //init end

function Game_over() {
    popId.style.visibility = "visible";
    firstId.style.visibility = "visible";
}


function Move() { //한번 클릭했을 때 플레이어가 이동
        if (gom_top != 90) { //
            g_walk++;
            gom_top -= 10;
            gom_left += 20;
            gomId.style.top = gom_top + 'px';
            gomId.style.left = gom_left + 'px';

            //Move()가 실행되는 중에 돌돌이가 "doldol_see.png"면 gameover화면 출력
            if(doldol_state == 1) Game_over();

            //플레이어와 술래의 좌표가 겹치고,
            //플레이어가 출발선 안에 없을 때 gameover화면 출력
            if(dol_left == gom_left && 350 <= gom_top && !Touch_tagger) Game_over();

            m_top = gomId.style.top;

            // g_walk가 짝수면 "gomgom_move1.png"을, 홀수면 "gomgom_move2.png"를 출력
            if (g_walk % 2 == 0) gomId.src = "gomgom_move1.png";
            else gomId.src = "gomgom_move2.png";
        }
        else { //플레이어가 술래 가까이 갔을 때
            clearInterval(see_close);
            moveId.style.visibility = "hidden";//움직이기 버튼을 숨김
            touchId.src = "tagger_touch_button.png";//그 자리에 술래터치 버튼을 보이게 함
            window.effect = setTimeout(function effect() {
                effectId.style.visibility = "visible";
            }, 500);
            clearTimeout(effect);
        }
} //move end


function Touch_tagger() { //터치 효과
        //effectId.style.visibility = "hidden";
        touchId.style.visibility = "hidden";
        moveId.style.visibility = "visible";
        next++;
}

function Sound_play() { //bgm 재생
    audio.play();
    playId.style.visibility = "hidden";
    stopId.style.visibility = "visible";
}

function Sound_stop() { //bgm 중지
    audio.pause();
    playId.style.visibility = "visible";
    stopId.style.visibility = "hidden";
}

function Reset() { //다시 시작
    gomId.src = 'gomgom_stop.png';
    gomId.style.top = '400px';
    gomId.style.left = '20px';
    dolId.src = 'doldol_close.png';
    dolId.style.top = '50px';
    dolId.style.left = '650px';
    gom_top = 400;
    gom_left = 20;
    dol_top = 50;
    dol_left = 650;
}