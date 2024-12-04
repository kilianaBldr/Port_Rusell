const assert = require("assert");
const sinon = require("sinon");
const Catway = require("../models/catway");
const { getAllCatways } = require("../services/catway");

describe("Catway Service - getAllCatways", function () {
  let findStub;

  beforeEach(function () {
    findStub = sinon.stub(Catway, "find");
  });

  afterEach(function () {
    sinon.restore();
  });

  it("Retourne tous les catways avec succès", async function () {
    const catways = [
      { _id: "1", name: "Catway 1", location: "Marina Bay" },
      { _id: "2", name: "Catway 2", location: "Dockyard" },
    ];

    findStub.resolves(catways);

    const result = await getAllCatways();

    assert.strictEqual(findStub.calledOnce, true);
    assert.deepStrictEqual(result, { data: catways }, "Les catways renvoyés ne correspondent pas aux données attendues");
  });
});
