const express = require('express');
const app = express();
const { log } = require('console');
const host = '127.0.0.1';
const port = 5555;
const www = __dirname;
let przekazanePytanie = 0;
let koniecGry = false;
app.listen(port, () =>{
    console.log(`serwer jest tu ${host}:${port}`)
});
app.use(express.static(www));
const pytania = [
    {
        pytanie: 'Warotsc i typ zmiennej w jezyku php sprawdzisz za pomoca funkcji?',
        odpowiedz: ['readfile()','var_dump()','implode()','strlen()'],
        poprawnaodpowiedz: 1,
    },
    {
        pytanie: 'instrukcja for moze byc zastepiona instrukcja',
        odpowiedz: ['foreach','switch','break','case'],
        poprawnaodpowiedz: 0,
    },
    {
        pytanie: 'poprwana animacja moze byc zapisana w formacie',
        odpowiedz: ['gif','png','bmp','jpg'],
        poprawnaodpowiedz: 0,
    },
    {
        pytanie: 'uzytkownik wprowadzil adres zasobu ktorego nie ma na serwerze proba polaczenia wygeneruje blad',
        odpowiedz: ['400','503','500','404'],
        poprawnaodpowiedz: 3,
    },
]
app.get('/quiz_pytanie', (req, res) => {
    if(przekazanePytanie === pytania.length){
        res.json({
            wygrana: true,
        });
    }else{
        if(koniecGry){
            res.json({
                przegrana: true,
            });
        }else{
            let pytanie = pytania[przekazanePytanie].pytanie;
            let odpowiedz = pytania[przekazanePytanie].odpowiedz;
            res.json({
                pytanie,odpowiedz,
            });
        }
    }
});
app.post('/quiz_odpowiedz/:i', (req, res) => {
    if(koniecGry){
        res.json({
            przegrana: true,
        });
    }
    const { i } = req.params;
    const biezacePytanie = pytania[przekazanePytanie];
    if(biezacePytanie.poprawnaodpowiedz === Number(i)){
        przekazanePytanie++;
        res.json({wygrana: true,przekazanePytanie,});
    }
    else{
        res.json({wygrana: false,});
        koniecGry = true;
    }
});