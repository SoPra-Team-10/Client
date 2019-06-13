<template>
  <div>
    <app-menu :class="[game.colorSchemes[game.selectedColorScheme]]" class="fullscreen" v-if="game.currentState === 'inMenu'" :game="game"></app-menu>
    <app-lobby class="fullscreen" :class="[game.colorSchemes[game.selectedColorScheme]]" v-if="game.currentState === 'inLobby'" :game="game" :teamConfig="configs.teamConfigs[configs.selectedTeam]"></app-lobby>
    <app-help class="fullscreen" :class="[game.colorSchemes[game.selectedColorScheme]]" v-if="game.currentState === 'inHelp'" :game="game"></app-help>
    <app-team class="fullscreen" :class="[game.colorSchemes[game.selectedColorScheme]]" v-if="game.currentState === 'inTeam'" :game="game" :configs="configs"></app-team>
    <app-config class="fullscreen" :class="[game.colorSchemes[game.selectedColorScheme]]" v-if="game.currentState === 'inConfig'" :game="game" :configs="configs" :web="web"></app-config>
    <app-game v-if="game.currentState === 'inGame'" :game="game" :teamConfig="configs.teamConfigs[configs.selectedTeam]"></app-game>

  </div>
</template>

<script>
import Game from './components/Game.vue';
import Help from './components/Help.vue';
import Lobby from './components/Lobby.vue';
import Team from './components/Team.vue';
import Menu from './components/Menu.vue';
import Config from './components/Configurator.vue';

export default {
  name: 'app',
  data () {
    return {
      game: {
        currentState: 'inMenu',
        colorSchemes: ['griffindor-color-scheme', 'slytherin-color-scheme', 'hufflepuff-color-scheme', 'ravenclaw-color-scheme'],
        selectedColorScheme: 1,
        userName: ""
      },
      web:{
        websocket: WebSocket,
        addr: String,
        joinReq: String,
      },
      configs: {
        matchConfigs: [],
        teamConfigs: [],
        selectedTeam: undefined
      }
    }
  },
  components: {
    'app-game': Game,
    'app-menu': Menu,
    'app-help': Help,
    'app-lobby': Lobby,
    'app-team': Team,
    'app-config': Config
  },
  mounted() {
    if (localStorage.getItem('configs')) {
      try {
        this.configs = JSON.parse(localStorage.getItem('configs'));
      } catch(e) {
        localStorage.removeItem('configs');
      }
    }

  },
  
}
</script>

<style>

/* @import './../node_modules/animate.css/animate.css'; */

/* Global CSS-styles */

html {
  margin: 0;
}

body {
  margin: 0;
  display: fixed; 
}

* {
  box-sizing: border-box;
}

textarea:focus, input:focus{
    outline: none;
}

button:focus{
    outline: none;
}

.fullscreen {
  position: fixed;
  width: 100%;
  height: 100%;
  text-align: center;
}



/* Color schemes for menu background */
.griffindor-color-scheme {
  background: radial-gradient(#c04c4c, #751c1c);
}

.slytherin-color-scheme {
  background: radial-gradient(#35887e, #07584e);
}

.hufflepuff-color-scheme {
  background: radial-gradient(#497ab3, #034188);
}

.ravenclaw-color-scheme {
  background: radial-gradient(#8c73b9, #412561);
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

 


.app__large-button {
  background: #502d16;
  display: auto;
  color: #e0a500;
  font-family: 'Alice';
  font-size: 2.3vh;
  border: 1px solid #e0a500;
  border-radius: 4px;
  margin: 1.8vh;
  width: 18vw;
  height: 4vh;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
}
.app__large-button:hover {
  box-shadow: 0 0 10px 0 rgba(255, 228, 110, 0.534);
  color: #f8c22d;
}

.app__large-button:focus {
  background: #5f361a;
  box-shadow: 0 0 10px 0 rgba(255, 228, 110, 0.534);
  color: #f8c22d;
}

.app__small-button {
  background: #f8f1df;
  display: inline-block;
  color: #8d6951;
  font-family: 'Alice';
  font-size: 1.8vh;
  border: 1px solid #99735a;
  border-radius: .5vh;
  margin: 1vh 1vw 0 1vw;
  padding: 0 .8vw;
  height: 2.8vh;
  min-width: 10vw;
}

.app__import-label {
    display: inline-block;
    position: relative;
    margin: 0 1vw;
    padding-top: .2vh;
}

.app__small-button:hover {
  background: #f7e9c6;
}



.app__header {
  font-family: 'Alice';
  color: #f1c534;
  font-size: 6vh;
  text-shadow: 1px 1px 2px #1b1b1ba6;
  margin: 2vh 0;
}


.app__content {
  position: fixed;
  width: 80%;
  height: 70%;
  top: 15%;
  left: 10%;
  padding: 0 5% 0 5%;
  background: radial-gradient(#ffffff, #ebd18a);
  display: inline-block;
  border-radius: 1vh;
  color: #795a46;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}



.app__footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 10vh;
  text-align: center;
}

.app__footer-separation-line {
  position: absolute;
  top: 0;
  width: 100%;
  border: 1px solid #e0a500;
  margin: 0;
}

.app__footer-button {
  position: relative;
  margin-top: 3vh;
}

</style>
