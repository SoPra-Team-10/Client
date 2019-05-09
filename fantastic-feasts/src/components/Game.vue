<template>
    <div id="game-container">
        <section id="game-panel">
            <header class="header">
                <div class="header__panel" id="main-menu-panel">
                    <div  id="main-menu-button" @click="game.currentState='inMenu'">
                        Menü
                    </div>
                </div>
                <game-info :matchStart="matchStart" :snapShot="snapShot">
                </game-info>
                <div class="header__panel" id="pause-panel">
                    <div id="pause-button">
                        Pause
                    </div>
                </div>
            </header>
            <div class="sidebar-left">
                <player-details :selectedEntityId="selectedEntityId" :matchStart="matchStart" :selectedEntity="selectedEntity">
                </player-details>
                <!-- <hr class="normal-separation-line"> -->
                <banned-players>
                </banned-players>
            </div>
            <div class="center">
                <div id="game-conainer">
                    <div id="game-grid-panel">
                        <div v-for="(tile, index) in this.grid" 
                            class="gras-tile" :key="tile.id" 
                            @click="clickEmptyTile(tile.xPos, tile.yPos)" 
                            :class="[tile.class,
                                {'highlighted-gras-tile': highlightedTiles.includes(index)
                            }]"
                            >
                            ({{ tile.xPos }} | {{ tile.yPos }}) <br> {{ index }} 
                        </div>
                        <!-- <div v-for="(tile, index) in this.grid" 
                            :key="tile.id" 
                            :class="highlightedTiles.includes(index) ? 'highlighted-gras-tile' : 'hidden-tile'"
                            >
                        </div> -->
                        <div class="goal-post-right-top"></div>
                        <div class="goal-post-right-center"></div>
                        <div class="goal-post-right-bottom"></div>
                        <div class="goal-post-left-top"></div>
                        <div class="goal-post-left-center"></div>
                        <div class="goal-post-left-bottom"></div>
                        <transition-group name="game-balls" tag="div">
                            <div v-for="(ball, key) in snapShot.balls" :key="key" @click="Old(ball.xPos, ball.yPos)" :class="[key]" :style="{ left: 5.88 * ball.xPos + '%', top: 7.69 * ball.yPos + '%', }"></div>
                        </transition-group>
                        <transition-group name="game-players" tag="div">
                            <div v-for="(player, key) in activePlayersTeamLeft" 
                                :key="key" :class="['player-tile', 'left-team-player', key]"
                                :style="{ left: 5.88 * player.xPos + '%', top: 7.69 * player.yPos + '%', }"
                                @click="targetPlayer(player, key)"
                                @mouseenter="hoveredPlayerType = key"
                                @mouseleave="hoveredPlayerType = undefined"> <div :id="key.slice(0,6)"></div>
                                </div>
                        </transition-group>
                        <transition-group name="game-players" tag="div">
                            <div v-for="(player, key) in activePlayersTeamRight" 
                                :key="key" :class="['player-tile', 'right-team-player', key]" 
                                :style="{ left: 5.88 * player.xPos + '%', top: 7.69 * player.yPos + '%', }"
                                @click="targetPlayer(player, key)"> <div :id="key.slice(0,6)"></div></div>
                        </transition-group>
                    </div>
                </div>
                <div class="spectator-stand-panel">
                    <div class="spectator-stand-left">
                        <div v-for="(fan, index) in activeFansTeamLeft" 
                            :key="index"
                            :class="['fan', 'fan-left-team']"
                            @click="fan.banned = true"> {{ fan.fanType.slice(0,1).toUpperCase() }} 
                        </div>
                    </div>
                    <div class="spectator-stand-right">
                        <div v-for="(fan, index) in activeFansTeamRight" 
                            :key="index"
                            :class="['fan', 'fan-right-team']"> {{ fan.fanType.slice(0,1).toUpperCase() }} 
                        </div> 
                    </div>
                </div>
            </div>
            <div class="sidebar-right">
                <game-log :gameLog="gameLog">
                </game-log>
                <!-- <hr class="normal-separation-line"> -->
                <div class="info-panel" id="test-functions-panel">
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
                    <button @click="banLeftTeam()" class="info-panel-button" >Team links verbannen</button>
                    <hr class="inner-separation-line">
                    <div class="info-text">{{ this.selectedEntity }}, {{ this.selectedEntityId }} {{ this.gameState }}, {{ this.turnType }}
                    </div>
                </div>
                <div class="skip-button-container">
                    <button class="skip-button">Zug aussetzen</button>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import web from "../App.vue";
import BannedPlayers from './BannedPlayers.vue';
import GameLog from './GameLog.vue';
import PlayerDetails from './PlayerDetails.vue';
import GameInfo from './GameInfo.vue';

