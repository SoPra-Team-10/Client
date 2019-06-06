<template>
        <section>
            <h1 class="app__header">Konfigurator</h1>
            <div class="app__content">
                <!-- Buttons to switch between the team-editor and the match-editor -->
                <div v-if="state.currentState === 'inTeamOverview' || state.currentState === 'inMatchOverview'" class="button-header-panel">
                    <button @click="state.currentState = 'inTeamOverview'" :class="{ selected: state.currentState === 'inTeamOverview'}" class="config__header-button" id="config__header-button-left">Team</button>
                    <button @click="state.currentState = 'inMatchOverview'" :class="{ selected: state.currentState === 'inMatchOverview'}" class="config__header-button" id="config__header-button-right">Partie</button>
                </div>
                <!-- hands objects over to other components -->
                <app-team-config v-if="state.currentState === 'inTeamConfig'" :game="game" :state="state" :configs="configs"></app-team-config>
                <app-match-config v-if="state.currentState === 'inMatchConfig'" :game="game" :state="state" :configs="configs"></app-match-config>
                <app-team-overview v-if="state.currentState === 'inTeamOverview'" :game="game" :state="state" :configs="configs"></app-team-overview>
                <app-match-overview v-if="state.currentState === 'inMatchOverview'" :game="game" :state="state" :configs="configs"></app-match-overview>
            </div>
            <div class="app__footer">
                <hr class="app__footer-separation-line">
                <button @click="game.currentState = 'inMenu'" class="app__large-button app__footer-button">Hauptmenü</button>
            </div>
        </section>
</template>

<script>
import TeamConfig from './TeamConfigurator.vue';
import TeamOverview from './TeamOverview.vue';
import MatchConfig from './MatchConfigurator.vue';
import MatchOverview from './MatchOverview.vue';

export default {
    data() {
        return {
            state: {
                //initializes varbiables so that the program starts in team-configuration select mode
                currentState: 'inTeamOverview',
                index: 0,
                isNew: false
            } 
        }
    },
    props: ['game', 'configs'],
    components: {
        //allows this component to access imported components
        'app-team-config': TeamConfig,
        'app-match-config': MatchConfig,
        'app-team-overview': TeamOverview,
        'app-match-overview': MatchOverview
    }
}
</script>

<style>

.main-content-window-overview {
    position: absolute;
    width: 90%;
    left: 5%;
    top: 10%;
    height: 85%;
}

.main-content-window-editor {
    position: absolute;
    overflow-y: auto;
    width: 90%;
    left: 5%;
    top: 4%;
    height: 90%;
}

.main-content-container {
    display: inline-block;
    position: absolute;
    width: 80%;
    height: 70%;
    min-height: 440px;
    left: 10%;
}

.team-config__content-container h3 {
    margin: 1vh 0;    
}

.button-header-panel {
    position: absolute;
    width: 90%;
    left: 5%;
    height: 10%;
}

.page-content {
    position: fixed;
    width: 100%;
    height: 100%;
}



.team-config__content-container h4 {
    margin: 5px 0;
    display: inline-block;
    width: 80px;
    text-align: left;
}

.config__header-button {
    background: #f3e7c0;
    padding: 4px;
    color: #8d6951;
    font-family: 'Alice';
    font-size: 2vh;
    border: 1px solid #99735a;
    position: absolute;
    height: 60%;
    top: 40%;
    width: 10%;
}


.config__header-button:hover {
    background: #faf0d6;
}

.config__header-button:active {
    background: #fcf2da;
    -moz-box-shadow:    inset 0 0 .8vw #00000036;
    -webkit-box-shadow: inset 0 0 .8vw #00000036;
    box-shadow:         inset 0 0 .8vw #00000036;
}

.config__header-button:focus {
    background: #f7e9c6;
    -moz-box-shadow:    inset 0 0 .8vw #00000036;
    -webkit-box-shadow: inset 0 0 .8vw #00000036;
    box-shadow:         inset 0 0 .8vw #00000036;
}

#config__header-button-left {
    left: 40%;
    border-right: none;
    border-radius: .5vh 0 0 .5vh;
}

#config__header-button-right {
    border-radius: 0 .5vh .5vh 0;
    right: 40%;
}

