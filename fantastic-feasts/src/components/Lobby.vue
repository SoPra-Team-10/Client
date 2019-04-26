<template>
    <div>
        <h1>Lobby</h1>
        <p>Hier ist die Lobby</p>
        <label for="port">Port</label>
        <input id="port" type="text">
        <label for="server">Server</label>
        <input id="server" type="text">
        <button v-on:click="connect()">Connect</button>
        <hr>
        <div class="row">
            <button @click="game.currentState = 'inMenu'">Zurück zum Menu</button>
        </div>
    </div>
</template>

<script>
import game from "../App.vue"
export default {
    data(){
        return{

        }
    },
    methods: {
        connect : function () {
            var server = document.getElementById("server").value;
            var port = document.getElementById("port").value;
            game.websocket = new WebSocket(server);
            game.websocket.onerror = function (error) {
                alert('WebSocket Error ' + error);
            };
            game.websocket.onopen = function(){
                game.websocket.send("echo");
            }
            game.websocket.onmessage = function(msg){
                alert(msg.data);
            }
        }
    },
    props: ['game'],
    
    
}
</script>

<style>

</style>
