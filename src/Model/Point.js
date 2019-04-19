import Metadata from "../ORM/Metadata.js";
import TypePoint from "./TypePoint.js";
import Manoeuvre from "./Manoeuvre.js";

export default class Point {
    constructor(id, manoeuvre, typePoint, x, y) {
        this._id = id;
        this._manoeuvre = manoeuvre;
        this._typePoint = typePoint;
        this._x = x;
        this._y = y;
    }

    static get metadata() {
        let metadata = new Metadata();
        metadata.addIdentifier('id')
            .addField('x')
            .addField('y')
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

    get x() {
        return this._x;
    }

    set x(value) {
        this._x = value;
    }

    get y() {
        return this._y;
    }

    set y(value) {
        this._y = value;
    }
}