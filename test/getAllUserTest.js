const assert = require("assert");
const sinon = require("sinon");
const User = require("../models/user");
const { getAllUsers } = require("../services/user");

describe("User Service - getAllUsers", function () {
  let findStub;

  //Avant chaque test, remplacez la vraie méthode `find` par un stub
  beforeEach(function () {
    findStub = sinon.stub(User, "find");
  });

  //Apre chaque test, remplacez la vraie méthode 'find' par un stub
  afterEach(function () {
    sinon.restore();
  });

  it("Renvoie tous les utilisateurs avec succès", async function () {
    const users = [
      { _id: "1", name: "Alice", email: "alice@example.com" },
      { _id: "2", name: "Bob", email: "bob@example.com" },
    ];

    findStub.resolves(users);

    const result = await getAllUsers();

    assert.strictEqual(findStub.calledOnce, true);
    assert.deepStrictEqual(result, users, "Les utilisateurs renvoyés ne correspondent pas aux données attendues");
  });
});