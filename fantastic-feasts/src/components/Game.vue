<template>
    <div>
        <button @click="game.currentState='inMenu'">Zurück zum Menü</button>
        <h1>Spiel</h1>
        <input id="in" type="text">
        <button @click="sendMsg()">senden</button>
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

<style>

</style>
