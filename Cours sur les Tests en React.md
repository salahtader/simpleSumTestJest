## Cours sur les Tests en React

### Introduction

Ce cours a pour objectif de vous guider à travers les bases des tests unitaires en React. Vous apprendrez à utiliser des outils populaires comme Jest et React Testing Library pour construire des applications robustes et fiables.

### Objectifs du Cours

* Comprendre l'importance des tests unitaires et leurs avantages.
* Configurer un environnement de test avec Jest et React Testing Library.
* Écrire des tests unitaires efficaces pour différents types de composants React.
* Maîtriser les techniques de mocking et de spying pour isoler les dépendances.
* Apprendre les meilleures pratiques pour écrire des tests maintenables et évolutifs.

### Pré-requis

* Connaissance de base de React et du développement web.
* Familiarité avec JavaScript/ES6.
* Node.js et npm (ou yarn) installés sur votre machine.

### Table des Matières

**1. Introduction aux Tests Unitaires**
    * 1.1. Qu'est-ce qu'un test unitaire ?
    * 1.2. Pourquoi les tests unitaires sont-ils importants ?
    * 1.3. Introduction à Jest et React Testing Library

**2. Configuration de l'Environnement de Test**
    * 2.1. Installer Jest et React Testing Library
    * 2.2. Configuration de Jest dans un projet React
    * 2.3. Configuration de Babel pour les tests

**3. Écrire des Tests Unitaires avec Jest**
    * 3.1. Structure de base d'un test Jest
    * 3.2. Utilisation des assertions Jest (expect, toBe, etc.)
    * 3.3. Tests synchrones et asynchrones
    * 3.4. Utilisation des snapshots (pour les composants simples)

**4. Tester les Composants React avec React Testing Library**
    * 4.1. Introduction à React Testing Library et sa philosophie
    * 4.2. Rendre des composants pour les tests (render)
    * 4.3. Sélectionner des éléments DOM avec des requêtes sémantiques (getByRole, getByText, etc.)
    * 4.4. Simuler des événements utilisateur (fireEvent, userEvent)
    * 4.5. Détecter les changements asynchrones (waitFor, findBy)

**5. Tester les Propriétés et l'État des Composants**
    * 5.1. Tester les props des composants et leurs effets sur le rendu
    * 5.2. Tester l'état interne d'un composant et ses mises à jour
    * 5.3. Tester les effets de bord avec les hooks (useEffect, useState)

**6. Mocking et Spying**
    * 6.1. Introduction au mocking et au spying avec Jest
    * 6.2. Mocker des modules et des fonctions (jest.mock)
    * 6.3. Utiliser les mocks pour les appels d'API (fetch, axios)
    * 6.4. Contrôler le comportement des mocks (mockReturnValue, mockImplementation)

**7. Tests d'Intégration avec React Testing Library**
    * 7.1. Différences entre tests unitaires et tests d'intégration
    * 7.2. Tester l'interaction entre plusieurs composants
    * 7.3. Utiliser des Context Providers dans les tests

**8. Meilleures Pratiques et Astuces**
    * 8.1. Organiser vos tests de manière claire et concise
    * 8.2. Nommer vos tests de manière descriptive
    * 8.3. Éviter les tests trop dépendants de l'implémentation
    * 8.4. Utiliser les outils de couverture de code (Jest coverage)

**9. Conclusion**
    * 9.1. Récapitulatif des concepts clés
    * 9.2. Ressources pour approfondir vos connaissances
    * 9.3. L'importance de la pratique continue

## Contenu Détaillé

### 1. Introduction aux Tests Unitaires

#### 1.1. Qu'est-ce qu'un test unitaire ?

Un test unitaire est un code qui vérifie le bon fonctionnement d'une petite partie (unité) de votre code, généralement une fonction ou un composant, de manière isolée. L'objectif est de s'assurer que chaque unité de votre application fonctionne comme prévu, indépendamment des autres parties.

#### 1.2. Pourquoi les tests unitaires sont-ils importants ?

