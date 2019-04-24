<template>
    <div>
        <h1>Menü</h1>
        <button @click="game.currentState = 'inLobby'">Spielen</button>
        <button @click="game.currentState = 'inTeam'">Team wählen</button>
        <button @click="game.currentState = 'inHelp'">Hilfe</button>
        <hr>
        <button @click="game.currentState = 'inGame'">Spielfeld anzeigen</button>
    </div>
</template>

<script>
export default {
    props: ['game']
    
}
</script>

<style>

</style>
