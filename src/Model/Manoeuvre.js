import Metadata from "../ORM/Metadata.js";
import FamilleManoeuvre from "./FamilleManoeuvre.js";
import Voile from "./Voile.js";

export default class Manoeuvre {

    constructor(id, nom, famille, voile) {
        this._id = id;
        this._nom = nom;
        this._famille = famille;
        this._voile = voile;
    }

    static get metadata() {
        let metadata = new Metadata();
        metadata.addIdentifier('id')
            .addField('nom')
            .addAssociation('famille', FamilleManoeuvre)
            .addAssociation('voile', Voile)
            .setClass(Manoeuvre);

        return metadata;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get nom() {
        return this._nom;
    }

    set nom(value) {
        this._nom = value;
    }

    get famille() {
        return this._famille;
    }

    set famille(value) {
        this._famille = value;
    }

    get voile() {
        return this._voile;
    }

    set voile(value) {
        this._voile = value;
    }
}