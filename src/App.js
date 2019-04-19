import Voile from "./Model/Voile.js";
import Mat from "./Model/Mat.js";
import FamilleManoeuvre from "./Model/FamilleManoeuvre.js";
import Manoeuvre from "./Model/Manoeuvre.js";
import TypePoint from "./Model/TypePoint.js";
import Point from "./Model/Point.js";
import Registry from "./ORM/Registry.js";

export default class App {

    constructor() {
        let registry = new Registry();
        registry.register(FamilleManoeuvre);
        registry.load('/data/famille_manoeuvres.csv', FamilleManoeuvre);
        registry.register(Mat);
        registry.load('/data/mats.csv', Mat);
        registry.register(Voile);
        registry.load('/data/voiles.csv', Voile);
        registry.register(Manoeuvre);
        registry.load('/data/manoeuvres.csv', Manoeuvre);
        registry.register(TypePoint);
        registry.load('/data/type_points.csv', TypePoint);
        registry.register(Point);
        registry.load('/data/points.csv', Point);
        this._registry = registry;
    }

    lancer() {
        this._registry.dump();

        this._draw();

        for (const point of this._registry.findAll(Point)) {
            this._drawPoint(point);
        }
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

    _drawPoint(point) {
        let canvas = document.getElementById("container").getContext("2d");

        canvas.rect(point.x1, point.y1, point.x2 - point.x1, point.y2 - point.y1);
        canvas.stroke();
    }
}