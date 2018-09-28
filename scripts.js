const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function balikKartu(){
    this.classList.toggle('flip');

    // flip kartu
    if(!hasFlippedCard){ // cek apakah ada kartu yang dibuka
        hasFlippedCard = true;
        firstCard = this;          
        console.log('kartu pertama');
    } else if(firstCard == this){ // klik kartu yang sama
        hasFlippedCard = false;
        console.log('kartu yang sama');
    } else {
        secondCard = this;
        checkKartu();
        hasFlippedCard = false; // 2 kartu sudah dibuka, harus balik kartu lagi
        console.log('kartu kedua');        
    }
            
}

function checkKartu(){
    let cekCocok = firstCard.dataset.framework === secondCard.dataset.framework;
    if(cekCocok) {
        fixedKartu();
    } else {
        tutupKartu();
    }
}

function fixedKartu(){
    firstCard.removeEventListener('click', balikKartu);
    secondCard.removeEventListener('click', balikKartu);
}

function tutupKartu(){

    //kartu lain harus di klik setelah timeout. untuk async, harus pelajari asynchronous/promise dulu
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
    }, 500);
}

(function shuffle() {
  cards.forEach(card => {
    let ramdomPos = Math.floor(Math.random() * 12);
    card.style.order = ramdomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', balikKartu));