* **Fiabilité:** Les tests unitaires permettent de détecter les erreurs tôt dans le processus de développement, ce qui rend votre code plus fiable.
* **Refactoring sûr:**  Vous pouvez refactoriser votre code en toute confiance, sachant que les tests vous alerteront si quelque chose ne va pas.
* **Documentation vivante:** Les tests agissent comme une documentation à jour de la manière dont votre code est censé fonctionner.
* **Maintenance simplifiée:** Les tests facilitent la maintenance du code à long terme, car ils permettent de détecter rapidement les régressions.

#### 1.3. Introduction à Jest et React Testing Library

* **Jest** est un framework de test JavaScript développé par Facebook. Il est rapide, facile à configurer et offre des fonctionnalités puissantes comme les mocks, les snapshots et la couverture de code.
* **React Testing Library** est une bibliothèque qui encourage à tester les composants React de la même manière que les utilisateurs interagissent avec eux. Elle fournit des utilitaires pour simuler des actions utilisateur, rechercher des éléments dans le DOM et affirmer le comportement des composants.

### 2. Configuration de l'Environnement de Test

#### 2.1. Installer Jest et React Testing Library

Utilisez npm ou yarn pour installer les packages nécessaires :

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

#### 2.2. Configuration de Jest dans un projet React

Créez un fichier `jest.config.js` à la racine de votre projet avec le contenu suivant :

```javascript
module.exports = {
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|less|scss)$': 'identity-obj-proxy',
  },
};
```

* `setupFilesAfterEnv`: Permet de charger un fichier de configuration pour les tests, par exemple pour ajouter des matchers personnalisés.
* `testEnvironment`: Définit l'environnement d'exécution des tests. `jsdom` est un environnement DOM simulé pour exécuter des tests dans Node.js.
* `moduleNameMapper`: Permet de gérer les imports de fichiers CSS et autres ressources non-JS dans les tests.

#### 2.3. Configuration de Babel pour les tests

Si votre projet utilise Babel, assurez-vous que les presets et plugins nécessaires sont configurés dans votre fichier `.babelrc` :

```json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

### 3. Écrire des Tests Unitaires avec Jest

#### 3.1. Structure de base d'un test Jest

```javascript
// sum.js
export const sum = (a, b) => a + b;

// sum.test.js
import { sum } from './sum';

test('additionne deux nombres correctement', () => {
  expect(sum(1, 2)).toBe(3);
});
```

* La fonction `test()` définit un test individuel. Elle prend deux arguments : une description du test et une fonction qui contient le code du test.
* `expect(value).toBe(expectedValue)` est une assertion qui vérifie que la valeur réelle correspond à la valeur attendue.

#### 3.2. Utilisation des assertions Jest

Jest fournit une variété d'assertions pour tester différents aspects de votre code :

| Assertion | Description |
|---|---|
| `toBe(value)` | Vérifie l'égalité stricte (`===`) |
| `toEqual(value)` | Vérifie l'égalité profonde |
| `toBeTruthy()` | Vérifie si la valeur est truthy |
| `toBeFalsy()` | Vérifie si la valeur est falsy |
| `toContain(item)` | Vérifie si un élément est présent dans un tableau |
| `toThrow(error)` | Vérifie si une fonction lance une erreur |

#### 3.3. Tests synchrones et asynchrones

* **Tests synchrones:** Les tests qui s'exécutent de manière synchrone peuvent utiliser les assertions directement.

```javascript
test('calcule la somme de manière synchrone', () => {
  const result = sum(5, 7);
  expect(result).toBe(12);
});
```

* **Tests asynchrones:** Pour les tests asynchrones, utilisez `async/await` ou les promesses pour gérer les résultats asynchrones.

```javascript
test('récupère les données de l'API', async () => {
  const data = await fetchData();
  expect(data).toEqual({ name: 'John Doe' });
});
```

#### 3.4. Utilisation des snapshots (pour les composants simples)

Les snapshots capturent le rendu d'un composant à un moment donné et le comparent aux rendus futurs. Ils sont utiles pour détecter les changements inattendus dans le rendu des composants. Cependant, il est important de noter que les snapshots ne remplacent pas les tests d'assertions et peuvent devenir difficiles à maintenir pour les composants complexes.

```javascript
import React from 'react';
import renderer from 'react-test-renderer';
import MyComponent from './MyComponent';

