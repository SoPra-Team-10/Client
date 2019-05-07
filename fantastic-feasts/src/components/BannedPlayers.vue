<template>
    <div class="info-panel" id="banned-players-panel">
        <h3 class="panel-title">Verbannte Spieler {{ lowerLeftHeader }}</h3>
        <hr class="inner-separation-line">
        <!-- <div class="banned-players-container">
            <div v-for="(player, key) in bannedPlayers" 
                :class="['banned-player-tile', {'selected-banned-player-tile': player === playerToPosition}]" 
                :key="key"
            >{{ key.slice(0,1).toUpperCase() }}
            </div>
        </div> -->
    </div>
</template>

<script>
export default {
    // have to be passed over from paren component
    props: ['bannedPlayers', 'playerToPosition', 'lowerLeftHeader']
}
</script>

<style scoped>
.banned-players-container {
    padding: 1vw;
}

.banned-player-tile {
    display: inline-block;
    width: calc(100vh * 0.0769 * 0.9 * 0.8);
    height: calc(100vh * 0.0769 * 0.9 * 0.8);
    margin: calc(100vh * 0.0769 * 0.035 * 0.8) calc(100vh * 0.0588 * 0.05 * 0.8);
    border: 1.5px solid #e0a500;
    border-radius: 1vh;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.377);
    font-size: 3vh;
    z-index: 50;
    padding-top: .65vh;
    background: radial-gradient(#5677be, #1d50be);
    color: white;
    text-align: center;
    
}

.banned-player-tile:hover {
    border: 1.5px solid #ffffff;
    
}

.selected-banned-player-tile {
    border: 1.5px solid #ffffff;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.555);  
}

</style>
