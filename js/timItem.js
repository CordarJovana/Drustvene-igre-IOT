export default class TimItem {

    constructor() {
        this._imeTima = "";
        this._igrac1 = "";
        this._igrac2 = "";
        this._brojPoean = 0;
    }

    //geteri
    getTim() {
        return this._imeTima;
    }
    getIgrac1() {
        return this._igrac1;
    }

    getIgrac2() {
        return this._igrac2;
    }

    getPoeni() {
        return this._brojPoean;
    }

    //seteri
    setTim(imeTima) {
        this._imeTima = imeTima;
    }

    setIgrac1(igrac1) {
        this._igrac1 = igrac1;
    }

    setIgrac2(igrac2) {
        this._igrac2 = igrac2;
    }

    updatePoene(poeni) {
        this._brojPoean += poeni;
    }

}