<template>
    <div>
        <section id="game-panel">
            <header class="header">
        <div class="header__panel" id="main-menu-panel" @click="game.currentState='inMenu'">
            Menü
        </div>
        <div class="header__panel" id="team-panel-left">
            Team 1
        </div>
        <div class="header__panel" id="score-panel">
            Punktestand
        </div>
        <div class="header__panel" id="team-panel-right">
            Team 2
        </div>

    </header>
    <div class="sidebar-left">
        <div id="player-info-panel"> Ausgewählter Spieler</div>
        <div id="banned-players-panel">Verbannte Spieler</div>
    </div>
    <div class="center">
        <div id="game-grid-panel">
            Spielfeld
            <input id="in" type="text">
        <button @click="sendMsg()">senden</button>
        </div>
        <div class="spectator-stand-panel">
            <div class="spectator-stand">Zuschauer links

            </div>
            <div class="spectator-stand">Zuschauer rechts
            
            </div>
        </div>
    </div>
    <div class="sidebar-right">
        <div id="game-log-panel">
            Gamelog
        </div>
    </div>
        </section>
    </div>
</template>

<script>
import web from "../App.vue"
export default {
    props: ['game'],
    data() {
        return {
            // hier Spieldaten in JSON reinschreiben, um Spielfeldaufbau zu testen
        }
    },
    methods: {
        sendMsg: function(){
            web.websocket.send(document.getElementById("in").value);
        }
    }
}
</script>

<style scoped>

.header {
    position: fixed;
    height: 8%;
    width: 100%;
    background: #b37835;
    text-align: center;
    padding: 10px;
}

.header__panel {  
    display: inline-block;
    text-align: center;
    background: #70491c;
    color: white;
    padding: 15px;
    margin: 5px 25px;
    border-radius: 5px;
}

#main-menu-panel {
    position: absolute;
    top: 10px;
    left: 10px;
}

#main-menu-panel:hover {
    background: #81623e;
}
.sidebar-left {
    display: static;
    position: fixed;
    top: 8%;
    height: 92%;
    width: 17%;
    background: #b48855;
}

.sidebar-left #player-info-panel,
.sidebar-left #banned-players-panel {
    display: block;
    text-align: center;
    background: #70491c;
    color: white;
    padding: 15px;
    margin: 15px;
    border-radius: 5px;
    height: 200px;
}

.sidebar-right {
    display: static;
    position: fixed;
    left: 83%;
    height: 92%;
    top: 8%;
    width: 17%;
    background: #b48855;
}

#game-log-panel {
    display: block;
    text-align: center;
    background: #70491c;
    color: white;
    padding: 15px;
    margin: 15px;
    border-radius: 5px;
    height: 400px;
}

.center {
    position: absolute;
    left: 17%;
    top: 20%;
    width: 66%;
    padding: 10px;
    text-align: center;
}

#game-grid-panel {
    background: #6ea34f;
    width: 700px;
    height: 450px;
    display: static;
    position: absolute;
    left: calc(50% - 350px);
    top: 80px;
    text-align: center;
    color: white;
    padding: 15px;
    border-radius: 5px;
}

.spectator-stand-panel {
    background: #b8b8b8;
    margin-top: 20px;
    width: 50%;
    height: 100px;
    text-align: center;
    color: white;
    padding: 15px;
    border-radius: 5px;
    display: static;
    position: fixed;
    left: 25%;
    bottom: 10px;

    

}

.spectator-stand {
    display: inline-block;
    text-align: center;
    background: #6b6b6b;
    color: white;
    padding: 25px 50px;
    margin: 0 4%;
    border-radius: 5px;
}
</style>
