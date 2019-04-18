import Voile from "./Model/Voile.js";
import Mat from "./Model/Mat.js";
import FamilleManoeuvre from "./Model/FamilleManoeuvre.js";
import Manoeuvre from "./Model/Manoeuvre.js";
import TypePoint from "./Model/TypePoint.js";
import Point from "./Model/Point.js";

export default class App {

    constructor() {
        this._voiles = [];
        this._mats = [];
        this._familleManoeuvres = [];
        this._manoeuvres = [];
        this._typePoints = [];
        this._points = [];
    }

    lancer() {
        this._voiles = this._chargerData('/data/voiles.csv', Voile);
        console.log(this._voiles.length + ' voiles chargées');
        this._mats = this._chargerData('/data/mats.csv', Mat);
        console.log(this._mats.length + ' mâts chargés');
        this._familleManoeuvres = this._chargerData('/data/famille_manoeuvres.csv', FamilleManoeuvre);
        console.log(this._familleManoeuvres.length + ' famille de manoeuvres chargées');
        this._manoeuvres = this._chargerData('/data/manoeuvres.csv', Manoeuvre);

        console.log(this._manoeuvres.length + ' manoeuvres chargées');
        this._typePoints = this._chargerData('/data/type_points.csv', TypePoint);
        console.log(this._typePoints.length + ' types de point de tournage chargés');
        this._points = this._chargerData('/data/points.csv', Point);
        console.log(this._points.length + ' points de tournage chargés');

        this._draw();

    }

    _chargerData(filename, klass) {
        let result = [];

        jQuery.ajax({
            url: filename,
            async: false
        })
            .done(function (file) {
                let lines = file.split("\n");
                for (const line of lines) {
                    const attributes = line.split(',');
                    let object = new klass(...attributes);
                    result.push(object);
                }
            });

        return result;
    }

    _drawElements(elements) {
        let canvas = document.getElementById("container").getContext("2d");

        for (const element of elements) {
            canvas.font = "5px Arial";
            canvas.fillText("#", element.position.x, element.position.y);
        }
    }

    _initCanvas() {
        let canvas = document.getElementById("container").getContext("2d");

        canvas.moveTo(50, 0);
        canvas.lineTo(50, 200);
        canvas.stroke();
    }

    _draw() {
        let elements = [
            {
                label: "Toto",
                position: {
                    x: 100,
                    y: 50
                }
            },
            {
                label: "Titi",
                position: {x: 120, y: 70}
            }
        ];
        elements.sort(function (a, b) {
            if (a.position.x === b.position.y) {
                return 0;
            }

            return a.position.x > b.position.y ? 1 : -1;
        });

        this._initCanvas();
        this._drawElements(elements);
    }
}