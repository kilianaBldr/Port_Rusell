const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

/**
 * Obtenez tous les utilisateurs, à l'exclusion de leurs mots de passe.
 * @returns {Promise<Array>} - 
 * Une promesse qui se résout en un tableau d’objets utilisateur.
 */
exports.getAllUsers = async () => {
  try {
    return await User.find({}, "-password");
  } catch (error) {
    console.error("Erreur dans getAllUsers:", error);
    throw new Error("Erreur lors de la récupération des utilisateurs");
  }
};

/**
 * Obtenir un utilisateur par son identifiant.
 * @param {string} id - L'ID de l'utilisateur.
 * @returns {Promise<Object|null>} - 
 * Une promesse qui se résout en objet utilisateur ou null si elle n'est pas trouvée.
 */
exports.getUserById = async (id) => {
  try {
    return await User.findById(id);
  } catch (error) {
    console.error("Erreur dans getUserById:", error);
    throw new Error("Erreur lors de la récupération de l'utilisateur");
  }
};

/**
 * Créer un nouvel utilisateur.
 * @param {Object} userData -Les données du nouvel utilisateur.
 * @returns {Promise<Object>} - 
 * Une promesse qui se résout en l’objet utilisateur créé.
 */
exports.addUser = async (userData) => {

  try {
    return await User.create(userData);
  } catch (error) {

    console.error("Erreur dans addUser:", error);
    // Gestion d'erreur spécifique pour la validation de Mongoose
    if (error.name === 'ValidationError') {
      throw new Error(`Erreur de validation : ${Object.values(error.errors).map(e => e.message).join(', ')}`);
    }
    // Gestion d'erreur de duplication (par ex. email déjà utilisé)
    if (error.code === 11000) {

      throw new Error("Cet email existe déjà dans notre base de données.");
    }
    // Erreur générique pour les autres cas
    throw new Error("Erreur lors de la création de l'utilisateur");
  }
};

/**
 *Mettre à jour un utilisateur par son ID.
 * @param {string} id -L'ID de l'utilisateur.
 * @param {Object} userData - Les données mises à jour pour l'utilisateur.
 * @returns {Promise<Object>} - 
 * Les données mises à jour pour l'utilisateur.
 */
exports.updateUserById = async (id, userData) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new Error("Utilisateur non trouvé");
    }

    Object.keys(userData).forEach((key) => {
      if (userData[key]) {
        user[key] = userData[key];
      }
    });

    await user.save();
    return user;
  } catch (error) {
    console.error("Erreur dans updateUserById:", error);
    throw error;
  }
};

/**
 *Supprimer un utilisateur par son ID.
 * @param {string} id -L'ID de l'utilisateur.
 * @returns {Promise<Object>} - 
 *Une promesse qui se résout en un message confirmant la suppression.
 */
exports.deleteUserById = async (id) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new Error("Utilisateur non trouvé");
    }
    await User.deleteOne({ _id: id });
    return { message: "L'utilisateur a été supprimé avec succès" };
  } catch (error) {
    console.error("Erreur dans deleteUserById:", error);
    throw error;
  }
};

/**
 * Authentifier un utilisateur par son email et son mot de passe.
 * @param {string} email - L'adresse e-mail de l'utilisateur.
 * @param {string} password - le mot de passe de l'utilisateur.
 * @returns {Promise<Object>} - 
 *Une promesse qui se résout en un objet contenant un jeton JWT.
 */
exports.authenticateUser = async (email, password) => {
  try {
    const user = await User.findOne({ email }).select(
      "-__v -createdAt -updatedAt"
    );
    if (!user) {
      throw new Error("Utilisateur non trouvé");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("Mauvaises informations d'identification");
    }

    const { password: userPassword, ...userWithoutPassword } = user.toObject();
    const expiresIn = 24 * 60 * 60;
    const token = jwt.sign({ user: userWithoutPassword }, SECRET_KEY, {
      expiresIn,
    });

    return { token };
  } catch (error) {
    console.error("Erreur d'authentification :", error);
    throw error;
  }
};