test('rend correctement le composant', () => {
  const tree = renderer.create(<MyComponent />).toJSON();
  expect(tree).toMatchSnapshot();
});
```

### 4. Tester les Composants React avec React Testing Library

#### 4.1. Introduction à React Testing Library et sa philosophie

React Testing Library encourage une approche de test centrée sur l'utilisateur. Plutôt que de tester l'implémentation interne des composants, elle se concentre sur la façon dont les utilisateurs interagissent avec eux. Cela rend les tests plus robustes et moins sujets aux erreurs lorsque l'implémentation change.

#### 4.2. Rendre des composants pour les tests (render)

La fonction `render()` de React Testing Library permet de rendre un composant dans un environnement de test.

```javascript
import { render } from '@testing-library/react';
import MyComponent from './MyComponent';

test('affiche le message', () => {
  const { getByText } = render(<MyComponent message="Bonjour le monde !" />);
  expect(getByText('Bonjour le monde !')).toBeInTheDocument();
});
```

#### 4.3. Sélectionner des éléments DOM avec des requêtes sémantiques

React Testing Library fournit des requêtes sémantiques pour sélectionner des éléments DOM basées sur la façon dont les utilisateurs les percevraient.

| Requête | Description |
|---|---|
| `getByRole(role, options)` | Sélectionne un élément en fonction de son rôle ARIA |
| `getByText(text, options)` | Sélectionne un élément en fonction de son contenu textuel |
| `getByLabelText(text, options)` | Sélectionne un élément en fonction du texte de son label associé |
| `getByPlaceholderText(text, options)` | Sélectionne un élément en fonction de son texte d'espace réservé |
| `getByAltText(text, options)` | Sélectionne une image en fonction de son texte alternatif |

#### 4.4. Simuler des événements utilisateur (fireEvent, userEvent)

Les fonctions `fireEvent` et `userEvent` permettent de simuler des interactions utilisateur, comme des clics, des saisies au clavier et des soumissions de formulaires.

```javascript
import { render, fireEvent } from '@testing-library/react';
import MyButton from './MyButton';

