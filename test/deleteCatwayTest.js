const sinon = require("sinon"); // Import de sinon pour les stubs
const assert = require("assert"); // Import de assert pour les assertions
const Catway = require("../models/catway");
const services = require("../services/catway"); 

describe("deleteCatwayById", function () {
  let findByIdStub; // Stub pour Catway.findById
  let deleteOneStub; // Stub pour Catway.deleteOne

  beforeEach(() => {
    // Stub des méthodes findById et deleteOne
    findByIdStub = sinon.stub(Catway, "findById");
    deleteOneStub = sinon.stub(Catway, "deleteOne");
  });

  afterEach(() => {
    // Restauration des méthodes d'origine
    sinon.restore();
  });

  // Suppression réussie d'un Catway
  it("Doit supprimer un  Catway avec succès", async function () {
    const fakeCatway = {
      _id: "1",
      catwayNumber: "123",
      catwayState: "available",
      type: "Long",
    };

    // Simuler que le Catway est trouvé
    findByIdStub.resolves(fakeCatway);
    // Simuler que la suppression est réussie
    deleteOneStub.resolves({ deletedCount: 1 });

    const result = await services.deleteCatwayById("1");

    // Vérification du résultat attendu
    assert.deepStrictEqual(result, {
      data: { message: "Catway supprimé avec succès" },
    });
  });
});