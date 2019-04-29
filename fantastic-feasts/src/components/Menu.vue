<template>
    <div>
        <h1 class="main-title">Fantastic Feasts</h1>
        <h2 class="subtitle">Hauptmenü</h2>
        <div class="main-menu__button-container">
            <button @click="game.currentState = 'inLobby'" class="main-menu__button">Spielen</button>
        </div>
        <div class="main-menu__button-container">
            <button @click="game.currentState = 'inTeam'" class="main-menu__button">Team wählen</button>
        </div>
        <div class="main-menu__button-container">
            <button @click="game.currentState = 'inConfig'" class="main-menu__button">Konfigurator</button>
        </div>
        <div class="main-menu__button-container">
            <button @click="game.currentState = 'inHelp'" class="main-menu__button">Hilfe</button>
        </div>
        
        <div class="main-menu__button-container footer-bar">
            <hr>
            <button @click="game.currentState = 'inGame'" class="main-menu__button">Spielfeld anzeigen</button>
        </div>
        
    </div>
</template>

<script>
export default {
    props: ['game']
    
}
</script>

<style scoped>

</style>
