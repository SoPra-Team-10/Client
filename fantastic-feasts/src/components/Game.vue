<template>
    <div id="game-container">
        <section id="game-panel">
            <header class="header">
                <div class="header__panel" id="main-menu-panel">
                    <div  id="main-menu-button" @click="game.currentState='inMenu'">
                        Menü
                    </div>
                </div>
                <div class="header__game-info">
                    <div class="game-info-panel">
                        <div class="header__panel" id="team-panel-left">
                            <div class="header__team-panel-content">
                                Griffindor
                            </div>
                        </div>
                        <div class="header__panel" id="score-panel">
                            <div class="score-panel-content">
                                {{ this.snapShot.leftTeam.points }} : {{ this.snapShot.rightTeam.points }}
                            </div>
                        </div>
                        <div class="header__panel" id="round-panel">
                            <div class="round-panel-content">
                                Runde {{ this.snapShot.round }}
                            </div>
                        </div>
                        <!-- <div class="header__panel" id="round-phase-panel">
                            <div class="round-phase-panel-content">
                                Ziehen
                            </div>
                        </div> -->
                        <div class="header__panel" id="team-panel-right">
                            <div class="header__team-panel-content">
                                Slytherin
                            </div>
                        </div>
                    </div>
                </div>
                <div class="header__panel" id="pause-panel">
                    <div id="pause-button">
                        Pause
                    </div>
                </div>

            </header>
            <div class="sidebar-left">
                <div class="info-panel" id="player-info-panel"> 
                    <h3 class="panel-title">Ausgewählter Spieler</h3>
                    <hr class="inner-separation-line">
                </div>
                <hr class="normal-separation-line">
                <div class="info-panel" id="banned-players-panel">
                    <h3 class="panel-title">Verbannte Spieler</h3>
                    <hr class="inner-separation-line">
                </div>
                
            </div>
            <div class="center">
                <div id="game-conainer">
                    <div id="game-grid-panel">
                        <div v-for="(tile, index) in this.quidditch.grid" class="gras-tile" :key="tile.id" @click="feedback(tile.xPos, tile.yPos)" :style="{ background: tile.color }">({{ tile.xPos }} | {{ tile.yPos }}) <br> {{ index }} </div>
                        <transition-group name="game-balls" tag="div">
                            <div v-for="(ball, key) in snapShot.balls" :key="key" :class="[key]" :style="{ left: 5.88 * ball.xPos + '%', top: 7.69 * ball.yPos + '%', }"></div>
                        </transition-group>
                        <transition-group name="game-players" tag="div">
                            <div v-for="(player, key) in snapShot.leftTeam.players" 
                                :key="key" :class="['player-tile', 'left-team-player', key]" 
                                :style="{ left: 5.88 * player.xPos + '%', top: 7.69 * player.yPos + '%', }"
                                @click="clickedPlayer=player"> {{ key.slice(0,1).toUpperCase() }}</div>
                        </transition-group>
                        <transition-group name="game-players" tag="div">
                            <div v-for="(player, key) in snapShot.rightTeam.players" 
                                :key="key" :class="['player-tile', 'right-team-player', key]" 
                                :style="{ left: 5.88 * player.xPos + '%', top: 7.69 * player.yPos + '%', }"
                                @click="clickedPlayer=player"> {{ key.slice(0,1).toUpperCase() }}</div>
                        </transition-group>
                    </div>
                </div>
                <div class="spectator-stand-panel">
                    <div class="spectator-stand-left">
                        <div v-for="(fan, index) in snapShot.leftTeam.fans" 
                            :key="index"
                            :class="['fan', 'fan-left-team']"> {{ fan.fanType.slice(0,1).toUpperCase() }} 
                        </div>
                    </div>
                    <div class="spectator-stand-right">
                        <div v-for="(fan, index) in snapShot.rightTeam.fans" 
                            :key="index"
                            :class="['fan', 'fan-right-team']"> {{ fan.fanType.slice(0,1).toUpperCase() }} 
                        </div> 
                    </div>
                </div>
            </div>
            <div class="sidebar-right">
                <div class="info-panel" id="game-log-panel">
                    <h3 class="panel-title">Gamelog</h3>
                    <hr class="inner-separation-line">
					<h5 id="game-log"></h5>
                </div>
                <hr class="normal-separation-line">
                <div class="info-panel">
                    <h3 class="panel-title">Testfunktionen</h3>
                    <hr class="inner-separation-line">
                    <input id="in" type="text">
                    <button @click="sendMsg()" class="info-panel-button">Senden</button>
                    <hr class="inner-separation-line">
                    <button @click="shuffleBalls()" class="info-panel-button">Bälle mischen</button>
                    <br>
                    <button @click="scorePoints(5, 'leftTeam')" class="info-panel-button" >Punkte links</button>
                    <br>
                    <button @click="scorePoints(5, 'rightTeam')" class="info-panel-button" >Punkte rechts</button>
                    <hr class="inner-separation-line">
                    <div class="info-text" v-if="!this.clickedTile == []">Ausgewähltes Feld: {{ this.clickedTile[0] }} | {{ this.clickedTile[1] }}</div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import web from "../App.vue";

