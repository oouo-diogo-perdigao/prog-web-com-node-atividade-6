let products = {
  items: [
    {
      id: 1,
      name: "Product 1",
      description: "Product1 description",
      price: 19.0
    }
  ]
};

module.exports = {
  get(_, res) {
    res.json({ title: "Products page" });
  },
  getById(req, res) {
    if (!req.params.id) {
      res.json({ error: "Should receive an id" });
    }

    res.json({ success: "Id received!" });
  },
  post(req, res) {
    if (!req.params.id) {
      res.json({ error: "no id" });
    } else if (!req.params.name) {
      res.json({ error: "no name" });
    } else if (req.params.description.length < 10) {
      res.json({ error: "no description" });
    } else if (!(req.params.price > 0)) {
      res.json({ error: "no price" });
    } else {
      let pro = {
        id: req.params.id,
        name: req.params.name,
        description: req.params.description,
        price: req.params.price
      };
      products.items.push(pro);

      res.json({ success: "success" });
    }
  }
};
