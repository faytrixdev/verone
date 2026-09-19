# Product Specification

## 1. Vision

Construire un CRM immobilier adapté au marché burkinabè qui ne sert pas uniquement à stocker des données, mais qui aide également l'agence à trouver de nouveaux prospects.

Le produit combine :

**CRM immobilier + gestion des biens + prospection IA + qualification automatique.**

## 2. Utilisateurs

Le produit est principalement destiné aux :

* agents immobiliers ;
* commerciaux immobiliers ;
* responsables d'agence ;
* équipes chargées de la prospection.

## 3. Problèmes à résoudre

L'agence doit pouvoir :

* centraliser ses prospects ;
* éviter de contacter plusieurs fois la même personne ;
* connaître l'historique de chaque prospect ;
* gérer ses biens ;
* connaître les besoins de ses clients ;
* suivre les opportunités ;
* trouver régulièrement de nouveaux prospects ;
* identifier les prospects les plus intéressants.

## 4. Prospection IA

L'utilisateur pourra définir des critères de recherche.

Exemples :

* Ville : Ouagadougou
* Type : décideurs
* Secteur : banque
* Catégorie : cadres
* Nombre : 30 prospects

Le système recherche ensuite des informations disponibles à partir des sources configurées.

Pipeline :

Recherche → collecte → extraction → qualification IA → déduplication → validation → CRM.

## 5. Qualification

Chaque prospect peut être classé automatiquement dans une catégorie :

### VIP

Exemples :

* ministres ;
* ambassadeurs ;
* directeurs généraux ;
* hauts responsables ;
* grands dirigeants ;
* profils à très fort potentiel.

### Cadre moyen

Exemples :

* responsables ;
* managers ;
* chefs de service ;
* cadres ;
* professions intermédiaires.

### Employé

Autres travailleurs correspondant aux critères de recherche.

La classification doit être basée sur les informations réellement trouvées et ne doit pas inventer une fonction ou une information absente.

## 6. CRM Prospects

Chaque prospect peut contenir :

* prénom ;
* nom ;
* poste ;
* entreprise ;
* téléphone ;
* email ;
* ville ;
* pays ;
* catégorie ;
* score de pertinence ;
* source ;
* date d'ajout ;
* statut ;
* notes ;
* historique des interactions.

## 7. CRM Biens

L'agence peut enregistrer ses biens :

* référence ;
* type ;
* opération : vente ou location ;
* prix ;
* ville ;
* quartier ;
* adresse ou localisation ;
* superficie ;
* nombre de pièces ;
* description ;
* photos ;
* disponibilité ;
* propriétaire ;
* notes.

## 8. Demandes immobilières

Une demande représente ce qu'un prospect ou client recherche.

Exemples :

* achat d'une villa ;
* location d'un appartement ;
* achat d'un immeuble ;
* location d'un bureau.

Une demande peut contenir :

* type de bien ;
* opération ;
* budget minimum ;
* budget maximum ;
* localisation recherchée ;
* caractéristiques souhaitées ;
* description ;
* statut.

## 9. Opportunités

Une opportunité représente une affaire commerciale potentielle.

Pipeline initial :

Nouveau → Contacté → Intéressé → Visite → Négociation → Gagné / Perdu.

## 10. Activités

Le CRM doit conserver l'historique des actions :

* appel ;
* rendez-vous ;
* note ;
* tâche ;
* changement de statut.

L'objectif est notamment d'éviter qu'un même prospect soit contacté plusieurs fois par différents membres de l'équipe sans coordination.

## 11. Dashboard

Le dashboard doit afficher les informations importantes :

* nombre de prospects ;
* nouveaux prospects ;
* prospects VIP ;
* prospects cadres ;
* prospects à contacter ;
* biens disponibles ;
* demandes en cours ;
* opportunités ;
* rendez-vous à venir.

## 12. Données et fiabilité

Le système doit distinguer :

* information trouvée ;
* information vérifiée ;
* information inconnue.

Il ne doit jamais inventer une donnée manquante.

Les coordonnées doivent être utilisées conformément aux règles applicables et aux conditions des sources utilisées.

## 13. Principe UX

L'interface doit être :

* simple ;
* rapide ;
* professionnelle ;
* adaptée à une utilisation quotidienne ;
* compréhensible par une personne non technique.

Le produit doit privilégier l'efficacité plutôt que la multiplication des fonctionnalités.
