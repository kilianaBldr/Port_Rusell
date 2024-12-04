const assert = require("assert");
const sinon = require("sinon");
const mongoose = require("mongoose");
const Reservation = require("../models/reservation"); // Remplacez par le bon chemin
const { deleteResByCatwayAndId } = require("../services/reservation"); // Remplacez par le bon chemin

describe("deleteResByCatwayAndId Service", function () {
  let deleteOneStub;

  // Avant chaque test, remplacer `Reservation.deleteOne` par un stub
  beforeEach(function () {
    deleteOneStub = sinon.stub(Reservation, "deleteOne");
  });

  // Après chaque test, restaurer la méthode originale
  afterEach(function () {
    sinon.restore();
  });

  // Cas 1: Suppression réussie
  it("Supprime la Réservation avec succès", async function () {
    const catwayId = new mongoose.Types.ObjectId();
    const reservationId = new mongoose.Types.ObjectId();

    // Simuler une suppression réussie
    deleteOneStub.resolves({ deletedCount: 1 });

    const result = await deleteResByCatwayAndId(catwayId, reservationId);

    assert.strictEqual(deleteOneStub.calledOnce, true, "deleteOne n'a pas été appelé");
    assert.deepStrictEqual(deleteOneStub.firstCall.args[0], { _id: reservationId, catwayId });
    assert.strictEqual(result.deletedCount, 1, "La suppression n'a pas été effectuée correctement");
  });
});
