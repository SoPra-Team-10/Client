<template>
  <div id="game-instructions-panel" class="info-panel">
    <h3 class="panel-title">Spielhinweise</h3>
    <hr class="inner-separation-line" />
    <!-- <h5 id="game-instructions"></h5> -->
    <div class="instruction-entry-container">
      <transition-group name="slide">
        <div
          v-for="(instruction, i) in gameInstruction"
          :key="instruction.message"
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
  props: ["gameInstruction"],
  data() {
    return {
      //gameInstruction: [{message: 'moved player from x to y'}, {message: 'moved player from x to y'}, {message: 'moved player from x to y'}, {message: 'moved player from x to y'}, {message: 'moved player from x to y'}, {message: 'moved player from x to y'}, {message: 'moved player from x to y'}, {message: 'moved player from x to y'}, {message: 'moved player from x to y'}, {message: 'moved player from x to y'}, {message: 'moved player from x to y'}, {message: 'moved player from x to y'}, {message: 'moved player from x to y'}, {message: 'moved player from x to y'}, {message: 'moved player from x to y'}, {message: 'moved player from x to y'}, {message: 'moved player from x to y'}, {message: 'moved player from x to y'} ]
    };
  }
};
</script>

<style scoped>
#game.instruction-panel {
}

.instruction-entry-container {
  overflow-y: auto;
  padding: 0.2vw 0.2vw;
  max-height: 30vh;
  height: 100%;
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

.highlighted-instruction-entry {
}

.instruction-entry:hover {
  background: radial-gradient(#ffffff, #f5f5f5);
  box-shadow: 0 0 3px #0000008c;
}
</style>
