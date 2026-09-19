# Database

Base de données prévue avec Supabase / PostgreSQL.

## 1. profiles

Utilisateurs de l'agence.

| Champ      | Type      |
| ---------- | --------- |
| id         | uuid      |
| first_name | text      |
| last_name  | text      |
| email      | text      |
| phone      | text      |
| role       | text      |
| created_at | timestamp |

Roles possibles :

* admin
* agent
* manager

---

# 2. prospects

| Champ      | Type      |
| ---------- | --------- |
| id         | uuid      |
| first_name | text      |
| last_name  | text      |
| job_title  | text      |
| company    | text      |
| phone      | text      |
| email      | text      |
| city       | text      |
| country    | text      |
| category   | text      |
| score      | integer   |
| status     | text      |
| source     | text      |
| source_url | text      |
| notes      | text      |
| created_at | timestamp |
| updated_at | timestamp |

### category

Valeurs :

* vip
* middle_manager
* employee

### status

Valeurs initiales :

* new
* to_contact
* contacted
* interested
* client
* not_interested
* inactive

---

# 3. properties

| Champ            | Type      |
| ---------------- | --------- |
| id               | uuid      |
| reference        | text      |
| title            | text      |
| type             | text      |
| transaction_type | text      |
| price            | numeric   |
| city             | text      |
| neighborhood     | text      |
| address          | text      |
| area             | numeric   |
| rooms            | integer   |
| description      | text      |
| availability     | text      |
| owner_name       | text      |
| created_at       | timestamp |
| updated_at       | timestamp |

### type

Exemples :

* house
* villa
* duplex
* apartment
* building
* office
* land
* other

### transaction_type

* sale
* rent

### availability

* available
* reserved
* sold
* rented
* archived

---

# 4. property_images

| Champ       | Type      |
| ----------- | --------- |
| id          | uuid      |
| property_id | uuid      |
| url         | text      |
| position    | integer   |
| created_at  | timestamp |

Relation :

property_images.property_id → properties.id

---

# 5. requests

Demandes immobilières des prospects/clients.

| Champ            | Type      |
| ---------------- | --------- |
| id               | uuid      |
| prospect_id      | uuid      |
| type             | text      |
| transaction_type | text      |
| min_budget       | numeric   |
| max_budget       | numeric   |
| city             | text      |
| neighborhood     | text      |
| requirements     | text      |
| status           | text      |
| created_at       | timestamp |

Relation :

requests.prospect_id → prospects.id

---

# 6. opportunities

| Champ       | Type      |
| ----------- | --------- |
| id          | uuid      |
| prospect_id | uuid      |
| property_id | uuid      |
| title       | text      |
| stage       | text      |
| amount      | numeric   |
| notes       | text      |
| created_at  | timestamp |
| updated_at  | timestamp |

Relations :

opportunities.prospect_id → prospects.id

opportunities.property_id → properties.id

### stage

* new
* contacted
* interested
* visit
* negotiation
* won
* lost

---

# 7. activities

Historique des actions réalisées.

| Champ          | Type      |
| -------------- | --------- |
| id             | uuid      |
| prospect_id    | uuid      |
| opportunity_id | uuid      |
| user_id        | uuid      |
| type           | text      |
| title          | text      |
| description    | text      |
| due_at         | timestamp |
| completed_at   | timestamp |
| created_at     | timestamp |

### type

* call
* meeting
* note
* task

---

# 8. prospect_searches

Historique des recherches IA.

| Champ           | Type      |
| --------------- | --------- |
| id              | uuid      |
| user_id         | uuid      |
| city            | text      |
| sector          | text      |
| prospect_type   | text      |
| category        | text      |
| requested_count | integer   |
| status          | text      |
| created_at      | timestamp |

---

# 9. prospect_search_results

Résultats obtenus lors d'une recherche.

| Champ       | Type      |
| ----------- | --------- |
| id          | uuid      |
| search_id   | uuid      |
| first_name  | text      |
| last_name   | text      |
| job_title   | text      |
| company     | text      |
| phone       | text      |
| email       | text      |
| city        | text      |
| category    | text      |
| score       | integer   |
| source      | text      |
| source_url  | text      |
| is_imported | boolean   |
| created_at  | timestamp |

Relation :

prospect_search_results.search_id → prospect_searches.id

---

## Principes

1. Les données de recherche ne deviennent pas automatiquement des prospects.
2. Les résultats doivent pouvoir être examinés avant import.
3. Les doublons doivent être détectés avant création.
4. Les données inconnues restent nulles plutôt que d'être inventées.
5. Les sources doivent être conservées lorsque disponibles.
6. Les timestamps doivent être présents pour permettre le suivi de l'historique.