export default {
    props: ['game'],
    data() {
        return {
            quidditch: {
                grid: []
            },
            clickedTile: [],
            clickedPlayer: undefined,
            snapShot: {    
                phase: 'ballPhase',
                spectatorUserName: ['Gast'],
                round: 5,
                leftTeam: {
                    points: 0,
                    fans: [
                        {
                            fanType: 'troll',
                            banned: false
                        },
                        {
                            fanType: 'troll',
                            banned: false
                        },
                        {
                            fanType: 'elf',
                            banned: false
                        },
                        {
                            fanType: 'elf',
                            banned: false
                        },
                        {
                            fanType: 'goblin',
                            banned: false
                        },
                        {
                            fanType: 'goblin',
                            banned: false
                        },
                        {
                            fanType: 'niffler',
                            banned: false
                        }
                    ],
                    players: {
                        seeker: {
                            xPos: 2,
                            yPos: 5,
                            banned: false,
                            turnUsed : false
                        },
                        keeper: {
                            xPos: 7,
                            yPos: 3,
                            banned: false,
                            holdsQuaffle : false,
                            turnUsed : false
                        },
                        chaser1: {
                            xPos: 7,
                            yPos: 8,
                            banned: false,
                            holdsQuaffle : false,
                            turnUsed : false
                        },
                        chaser2: {
                            xPos: 4,
                            yPos: 2,
                            banned: false,
                            holdsQuaffle : false,
                            turnUsed : false
                        },
                        chaser3: {
                            xPos: 4,
                            yPos: 11,
                            banned: false,
                            holdsQuaffle : false,
                            turnUsed : false
                        },
                        beater1: {
                            xPos: 8,
                            yPos: 9,
                            banned: false,
                            holdsBludger : false,
                            turnUsed : false
                        },
                        beater2: {
                            xPos: 3,
                            yPos: 8,
                            banned: false,
                            holdsBludger : false,
                            turnUsed : false
                        } 
                    }
                },
                rightTeam:{
                    points: 0,
                    fans: [
                        {
                            fanType: 'troll',
                            banned: false
                        },
                        {
                            fanType: 'elf',
                            banned: false
                        },
                        {
                            fanType: 'elf',
                            banned: false
                        },
                        {
                            fanType: 'elf',
                            banned: false
                        },
                        {
                            fanType: 'goblin',
                            banned: false
                        },
                        {
                            fanType: 'niffler',
                            banned: false
                        },
                        {
                            fanType: 'niffler',
                            banned: false
                        }   
                    ],
                    players: {
                        seeker: {
                            xPos: 10,
                            yPos: 2,
                            banned: false,
                            turnUsed : false
                        },
                        keeper: {
                            xPos: 13,
                            yPos: 3,
                            banned: false,
                            holdsQuaffle : false,
                            turnUsed : false
                        },
                        chaser1: {
                            xPos: 10,
                            yPos: 10,
                            banned: false,
                            holdsQuaffle : false,
                            turnUsed : false
                        },
                        chaser2: {
                            xPos: 14,
                            yPos: 8,
                            banned: false,
                            holdsQuaffle : false,
                            turnUsed : false
                        },
                        chaser3: {
                            xPos: 16,
                            yPos: 5,
                            banned: false,
                            holdsQuaffle : false,
                            turnUsed : false
                        },
                        beater1: {
                            xPos: 9,
                            yPos: 11,
                            banned: false,
                            holdsBludger : false,
                            turnUsed : false
                        },
                        beater2: {
                            xPos: 11,
                            yPos: 6,
                            banned: false,
                            holdsBludger : false,
                            turnUsed : false
                        } 
                    }
                },
                balls: {
                    snitch: {
                        xPos: 4,
                        yPos: 5
                    },
                    quaffle: {
                        xPos: 7,
                        yPos: 9
                    },
                    bludger1: {
                        xPos: 10,
                        yPos: 4
                    },
                    bludger2: {
                        xPos: 6,
                        yPos: 7
                    }
                }
            }
        }
    },
    methods: {
        sendMsg: function(){
            web.websocket.send(document.getElementById("in").value);
        },
        feedback: function(xPos, yPos){
            this.clickedTile = [xPos, yPos];
            if(this.clickedPlayer) {
                this.clickedPlayer.xPos = xPos;
                this.clickedPlayer.yPos = yPos;
            }
        },
        startGame: function(){
            web.websocket.onmessage = function(msg){
                var newText = "";
                var jsonObject = JSON.parse(msg.data);
                Object.keys(jsonObject).forEach(key =>{
                var val = jsonObject[key];
               
                newText = newText + "\n" + key + ": " + val; 
                });
                document.getElementById("game-log").innerHTML = newText;
            }
        },
        generateGrid() {
            var grid = [];
            for(var i = 0; i < 221; i++) {
                if ([0, 1,2,3, 14, 15, 16, 17, 18, 34, 51, 32, 33, 50, 67, 153, 170, 187, 204, 188, 205, 206, 218, 219, 220, 202, 203, 186, 169].includes(i)) {
                    grid.push({color: '#89cc63b2'});
                } else {
                    var xPos = i % 17;
                    var yPos = (i - xPos) / 17;
                    if( i % 2 === 0) {
                        grid.push({color: '#6ea34f', xPos: xPos, yPos: yPos});
                    } else {
                        grid.push({color: '#8acc63', xPos: xPos, yPos: yPos});
                    }
                }
            }
            return grid;
        },
        shuffleBalls() {
            for (var key in this.snapShot.balls) {
                var ball = this.snapShot.balls[key];
                ball.xPos = Math.floor(Math.random() * Math.floor(11)) +3;
                ball.yPos = Math.floor(Math.random() * Math.floor(7)) +3;
            }
        },
        scorePoints(increment, team) {
            this.snapShot[team].points += increment;
        }
    },
    mounted() {
        this.quidditch.grid = this.generateGrid();
		this.startGame();
    }
}
</script>

