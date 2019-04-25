<template>
    <div>
        <h1>Lobby</h1>
        <p>Hier ist die Lobby</p>
        <label for="port">Port</label>
        <input id="port" type="text" v-model="port">
        <label for="server">Server</label>
        <input id="server" type="text" v-model="server">
        <button v-on:click="connect()">Connect</button>
        <hr>
        <div class="row">
            <button @click="game.currentState = 'inMenu'">Zurück zum Menu</button>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        connect : function () {
            var server = document.getElementById("server").value;
            var port = document.getElementById("port").value;
            var websocket = new WebSocket(server, ['soap', 'xmpp']);
            websocket.onerror = function (error) {
                console.log('WebSocket Error ' + error);
            };
        }
    },
    props: ['game']
    
}
</script>

<style>

</style>
