<template>
    <div>
        <h1>Lobby</h1>
        <p>Hier ist die Lobby</p>
        <label for="port">Port</label>
        <input id="port" type="text">
        <label for="server">Server</label>
        <input id="server" type="text">
        <button @click="connect()">Connect</button>
        <hr>
        <div class="row">
            <button @click="game.currentState = 'inMenu'">Zurück zum Menu</button>
            <button @click="game.currentState = 'inGame'">Spielfeld</button>
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
                web.websocket.send("hallo welt");
                //game.currentState = 'inGame';
            }
            web.websocket.onmessage = function(msg){
                alert(msg.data);
            }
        }
    },
    props: ['game'],
    
    
}
</script>

<style>

</style>
