const assert = require("assert");
const sinon = require("sinon");
const mongoose = require("mongoose");
const Reservation = require("../models/reservation");
const { createReservation } = require("../services/reservation");

describe("createReservation Service", function () {
  let saveStub;

  // Setup before each test: remplace Reservation.prototype.save avec un stub
  beforeEach(function () {
    saveStub = sinon.stub(Reservation.prototype, "save");
  });

  // Cleanup après chaque test : rétablit les méthodes originales
  afterEach(function () {
    sinon.restore();
  });

  // Test : Création réussie de la réservation
  it("Ajoute une nouvelle réservation avec succès", async function () {
    const reservationData = {
      catwayId: new mongoose.Types.ObjectId(),
      clientName: "John Doe",
      checkIn: new Date(),
      checkOut: new Date(Date.now() + 24 * 60 * 60 * 1000),
      boatName: "The Men",
    };

    const expectedReservation = {
      _id: new mongoose.Types.ObjectId(),
      ...reservationData,
    };

    // Configure le stub pour retourner les mêmes données simulées
    saveStub.resolves(expectedReservation);

    const result = await createReservation(
      reservationData.catwayId,
      reservationData.clientName,
      reservationData.checkIn,
      reservationData.checkOut,
      reservationData.boatName
    );

    // Vérifie si `save` a été appelé
    assert.strictEqual(saveStub.calledOnce, true);

    // Vérifie si les données retournées sont celles attendues
    assert.strictEqual(
      result.catwayId.toString(),
      reservationData.catwayId.toString()
    );
    assert.strictEqual(result.clientName, reservationData.clientName);
    assert.strictEqual(
      result.checkIn.toISOString(),
      reservationData.checkIn.toISOString()
    );
    assert.strictEqual(
      result.checkOut.toISOString(),
      reservationData.checkOut.toISOString()
    );
    assert.strictEqual(result.boatName, reservationData.boatName);
  });
});