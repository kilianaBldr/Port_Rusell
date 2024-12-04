
const assert = require('assert'); // Importation d'assert pour effectuer des assertions
const sinon = require('sinon'); // Importation de sinon pour les stubs et mocks
const Catway = require('../models/catway'); // Importation du modèle Catway
const services = require('../services/catway'); // Importation du service

describe('addCatway', function () {
  let createStub; // Déclaration de la variable pour le stub de la méthode create

  // Avant chaque test, nous remplaçons la méthode create de Catway par un stub
  beforeEach(() => {
    createStub = sinon.stub(Catway, 'create');
  });

  // Après chaque test, nous restaurons les méthodes originales
  afterEach(() => {
    sinon.restore();
  });

  it('Ajoute une nouveau Catway avec succès', async () => {
    // Données du catway à tester
    const catwayData = {
      catwayNumber: '123',
      type: 'long', // Le type doit être "long" ou "short"
      catwayState: 'active'
    };

    // Données simulées à retourner en cas de succès
    const fakeCatway = {
      _id: '1',
      catwayNumber: 123,
      type: 'long',
      catwayState: 'active',
    };

    // Simulation d'un ajout réussi d'un catway
    createStub.resolves(fakeCatway); // Le stub retourne l'objet fakeCatway après la création

    // Appel du service addCatway
    const result = await services.addCatway(catwayData);

    // Vérification de la réponse du service
    assert.deepStrictEqual(result, { data: fakeCatway }); // On vérifie que le résultat correspond au fakeCatway
  });
});