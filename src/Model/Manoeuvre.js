import Metadata from "../ORM/Metadata";
import FamilleManoeuvre from "./FamilleManoeuvre";
import Voile from "./Voile";

export default class Manoeuvre {

    constructor(id, name, famille, voile) {
        this._id = id;
        this._name = name;
        this._famille = famille;
        this._voile = voile;
        let metadata = new Metadata();
        metadata.addIdentifier('id')
            .addField('name')
            .addAssociation('famille', FamilleManoeuvre)
            .addAssociation('voile', Voile);
        this._metadata = metadata;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
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

    get metadata() {
        return this._metadata;
    }
}