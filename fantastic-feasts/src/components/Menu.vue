<template>
    <div>
        <h1 class="main-title">Fantastic Feasts</h1>
        <h2 class="app__header">Hauptmenü</h2>
        <div class="app__large-button-container">
            <button @click="game.currentState = 'inLobby'" class="app__large-button">Spielen</button>
        </div>
        <div class="app__large-button-container">
            <button @click="game.currentState = 'inTeam'" class="app__large-button">Team wählen</button>
        </div>
        <div class="app__large-button-container">
            <button @click="game.currentState = 'inConfig'" class="app__large-button">Konfigurator</button>
        </div>
        <div class="app__large-button-container">
            <button @click="game.currentState = 'inHelp'" class="app__large-button">Hilfe</button>
        </div>
        <div class="app__large-button-container">
            <button @click="game.selectedColorScheme = (game.selectedColorScheme + 1) % 4" class="app__large-button">Farbe ändern</button>
        </div>
        
        <div class="app__footer">
            <hr class="app__footer-separation-line">
            <button @click="game.currentState = 'inGame'" class="app__large-button app__footer-button">Spielfeld anzeigen</button>
        </div>
    </div>
</template>

<script>
export default {
    props: ['game']
    
}
</script>

<style scoped>

.main-title {
  font-family: 'Alice';
  color: #e0a80c;
  font-size: 10vh;
  text-shadow: 1px 1px 2px #1b1b1ba6;
  /* text-shadow: 0px 0px 3px #FFD938; */
}

</style>
