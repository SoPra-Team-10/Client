<template>
    <div class="info-panel" id="banned-players-panel">
        <h3 class="panel-title">Verbannte Spieler</h3>
        <hr class="inner-separation-line">
        <!-- <div class="banned-players-container">
            <div v-for="(player, key) in bannedPlayers" 
                :class="['banned-player-tile', {'selected-banned-player-tile': player === playerToPosition}]" 
                :key="key"
            >{{ key.slice(0,1).toUpperCase() }}
            </div>
        </div> -->
        
        <div class="left-banned-players">
            <p class="banned-players-label">links</p>
            <div v-for="(player, key) in bannedPlayersTeamLeft.players"
                :key = key
                :class="['banned-player-tile', {'selected-banned-player-tile': player === playerToPosition}]" 
                :style="{ background: 'radial-gradient(#00000000, #0000003f), #' + matchStart.leftTeamConfig.colors.primary }"
            >
                <div @click="printKey(key)" :class="key.slice(0, 6)"></div>
            </div>
        </div>
        <div class="right-banned-players">
            <p class="banned-players-label">rechts</p>
            <div v-for="(player, key) in bannedPlayersTeamRight.players"
                :key = key
                :class="['banned-player-tile', {'selected-banned-player-tile': player === playerToPosition}]" 
                :style="{ background: 'radial-gradient(#00000000, #0000003f), #' + matchStart.rightTeamConfig.colors.primary }"
            >
                <div @click="printKey(key)" :class="key.slice(0, 6)"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    // have to be passed over from paren component
    props: ['bannedPlayersTeamLeft', 'bannedPlayersTeamRight', 'playerToPosition', 'matchStart'],
    methods: {
        printKey(key) {
            console.log(key);
        }
    }
}
</script>

<style scoped>

.banned-player-tile {
    display: inline-block;
    position: relative;
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

.banned-players-label {
    margin: .3vh;
    font-weight: 700;
    text-align: center;
    font-size: .8rem;
    color: #382a17;
}

.left-banned-players {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 85%;
    width: 50%;
    top: 15%;
    left: 0;
}

.right-banned-players {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 85%;
    width: 50%;
    top: 15%;
    right: 0;
}
</style>
