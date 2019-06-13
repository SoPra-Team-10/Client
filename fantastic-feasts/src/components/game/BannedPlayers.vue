<template>
  <div class="info-panel banned-players-panel">
    <h3 class="panel-title">Verbannte Spieler</h3>
    <hr class="inner-separation-line" />
    <!-- <div class="banned-players-container">
            <div v-for="(player, key) in bannedPlayers" 
                :class="['banned-player-tile', {'selected-banned-player-tile': player === playerToPosition}]" 
                :key="key"
            >{{ key.slice(0,1).toUpperCase() }}
            </div>
        </div> -->

    <transition-group
      name="fade"
      class="banned-players"
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <div
        v-for="(player, key, index) in bannedPlayers"
        :key="key"
        :class="[
          'banned-player-tile',
          { 'selected-banned-player-tile': index === 0 }
        ]"
        :style="{
          background:
            'radial-gradient(#00000000, #0000003f), #' +
            teamConfig.colors.primary
        }"
      >
        <div :class="key.slice(0, 6)"></div>
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  // have to be passed over from paren component
  props: {
    bannedPlayer: {
      type: Array,
      required: true
    },
    teamConfig: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.banned-player-tile {
  display: inline-block;
  position: relative;
  width: calc(100vh * 0.0769 * 0.9 * 0.8);
  height: calc(100vh * 0.0769 * 0.9 * 0.8);
  min-height: calc(100vh * 0.0769 * 0.9 * 0.8);
  margin: calc(100vh * 0.0769 * 0.035 * 0.8) calc(100vh * 0.0588 * 0.05 * 0.8);
  border: 1.5px solid #e0a500;
  border-radius: 1vh;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.377);
  font-size: 3vh;
  z-index: 50;
  padding-top: 0.65vh;
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
  margin: 0.3vh;
  font-weight: 700;
  text-align: center;
  font-size: 0.8rem;
  color: #382a17;
}

.banned-players {
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  align-content: center;
  justify-content: space-evenly;
  height: 90%;
  width: 100%;
  overflow-y: auto;
}
</style>
