const sinon = require("sinon"); // Importer sinon pour créer des stubs
const assert = require("assert"); // Importer assert pour les assertions
const User = require("../models/user"); // Importer le modèle utilisateur
const services = require("../services/user"); // Importer le service utilisateur

describe("deleteUserById", function () {
  let findByIdStub; // Stub pour User.findById
  let deleteOneStub; // Stub pour User.deleteOne

  beforeEach(() => {
    // Stubs pour les méthodes User.findById et User.deleteOne
    findByIdStub = sinon.stub(User, "findById");
    deleteOneStub = sinon.stub(User, "deleteOne");
  });

  afterEach(() => {
    // Restauration des méthodes originales
    sinon.restore();
  });

  // Suppression réussie d'un utilisateur
  it("Supprime un utilisateur avec succès", async function () {
    const fakeUser = { _id: "1", name: "John Doe", email: "john.doe@example.com" };

    // Simuler la recherche et la suppression réussie
    findByIdStub.resolves(fakeUser);
    deleteOneStub.resolves({ deletedCount: 1 });

    const result = await services.deleteUserById("1");

    assert.deepStrictEqual(result, {
      message: "L'utilisateur a été supprimé avec succès",
    }); // Vérification du résultat
  });
});