export default {
    props: ['game', 'teamConfig'],
    components: {
        'game-log': GameLog,
        'player-details': PlayerDetails,
        'banned-players': BannedPlayers,
        'game-info': GameInfo
    },
    data() {
        return {
            gameState: 'inGame',
            grid: [],

            selectedEntityId: undefined,
            selectedEntity: undefined,

            highlightedTiles: [],
            // for later
            hoveredPlayerType: undefined,

            // teamFormation
            playerToPosition: undefined,
            
            turnType: String,

            // Use unshift({message: 'String'}) to add log entries to top of Gamelog-Panel. Will be automatically updated.
            gameLog: [{message: 'test1'}, {message: 'test2'}],
            
            // can later be changed to undefined.
            matchStart: {
                matchConfig: {},
                leftTeamConfig: {},
                rightTeamConfig: {},
                leftTeamUserName: "Linkes Team",
                rightTeamUserName: "Rechtes Team"
            },

            // server message data formats

            // // can later be changed to undefined. Values are for debugging purposes

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
            },

            matchFinish: {
                endRound: undefined,
                leftPoints: undefined,
                rightPoints: undefined,
                winnerUserName: undefined,
                victoryReason: undefined
            },

            next: {
                turn: undefined,
                type: undefined,
                timeout: undefined
            },

            // game grid setup
            centerTiles: [92, 93, 94, 109, 110, 111, 126, 127, 128],
            leftAttackTiles: [19, 35, 36, 37, 52, 53, 54, 68, 69, 70, 71, 72, 85, 86, 87, 88, 89, 102, 103, 104, 
                    105, 106, 119, 120, 121, 122, 123, 136, 137, 138, 139, 140, 154, 155, 156, 171, 172, 173, 189
                    ],
            rightAttackTiles: [
                    31, 47, 48, 49, 64, 65, 66, 80, 81, 82, 83, 84, 97, 98, 99, 100, 101, 114, 115, 116,
                    117, 118, 131, 132, 133, 134, 135, 147, 148, 149, 150, 151, 152, 166, 167, 168, 183,
                    184, 185, 201
                    ],
            cornerTiles: [0, 1, 2, 14, 15, 16, 17, 18, 34, 51, 32, 33, 50, 67, 153, 170, 187, 204, 188, 205, 206, 218, 219, 220, 202, 203, 186, 169],   
            
            
            reconnect: {
                matchStart: undefined,
                snapshot: undefined
            },

            teamFormation: {
                players: {
                        seeker: {
                            xPos: 0,
                            yPos: 5,
                        },
                        keeper: {
                            xPos: 7,
                            yPos: 3,
                        },
                        chaser1: {
                            xPos: 7,
                            yPos: 8,
                        },
                        chaser2: {
                            xPos: 4,
                            yPos: 2,
                        },
                        chaser3: {
                            xPos: 4,
                            yPos: 11,
                        },
                        beater1: {
                            xPos: 8,
                            yPos: 9,
                        },
                        beater2: {
                            xPos: 3,
                            yPos: 8,
                        } 
                    }

            }
        }
    },
    computed: {
        /**Adds left half tiles to highlighted tiles */
        leftHalfTiles() {
            var tiles = [];
            for (var i = 0; i < 221;  i++) {
                var column = i % 17;
                if(column < 8) {
                    if(!this.centerTiles.includes(i)) {
                        if(!this.cornerTiles.includes(i)) {
                            tiles.push(i);
                        }
                    }
                }
            }
            return tiles;
        },
        /**Adds right half tiles to highlighted tiles */
        rightHalfTiles() {
            var tiles = [];
            for (var i = 0; i < 221;  i++) {
                var column = i % 17;
                if(column > 8) {
                    if(!this.centerTiles.includes(i)) {
                        if(!this.cornerTiles.includes(i)) {
                            tiles.push(i);
                        }
                    }
                }
            }
            return tiles;
        },
        lowerLeftHeader() {
            if (this.gameState === 'teamFormation') {
                return 'Verfügbare Spieler'
            } else if (this.gameState === 'inGame') {
                return 'Verbannte Spieler'
            }

        },
        activePlayersTeamLeft() {
            var players = this.snapShot.leftTeam.players;
            var activePlayers = {};
            for ( var key in players ) {
                if(!players[key].banned) {
                    activePlayers[key] = players[key];
                    
                }
            }
            return activePlayers;
        },
        activeFansTeamLeft() {
            var fans = this.snapShot.leftTeam.fans;
            var activeFans = {};
            for ( var key in fans ) {
                if(!fans[key].banned) {
                    activeFans[key] = fans[key];
                    
                }
            }
            return activeFans;
        },
        activePlayersTeamRight() {
            var players = this.snapShot.rightTeam.players;
            var activePlayers = {};
            for ( var key in players ) {
                if(!players[key].banned) {
                    activePlayers[key] = players[key];
                    
                }
            }
            return activePlayers;
        },
        activeFansTeamRight() {
            var fans = this.snapShot.rightTeam.fans;
            var activeFans = {};
            for ( var key in fans ) {
                if(!fans[key].banned) {
                    activeFans[key] = fans[key];
                    
                }
            }
            return activeFans;
        },
        getEntity(entityID) {
            if(entityID.startsWith('left')) {
                var key = entityID.slice(4).toLowerCase();
                return this.snapShot.leftTeam.players[key];
            } else if (entityID.startsWith('right')) {
                var key = entityID.slice(5).toLowerCase();
                return this.snapShot.rightTeam.players[key];
            } else {
                switch(entityID) {
                    case 'snitch':
                        return this.snapShot.balls.snitch;
                    case 'bludger1':
                        return this.snapShot.balls.bludger1;
                    case 'bludger2':
                        return this.snapShot.balls.bludger2;
                    case 'quaffle':
                        return this.snapShot.balls.quaffle;

                    // cases for fans have yet to be included !!!       
                    default:
                        return null;
                }
            }
        },
        bannedPlayersTeamLeft() {
            var players = this.snapShot.leftTeam.players;
            var bannedPlayers = {};
            var i = 0;
            for ( var key in players ) {
                if(players[key].banned) {
                    bannedPlayers[key] = players[key];
                    i++;
                }
            }
            return {players: bannedPlayers, number: i}; 
        },
        bannedPlayersTeamRight() {
            var players = this.snapShot.rightTeam.players;
            var bannedPlayers = {};
            var i = 0;
            for ( var key in players ) {
                if(players[key].banned) {
                    bannedPlayers[key] = players[key];
                    i++;
                }
            }
            return {players: bannedPlayers, number: i}; 
        },
        playerInfo() {

        },
        gameInfo() {

        }
    },
    methods: {

        // test-methods
        sendMsg: function(){
            web.websocket.send(document.getElementById("in").value);
        },

        // test method for animation
        shuffleBalls() {
            for (var key in this.snapShot.balls) {
                var ball = this.snapShot.balls[key];
                ball.xPos = Math.floor(Math.random() * Math.floor(11)) +3;
                ball.yPos = Math.floor(Math.random() * Math.floor(7)) +3;
            }
        },

        banLeftTeam() {
            var players = this.snapShot.leftTeam.players;
            for (var key  in players) {
                players[key].banned = !players[key].banned;
            }
            this.gameState = 'teamFormation';
        },

        /**function to be called when a player on the field is clicked. 
         * Sends a deltaRequest message if an action is required if possible
         */

        targetPlayer(player, key) {
            var id = this.playerIdOnTile(player.xPos, player.yPos);
            
            var xPos = player.xPos;
            var yPos = player.yPos;
            
            if(this.turnType === "move"){
                
                if(Math.abs(xPos - this.selectedEntity.xPos) < 2 && Math.abs(yPos - this.selectedEntity.yPos)){
                    this.deltaRequest("move", null, null, xPos, yPos, this.selectedEntityId, null, null, null, null, null);
                }
            }
            else if(this.turnType === "action"){
                if((selectedEntityId.includes("Chaser") || selectedEntityId.includes("Keeper")) && this.selectedEntity.holdsQuaffle){
                    this.deltaRequest("quaffleThrow", null, null, xPos, yPos, this.selectedEntityId, null, null, null, null, null);
                }
                else if(selectedEntityId.includes("Chaser") && player.holdsQuaffle){
                    this.deltaRequest("wrestQuaffle", null, null, null, null, selectedEntityId, null, null, null, null, null);
                }
                else if(this.selectedEntityId.includes("Beater") && this.selectedEntity.holdsBludger){
                    var balls = this.snapshot.balls;
                    if(this.selectedEntity.xPos === balls.bludger1.xPos && this.selectedEntity.yPos === balls.bludger1.yPos){
                        this.deltaRequest("bludgerBeating", balls.bludger1.xPos, balls.bludger1.yPos, xPos, yPos, this.selectedEntityId, "bludger1", null, null, null,  null);
                    }
                    else if(this.selectedEntity.xPos === balls.bludger2.xPos && this.selectedEntity.yPos === balls.bludger2.yPos){
                        this.deltaRequest("bludgerBeating", balls.bludger2.xPos, balls.bludger2.yPos, xPos, yPos, this.selectedEntityId, "bludger2", null, null, null,  null);
                    }
                }
            }
            else if(this.turnType === "fan"){
                if(this.selectedEntityId.includes("Elf")){
                    this.deltaRequest("elfTeleportation", null, null, null, null, null, id, null, null, null, null);
                }
                else if(this.selectedEntityId.includes("Goblin")){
                    this.deltaRequest("goblinShock", null, null, null, null, null, id, null, null, null, null);
                }
                else if(this.selectedEntityId.includes("Niffler")){
                    this.deltaRequest("snitchSnatch", null, null, null, null, null, null, null, null, null, null);
                }
                else if(this.selectedEntityId.includes("Troll")){
                    this.deltaRequest("trollRoar", null, null, null, null, null, null, null, null, null, null);
                }
            }
            //this.selectedEntity = player;
            //this.highlightTiles(xPos, yPos, 1);
        },
        /**function to be calles when a empty tile is clicked.
         * Sends a deltaRequest to the server if clicking the tile induces a valid action if one is required.
         * Sends a teamFormation the the server once all team members are placed for the first time.
         */
        clickEmptyTile: function(xPos, yPos){
            
            this.clickedTile = [xPos, yPos];
            if(!this.started){
                var myTeam;
                if(this.mySide === "left"){
                    this.highlighedtTiles = this.leftHalfTiles;
                    myTeam = this.snapShot.leftTeam;
                    for(let player in this.snapShot.leftTeam.players){
                        if(this.snapShot.leftTeam.players[player].banned){
                            this.snapShot.leftTeam.players[player].banned = false;
                            this.snapShot.leftTeam.players[player].xPos = xPos;
                            this.snapShot.leftTeam.players[player].yPos = yPos;
                            this.selectedEntity = this.snapShot.leftTeam.players[player];
                            break;
                        }
                    }
                }
                else if(this.mySide === "right"){
                    this.highlightedTiles = this.rightHalfTiles;
                    myTeam = this.snapShot.rightTeam;
                    for(let player in this.snapShot.rightTeam.players){
                        if(this.snapShot.rightTeam.players[player].banned){
                            this.snapShot.rightTeam.players[player].banned = false;
                            this.snapShot.rightTeam.players[player].xPos = xPos;
                            this.snapShot.rightTeam.players[player].yPos = yPos;
                            this.selectedEntity = this.snapShot.rightTeam.players[player];
                            break;
                        }
                    }
                }
                //when all players a placed on the field
                if(!myTeam.players.beater2.banned){
                    this.started = true;
                    this.selectedEntity = undefined;
                    this.sendTeamFormation(myTeam);
                    this.highlightedTiles = [];
                }
            }
            else if(this.turnType === "move"){
                
                if(Math.abs(xPos - this.selectedEntity.xPos) < 2 && Math.abs(yPos - this.selectedEntity.yPos)){
                    this.deltaRequest("move", null, null, xPos, yPos, this.selectedEntityId, null, null, null, null, null);
                }
            }
            else if(this.turnType === "action"){
                if((selectedEntityId.includes("Chaser") || selectedEntityId.includes("Keeper")) && this.selectedEntity.holdsQuaffle){
                    this.deltaRequest("quaffleThrow", null, null, xPos, yPos, this.selectedEntityId, null, null, null, null, null);
                }
                else if(this.selectedEntityId.includes("Beater") && this.selectedEntity.holdsBludger){
                    var balls = this.snapshot.balls;
                    if(this.selectedEntity.xPos === balls.bludger1.xPos && this.selectedEntity.yPos === balls.bludger1.yPos){
                        this.deltaRequest("bludgerBeating", balls.bludger1.xPos, balls.bludger1.yPos, xPos, yPos, this.selectedEntityId, "bludger1", null, null, null,  null);
                    }
                    else if(this.selectedEntity.xPos === balls.bludger2.xPos && this.selectedEntity.yPos === balls.bludger2.yPos){
                        this.deltaRequest("bludgerBeating", balls.bludger2.xPos, balls.bludger2.yPos, xPos, yPos, this.selectedEntityId, "bludger2", null, null, null,  null);
                    }
                }
            }
            else if(this.turnType === "fan"){
                if(this.selectedEntityId.includes("Niffler")){
                    this.deltaRequest("snitchSnatch", null, null, null, null, null, null, null, null, null, null);
                }
                else if(this.selectedEntityId.includes("Troll")){
                    this.deltaRequest("trollRoar", null, null, null, null, null, null, null, null, null, null);
                }
            }

            else if(this.turnType === "removeBan"){
                this.deltaRequest("unban", null, null, xPos, yPos, selectedEntityId, null, null, null, null, null);
            }
            
            //if(this.selectedEntity) {
            //    this.selectedEntity.xPos = xPos;
            //    this.selectedEntity.yPos = yPos;
            //}
        },
        /**Reads data from the current snapShot to sends the current team formation to the server */
        sendTeamFormation(myTeam) {
            // so wie es jetzt da steht sind das JSON-Dateien und keine JS-Objekte (die Anführungszeichen müssen weg)
            var payload = {
                players:{
                    seeker:{
                        xPos: myTeam.players.seeker.xPos,
                        yPos: myTeam.players.seeker.yPos,
                    },
                    keeper:{
                        xPos: myTeam.players.keeper.xPos,
                        yPos: myTeam.players.keeper.yPos,
                    },
                    chaser1:{
                        xPos: myTeam.players.chaser1.xPos,
                        yPos: myTeam.players.chaser1.yPos,
                    },
                    chaser2:{
                        xPos: myTeam.players.chaser2.xPos,
                        yPos: myTeam.players.chaser2.yPos,
                    },
                    chaser3:{
                        xPos: myTeam.players.chaser3.xPos,
                        yPos: myTeam.players.chaser3.yPos,
                    },
                    beater1:{
                        xPos: myTeam.players.beater1.xPos,
                        yPos: myTeam.players.beater1.yPos,
                    },
                    beater2:{
                        xPos: myTeam.players.beater2.xPos,
                        yPos: myTeam.players.beater2.yPos,
                    }
                }
            }
            var timestamp = Date.now();
            var teamFormation = {
                    timestamp: timestamp,
                    payloadType: "teamFormation",
                    payload: payload
                }
            web.websocket.send(JSON.stringify(teamFormation));

        },

        // display and animation methods
        generateGrid() {
            var grid = [];
            for(var i = 0; i < 221; i++) {
                if (this.cornerTiles.includes(i)) {
                    grid.push({class: 'corner-tile'});
                } else {
                    var xPos = i % 17;
                    var yPos = (i - xPos) / 17;
                    if(this.centerTiles.includes(i)) {
                        if (i % 2 === 0) {
                            grid.push({class: 'darker-center-gras-tile', xPos: xPos, yPos: yPos});
                        } else {
                            grid.push({class: 'lighter-center-gras-tile', xPos: xPos, yPos: yPos});
                        }
                    } else if (this.leftAttackTiles.includes(i) || this.rightAttackTiles.includes(i)) {
                        if (i % 2 === 0) {
                            grid.push({class: 'darker-attack-gras-tile', xPos: xPos, yPos: yPos});
                        } else {
                            grid.push({class: 'lighter-attack-gras-tile', xPos: xPos, yPos: yPos});
                        }
                    } else if( i % 2 === 0) {
                        grid.push({class: 'darker-gras-tile', xPos: xPos, yPos: yPos});
                    } else {
                        grid.push({class: 'lighter-gras-tile', xPos: xPos, yPos: yPos});
                    }
                }
            }
            return grid;
        },
        /**adds a square of tiles to the highlighted tiles */
        highlightTiles(xPos, yPos, radius) {
            this.highlightedTiles = [];
            for(var x = xPos-radius;x<= xPos + radius;  x++) {
                for(var y= yPos - radius; y <= yPos + radius; y ++) {
                    if(true) {
                        this.highlightTile(x, y); 
                    }
                }
            }
        },
        /**To be called when the component is mounted.
         * Updates the websocket`s onmessage method so server messages can be reacted to.
         */
        startGame: function(){
            var vm = this;
            if(web.websocket) {
                web.websocket.onmessage = function(msg) {
                    var newText = "";
                    var jsonObject = JSON.parse(msg.data);
                    // all message types are assigned to their corresponding handlers
                    if(jsonObject.payloadType === "matchStart"){
                        // debugging:
                        vm.gameLog.unshift({message: 'Server sent: matchStart'});

                        vm.handleMatchStart(jsonObject);
                    }
                    else if(jsonObject.payloadType === "matchFinish"){
                        // debugging:
                        vm.gameLog.unshift({message: 'Server sent: matchFinish'});

                        vm.handleMatchFinish(jsonObject);
                    }
                    else if(jsonObject.payloadType === "snapshot"){
                        // debugging:
                        vm.gameLog.unshift({message: 'Server sent: snapshot'});

                        vm.handleSnapshot(jsonObject);
                    }
                    else if(jsonObject.payloadType === "next"){
                        // debugging:
                        vm.gameLog.unshift({message: 'Server sent: next'});

                        vm.handleNext(jsonObject);
                    }
                }
            }  
        },
        mapFan(fanType) {
            switch(fanType) {
                case 'goblins':
                    return 'Goblins';
                case 'elfs':
                    return 'Elfen';
                case 'nifflers':
                    return 'Niffler';
                case 'trolls':
                    return 'Trolle';
                default: undefined
            } 
        },
        
        // game handlers
        /**Gets the side a player is playing on when a matchStart message is received */
        handleMatchStart: function(obj){
            // store matchStart object in data. This object together with data-bindings will be used to display
            // all the relevant data
            this.matchStart = obj.payload;
            // highlights the proper tiles for teamFormation
            if(obj.payload.leftTeamUserName === game.userName){
                this.mySide = "left";
                this.highlightedTiles = this.leftHalfTiles;
            }
            else if(obj.payload.rightTeamUserName === game.userName){
                this.mySide = "right";
                this.highlightedTiles = this.rightHalfTiles;
            }
        },
        /**Loads the lobby component */
        handleMatchFinish: function(obj){
            this.game.currentState = "inLobby";
        },
        /**Update local snapShot */
        handleSnapshot: function(obj){
            this.snapShot = obj.payload;
        },
        /**Finds out which action is required from which entity and gives the player feedback */
        handleNext: function(obj){
            this.selectedEntity = undefined;
            this.selectedEntityId = obj.payload.turn;
            //if a player is chosen
            if(obj.payload.turn === "leftSeeker") this.selectedEntity = this.snapShot.leftTeam.players.seeker;
            else if(obj.payload.turn === "leftKeeper") this.selectedEntity = this.snapShot.leftTeam.players.keeper;
            else if(obj.payload.turn === "leftChaser1") this.selectedEntity = this.snapShot.leftTeam.players.chaser1;
            else if(obj.payload.turn === "leftChaser2") this.selectedEntity = this.snapShot.leftTeam.players.chaser1;
            else if(obj.payload.turn === "leftChaser3") this.selectedEntity = this.snapShot.leftTeam.players.chaser3;
            else if(obj.payload.turn === "leftBeater1") this.selectedEntity = this.snapShot.leftTeam.players.beater1;
            else if(obj.payload.turn === "leftBeater2") this.selectedEntity = this.snapShot.leftTeam.players.beater2;
            else if(obj.payload.turn === "rightSeeker") this.selectedEntity = this.snapShot.rightTeam.players.seeker;
            else if(obj.payload.turn === "rightKeeper") this.selectedEntity = this.snapShot.rightTeam.players.keeper;
            else if(obj.payload.turn === "rightChaser1") this.selectedEntity = this.snapShot.rightTeam.players.chaser1;
            else if(obj.payload.turn === "rightChaser2") this.selectedEntity = this.snapShot.rightTeam.players.chaser1;
            else if(obj.payload.turn === "rightChaser3") this.selectedEntity = this.snapShot.rightTeam.players.chaser3;
            else if(obj.payload.turn === "rightBeater1") this.selectedEntity = this.snapShot.rightTeam.players.beater1;
            else if(obj.payload.turn === "rightBeater2") this.selectedEntity = this.snapShot.rightTeam.players.beater2;
            
            //if a fan is chosen
            else if(obj.payload.turn.includes("left")){
                
                for(let fan in this.snapShot.leftTeam.fans){
                    if(obj.payload.turn.toLowerCase().includes(this.snapShot.leftTeam.fans[fan].fanType)){
                        this.selectedEntity = this.snapShot.leftTeam.fans[fan];
                        break;
                    }
                }
            }
            else if(obj.payload.turn.includes("right")){
                
                for(let fan in this.snapShot.rightTeam.fans){
                    if(obj.payload.turn.toLowerCase().includes(this.snapShot.rightTeam.fans[fan].fanType)){
                        this.selectedEntity = this.snapShot.rightTeam.fans[fan];
                        break;
                    }
                }
            }
            this.turnType = obj.payload.type;
            
            if(obj.payload.type === "move"){
                this.highlightTiles(this.selectedEntity.xPos, this.selectedEntity.yPos, 1);
            }
            // TODO: throw, beat
        },
        /**increases displayed score of given team by given amount */
        scorePoints(increment, team) {
            this.snapShot[team].points += increment;
        },
        /**Creates and sends a deltaRequest.
         * Resets variables required for actions.
         */
        deltaRequest: function(deltaType, xPosOld, yPosOld, xPosNew, yPosNew, activeEntity, passiveEntity, phase, leftPoints, rightPoints, round){
            this.turnType = null;
            this.highlightedTiles = [];
            var timestamp = Date.now();
            var payload = {
                deltaType: deltaType,
                success: null,
                xPosOld: xPosOld,
                yPosOld: yPosOld,
                xPosNew: xPosNew,
                yPosNew: yPosNew,
                activeEntity: activeEntity,
                passiveEntity: passiveEntity,
                phase: phase,
                leftPoints: leftPoints,
                rightPoints: rightPoints,
                round: round
            }
            var jsonObject = {
                timestamp: timestamp,
                payloadType: "deltaRequest",
                payload: payload
            }
            web.websocket.send(JSON.stringify(jsonObject));
        },
        /**Sends a skip deltaRequest */
        skip: function(){
            this.deltaRequest("skip", null, null, null, null, this.selectedEntityId, null, null, null, null, null);
        },
        /**finds the playerId of the entity standing in the given tile. */
        playerIdOnTile: function(xPos, yPos){
            var pLeft = this.snapShot.leftTeam.players;
            var pRight = this.snapShot.rightTeam.players;

            if(pLeft.seeker.xPos === xPos && pLeft.seeker.yPos === yPos) return "leftSeeker";
            if(pLeft.keeper.xPos === xPos && pLeft.keeper.yPos === yPos) return "leftKeeper";
            if(pLeft.chaser1.xPos === xPos && pLeft.chaser1.yPos === yPos) return "leftChaser1";
            if(pLeft.chaser2.xPos === xPos && pLeft.chaser2.yPos === yPos) return "leftChaser2";
            if(pLeft.chaser3.xPos === xPos && pLeft.chaser3.yPos === yPos) return "leftChaser3";
            if(pLeft.beater1.xPos === xPos && pLeft.beater1.yPos === yPos) return "leftBeater1";
            if(pLeft.beater2.xPos === xPos && pLeft.beater2.yPos === yPos) return "leftBeater2";

            if(pRight.seeker.xPos === xPos && pRight.seeker.yPos === yPos) return "rightSeeker";
            if(pRight.keeper.xPos === xPos && pRight.keeper.yPos === yPos) return "rightKeeper";
            if(pRight.chaser1.xPos === xPos && pRight.chaser1.yPos === yPos) return "rightChaser1";
            if(pRight.chaser2.xPos === xPos && pRight.chaser2.yPos === yPos) return "rightChaser2";
            if(pRight.chaser3.xPos === xPos && pRight.chaser3.yPos === yPos) return "rightChaser3";
            if(pRight.beater1.xPos === xPos && pRight.beater1.yPos === yPos) return "rightBeater1";
            if(pRight.beater2.xPos === xPos && pRight.beater2.yPos === yPos) return "rightBeater2";
        },
        /**computes the id of the given tile */
        getTileId: function(xPos, yPos){
            return yPos*17 + xPos;
        },
        /**Adds given tile to highlighted tiles. */
        highlightTile: function(xPos, yPos){
            this.highlightedTiles.push(this.getTileId(xPos, yPos));
        }
    },
    /**Is automatically called when the component loaded */
    mounted() {
        this.grid = this.generateGrid();
        this.startGame();
        this.matchStart.leftTeamConfig = this.teamConfig;
        this.matchStart.rightTeamConfig = this.teamConfig;
        for(let player in this.snapShot.leftTeam.players){
            this.snapShot.leftTeam.players[player].banned = true;
        }
        for(let player in this.snapShot.rightTeam.players){
            this.snapShot.rightTeam.players[player].banned = true;
        }
        this.mySide = "right";
        this.highlightedTiles = this.rightHalfTiles;
    }
}
</script>

