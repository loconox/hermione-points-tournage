export default class Registry {
	constructor() {
		this._metadatas = [];
		this._datas = {};
	}

	getMetadataFor(className) {
		for (let metadata of this._metadatas) {
			if (metadata.class === className) {
				return metadata;
			}
		}

		return null;
	}

	register(klass) {
		this._metadatas.push(klass.metadata);
		this._datas[klass.name] = [];
	}

	load(filename, klass) {
		let that = this;

		jQuery.ajax({
			url: filename,
			async: false,
		})
			.done(function(file) {
				let lines = file.split("\n");
				for (const line of lines) {
					const attributes = line.split(',');
					let object = new klass(...attributes);
					let metadata = klass.metadata;

					for (const field in metadata.associations) {
						if (metadata.associations.hasOwnProperty(field)) {
							const association = metadata.associations[field];
							const assocMetadata = association.class.metadata;
							object[association.fieldName] = that.find(association.class, assocMetadata.getIdentifierValue(object));
						}
					}

					that._datas[klass.name].push(object);
				}
			});
	}

	find(klass, identifier) {
		const metadata = klass.metadata;
		if (typeof this._datas[klass.name] === 'undefined') {
			console.error('Aucun objet de type ' + klass.name + ' enregistré');
		}
		for (let object of this._datas[klass.name]) {
			if (object[metadata.identifier] === identifier) {
				return object;
			}
		}

		return null;
	}

	findAll(klass) {
		if (typeof this._datas[klass.name] === 'undefined') {
			console.error('Aucun objet de type ' + klass.name + ' enregistré');
		}

		return this._datas[klass.name];
	}

	dump() {
		for (const klass in this._datas) {
			if (this._datas.hasOwnProperty(klass)) {
				console.log(this._datas[klass].length + ' ' + klass + ' chargé.e.s');
				console.log(this._datas[klass]);
			}
		}
	}
}