test('déclenche la fonction onClick', () => {
  const handleClick = jest.fn();
  const { getByRole } = render(<MyButton onClick={handleClick} />);
  fireEvent.click(getByRole('button'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

#### 4.5. Détecter les changements asynchrones (waitFor, findBy)

Utilisez `waitFor` ou les requêtes `findBy` pour gérer les changements asynchrones dans les tests, comme les mises à jour d'état ou les requêtes réseau.

```javascript
import { render, screen } from '@testing-library/react';
import MyComponent from './MyComponent';

test('affiche les données chargées', async () => {
  render(<MyComponent />);
  const messageElement = await screen.findByText('Données chargées !');
  expect(messageElement).toBeInTheDocument();
});
```

### 5. Tester les Propriétés et l'État des Composants

#### 5.1. Tester les props des composants et leurs effets sur le rendu

```javascript
import { render } from '@testing-library/react';
import MyComponent from './MyComponent';

test('affiche le nom de l'utilisateur', () => {
  const { getByText } = render(<MyComponent name="John Doe" />);
  expect(getByText('Bonjour, John Doe !')).toBeInTheDocument();
});
```

#### 5.2. Tester l'état interne d'un composant et ses mises à jour

```javascript
import { render, fireEvent } from '@testing-library/react';
import Counter from './Counter';

test('incrémente le compteur', () => {
  const { getByText } = render(<Counter />);
  const incrementButton = getByText('+');
  fireEvent.click(incrementButton);
  expect(getByText('1')).toBeInTheDocument();
});
```

#### 5.3. Tester les effets de bord avec les hooks (useEffect, useState)

```javascript
import { render, waitFor } from '@testing-library/react';
import MyComponent from './MyComponent';

test('effectue une requête réseau au montage', async () => {
  const { getByText } = render(<MyComponent />);
  await waitFor(() => expect(getByText('Données chargées')).toBeInTheDocument());
});
```

### 6. Mocking et Spying

#### 6.1. Introduction au mocking et au spying avec Jest

* **Mocking:** Remplacer une fonction ou un module par une implémentation factice pour isoler le code testé de ses dépendances.
* **Spying:** Observer les appels à une fonction sans la mocker, pour vérifier qu'elle a été appelée avec les bons arguments.

#### 6.2. Mocker des modules et des fonctions (jest.mock)

```javascript
import { fetchData } from './api';
jest.mock('./api');

test('affiche les données récupérées', async () => {
  fetchData.mockResolvedValue({ name: 'John Doe' });
  // ... code du test ...
});
```

#### 6.3. Utiliser les mocks pour les appels d'API (fetch, axios)

```javascript
import axios from 'axios';
jest.mock('axios');

test('affiche les données de l'API', async () => {
  axios.get.mockResolvedValue({ data: { name: 'John Doe' } });
  // ... code du test ...
});
```

#### 6.4. Contrôler le comportement des mocks (mockReturnValue, mockImplementation)

```javascript
import { calculateTotal } from './utils';
jest.mock('./utils');

test('calcule le total avec une remise', () => {
  calculateTotal.mockImplementation((price, discount) => price - discount);
  // ... code du test ...
});
```

### 7. Tests d'Intégration avec React Testing Library

#### 7.1. Différences entre tests unitaires et tests d'intégration

* Les **tests unitaires** vérifient le bon fonctionnement des unités de code individuelles (fonctions, composants) de manière isolée.
* Les **tests d'intégration** vérifient le bon fonctionnement de plusieurs unités de code ensemble, en interaction les unes avec les autres.

#### 7.2. Tester l'interaction entre plusieurs composants

```javascript
import { render, fireEvent } from '@testing-library/react';
import ParentComponent from './ParentComponent';
import ChildComponent from './ChildComponent';

test('affiche le message du composant enfant', () => {
  const { getByText } = render(<ParentComponent />);
  fireEvent.click(getByText('Afficher le message'));
  expect(getByText('Message du composant enfant')).toBeVisible();
});
```

#### 7.3. Utiliser des Context Providers dans les tests

```javascript
import { render } from '@testing-library/react';
import MyComponent from './MyComponent';
import { MyContext } from './MyContext';

test('affiche le nom d'utilisateur du contexte', () => {
  const { getByText } = render(
    <MyContext.Provider value={{ username: 'John Doe' }}>
      <MyComponent />
    </MyContext.Provider>
  );
  expect(getByText('Bonjour, John Doe')).toBeInTheDocument();
});
```

### 8. Meilleures Pratiques et Astuces

#### 8.1. Organiser vos tests de manière claire et concise

* Utilisez des descriptions claires et concises pour vos tests.
* Groupez les tests associés dans des suites de tests.
* Maintenez vos fichiers de test courts et ciblés.

#### 8.2. Nommer vos tests de manière descriptive

Utilisez des noms de test qui décrivent clairement le comportement attendu. Par exemple, `test('affiche le message d'erreur lorsque le formulaire est invalide')`.

#### 8.3. Éviter les tests trop dépendants de l'implémentation

Concentrez-vous sur le comportement du code plutôt que sur son implémentation interne. Cela rendra vos tests plus robustes et moins sujets aux erreurs lorsque l'implémentation change.

#### 8.4. Utiliser les outils de couverture de code (Jest coverage)

La couverture de code vous indique quelles parties de votre code sont couvertes par les tests. Utilisez la commande `npm test -- --coverage` pour générer un rapport de couverture de code.

### 9. Conclusion

#### 9.1. Récapitulatif des concepts clés

* Les tests unitaires sont essentiels pour écrire du code fiable et maintenable.
* Jest et React Testing Library sont des outils puissants pour écrire des tests unitaires pour les applications React.
* Concentrez-vous sur le test du comportement plutôt que de l'implémentation.
* Utilisez les mocks et les spies pour isoler le code testé de ses dépendances.

#### 9.2. Ressources pour approfondir vos connaissances

* [Documentation de Jest](https://jestjs.io/docs/getting-started)
* [Documentation de React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

#### 9.3. L'importance de la pratique continue

La meilleure façon d'apprendre à écrire de bons tests unitaires est de pratiquer. Écrivez des tests pour chaque nouvelle fonctionnalité que vous développez et efforcez-vous d'améliorer continuellement vos compétences en matière de tests.
