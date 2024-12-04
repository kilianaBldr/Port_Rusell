# API du Port de Plaisance Russell

## Vue d'Ensemble

L'API du Port de Plaisance Russell est un service web basé sur l'architecture **RESTful**, conçu pour faciliter la gestion des réservations des **catways** (quais d'amarrage pour bateaux) au sein de la marina de Russell. Cette API propose des fonctionnalités pour créer, récupérer, modifier et supprimer des catways ainsi que des réservations. L'accès à l'API est sécurisé, permettant aux utilisateurs de gérer efficacement leurs ressources.

---

## Objectifs du Projet

Ce projet vise à accomplir les objectifs suivants :
- Développer une application dans un langage de programmation orienté objet.
- Créer des composants serveur dynamiques avec un style de programmation défensif.
- Appeler des services Web RESTful depuis les composants serveur.
- Assurer un accès sécurisé aux données pour effectuer des opérations CRUD sur des bases de données relationnelles ou non relationnelles.
- Intégrer des services distants via une API RESTful.

---

## Contexte et Mission

La marina de Russell souhaite automatiser la gestion des réservations de catways grâce à une API. Cette API doit offrir les fonctionnalités suivantes :
- Créer un catway
- Afficher la liste des catways
- Récupérer les détails d’un catway spécifique
- Mettre à jour la description et l'état d’un catway
- Supprimer un catway
- Effectuer une réservation pour un catway
- Supprimer une réservation
- Afficher toutes les réservations
- Afficher les détails d’une réservation spécifique

---

## Points de Terminaison de l'API

L'API est conçue selon les principes RESTful, ce qui signifie que les ressources sont identifiées par des URLs et manipulées par des méthodes HTTP appropriées (GET, POST, PUT, DELETE). Voici un aperçu des principaux points de terminaison de l'API.

### Catways

- `GET /catways` : Liste tous les catways
- `GET /catways/:id` : Récupère un catway spécifique
- `POST /catways` : Crée un nouveau catway
- `PUT /catways/:id` : Met à jour un catway spécifique (remplacement complet)
- `PATCH /catways/:id` : Met à jour partiellement un catway
- `DELETE /catways/:id` : Supprime un catway spécifique

### Réservations (Sous-ressource de Catways)

- `GET /catways/:id/reservations` : Liste toutes les réservations pour un catway
- `GET /catways/:id/reservations/:idReservation` : Affiche les détails d'une réservation spécifique
- `POST /catways/:id/reservations` : Effectue une nouvelle réservation pour un catway
- `DELETE /catways/:id/reservations/:idReservation` : Supprime une réservation spécifique

---

## Description des Entités

### Utilisateurs

Les utilisateurs de l'API sont caractérisés par les informations suivantes :
- **Nom** : Le nom de l'utilisateur
- **Email** : Adresse email de l'utilisateur
- **Mot de passe** : Mot de passe pour l'authentification de l'utilisateur

### Catways

Les catways sont des espaces d'amarrage pour les bateaux, et sont caractérisés par :
- **Numéro de catway** : Identifiant unique de chaque catway
- **Type** : Type de catway (par exemple, "long" ou "court")
- **Etat** : Description de l'état actuel du catway (par exemple, "disponible", "occupé", etc.)

### Réservations

Les réservations sont liées à un catway et sont définies par les informations suivantes :
- **Numéro de catway** : Le catway réservé
- **Nom du client** : Nom de la personne ayant effectué la réservation
- **Nom du bateau** : Nom du bateau amarré
- **Date d'arrivée** : Date de début de la réservation
- **Date de départ** : Date de fin de la réservation

---

## Prérequis et Installation

Pour déployer et utiliser l'API localement, vous devrez suivre ces étapes :

### Prérequis

- **Node.js (version 20 ou supérieure)** : Assurez-vous que Node.js est installé sur votre machine. Vous pouvez télécharger Node.js depuis [nodejs.org](https://nodejs.org).
- **MongoDB** : Une instance de base de données MongoDB est nécessaire. Vous pouvez soit utiliser une instance locale, soit vous inscrire à un service basé sur le cloud comme [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

### Installation

Voici les étapes pour installer et démarrer l'API :

```bash
# Clonez le repository du projet


# Allez dans le répertoire du projet
cd portRusell

# Installez les dépendances nécessaires
npm install

# Créez un fichier .env à la racine du projet avec le contenu suivant :
# URL_MONGO=mongodb://votreUrlMongoDB
# SECRET_KEY=yourSecretKey

# Lancez le serveur
npm start

#Les informations d'identification pour se connecter à l'utilisateur de test sont (si vous utilisez la base de données par défaut) :
    email: exempleTest@gmail.com
    password: Test123456
