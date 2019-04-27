<template>
    <div>
        <h1 class="subtitle">Team auswählen</h1>
        <button class="main-menu__button">Dateien</button>
        <div class="main-menu__button-container footer-bar">
            <hr>
            <button @click="game.currentState = 'inMenu'" class="main-menu__button">Zurück zum Menü</button>
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
