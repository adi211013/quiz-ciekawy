const pytanie = document.querySelector('#pytanie');
const odp_1 = document.querySelector('#odp_1');
const odp_2 = document.querySelector('#odp_2');
const odp_3 = document.querySelector('#odp_3');
const odp_4 = document.querySelector('#odp_4');
const przyciski = document.querySelectorAll('button');
const plansza = document.querySelector('#plansza');
const p = document.querySelector('p');
const podsumowanie = document.querySelector('#podsumowanie');

function uzupelnijPytanie(dane)
{
    if(dane.wygrana === true){
        plansza.style.display = 'none';
        p.style.display = 'none';
        podsumowanie.innerText = "latwo bylo tutaj rozegrane";
        podsumowanie.classList.add('wygrana');
        return;
    }
    if(dane.przegrana === true){
        plansza.style.display = 'none';
        p.style.display = 'none';
        podsumowanie.innerText = "nie wiem jak ty to przegrales, ale gratuluje xd";
        podsumowanie.classList.add('przegrana');
        return;
    }
    pytanie.innerText=dane.pytanie;
    odp_1.innerText=dane.odpowiedz[0];
    odp_2.innerText=dane.odpowiedz[1];
    odp_3.innerText=dane.odpowiedz[2];
    odp_4.innerText=dane.odpowiedz[3];
}

const liczbaOdpowiedzi = document.querySelector('#poprawna');
function odpZwrotna(dane){
    liczbaOdpowiedzi.innerText = dane.przekazanePytanie;
    pokazNastepnePytanie();
}
for (const przycisk of przyciski){
    przycisk.addEventListener('click', function() {
        const nrOdp = this.dataset.odp;
        wyslijOdp(nrOdp);
    })
}

function wyslijOdp(nrOdp){
    fetch('/quiz_odpowiedz/'+ nrOdp, {
        method: 'POST',
    }).then(odp => odp.json())
    .then(dane => {
        odpZwrotna(dane);
    });
}
function pokazNastepnePytanie(){
    fetch('/quiz_pytanie').then(odp => odp.json())
    .then(dane => {
        uzupelnijPytanie(dane);
    })
}
pokazNastepnePytanie();