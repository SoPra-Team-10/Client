<template>
  <div>
    <h1>Hello World</h1>
    <!-- <app-menu v-if="gameState.inMenu"></app-menu>
    <app-lobby v-if="gameState.inLobby"></app-lobby>
    <app-help v-if="gameState.inHelp"></app-help>
    <app-team v-if="gameState.inTeam"></app-team>
    <app-game v-if="gameState.inGame"></app-game> -->

  </div>
</template>

<script>
// import Game from './components/Game.vue';
// import Help from './components/Help.vue';
// import Lobby from './components/Lobby.vue';
// import Team from './components/Team.vue';
// import Menu from './components/Menu.vue';

export default {
  name: 'app',
  data () {
    return {
      gameState: {
        // inMenu: true,
        // inLobby: false,
        // inHelp: false,
        // inTeam: false,
        // inGame: false
      }
    }
  },
  components: {
    // 'app-game': Game,
    // 'app-menu': Menu,
    // 'app-help': Help,
    // 'app-lobby': Lobby,
    // 'app-team': Team
  }
  
}
</script>

<style>

</style>
