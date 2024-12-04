const sinon = require("sinon"); // Importer sinon pour créer des stubs
const assert = require("assert"); // Importer assert pour les assertions
const User = require("../models/user"); 
const services = require("../services/user"); 

describe("updateUserById", function () {
  let findByIdStub; // Stub pour User.findById
  let saveStub; // Stub pour user.save()

  beforeEach(() => {
    // Stub de la méthode User.findById
    findByIdStub = sinon.stub(User, "findById");
    saveStub = sinon.stub(); // Stub pour user.save()
  });

  afterEach(() => {
    // Restauration des méthodes d'origine
    sinon.restore();
  });

  // Mise à jour un utilisateur avec succès
  it("Mise à jour de l'utilisateur avec succès", async function () {
    const fakeUser = {
      _id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      save: saveStub.resolves(), // Simuler un enregistrement réussi
    };

    findByIdStub.resolves(fakeUser); // Simuler la recherche d'un utilisateur
    const updatedData = { name: "Jane Doe", email: "jane.doe@example.com" };

    const result = await services.updateUserById("1", updatedData); // Appel du service

    assert.strictEqual(result.name, updatedData.name); // Vérification du nom mis à jour
    assert.strictEqual(result.email, updatedData.email); // Vérification de l'email mis à jour
  });

});

