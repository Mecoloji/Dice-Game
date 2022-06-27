'use strict';
//Elementleri Seçmek
const player0El = document.querySelector(".player--0")
const player1El = document.querySelector(".player--1")
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const diceEl = document.querySelector(".dice")
const bntNew = document.querySelector(".btn--new");
const bntRoll = document.querySelector(".btn--roll");
const bntHold = document.querySelector(".btn--hold");
const current0El = document.getElementById("current--0")
const current1El = document.getElementById("current--1")


//Başlangıç Şartları
let scores, currentScore, activePlayer, playing;

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
        activePlayer = activePlayer === 0 ? 1 : 0;
        currentScore = 0;
    player0El.classList.toggle("player--active");
    player1El.classList.toggle("player--active");
};

const init = function () {

    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;
    
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add("hidden");
    player0El.classList.remove("player--winner");
    player1El.classList.remove("player--winner");
    player0El.classList.add("player--active");
    player1El.classList.remove("player--active");
};

init();

//Zar Atma İşlemi
bntRoll.addEventListener("click", function(){
    if(playing){

        //1. Rastgele zar oluştur
        const dice = Math.trunc(Math.random() * 6) + 1;
        //2. Zarları göster
        diceEl.classList.remove("hidden");
        diceEl.src = `dice-${dice}.png`
        //3. Zarda 1'i kontrol et.
        if(dice !== 1){
            // Zarı mevcut skora ekle
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
            //current0El.textContent = currentScore; //--Sonra değiştir
        }else{
            //Eğer doğruysa diğer oyuncuya geç
            switchPlayer();
        }
    }
});

bntHold.addEventListener("click", function () {
    if (playing) {

        // 1. Aktif oyununcunun puanına mevcut puanı eklemek
        scores[activePlayer] += currentScore;
        // scores[1] = scores[1] + currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        // 2. Puanın en az 100 olduğunun kontrolü
        if(scores[activePlayer] >= 100) {
            document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
            
            document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
            // Oyunu bitir
            playing = false;
            diceEl.classList.add("hidden");
        }else {
            // Diğer oyuncuya geç
            switchPlayer();
        }
    }
});

// New Game Button
bntNew.addEventListener("click", init);
