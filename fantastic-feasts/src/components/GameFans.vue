<template>
  <div class="spectator-stand-panel">
    <div class="spectator-stand">
      <!-- old version where every fan has his own icon -->
      <!-- <div
        v-for="(fan, index) in activeFansTeamLeft"
        :key="index"
        :class="['fan', 'fan-left-team']"
        @click="fan.banned = true"
      >
        <div :class="fan.fanType"></div>
      </div>-->
      <div v-for="(count, key) in fanCountTeamLeft" :key="key" class="fan">
        <div :class="key">
          <div class="fan-counter">{{ count }}</div>
        </div>
      </div>
    </div>
    <div class="spectator-stand">
      <div v-for="(count, key) in fanCountTeamRight" :key="key" class="fan">
        <div :class="key">
          <div class="fan-counter">{{ count }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    snapShot: {
      type: Object,
      required: true
    }
  },
  computed: {
    fanCountTeamLeft() {
      var fans = this.snapShot.leftTeam.fans;
      const fanDict = {};
      for (var key in fans) {
        if (!fans[key].banned) {
          if (fanDict[fans[key].fanType]) {
            fanDict[fans[key].fanType]++;
          } else {
            fanDict[fans[key].fanType] = 1;
          }
        }
      }
      return fanDict;
    },
    fanCountTeamRight() {
      var fans = this.snapShot.rightTeam.fans;
      const fanDict = {};
      for (var key in fans) {
        if (fanDict[fans[key].fanType]) {
          if (fanDict[fans[key].fanType]) {
            fanDict[fans[key].fanType]++;
          } else {
            fanDict[fans[key].fanType] = 1;
          }
        }
      }
      return fanDict;
    },
    activeFansTeamRight() {
      var fans = this.snapShot.rightTeam.fans;
      var activeFans = {};
      for (var key in fans) {
        if (!fans[key].banned) {
          activeFans[key] = fans[key];
        }
      }
      return activeFans;
    },
    activeFansTeamLeft() {
      var fans = this.snapShot.leftTeam.fans;
      var activeFans = {};
      for (var key in fans) {
        if (!fans[key].banned) {
          activeFans[key] = fans[key];
        }
      }
      return activeFans;
    }
  }
};
</script>

<style scoped>
.spectator-stand-panel {
  background: radial-gradient(#797979, #525252);
  position: fixed;
  height: 10%;
  width: 64%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  left: 18%;
  bottom: 0;
  border: 1px solid #adadad;
  border-bottom: none;
  border-radius: 1vh 1vh 0 0;
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.5), 0 0 19px 0 rgba(0, 0, 0, 0.19);
}

.spectator-stand {
  text-align: center;
  background: radial-gradient(#6b6b6b, #525252);
  color: white;
  border-radius: 1vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 42.5%;
  height: 80%;
  margin: 10% 2%;
  border: 1px solid #7e7e7e;
  -moz-box-shadow: inset 0 0 3px #00000086;
  -webkit-box-shadow: inset 0 0 3px #000000;
  box-shadow: inset 0 0 3px #000000;
}

.fan {
  display: inline-block;
  z-index: 50;
  position: relative;
  width: 6vh;
  height: 6vh;
  margin: 0.85vh 0.3vh;
  border: 1.5px solid #e0a500;
  border-radius: 1vh;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.377);
  font-size: 3vh;
}

.fan-counter {
  color: #ffffff;
  position: absolute;
  top: 5%;
  left: 5%;
  width: 25%;
  height: 25%;
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;
  justify-content: center;
  font-size: 0.7rem;
  background: radial-gradient(#000000a2, #0000003d);
  border-radius: 100%;
  /* border: 1px solid #ffffff; */
}

.troll {
  display: inline-block;
  z-index: 51;
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  border-radius: 0.9vh;
  overflow: hidden;
  background: url(../resources/troll.svg), radial-gradient(#ffffffcb, #ffffff00);
  background-repeat: no-repeat;
}

.elf {
  display: inline-block;
  z-index: 51;
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  border-radius: 0.9vh;
  overflow: hidden;
  background: url(../resources/elf.svg), radial-gradient(#ffffffcb, #ffffff00);
  background-repeat: no-repeat;
}

.niffler {
  display: inline-block;
  z-index: 51;
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  border-radius: 0.9vh;
  overflow: hidden;
  background: url(../resources/niffler.svg), radial-gradient(#ffffffcb, #ffffff00);
  background-repeat: no-repeat;
}

.goblin {
  display: inline-block;
  z-index: 51;
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  border-radius: 0.9vh;
  overflow: hidden;
  /* background: url(../resources/goblin.svg), radial-gradient(#ffffffcb, #ffffff00); */
  background-repeat: no-repeat;
}

.wombat {
  display: inline-block;
  z-index: 51;
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  border-radius: 0.9vh;
  overflow: hidden;
  /* background: url(../resources/wombat.svg), radial-gradient(#ffffffcb, #ffffff00); */
  background-repeat: no-repeat;
}

.fan:hover {
  background: radial-gradient(#e7c87300, #e9cf8894);
}
</style>


