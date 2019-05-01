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
export default {
    
    
    methods: {
        connect : function () {
            var server = document.getElementById("server").value;
            var port = document.getElementById("port").value;
            web.websocket = new WebSocket(server+":"+port);
            web.websocket.onerror = function (error) {
                alert('Connection failed: ' + error.data);
            };
            web.websocket.onopen = function(){
                var userName = document.getElementById("user-name").value;
                var pw = document.getElementById("password").value;
                var timestamp = Date.now();
                var lobby = "";
                var joinRequest = {
                    "timestamp": timestamp,
                    "payloadType": "joinRequest",
                    "payload": {
                        "lobby": lobby,
                        "userName": userName,
                        "password": pw,
                        "isArtificialIntelligence": "false",
                        "mods":[]
                    }
                }
                var msg = JSON.stringify(joinRequest);
                web.websocket.send(msg);
            }
            
        }
    },
    props: ['game'],
    
    
}
</script>

<style>

</style>
