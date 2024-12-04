const sinon = require("sinon"); // Importer sinon pour les stubs
const assert = require("assert"); // Importer assert pour les assertions
const Catway = require("../models/catway"); // Importer le modèle Catway
const services = require("../services/catway"); // Importer le service Catway

describe("updateCatwayById", function () {
  let findByIdStub; // Stub pour Catway.findById
  let saveStub; // Stub pour catway.save

  beforeEach(() => {
    // Stub pour la méthode findById du modèle Catway
    findByIdStub = sinon.stub(Catway, "findById");
    // Stub pour la méthode save du modèle Catway
    saveStub = sinon.stub(Catway.prototype, "save");
  });

  afterEach(() => {
    // Restauration des méthodes originales
    sinon.restore();
  });

  // Mise à jour réussie d'un Catway
  it("Mise à jour d'un Catway avec succès", async function () {
    const fakeCatway = {
      _id: "1",
      catwayNumber: "123",
      catwayState: "available",
      type: "Long",
      save: saveStub.resolves(), // Simuler que la sauvegarde fonctionne
    };

    // Simuler que le Catway est trouvé
    findByIdStub.resolves(fakeCatway);

    const updateData = { catwayState: "occupied" };

    const result = await services.updateCatwayById("1", updateData);

    // Vérification du résultat attendu
    assert.deepStrictEqual(result, {
      data: { ...fakeCatway, ...updateData },
    });
  });
});