const sinon = require("sinon");
const assert = require("assert");
const Reservation = require("../models/reservation");
const { getResByCatwayId } = require("../services/reservation");

//tests pour la fonction de service « getResByCatwayId »
describe("getResByCatwayId Service", function () {
  let findStub;

  // Avant chaque test, remplacez la vraie méthode `find` par un stub
  beforeEach(function () {
    findStub = sinon.stub(Reservation, "find");
  });

  // Après chaque test, rétablire la méthode d'origine pour garantir l'absence d'effets secondaires
  afterEach(function () {
    sinon.restore();
  });
// Récupére avec succès les réservations pour un ID de Catway donné
  it("should return reservations for a given catway ID", async function () {
    const catwayId = "catway123"; // Test ID
    const reservations = [
      // Réservation fictives
      {
        _id: "reservation1",
        catwayId,
        clientName: "John Doe",
        checking: new Date(),
        checkout: new Date(),
        boatName: "Boat A",
      },
      {
        _id: "reservation2",
        catwayId,
        clientName: "Jane Doe",
        checking: new Date(),
        checkout: new Date(),
        boatName: "Boat B",
      },
    ];

    // Configurer le stub pour renvoyer les réservations fictives
    findStub.resolves(reservations);

    //Appele la méthode de service avec l'ID du Catway de test
    const result = await getResByCatwayId(catwayId);

    // Affirme que la méthode « find » a été appelée une fois avec l'ID correct
    assert(findStub.calledOnceWith({ catwayId }));

    // Affirme que le résultat correspond aux réservations attendues
    assert.deepStrictEqual(result, reservations);
  });
});