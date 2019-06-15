<template>
  <div :class="{ 'animated delay-1s pulse': active }" class="overflow-wrapper">
    <div class="team-crest" :class="{ 'crest-active': active }">
      <div
        class="team-crest__segment-top"
        :style="{ background: '#' + teamConfig.colors.primary }"
      ></div>
      <div
        class="team-crest__segment-bottom"
        :style="{ background: '#' + teamConfig.colors.secondary }"
      ></div>
      <div
        class="team-crest__segment-top"
        :style="{ background: '#' + teamConfig.colors.secondary }"
      ></div>
      <div
        class="team-crest__segment-bottom"
        :style="{ background: '#' + teamConfig.colors.primary }"
      ></div>
      <div class="shadow-overlay"></div>
    </div>
    <span class="team-motto-span">{{ teamConfig.motto }}</span>
  </div>
</template>

<script>
export default {
  props: {
    teamConfig: {
      required: true,
      type: Object
    },
    active: {
      type: Boolean,
      required: true
    }
  }
};
</script>

<style scoped>
.team-motto-span {
  position: absolute;
  display: none;
  top: 110%;
  width: 200%;
  left: -50%;
  background: #0000006e;
  color: #ffffff;
  padding: 0.5rem;
  border-radius: 0.3rem;
}

.team-crest {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  flex-wrap: wrap;
  border-radius: 0.3rem 0.3rem 2rem 2rem;
  border: 2px solid #e0a500;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.377);
}

.overflow-wrapper {
  position: relative;
  height: 80%;
  width: calc(100vh * 0.08 * 0.78);
  animation-duration: 1s;
  animation-iteration-count: 3;
}

.overflow-wrapper:hover .team-motto-span {
  display: inline-block;
}

.crest-active {
  border: 2px solid #e9e0c9;
  transform: scale(1.1);
  box-shadow: 0 0 3px 3px #e9e0c93a;
}

.team-crest__segment-top {
  width: 50%;
  height: 45%;
}

.team-crest__segment-bottom {
  width: 50%;
  height: 55%;
}

.shadow-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background: radial-gradient(#00000000, #0000003f);
}
</style>
