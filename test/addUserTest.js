const assert = require('assert'); // Pour effectuer des assertions dans les tests
const sinon = require('sinon'); // Pour mocker ou stubber des fonctions
const User = require('../models/user'); // Ton modèle utilisateur
const services = require('../services/user'); // Ton service utilisateur

describe('addUser', function () {
  let createStub; // Déclaration de la variable pour stubber la méthode create

  beforeEach(() => {
    // Stub de la méthode create de Mongoose
    createStub = sinon.stub(User, 'create');
  });

  afterEach(() => {
    // Restauration de la méthode originale après chaque test
    sinon.restore();
  });

  it('Ajoute un nouveau utilisateur avec succès', async function () {
    // Données de l'utilisateur à tester
    const userData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    };

    // Objet simulé que la méthode create devrait renvoyer en cas de succès
    const fakeUser = {
      _id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      createdAt: '2024-12-01T00:00:00Z',
      updatedAt: '2024-12-01T00:00:00Z',
    };

    // Simulation d'un ajout réussi d'un utilisateur
    createStub.resolves(fakeUser);

    // Appel du service addUser
    const result = await services.addUser(userData);

    // Vérification de la réponse renvoyée par le service
    assert.deepStrictEqual(result, fakeUser); // On vérifie que l'utilisateur renvoyé correspond à fakeUser
  });
});