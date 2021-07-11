import ListaIgraca from "./listaIgraca.js";

import TimItem from "./timItem.js"; 
var listaIgraca;
//ar daLiJeUcitano = true;
var brojPolja = 10;
var listaKonacno;

var skripticaAjax = document.createElement("script");
skripticaAjax.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js";
document.getElementsByTagName("head")[0].appendChild(skripticaAjax);

//var krajIgre = false
var brojac = 0;

//Pokreni app
document.addEventListener("readystatechange", (event) => {
    if(event.target.readyState ==="complete") {
        initApp();
    }
});

const initApp = () => {
   /* //osluskivaci za tajmer
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
    });*/
    // osluskivaci za kraj unos poena
    const unesiPoene = document.getElementById("unesiPoene");
    unesiPoene.addEventListener("click", (event) => {
        console.log("stisnuo");
        var poeni = document.getElementById("poeni").value;
        //da li je uneto ok
        poeni = parseInt(poeni);

        unesiOstvarenibrojPoena(poeni, listaKonacno.getList()[brojac]);

    });
 
    //proceduralni
    if(listaKonacno == null) {ucitajPodatkeSaLocalStorage();}
    refreshThePage();
    var prvi = document.getElementById(listaKonacno.getList()[0].getTim());
    prvi.style.backgroundColor = "#BCD4EC";
    
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
    //window.localStorage.removeItem("listaIgraca");
    
};

const refreshThePage = () => {
    cleareListDisplay();
    renderList();
    var zaPromenu = document.getElementById(listaKonacno.getList()[brojac].getTim());
    zaPromenu.style.backgroundColor = "#BCD4EC";
    zaPromenu.style.opacity = "1";

   
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
    tr.id = item.getTim();
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


const unesiOstvarenibrojPoena = (poeni, igrac) => {
    console.log("usao u funkciju")
    igrac.updatePoene(poeni);
    if(igrac.getPoeni()>= brojPolja){
        var pobednik = igrac.getTim();
        alert(pobednik);
        window.location = "index.html";
        proglasiPobednika();
    }
    var zaPromenu = document.getElementById(listaKonacno.getList()[brojac].getTim());
    zaPromenu.style.backgroundColor = "";
    if(brojac == listaKonacno.getList().length-1) brojac = 0;
    else brojac++;
    document.getElementById("poeni").value = null;

    refreshThePage();
    pokreniIgru();
};
function pokreniIgru(){
    //sta je loading
   // $('#unesiPapirice').button("loading");
    //promeni IP
    //ucitati ajax
    $.get('http://172.20.222.216:8080/pokreniIgru',
    function(data) {
        if(data.poruka == "OK"){
            alert("Sledeci tim je na potezu");
        }
    } )
}
//POST posalji pobednika
function proglasiPobednika() {
    //data response da li radi
    $.ajax({method:"http://172.20.222.216:8080/proglasiPobednika",data:{'data':listaKonacno.getList()[brojac].getTim()},
        success:function (data) {
            if(data.poruka == "OK") alert("Prikazuje Pobednika");

        },
        error:function (data) {
            alert("Greska kod prikazivanja pobednika!");
        }
})
}