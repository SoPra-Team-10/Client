<template>
    <div>
        <button @click="game.currentState='inMenu'">Zurück zum Menü</button>
        <h1>Spiel</h1>
    </div>
</template>

<script>
export default {
    props: ['game'],
    data() {
        return {
            // hier Spieldaten in JSON reinschreiben, um Spielfeldaufbau zu testen
        }
    }
}
</script>

<style>

</style>
