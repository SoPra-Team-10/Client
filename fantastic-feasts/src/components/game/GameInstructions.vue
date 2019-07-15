<template>
  <!-- This components displays instrutcions and tips for the player -->
  <div id="game-instructions-panel" class="info-panel">
    <h3 class="panel-title">Spielhinweise</h3>
    <hr class="inner-separation-line" />
    <!-- <h5 id="game-instructions"></h5> -->
    <div class="instruction-entry-container">
      <transition-group name="slide">
        <div v-for="error in errors" :key="error.code" class="warning-entry">
          <div
            style="
              background: radial-gradient(#b43333, #7e1111)
            ;"
            class="warning-entry__icon-container"
          >
            <font-awesome-icon
              size="2x"
              :icon="'exclamation-circle'"
              color="#00000083"
            />
          </div>
          <div class="warning-entry__code-container">
            <p>
              {{ error.code }}
              <span v-if="error.triggerMatchFinish"> – Spielende!</span>
            </p>
          </div>
          <div class="warning-entry__information-container">
            <p>{{ error.information }}</p>
          </div>
        </div>
        <div :key="renderedPhase.phaseName" class="game-phase-entry">
          <div
            :style="{
              background:
                'radial-gradient(' +
                renderedPhase.phaseColorLight +
                ',' +
                renderedPhase.phaseColorDark +
                ')'
            }"
            class="game-phase-entry__icon-container"
          >
            <font-awesome-icon
              size="2x"
              :icon="renderedPhase.phaseIcon"
              color="#00000083"
            />
          </div>
          <div class="game-phase-entry__name-container">
            <p>{{ renderedPhase.phaseName }}</p>
          </div>
          <div class="game-phase-entry__description-container">
            <p>{{ renderedPhase.phaseDescription }}</p>
          </div>
        </div>
        <div
          v-for="warning in warnings"
          :key="warning.code"
          class="warning-entry"
        >
          <div
            style="
              background: radial-gradient(#fde974, #e7c500)
            ;"
            class="warning-entry__icon-container"
          >
            <font-awesome-icon
              size="2x"
              :icon="'exclamation-triangle'"
              color="#00000083"
            />
          </div>
          <div class="warning-entry__code-container">
            <p>{{ warning.code }}</p>
          </div>
          <div class="warning-entry__information-container">
            <p>{{ warning.information }}</p>
          </div>
        </div>
        <div
          v-for="(instruction, i) in limitedGameInstruction"
          :key="instruction.key"
          :class="[
            'instruction-entry',
            { 'highlighted-instruction-entry': i % 2 === 0 }
          ]"
        >
          {{ instruction.message }}
          <!-- <span v-if="instruction.time" style="color: gray">@{{ instruction.time }}</span> -->
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    gameInstruction: {
      required: false,
      type: Array,
      default() {
        return [{}];
      }
    },
    phase: {
      required: false,
      type: String,
      default() {
        return "";
      }
    },
    warnings: {
      required: false,
      type: Array,
      default() {
        return [{}];
      }
    },
    errors: {
      required: false,
      type: Array,
      default() {
        return [{}];
      }
    }
  },
  data() {
    return {
      //gameInstruction: [{message: 'moved player from x to y'}, {message: 'moved player from x to y'}, {message: 'moved player from x to y'}, {message: 'moved player from x to y'}, {message: 'moved player from x to y'}, {message: 'moved player from x to y'}, {message: 'moved player from x to y'}, {message: 'moved player from x to y'}, {message: 'moved player from x to y'}, {message: 'moved player from x to y'}, {message: 'moved player from x to y'}, {message: 'moved player from x to y'}, {message: 'moved player from x to y'}, {message: 'moved player from x to y'}, {message: 'moved player from x to y'}, {message: 'moved player from x to y'}, {message: 'moved player from x to y'}, {message: 'moved player from x to y'} ]
    };
  },
  computed: {
    limitedGameInstruction() {
      const l = this.gameInstruction.length;
      return this.gameInstruction.slice(0, 10);
    },
    renderedPhase() {
      let phaseName = "";
      let phaseDescription = "";
      let phaseIcon = "";
      let phaseColorLight = "";
      let phaseColorDark = "";
      switch (this.phase) {
        case "positioning":
          phaseName = "Spielerpositionierung";
          phaseDescription = `In dieser Phase werden die Spieler auf dem Spielfeld positioniert.`;
          phaseIcon = "street-view";
          phaseColorLight = "#874b8f";
          phaseColorDark = "#5d2764";
          return {
            phaseName,
            phaseDescription,
            phaseIcon,
            phaseColorLight,
            phaseColorDark
          };
        case "ballPhase":
          phaseName = "Ballphase";
          phaseDescription = `In dieser Phase können Bälle geworfen oder geschlagen werden.`;
          phaseIcon = "circle";
          phaseColorLight = "#306fe4";
          phaseColorDark = "#0044c2";
          return {
            phaseName,
            phaseDescription,
            phaseIcon,
            phaseColorLight,
            phaseColorDark
          };
        case "playerPhase":
          phaseName = "Spielerphase";
          phaseDescription = `In dieser Phase können die Spieler auf dem Feld bewegt werden.
           Ein Spieler kann auch aussetzen, muss also nicht immer ziehen.`;
          phaseIcon = "users";
          phaseColorLight = "#3fb16b";
          phaseColorDark = "#086d2f";
          return {
            phaseName,
            phaseDescription,
            phaseIcon,
            phaseColorLight,
            phaseColorDark
          };
        case "fanPhase":
          phaseName = "Fanphase";
          phaseDescription = `In dieser Phase können die Fans eingesetzt werden.
          Durch ihre Spezialfähigkeiten kann auf den Verlauf des Spiels Einfluss genommen werden. 
          Aber obacht: werden sie bei ihrem Foul erwischt, sind sie aus dem Spiel verbannt.`;
          phaseIcon = "fist-raised";
          phaseColorLight = "#e2a64b";
          phaseColorDark = "#d17e01";
          return {
            phaseName,
            phaseDescription,
            phaseIcon,
            phaseColorLight,
            phaseColorDark
          };
        case "gameFinish":
          phaseName = "Spielende";
          phaseDescription = `Das Spiel ist zu Ende. Es gibt einen Gewinner!`;
          phaseIcon = "flag-checkered";
          phaseColorLight = "#cfcfcf";
          phaseColorDark = "#4d4d4d";
          return {
            phaseName,
            phaseDescription,
            phaseIcon,
            phaseColorLight,
            phaseColorDark
          };
        case "unbanPhase":
          phaseName = "Rückkehr der Spieler";
          phaseDescription = `Verbannte Spieler können jetzt wieder auf dem Feld positioniert werden.`;
          phaseIcon = "undo-alt";
          phaseColorLight = "#3edfd1";
          phaseColorDark = "#00a799";
          return {
            phaseName,
            phaseDescription,
            phaseIcon,
            phaseColorLight,
            phaseColorDark
          };
        default:
          return "Testphase";
      }
    }
  },
  methods: {
    generateRandomKey() {
      return Math.random();
    }
  }
};
</script>

