const Reservation = require("../models/reservation");

/**
 * Obtenez toutes les réservations pour un Catway spécifique par son ID.
 * @param {string} catwayId - L'ID du Catway
 * @returns {Promise<Array>} - 
 *Une promesse qui se résout en une série de réserves.
 */
exports.getResByCatwayId = async (catwayId) => {
  try {
    const reservations = await Reservation.find({ catwayId });
    return reservations;
  } catch (error) {
    console.error("Erreur dans getResByCatwayId:", error);
    throw new Error("Impossible d'obtenir des réservations par ID du Catway");
  }
};

/**
 * * Obtenez une réservation unique par son identifiant et son identifiant du Catway.
 * @param {string} catwayId - L'ID du Catway.
 * @param {string} reservationId - L'ID de la réservation.
 * @returns {Promise<Object|null>} - 
 * Une promesse qui résout la réservation ou est nulle si elle n'est pas trouvée.
 */
exports.getResByCatwayAndId = async (catwayId, reservationId) => {
  try {
    const reservation = await Reservation.findOne({
      _id: reservationId,
      catwayId,
    });
    return reservation;
  } catch (error) {
    console.error("Erreur dans getResByCatwayAndId:", error);
    throw new Error("Impossible d'obtenir la réservation par l'ID du Catway et l'ID de réservation");
  }
};

/**
 * Créez une nouvelle réservation pour un Catway spécifique.
 * @param {string} catwayId - L'ID du Catway .
 * @param {string} clientName - The name of the client.
 * @param {Date} checking - La date d'arrivée.
 * @param {Date} checkout - La date de départ.
 * @param {string} boatName - Le nom du bateau du client.
 * @returns {Promise<Object>} - 
 * Une promesse qui se résout à la réservation nouvellement créée.
 */
exports.createReservation = async (
  catwayId,
  clientName,
  checking,
  checkout,
  boatName
) => {
  try {
    const newReservation = new Reservation({
      catwayId,
      clientName,
      checking,
      checkout,
      boatName,
    });
    await newReservation.save();
    return newReservation;
  } catch (error) {
    console.error("Erreur dans createReservation:", error);
    throw new Error("Échec de la création de la réservation");
  }
};

/**
 *Supprimer une réservation par son ID et son ID de Catway.
 * @param {string} catwayId - L'ID du Catway
 * @param {string} reservationId -L'ID de la réservation.
 * @returns {Promise<Object>} - 
 *Une promesse qui résout le résultat de la suppression.
 */
exports.deleteResByCatwayAndId = async (catwayId, reservationId) => {
  try {
    const result = await Reservation.deleteOne({
      _id: reservationId,
      catwayId,
    });
    if (result.deletedCount === 0) {
      throw new Error("Aucune réservation trouvée à supprimer");
    }
    return result;
  } catch (error) {
    console.error("Erreur dans deleteResByCatwayAndId:", error);
    throw new Error("Échec de la suppression de la réservation par l'Id du Catway et l'Id de réservation");
  }
};