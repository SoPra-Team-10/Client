<template>
  <div>
    <app-menu id="main-menu" class="menu" v-if="game.currentState === 'inMenu'" :game="game"></app-menu>
    <app-lobby class="menu" v-if="game.currentState === 'inLobby'" :game="game"></app-lobby>
    <app-help class="menu" v-if="game.currentState === 'inHelp'" :game="game"></app-help>
    <app-team class="menu" v-if="game.currentState === 'inTeam'" :game="game"></app-team>
    <app-config class="menu" v-if="game.currentState === 'inConfig'" :game="game" :configs="configs"></app-config>
    <app-game v-if="game.currentState === 'inGame'" :game="game"></app-game>

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
        currentState: 'inConfig'
      },
      web:{
        websocket: WebSocket
      },
      configs: {
        matchConfigs: [],
        teamConfigs: [],
        selectedTeamConfig: {},
        selectedMatchConfig: {}
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

  .menu {
    background: radial-gradient(#bb3434, #802020);
    position: fixed;
    width: 100%;
    height: 100%;
    text-align: center;

  }

  #main-menu {
    text-align: center;
  }

  hr {
    border: 1px solid #e0a500;
    margin: 30px 0 30px 0;
  }

  .main-menu__button {
    background: #502d16;
    display: auto;
    color: #e0a500;
    font-family: 'Alice';
    font-size: 1em;
    border: 1px solid #e0a500;
    border-radius: 4px;
    margin: 10px;
    width: 200px;
    height: 30px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);

  }

  .main-menu__button:hover {
    box-shadow: 0 0 10px 0 rgba(255, 228, 110, 0.534);
    color: #f8c22d;
  }

  .main-menu__button:focus {
    background: #5f361a;
    box-shadow: 0 0 10px 0 rgba(255, 228, 110, 0.534);
    color: #f8c22d;
  }

  textarea:focus, input:focus{
    outline: none;
  }

  button:focus{
    outline: none;
  }

  .main-title {
    font-family: 'Alice';
    color: #e0a500;
    font-size: 5em;
    text-shadow: 0px 0px 3px #FFD938;
  }

  .subtitle {
    font-family: 'Alice';
    color: #ffd64e;
    font-size: 3em;
    text-shadow: 0px 0px 2px #ebd18a;
  }

  .text-content-container {
    background: radial-gradient(#ffffff, #ebd18a);
    display: auto;
    display: inline-block;
    width: 80%;
    max-width: 800px;
    border-radius: 5px;
    color: #795a46;
    padding: 30px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
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

  #port {
    margin-left: 34px;
  }

  #file-chooser {
    padding: 2px 4px;
  }

  .main-menu__small-button {
    background: #f8f1df;
    display: auto;
    color: #8d6951;
    font-family: 'Alice';
    font-size: 1em;
    border: 1px solid #99735a;
    border-radius: 3px;
    margin: 10px 5px 0 5px;
  }

  .main-menu__small-button:hover {
    background: #f7e9c6;
  }

  #lobby-description {
    color: #795a46;
    font-size: 1.5em;
  }

  .footer-bar {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 150px;
  }

</style>
