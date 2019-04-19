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
        this._originalImageSize = {width: 791, height: 3351};
        this._imageSize = {height: 1000};
        this._canvasWidth = 800;
        this._newPoints = [];
    }

    lancer() {
        this._registry.dump();

        this._initPointList();

        for (const point of this._registry.findAll(Point)) {
            this._drawPoint(point);
        }
        this._editMode();
    }

    _drawPoint(point) {
        let canvas = document.getElementById("container").getContext("2d");
        const ratio = this._imageSize.height / this._originalImageSize.height;

        canvas.strokeStyle = "#FF0000";
        canvas.rect(point.x1 * ratio + this._canvasWidth / 2 - this._originalImageSize.width * ratio / 2, point.y1 * ratio, (point.x2 - point.x1) * ratio, (point.y2 - point.y1) * ratio);
        canvas.stroke();
    }

    _initPointList() {
        let list = jQuery('#list');

        for (const point of this._registry.findAll(Point)) {
            let pointItem = jQuery('<div>')
                .text(point.manoeuvre.nom);
            list.append(pointItem);
        }
    }

    _editMode() {
        let that = this;
        let pane = jQuery('<canvas>')
            .attr('id', 'edit')
            .attr('width', this._originalImageSize.width)
            .attr('height', this._originalImageSize.height)
            .css('z-index', '2')
            .css('position', 'absolute')
            .css('top', '0')
            .css('background-image', 'url(\'plan-hermione.png\')');
        jQuery('body').append(pane);

        pane.on('click', function (event) {
            console.log(event.offsetX + ' ' + event.offsetY);
            let newPoint = new Point(null, null, event.offsetX, event.offsetY);
            that._newPoints.push(newPoint);
            that._redrawEdit();
        });

        pane.on('mousemove', function (event) {
            let canvas = document.getElementById("edit");
            let context = canvas.getContext("2d");

            that._redrawEdit();
            context.beginPath();
            context.fillStyle = "#0000FF";
            context.arc(event.offsetX, event.offsetY, 5, 0, 2 * Math.PI);
            context.fill();
        });
    }

    _redrawEdit() {
        let canvas = document.getElementById("edit");
        let context = canvas.getContext("2d");

        context.clearRect(0, 0, canvas.width, canvas.height);
        for (const point of this._newPoints) {
            context.beginPath();
            context.fillStyle = "#FF0000";
            context.arc(point.x, point.y, 5, 0, 2 * Math.PI);
            context.fill();
        }
    }
}