<style>

*{
    -webkit-user-select: none;  /* Chrome all / Safari all */
    -moz-user-select: none;     /* Firefox all */
    -ms-user-select: none;      /* IE 10+ */
    user-select: none;  
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
    position: absolute;
    text-align: left;
    border: 1px solid #ebd18a;
    background: radial-gradient(#ffffff, #ebd18a);
    -moz-box-shadow:    inset 0 0 4px #00000086;
    -webkit-box-shadow: inset 0 0 4px #000000;
    box-shadow:         inset 0 0 4px #000000;
    color: #86633c;
    width: 92%;
    left: 4%;
    height: 40%;
    border-radius: 1%;
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
    background: radial-gradient(#e4f5d9, #bbe2a1);
}


#game-grid-panel {
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
    margin: 2vh 0;
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

    pointer-events: none;

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
    width: 5vh;
    height: 5vh;
    margin: 0.85vh 0.3vh;
    border: 1.5px solid #e0a500;
    border-radius: 1vh;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.377);
    font-size: 3vh;
    z-index: 50;
    padding-top: .6vh; 
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

.hidden-tile {
    background: none;
    pointer-events: none;
}

.gras-tile {
    font-size: 1.2vh;
    padding: 1vh 0;
    color:#ffffff60;
    border:none;
    padding:0;
    background:none;
}

.gras-tile:hover {
    border: 1px solid #6b6b6b;
}

.corner-tile:hover {
   border: none;
   background: #ffffff4b;
   
}

.lighter-gras-tile {
    background: radial-gradient(#99cf79, #8acc63);
}

.darker-gras-tile {
    background: radial-gradient(#85b36b, #6ea34f);
}

.lighter-attack-gras-tile {
    background: radial-gradient(#8cbe6f, #7fbd5b);
}

.darker-attack-gras-tile {
    background: radial-gradient(#78a161, #608f45);
}

.lighter-center-gras-tile {
    background: radial-gradient(#a3db82, #8fd467);
}

.darker-center-gras-tile {
    background: radial-gradient(#97ca79, #7cb859);
}

.highlighted-gras-tile {
    background: radial-gradient(#fbfccf00, #fafc8960), radial-gradient(#97ca79, #7cb859);
    border: 1px solid #fdff6d;
}

.highlighted-gras-tile:hover {
    background: radial-gradient(#feffc72a, #f4f777e3), radial-gradient(#97ca79, #7cb859);
    border: 1px solid #fdff6d;
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

#chaser {
    background: url(../resources/chaser.svg);
    position: absolute;
    height: 90%;
    width: 90%;
    top: 5%;
    left: 5%;
    z-index: 53;
    pointer-events: none;
}

#beater {
    background: url(../resources/beater.svg);
    position: absolute;
    height: 90%;
    width: 90%;
    top: 5%;
    left: 5%;
    z-index: 53;
    pointer-events: none;
}

#keeper {
    background: url(../resources/keeper.svg);
    position: absolute;
    height: 90%;
    width: 90%;
    top: 5%;
    left: 5%;
    z-index: 53;
    pointer-events: none;
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



.goal-post-right-center {
    background: url(../resources/pole-center-ohne.svg);
    height: 7.69%;
    width: calc(5.88% * 2.001);
    position: absolute;
    top: calc(7.69% * 6);
    right: calc(5.88% * 2);
    z-index: 40;
    pointer-events: none;
    background-repeat: no-repeat;
    transform: perspective(130px) rotateY(-45deg);
}

.goal-post-right-top {
    background: url(../resources/pole-center-ohne.svg);
    height: 7.69%;
    width: calc(5.88% * 2.001);
    position: absolute;
    top: calc(7.69% * 4 + 1.3%);
    right: calc(5.88% * 2);
    z-index: 40;
    pointer-events: none;
    background-repeat: no-repeat;
    transform: skewY(-15deg) perspective(130px) rotateY(-45deg) ;
}

.goal-post-right-bottom {
    background: url(../resources/pole-center-ohne.svg);
    height: 7.69%;
    width: calc(5.88% * 2.001);
    position: absolute;
    top: calc(7.69% * 8 - 1.3%);
    right: calc(5.88% * 2);
    z-index: 40;
    pointer-events: none;
    background-repeat: no-repeat;
    transform: skewY(15deg) perspective(130px) rotateY(-45deg) ;
}

.goal-post-left-top {
    background: url(../resources/pole-center-ohne.svg);
    height: 7.69%;
    width: calc(5.88% * 2.001);
    position: absolute;
    top: calc(7.69% * 4 + 1.3%);
    left: calc(5.88% * 2);
    z-index: 40;
    pointer-events: none;
    background-repeat: no-repeat;
    transform: skewY(15deg) perspective(130px) rotateZ(180deg) rotateY(-45deg);
}

.goal-post-left-center {
    background: url(../resources/pole-center-ohne.svg);
    height: 7.69%;
    width: calc(5.88% * 2.001);
    position: absolute;
    top: calc(7.69% * 6);
    left: calc(5.88% * 2);
    z-index: 40;
    pointer-events: none;
    background-repeat: no-repeat;
    transform: perspective(130px) rotateZ(180deg) rotateY(-45deg);
}

.goal-post-left-bottom {
    background: url(../resources/pole-center-ohne.svg);
    height: 7.69%;
    width: calc(5.88% * 2.001);
    position: absolute;
    top: calc(7.69% * 8 - 1.4%);
    left: calc(5.88% * 2);
    z-index: 40;
    pointer-events: none;
    background-repeat: no-repeat;
    transform: skewY(-15deg) perspective(130px) rotateZ(180deg) rotateY(-45deg) ;
}




.panel-title {
    color: #583b1b;
    margin: 0;
    padding: 0;
    font-size: 2vh;
    text-align: center;
    
}

.snitch {
    background: url(../resources/snitch.svg);
    height: 7.69%;
    width: 5.88%;
    position: absolute;
    z-index: 63;
    pointer-events: none;
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
    pointer-events: none;
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
    pointer-events: none;
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
    pointer-events: none;
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

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.corner-tile {
    display: hidden;
    pointer-events: none;
    text-indent: 100%;
    white-space: nowrap;
    overflow: hidden;
}


#player-info-panel {
    top: 2%;
    height: 50%;
}

#game-log-panel {
    top: 2%;
}

#banned-players-panel {
    top: 54%;
}

#test-functions-panel {
    top: 44%;
}


.skip-button-container {
    display: block;
    position: absolute;
    text-align: center;
    border: 1px solid #ebd18a;
    background: radial-gradient(#ffffff, #ebd18a);
    -moz-box-shadow:    inset 0 0 4px #00000086;
    -webkit-box-shadow: inset 0 0 4px #000000;
    box-shadow:         inset 0 0 4px #000000;
    color: #86633c;
    border-radius: 5px;
    min-height: 8%;
    min-width: 142px;
    padding: 2vh;
    font-size: 2.5vh;
    padding: 1.5vh 0.5vh;
    width: 92%;
    left: 4%;
    bottom: 2%;



}

.skip-button {
    background: radial-gradient(#bb3434, #802020);
    border: 1.5px solid #e0a500;
    color: #e0a500;
    position: absolute;
    width: 80%;
    left: 10%;
    font-family: 'Alice';
    height: 60%;
    top: 20%;
    border-radius: 5px;
    text-align: center;
    font-size: 2.5vh;
    box-shadow: 2px 2px 4px 0 rgba(0, 0, 0, 0.4), 0 2px 3px 0 rgba(0, 0, 0, 0.19);
    
}

.skip-button:hover {
    background: #81623e;
    border: 1.5px solid #e0a500;
    color: #e0a500;
}

.skip-button:active,
.skip-button:focus {
    background: #ac8d6b;
    border: 1.5px solid #e0a500;
    color: #e0a500;
}


</style>
