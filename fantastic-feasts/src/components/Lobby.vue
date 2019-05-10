<template>
    <div>
        <h1 class="subtitle">Lobby</h1>
        <div class="text-content-container">
            <p id="lobby-description">Willkommen in der Lobby.</p>
            <div class="main-menu__button-container">
            <label for="server" class="menu__input-label">Server:</label>
            <input id="server" type="text" class="menu__input">
            </div>
            <div class="main-menu__button-container">
                <label for="port" class="menu__input-label">Port:</label>
                <input id="port" type="text" class="menu__input">
                <label for="user-name" class="menu__input-label">Benutzername:</label>
                <input id="user-name" type="text" class="menu__input">
                <label for="password" class="menu__input-label">Passwort:</label>
                <input id="password" type="text" class="menu__input">
                <label for="lobby" class="menu__input-label">Lobby:</label>
                <input id="lobby" type="text" class="menu__input">
                <label for="spectator" class="menu__input-label">Als Gast beitreten:</label>
                <input id="spectator" type="Checkbox" class="menu__input">
                
            </div>
            <div class="main-menu__button-container">
                <button @click="connect()" class="main-menu__small-button">Verbinden</button>
            </div>
        </div>
        
        
        <div class="main-menu__button-container footer-bar">
            <hr>
            <button @click="game.currentState = 'inMenu'" class="main-menu__button">Zurück zum Menu</button>
            <button @click="game.currentState = 'inGame'" class="main-menu__button">Spielfeld</button>
        </div>
        
    </div>
    
</template>

<script>
import web from "../App.vue"
import game from "../App.vue"
import configs from "../App.vue"
export default {
    
    props: ['game', 'teamConfig'],
    methods: {
        connect : function () {
            var server = document.getElementById("server").value;
            var port = document.getElementById("port").value;
            //out server for testing
            server = "134.60.29.234";
            port = "8081";
            web.websocket = new WebSocket("ws://"+server+":"+port);
            web.websocket.onerror = function (error) {
                alert('Connection failed: ' + error.data);
            };
            var vm = this;
            web.websocket.onopen = function(){
                var userName = document.getElementById("user-name").value;
                vm.game.userName = userName;
                var pw = document.getElementById("password").value;
                var lobby = document.getElementById("lobby").value;
                var timestamp = Date.now();
                
                var joinRequest = {
                    "timestamp": timestamp,
                    "payloadType": "joinRequest",
                    "payload": {
                        "lobby": "lobby",
                        "userName": userName,
                        "password": "testpw",
                        "isArtificialIntelligence": false,
                        "mods":[]
                    }
                }
                var msg = JSON.stringify(joinRequest);
                
                web.websocket.send(msg);
                web.websocket.onmessage = function(msg){
         
                    var obj = JSON.parse(msg.data);
                    if(obj.payloadType === "loginGreeting"){
                        if(document.getElementById("spectator").value){
                            var conf = vm.teamConfig;
                            conf.image = "";
                            conf.fans.goblins = 2;
                            conf.fans.trolls = 2;
                            conf.fans.nifflers = 2;
                            conf.fans.elves = 1;
                            conf.players.seeker.broom = "tinderblast";
                            conf.players.keeper.broom = "cleansweep11";
                            conf.players.chaser1.broom = "comet260";
                            conf.players.chaser2.broom = "nimbus2001";
                            conf.players.chaser3.broom = "firebolt";
                            conf.colors.primary = "C80010";
                            
                            var timestamp = Date.now();
                            var teamConf = {
                                "timestamp": timestamp,
                                "payloadType": "teamConfig",
                                "payload": vm.teamConfig
                            }
                            web.websocket.send(JSON.stringify(teamConf));
                        }
                        vm.game.currentState = "inGame";
                    }
                    //vm.game.currentState = "inGame";
                }
            }
            
            
        }
    },
    props: ['game', 'teamConfig'],
    
    
}
</script>

<style>

</style>
