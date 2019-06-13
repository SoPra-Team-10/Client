<template>
    <section>
        <h1 class="app__header">Hilfe</h1>
        <div class="app__content">
            <div class="text-content-container">
                <h3 class="help__title">Spielanleitung</h3>
                <h4 class="help__sub-title"></h4>
                <p class="help__text" style="width: 70vw; height: 60vh; overflow: scroll; position: relative">
                    Die Spielregeln<br><br>
                    In "Fantastc Feasts" können zwei Spieler gegeneinander das aus "Harry Potter" bekannte
                    Spiel "Quidditch" in Form eines Brettspiels spielen.<br>
                    Jeder Spieler steuert dabei ein Team aus sieben Spielfiguren:<br>
                    1 Sucher, der für sein Team den Schnatz fängt.<br>
                    1 Hüter, der die eigenen Torringe verteidigt.<br>
                    3 Jäger, die das Runde ins Runde befördern.<br>
                    2 Treiber, die mit den Klatschern auf die Fresse geben.<br>
                    Das Spiel entwickelt sich um vier Bälle:<br>
                    1 Quaffel.<br>
                    2 Klatscher.<br>
                    1 Schnatz.<br>
                    Das Spiel ist Rundenbasiert. Die Spieler sind abwechselnd an der Reihe und können jedes Mal eine zufällige Spielfigur
                    steuern, die in dieser Runde noch nicht dran war. Am Anfang einer Runde bewegen sich die Bälle, die dazu in der Lage sind. Die beiden Klatscher
                    ziehen auf die jeweils nähste Spielfigur zu, die kein Treiber ist. Zieht er dabei auf eine Spielfigur, die kein Treiber ist,
                    besteht für sie eine Chance ausgeknockt zu werden, wodurch sie einmal aussetzen muss. Der Schnatz, der das Feld erst in Runde 13 betritt,
                    bewegt sich möglichst weit von den beiden Suchern weg. Danach werden die Spielfiguren bewegt.
                    Jede Spielfigur kann sich zunächst einmal bewegen, also auf ein benachbartes Feld ziehen. Falls ein Hüter oder Jäger
                    den Quaffel hält, nimmt er diesen mit. Es besteht eine Chance, dass die Spielfigur danach 
                    ein weiteres Mal ziehen kann. Die Wahrscheinlichkeit davon ist abhängig von ihrem Besen. Es gibt davon fünf verschiedene.
                    In aufsteigender Reihenfolge:<br>
                    Zunderfauch,<br>
                    Sauberwisch 11,<br>
                    Comet 2-60,<br>
                    Nimbus 2001,<br>
                    Feuerblitz.<br>
                    Jeder Besen muss in einem Team mindestens einmal vertreten sein. Nach dem Ziehen darf eine Spielfigur eine Aktion ausführen,
                    wenn das in der jeweiligen Situation möglich ist. Jäger und Hüter können den Quaffel werfen, wenn sie ihn halten. Ein Jäger,
                    der neben einer Figur steht, die den Quaffel hält, kann versuchen, ihr diesen zu entreißen, außer es handelt sich um einen Hüter,
                    der sich in seiner eigenen Hüterzone befindet. Ein Treiber, der auf demselben Feld wie ein Klatscher steht, kann diesen bis zu drei
                    Felder weit, aber nicht durch andere Spielfiguren hindurch, schlagen und so auf die Fresse geben.
                    Einige Züge sind zwar möglich, aber laut Regelwerk verboten und werden mit einer bestimmten Wahrscheinlichkeit vom
                    Schiedsrichter als Foul erkannt. Eine Spielfigur, die beim foulen erwischt wird, wird verbannt. Am Ende einer Runde, in der ein Tor
                    gefallen ist, dürfen gebannte Spielfiguren wieder auf der eigenen Spielfeldhälfte platziert werden.
                    Fouls sind:<br>
                    Auf ein Feld ziehen, auf dem eine gegnerische Spielfigur steht.<br>
                    Auf einen Torring des eigenen Teams ziehen.<br>
                    Mit dem Quaffle auf einen gegnerischen Torring ziehen, um ein Tor zu garantieren.<br>
                    Mit einer Spielfigur auf den Schnatz ziehen, die kein Sucher ist.<br>
                    Wenn am Ende einer Runde drei Spielfiguren eines Teams gebannt sind, verliert der Spieler die Partie.<br><br>

                    Nachdem jede Spielfigur einmal dran war, ist es möglich, mit Fans in das Geschehen einzugreifen.
                    Jedes Team bringt sieben Fans mit, die folgenden Spezies angehören können:<br>
                    Elfen: Sie teleportieren eine Ausgewählte Spielfigur auf ein zufälliges Feld. Sie sind der bei weitem
                           nützlichste Fan-Typ. Ernsthaft, sie machen das Spiel kaputt.<br>
                    Kobolde: Greifen eine Spielfigur an, die dadurch den Quaffel verliert und auf ein zufälliges freies,
                             benachbartes Feld gestoßen wird.<br>
                    Trolle: Brüllen, was dazu führt, dass eine Spielfigur, die den Quaffel hält, diesen verliert. Sie sind also wie Kobolde, nur schlechter.<br>
                    Niffler: Treiben den Schnatz auf ein zufälliges freies Nachbarfeld.<br>
                    Wombats: Markieren für die nächste Runde ein Feld, auf das Spielfiguren nicht absichtlich ziehen können. Ziemlich nutzlos.<br><br>

                    Eine Partie endet auf reguläre weise, sobald es dem Sucher eines Teams gelingt, den Schnatz zu fangen. Ziel des Spiels ist,
                    zu diesem Zeitpunkt mehr Punkte zu haben als der Gegner. Das Fangen des Schnatzes bringt 30 Punkte. 
                    Eine andere Möglichkeit, seinen Punktestand zu erhöhen ist, den Quaffel in einen der gegnerischen Torringe
                    zu befördern. Der Quaffel kann von Jägern und Hütern aufgenommen, gehalten und geworfen werden. Um ein Tor zu schießen,
                    muss der Quaffel auf einem der Torringe liegen bleiben. Eigentore sind möglich. Wenn der Quaffel am ende
                    einer Runde auf einem Torring liegt, bekommt ihn der Hüter des jeweiligen Teams wenn, falls er sich in seiner Hüterzone aufhält.
                    Ansonsten wird der Quaffle in die Mitte des Feldes gelegt.
                    Ein Spiel kann jederzeit vom beiden Spieler pausiert bzw. fortgesetzt werden.
                    <br><br>
                    Bedienung des Hauptmenüs
                    <br><br>
                    Der Spiel-Client startet im Hauptmenü, das dem Nutzer mehrere Funktionen bietet:<br>
                    Spielen: Öffnet einen Dialog, in dem sich der Nutzer mit einem Spielserver verbinden kann. Dazu muss er
                    die IP-Adresse und den Port des Spielservers, sowie einen Benutzernamen, ein Passwort und den Namen der
                    gewünschten Lobby angeben und auf "Verbiden" klicken. Will er eine Lobby als Zuschauer betreten, muss er die
                    entsprechende Checkbox anwählen. Ist die Verbindung erfolgreich, öffnet sich automatisch die Spielumgebung. <br>
                    Team wählen: Öffnet einen Dialog, der es dem Nutzer ermöglicht, ein gespeichertes Team auszuwählen
                    oder eines aus einer JSON-Datei zu importieren.<br>
                    Konfigurator: Öffnet den Konfigurator, mit dem der Nutzer Teams erstellen, löschen und bearbeiten kann. Noch Dazu
                    erlaubt der Konfigurator das Laden eines Teams aus einer und das Herunterladen eines Teams als JSON-Datei.<br>
                    Hilfe: Öffnet genau diesen Dialog, der genau den Hilfetext anzeigt, den Sie gerade lesen.
                    Farbe ändern: Ändert das Aussehen des Menüs<br>
                    <br>
                    Bedienung der Spielumgebung
                    <br><br>
                    Die Bedienung der Spielumgebung erfolgt ausschließlich mit Hilfe des Mauszeigers.<br>
                    Am Oberen Rand des
                    Bildschirms werden die Namen der Spieler und der Teams, sowie deren Wappen, die Rundenzahl 
                    und der Punktestand angezeigt.<br>
                    In der rechten oberen Ecke befindet sich der Pause-Schalter, mit dem sich eine laufende Partie
                    pausieren lässt. Ist die Partie bereits pausiert, kann sie mit demselben Schalter fortgesetzt werden.<br>
                    In der Mitte der Spielumgebung wird das Spielfeld mit dem aktuellen Spielstand angezeigt.
                    Wenn vom Nutzer eine Aktion gefordert wird, werden gültige Zielfelder markiert. Durch einen Klick
                    auf ein markiertes Feld, legt der Spieler den gewünschten Zielort für die jeweilige Aktion fest.
                    Bei einer Aktion, die kein Ziel benötigt, werden alle Felder des Spielfelds markiert und ein Klicken
                    auf ein markiertes Feld führt die Aktion aus. Die geforderte Aktion wird rechts im Bereich
                    "Spielhinweise angezeigt". Informationen über die ausführende Spielfigur, wie etwa der Name oder
                    die Art des verwendeten Besens, werden links im Bereich "Spielerinformationen" angezeigt.
                    Sollte ein Spieler eine Aktio nicht durchführen und lieber aussetzen wollen,
                    kann er das durch den entsprechenden Schalter in der unteren rechten Ecke tun.<br>
                    Rechts und links in der Spielumgebung werden die Symbole der verbannten Spieler angezeigt. Am 
                    Anfang des Spiels, werden alle Spielfiguren als verbannt betrachtet, wodurch der Nutzer in dem
                    Bereich sehen kann, welche Spielfiguren noch platziert werden können.<br>
                    Am unteren Rand werden die für beide Teams noch verfügbaren Fans angezeigt. Außerdem wird dort
                    die Zeit bis zum Timeout heruntergezählt.<br>
                    Wenn ein Wurf mit dem Quaffel möglich ist und der Cursor auf ein Feld gezogen wird, wird in einem 
                    Bereich in der linken unteren Decke die Wahrscheinlichkeit angezeigt, mit der der Wurf auf dieses
                    Feld erfolgreich ist.<br>
                    Am Ende des Spiels wird der Sieger der Partie angezeigt, zusammen mit einer Schaltfläche, die eine Rückkehr
                    ins Menü ermöglicht.

                </p>
            </div>
        </div>
        <div class="app__footer">
            <hr class="app__footer-separation-line">
            <button @click="game.currentState = 'inMenu'" class="app__large-button app__footer-button">Zurück zum Menü</button>
            <!--<button @click="game.currentState = 'inMenu'" class="app__large-button app__footer-button">Shortcuts anzeigen</button>-->
        </div>
    </section>
</template>

<script>
export default {
    props: ['game']
}
</script>

<style>


</style>
