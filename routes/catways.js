const express = require("express");
const router = express.Router();
const catway = require("../models/catway");
const services = require("../services/catway");

// Route pour rendre la vue de toutes les Catways
router.get("/view", async (req, res) => {
  try {
    // Récupérer tous les catways du service
    const result = await services.getAllCatways();
    if (result.error) {
      console.error("Erreur dans getAllCatways:", result.error);
      return res.status(500).json({ error: "Erreur interne du serveur" });
    }
    // Rendre le modèle de vue des catways avec les catways récupérées
    res.render("catways", { catways: result.data });
  } catch (error) {
    console.error("Erreur attendue:", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

// Route pour obtenir les numéro de tous les catways en JSON
router.get("/catwayNumbers", async (req, res) => {
  try {
    // Récuper les numéro de catway à partir du services
    const result = await services.getCatwayNumbers();
    if (result.error) {
      console.error("Erreur de récupération des numéro catways:", result.error);
      return res.status(500).json({ error: "Erreur de récupération des numéro catways" });
    }
    // Envoyer les numéro de catway récupérés au format JSON
    res.json(result.data);
  } catch (error) {
    console.error("Erreur attendue:", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

// Route pour accéder aux détails d'un catway spécifique
router.get("/view/:id", async (req, res) => {
  const catwayId = req.params.id;

  try {
    // Récupérer un Catway spécifique par l'ID à patir du service
    const result = await services.getCatwayById(catwayId);
    if (result.error) {
      if (result.error === "Catway non trouvé") {
        return res.status(404).json({ error: "Catway non trouvé" });
      }
      console.error("Erreur dans getCatwayDetails:", result.error);
      return res.status(500).json({ error: "Erreur interne du serveur" });
    }
    // Rendre le modele de vue détaillée d'un catway avec le catway récupérer
    res.render("catwayDetail", { catway: result.data });
  } catch (err) {
    console.error("Erreur attendue:", err);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

// Route pour obtenir les details d'un Catway spécifique au format JSON
router.get("/detail/:id", async (req, res) => {
  const id = req.params.id;
  try {
    // // Récupérer un Catway spécifique par l'ID à partir du service
    const result = await services.getCatwayById(id);
    if (result.error) {
      if (result.error === "Catway non trouvé") {
        return res.status(404).json({ error: "Catway non trouvé" });
      }
      console.error(`Erreur lors de la récupération du Catway ${id}:`, result.error);
      return res.status(500).json({ error: "Erreur lors de la récupération des détails du Catway" });
    }
    // Envoie les détails récupérés du catway au format JSON
    res.json(result.data);
  } catch (error) {
    console.error("Erreur attendue:", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

// Route pour mettre à jour l'état d'un catway spécifique
router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const { catwayState } = req.body;

  try {
    // mettre à jour l'état du Catway par son ID depuis le service
    const result = await services.patchCatwayById(id, catwayState);
    if (result.error) {
      if (result.error === "Catway non trouvé") {
        return res.status(404).json({ error: "Catway non trouvé" });
      }
      console.error("Erreur lors de la mise à jour de Catway:", result.error);
      return res.status(500).json({ error: "Error updating Catway" });
    }
    // envoie une réponse de réussite avec les détails du Catway mis à jour
    res
      .status(200)
      .json({ message: "Catway mis à jour avec succès", catway: result.data });
  } catch (error) {
    console.error("Erreur attendue:", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

// Route pour obtenir tous les catways au format JSON
router.get("/", async (req, res) => {
  try {
    // Récupere tous les Catways du service
    const result = await services.getAllCatways();
    if (result.error) {
      console.error("Erreur dans getAllCatways:", result.error);
      return res.status(500).json({ error: "Erreur interne du serveur" });
    }
    // Envoie les catways récuperes au format JSON
    res.json(result.data);
  } catch (error) {
    console.error("Erreur attendue:", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

// Route pour obtenir un Catway spécifique par ID au format JSON
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    // Recupère un Catway spécifique par ID à partir du service
    const result = await services.getCatwayById(id);
    if (result.error) {
      if (result.error === "Catway non trouvé") {
        return res.status(404).json({ error: "Catway non trouvé" });
      }
      console.error("Erreur lors de la récupération du Catway:", result.error);
      return res.status(500).json({ error: "Erreur lors de la récupération des détails du Catway" });
    }
    // Envoie les détails récupérés du Catway au format JSON
    res.json(result.data);
  } catch (error) {
    console.error("Erreur attendue:", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

// Route pour créer un nouveau Catway
router.post("/", async (req, res) => {
  const { catwayNumber, catwayState, type } = req.body;
  try {
    // Créer un nouveau Catway en utilisant le service
    const result = await services.addCatway({
      catwayNumber,
      catwayState,
      type,
    });
    if (result.error) {
      console.error("Erreur lors de la création du Catway:", result.error);
      return res.status(500).json({ error: "Erreur lors de la création du Catway" });
    }
    // Envoie une réponse de validation avec les détails du catway venant d'être créer
    res.status(201).json(result.data);
  } catch (error) {
    console.error("Erreur attendue:", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

// Route pour mettre à jour un Catway existant par son ID en utilisant le service
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { catwayNumber, catwayState, type } = req.body;

  try {
    // Mettre à jour un Catway existant par son ID en utilisant le service
    const result = await services.updateCatwayById(id, {
      catwayNumber,
      catwayState,
      type,
    });
    if (result.error) {
      if (result.error === "Catway non trouvé") {
        return res.status(404).json({ error: "Catway non trouvé" });
      }
      console.error("Erreur lros de la mise à jour du Catway:", result.error);
      return res.status(500).json({ error: "Erreur lors de la mise à jour du Catway" });
    }
    // Envoie une réponse de validation avec les détails du catway venant d'être mise à jour
    res.status(200).json(result.data);
  } catch (error) {
    console.error("Erreur attendue:", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

// Route pour supprimer un Catway spécifique
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    // Supprimer un Catway spécifique par son ID en utilisant le service
    const result = await services.deleteCatwayById(id);
    if (result.error) {
      if (result.error === "Catway non trouvé") {
        return res.status(404).json({ error: "Catway non trouvé" });
      }
      console.error("Erreur lors de la suppression du Catway:", result.error);
      return res.status(500).json({ error: "Erreur lors de la suppression du Catway" });
    }
    // Envoie une réponse de validation de suppression du catway venant d'être supprimer
    res.status(200).json({ message: "Catway supprimé avec succès" });
  } catch (error) {
    console.error("Erreur attendue:", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

module.exports = router;