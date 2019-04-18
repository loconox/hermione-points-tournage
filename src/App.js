import Voile from "./Model/Voile.js";
import Mat from "./Model/Mat.js";
import FamilleManoeuvre from "./Model/FamilleManoeuvre.js";
import Manoeuvre from "./Model/Manoeuvre.js";

export default class App {

	constructor() {
		this._voiles = [];
		this._mats = [];
		this._familleManoeuvres = [];
		this._manoeuvres = [];
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
	}

	_chargerData(filename, klass) {
		let result = [];

		jQuery.ajax({
			url: filename,
			async: false
		})
			.done(function(file) {
				let lines = file.split("\n");
				for (const line of lines) {
					const attributes = line.split(',');
					let object = new klass(...attributes);
					result.push(object);
				}
			});

		return result;
	}
}