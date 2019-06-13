<template>
  <section>
    <h1 class="app__header">Lobby</h1>
    <div class="app__content">
      <div class="app__lobby-grid">
        <h3 id="lobby-description">Willkommen in der Lobby!</h3>
        <label for="server" class="app__lobby-label">Server:</label>
        <input id="server" type="text" class="app__lobby-input" />
        <label for="port" class="app__lobby-label">Port:</label>
        <input id="port" type="text" class="app__lobby-input" />
        <label for="user-name" class="app__lobby-label">Benutzername:</label>
        <input id="user-name" type="text" class="app__lobby-input" />
        <label for="password" class="app__lobby-label">Passwort:</label>
        <input id="password" type="text" class="app__lobby-input" />
        <label for="lobby" class="app__lobby-label">Lobby:</label>
        <input id="lobby" type="text" class="app__lobby-input" />
        <label for="spectator" class="app__lobby-label"
          >Als Gast beitreten:</label
        >
        <input id="spectator" type="Checkbox" class="app__lobby-input" />
      </div>
      <div class="app__lobby-footer">
        <button class="app__small-button" @click="connect()">Verbinden</button>
      </div>
    </div>

    <div class="app__footer">
      <hr class="app__footer-separation-line" />
      <button
        class="app__large-button app__footer-button"
        @click="game.currentState = 'inMenu'"
      >
        Zurück zum Menu
      </button>
      <button
        class="app__large-button app__footer-button"
        @click="game.currentState = 'inGame'"
      >
        Spielfeld
      </button>
    </div>
  </section>
</template>

<script>
import web from "../App.vue";
import game from "../App.vue";
import configs from "../App.vue";
export default {
  props: ["game", "teamConfig"],
  methods: {
    makeTimestamp: function() {
      var date = new Date();
      return (
        date.getFullYear() +
        "-" +
        ("0" + (date.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + date.getDate()).slice(-2) +
        " " +
        ("0" + date.getHours()).slice(-2) +
        ":" +
        ("0" + date.getMinutes()).slice(-2) +
        ":" +
        ("0" + date.getSeconds()).slice(-2) +
        "." +
        ("0" + date.getMilliseconds()).slice(-3)
      );
    },

    connect: function() {
      var date = new Date();
      var server = document.getElementById("server").value;
      var port = document.getElementById("port").value;
      //out server for testing
      //server = "134.60.29.230";
      //port = "8080";
      var addr = "ws://" + server + ":" + port;
      web.websocket = new WebSocket(addr);
      web.websocket.onerror = function(error) {
        alert("Connection failed!");
      };
      var vm = this;
      web.websocket.onopen = function() {
        var userName = document.getElementById("user-name").value;
        vm.game.userName = userName;
        var pw = document.getElementById("password").value;
        var lobby = document.getElementById("lobby").value;
        var timestamp = vm.makeTimestamp();

        var joinRequest = {
          timestamp: timestamp,
          payloadType: "joinRequest",
          payload: {
            lobby: lobby,
            userName: userName,
            password: pw,
            isArtificialIntelligence: false,
            mods: []
          }
        };
        var msg = JSON.stringify(joinRequest);
        web.joinReq = msg;
        web.addr = addr;

        web.websocket.send(msg);
        var vm2 = vm;
        web.websocket.onmessage = function(msg) {
          var obj = JSON.parse(msg.data);
          if (obj.payloadType === "loginGreeting") {
            if (!document.getElementById("spectator").checked) {
              var timestamp = vm2.makeTimestamp();
              var teamConf = {
                timestamp: timestamp,
                payloadType: "teamConfig",
                payload: vm.teamConfig
              };
              web.websocket.send(JSON.stringify(teamConf));
            }
            vm.game.currentState = "inGame";
          }
          //vm.game.currentState = "inGame";
        };
      };
    }
  }
};
</script>

<style>
.app__lobby-grid {
  position: absolute;
  height: 80%;
  width: 70%;
  max-width: 800px;
  top: 0;
  left: 15%;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 28% 12% 12% 12% 12% 12% 12%;
  align-items: center;
}

.app__lobby-label {
  text-align: left;
  font-size: 2.5vh;
}

#port {
  width: 40%;
}

.app__lobby-input {
  text-align: left;
  font-size: 2.5vh;
  position: relative;
  font-size: 2.5vh;
  font-family: "Alice";
  color: #535353;
  padding: 2% 3%;
  margin: 1% 2%;
  border-radius: 0.5vh;
  border: 1px solid #c0ab7e;
}

.app__lobby-footer {
  position: absolute;
  width: 100%;
  height: 15%;
  bottom: 0;
  left: 0;
}

#lobby-description {
  grid-column-start: 1;
  grid-column-end: 3;
  font-size: 3vh;
}
</style>
