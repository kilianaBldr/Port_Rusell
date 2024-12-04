const assert = require("assert");
const sinon = require("sinon");
const mongoose = require("mongoose");
const Reservation = require("../models/reservation"); // Remplacez par le chemin correct
const {
  getResByCatwayId,
  getResByCatwayAndId,
} = require("../services/reservation"); // Remplacez par le chemin correct

describe("Reservation Service", function () {
  let findStub, findOneStub;

  // Avant chaque test, remplacer `find` et `findOne` par des stubs
  beforeEach(function () {
    findStub = sinon.stub(Reservation, "find");
    findOneStub = sinon.stub(Reservation, "findOne");
  });

  // Après chaque test, restaurer les méthodes originales
  afterEach(function () {
    sinon.restore();
  });
  
  describe("getResByCatwayAndId", function () {
    it("Renvoie les details d'une réservation avec succès", async function () {
      const catwayId = new mongoose.Types.ObjectId();
      const reservationId = new mongoose.Types.ObjectId();
      const reservation = {
        _id: reservationId,
        catwayId,
        clientName: "John Doe",
      };

      // Simuler la réussite de la récupération
      findOneStub.resolves(reservation);

      const result = await getResByCatwayAndId(catwayId, reservationId);

      assert.strictEqual(findOneStub.calledOnce, true, "findOne n'a pas été appelé");
      assert.deepStrictEqual(
        findOneStub.firstCall.args[0],
        { _id: reservationId, catwayId },
        "findOne n'a pas été appelé avec le bon catwayId et reservationId"
      );
      assert.deepStrictEqual(result, reservation, "La réservation retournée ne correspond pas");
    });
  });
});