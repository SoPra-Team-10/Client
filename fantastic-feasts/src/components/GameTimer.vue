<template>
  <div class="clock-stand">
    <div class="clock-container-outer">
      <div class="clock-container-inner">
        <div class="clock-display">{{ time }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['time'],

};
</script>

<style scoped>
.clock-stand {
  position: fixed;
  width: 4vw;
  height: 9vw;
  left: 48vw;
  bottom: -4%;
  background: radial-gradient(#664c18, #473106);
  z-index: 149;
  border-radius: 3vw;
  border: 2px solid #473106;
  box-shadow: 0 0 4px #ffffff69;
}

.clock-container-outer {
  position: fixed;
  width: 6.5vw;
  height: 6.5vw;
  left: 46.75vw;
  bottom: 1vh;
  background: radial-gradient(#664c18, #473106);
  z-index: 150;
  border-radius: 4vw;
  border: 2px solid #d1be0e;
  box-shadow: 0 0 4px #ffffff69;
}

.clock-container-inner {
  position: fixed;
  width: 6.2vw;
  height: 6.2vw;
  left: 46.9vw;
  bottom: 1.2vh;
  background: radial-gradient(#664c18, #473106);
  z-index: 151;
  border-radius: 4vw;
  border: 2px solid #c5b100;
  box-shadow: 0 0 4px #ffffff69;
}

.clock-display {
  position: fixed;
  width: 5.9vw;
  height: 5.9vw;
  left: 47.05vw;
  bottom: 1.43vh;
  z-index: 152;
  border: 1px solid #ebd18a;
  background: radial-gradient(#ffffff, #e0e0e0);
  -moz-box-shadow:    inset 0 0 4px #00000086;
  -webkit-box-shadow: inset 0 0 4px #000000;
  box-shadow:         inset 0 0 4px #000000;
  border-radius: 50%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-content: center;
  color: #4b4b4b;
  font-size: 2.5rem;

}
</style>
