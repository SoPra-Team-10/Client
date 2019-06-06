<template>
  <div class="info-panel" id="player-info-panel">
    <h3 class="panel-title">Ausgewählter Spieler</h3>
    <hr class="inner-separation-line">
    <transition name="fade">
      <div v-if="snapShot.phase === 'playerPhase'" class="player-detail-container">
        <div class="player-detail-icon" :style="{background: 'radial-gradient(#ffffff0a, #0000003f), #' + playerToDisplay.colorPrimary }">
            <div :class="playerToDisplay.type"></div>
        </div>
        <div class="player-detail-name-container">
        
          <div class="player-detail-name">
            <b>{{ playerToDisplay.name }}</b>
            ({{ playerToDisplay.sex }})
          </div>
          <div
            class="player-detail-broom"
          > <i> {{ playerToDisplay.teamName }}</i></div>
          <div
            class="player-detail-broom"
          >{{ playerToDisplay.broom }}</div>
          <div
            class="player-detail-type"
          >{{ playerToDisplay.role }} – ({{ playerToDisplay.xPos }} | {{ playerToDisplay.yPos }})</div>
        </div>

        <div class="player-detail-body">
          <!-- <button class="action-button werfen-button">Werfen</button>
          <button class="action-button klatscher-kloppen-button">Kloppen</button> -->
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
    // have to be passed over from paren component
    props: ['matchStart', 'selectedEntityId', 'selectedEntity', 'snapShot'],
    computed: {
        // returns all required variables that are needed to display player information
        // this computed property combines the different information from above props to 
        // one property called playerToDisplay. This makes debugging much easier
        playerToDisplay() {
            // selectedEntityId -> left or right; type
            //
            let team;
            let key;
            if(this.selectedEntityId.startsWith('left')) {
                key = this.selectedEntityId.slice(4).toLowerCase();
                team = this.matchStart.leftTeamConfig;
            } else if (this.selectedEntityId.startsWith('right')) {
                key = this.selectedEntityId.slice(5).toLowerCase();
                team = this.matchStart.rightTeamConfig;
            } else {
                return {};
            }
            const playerToDisplay = {
                role: this.mapRole(key),
                type: key.slice(0, 6),
                name: team.players[key].name,
                sex: team.players[key].sex,
                broom: this.mapBroom(team.players[key].broom),
                teamName: team.name,
                colorPrimary: team.colors.primary,
                colorSecondary: team.colors.secondary,
                capabilities: "",
                ...this.selectedEntity,
            };
            console.log(playerToDisplay);
            return playerToDisplay;
        }
    },
    methods: {

        mapRole(key) {
            switch (key) {
                case 'seeker':
                    return 'Sucher';
                case 'keeper':
                    return 'Hüter';
                case 'chaser1':
                    return 'Jäger 1';
                case 'chaser2':
                    return 'Jäger 2';
                case 'chaser3':
                    return 'Jäger 3';
                case 'beater1':
                    return 'Klopper 1';
                case 'beater2':
                    return 'Klopper 2';
                default: 
                return undefined;
            }
        },
        mapBroom(broomType) {
            switch(broomType) {
                case 'tinderblast':
                    return 'Zunderfauch';
                case 'cleansweep11':
                    return 'Sauberwisch 11';
                case 'comet260':
                    return 'Comet-2-60';
                case 'nimbus2001':
                    return 'nimbus2001';
                case 'firebolt':
                    return 'Feuerblitz';
                default: undefined
            }    
        },
    }
}
</script>

<style scoped>
.player-detail-container {
  display: block;
  height: 90%;
  font-size: 1.8vh;
  color: #3a3a3a;
  margin: 5% 5%;
  width: 90%;
  padding: 10%;
  background: radial-gradient(#ffffff, #eeeded);
  border-radius: 0.4vw;
  border: 1px solid #e4d8b8;
  -moz-box-shadow: inset 0 0 3px #00000086;
  -webkit-box-shadow: inset 0 0 3px #000000;
  box-shadow: inset 0 0 3px #000000;
  text-align: center;
}

.player-detail-name-container {
  padding: 0.3vw;
  padding-left: 0.6vw;
  text-align: center;
}

.chaser-detail-icon {
  margin: 0.5vw;
  width: 8vw;
  height: 8vw;
  display: inline-block;
  background: url("../resources/chaser.svg");
}

.player-detail-icon {
  display: inline-block;
  position: relative;
  width: 10vw;
  height: 10vw;
  border: 0.4vw solid #e0a500;
  margin-bottom: 0.3vw;
  border-radius: 1vh;
  -moz-box-shadow: inset 0 0 3px #00000086;
  -webkit-box-shadow: inset 0 0 3px #000000;
  box-shadow: inset 0 0 3px #000000;
  font-size: 8vw;
  z-index: 50;
  padding-top: 0.2vw;
  background: radial-gradient(#5677be, #1d50be);
  color: white;
  text-align: center;
}

.action-button {
  padding-top: 0.1vw;
  margin: 0.6vw 0.6vw 0 0.6vw;
  display: inline-block;
  font-family: "Alice";
  width: 7vw;
  height: 2vw;
  border-radius: 0.5vw;
  text-align: center;
  font-size: 1.8vh;
  background: radial-gradient(#eeeeee, #e4e4e4);
  border: 0.1vw solid #eeeeee;
  -moz-box-shadow: inset 0 0 2px #00000086;
  -webkit-box-shadow: inset 0 0 2px #000000a1;
  box-shadow: inset 0 0 2px #000000a1;
}

.action-button:hover {
  -moz-box-shadow: inset 0 0 4px #000000b6;
  -webkit-box-shadow: inset 0 0 4px #000000be;
  box-shadow: inset 0 0 4px #000000bb;
}

/* .werfen-button {
    background: radial-gradient(#7396d6, #114cbb);
    background: radial-gradient(#e2868e, #bb111f);
    border: .2vw solid #3b73dd;
    border: .2vw solid #d62231;
    color: #ffffff;
}

.werfen-button:hover {
   background: radial-gradient(#98b1e2, #114cbb);
   background: radial-gradient(#e98f97, #d32231);
   border: .2vw solid #5789e4;
   border: .2vw solid #e03443;

    color: #ffffff; 
    -moz-box-shadow:    inset 0 0 8px #000000b6;
    -webkit-box-shadow: inset 0 0 8px #000000be;
    box-shadow:         inset 0 0 8px #000000bb;
}

.klatscher-kloppen-button {
    background: radial-gradient(#eee017, #d49d26);
    border: .2vw solid #e0be00;
    color: #ffffff;
}

.klatscher-kloppen-button:hover {
    background: radial-gradient(#eee786, #d47f3a);
    color: #ffffff;
     -moz-box-shadow:    inset 0 0 8px #000000b6;
    -webkit-box-shadow: inset 0 0 8px #000000be;
    box-shadow:         inset 0 0 8px #000000bb;
} */
</style>