<style scoped>

#game-container {

}

.prevent-inline {
    display: block;
}

.header {
    position: fixed;
    height: 8%;
    width: 100%;
    background: radial-gradient(#5e3d19, #503315);
    z-index: 100;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.19);
    border-bottom: 2px solid #533515;
}


#main-menu-panel {
    position: absolute;
    height: 100%;
    width: 5%;
    left: 2%;
    
}

#team-panel-right {
    position: absolute;
    text-align: right;
    width: 40%;
    right: 0%;
    font-size: 3vh;
    padding: 1.2vh;
}

#team-panel-left {
    position: absolute;
    text-align: left;
    width: 40%;
    left: 0%;
    font-size: 3vh;
    padding: 1.2vh;
}

.header__game-info {
    position: absolute;
    width: 86%;
    height: 100%;
    left: 7%;
}

#pause-panel {
    position: absolute;
    height: 100%;
    width: 5%; 
    right: 2%;
    top: 0;
}

#main-menu-button {
    background: radial-gradient(#bb3434, #802020);
    border: 1px solid #e0a500;
    color: #e0a500;
    position: absolute;
    width: 100%;
    top: 10%;
    height: 80%;
    border-radius: 5px;
    min-width: 48px;
    text-align: center;
    font-size: 2.5vh;
    padding: 1.5vh 0.5vh;
}

