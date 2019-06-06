<template>
    <section>
        <h1 class="app__header">Hilfe</h1>
        <div class="app__content">
            <div class="text-content-container">
                <h3 class="help__title">Spielanleitung</h3>
                <h4 class="help__sub-title"></h4>
                <p class="help__text" style="width: 70vw; height: 60vh; overflow: scroll; position: relative">In "Fantastc Feasts" können zwei Spieler gegeneinander das aus "Harry Potter" bekannte
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
