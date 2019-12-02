let products = {
	items: [
		{
			id: 1,
			name: 'Product 1',
			description: 'Product1 description',
			price: 19.0
		}
	]
};

module.exports = {
	get(_, res) {
		res.json(products.items);
	},
	getById(req, res) {
		if (!req.params.id) {
			res.json({ error: 'Should receive an id' });
			return;
		}
		let returnProduct;
		const existe = products.items.some(function(el, i) {
			console.log(el.id + ' ' + req.params.id);
			returnProduct = el;
			return el.id == req.params.id;
		});

		if (!existe) {
			res.json({ error: 'id not exist' });
		} else {
			res.json(returnProduct);
		}
	},
	post(req, res) {
		if (!req.body.id) {
			res.json({ error: 'no have id' });
		} else if (!req.body.name) {
			res.json({ error: 'no have name' });
		} else if (req.body.description.length < 10) {
			res.json({ error: 'not enough description' });
		} else if (!(req.body.price > 0)) {
			res.json({ error: 'do not have a positive price' });
		} else {
			const existe = products.items.some(function(el, i) {
				console.log(el.id + ' ' + req.body.id);
				return el.id == req.body.id;
			});
			if (!existe) {
				products.items.push({
					id: req.body.id,
					name: req.body.name,
					description: req.body.description,
					price: req.body.price
				});
				res.json({ success: 'success' });
			} else {
				res.json({ error: 'id already exist' });
			}
		}
	}
};
