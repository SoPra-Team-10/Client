[![Status](https://travis-ci.org/SoPra-Team-10/Client.svg?branch=master)](https://travis-ci.org/SoPra-Team-10/Client)
# Client
Aktuelle Releases können für die verschiedenen Branches genutzt werden:
 * [Master-Branch](http://sopra-10-client.team-onestone.net/)
 * [Develop-Branch](http://sopra-10-client.team-onestone.net/Develop/)
 * Andere Branches http://sopra-10-client.team-onestone.net/BRANCH_NAME


Um die Anwendung in einem neueren Browser zu nutzen muss mixed content erlaubt werden, dies ist z.B. in Chrome/Chromium mit dem Flag `--allow-running-insecure-content` möglich.


## Installation

Die Implementierung des Clients ist als Web-Anwendung gedacht und bedarf daher im Allgemeinen keiner eigenhändigen Installation. Das Spiel kann über die oben aufgelisteten Links gestartet werden.

Sollte es dennoch gewünscht sein, Änderungen vorzunehmen oder das Spiel selbst zu builden, sind folgende Schritte nötig:

- Projektordner runterladen.
- Im entsprechenden Verzeichnis `npm install` ausführen, um externe Packages zu installieren.
- `npm run serve` ausführen, um einen Development-Server zu starten.
- `npm run build` ausführen, um das Projekt zu builden.

Für die Installation ist mindestens Node V8 nötig.

## Verwendete Technologien und Tools

### Dependencies

#### Vue.js
Als Frontend-Framwork wurde Vue.js verwendet, das es u. a. erlaubt, umfangreiche SPAs zu entwickeln.
[Mehr zu Vue.js](https://vuejs.org/)
- vue: ^2.6.10
- vue-template-compiler: ^2.5.21


#### Fontawesome
Fontawesome bietet eine umfangreiche Sammlung kostenloser SVG-Grafiken zur Gestaltunge von UIs, die sich einfach einbinden und konfigurieren lassen.
[Mehr zu Fontawesome](https://fontawesome.com/)
- @fortawesome/fontawesome-svg-core: ^1.2.19
- @fortawesome/free-solid-svg-icons: ^5.9.0
- @fortawesome/vue-fontawesome: ^0.1.6

#### Animate.css
Animated.css bietet eine Sammlung vorgefertigter CSS-Animationen, die sich einfach in die Anwendung einbinden lassen.
[Mehr zu Animate.css](https://daneden.github.io/animate.css/)
- animate.css: ^3.7.2

#### Umfassendes JavaScript
Mit diesem Package lassen sich auch die neuesten Features von JavaScript in die Anwendung integrieren. Babel (siehe unten), erlaubt es dann, diese Features in von allen Browsern unterstütztes JavaScript zu übersetzen.
[Mehr zu core-js](https://www.npmjs.com/package/core-js)
- core-js: ^2.6.5

#### vuex
Vuex ist eine Erweiterung für Vue, die Features für application state management nach dem Vorbild von Redux zur Verfügung stellt.
[Mehr zu vuex](https://vuex.vuejs.org/)
- vuex: ^3.1.1

### Dev-Dependencies

Um den Entwicklungsprozess möglichst produktiv zu gestalten, wurden einige Dev-Dependencies eingesetzt:

#### Vue CLI
Die Vue CLI erlaubt ein schnelles Setup von neuen Vue-Projketen über die Kommandozeile. Dabei können vorab oder nachträglich über einfache Befehle Konfigurationen vorgenommen werden.
[Mehr zu Vue CLI](https://cli.vuejs.org/)
- @vue/cli-service: ^3.6.0

#### ESLint
Da JavaScript eine dynamische Programmiersprache ist, kann die Fehlersuche von Zeit zu Zeit recht umständlich sein.
Mit ESLint, einem JavaScript Linter, können viele Fehler (und spezifizierte Stil-Regeln) vorab erkannt bzw. durchgesetzt werden. Hier wird es in Verbindung mit Babel (neuste ECMA Script Syntax-Unterstützung) und Prettier verwendet.
[Mehr zu ESLint](https://eslint.org/)

- eslint: ^5.16.0
- eslint-loader: ^2.1.2
- eslint-plugin-vue: ^5.0.0
- eslint-config-prettier: ^4.3.0
- eslint-plugin-prettier: ^3.1.0
- babel-eslint: ^10.0.1
- @vue/cli-plugin-eslint: ^3.6.0

#### Babel
Babel erlaubt es, die neuesten Features von JavaScript (ECMA Script) zu verwenden, ohne auf eine vollständige Browser-Unterstützung angewiesen zu sein. Babel übersetzt die neuesten Features in Code mit einer von allen Browsern unterstützten Version von ECMA Script.
[Mehr zu Babel](https://babeljs.io/)
- @babel/core: 7.4.4

#### Prettier
Prettier ist ein Style Formatter, der hier im Zusammenspiel mit ESLint zum Einsatz kommt. Bei jedem Speichervorgang werden die Style-Guides des Vue-Core-Teams automatisch umgesetzt. Es entsteht eine saubere und einheitliche code base.
[Mehr zu Prettier](https://prettier.io/)
- prettier: ^1.18.2
- @vue/cli-plugin-babel: ^3.6.0

Das genaue Setup für Linting und Formatierung ist von [diesem](https://medium.com/@gogl.alex/how-to-properly-set-up-eslint-with-prettier-for-vue-or-nuxt-in-vscode-e42532099a9c) Medium-Artikel inspiriert.


## Texteditor

Als Texteditor kam für den Client ausschließ VisualStudio Code zum Einsatz.
[Mehr zu VS Code](https://code.visualstudio.com/)

## Weitere Software

Zum Erstellen von Spielgrafiken wurde die kommerzielle Software *Affinity Designer v1.7.1* von Serif verwendet.

[Mehr zu Affinity Designer](https://affinity.serif.com/de/designer/)