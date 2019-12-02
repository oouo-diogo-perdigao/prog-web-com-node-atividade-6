const expect = require("chai").expect;

const { get, getById, post } = require("../../routes/productsController");

let req = {
  body: {},
  params: {}
};

const res = {
  jsonCalledWith: {},
  json(arg) {
    this.jsonCalledWith = arg;
  }
};

describe("Products Route", function() {
  describe("get() function", function() {
    it("should return object with title ", function() {
      get(req, res);
      expect(res.jsonCalledWith).to.have.keys({
        title: "Products page"
      });
    });

    it("should receive return by id ", function() {
      const getReq = req;
      getReq.params = {
        id: 1
      };

      getById(getReq, res);
      expect(res.jsonCalledWith).to.be.have.key("success");
    });

    it("inserir produto ", function() {
      const getReq = req;
      getReq.params = {
        id: 99999,
        name: "Product 2",
        description: "Product1 description",
        price: 19.0
      };

      post(getReq, res);
      expect(res.jsonCalledWith).to.be.have.key("success");
    });

    it("erro ao inserir produto com pouca descrição", function() {
      const getReq = req;
      getReq.params = {
        id: 99999,
        name: "Product 2",
        description: "descripti",
        price: 19.0
      };

      post(getReq, res);
      expect(res.jsonCalledWith).to.be.have.key({ error: "no description" });
    });
    it("erro ao inserir produto com preço errado negativo", function() {
      const getReq = req;
      getReq.params = {
        id: 99999,
        name: "Product 2",
        description: "descripti",
        price: -10
      };

      post(getReq, res);
      expect(res.jsonCalledWith).to.be.have.key({ error: "no description" });
    });
    it("erro ao inserir produto com coisas faltando", function() {
      const getReq = req;
      getReq.params = {
        id: 99999,
        name: "Product 2",
        description: "descripti"
      };

      post(getReq, res);
      expect(res.jsonCalledWith).to.be.have.key("error");
    });
  });
});
