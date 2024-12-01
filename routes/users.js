const express = require("express");
const router = express.Router();
const userService = require("../services/user");

// Route pour obtenir tous les utilisateurs
router.get("/", async (req, res) => {
  try {
    // Récupère tous les utilisateurs en utilisant le service
    const users = await userService.getAllUsers();
    // envoie les données des utilisateur au format JSON
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route pour obtenir un utilisateur par son ID
router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    // Récupere l'utilisateur spécifique par son ID à l'aide du Service
    const user = await userService.getUserById(id);
    if (user) {
      // Envoie les données de l'utilisateur au format JSON
      res.status(200).json(user);
    } else {
      res.status(404).json("Utilisateur non trouvé");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route pour créer un nouvel utilisateur
router.post("/add", async (req, res) => {
  const userData = {
    name: req.body.name,
    firstname: req.body.firstname,
    email: req.body.email,
    password: req.body.password,
  };

  try {
    // Créer un nouvel utilisateur en utilisant le service
    const user = await userService.addUser(userData);
    // Envoie l'utilisateur crée au format Json avec son code d'état
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route pour mettre à jour un utilisateur par son ID
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const userData = {
    name: req.body.name,
    firstname: req.body.firstname,
    email: req.body.email,
    password: req.body.password,
  };

  try {
    // Mettre à jour l'utilisateur par l'ID en utilisant le service
    const user = await userService.updateUserById(id, userData);
    // envoie les données de l'utilisateur mises à jour au format JSON
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route pour supprimer un utilisateur par l'ID
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    // Supprimer l'utilisateur par son ID en utilisant le service
    const result = await userService.deleteUserById(id);
    // Envoie le résultat de la suppresion au format JSON
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route pour authentifier un utilisateur
router.post("/authenticate", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Authentifier l'utilisateur a l'aide du service
    const result = await userService.authenticateUser(email, password);
    // Envoie le résultat de l'authentification au format JSON
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;