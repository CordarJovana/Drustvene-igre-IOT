import ListaIgraca from "./listaIgraca.js";

import TimItem from "./timItem.js"; 
//da li je ok prikljucen AJAX?
var skripticaAjax = document.createElement("script");
skripticaAjax.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js";
document.getElementsByTagName("head")[0].appendChild(skripticaAjax);

var listaIgraca;
var daLiJeUcitano = true;
var brojPapirica = 0;
var listaKonacno;

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
        pokreniIgru();
    });
    // osluskivaci za kraj runde
    const krajRunde1 = document.getElementById("krajRunde1");
    krajRunde1.addEventListener("click", (event) => {
        event.preventDefault;
        startujUnosPodataka();
        dugmePreracunaj("krajRunde1");
        

    });
    const krajRunde2 = document.getElementById("krajRunde2");
    krajRunde2.addEventListener("click",(event) => {
        event.preventDefault;
        startujUnosPodataka();
        dugmePreracunaj("krajRunde2");
    });
    const krajIgre = document.getElementById("krajIgre");
    krajIgre.addEventListener("click",(event) => {
        event.preventDefault;
        startujUnosPodataka();
        dugmePreracunaj("krajIgre");
        sortiraj();
        refreshThePage();
        proglasiPobednika();
    });
    /*if(document.getElementById("preracunaj") != null){
    const unesiPoene = document.getElementById("preracunaj");
    unesiPoene.addEventListener("click", (event) => {
        event.preventDefault();
        //TODO: proveri da li se poklapaju papirici
        apdejtujPoene();
        refreshThePage();
        
        });
    }*/
        
    
    //proceduralni
    if(listaKonacno == null) {ucitajPodatkeSaLocalStorage();}
    refreshThePage();
    //zapocniIgru();
    
};

const ucitajPodatkeSaLocalStorage = () => {
    listaIgraca = JSON.parse(localStorage.getItem("listaIgraca"));
    listaKonacno = new ListaIgraca();
    for(let i = 0; i < listaIgraca._list.length; i++){
        //console.log(listaIgraca._list[i]);
        let privremeni = new TimItem();
        privremeni.setTim(listaIgraca._list[i]._imeTima);
        privremeni.setIgrac1(listaIgraca._list[i]._igrac1);
        privremeni.setIgrac2(listaIgraca._list[i]._igrac2);
        //console.log(privremeni);
        listaKonacno.addItemToList(privremeni);
        //console.log(listaKonacno);
    }
    //provera da li je ucitao
   // console.log(listaIgraca);
    brojPapirica = JSON.parse(localStorage.getItem("brojPapirica"));
    brojPapirica = parseInt(brojPapirica);
    brojPapirica = 2 * brojPapirica * listaKonacno.getList().length;
    console.log(brojPapirica);
   // window.localStorage.removeItem("listaIgraca");
    //window.localStorage.removeItem("brojPapirica");
};

const refreshThePage = () => {
    cleareListDisplay();
    renderList();
   
};

const cleareListDisplay2 = (nazivDugmeta) => {
    document.querySelector('.bg-model').style.display = "none";
    const parentElement = document.getElementById("forma-za-unos-poena");
    deleteContents(parentElement);
    //disable kraj runde 1 btn
    disejblujDugme(nazivDugmeta);
}
const cleareListDisplay = () => {
    //definisemo parenta
    const parentElement = document.getElementById("timovi_poeni");
    deleteContents(parentElement);
};
const disejblujDugme = (nazivDugmeta) => {
    document.getElementById(nazivDugmeta).disabled = true;
}
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
const apdejtujPoene = () => {
   if(!proveraBrojeva()) return false;
    for(let i = 0; i < listaKonacno.getList().length; i++){
        const ime  = listaKonacno.getList()[i].getTim();
        const vrednost = parseInt(document.getElementById(ime).value);
        //console.log(document.getElementById(ime).value);
        listaKonacno.getList()[i].updatePoene(vrednost);
    }
   refreshThePage();
   return true;
};

const dugmePreracunaj = (nazivDugmeta) => {
    if(document.getElementById("preracunaj") != null){
        const unesiPoene = document.getElementById("preracunaj");
        unesiPoene.addEventListener("click", (event) => {
            event.preventDefault();
            //TODO: proveri da li se poklapaju papirici
            if(!apdejtujPoene()) return;
            cleareListDisplay2(nazivDugmeta);
            
        });
    }
    else return;
            
}
const sortiraj = () => {
    BubbleSort(listaKonacno.getList());
}
const BubbleSort = (lista) => {
    var itemMoved = false;
    do {
        itemMoved = false;
        for(let i = 0; i < lista.length - 1; i++){
            if(lista[i].getPoeni() < lista[i+1].getPoeni()){
                var higherValue = lista[i+1];
                lista[i+1] = lista[i];
                lista[i] = higherValue;
                itemMoved = true
            }
        }
    }while(itemMoved)

}
function pokreniIgru(){
    //sta je loading
   // $('#unesiPapirice').button("loading");
    //promeni IP
    //ucitati ajax
    $.get('http://172.20.222.216:8080/pokreniIgru',
    function(data) {
        if(data.poruka == "OK"){
            alert("Prvi tim je na potezu");
        }
    } )
}
function proglasiPobednika() {
    //data response da li radi
    $.ajax({method:"http://172.20.222.216:8080/proglasiPobednika",data:{'data':listaKonacno.getList()[0].getTim()},
        success:function (data) {
            if(data.poruka == "OK") alert("Prikazuje Pobednika");

        },
        error:function (data) {
            alert("Greska kod prikazivanja pobednika!");
        }
})
}
const proveraBrojeva = () => {
    var ukupno = 0
    for(let i = 0; i < listaKonacno.getList().length; i++) {
        const ime  = listaKonacno.getList()[i].getTim();
        const vrednostZaProveru = document.getElementById(ime).value;
        if(Number.isInteger(parseInt(vrednostZaProveru)) == false) {alert("NISTE LEPO UNELI BROJEVE"); return false;}
        ukupno += parseInt(vrednostZaProveru)
    }
    if(ukupno == brojPapirica) return true;
    else {alert("PAPIRICI SE NE POKLAPAJU"); return false;}
}
//const ubaciMestaUTabelu =() =>