<style scoped>
.instruction-entry-container {
  overflow-y: auto;
  padding: 0.2vw 0.2vw;
  height: 94%;
}

.instruction-entry {
  font-size: 1vw;
  background: radial-gradient(#ffffff, #eeeeee);
  border: 1px solid #eeeeee;
  padding: 0.6vw 0.4vw;
  box-shadow: 0 0 3px #00000056;
  margin: 0.4vw 0;
  border-radius: 0.5vw;
  overflow-x: hidden;
}

.game-phase-entry {
  background: radial-gradient(#ffffff, #eeeeee);
  border-radius: 0.5rem;
  display: flex;
  color: #c7a900;
  color: #fde974;
  color: #b43333;
  color: #7e1111;
  color: #644627;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 0 3px #00000056;
  align-content: center;
  overflow-x: hidden;
  justify-content: space-between;
  overflow-y: auto;
  font-size: 1rem;
  margin: 0.4vw 0;
}

.game-phase-entry:hover {
  background: radial-gradient(#ffffff, #f5f5f5);
  box-shadow: 0 0 3px #0000008c;
}

.warning-entry:hover {
  background: radial-gradient(#ffffff, #f5f5f5);
  box-shadow: 0 0 3px #0000008c;
}

.game-phase-entry__icon-container {
  display: flex;
  padding: 0.5rem;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.game-phase-entry__name-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 1.1rem;
  width: 100%;
}

.game-phase-entry__name-container p {
  margin: 0.5rem;
}

.game-phase-entry__description-container p {
  margin: 0.5rem;
  margin-top: 0;
}

.game-phase-entry__description-container {
  text-align: left;
  width: 100%;
  font-size: 0.9rem;
}

.warning-entry {
  background: radial-gradient(#ffffff, #eeeeee);
  border-radius: 0.5rem;
  display: flex;
  color: #644627;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 0 3px #00000056;
  align-content: center;
  overflow-x: hidden;
  justify-content: space-between;
  overflow-y: auto;
  font-size: 1rem;
  margin: 0.4vw 0;
}

.warning-entry__icon-container {
  display: flex;
  padding: 0.5rem;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.warning-entry__code-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 1.1rem;
  width: 100%;
}

.warning-entry__code-container p {
  margin: 0.5rem;
}

.warning-entry__information-container p {
  margin: 0.5rem;
  margin-top: 0;
}

.warning-entry__information-container {
  text-align: left;
  width: 100%;
  font-size: 0.9rem;
}

.instruction-entry:hover {
  background: radial-gradient(#ffffff, #f5f5f5);
  box-shadow: 0 0 3px #0000008c;
}
</style>
