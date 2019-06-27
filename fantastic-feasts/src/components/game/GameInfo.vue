<template>
  <div class="game-info-panel">
    <div id="team-panel-left" class="header__panel">
      <div id="left-teamname-label">
        <span class="inward-shadow">{{ matchStart.leftTeamConfig.name }}</span>
      </div>
      <div id="left-username-label">{{ matchStart.leftTeamUserName }}</div>
    </div>
    <div id="score-panel" class="header__panel">
      <div class="score-panel-content">
        {{ snapShot.leftTeam.points }} : {{ snapShot.rightTeam.points }}
      </div>
    </div>
    <div id="round-panel" class="header__panel">
      <div class="round-panel-content">
        <div class="round-label">Runde {{ snapShot.round }}</div>
        <!-- <div class="round-phase-label">{{ snapShot.phase }}</div> -->
      </div>
    </div>
    <div id="round-phase-panel" class="header__panel">
      <div class="round-phase-panel-content"></div>
    </div>
    <div id="team-panel-right" class="header__panel">
      <div id="right-teamname-label">{{ matchStart.rightTeamConfig.name }}</div>
      <div id="right-username-label">{{ matchStart.rightTeamUserName }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["matchStart", "snapShot"]
};
</script>

<style>
#team-panel-right {
  position: absolute;
  text-align: right;
  width: 35%;
  right: 0%;
  font-size: 3vh;
  height: 100%;
}

#team-panel-left {
  position: absolute;
  text-align: left;
  width: 35%;
  left: 0%;
  font-size: 3vh;
  height: 100%;
}

#left-teamname-label {
  position: absolute;
  height: 65%;
  width: 100%;
  top: 0%;
  left: 0%;
  color: #47331b;
  font-size: 3.2vh;
  padding: 0.5vh 1.5vh 0 1.5vh;
}

#left-username-label {
  position: absolute;
  height: 35%;
  width: 100%;
  bottom: 0%;
  left: 0%;
  color: #00000088;
  font-size: 1.4vh;
  padding: 0 1.5vh 0.8vh 1.5vh;
}

#right-teamname-label {
  position: absolute;
  height: 65%;
  width: 100%;
  top: 0%;
  right: 0%;
  color: #47331b;
  font-size: 3.2vh;
  padding: 0.5vh 1.5vh 0 1.5vh;
}

#right-username-label {
  position: absolute;
  height: 35%;
  width: 100%;
  bottom: 0%;
  right: 0%;
  color: #00000088;
  font-size: 1.4vh;
  padding: 0 1.5vh 0.8vh 1.5vh;
}

#score-panel {
  position: absolute;
  width: 30%;
  left: 35%;
  top: -10%;
  background: radial-gradient(#bb3434, #802020);
  height: 120%;
  color: #e7e7e7;
  border-radius: 2px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 2px 3px 0 rgba(0, 0, 0, 0.19);
  line-height: 80%;
  text-align: center;
  font-size: 5vh;
  padding: 1.5vh 0.5vh;
  z-index: 91;
}

#round-panel {
  position: absolute;
  width: 20%;
  left: 40%;
  top: 65%;
  padding: 0;
  margin: 0;
  background: radial-gradient(#ffffff, #e7e7e7);
  height: 120%;
  color: #4d4d4d;
  border-radius: 1vh;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 2px 3px 0 rgba(0, 0, 0, 0.19);
  line-height: 80%;
  text-align: center;
  font-size: 2.7vh;
  padding: 0.9vh 0;
  z-index: 90;
}

.game-info-panel {
  position: relative;
  width: 60%;
  min-height: 80%;
  background: radial-gradient(#ffffff, #ece3ca);
  border-radius: 8px;
  border: 1px solid #e4d8b8;
  -moz-box-shadow: inset 0 0 3px #00000086;
  -webkit-box-shadow: inset 0 0 3px #000000;
  box-shadow: inset 0 0 3px #000000;
}

.round-label {
  position: absolute;
  width: 100%;
  height: 35%;
  top: 54%;
  padding-top: 0.2vh;
  font-size: 2.8vh;
  color: #4b4b4b;
  margin: 0;
  padding: 0;
}

.round-phase-label {
  position: absolute;
  font-size: 1.2vh;
  color: #808080;
  height: 25%;
  top: 70%;
  width: 100%;
  margin: 0;
  padding: 0;
}

.round-panel-separation-line {
  border: none;
  border-top: 1px solid #886639;
  padding: 0;
  margin: 0.2vh 0.1vh;
}

.round-panel-content {
  margin: 0;
  padding: 0;
}
</style>
