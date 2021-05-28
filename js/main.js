import ListaIgraca from "./listaIgraca.js";
import TimItem from "./timItem.js"; 

const listaIgraca = new ListaIgraca();
var brojPapirica = 0;

//Pokreni app
document.addEventListener("readystatechange", (event) => {
    if(event.target.readyState ==="complete") {
        initApp();
    }
});

const initApp = () => {
    //Dodaj osluskivace
    const itemEntryForm = document.getElementById("sacuvajTimBtn");
    itemEntryForm.addEventListener("click", (event) => {
        event.preventDefault();
        processSubmission();
    });
    const sacuvajTimoveNaLokalnuMemoriju = document.getElementById("igrajBtn");
    sacuvajTimoveNaLokalnuMemoriju.addEventListener("click",(event) => {
        event.preventDefault();
        startGame();
    });
    const pokreniIgruAsocijacija = document.querySelector(".close");
    pokreniIgruAsocijacija.addEventListener("click", (event) => {
        event.preventDefault();
        
        document.querySelector(".bg-model").style.display = "none";
       
    });
    const sacuvajPapirice = document.getElementById("unesiPapirice");
    sacuvajPapirice.addEventListener("click", (event) => {
        event.preventDefault();
        // TODO: provera da li je sve oki
        brojPapirica = document.getElementById("brojPapirica").value;
        //sacuvaj broj papirica
        localStorage.setItem("brojPapirica", JSON.stringify(brojPapirica));
        window.location.replace("igraAsocijacije.html");
    })
    //Procedural
    //load list object
    refreshThePage();
};
//refresh
const refreshThePage = () => {
    cleareListDisplay();
   renderList();
   clearItemEntryField()
   //setFocusOnItemEntry();
};

const cleareListDisplay = () => {
    //definisemo parenta
    const parentElement = document.getElementById("timovi_podaci");
    deleteContents(parentElement);
};

const deleteContents = (parentElement) => {
    let child = parentElement.lastElementChild;
    while(child) {
        parentElement.removeChild(child);
        child = parentElement.lastElementChild;
    }

};

//render
const renderList = () => {
 const list = listaIgraca.getList();
 list.forEach(item => {
     buildListItem(item);
 });
};

const buildListItem = (item) => {
    const th = document.createElement("tr");
    th.className = "red";
    const td = document.createElement("td");
    td.className = "imeTima";
    const td2 = document.createElement("td");
    td2.className = "igrac1";
    const td3 = document.createElement("td");
    td3.className = "igrac2";
    //dodaj im vrednosti elementa
    td.textContent = item.getTim();
    td2.textContent = item.getIgrac1();
    td3.textContent = item.getIgrac2();

    th.appendChild(td);
    th.appendChild(td2);
    th.appendChild(td3);
    const container = document.getElementById("timovi_podaci");
    container.appendChild(th);
};
//clearItemEntry

const clearItemEntryField = () => {
    document.getElementById("tim").value = "";
    document.getElementById("igrac1").value = "";
    document.getElementById("igrac2").value = "";
};

const processSubmission = () => {
    const newEntryTextTim = getnewEntryTim();
    const newEntryTextIgrac1 = getnewEntryIgrac1();
    const newEntryTextIgrac2 = getnewEntryIgrac2();
    if(!newEntryTextTim.length || !newEntryTextIgrac1.length || !newEntryTextIgrac2) return;

    //napravi tim
    const toDoItem  = createNewTim(newEntryTextTim, newEntryTextIgrac1, newEntryTextIgrac2);
    listaIgraca.addItemToList(toDoItem);
    //apdejtuj podatke
    refreshThePage();
};

const getnewEntryTim = () => {
    return document.getElementById("tim").value.trim();
};
const getnewEntryIgrac1 = () => {
    return document.getElementById("igrac1").value.trim();
};
const getnewEntryIgrac2 = () => {
    return document.getElementById("igrac2").value.trim();
};

const createNewTim = (tim,igrac1,igrac2) => {

    const newTim  = new TimItem();
    newTim.setTim(tim);
    newTim.setIgrac1(igrac1);
    newTim.setIgrac2(igrac2);
    

    return newTim;

};
const startGame = () => {
    if(listaIgraca.getList().length < 2) return;
    localStorage.setItem('listaIgraca', JSON.stringify(listaIgraca));
    otvoriProzorceZaPapirice();
    
};
const asocijacijeIgraj = () => {
    
    //otvori prozorce za vreme
    //otvori prozorce za unosPoena

};

const otvoriProzorceZaPapirice = () => {
     document.querySelector('.bg-model').style.display = "flex";
    //focusiraj
    document.getElementById("bg-model").scrollIntoView({behavior: "smooth"});
    
};