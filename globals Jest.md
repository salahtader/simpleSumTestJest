## Globals Jest : Maîtrisez les bases des tests unitaires en JavaScript

Ce tutoriel vous guide à travers les bases de Jest, un framework de test JavaScript populaire, en se concentrant sur les méthodes globales disponibles dans vos fichiers de test. Nous explorerons chaque méthode en détail, accompagnée d'exemples concrets et de techniques avancées.

### Table des matières

**1. Introduction aux globals Jest**

   - Qu'est-ce qu'un global Jest ?
   - Pourquoi utiliser des globals dans les tests ?
   - Importation explicite vs. environnement global

**2. Méthodes de cycle de vie des tests**

   - **beforeAll(fn, timeout):** Configuration globale avant tous les tests
     - Exemple : Initialisation d'une base de données de test
   - **beforeEach(fn, timeout):** Configuration avant chaque test
     - Exemple : Réinitialisation de l'état de l'application
   - **afterEach(fn, timeout):** Nettoyage après chaque test
     - Exemple : Suppression des données temporaires
   - **afterAll(fn, timeout):** Nettoyage global après tous les tests
     - Exemple : Fermeture des connexions à la base de données

**3. Méthodes de description des tests**

   - **describe(name, fn):** Regrouper des tests liés
     - Exemple : Tests pour une fonction spécifique
   - **describe.each(table)(name, fn, timeout):** Tests pilotés par les données
     - Exemple : Tester une fonction avec plusieurs ensembles de données
   - **describe.only(name, fn):** Exécuter uniquement un bloc `describe` spécifique
   - **describe.skip(name, fn):** Ignorer un bloc `describe` spécifique

**4. Méthodes d'exécution des tests**

   - **test(name, fn, timeout):** Définir un seul test
     - Exemple : Vérification de la valeur de retour d'une fonction
   - **test.each(table)(name, fn, timeout):** Tests pilotés par les données
     - Exemple : Tester une fonction avec plusieurs ensembles de données
   - **test.concurrent(name, fn, timeout):** Exécuter des tests simultanément
     - Exemple : Tests d'intégration asynchrones
   - **test.only(name, fn, timeout):** Exécuter uniquement un test spécifique
   - **test.skip(name, fn):** Ignorer un test spécifique
   - **test.todo(name):** Marquer un test comme à faire

**5. Techniques avancées**

   - Gestion des promesses et du code asynchrone dans les tests
   - Utilisation de `done()` pour les tests basés sur les callbacks
   - Configuration du timeout pour les tests asynchrones
   - Utilisation de `test.concurrent` avec l'option `maxConcurrency`

**6. Conclusion**

   - Récapitulatif des concepts clés
   - Prochaines étapes pour approfondir vos connaissances de Jest

## Explication détaillée pour chaque titre

### 1. Introduction aux globals Jest

Les globals Jest sont des fonctions et des objets accessibles globalement dans vos fichiers de test sans nécessiter d'importation explicite. Ils simplifient l'écriture des tests en fournissant un accès direct aux fonctionnalités essentielles de Jest.

L'utilisation des globals offre les avantages suivants :

- **Concision du code:** Élimine les instructions d'importation redondantes.
- **Lisibilité accrue:** Rend le code de test plus facile à lire et à comprendre.
- **Familiarité:** S'aligne sur les conventions courantes de test JavaScript.

Bien que Jest prenne en charge l'accès global, vous pouvez choisir d'importer explicitement les globals à partir de `@jest/globals` pour une meilleure lisibilité ou pour éviter d'éventuels conflits de noms.

```typescript
// Accès global
describe('Mon test', () => {
  test('devrait fonctionner', () => {
    expect(true).toBe(true);
  });
});

// Importation explicite
import { describe, expect, test } from '@jest/globals';

describe('Mon test', () => {
  test('devrait fonctionner', () => {
    expect(true).toBe(true);
  });
});
```

### 2. Méthodes de cycle de vie des tests

Ces méthodes vous permettent d'exécuter du code avant et après l'exécution de vos tests, ce qui est utile pour la configuration et le nettoyage.

**Exemple : Tests d'une API de panier d'achat**

