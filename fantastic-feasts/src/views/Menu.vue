<template>
  <div>
    <h1 class="main-title">Fantastic Feasts</h1>
    <h2 class="app__header">Hauptmenü</h2>
    <div class="app__large-button-container">
      <button
        class="app__large-button"
        @mousedown="clickSound()"
        @mouseenter="hoverSound"
        @click="changeState('inLobby')"
      >
        Spielen
      </button>
    </div>
    <div class="app__large-button-container">
      <button
        class="app__large-button"
        @mousedown="clickSound()"
        @mouseenter="hoverSound"
        @click="changeState('inTeam')"
      >
        Team wählen
      </button>
    </div>
    <div class="app__large-button-container">
      <button
        class="app__large-button"
        @mousedown="clickSound()"
        @mouseenter="hoverSound"
        @click="changeState('inConfig')"
      >
        Konfigurator
      </button>
    </div>
    <div class="app__large-button-container">
      <button
        class="app__large-button"
        @mousedown="clickSound()"
        @mouseenter="hoverSound"
        @click="changeState('inHelp')"
      >
        Hilfe
      </button>
    </div>
    <div class="app__large-button-container">
      <button
        class="app__large-button"
        @mousedown="clickSound()"
        @mouseenter="hoverSound"
        @click="changeColor"
      >
        Farbe ändern
      </button>
    </div>
    <div class="app__large-button-container">
      <button
        id="menu-mute-button"
        class="app__large-button"
        @mousedown="clickSound()"
        @mouseenter="hoverSound"
        @click="muteAudio"
      >
        <font-awesome-icon
          class="favorite-icon"
          :icon="muted ? 'volume-up' : 'volume-mute'"
          color="#e0a500"
        />
      </button>
    </div>

    <div class="app__footer">
      <hr class="app__footer-separation-line" />
      <button
        class="app__large-button app__footer-button"
        @mousedown="clickSound()"
        @mouseenter="hoverSound"
        @click="changeState('inGame')"
      >
        Spielfeld anzeigen
      </button>
    </div>
  </div>
</template>

<script>
import { hoverSound, clickSound } from "../util/sounds";
import { mapState, mapMutations } from "vuex";

export default {
  props: {
    game: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      muted: false
    };
  },
  computed: {
    ...mapState(["backgroundMusic"])
  },
  methods: {
    ...mapMutations([
      "loadBackgroundMusic",
      "playBackgroundMusic",
      "pauseBackgroundMusic"
    ]),
    changeState(newState) {
      //clickSound();
      this.game.currentState = newState;
    },
    muteAudio() {
      //clickSound();
      if (this.muted) {
        this.backgroundMusic.volume = 1.0;
      } else {
        this.backgroundMusic.volume = 0;
      }
      this.muted = !this.muted;
      this.game.muted = !this.game.muted;
    },
    hoverSound() {
      if (!this.game.muted) hoverSound();
    },
    clickSound() {
      if (!this.game.muted) clickSound();
    },
    changeColor() {
      //clickSound();
      this.game.selectedColorScheme = (this.game.selectedColorScheme + 1) % 4;
    }
  }
};
</script>

<style scoped>
.main-title {
  font-family: "Alice";
  color: #e0a80c;
  font-size: 10vh;
  text-shadow: 1px 1px 2px #1b1b1ba6;
  /* text-shadow: 0px 0px 3px #FFD938; */
}

#menu-mute-button {
  position: fixed;
  top: 1.5rem;
  left: 1.5rem;
  width: 3rem;
  height: 2.5rem;
}
</style>
