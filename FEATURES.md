# Features

## Statut

Les fonctionnalités marquées **DEMO** sont prioritaires pour la première démonstration.

---

# 1. Dashboard

### DEMO

Afficher :

* total prospects ;
* nouveaux prospects ;
* VIP ;
* cadres moyens ;
* employés ;
* biens disponibles ;
* opportunités ;
* prospects à contacter.

---

# 2. Prospects

### DEMO

Liste des prospects avec :

* nom ;
* poste ;
* entreprise ;
* ville ;
* catégorie ;
* score ;
* statut ;
* source.

Fonctions :

* recherche ;
* filtres ;
* tri ;
* ouverture de la fiche ;
* ajout manuel ;
* modification ;
* suppression.

### Fiche prospect

Afficher :

* identité ;
* coordonnées ;
* entreprise ;
* poste ;
* localisation ;
* catégorie ;
* score ;
* source ;
* statut ;
* notes ;
* historique.

---

# 3. Prospection IA

### DEMO

Formulaire de recherche :

* ville ;
* secteur ;
* type de prospect ;
* catégorie souhaitée ;
* nombre de prospects.

### Pipeline

```text
Recherche
↓
Résultats
↓
Extraction
↓
Qualification IA
↓
Détection des doublons
↓
Résultats à valider
↓
Ajout au CRM
```

### Résultat

Pour chaque prospect :

* nom ;
* poste ;
* entreprise ;
* ville ;
* téléphone si disponible ;
* email si disponible ;
* catégorie ;
* score ;
* source.

L'utilisateur doit pouvoir sélectionner les prospects à importer dans le CRM.

---

# 4. Catégorisation

### DEMO

Catégories :

* VIP
* Cadre moyen
* Employé

La classification doit être basée sur les informations disponibles.

---

# 5. Détection des doublons

### DEMO

Avant l'ajout d'un prospect :

* vérifier le téléphone ;
* vérifier l'email ;
* vérifier le nom + entreprise ;
* signaler les correspondances potentielles.

Objectif :

Éviter de créer plusieurs fiches pour la même personne.

---

# 6. Biens

### DEMO

Liste des biens.

Champs :

* référence ;
* titre ;
* type ;
* vente/location ;
* prix ;
* ville ;
* quartier ;
* superficie ;
* pièces ;
* disponibilité ;
* photos.

Actions :

* ajouter ;
* modifier ;
* consulter ;
* archiver.

---

# 7. Demandes

### V1

Une demande contient :

* prospect/client ;
* type de bien ;
* vente/location ;
* budget ;
* zone ;
* caractéristiques ;
* statut ;
* notes.

---

# 8. Opportunités

### V1

Pipeline :

```text
Nouveau
↓
Contacté
↓
Intéressé
↓
Visite
↓
Négociation
↓
Gagné / Perdu
```

---

# 9. Activités

### V1

Types :

* appel ;
* rendez-vous ;
* note ;
* tâche.

Chaque activité doit être liée à un prospect ou une opportunité.

---

# 10. Recherche de biens

### V2

À partir d'une demande, proposer automatiquement les biens correspondant aux critères.

Exemple :

Budget : 30M–40M FCFA
Type : Villa
Ville : Ouagadougou

→ afficher les biens correspondants.

---

# 11. Prospection automatique

### V2

Permettre au système de lancer automatiquement des recherches à intervalles réguliers.

Exemple :

Chaque semaine → recherche de nouveaux prospects → qualification → ajout des nouveaux résultats au CRM.

---

# 12. Emails / Calendrier / Appels avancés

### V2

Ces fonctionnalités pourront être ajoutées après validation du produit.

Elles ne sont pas prioritaires pour la première démonstration.
