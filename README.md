# Projet de Visite d'Éclairages en Réalité Mixte

Ce projet vise à faciliter l’inspection et le suivi de l’état des éclairages dans un environnement industriel grâce à une application web connectée à une base de données, avec une extension future sur les lunettes **Hololens** via **Inscape 9.0**.

## 🎯 Objectif

Permettre à un opérateur d’effectuer des visites d’éclairage de manière simple et interactive :
- Visualiser les éclairages d'une salle,
- Indiquer l’état de chaque éclairage (bon ou défectueux),
- Générer un rapport automatique en fin de visite,
- Stocker les informations en base de données pour exploitation ultérieure.

## ⚙️ Fonctionnalités

- Création de salles et enregistrement des coordonnées des éclairages
- Sélection d’un utilisateur et d’une salle pour démarrer une visite
- Navigation éclairage par éclairage avec feedback visuel (✅ / ❌)
- Ajout de remarques sur chaque point d’éclairage
- Génération d’un rapport de visite détaillé (avec export CSV bientôt disponible)
- Backend Node.js + Express connecté à MySQL via Docker

## 📦 Architecture

- **Frontend** : HTML / CSS / JavaScript (améliorations progressives de l'interface)
- **Backend** : Node.js + Express
- **Base de données** : MySQL (via Docker)
- **Outils futurs** : Inscape 9.0 + Hololens (pour la partie AR)

Se référer à la V5 pour la version finale de notre projet !
