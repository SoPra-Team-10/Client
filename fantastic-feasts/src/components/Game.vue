<template>
    <div id="game-container">
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
                <div class="header__panel" id="pause-panel">
                    Pause
                    <!-- <div class="pause-panel__pause-icon"></div>
                    <div class="pause-panel__pause-icon"></div> -->
                </div>

            </header>
            <div class="sidebar-left">
                <div id="player-info-panel"> 
                    <h3 class="panel-title">Ausgewählter Spieler</h3>
                    <hr class="inner-separation-line">
                </div>
                <div id="banned-players-panel">
                    <h3 class="panel-title">Verbannte Spieler</h3>
                    <hr class="inner-separation-line">
                </div>
                <hr class="normal-separation-line">
                <div id="banned-players-panel">
                    <h3 class="panel-title">Testfunktionen</h3>
                    <hr class="inner-separation-line">
                    <input id="in" type="text">
                    <button @click="sendMsg()">senden</button>
                </div>
            </div>
            <div class="center">
                <div id="game-conainer">
                    <div id="game-grid-panel">
                        <div v-for="tile in this.quidditch.grid" class="gras-tile" :key="tile.id" :style="{ background: tile }"></div>
                    </div>
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
                    <h3 class="panel-title">Gamelog</h3>
                    <hr class="inner-separation-line">
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
            quidditch: {
                grid: ['#6ea34f', '#8acc63', '#6ea34f', '#8acc63', '#6ea34f', '#8acc63', '#6ea34f', '#8acc63', '#6ea34f', '#8acc63', '#6ea34f', '#8acc63', '#6ea34f', '#8acc63', '#6ea34f', '#8acc63', '#6ea34f', '#8acc63', '#6ea34f', '#8acc63', '#6ea34f', '#8acc63']
            }
        }
    },
    methods: {
        sendMsg: function(){
            web.websocket.send(document.getElementById("in").value);
        }
    },
    mounted() {
        var grid = [];
        for(var i = 0; i < 221; i++) {
            if (i % 2 === 0) {
                grid.push('#6ea34f');
            } else {
                grid.push('#8acc63');
            }
        }
        this.quidditch.grid = grid;
    }
}
</script>

<style scoped>

#game-container {

}

.header {
    position: fixed;
    height: 8%;
    width: 100%;
    background: radial-gradient(#5e3d19, #503315);
    text-align: center;
    padding: 10px;
    z-index: 100;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.19);
    border-bottom: 2px solid #533515;
}

.header__panel {  
    display: inline-block;
    text-align: center;
    background: #66421b;
    color: #ddcfc0;
    padding: 15px;
    margin: 5px 25px;
    border-radius: 5px;
}

#main-menu-panel {
    background: radial-gradient(#bb3434, #802020);
    border: 1px solid #e0a500;
    color: #e0a500;
    position: absolute;
    top: 10px;
    left: 10px;
}

#pause-panel {
    background: radial-gradient(#5e923f, #406d24);
    border: 1px solid #e0a500;
    color: #e0a500;
    position: absolute;
    top: 10px;
    right: 10px;
}

#main-menu-panel:hover {
    background: #81623e;
}

#pause-panel:hover {
    background: #81623e;
}

.pause-panel__pause-icon {
    height: 10px;
    width: 3px;
    display: inline-block;
    position: absolute;
    background: #e0a500;
    margin: 2px 5px 2px 5px;
    
}

.sidebar-left {
    display: static;
    position: fixed;
    top: 8%;
    height: 92%;
    width: 17%;
    color: 583b1b;
    background: radial-gradient(#684521, #583b1b);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    z-index: 90;
}

.sidebar-left #player-info-panel,
.sidebar-left #banned-players-panel {
    display: block;
    text-align: center;
    border: 1px solid #ebd18a;
    background: radial-gradient(#ffffff, #ebd18a);
    -moz-box-shadow:    inset 0 0 4px #00000086;
    -webkit-box-shadow: inset 0 0 4px #000000;
    box-shadow:         inset 0 0 4px #000000;
    color: #86633c;
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
    background: #6b451c;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    z-index: 90;
}

#game-log-panel {
    display: block;
    text-align: center;
    background: radial-gradient(#ffffff, #ebd18a);
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
    height: 535px;
    display: static;
    position: absolute;
    left: calc(50% - 350px);
    top: 80px;
    text-align: center;
    color: white;
    display: grid;
    grid-template-columns: repeat(17, 5.88%);
    grid-template-rows: repeat(13, 7.69%);
}

.normal-separation-line {
    border: none;
    border-top: 1px solid #ebd18a;
}

.inner-separation-line {
    border: none;
    border-top: 1px solid #9b7955;
    margin: 5px 0;
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

h1 {
  color: transparent;
  text-shadow: 0px 2px 3px rgba(255,255,255,0.5);
  -webkit-background-clip: text;
     -moz-background-clip: text;
          background-clip: text;
}


.gras-tile:hover {
    border: 1px solid #6b6b6b;
}

.panel-title {
    color: #583b1b;
    margin: 0;
    padding: 0;
}
</style>
