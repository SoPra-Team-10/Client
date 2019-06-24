<template>
  <div>
    <h1 class="main-title">Fantastic Feasts</h1>
    <h2 class="app__header">Hauptmenü</h2>
    <div class="app__large-button-container">
      <button class="app__large-button" @click="game.currentState = 'inLobby'">
        Spielen
      </button>
    </div>
    <div class="app__large-button-container">
      <button class="app__large-button" @click="game.currentState = 'inTeam'">
        Team wählen
      </button>
    </div>
    <div class="app__large-button-container">
      <button class="app__large-button" @click="game.currentState = 'inConfig'">
        Konfigurator
      </button>
    </div>
    <div class="app__large-button-container">
      <button class="app__large-button" @click="game.currentState = 'inHelp'">
        Hilfe
      </button>
    </div>
    <div class="app__large-button-container">
      <button
        class="app__large-button"
        @click="game.selectedColorScheme = (game.selectedColorScheme + 1) % 4"
      >
        Farbe ändern
      </button>
    </div>
    <div class="app__large-button-container">
      <button
        id="menu-mute-button"
        class="app__large-button"
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
        @click="game.currentState = 'inGame'"
      >
        Spielfeld anzeigen
      </button>
    </div>
  </div>
</template>

<script>
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
  methods: {
    muteAudio() {
      const audio = document.getElementById("background-music");
      if (this.muted) {
        audio.volume = 1.0;
      } else {
        audio.volume = 0;
      }
      this.muted = !this.muted;
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