#score-panel {
    position: absolute;
    width: 30%;
    left: 35%;
    top: -10%;
    background: radial-gradient(#bb3434, #802020);
    height: 120%;
    color: #e7e7e7;
    border-radius: 2px;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 2px 3px 0 rgba(0, 0, 0, 0.19);
    line-height: 80%;
    text-align: center;
    font-size: 5vh;
    padding: 1.5vh 0.5vh;
    z-index: 91;

}

#round-panel {
    position: absolute;
    width: 20%;
    left: 40%;
    top: 100%;
    background: radial-gradient(#ffffff, #e7e7e7);
    height: 70%;
    color: #4d4d4d;
    border-radius: 2px;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 2px 3px 0 rgba(0, 0, 0, 0.19);
    line-height: 80%;
    text-align: center;
    font-size: 2.7vh;
    padding: 1.5vh 0.5vh;
    z-index: 90;
}

#pause-button {
    background: radial-gradient(#5e923f, #406d24);
    border: 1px solid #e0a500;
    color: #e0a500;
    position: absolute;
    top: 10%;
    height: 80%;
    width: 100%;
    border-radius: 5px;
    min-width: 48px;
    text-align: center;
    font-size: 2.5vh;
    padding: 1.5vh 0.5vh;
}

#main-menu-button:hover {
    background: #81623e;
}

#pause-button:hover {
    background: #81623e;
}

