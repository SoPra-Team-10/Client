<template>
  <section>
    <h1 class="app__header">Hilfe</h1>
    <div class="app__content">
      <div id="help-container" class="text-content-container">
        <h2 class="help__title">Wie benutze ich den Client?</h2>
        Im Client zu <i>Fantastic Feasts</i> sind alle Nutzeraktionen gebündelt.
        Sowohl Spielen und Zuschauen, als auch das Erstellen jeglicher
        Spielkonfigurationen sind inbegriffen. Auch eine detaillierte
        Spielanleitung ist weiter unten vorhanden. Die Funktionen werden nun der
        Reihe nach vorgestellt.<br />
        <br />

        <h3>Konfigurator</h3>

        Team- und Spielkonfigurationen können erstellt, bearbeitet, hoch- und
        runtergeladen werden. Diese Funktionen finden sich im Menü unter
        <i>Konfigurator</i>. <br />
        <br />

        Wenn der Nutzer lediglich als Zuschauer an einer Partie teilnehmen
        möchte, kann der folgende Abschnitt übersprungen werden. <br />
        <br />

        <h3>Team wählen</h3>

        Zum Spielen muss unter <i>Team wählen</i> ein zuvor erstelltes Team
        ausgewählt werden. Alternativ kann dort auch eine gültige
        Teamkonfiguration importiert werden. Ist ein Team ausgewählt, kann sich
        der Nutzer im Client mit einem Server verbinden. <br />
        <br />

        <h3>Lobby: Verbindung mit einem Server herstellen</h3>

        Zum verbinden mit einem Server müssen IP-Adresse und Port angegeben
        werden. Dann muss ein Spielername gewählt werden. Das Passwort spielt in
        der aktuellen Implementierung keine Rolle, es muss allerdings ein
        beliebiger String eingegeben werden. Zu guter letzt ist schließlich die
        Lobby anzugeben. Der Name der Lobby muss unter den Teilnehemrn
        ausgemacht werden, da natürlich alle Teilnehmer der gleichen Lobby
        beitreten müssen. Alternativ kann das Häkchen für den Zuschauermodus
        gesetzt werden.
        <br />

        <b>Wichtig:</b> Spielername und Lobby dürfen
        <i>nur alpha-numerische Werte</i> enthalten. Leer- und Sonderzeichen
        werden nicht unterstützt. <br />
        <br />

        <h3>Das Spiel beginnt</h3>

        Wenn die Verbindung fehlerfrei abgelaufen ist, landet der Spieler oder
        Zuschauer auf dem Spielfeld. Ein Spieler muss nun seine
        Quidditch-Figuren positionieren. Dazu muss er einfach auf die
        hervorgehobenen Spielfeld-Kacheln klicken. Es wird der hervorgehobene
        (jeweils vorderste) Spieler platziert. <br />
        <br />

        Alle weiteren Spielregeln werden im nächsten Abschnitt erläutert.
        <br />

        <h2 class="help__title">Spielanleitung</h2>
        <h4 class="help__sub-title"></h4>
        <p>
          In "Fantastc Feasts" können zwei Spieler gegeneinander das aus "Harry
          Potter" bekannte Spiel "Quidditch" in Form eines Brettspiels spielen.
        </p>
        <p>Jeder Spieler steuert dabei ein Team aus sieben Spielfiguren:</p>
        <div class="help__description-block">
          <div
            style="background: radial-gradient( #cc6565, #861111)"
            class="fan help__icon"
          >
            <div class="seeker"></div>
          </div>
          <div
            style="background: radial-gradient( #cc6565, #861111)"
            class="fan help__icon"
          >
            <div class="keeper"></div>
          </div>
          <div
            style="background: radial-gradient( #cc6565, #861111)"
            class="fan help__icon"
          >
            <div class="chaser"></div>
          </div>
          <div
            style="background: radial-gradient( #cc6565, #861111)"
            class="fan help__icon"
          >
            <div class="chaser"></div>
          </div>
          <div
            style="background: radial-gradient( #cc6565, #861111)"
            class="fan help__icon"
          >
            <div class="chaser"></div>
          </div>
          <div
            style="background: radial-gradient( #cc6565, #861111)"
            class="fan help__icon"
          >
            <div class="beater"></div>
          </div>
          <div
            style="background: radial-gradient( #cc6565, #861111)"
            class="fan help__icon"
          >
            <div class="beater"></div>
          </div>
        </div>

        <ul>
          <li>1 <b>Sucher</b> , der für sein Team den Schnatz fängt.</li>
          <li>1 <b>Hüter</b> , der die eigenen Torringe verteidigt.</li>
          <li>3 <b>Jäger</b> , die das Runde ins Runde befördern.</li>
          <li>
            2 <b>Treiber</b> , die mit den Klatschern auf die Fresse geben.
          </li>
        </ul>
        <p>Das Spiel dreht sich um vier Bälle:</p>
        <div class="help__description-block">
          <div class="fan help__icon">
            <div class="help__quaffle"></div>
          </div>
          <div class="fan help__icon">
            <div class="help__bludger"></div>
          </div>
          <div class="fan help__icon">
            <div class="help__bludger"></div>
          </div>
          <div class="fan help__icon">
            <div class="help__snitch"></div>
          </div>
        </div>
        <ul>
          <li>1 <b>Quaffel</b> .</li>
          <li>2 <b>Klatscher</b> .</li>
          <li>1 <b>Schnatz</b> .</li>
        </ul>
        <p>
          Das Spiel ist Rundenbasiert. Die Spieler sind abwechselnd an der Reihe
          und können jedes Mal eine zufällige Spielfigur steuern, die in dieser
          Runde noch nicht dran war. Am Anfang einer Runde bewegen sich die
          Bälle, die dazu in der Lage sind. Die beiden Klatscher ziehen auf die
          jeweils nähste Spielfigur zu, die kein Treiber ist. Zieht er dabei auf
          eine Spielfigur, die kein Treiber ist, besteht für sie eine Chance
          ausgeknockt zu werden, wodurch sie einmal aussetzen muss. Der Schnatz,
          der das Feld erst in Runde 13 betritt, bewegt sich möglichst weit von
          den beiden Suchern weg. Danach werden die Spielfiguren bewegt. Jede
          Spielfigur kann sich zunächst einmal bewegen, also auf ein
          benachbartes Feld ziehen. Falls ein Hüter oder Jäger den Quaffel hält,
          nimmt er diesen mit. Es besteht eine Chance, dass die Spielfigur
          danach ein weiteres Mal ziehen kann. Die Wahrscheinlichkeit davon ist
          abhängig von ihrem Besen. Es gibt davon fünf verschiedene. In
          aufsteigender Reihenfolge:
        </p>
        <ul>
          <li>
            Zunderfauch
          </li>
          <li>
            Sauberwisch 11
          </li>
          <li>
            Sauberwisch 11
          </li>
          <li>Comet 2-60</li>
          <li>
            Nimbus 2001
          </li>
          <li>
            Feuerblitz
          </li>
        </ul>
        <p>
          Jeder Besen muss in einem Team mindestens einmal vertreten sein. Nach
          dem Ziehen darf eine Spielfigur eine Aktion ausführen, wenn das in der
          jeweiligen Situation möglich ist. Jäger und Hüter können den Quaffel
          werfen, wenn sie ihn halten. Ein Jäger, der neben einer Figur steht,
          die den Quaffel hält, kann versuchen, ihr diesen zu entreißen, außer
          es handelt sich um einen Hüter, der sich in seiner eigenen Hüterzone
          befindet. Ein Treiber, der auf demselben Feld wie ein Klatscher steht,
          kann diesen bis zu drei Felder weit, aber nicht durch andere
          Spielfiguren hindurch, schlagen und so auf die Fresse geben. Einige
          Züge sind zwar möglich, aber laut Regelwerk verboten und werden mit
          einer bestimmten Wahrscheinlichkeit vom Schiedsrichter als Foul
          erkannt. Eine Spielfigur, die beim foulen erwischt wird, wird
          verbannt. Am Ende einer Runde, in der ein Tor gefallen ist, dürfen
          gebannte Spielfiguren wieder auf der eigenen Spielfeldhälfte platziert
          werden. Fouls sind:
        </p>

        <p>Auf ein Feld ziehen, auf dem eine gegnerische Spielfigur steht.</p>
        <p>Auf einen Torring des eigenen Teams ziehen.</p>
        <p>
          Mit dem Quaffle auf einen gegnerischen Torring ziehen, um ein Tor zu
          garantieren.
        </p>
        <p>Mit einer Spielfigur auf den Schnatz ziehen, die kein Sucher ist.</p>
        <p>
          Wenn am Ende einer Runde drei Spielfiguren eines Teams gebannt sind,
          verliert der Spieler die Partie.
        </p>

        <p>
          Nachdem jede Spielfigur einmal dran war, ist es möglich, mit Fans in
          das Geschehen einzugreifen. Jedes Team bringt sieben Fans mit, die
          folgenden Spezies angehören können:
        </p>
        <div class="help__description-block">
          <div class="fan help__icon">
            <div class="elf"></div>
          </div>
        </div>
        <p>
          <b>Elfen:</b> Sie teleportieren eine Ausgewählte Spielfigur auf ein
          zufälliges Feld. Sie sind der bei weitem nützlichste Fan-Typ.
          Ernsthaft, sie machen das Spiel kaputt.
        </p>
        <div class="help__description-block">
          <div class="fan help__icon">
            <div class="goblin"></div>
          </div>
        </div>
        <p>
          <b>Kobolde:</b> Greifen eine Spielfigur an, die dadurch den Quaffel
          verliert und auf ein zufälliges freies, benachbartes Feld gestoßen
          wird.
        </p>

        <div class="help__description-block">
          <div class="fan help__icon">
            <div class="troll"></div>
          </div>
        </div>
        <p>
          <b>Trolle:</b> Brüllen, was dazu führt, dass eine Spielfigur, die den
          Quaffel hält, diesen verliert. Sie sind also wie Kobolde, nur
          schlechter.
        </p>
        <div class="help__description-block">
          <div class="fan help__icon">
            <div class="niffler"></div>
          </div>
        </div>
        <p>
          <b>Niffler:</b> Treiben den Schnatz auf ein zufälliges freies
          Nachbarfeld.
        </p>
        <div class="help__description-block">
          <div class="fan help__icon">
            <div class="wombat"></div>
          </div>
        </div>
        <p>
          <b>Wombats:</b> Markieren für die nächste Runde ein Feld, auf das
          Spielfiguren nicht absichtlich ziehen können. Ziemlich nutzlos.
        </p>

        <p>
          Eine Partie endet auf reguläre weise, sobald es dem Sucher eines Teams
          gelingt, den Schnatz zu fangen. Ziel des Spiels ist, zu diesem
          Zeitpunkt mehr Punkte zu haben als der Gegner. Das Fangen des
          Schnatzes bringt 30 Punkte. Eine andere Möglichkeit, seinen
          Punktestand zu erhöhen ist, den Quaffel in einen der gegnerischen
          Torringe zu befördern. Der Quaffel kann von Jägern und Hütern
          aufgenommen, gehalten und geworfen werden. Um ein Tor zu schießen,
          muss der Quaffel auf einem der Torringe liegen bleiben. Eigentore sind
          möglich. Wenn der Quaffel am ende einer Runde auf einem Torring liegt,
          bekommt ihn der Hüter des jeweiligen Teams wenn, falls er sich in
          seiner Hüterzone aufhält. Ansonsten wird der Quaffle in die Mitte des
          Feldes gelegt. Ein Spiel kann jederzeit vom beiden Spieler pausiert
          bzw. fortgesetzt werden.
        </p>
      </div>
    </div>
    <div class="app__footer">
      <hr class="app__footer-separation-line" />
      <button
        class="app__large-button app__footer-button"
        @click="changeState('inMenu')"
        @mouseenter="hoverSound()"
        @mousedown="clickSound()"
      >
        Zurück zum Menü
      </button>
      <!--<button @click="game.currentState = 'inMenu'" class="app__large-button app__footer-button">Shortcuts anzeigen</button>-->
    </div>
  </section>
