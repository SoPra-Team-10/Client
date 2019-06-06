<template>
  <div class="match-finish__window">
    <div class="match-finish__container">
      <h3>Spielende</h3>
      <div>
        <p>Endrunde: {{ matchFinish.endRound }}</p>
        <p> Endstand: {{ matchFinish.leftPoints }} – {{ matchFinish.rightPoints }}</p>
        <p>Sieger: {{ matchFinish.winnerUserName }}</p>
        <p >Sieg durch: {{ matchFinish.victoryReason }}</p>
      </div>
      <button @click="$emit('to-lobby')" class="app__large-button">Zur Lobby</button>
    </div>
  </div>
</template>

<script>
import TeamCrest from './TeamCrest.vue'


export default {
  components: {
    'team-crest': TeamCrest,
  },
  props: ['matchFinish'],
  
}
</script>

<style scoped>

.match-finish__window {
  background: radial-gradient(#684521, #583b1b);
  display: flex;
  padding: .5rem;
  border-radius: .65rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 30%;
  height: 50%;
  left: 35%;
  top: 25%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  z-index: 9999;
  border: 2px solid #4b3013;
}

.match-finish__container{
  display: flex;
  flex-grow: 1;
  width: 100%;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border-radius: .5rem;
  padding: .5rem 2rem;
  text-align: center;
  position: relative;
  background: radial-gradient(#ffffff, #fcfcfc);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border: 2px solid #f5f5f5;

}

</style>