.game-info-panel {
    position: absolute;
    width: 60%;
    min-height: 80%;
    top: 10%;
    left: 20%;
    background: radial-gradient(#ffffff, #ece3ca);
    border-radius: 8px;
    border: 1px solid #e4d8b8;
    -moz-box-shadow:    inset 0 0 3px #00000086;
    -webkit-box-shadow: inset 0 0 3px #000000;
    box-shadow:         inset 0 0 3px #000000;
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
    min-width: 173px;
}

.sidebar-right {
    display: static;
    position: fixed;
    right: 0%;
    height: 92%;
    top: 8%;
    width: 17%;
    background: radial-gradient(#684521, #583b1b);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    z-index: 90;
    min-width: 173px;
}

.info-panel {
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
    min-height: 40%;
    min-width: 142px;
    font-size: 2.5vh;
    padding: 1.5vh 0.5vh;
}

.info-text {
    font-size: 1.8vh;
}

.info-panel-button {
    background: radial-gradient(#f0dfb2, #f0dfb2);
    display: auto;
    color: #8d6951;
    font-family: 'Alice';
    font-size: 1.8vh;
    border: 1px solid #99735a;
    border-radius: 3px;
    margin: 10px 5px 0 5px;
}

.info-panel-button:hover {
    background: radial-gradient(#fdfdfd, #eee2c3);
    color: #755945;
    border: 1px solid #755945;
}

.info-panel-button:active {
    background: radial-gradient(#fdfdfd, #eee2c3);
    color: #ffffff;
    border: 1px solid #ffffff;
}




.center {
    position: absolute;
    left: 17%;
    top: 8%;
    height: 92%;
    width: 66%;
    padding: 10px;
    text-align: center;
}

#game-grid-panel {
    background: #6ea34f;
    width: calc(75vh * 17 / 13);
    height: 75vh;
    display: static;
    position: fixed;
    top: 13vh;
    left: calc((100vw - (75vh * 17 / 13)) / 2);
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
    background:radial-gradient(#797979, #525252);
    position: fixed;
    height: 10%;
    width: 60%;
    left: 20%;
    bottom: 0;
    border: 1px solid #adadad;
    border-bottom: none;
    border-radius: 1vh 1vh 0 0;
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.5), 0 0 19px 0 rgba(0, 0, 0, 0.19);
}

.spectator-stand-left {
    position: absolute;
    text-align: center;
    background:radial-gradient(#6b6b6b, #525252);
    color: white;
    border-radius: 1vh;
    width: 42.5%;
    height: 70%;
    top: 15%;
    left: 5%;
    border: 1px solid #7e7e7e;
    -moz-box-shadow:    inset 0 0 3px #00000086;
    -webkit-box-shadow: inset 0 0 3px #000000;
    box-shadow:         inset 0 0 3px #000000;
}

.spectator-stand-right {
    position: absolute;
    text-align: center;
    background:radial-gradient(#6b6b6b, #525252);
    color: white;
    border-radius: 1vh;
    width: 42.5%;
    height: 70%;
    top: 15%;
    right: 5%;
    border: 1px solid #7e7e7e;
    -moz-box-shadow:    inset 0 0 3px #00000086;
    -webkit-box-shadow: inset 0 0 3px #000000;
    box-shadow:         inset 0 0 3px #000000;
}

.ball {
    z-index: 60;
    background: white;

}

.ball:hover {
    border: 1px solid #424242;
}

.player {
    z-index: 50;
}

.fan {
    display: inline-block;
    z-index: 50;
    position: relative;
    width: 11.3%;
    height: 80%;
    margin: 5px;
    border: 1.5px solid #e0a500;
    border-radius: 1vh;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.377);
    font-size: 3vh;
    z-index: 50;
    padding-top: .65vh; 
}

.fan:hover {
    background: radial-gradient(#e7c87300, #e9cf8894);
}

h1 {
  color: transparent;
  text-shadow: 0px 2px 3px rgba(255,255,255,0.5);
  -webkit-background-clip: text;
     -moz-background-clip: text;
          background-clip: text;
}


.gras-tile {
    font-size: 1.2vh;
    padding: 1vh 0;
    color:#ffffff60;
    border:none;
    padding:0;
    background:none;
}

.player-tile {
    position: absolute;
    width: calc(5.88% * 0.9);
    height: calc(7.69% * 0.9);
    margin: calc(7.69% * 0.035) calc(5.88% * 0.05);
    border: 1.5px solid #e0a500;
    border-radius: 1vh;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.377);
    font-size: 3vh;
    z-index: 50;
    padding-top: .65vh;
}

.player-tile:hover {
    border: 1.5px solid #ffffff;
}

.right-team-player {
    background: radial-gradient(#4bb176, #1d8649);
}

.left-team-player {
    background: radial-gradient(#5677be, #1d50be);
}

.gras-tile:hover {
    border: 1px solid #6b6b6b;
}


.panel-title {
    color: #583b1b;
    margin: 0;
    padding: 0;
    font-size: 2vh;
    
}

.snitch {
    background: url(../resources/snitch.svg);
    height: 7.69%;
    width: 5.88%;
    position: absolute;
    z-index: 63;
}

.snitch:hover {
    border: 1px solid #dddddd;
}

.quaffle {
    background: url(../resources/quaffle.svg);
    height: 7.69%;
    width: 5.88%;
    background-size: 70%;
    background-repeat: no-repeat;
    background-position: center;
    position: absolute;
    z-index: 60;
}

.quaffle:hover {
    border: 1px solid #dddddd;
}

.bludger1 {
    background: url(../resources/bludger.svg);
    height: 7.69%;
    width: 5.88%;
    background-size: 50%;
    background-repeat: no-repeat;
    background-position: center;
    position: absolute;
    z-index: 61;
}

.bludger1:hover {
    border: 1px solid #dddddd;
    
}

.bludger2 {
    background: url(../resources/bludger.svg);
    height: 7.69%;
    width: 5.88%;
    background-size: 50%;
    background-repeat: no-repeat;
    background-position: center;
    position: absolute;
    z-index: 62;
}

.bludger2:hover {
    border: 1px solid #dddddd;
}

.game-balls-move {
    transition: transform 1s;
}

.game-players-move {
    transition: transform 1s;
}


</style>