```typescript
import { beforeEach, afterEach, test } from '@jest/globals';

const cart = { items: [], total: 0 };

beforeEach(() => {
  // Ajouter un article au panier avant chaque test
  cart.items.push({ id: 1, name: 'T-shirt', price: 19.99 });
  cart.total += 19.99;
});

afterEach(() => {
  // Vider le panier après chaque test
  cart.items = [];
  cart.total = 0;
});

test('devrait ajouter un article au panier', () => {
  addToCart(cart, { id: 2, name: 'Jeans', price: 39.99 });
  expect(cart.items).toHaveLength(2);
  expect(cart.total).toBeCloseTo(59.98);
});

test('devrait supprimer un article du panier', () => {
  removeFromCart(cart, 1);
  expect(cart.items).toHaveLength(0);
  expect(cart.total).toBe(0);
});
```

### 3. Méthodes de description des tests

Ces méthodes vous aident à organiser et à structurer vos tests.

**Exemple : Tests d'une fonction de validation d'email**

```typescript
import { describe, test } from '@jest/globals';

describe('validateEmail', () => {
  describe('quand l'email est valide', () => {
    test.each([
      ['test@example.com'],
      ['john.doe@domain.co.uk'],
    ])('devrait retourner true pour %s', (email) => {
      expect(validateEmail(email)).toBe(true);
    });
  });

  describe('quand l\'email est invalide', () => {
    test.each([
      ['invalidemail'],
      ['missing@domain'],
    ])('devrait retourner false pour %s', (email) => {
      expect(validateEmail(email)).toBe(false);
    });
  });
});
```

### 4. Méthodes d'exécution des tests

Ces méthodes vous permettent de définir, d'exécuter et de gérer l'exécution de vos tests.

**Exemple : Tests d'une API de récupération de données utilisateur**

```typescript
import { test, expect } from '@jest/globals';
import { fetchUser } from './api';

test('devrait récupérer les données utilisateur avec succès', async () => {
  const user = await fetchUser(1);
  expect(user).toEqual({ id: 1, name: 'John Doe' });
});

test.skip('devrait gérer les erreurs lors de la récupération des données utilisateur', async () => {
  // Ce test est ignoré pour le moment
  const user = await fetchUser(999);
  expect(user).toBeNull();
});
```

### 5. Techniques avancées

**Gestion du code asynchrone:**

```typescript
test('devrait résoudre la promesse', async () => {
  await expect(fetchData()).resolves.toEqual({ data: 'success' });
});

test('devrait rejeter la promesse', async () => {
  await expect(fetchData()).rejects.toThrow('Erreur');
});
```

**Utilisation de `done()` pour les callbacks:**

```typescript
test('devrait appeler la callback avec les données', (done) => {
  fetchData((data) => {
    expect(data).toEqual({ data: 'success' });
    done();
  });
});
```

**Configuration du timeout:**

```typescript
test('devrait se terminer dans les 5 secondes', async () => {
  await new Promise((resolve) => setTimeout(resolve, 4000));
}, 5000); // Délai d'attente de 5 secondes
```

**`test.concurrent` et `maxConcurrency`:**

```typescript
// Exécuter un maximum de 2 tests simultanément
jest.setTimeout(30000); // Augmenter le délai d'attente global

test.concurrent.each([
  /* Vos tests ici */
], 2); // Définir maxConcurrency à 2
```

### 6. Conclusion

Ce tutoriel a couvert les bases de l'utilisation des globals Jest pour écrire des tests unitaires efficaces. N'hésitez pas à explorer la documentation officielle de Jest ([https://jestjs.io/](https://jestjs.io/)) pour des informations plus approfondies et des fonctionnalités avancées.

Pour approfondir vos connaissances de Jest, vous pouvez :

- Apprendre à utiliser des assertions plus avancées pour des tests plus précis.
- Découvrir comment mocker des dépendances pour des tests unitaires isolés.
- Configurer Jest pour s'intégrer à votre environnement de développement.

En maîtrisant les concepts présentés dans ce tutoriel, vous êtes sur la bonne voie pour écrire du code JavaScript plus robuste et plus fiable.
