import Metadata from "../ORM/Metadata.js";
import TypePoint from "./TypePoint.js";
import Manoeuvre from "./Manoeuvre.js";

export default class Point {
    constructor(id, manoeuvre, typePoint, x1, y1, x2, y2) {
        this._id = id;
        this._manoeuvre = manoeuvre;
        this._typePoint = typePoint;
        this._x1 = x1;
        this._y1 = y1;
        this._x2 = x2;
        this._y2 = y2;
    }

    static get metadata() {
        let metadata = new Metadata();
        metadata.addIdentifier('id')
            .addField('x1')
            .addField('y1')
            .addField('x2')
            .addField('y2')
            .addAssociation('manoeuvre', Manoeuvre)
            .addAssociation('typePoint', TypePoint)
            .setClass(Point);

        return metadata;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get manoeuvre() {
        return this._manoeuvre;
    }

    set manoeuvre(value) {
        this._manoeuvre = value;
    }

    get typePoint() {
        return this._typePoint;
    }

    set typePoint(value) {
        this._typePoint = value;
    }

    get x1() {
        return this._x1;
    }

    set x1(value) {
        this._x1 = value;
    }

    get y1() {
        return this._y1;
    }

    set y1(value) {
        this._y1 = value;
    }

    get x2() {
        return this._x2;
    }

    set x2(value) {
        this._x2 = value;
    }

    get y2() {
        return this._y2;
    }

    set y2(value) {
        this._y2 = value;
    }
}