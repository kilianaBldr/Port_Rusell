
const Catway = require("../models/catway");

/**
 * Récupère tous les catways de la base de données.
 * @async
 * @returns {Promise<{data: Array<Object>} | {error: string}>}
 * Une promesse qui se résout en un objet contenant un tableau de Catways ou un message d'erreur.
 */
exports.getAllCatways = async () => {
  try {
    const catways = await Catway.find();
    return { data: catways };
  } catch (error) {
    console.error("Erreur dans getAllCatways:", error);
    return { error: "Erreur interne du serveur" };
  }
};

/**
 * Récupère uniquement les numéros de Catway et leurs identifiants de la base de données.
 * @async
 * @returns {Promise<{data: Array<Object>} | {error: string}>} 
 *Une promesse qui se résout en un objet contenant un tableau de numéros de Catway ou un message d'erreur.
 */
exports.getCatwayNumbers = async () => {
  try {
    const catways = await Catway.find({}, "catwayNumber _id");
    return { data: catways };
  } catch (error) {
    console.error("Erreur lors de la récupération des numéros de Catway:", error);
    return { error: "Erreur lors de la récupération des numéros de Catway" };
  }
};

/**
 * Récupère un seul catway par son ID.
 * @async
 * @param {string} id - Récupère un seul catway par son ID.
 * @returns {Promise<{data: Object} | {error: string}>} 
 *Une promesse qui se résout en un objet contenant les données de la Catway si elles sont trouvées, ou en un message d'erreur si elles ne sont pas trouvées.
*/
exports.getCatwayById = async (id) => {
  try {
    const catway = await Catway.findById(id);
    if (!catway) {
      return { error: "Catway non trouvé" };
    }
    return { data: catway };
  } catch (error) {
    console.error(`Erreur lors de la récupération du Catway ${id}:`, error);
    return { error: "Erreur lors de la récupération des détails du Catway" };
  }
};

/**
 * Ajoute une nouvelle Catway à la base de données.
 * @async
 * @param {Object} catwayData - Les données pour la nouvelle Catway.
 * @returns {Promise<{data: Object} | {error: string}>}
 *  Une promesse qui se résout en un objet contenant les données du Catway nouvellement créées, ou un message d'erreur si la création échoue.
 */
exports.addCatway = async (catwayData) => {
  try {
    const newCatway = await Catway.create(catwayData);
    return { data: newCatway };
  } catch (error) {
    console.error("Erreur dans addCatway:", error);
    return { error: "Erreur lors de la création du Catway" };
  }
};

/**
 * Met à jour un Catway existante par son ID.
 * @async
 * @param {string} id - L'ID du Catway à mettre à jour.
 * @param {Object} updateData - Les données pour mettre à jour le catway.
 * @returns {Promise<{data: Object} | {error: string}>} 
 * Une promesse qui se résout en un objet contenant les données de catway mises à jour si la mise à jour réussit, ou un message d'erreur si le catway n'est pas trouvé ou si la mise à jour échoue.
*/
exports.updateCatwayById = async (id, updateData) => {
  try {
    const catway = await Catway.findById(id);
    if (!catway) {
      return { error: "Catway non trouvé" };
    }

    Object.assign(catway, updateData);
    await catway.save();
    return { data: catway };
  } catch (error) {
    console.error("Erreur dans updateCatwayById:", error);
    return { error: "Erreur lors de la mise à jour du Catway" };
  }
};

/**
 *Supprime un Catway par son ID.
 * @async
 * @param {string} id - L'ID du Catway à supprimer.
 * @returns {Promise<{data: Object} | {error: string}>} 
 *Une promesse qui se résout en un objet contenant un message de réussite si la suppression réussit, ou un message d'erreur si le Catway n'est pas trouvée ou si la suppression échoue.
*/
exports.deleteCatwayById = async (id) => {
  try {
    const catway = await Catway.findById(id);
    if (!catway) {
      return { error: "Catway non trouvé" };
    }

    await Catway.deleteOne({ _id: id });
    return { data: { message: "Catway supprimé avec succès" } };
  } catch (error) {
    console.error("Erreur dans deleteCatwayById:", error);
    return { error: "Erreur lors de la suppression du Catway" };
  }
};

/**
 * Met à jour partiellement l'état d'un Catway par son ID.
 * @async
 * @param {string} id -L'ID du Catway à mettre à jour.
 * @param {string} catwayState - Le nouvel état du Catway.
 * @returns {Promise<{data: Object} | {error: string}>} 
 * Une promesse qui se résout en un objet contenant les données de catway mises à jour si la mise à jour réussit, ou un message d'erreur si le catway n'est pas trouvé ou si la mise à jour échoue.
*/
exports.patchCatwayById = async (id, catwayState) => {
  if (
    !catwayState ||
    typeof catwayState !== "string" ||
    catwayState.trim() === ""
  ) {
    return { error: "CatwayState non valide" };
  }

  try {
    const catway = await Catway.findByIdAndUpdate(
      id,
      { catwayState: catwayState.trim() },
      { new: true }
    );
    if (!catway) {
      return { error: "Catway non trouvé" };
    }
    return { data: catway };
  } catch (error) {
    console.error("Erreur lors de la mise à jour de Catway :", error);
    return { error: "Erreur lors de la mise à jour de Catway" };
  }
};
