import ListaIgraca from "./listaIgraca.js";

import TimItem from "./timItem.js"; 

var listaIgraca;
var brojPapirica = 0;
var listaKonacno = new ListaIgraca();

//Pokreni app
document.addEventListener("readystatechange", (event) => {
    if(event.target.readyState ==="complete") {
        initApp();
    }
});

const initApp = () => {
    //osluskivaci za tajmer
    const pokretacTajmera = document.getElementById("start");
    pokretacTajmera.addEventListener("click", (event) => {
        event.preventDefault;
        start();
    });
    const pauzirajTajmer = document.getElementById("pause");
    pauzirajTajmer.addEventListener("click", (event) => {
        event.preventDefault;
        pause();
    });
    const resetujTajmer = document.getElementById("reset");
    resetujTajmer.addEventListener("click", (event) => {
        event.preventDefault;
        reset();
    });
    // osluskivaci za kraj runde
    const krajRunde1 = document.getElementById("krajRunde1");
    krajRunde1.addEventListener("click", (event) => {
        event.preventDefault;
        startujUnosPodataka();
    });
    if(document.getElementById("preracunaj") != null) {
    const unesiPoene = document.getElementById("preracunaj");
    unesiPoene.addEventListener("click", (event) => {
        event.preventDefault();
        //TODO: proveri da li se poklapaju papirici
        apdejtujPoene();
        refreshThePage();
        });
        
    }
    //proceduralni
    ucitajPodatkeSaLocalStorage();
    refreshThePage();
    //zapocniIgru();
    
};

const ucitajPodatkeSaLocalStorage = () => {
    listaIgraca = JSON.parse(localStorage.getItem("listaIgraca"));
    for(let i = 0; i < listaIgraca._list.length; i++){
        //console.log(listaIgraca._list[i]);
        let privremeni = new TimItem();
        privremeni.setTim(listaIgraca._list[i]._imeTima);
        privremeni.setIgrac1(listaIgraca._list[i]._igrac1);
        privremeni.setIgrac2(listaIgraca._list[i]._igrac2);
        listaKonacno.addItemToList(privremeni);
        //console.log(listaKonacno);
    }
    //provera da li je ucitao
   // console.log(listaIgraca);
    brojPapirica = JSON.parse(localStorage.getItem("brojPapirica"));
    brojPapirica *= listaKonacno.getList().length * 2;
    console.log(brojPapirica);
};

const refreshThePage = () => {
    cleareListDisplay();
    renderList();
   
};
const cleareListDisplay = () => {
    //definisemo parenta
    const parentElement = document.getElementById("timovi_poeni");
    deleteContents(parentElement);
};

const renderList = () => {
    const list = listaKonacno.getList();
    list.forEach(item => {
        buildListItem(item);
    });
 };
const buildListItem = (item) => {
    const tr = document.createElement("tr");
    tr.className = "red";
    const td = document.createElement("td");
    td.className = "imeTima";
    const td2 = document.createElement("td");
    td2.className = "poeni";
    
    //dodaj im vrednosti elementa
    td.textContent = item.getTim();
    td2.textContent = item.getPoeni();

    tr.appendChild(td);
    tr.appendChild(td2);
    const container = document.getElementById("timovi_poeni");
    container.appendChild(tr);
};
const deleteContents = (parentElement) => {
    let child = parentElement.lastElementChild;
    while(child) {
        parentElement.removeChild(child);
        child = parentElement.lastElementChild;
    }

};


//funkcije tajmera



var second = 60;
var millisecond = 0;

let cron;

function start() {
    pause();
    cron = setInterval(() => { timer(); }, 10); 
};

function pause() {
    clearInterval(cron);
};
function reset() {
    
    second = 60;
    millisecond = 0;
    document.getElementById('second').innerText = '60';
    pause();
    
}
function timer() {
    if ((millisecond  += 10) == 1000) {
      millisecond = 0;
      second--;
    }
    if (second == 0) {
      // nesto se desava
      pause();
    }
    
    document.getElementById('second').innerText = returnData(second);
}
function returnData(input) {
    return input < 10 ? input : `${input}`
}

//unos poena po kraju runde
const startujUnosPodataka = () => {
    for(let i = 0; i < listaKonacno.getList().length; i++) {
        createInputForm(listaKonacno.getList()[i]._imeTima);
    }
    dodajDugme();
    otvoriProzorceZaPapirice();

};
const createInputForm = (imeTima) => {
    const labela = document.createElement("label");
    labela.textContent = imeTima;
    console.log(imeTima);
    const unos = document.createElement("input");
    unos.id = imeTima;
    unos.type = "number";
    unos.min = "0";
    unos.max = brojPapirica;
    //dodaj im class ako treba!!!
    const container = document.getElementById("forma-za-unos-poena");
    container.appendChild(labela);
    container.appendChild(unos);

};
const otvoriProzorceZaPapirice = () => {
    document.querySelector('.bg-model').style.display = "flex";
   //focusiraj
   document.getElementById("bg-model").scrollIntoView({behavior: "smooth"});
   
};
const dodajDugme = () => {
    const dugme = document.createElement("button");
    dugme.id = "preracunaj";
    dugme.className = "btn btn-danger btn-block";
    dugme.textContent = "Unesi poene";
    const container = document.getElementById("forma-za-unos-poena");
    container.appendChild(dugme);
}
//sredi ovo!
/*const apdejtujPoene = () => {
    for(let i = 0; i < listaKonacno.getList().length; i++) {
        const imeTima = listaKonacno.getList()[i].getTim();
        
        console.log(imeTima);
        console.log(document.getElementById(imeTima).value);
        listaKonacno.getList()[i].updatePoene(document.getElementById(imeTima).value);
        console.log(listaKonacno.getList()[i]._poeni);
    }
};
  */