.team-config__content-container input {
    border-radius: 3px;
    border: .5px solid #ebd18a;
    color: #795a46;
    text-align: left;
    font-family: 'Alice';
    padding: 3px;
    vertical-align: center;
}

.team-config__content-container input:hover {
    box-shadow: 0 0 10px 0 rgba(255, 228, 110, 0.534);
}

.team-config__content-container input:active {
    box-shadow: 0 0 3px 0 rgba(185, 141, 59, 0.534);
}

.team-config__content-container input:active,
.team-config__content-container input:focus {
    box-shadow: 0 0 3px 0 rgba(121, 92, 38, 0.734);
}

.team-config__fan-counter {
    width: 3vw;
    min-width: 45px;
    border-radius: 3px;
    border: .5px solid #ebd18a;
    color: #795a46;
    text-align: right;
    font-family: 'Alice';
}

.team-config__input-wrapping {
    display: inline-block;
    width: 25%;
    padding: 0 15px;
}

.team-config__fan-label {
    width: 40px;
    color: #795a46;
    text-align: left;
    font-weight: bold;
    margin: 5px;
}

.team-config__player-selection {
    width: 100%;
    height: 4vh;
    position: relative;
}

h4.table-header {
    display: inline-block;
    text-align: center;
    margin-top: 0;
    margin-bottom: 1vh;
    font-size: 2vh;
    width: 25%;
}

.team-config__team-label {
    display: inline-block;
    color: #795a46;
    text-align: left;
    font-weight: bold;
    font-size: 2vh;
    margin: 1vh 1vh;
}

.team-config__team-name-input {
    border-radius: 3px;
    border: .5px solid #ebd18a;
    color: #795a46;
    text-align: left;
    width: 10vw;
}

.team-config__team-motto-input {
    border-radius: 3px;
    border: .5px solid #ebd18a;
    color: #795a46;
    text-align: left;
    width: 35vw;
}
.team-config__team-color-input {
    border-radius: 3px;
    border: .5px solid #ebd18a;
    color: #795a46;
    text-align: left;
    width: 60px;
}

.team-config__player-label {
    color: #795a46;
    text-align: center;
    width: 12.5%;
    font-size: 1.5vh;
    display: inline-block;
}


.config-submenu-title {
    font-size: 3vh;

}

.team-config__player-name-input {
    color: #795a46;
    font-family: 'Alice';
    text-align: left;
    border-radius: 3px;
    width: 100%;
    border: .5px solid #ebd18a;
}

.team-config__player-broom-input {
    color: #795a46;
    font-family: 'Alice';
    text-align: left;
    width: 100%;
    border-radius: 3px;
    border: .5px solid #ebd18a;
}




.overview-options-button {
    text-align: center;
    display: auto;
    width: 60%;
    margin: 1vh 1vh;
}

.overview-list-item {
    list-style: none;
    text-align: left;
    padding: .3vw;
    margin: .1vw;
    border-radius: .3vw;
}

.overview-list-item:hover,
.overview-list-item:focus {
    background: #0000001e;
}
.overview-list-item.active {
    background: #0000001e;
}

.selected-list-item {
    background: #0000002f;
}

.selected {
    -moz-box-shadow:    inset 0 0 .8vw #00000036;
    -webkit-box-shadow: inset 0 0 .8vw #00000036;
    box-shadow:         inset 0 0 .8vw #00000036;
}

.overview-options {
    display: inline-block;
    width: 40%;
}

.overview-list {
    vertical-align: top;
    display: inline-block;
    width: 60%;
    height: 30vh;
    overflow-y: auto;
}

.overview__general-options {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 16%;
    min-height: 8vh;
}


label.small-button {
    height: 3vh;
    display: inline-block;
    vertical-align: center;
    
}

.overview-options-button {
    text-align: center;
    width: 60%;
    margin: 1vh 1vh;
}


  

  .menu__input {
    margin: 10px;
    height: 30px;
    color: #6e6e6e;
    font-family: 'Alice';
    font-size: 1.5em;
  }

  .menu__input-label {
    color: #795a46;
    margin: 5px;
    font-size: 1.5em;
  }

  .help__text {
    text-align: left;
  }


  #file-chooser {
    padding: 2px 4px;
  }


</style>
