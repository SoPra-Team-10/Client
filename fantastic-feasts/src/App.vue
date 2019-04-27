<template>
  <div>
    <app-menu v-if="game.currentState === 'inMenu'" :game="game"></app-menu>
    <app-lobby v-if="game.currentState === 'inLobby'" :game="game"></app-lobby>
    <app-help v-if="game.currentState === 'inHelp'" :game="game"></app-help>
    <app-team v-if="game.currentState === 'inTeam'" :game="game"></app-team>
    <app-game v-if="game.currentState === 'inGame'" :game="game"></app-game>

  </div>
</template>

<script>
import Game from './components/Game.vue';
import Help from './components/Help.vue';
import Lobby from './components/Lobby.vue';
import Team from './components/Team.vue';
import Menu from './components/Menu.vue';

export default {
  name: 'app',
  data () {
    return {
      game: {
        currentState: 'inMenu',
        
      },
      web:{
        websocket: WebSocket
      }
    }
  },
  components: {
    'app-game': Game,
    'app-menu': Menu,
    'app-help': Help,
    'app-lobby': Lobby,
    'app-team': Team
  }
  
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
</style>
