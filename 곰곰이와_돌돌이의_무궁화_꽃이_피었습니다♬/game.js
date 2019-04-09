window.onload = init;
var doldol_state = 0; // 눈을 감고있는 상태
var next = 0;
var url = "Game_over_pop.png";
var move = 0;
var see_tf = 0;
var close_tf = 1;
var gom_top = 90; //400
var gom_left = 630; //20
var dol_top = 50;
var dol_left = 650;
var g_walk = 0;
var d_walk = 0;
var d_sc = 0;
var gomId = document.getElementById("gom");
var dolId = document.getElementById("dol");
var moveId = document.getElementById("move");
var touchId = document.getElementById("touch");
var resetId = document.getElementById("reset");
var playId = document.getElementById("play");
var stopId = document.getElementById("stop");
var popId = document.getElementById("pop");
var effectId = document.getElementById("effect");
var firstId = document.getElementById("first");
var bgmId = document.getElementById("bgm");
var cheatId = document.getElementById("cheat"); //나중에 지우기
var f_gom_top = gomId.style.top;
var dol_src = dolId.src;
var audio = new Audio('BGM.mp3');

function init() {

    //setInterval을 사용해서 술래가 1.2초에 한번 씩 뒤돌아보기
    //술래 터치 버튼으로 바뀌었을 때 중단
    see_close = window.setInterval(function see_close() {
        d_sc++;
        if (d_sc % 2 == 0) {
            dolId.src = "img/doldol_close.png";
            doldol_state = 0;
        }
        else {
            dolId.src = "img/doldol_see.png";
            doldol_state = 1;
        }
    }, 1200);

    Move_dol();

} //init end


function Cheat() {
    gomId.style.top = "40px";
    gomId.style.left = "630px";
}


function Game_over() {
    popId.style.visibility = "visible";
    firstId.style.visibility = "visible";
    //moveId.style.visibility = "hidden";
    moveId.disabled = 'disabled';
    resetId.style.top = '450px';
    resetId.style.left = '440px';
    
}


function Move() { //한번 클릭했을 때 플레이어가 이동

    if(next == 0){
        if (gom_top != 90) {
            g_walk++;
            gom_top -= 10;
            gom_left += 20;
            gomId.style.top = gom_top + 'px';
            gomId.style.left = gom_left + 'px';

            if(doldol_state == 1) Game_over();

            //플레이어와 술래의 좌표가 겹치고,
            //플레이어가 출발선 안에 없을 때 gameover화면 출력
            if(dol_left == gom_left && 350 <= gom_top) Game_over();

            m_top = gomId.style.top;

            // g_walk가 짝수면 "gomgom_move1.png"을, 홀수면 "gomgom_move2.png"를 출력
            if (g_walk % 2 == 0) gomId.src = "img/gomgom_move1.png"; 
            else gomId.src = "img/gomgom_move2.png";
        }
        else { //플레이어가 술래 가까이 갔을 때
            //moveId.style.visibility = "hidden"; //움직이기 버튼을 숨김
            touchId.style.visibility = "visible"; //그 자리에 술래터치 버튼을 보이게 함
            window.effect = setTimeout(function effect() {
                effectId.style.visibility = "visible";
            }, 500);
            clearTimeout(effect);
        }
    } //next == 0
    
    else if(next == 1){ //곰곰이가 뒤로 다시 돌아올 때
        g_walk++;
        gom_top += 10;
        gom_left -= 20;
        gomId.style.top = gom_top + 'px';
        gomId.style.left = gom_left + 'px';

        if(doldol_state == 1) Game_over();

        //플레이어와 술래의 좌표가 겹치고,
        //플레이어가 출발선 안에 없을 때 gameover화면 출력
        if(dol_left == gom_left && 350 >= gom_top) Game_over();

        m_top = gomId.style.top;

        if (g_walk % 2 == 0) gomId.src = "img/gomgom_move3.png";
        else gomId.src = "img/gomgom_move4.png";

    } //next == 1

}

function Move_dol(){
//-------------------------------------------------------------
        //술래의 움직임
        if(next == 1){
            window.clearInterval(see_close); // 눈 감았다뜨기 종료
    
            setTimeout(function () { }, 1000); //1초 뒤에 술래가 움직임
            gom_catch = window.setInterval(function gom_catch() {
                d_walk++;
                dol_top += 10;
                dol_left -= 20;
                dolId.style.top = dol_top + 'px';
                dolId.style.left = dol_left + 'px';

                if (d_walk % 2 == 0) {
                    dolId.src = "img/doldol_move1.png"
                }
    
                else { dolId.src = "img/doldol_move2.png"; }
    
            }, 500);
    
            if (dol_top == 350) window.clearInterval(gom_catch); //출발선까지 곰곰이를 못잡으면 게임 종료(곰곰이 승)
            if(dol_left == gom_left) Game_over();
        }
    
}

function Touch_tagger() { //터치 효과
        //effectId.style.visibility = "hidden";
        touchId.style.visibility = "hidden";
        moveId.style.visibility = "visible";
        next++; //갈 때와 올 때를 구분하기 위해
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
    next = 0; //곰곰이 이동 전으로 리셋
    popId.style.visibility = "hidden";
    firstId.style.visibility = "hidden";
    resetId.style.top = "40px";
    resetId.style.left = "30px";
    moveId.disabled = '';

    gomId.src = 'img/gomgom_stop.png';
    gomId.style.top = '400px';
    gomId.style.left = '20px';
    dolId.src = 'img/doldol_close.png';
    dolId.style.top = '50px';
    dolId.style.left = '650px';
    gom_top = 400;
    gom_left = 20;
    dol_top = 50;
    dol_left = 650;
}