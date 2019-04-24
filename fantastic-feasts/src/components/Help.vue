<template>
    <div>
        <h1>Hilfe</h1>
        <p>Hier ist die Spielanleitung.</p>
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
