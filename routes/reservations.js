const express = require("express");
const router = express.Router();
const reservationService = require("../services/reservation");
const Reservations = require("../models/reservation");
const private = require("../middlewares/private");

// Routepour rendre toutes les réservations dans une vue
router.get("/view", private.checkJWT, async (req, res) => {
  try {
    // Récupere toutes les réservations de la base de données
    const reservations = await Reservations.find();
    // rendre le modele "réservations" de Views avec les données de réservations
    res.render("reservations", { reservations });
  } catch (err) {
    console.error("Erreur dans getAllReservations:", err.message);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

// Route pour obtenir toutes les réservation au format JSON
router.get("/", private.checkJWT, async (req, res) => {
  try {
    // Récupere toutes les réservationsde la base de données
    const reservations = await Reservations.find();
    // Envoie les données de réservationau format JSON
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route pour obtenir une réservation par son ID
router.get("/:id", private.checkJWT, async (req, res) => {
  const reservationId = req.params.id;

  try {
    // Récupère une réservation spécifique par son ID à partir de la base de données
    const reservation = await Reservations.findById(reservationId);
    if (!reservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }
    // Envoie les données de réservation au format JSON
    res.json(reservation);
  } catch (error) {
    console.error("Erreur lors de la récupération des détails de la réservation:", error.message);
    res.status(500).json({ error: "Erreur lors de la récupération des détails de la réservation" });
  }
});

// Route pour obtenir toutes les réservations réaliser par un Catway spécifique
router.get("/:id/reservations", private.checkJWT, async (req, res) => {
  const catwayId = req.params.id;

  try {
    // Recupère les réservations d'un Catway spécifique à l'aide du service
    const reservations = await reservationService.getResByCatwayId(catwayId);
    // Envoie les données de réservation au format JSON
    res.status(200).json(reservations);
  } catch (error) {
    console.error("Erreur lors de la récupération des réservations:", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

// Route pour obtenir une réservation spécifique pour un catway spécifique
router.get(
  "/:id/reservations/:idReservation",
  private.checkJWT,
  async (req, res) => {
    const catwayId = req.params.id;
    const reservationId = req.params.idReservation;

    try {
      // Récupere une réservation spécifique pour un Catway spécifique a l'aide du service
      const reservation = await reservationService.getResByCatwayAndId(
        catwayId,
        reservationId
      );

      if (reservation) {
        // Envoie les données au format JSON
        res.status(200).json(reservation);
      } else {
        res
          .status(404)
          .json({ error: "Reservation non trouvée pour ce Catway" });
      }
    } catch (error) {
      console.error("Erreur lors de la récupération de la réservation:", error);
      res.status(500).json({ error: "Erreur interne du serveur" });
    }
  }
);

// Route pour créer un nouvelle réservation pour un Catway spécifique
router.post("/:id/reservations", private.checkJWT, async (req, res) => {
  const catwayId = req.params.id;
  const { clientName, checkIn, CheckOut, boatName } = req.body;

  try {
    // Créer une nouvelle réservation en utilsant le service
    const newReservation = await reservationService.createReservation(
      catwayId,
      clientName,
      checkIn,
      CheckOut,
      boatName
    );
    // Envoye la nouvelle réservation qui vien d'être créer au format JSON
    res.status(201).json(newReservation);
  } catch (error) {
    console.error("Erreur lors de la création de la reservation:", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

// Route pour supprimer une réservation spécifique pour un Catway spécifique
router.delete(
  "/:id/reservations/:idReservation",
  private.checkJWT,
  async (req, res) => {
    const catwayId = req.params.id;
    const reservationId = req.params.idReservation;

    try {
      //  Supprimer une réservation spécifique pour un Catway spécifique à l'aide du service
      const result = await reservationService.deleteResByCatwayAndId(
        catwayId,
        reservationId
      );

      if (result.deletedCount === 1) {
        //  envoie une réponse de réussite si la réservation a été supprimée
        res.status(200).json({ message: "Reservation supprimée avec succès" });
      } else {
        res
          .status(404)
          .json({ error: "Reservation non trouvée pour ce Catway" });
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de la réservation:", error);
      res.status(500).json({ error: "Erreur interne du serveur" });
    }
  }
);

// Route pour afficher les détails de la réservation dans une Vue
router.get("/view/:id", async (req, res) => {
  const reservationId = req.params.id;

  try {
    // Récupere les détails de la réservation par son ID à partir de la base de données 
    const reservation = await Reservations.findById(reservationId);

    if (!reservation) {
      return res.status(404).json({ error: "Reservation non trouvée" });
    }

    // Rend le modèle 'reservation' avec les données de réservation
    res.render("reservationDetail", { reservation });
  } catch (err) {
    console.error("Erreur dans getReservationDetails:", err.message);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

module.exports = router;