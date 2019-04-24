<template>
    <div>
        <h1>Team auswählen</h1>
        <button>Dateien</button>
        <hr>
        <button @click="game.currentState = 'inMenu'">Zurück zum Menü</button>
    </div>
</template>

<script>
export default {
    props: ['game']
}
</script>

<style>

</style>
