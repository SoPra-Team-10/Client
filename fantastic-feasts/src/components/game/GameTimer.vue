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
  props: ["time"]
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
  max-height: 130px;
  max-width: 130px;
  min-height: 40px;
  min-width: 40px;
  left: 50%;
  -webkit-transform: translate(-50%, 0);
  bottom: 1vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  align-content: center;
  background: #d1be0e;
  z-index: 150;
  border-radius: 50%;
  box-shadow: 0 0 4px #ffffff69;
}

.clock-container-inner {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  align-content: center;
  width: 93%;
  height: 93%;
  background: #c5b100;
  z-index: 151;
  border-radius: 50%;
  box-shadow: 0 0 4px #ffffff69;
}

.clock-display {
  width: 92%;
  height: 92%;
  z-index: 152;
  border: 1px solid #ebd18a;
  background: radial-gradient(#ffffff, #e0e0e0);
  -moz-box-shadow: inset 0 0 4px #00000086;
  -webkit-box-shadow: inset 0 0 4px #000000;
  box-shadow: inset 0 0 4px #000000;
  border-radius: 50%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  justify-content: center;
  align-content: center;
  color: #4b4b4b;
  font-size: 2.7vw;
}
</style>