</template>

<script>
import { hoverSound, clickSound } from "../util/sounds";

export default {
  props: {
    game: {
      type: Object,
      required: true
    }
  },
  methods: {
    changeState(newState) {
      //clickSound();
      this.game.currentState = newState;
    },
    hoverSound() {
      if (!this.game.muted) hoverSound();
    },
    clickSound() {
      if (!this.game.muted) clickSound();
    }
  }
};
</script>

<style>
.text-content-container {
  padding: 2rem 10%;
  overflow: scroll;
  height: 90%;
  position: absolute;
  top: 5%;
  width: 100%;
  left: 0;
  text-align: left;
}

.help__title {
  text-align: center;
}

.help__sub-title {
  text-align: center;
}

.help__icon {
  width: 4rem;
  height: 4rem;
  position: relative;
}

#help-container {
  font-size: 1.3rem;
}

.help__description-block {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: center;
}

.help__snitch {
  background: url(../resources/snitch.svg);
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: 63;
  pointer-events: none;
}

.help__snitch:hover {
  border: 1px solid #dddddd;
}

.help__quaffle {
  background: url(../resources/quaffle.svg);
  height: 100%;
  width: 100%;
  background-size: 70%;
  background-repeat: no-repeat;
  background-position: center;
  position: absolute;
  z-index: 60;
  pointer-events: none;
}

.help__quaffle:hover {
  border: 1px solid #dddddd;
}

.help__bludger {
  background: url(../resources/bludger.svg);
  height: 100%;
  width: 100%;
  background-size: 50%;
  background-repeat: no-repeat;
  background-position: center;
  position: absolute;
  z-index: 61;
  pointer-events: none;
}

.help__bludger:hover {
  border: 1px solid #dddddd;
}
</style>
