<template>
    <div>
        <h1 class="subtitle">Team auswählen</h1>
        <button class="main-menu__button">Dateien</button>
        <hr>
        <button @click="game.currentState = 'inMenu'" class="main-menu__button footer-bar">Zurück zum Menü</button>
    </div>
</template>

<script>
export default {
    props: ['game']
}
</script>

<style>

</style>
