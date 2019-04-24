<template>
    <div>
        <h1>Lobby</h1>
        <p>Hier ist die Lobby</p>
        <label for="port">Port</label>
        <input id="port" type="text">
        <label for="server">Server</label>
        <input id="server" type="text">
        <button>Connect</button>
        <hr>
        <div class="row">
            <button @click="game.currentState = 'inMenu'">Zurück zum Menu</button>
        </div>
    </div>
</template>

<script>
export default {
    props: ['game']
}
</script>

<style>

</style>
