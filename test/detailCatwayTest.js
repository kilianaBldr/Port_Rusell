const assert = require("assert");
const sinon = require("sinon");
const mongoose = require("mongoose");
const Catway = require("../models/catway"); // Assurez-vous que le chemin est correct
const { getCatwayById } = require("../services/catway"); // Assurez-vous que le chemin est correct

describe("Catway Service - getCatwayById", function () {
  let findByIdStub;

  // Avant chaque test, remplacer `findById` par un stub
  beforeEach(function () {
    findByIdStub = sinon.stub(Catway, "findById");
  });

  // Après chaque test, restaurer les méthodes originales
  afterEach(function () {
    sinon.restore();
  });

  it("Renvoie avec succès les détails du Catway une fois trouvés", async function () {
    const catwayId = new mongoose.Types.ObjectId();
    const catwayData = {
      _id: catwayId,
      name: "Catway 1",
      location: "Marina Bay",
    };

    // Simuler la réussite de la récupération
    findByIdStub.resolves(catwayData);

    const result = await getCatwayById(catwayId);

    assert.strictEqual(findByIdStub.calledOnce, true, "findById n'a pas été appelé");
    assert.strictEqual(
      findByIdStub.firstCall.args[0].toString(),
      catwayId.toString(),
      "findById n'a pas été appelé avec le bon ID"
    );
    assert.deepStrictEqual(result, { data: catwayData }, "Les détails du Catway retournés ne correspondent pas");
  });
});