<template>
  <div id="game-container">
    <section id="game-panel">
      <header class="header">
        <div id="mute-button" @click="muteAudio">
          <font-awesome-icon
            class="favorite-icon"
            :icon="muted ? 'volume-up' : 'volume-mute'"
            color="#e0a500"
          />
        </div>
        <team-crest
          v-if="
            snapShot.phase !== 'positioning-test' &&
              matchStart.leftTeamConfig.colors
          "
          :team-config="matchStart.leftTeamConfig"
          :active="leftTeamToMove"
          @toggle-color="toggleColorsTeamLeft"
        ></team-crest>
        <game-info :match-start="matchStart" :snap-shot="snapShot"> </game-info>
        <team-crest
          v-if="
            snapShot.phase !== 'positioning-test' &&
              matchStart.rightTeamConfig.colors
          "
          :team-config="matchStart.rightTeamConfig"
          :active="rightTeamToMove"
          @toggle-color="toggleColorsTeamRight"
        ></team-crest>
        <div id="pause-button" @click="pauseResume()">
          <font-awesome-icon
            class="favorite-icon"
            :icon="paused ? 'pause' : 'play'"
            color="#e0a500"
          />
        </div>
      </header>
      <div class="sidebar-left">
        <player-details
          v-if="selectedEntity && selectedEntityId"
          :snap-shot="snapShot"
          :selected-entity-id="selectedEntityId"
          :match-start="matchStart"
          :selected-entity="selectedEntity"
        >
        </player-details>
        <!-- <hr class="normal-separation-line"> -->
        <banned-players
          v-if="matchStart.leftTeamConfig.colors != undefined"
          :team-config="matchStart.leftTeamConfig"
          :banned-players="bannedPlayersTeamLeft.players"
        >
        </banned-players>
        <div class="skip-button-container">
          <h3 id="chance-view" class="panel-title"></h3>
        </div>
      </div>
      <div class="center">
        <div id="game-container">
          <div id="game-grid-panel">
            <div
              v-for="(tile, index) in grid"
              :key="index"
              class="gras-tile"
              :class="[
                tile.class,
                { 'highlighted-gras-tile': highlightedTiles.includes(index) }
              ]"
              @click="clickEmptyTile(tile.xPos, tile.yPos)"
              @mouseover="showChance(tile.xPos, tile.yPos)"
            ></div>
            <!-- <div v-for="(tile, index) in this.grid" 
                            :key="tile.id" 
                            :class="highlightedTiles.includes(index) ? 'highlighted-gras-tile' : 'hidden-tile'"
                            >
                        </div> -->
            <div class="goal-post-right-top"></div>
            <div class="goal-post-right-center"></div>
            <div class="goal-post-right-bottom"></div>
            <div class="goal-post-left-top"></div>
            <div class="goal-post-left-center"></div>
            <div class="goal-post-left-bottom"></div>
            <transition-group name="game-balls" tag="div">
              <div
                v-for="(ball, key) in snapShot.balls"
                v-show="!(!ball.xPos && !ball.yPos)"
                :key="key"
                :class="[key]"
                :style="{
                  left: 5.88 * ball.xPos + 0 * Math.random() - 0 + '%',
                  top: 7.69 * ball.yPos + 1.7 * Math.random() - 0.5 + '%'
                }"
                @click="Old(ball.xPos, ball.yPos)"
              ></div>
            </transition-group>
            <transition-group
              name="game-players"
              tag="div"
              enter-active-class="animated zoomIn"
              leave-active-class="animated rollOut"
            >
              <div
                v-for="(player, key) in activePlayersTeamLeft"
                :key="key"
                :class="[
                  'player-tile',
                  'left-team-player',
                  { 'player-knockout animated shake': player.knockout }
                ]"
                :style="{
                  left: 5.88 * player.xPos + '%',
                  top: 7.69 * player.yPos + '%',
                  background:
                    'radial-gradient(#00000000, #0000003f), #' +
                    matchStart.leftTeamConfig.colors.primary
                }"
                @click="targetPlayer(player, key)"
                @mouseover="showChance(player.xPos, player.yPos)"
              >
                <div :class="key.slice(0, 6)"></div>
              </div>
            </transition-group>
            <transition-group
              name="game-players"
              tag="div"
              enter-active-class="animated zoomIn"
              leave-active-class="animated rollOut"
            >
              <div
                v-for="(player, key) in activePlayersTeamRight"
                :key="key"
                :class="[
                  'player-tile',
                  'right-team-player',
                  { 'player-knockout animated shake': player.knockout }
                ]"
                :style="{
                  left: 5.88 * player.xPos + '%',
                  top: 7.69 * player.yPos + '%',
                  background:
                    'radial-gradient(#00000000, #0000003f), #' +
                    matchStart.rightTeamConfig.colors.primary
                }"
                @click="targetPlayer(player, key)"
                @mouseover="showChance(player.xPos, player.yPos)"
              >
                <div :class="key.slice(0, 6)"></div>
              </div>
            </transition-group>
            <transition-group
              name="wombat-cubes"
              enter-active-class="animated bounceInDown"
              leave-active-class="animated fadeOut slow"
              tag="div"
            >
              <div
                v-for="(wombatCube, index) in snapShot.wombatCubes"
                :key="index"
                :class="['wombat-cube']"
                :style="{
                  left: 5.88 * wombatCube.xPos + '%',
                  top: 7.69 * wombatCube.yPos + '%'
                }"
              ></div>
            </transition-group>
          </div>
        </div>
        <game-fans
          :snap-shot="snapShot"
          :selected-fan-type-right-team="selectedFanTypeRightTeam"
          :selected-fan-type-left-team="selectedFanTypeLeftTeam"
        >
        </game-fans>
        <game-timer :time="timeout"></game-timer>
      </div>
      <div class="sidebar-right">
        <game-instructions
          :game-instruction="[gameInstruction[0]]"
          :phase="snapShot.phase"
          :warnings="warnings"
          :errors="errors"
        ></game-instructions>
        <!-- <game-log :gameInstruction="gameInstruction"></game-log> -->
        <!-- <hr class="normal-separation-line"> -->
        <!-- <div class="info-panel" id="test-functions-panel">
                    <h3 class="panel-title">Zusatzfunktionen</h3>åå

                    <hr class="inner-separation-line">
                    <hr class="inner-separation-line">
                    <label for="autoSkipFans">Fans automatisch überspringen</label>
                    <input id="autoSkipFans" type="Checkbox" class="app__lobby-input">
                    
                    <hr class="inner-separation-line">
                    <div class="info-text">{{ this.selectedEntity }}, {{ this.selectedEntityId }} {{ this.gameState }}, {{ this.turnType }}
                    </div>
                </div> -->
        <banned-players
          v-if="matchStart.rightTeamConfig.colors != undefined"
          :team-config="matchStart.rightTeamConfig"
          :banned-players="bannedPlayersTeamRight.players"
        >
        </banned-players>

        <div class="skip-button-container">
          <button class="skip-button" @click="skip()">Aussetzen</button>
        </div>
      </div>
    </section>

    <match-finish
      v-if="matchFinish"
      :match-finish="matchFinish"
      @to-lobby="game.currentState = 'inLobby'"
    ></match-finish>
  </div>
</template>

<script>
import web from "../App.vue";
import BannedPlayers from "../components/game/BannedPlayers.vue";
// import GameLog from "../components/game/GameLog.vue";
import PlayerDetails from "../components/game/PlayerDetails.vue";
import GameInfo from "../components/game/GameInfo.vue";
import GameFans from "../components/game/GameFans.vue";
import GameTimer from "../components/game/GameTimer.vue";
import TeamCrest from "../components/game/TeamCrest.vue";
import GameInstructions from "../components/game/GameInstructions.vue";
import MatchFinish from "../components/game/GameFinish.vue";

import {
  rightAttackTiles,
  centerTiles,
  leftAttackTiles,
  cornerTiles,
  goalTiles
} from "../util/quidditchField";

export default {
  components: {
    "player-details": PlayerDetails,
    "banned-players": BannedPlayers,
    "game-info": GameInfo,
    "game-fans": GameFans,
    "game-timer": GameTimer,
    "team-crest": TeamCrest,
    "game-instructions": GameInstructions,
    "match-finish": MatchFinish
  },
  props: {
    game: {
      type: Object,
      required: false,
      default() {
        return {};
      }
    },
    teamConfig: {
      type: Object,
      required: false,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      // test matchFinish component
      // matchFinish: {
      //     endRound: 12,
      //     leftPoints: 90,
      //     rightPoints: 50,
      //     winnerUserName: "user1",
      //     victoryReason: "mostPoints",
      // },
      matchFinish: null,

      warnings: [
        {
          code: 302,
          information:
            "Warning: joinRequest-doublelogin: User logs in from two clients at the same time. The last login is always executed. Error goes to the old logon, Warning goes to the new logon."
        }
      ],

      errors: [
        {
          code: 152,
          information:
            "Error:  Server could parse a json but it is not in the Container format.",
          triggerMatchFinish: true
        }
      ],

      timeout: 0,
      // just for testing (start)
      gameLogTest: "Enter log entry",
      // just for testing (end)

      muted: false,

      gameState: "inGame",
      grid: [],

      leftTeamToMove: false,
      rightTeamToMove: false,

      selectedFanTypeRightTeam: "",
      selectedFanTypeLeftTeam: "",

      selectedEntityId: undefined,
      selectedEntity: undefined,

      paused: false,

      highlightedTiles: [],
      crossedTiles: [],
      // for later
      hoveredPlayerType: undefined,

      // teamFormation
      playerToPosition: undefined,

      turnType: String,

      // Use unshift({message: 'String'}) to add log entries to top of gameInstruction-Panel. Will be automatically updated.
      gameInstruction: [
        { message: "test", time: "" },
        { message: "", time: "" }
      ],

      // can later be changed to undefined.
      matchStart: {
        matchConfig: {},
        leftTeamConfig: {},
        rightTeamConfig: {},
        leftTeamUserName: "Linkes Team",
        rightTeamUserName: "Rechtes Team"
      },

      // For reconnecting
      reconnectAttempts: 0,
      // server message data formats

      // // can later be changed to undefined. Values are for debugging purposes

      snapShot: {
        phase: "positioning",
        spectatorUserName: ["Gast"],
        round: 0,
        leftTeam: {
          points: 0,
          fans: [
            {
              fanType: "troll",
              banned: true
            },
            {
              fanType: "troll",
              banned: true
            },
            {
              fanType: "elf",
              banned: true
            },
            {
              fanType: "elf",
              banned: true
            },
            {
              fanType: "goblin",
              banned: true
            },
            {
              fanType: "goblin",
              banned: true
            },
            {
              fanType: "niffler",
              banned: true
            }
          ],
          players: {
            seeker: {
              xPos: 0,
              yPos: 0,
              banned: true,
              turnUsed: false,
              knockOut: false
            },
            keeper: {
              xPos: 0,
              yPos: 0,
              banned: true,
              turnUsed: false,
              knockOut: false
            },
            chaser1: {
              xPos: 0,
              yPos: 0,
              banned: true,
              turnUsed: false,
              knockOut: false
            },
            chaser2: {
              xPos: 0,
              yPos: 0,
              banned: true,
              turnUsed: false,
              knockOut: false
            },
            chaser3: {
              xPos: 0,
              yPos: 0,
              banned: true,
              turnUsed: false,
              knockOut: false
            },
            beater1: {
              xPos: 0,
              yPos: 0,
              banned: true,
              turnUsed: false,
              knockOut: false
            },
            beater2: {
              xPos: 0,
              yPos: 0,
              banned: true,
              turnUsed: false,
              knockOut: false
            }
          }
        },
        rightTeam: {
          points: 0,
          fans: [
            {
              fanType: "troll",
              banned: true
            },
            {
              fanType: "troll",
              banned: true
            },
            {
              fanType: "elf",
              banned: true
            },
            {
              fanType: "elf",
              banned: true
            },
            {
              fanType: "goblin",
              banned: true
            },
            {
              fanType: "goblin",
              banned: true
            },
            {
              fanType: "niffler",
              banned: true
            }
          ],
          players: {
            seeker: {
              xPos: 0,
              yPos: 0,
              banned: true,
              turnUsed: false,
              knockOut: false
            },
            keeper: {
              xPos: 0,
              yPos: 0,
              banned: true,
              turnUsed: false,
              knockOut: false
            },
            chaser1: {
              xPos: 0,
              yPos: 0,
              banned: true,
              turnUsed: false,
              knockOut: false
            },
            chaser2: {
              xPos: 0,
              yPos: 0,
              banned: true,
              turnUsed: false,
              knockOut: false
            },
            chaser3: {
              xPos: 0,
              yPos: 0,
              banned: true,
              turnUsed: false,
              knockOut: false
            },
            beater1: {
              xPos: 0,
              yPos: 0,
              banned: true,
              turnUsed: false,
              knockOut: false
            },
            beater2: {
              xPos: 0,
              yPos: 0,
              banned: true,
              turnUsed: false,
              knockOut: false
            }
          }
        },
        balls: {}
      },

      next: {
        turn: undefined,
        type: undefined,
        timeout: undefined
      },
      reconnect: {
        matchStart: undefined,
        snapshot: undefined
      },

      teamFormation: {
        players: {
          seeker: {
            xPos: 0,
            yPos: 5
          },
          keeper: {
            xPos: 7,
            yPos: 3
          },
          chaser1: {
            xPos: 7,
            yPos: 8
          },
          chaser2: {
            xPos: 4,
            yPos: 2
          },
          chaser3: {
            xPos: 4,
            yPos: 11
          },
          beater1: {
            xPos: 8,
            yPos: 9
          },
          beater2: {
            xPos: 3,
            yPos: 8
          }
        }
      }
    };
  },
  computed: {
    /**Adds left half tiles to highlighted tiles */
    leftHalfTiles() {
      var tiles = [];
      for (var i = 0; i < 221; i++) {
        var column = i % 17;
        if (column < 8) {
          if (!centerTiles.includes(i)) {
            if (!cornerTiles.includes(i)) {
              tiles.push(i);
            }
          }
        }
      }
      return tiles;
    },
    /**Adds right half tiles to highlighted tiles */
    rightHalfTiles() {
      var tiles = [];
      for (var i = 0; i < 221; i++) {
        var column = i % 17;
        if (column > 8) {
          if (!centerTiles.includes(i)) {
            if (!cornerTiles.includes(i)) {
              tiles.push(i);
            }
          }
        }
      }
      return tiles;
    },
    activePlayersTeamLeft() {
      var players = this.snapShot.leftTeam.players;
      var activePlayers = {};
      for (var key in players) {
        if (!players[key].banned) {
          activePlayers[key] = players[key];
        }
      }
      return activePlayers;
    },
    activePlayersTeamRight() {
      var players = this.snapShot.rightTeam.players;
      var activePlayers = {};
      for (var key in players) {
        if (!players[key].banned) {
          activePlayers[key] = players[key];
        }
      }
      return activePlayers;
    },
    getEntity(entityID) {
      if (entityID.startsWith("left")) {
        const key = entityID.slice(4).toLowerCase();
        return this.snapShot.leftTeam.players[key];
      } else if (entityID.startsWith("right")) {
        const key = entityID.slice(5).toLowerCase();
        return this.snapShot.rightTeam.players[key];
      } else {
        switch (entityID) {
          case "snitch":
            return this.snapShot.balls.snitch;
          case "bludger1":
            return this.snapShot.balls.bludger1;
          case "bludger2":
            return this.snapShot.balls.bludger2;
          case "quaffle":
            return this.snapShot.balls.quaffle;

          // cases for fans have yet to be included !!!
          default:
            return null;
        }
      }
    },
    bannedPlayersTeamLeft() {
      var players = this.snapShot.leftTeam.players;
      var bannedPlayers = {};
      var i = 0;
      for (var key in players) {
        if (players[key].banned) {
          bannedPlayers[key] = players[key];
          i++;
        }
      }
      return { players: bannedPlayers, number: i };
    },
    bannedPlayersTeamRight() {
      var players = this.snapShot.rightTeam.players;
      var bannedPlayers = {};
      var i = 0;
      for (var key in players) {
        if (players[key].banned) {
          bannedPlayers[key] = players[key];
          i++;
        }
      }
      return { players: bannedPlayers, number: i };
    }
  },
  /**Is automatically called when the component loaded */
  mounted() {
    this.startTimer();
    this.grid = this.generateGrid();
    this.matchStart.leftTeamConfig = this.teamConfig;
    this.matchStart.rightTeamConfig = this.teamConfig;
    this.startGame();
    for (let player in this.snapShot.leftTeam.players) {
      this.snapShot.leftTeam.players[player].banned = true;
    }
    for (let player in this.snapShot.rightTeam.players) {
      this.snapShot.rightTeam.players[player].banned = true;
    }
    //this.mySide = "right";
    //this.highlightedTiles = this.rightHalfTiles;
  },
  methods: {
    startTimer() {
      setInterval(() => {
        if (this.timeout != 0 && !this.paused) {
          this.timeout--;
        }
      }, 1000);
    },

    muteAudio() {
      const audio = document.getElementById("background-music");
      if (this.muted) {
        audio.volume = 1.0;
      } else {
        audio.volume = 0;
      }
      this.muted = !this.muted;
    },

    toggleColorsTeamLeft() {
      console.log("Hi");
      const primary = this.matchStart.leftTeamConfig.colors.primary;
      console.log(primary);
      const secondary = this.matchStart.leftTeamConfig.colors.secondary;
      console.log(secondary);
      this.matchStart.leftTeamConfig.colors.primary = secondary;
      this.matchStart.leftTeamConfig.colors.secondary = primary;
    },

    toggleColorsTeamRight() {
      console.log("Hi");
      const primary = this.matchStart.rightTeamConfig.colors.primary;
      const secondary = this.matchStart.rightTeamConfig.colors.secondary;
      this.matchStart.rightTeamConfig.colors.primary = secondary;
      this.matchStart.rightTeamConfig.colors.secondary = primary;
    },

    showInstruction(message) {
      console.log(message);
      const time = new Date();
      this.gameInstruction.unshift({
        message: "new message",
        time:
          time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds()
      });
    },

    // test-methods
    sendMsg: function() {
      web.websocket.send(document.getElementById("in").value);
    },

    getTime() {
      const today = new Date();
      return (
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
      );
    },

    /**function to be called when a player on the field is clicked.
     * Sends a deltaRequest message if an action is required if possible
     */

    targetPlayer(player) {
      var id = this.playerIdOnTile(player.xPos, player.yPos);

      var xPos = player.xPos;
      var yPos = player.yPos;
      if (!this.selectedEntityId.includes(this.mySide)) return;
      if (this.paused) return;
      if (!this.highlightedTiles.includes(this.getTileId(xPos, yPos))) return;
      if (this.turnType === "move") {
        this.deltaRequest(
          "move",
          null,
          null,
          xPos,
          yPos,
          this.selectedEntityId,
          null,
          null,
          null,
          null,
          null
        );
      } else if (this.turnType === "action") {
        if (
          (this.selectedEntityId.includes("Chaser") ||
            this.selectedEntityId.includes("Keeper")) &&
          this.selectedEntity.holdsQuaffle
        ) {
          this.deltaRequest(
            "quaffleThrow",
            null,
            null,
            xPos,
            yPos,
            this.selectedEntityId,
            null,
            null,
            null,
            null,
            null
          );
        } else if (this.selectedEntityId.includes("Chaser")) {
          this.deltaRequest(
            "wrestQuaffle",
            null,
            null,
            null,
            null,
            this.selectedEntityId,
            null,
            null,
            null,
            null,
            null
          );
        } else if (
          this.selectedEntityId.includes("Beater") &&
          this.selectedEntity.holdsBludger
        ) {
          var balls = this.snapShot.balls;
          if (
            this.selectedEntity.xPos === balls.bludger1.xPos &&
            this.selectedEntity.yPos === balls.bludger1.yPos
          ) {
            this.deltaRequest(
              "bludgerBeating",
              balls.bludger1.xPos,
              balls.bludger1.yPos,
              xPos,
              yPos,
              this.selectedEntityId,
              "bludger1",
              null,
              null,
              null,
              null
            );
          } else if (
            this.selectedEntity.xPos === balls.bludger2.xPos &&
            this.selectedEntity.yPos === balls.bludger2.yPos
          ) {
            this.deltaRequest(
              "bludgerBeating",
              balls.bludger2.xPos,
              balls.bludger2.yPos,
              xPos,
              yPos,
              this.selectedEntityId,
              "bludger2",
              null,
              null,
              null,
              null
            );
          }
        }
      } else if (this.turnType === "fan") {
        if (this.mySide === "right") {
          this.selectedFanTypeRightTeam = "";
        } else {
          this.selectedFanTypeLeftTeam = "";
        }

        if (this.selectedEntityId.includes("Elf")) {
          this.deltaRequest(
            "elfTeleportation",
            null,
            null,
            null,
            null,
            null,
            id,
            null,
            null,
            null,
            null
          );
        } else if (this.selectedEntityId.includes("Goblin")) {
          this.deltaRequest(
            "goblinShock",
            null,
            null,
            null,
            null,
            null,
            id,
            null,
            null,
            null,
            null
          );
        } else if (this.selectedEntityId.includes("Niffler")) {
          this.deltaRequest(
            "snitchSnatch",
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
          );
        } else if (this.selectedEntityId.includes("Troll")) {
          this.deltaRequest(
            "trollRoar",
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
          );
        }
      }
      //this.selectedEntity = player;
      //this.highlightTiles(xPos, yPos, 1);
    },
    /**function to be calles when a empty tile is clicked.
     * Sends a deltaRequest to the server if clicking the tile induces a valid action if one is required.
     * Sends a teamFormation the the server once all team members are placed for the first time.
     */
    clickEmptyTile: function(xPos, yPos) {
      //Make sure the player clicked a highlighted Tile
      //if(!highlightedTiles.includes(this.getTileId(xPos, yPos))) return;

      this.clickedTile = [xPos, yPos];
      if (!this.highlightedTiles.includes(this.getTileId(xPos, yPos))) return;
      if (this.paused) return;
      if (!this.started) {
        var myTeam;
        if (this.mySide === "left") {
          this.highlightedTiles = this.leftHalfTiles;
          myTeam = this.snapShot.leftTeam;
          this.playerToPosition = myTeam.players.seeker;
          for (let player in this.snapShot.leftTeam.players) {
            if (this.snapShot.leftTeam.players[player].banned) {
              this.snapShot.leftTeam.players[player].banned = false;
              this.snapShot.leftTeam.players[player].xPos = xPos;
              this.snapShot.leftTeam.players[player].yPos = yPos;
              for (let i = 0; i < this.highlightedTiles.length; i++) {
                if (this.highlightedTiles[i] === this.getTileId(xPos, yPos))
                  this.highlightedTiles.splice(i, 1);
              }
              break;
            }
          }
          for (let player in this.snapShot.leftTeam.players) {
            if (this.snapShot.leftTeam.players[player].banned) {
              this.playerToPosition = this.snapShot.leftTeam.players[player];
              break;
            }
          }
        } else if (this.mySide === "right") {
          this.highlightedTiles = this.rightHalfTiles;
          myTeam = this.snapShot.rightTeam;
          this.playerToPosition = myTeam.players.seeker;
          for (let player in this.snapShot.rightTeam.players) {
            if (this.snapShot.rightTeam.players[player].banned) {
              this.snapShot.rightTeam.players[player].banned = false;
              this.snapShot.rightTeam.players[player].xPos = xPos;
              this.snapShot.rightTeam.players[player].yPos = yPos;
              for (let i = 0; i < this.highlightedTiles.length; i++) {
                if (this.highlightedTiles[i] === this.getTileId(xPos, yPos))
                  this.highlightedTiles.splice(i, 1);
              }
              break;
            }
          }
          for (let player in this.snapShot.rightTeam.players) {
            if (this.snapShot.rightTeam.players[player].banned) {
              this.playerToPosition = this.snapShot.rightTeam.players[player];
              break;
            }
          }
        }
        //when all players a placed on the field
        if (!myTeam.players.beater2.banned) {
          this.started = true;
          this.selectedEntity = undefined;
          this.sendTeamFormation(myTeam);
          this.highlightedTiles = [];
        }
        this.playerToPosition = null;
      }

      //Chech for any possible action that is performed by clicking an empty tile if it is required
      else if (this.turnType === "move") {
        if (
          Math.abs(xPos - this.selectedEntity.xPos) < 2 &&
          Math.abs(yPos - this.selectedEntity.yPos) < 2
        ) {
          this.deltaRequest(
            "move",
            null,
            null,
            xPos,
            yPos,
            this.selectedEntityId,
            null,
            null,
            null,
            null,
            null
          );
        }
      } else if (this.turnType === "action") {
        if (
          (this.selectedEntityId.includes("Chaser") ||
            this.selectedEntityId.includes("Keeper")) &&
          this.selectedEntity.holdsQuaffle
        ) {
          this.deltaRequest(
            "quaffleThrow",
            null,
            null,
            xPos,
            yPos,
            this.selectedEntityId,
            null,
            null,
            null,
            null,
            null
          );
        } else if (
          this.selectedEntityId.includes("Beater") &&
          this.selectedEntity.holdsBludger
        ) {
          var balls = this.snapShot.balls;
          if (
            this.selectedEntity.xPos === balls.bludger1.xPos &&
            this.selectedEntity.yPos === balls.bludger1.yPos
          ) {
            this.deltaRequest(
              "bludgerBeating",
              balls.bludger1.xPos,
              balls.bludger1.yPos,
              xPos,
              yPos,
              this.selectedEntityId,
              "bludger1",
              null,
              null,
              null,
              null
            );
          } else if (
            this.selectedEntity.xPos === balls.bludger2.xPos &&
            this.selectedEntity.yPos === balls.bludger2.yPos
          ) {
            this.deltaRequest(
              "bludgerBeating",
              balls.bludger2.xPos,
              balls.bludger2.yPos,
              xPos,
              yPos,
              this.selectedEntityId,
              "bludger2",
              null,
              null,
              null,
              null
            );
          }
        }
      } else if (this.turnType === "fan") {
        if (this.mySide === "right") {
          this.selectedFanTypeRightTeam = "";
        } else {
          this.selectedFanTypeLeftTeam = "";
        }
        if (this.selectedEntityId.includes("Niffler")) {
          this.deltaRequest(
            "snitchSnatch",
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
          );
        } else if (this.selectedEntityId.includes("Troll")) {
          this.deltaRequest(
            "trollRoar",
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
          );
        } else if (this.selectedEntityId.includes("Wombat")) {
          this.deltaRequest(
            "wombatPoo",
            null,
            null,
            xPos,
            yPos,
            null,
            null,
            null,
            null,
            null,
            null
          );
        }
      } else if (this.turnType === "removeBan") {
        this.deltaRequest(
          "unban",
          null,
          null,
          xPos,
          yPos,
          this.selectedEntityId,
          null,
          null,
          null,
          null,
          null
        );
      }

      //if(this.selectedEntity) {
      //    this.selectedEntity.xPos = xPos;
      //    this.selectedEntity.yPos = yPos;
      //}
    },

    /**Displays the success chance for certain actions */
    showChance: function(xPos, yPos) {
      if (!this.highlightedTiles.includes(this.getTileId(xPos, yPos))) return;
      if (this.turnType === "action") {
        //Quaffle throw
        if (
          (this.selectedEntityId.includes("Chaser") ||
            this.selectedEntityId.includes("Keeper")) &&
          this.selectedEntity.holdsQuaffle
        ) {
          //determine number of intercepting players
          var crossedTiles = this.getCrossedTiles(
            this.selectedEntity.xPos,
            this.selectedEntity.yPos,
            xPos,
            yPos
          );
          var nInterceptPlayers = 0;
          for (let i = 0; i < crossedTiles.length; i++) {
            var x = crossedTiles[i] % 17;
            var y = (crossedTiles[i] - (crossedTiles[i] % 17)) / 17;
            if (this.playerIdOnTile(x, y) !== null) {
              if (!this.playerIdOnTile(x, y).includes(this.mySide)) {
                nInterceptPlayers++;
              }
            }
          }
          //determine distance
          var dx = Math.abs(this.selectedEntity.xPos - xPos);
          var dy = Math.abs(this.selectedEntity.yPos - yPos);
          var dist = dx + Math.max(0, dy - dx);
          var chance =
            Math.pow(
              1 - this.matchStart.matchConfig.probabilities.catchQuaffle,
              nInterceptPlayers
            ) *
            Math.pow(
              this.matchStart.matchConfig.probabilities.throwSuccess,
              dist
            );
          chance = Math.round(chance * 100);
          document.getElementById("chance-view").innerHTML =
            "Chance für erfolgreichen Wurf: " + chance + "%";
        }

        // else if(this.selectedEntityId.includes("Beater") && this.selectedEntity.holdsBludger){
        //     if(this.playerIdOnTile(x, y) !== null){
        //         var chance = Math.round(this.matchStart.matchConfig.probabilities.knockOut * 100);
        //         document.getElementById("chance-view").innerHTML = "Chance für erfolgreichen Knockout: " + chance + "%";
        //     }
        // }
      }
    },

    /**Reads data from the current snapShot to sends the current team formation to the server */
    sendTeamFormation(myTeam) {
      // so wie es jetzt da steht sind das JSON-Dateien und keine JS-Objekte (die Anführungszeichen müssen weg)
      var payload = {
        players: {
          seeker: {
            xPos: myTeam.players.seeker.xPos,
            yPos: myTeam.players.seeker.yPos
          },
          keeper: {
            xPos: myTeam.players.keeper.xPos,
            yPos: myTeam.players.keeper.yPos
          },
          chaser1: {
            xPos: myTeam.players.chaser1.xPos,
            yPos: myTeam.players.chaser1.yPos
          },
          chaser2: {
            xPos: myTeam.players.chaser2.xPos,
            yPos: myTeam.players.chaser2.yPos
          },
          chaser3: {
            xPos: myTeam.players.chaser3.xPos,
            yPos: myTeam.players.chaser3.yPos
          },
          beater1: {
            xPos: myTeam.players.beater1.xPos,
            yPos: myTeam.players.beater1.yPos
          },
          beater2: {
            xPos: myTeam.players.beater2.xPos,
            yPos: myTeam.players.beater2.yPos
          }
        }
      };
      var timestamp = this.makeTimestamp();
      var teamFormation = {
        timestamp: timestamp,
        payloadType: "teamFormation",
        payload: payload
      };
      web.websocket.send(JSON.stringify(teamFormation));
    },

    // display and animation methods
    generateGrid() {
      var grid = [];
      for (var i = 0; i < 221; i++) {
        if (cornerTiles.includes(i)) {
          grid.push({ class: "corner-tile" });
        } else {
          var xPos = i % 17;
          var yPos = (i - xPos) / 17;
          if (centerTiles.includes(i)) {
            if (i % 2 === 0) {
              grid.push({
                class: "darker-center-gras-tile",
                xPos: xPos,
                yPos: yPos
              });
            } else {
              grid.push({
                class: "lighter-center-gras-tile",
                xPos: xPos,
                yPos: yPos
              });
            }
          } else if (
            leftAttackTiles.includes(i) ||
            rightAttackTiles.includes(i)
          ) {
            if (i % 2 === 0) {
              grid.push({
                class: "darker-attack-gras-tile",
                xPos: xPos,
                yPos: yPos
              });
            } else {
              grid.push({
                class: "lighter-attack-gras-tile",
                xPos: xPos,
                yPos: yPos
              });
            }
          } else if (i % 2 === 0) {
            grid.push({ class: "darker-gras-tile", xPos: xPos, yPos: yPos });
          } else {
            grid.push({ class: "lighter-gras-tile", xPos: xPos, yPos: yPos });
          }
        }
      }
      return grid;
    },
    /**adds a square of tiles to the highlighted tiles */
    highlightTiles(xPos, yPos, radius) {
      this.highlightedTiles = [];
      for (var x = xPos - radius; x <= xPos + radius; x++) {
        for (var y = yPos - radius; y <= yPos + radius; y++) {
          this.highlightTile(x, y);
        }
      }
    },
    /**To be called when the component is mounted.
     * Updates the websocket`s onmessage method so server messages can be reacted to.
     */
    startGame: function() {
      var vm = this;
      if (web.websocket) {
        web.websocket.onerror = function() {
          alert("Connection lost");
          web.websocket = new WebSocket(web.addr);
          web.websocket.onopen = function() {
            this.reconnectAttempts = 0;
            this.startGame();
            web.websocket.send(web.joinReq);
          };
          web.websocket.onerror = function() {
            setTimeout(function() {
              if (this.reconnectAttempts < 5) {
                web.websocket = new WebSocket(web.addr);
                this.reconnectAttempts += 1;
              }
            }, 2000);
          };
        };
        web.websocket.onmessage = function(msg) {
          var jsonObject = JSON.parse(msg.data);
          // all message types are assigned to their corresponding handlers
          if (jsonObject.payloadType === "matchStart") {
            // debugging:
            //vm.logMessage(jsonObject.payload);

            vm.handleMatchStart(jsonObject);
          } else if (jsonObject.payloadType === "matchFinish") {
            // debugging:
            //vm.logMessage(jsonObject.payload);

            vm.handleMatchFinish(jsonObject);
          } else if (jsonObject.payloadType === "snapshot") {
            // debugging:
            //vm.logMessage(jsonObject.payload);

            vm.handleSnapshot(jsonObject);
          } else if (jsonObject.payloadType === "next") {
            // debugging:
            //vm.logMessage(jsonObject.payload);

            vm.handleNext(jsonObject);
          } else if (jsonObject.payloadType === "reconnect") {
            // debugging:
            //vm.logMessage(jsonObject.payload);

            vm.handleReconnect(jsonObject);
          } else if (jsonObject.payloadType === "pauseResponse") {
            vm.handlePauseResponse(jsonObject);
          }
        };
      }
    },
    mapFan(fanType) {
      switch (fanType) {
        case "goblins":
          return "Goblins";
        case "elves":
          return "Elfen";
        case "nifflers":
          return "Niffler";
        case "trolls":
          return "Trolle";
        default:
          undefined;
      }
    },

    // game handlers
    /**Gets the side a player is playing on when a matchStart message is received */
    handleMatchStart: function(obj) {
      // store matchStart object in data. This object together with data-bindings will be used to display
      // all the relevant data
      this.matchStart = obj.payload;
      // highlights the proper tiles for teamFormation
      if (obj.payload.leftTeamUserName === this.game.userName) {
        this.mySide = "left";
        this.highlightedTiles = this.leftHalfTiles;
      } else if (obj.payload.rightTeamUserName === this.game.userName) {
        this.mySide = "right";
        this.highlightedTiles = this.rightHalfTiles;
      }
      for (let i = 0; i < this.highlightedTiles.length; i++) {
        if (goalTiles.includes(this.highlightedTiles[i]))
          this.highlightedTiles.splice(i, 1);
      }
    },
    /**Loads the lobby component */
    handleMatchFinish: function(obj) {
      this.paused = true;
      this.matchFinish = obj.payload;
      web.websocket.close();
    },
    /**Update local snapShot */
    handleSnapshot: function(obj) {
      if (this.mySide === "right") {
        this.selectedFanTypeLeftTeam = "";
      } else {
        this.selectedFanTypeRightTeam = "";
      }
      this.snapShot = obj.payload;
      // if(obj.payload.goalWasThrownThisRound)
      //     this.gameInstruction.unshift({message: 'Server sent: next'});
    },
    /**Finds out which action is required from which entity and gives the player feedback */
    handleNext: function(obj) {
      this.highlightedTiles = [];
      this.timeout = Math.round(parseInt(obj.payload.timeout) / 1000);

      this.selectedEntity = undefined;
      this.selectedEntityId = obj.payload.turn;

      // determine which team is to move
      if (obj.payload.turn.includes("left")) {
        this.leftTeamToMove = true;
        this.rightTeamToMove = false;
      } else if (obj.payload.turn.includes("right")) {
        this.leftTeamToMove = false;
        this.rightTeamToMove = true;
      }

      //if a player is chosen
      if (obj.payload.turn === "leftSeeker")
        this.selectedEntity = this.snapShot.leftTeam.players.seeker;
      else if (obj.payload.turn === "leftKeeper")
        this.selectedEntity = this.snapShot.leftTeam.players.keeper;
      else if (obj.payload.turn === "leftChaser1")
        this.selectedEntity = this.snapShot.leftTeam.players.chaser1;
      else if (obj.payload.turn === "leftChaser2")
        this.selectedEntity = this.snapShot.leftTeam.players.chaser2;
      else if (obj.payload.turn === "leftChaser3")
        this.selectedEntity = this.snapShot.leftTeam.players.chaser3;
      else if (obj.payload.turn === "leftBeater1")
        this.selectedEntity = this.snapShot.leftTeam.players.beater1;
      else if (obj.payload.turn === "leftBeater2")
        this.selectedEntity = this.snapShot.leftTeam.players.beater2;
      else if (obj.payload.turn === "rightSeeker")
        this.selectedEntity = this.snapShot.rightTeam.players.seeker;
      else if (obj.payload.turn === "rightKeeper")
        this.selectedEntity = this.snapShot.rightTeam.players.keeper;
      else if (obj.payload.turn === "rightChaser1")
        this.selectedEntity = this.snapShot.rightTeam.players.chaser1;
      else if (obj.payload.turn === "rightChaser2")
        this.selectedEntity = this.snapShot.rightTeam.players.chaser2;
      else if (obj.payload.turn === "rightChaser3")
        this.selectedEntity = this.snapShot.rightTeam.players.chaser3;
      else if (obj.payload.turn === "rightBeater1")
        this.selectedEntity = this.snapShot.rightTeam.players.beater1;
      else if (obj.payload.turn === "rightBeater2")
        this.selectedEntity = this.snapShot.rightTeam.players.beater2;
      //if a fan is chosen
      else if (obj.payload.turn.includes("left")) {
        for (let fan in this.snapShot.leftTeam.fans) {
          if (
            obj.payload.turn
              .toLowerCase()
              .includes(this.snapShot.leftTeam.fans[fan].fanType)
          ) {
            this.selectedFanTypeLeftTeam = this.snapShot.leftTeam.fans[
              fan
            ].fanType;
            this.selectedEntity = this.snapShot.leftTeam.fans[fan];
            break;
          }
        }
      } else if (obj.payload.turn.includes("right")) {
        for (let fan in this.snapShot.rightTeam.fans) {
          if (
            obj.payload.turn
              .toLowerCase()
              .includes(this.snapShot.rightTeam.fans[fan].fanType)
          ) {
            this.selectedFanTypeRightTeam = this.snapShot.rightTeam.fans[
              fan
            ].fanType;
            this.selectedEntity = this.snapShot.rightTeam.fans[fan];
            break;
          }
        }
      }
      if (obj.payload.turn.includes(this.mySide))
        this.turnType = obj.payload.type;
      else return;
      //Move is possible
      if (obj.payload.type === "move") {
        this.gameInstruction.unshift({
          message: this.getPlayerName(this.selectedEntityId) + " darf ziehen"
        });
        for (
          var x = Math.max(this.selectedEntity.xPos - 1, 0);
          x <= Math.min(this.selectedEntity.xPos + 1, 16);
          x++
        ) {
          for (
            var y = Math.max(this.selectedEntity.yPos - 1, 0);
            y <= Math.min(this.selectedEntity.yPos + 1, 16);
            y++
          ) {
            var cubes = this.snapShot.wombatCubes;
            var cubed = false;
            for (let i = 0; i < cubes.length; i++) {
              if (cubes[i].xPos === x && cubes[i].yPos === y) cubed = true;
            }
            if (
              !cubed &&
              !cornerTiles.includes(this.getTileId(x, y)) &&
              !(this.selectedEntity.xPos == x && this.selectedEntity.yPos == y)
            ) {
              this.highlightTile(x, y);
            }
            //if(!this.cornerTiles.includes(this.getTileId(x, y)))this.highlightTile(x, y);
          }
        }
      }
      //Throw is possible
      else if (
        obj.payload.type === "action" &&
        (obj.payload.turn.includes("Chaser") ||
          obj.payload.turn.includes("Keeper")) &&
        this.selectedEntity.holdsQuaffle
      ) {
        for (let i = 0; i <= 220; i++) {
          if (
            !cornerTiles.includes(i) &&
            i !=
              this.getTileId(this.selectedEntity.xPos, this.selectedEntity.yPos)
          )
            this.highlightedTiles.push(i);
        }
        this.gameInstruction.unshift({
          message: this.getPlayerName(this.selectedEntityId) + " darf schießen"
        });
      }
      //WrestQuaffle is possible
      else if (
        obj.payload.type === "action" &&
        obj.payload.turn.includes("Chaser")
      ) {
        this.highlightTile(
          this.snapShot.balls.quaffle.xPos,
          this.snapShot.balls.quaffle.yPos
        );
        this.gameInstruction.unshift({
          message:
            this.getPlayerName(this.selectedEntityId) +
            " darf den Quaffel stehlen"
        });
      }
      //Interference is possible
      else if (obj.payload.type === "fan") {
        // Just for debugging
        // if(document.getElementById("autoSkipFans").checked){
        //     this.skip();
        //     return;
        // }
        if (obj.payload.turn.includes("Goblin")) {
          for (let x = 0; x < 17; x++) {
            for (let y = 0; y < 13; y++) {
              if (
                this.playerIdOnTile(x, y) !== null &&
                !this.playerIdOnTile(x, y).includes(this.mySide)
              )
                this.highlightTile(x, y);
            }
          }
          this.gameInstruction.unshift({
            message: "Ein Goblin kann eingreifen"
          });
        } else if (obj.payload.turn.includes("Elf")) {
          for (x = 0; x < 17; x++) {
            for (y = 0; y < 13; y++) {
              if (this.playerIdOnTile(x, y) !== null) this.highlightTile(x, y);
            }
          }
          this.gameInstruction.unshift({ message: "ein Elf kann eingreifen" });
        } else if (obj.payload.turn.includes("Wombat")) {
          for (x = 0; x < 17; x++) {
            for (y = 0; y < 13; y++) {
              if (
                this.isFreeTile(x, y) &&
                !cornerTiles.includes(this.getTileId(x, y))
              )
                this.highlightTile(x, y);
            }
          }
          this.gameInstruction.unshift({
            message: "ein Wombat kann eingreifen"
          });
        } else {
          for (var i = 0; i <= 220; i++) {
            if (!cornerTiles.includes(i)) this.highlightedTiles.push(i);
          }
          if (obj.payload.turn.includes("Troll"))
            this.gameInstruction.unshift({
              message: "ein Troll kann eingreifen"
            });
          else if (obj.payload.turn.includes("Niffler"))
            this.gameInstruction.unshift({
              message: "ein Niffler kann eingreifen"
            });
        }
      } else if (
        obj.payload.type === "action" &&
        obj.payload.turn.includes("Beater")
      ) {
        this.highlightedTiles = [];
        for (
          let x = Math.max(this.selectedEntity.xPos - 3);
          x <= Math.min(this.selectedEntity.xPos + 3, 16);
          x++
        ) {
          for (
            let y = Math.max(this.selectedEntity.yPos - 3, 0);
            y <= Math.min(this.selectedEntity.yPos + 3, 16);
            y++
          ) {
            if (
              this.isFreePath(
                this.selectedEntity.xPos,
                this.selectedEntity.yPos,
                x,
                y
              ) &&
              !cornerTiles.includes(this.getTileId(x, y))
            ) {
              if (
                this.getTileId(
                  this.selectedEntity.xPos,
                  this.selectedEntity.yPos
                ) != this.getTileId(x)
              )
                this.highlightTile(x, y);
            }
          }
        }
        this.gameInstruction.unshift({
          message:
            this.getPlayerName(this.selectedEntityId) +
            " darf auf die Fresse geben"
        });
      }
      // else if(this.turnType === "removeBan"){
      //     if(this.mySide === "left"){
      //         this.highlightedTiles = this.leftHalfTiles;
      //     }
      //     else{
      //         this.highlightedTiles = this.rightHalfTiles;
      //     }
      //     for(let i = 0; i < this.highlightedTiles.length; i++){
      //          if(goalTiles.includes(this.highlightedTiles[i])) this.highlightedTiles.splice(i, 1);
      //     }
      //     this.gameInstruction.unshift({message: this.getPlayerName(this.selectedEntityId) + " darf wieder mitspielen"});
      // }
      else if (this.turnType === "removeBan") {
        for (x = 0; x < 17; x++) {
          for (y = 0; y < 13; y++) {
            var id = this.getTileId(x, y);
            // if((this.mySide === "left" && this.leftHalfTiles.includes(id)) ||
            //     (this.mySide === "right" && this.rightHalfTiles.includes(id)) &&
            //     !goalTiles.includes(id) && this.isFreeTile(x, y))
            //     this.highlightTiles(x, y);
            if (this.mySide === "left") {
              if (
                x < 8 &&
                !cornerTiles.includes(id) &&
                !goalTiles.includes(id) &&
                this.isFreeTile(x, y) &&
                !centerTiles.includes(id)
              )
                this.highlightTile(x, y);
            } else if (this.mySide === "right") {
              if (
                x > 8 &&
                !cornerTiles.includes(id) &&
                !goalTiles.includes(id) &&
                this.isFreeTile(x, y) &&
                !centerTiles.includes(id)
              )
                this.highlightTile(x, y);
            }
          }
        }
        this.gameInstruction.unshift({
          message:
            this.getPlayerName(this.selectedEntityId) +
            " darf wieder mitspielen"
        });
      }
    },

    /**Use Reconnect message to get up to date */
    handleReconnect: function(obj) {
      this.handleMatchStart(obj.payload.matchStart);
      this.handleSnapshot(obj.payload.snapshot);
      if (obj.next) this.handleNext(obj.payload.next);
    },

    /**Sets the paused variable */
    handlePauseResponse: function(obj) {
      this.paused = obj.payload.pause;
      // not needed since rendering of button is reactive
      // if (this.paused)
      //   document.getElementById("pause-button").innerHTML = "Weiter";
      // else document.getElementById("pause-button").innerHTML = "Pause";
    },
    /**increases displayed score of given team by given amount */
    scorePoints(increment, team) {
      this.snapShot[team].points += increment;
    },
    /**Creates and sends a deltaRequest.
     * Resets variables required for actions.
     */
    deltaRequest: function(
      deltaType,
      xPosOld,
      yPosOld,
      xPosNew,
      yPosNew,
      activeEntity,
      passiveEntity,
      phase,
      leftPoints,
      rightPoints,
      round
    ) {
      this.turnType = null;
      document.getElementById("chance-view").innerHTML = "";
      this.highlightedTiles = [];
      var timestamp = this.makeTimestamp();
      var payload = {
        deltaType: deltaType,
        success: null,
        xPosOld: xPosOld,
        yPosOld: yPosOld,
        xPosNew: xPosNew,
        yPosNew: yPosNew,
        activeEntity: activeEntity,
        passiveEntity: passiveEntity,
        phase: phase,
        leftPoints: leftPoints,
        rightPoints: rightPoints,
        round: round
      };
      var jsonObject = {
        timestamp: timestamp,
        payloadType: "deltaRequest",
        payload: payload
      };
      web.websocket.send(JSON.stringify(jsonObject));
    },
    /**Sends a skip deltaRequest */
    skip: function() {
      if (this.selectedEntityId.includes(this.mySide)) {
        this.deltaRequest(
          "skip",
          null,
          null,
          null,
          null,
          this.selectedEntityId,
          null,
          null,
          null,
          null,
          null
        );
        this.selectedEntityId = null;
      }
    },

    pauseResume: function() {
      var timestamp = this.makeTimestamp();
      var jsonObject = {
        timestamp: timestamp,
        payloadType: "pauseRequest",
        payload: {
          message: ""
        }
      };
      if (this.paused) {
        jsonObject.payloadType = "continueRequest";
      }

      web.websocket.send(JSON.stringify(jsonObject));
    },
    /**finds the playerId of the entity standing in the given tile.
     * Returns null if there is no player on the tile
     */
    playerIdOnTile: function(xPos, yPos) {
      var pLeft = this.snapShot.leftTeam.players;
      var pRight = this.snapShot.rightTeam.players;

      if (
        pLeft.seeker.xPos === xPos &&
        pLeft.seeker.yPos === yPos &&
        !pLeft.seeker.banned
      )
        return "leftSeeker";
      if (
        pLeft.keeper.xPos === xPos &&
        pLeft.keeper.yPos === yPos &&
        !pLeft.keeper.banned
      )
        return "leftKeeper";
      if (
        pLeft.chaser1.xPos === xPos &&
        pLeft.chaser1.yPos === yPos &&
        !pLeft.chaser1.banned
      )
        return "leftChaser1";
      if (
        pLeft.chaser2.xPos === xPos &&
        pLeft.chaser2.yPos === yPos &&
        !pLeft.chaser2.banned
      )
        return "leftChaser2";
      if (
        pLeft.chaser3.xPos === xPos &&
        pLeft.chaser3.yPos === yPos &&
        !pLeft.chaser3.banned
      )
        return "leftChaser3";
      if (
        pLeft.beater1.xPos === xPos &&
        pLeft.beater1.yPos === yPos &&
        !pLeft.beater1.banned
      )
        return "leftBeater1";
      if (
        pLeft.beater2.xPos === xPos &&
        pLeft.beater2.yPos === yPos &&
        !pLeft.beater2.banned
      )
        return "leftBeater2";

      if (
        pRight.seeker.xPos === xPos &&
        pRight.seeker.yPos === yPos &&
        !pRight.seeker.banned
      )
        return "rightSeeker";
      if (
        pRight.keeper.xPos === xPos &&
        pRight.keeper.yPos === yPos &&
        !pRight.keeper.banned
      )
        return "rightKeeper";
      if (
        pRight.chaser1.xPos === xPos &&
        pRight.chaser1.yPos === yPos &&
        !pRight.chaser1.banned
      )
        return "rightChaser1";
      if (
        pRight.chaser2.xPos === xPos &&
        pRight.chaser2.yPos === yPos &&
        !pRight.chaser2.banned
      )
        return "rightChaser2";
      if (
        pRight.chaser3.xPos === xPos &&
        pRight.chaser3.yPos === yPos &&
        !pRight.chaser3.banned
      )
        return "rightChaser3";
      if (
        pRight.beater1.xPos === xPos &&
        pRight.beater1.yPos === yPos &&
        !pRight.beater1.banned
      )
        return "rightBeater1";
      if (
        pRight.beater2.xPos === xPos &&
        pRight.beater2.yPos === yPos &&
        !pRight.beater2.banned
      )
        return "rightBeater2";
      return null;
    },
    /**computes the id of the given tile */
    getTileId: function(xPos, yPos) {
      return yPos * 17 + xPos;
    },
    /**Adds given tile to highlighted tiles. */
    highlightTile: function(xPos, yPos) {
      this.highlightedTiles.push(this.getTileId(xPos, yPos));
    },
    /**returns true if tile is free (for wombat) */
    isFreeTile: function(xPos, yPos) {
      var free = true;
      //Check left team players
      for (let player in this.snapShot.leftTeam.players) {
        if (
          this.snapShot.leftTeam.players[player].xPos == xPos &&
          this.snapShot.leftTeam.players[player].yPos == yPos &&
          !this.snapShot.leftTeam.players[player].banned
        )
          free = false;
      }
      //Check right team players
      for (let player in this.snapShot.rightTeam.players) {
        if (
          this.snapShot.rightTeam.players[player].xPos == xPos &&
          this.snapShot.rightTeam.players[player].yPos == yPos &&
          !this.snapShot.rightTeam.players[player].banned
        )
          free = false;
      }
      //Check balls
      for (let ball in this.snapShot.balls) {
        if (
          this.snapShot.balls[ball].xPos == xPos &&
          this.snapShot.balls[ball].yPos == yPos
        )
          free = false;
      }
      //Check shit
      var cubes = this.snapShot.wombatCubes;
      for (var i = 0; i < cubes.length; i++) {
        if (cubes[i].xPos === xPos && cubes[i].yPos === yPos) free = false;
      }
      return free;
    },

    /**Returns an array of crossed tiles */
    getCrossedTiles: function(xStart, yStart, xDest, yDest) {
      var crossedTiles = [];
      var k = (yDest - yStart) / (xDest - xStart);
      var d = yStart - k * xStart;
      for (let x = xStart; x < xDest; x += 0.1) {
        let y = k * x + d;
        let xr = Math.round(x);
        let yr = Math.round(y);
        if (xr === xStart && yr === yStart) continue;
        else if (xr === xDest && yr === yDest) break;
        else if (!crossedTiles.includes(this.getTileId(xr, yr)))
          crossedTiles.push(this.getTileId(xr, yr));
      }
      for (let x = xStart; x > xDest; x -= 0.1) {
        let y = k * x + d;
        let xr = Math.round(x);
        let yr = Math.round(y);
        if (xr === xStart && yr === yStart) continue;
        else if (xr === xDest && yr === yDest) break;
        else if (!crossedTiles.includes(this.getTileId(xr, yr)))
          crossedTiles.push(this.getTileId(xr, yr));
      }

      if (xDest === xStart) {
        for (let y = yStart + 1; y < yDest; y++) {
          crossedTiles.push(this.getTileId(xDest, y));
        }
        for (let y = yStart - 1; y > yDest; y--) {
          crossedTiles.push(this.getTileId(xDest, y));
        }
      }
      return crossedTiles;
    },
    /**Returns true if the path to the dest tile is free */
    isFreePath: function(xStart, yStart, xDest, yDest) {
      var crossedTiles = this.getCrossedTiles(xStart, yStart, xDest, yDest);
      var free = true;
      for (let i = 0; i < crossedTiles.length; i++) {
        if (
          this.playerIdOnTile(
            crossedTiles[i] % 17,
            (crossedTiles[i] - (crossedTiles[i] % 17)) / 17
          ) !== null
        ) {
          free = false;
        }
      }
      return free;
    },
    /**Returns a time stamp that follows the standard */
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

    getPlayerName: function(playerId) {
      switch (playerId) {
        case "leftSeeker":
          return this.matchStart.leftTeamConfig.players.seeker.name;
        case "leftKeeper":
          return this.matchStart.leftTeamConfig.players.keeper.name;
        case "leftChaser1":
          return this.matchStart.leftTeamConfig.players.chaser1.name;
        case "leftChaser2":
          return this.matchStart.leftTeamConfig.players.chaser2.name;
        case "leftChaser3":
          return this.matchStart.leftTeamConfig.players.chaser3.name;
        case "leftBeater1":
          return this.matchStart.leftTeamConfig.players.beater1.name;
        case "leftBeater2":
          return this.matchStart.leftTeamConfig.players.beater2.name;

        case "rightSeeker":
          return this.matchStart.rightTeamConfig.players.seeker.name;
        case "rightKeeper":
          return this.matchStart.rightTeamConfig.players.keeper.name;
        case "rightChaser1":
          return this.matchStart.rightTeamConfig.players.chaser1.name;
        case "rightChaser2":
          return this.matchStart.rightTeamConfig.players.chaser2.name;
        case "rightChaser3":
          return this.matchStart.rightTeamConfig.players.chaser3.name;
        case "rightBeater1":
          return this.matchStart.rightTeamConfig.players.beater1.name;
        case "rightBeater2":
          return this.matchStart.rightTeamConfig.players.beater2.name;

        default:
          return null;
      }
    }
  }
};
</script>

<style>
* {
  -webkit-user-select: none; /* Chrome all / Safari all */
  -moz-user-select: none; /* Firefox all */
  -ms-user-select: none; /* IE 10+ */
  user-select: none;
}

.prevent-inline {
  display: block;
}

.header {
  position: fixed;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 8%;
  width: 100%;
  background: radial-gradient(#5e3d19, #503315);
  background: radial-gradient(#5a3814, #3f270e);
  z-index: 100;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.19);
  border-bottom: 2px solid #3f270e;
  padding: 0 1rem;
}

#main-menu-panel {
  position: absolute;
  height: 100%;
  width: 5%;
  left: 2%;
}

#pause-panel {
  position: absolute;
  height: 100%;
  width: 5%;
  right: 2%;
  top: 0;
}

#mute-button {
  background: radial-gradient(#bb3434, #802020);
  height: 60%;
  width: 3.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  border: 1px solid #e0a500;
  color: #e0a500;
  border-radius: 5px;
  text-align: center;
  font-size: 2.5vh;
  padding: 0.7rem 1rem;
}

/* #main-menu-button {
    background: radial-gradient(#bb3434, #802020);
    border: 1px solid #e0a500;
    color: #e0a500;
    position: absolute;
    width: 100%;
    top: 10%;
    height: 80%;
    border-radius: 5px;
    min-width: 58px;
    text-align: center;
    font-size: 2.5vh;
    padding: 1.5vh 0.5vh;
} */

#pause-button {
  height: 60%;
  width: 3.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  background: radial-gradient(#5e923f, #406d24);
  border: 1px solid #e0a500;
  color: #e0a500;
  border-radius: 5px;
  text-align: center;
  font-size: 2.5vh;
  padding: 0.7rem 1rem;
}

/* #pause-button {
    background: radial-gradient(#5e923f, #406d24);
    border: 1px solid #e0a500;
    color: #e0a500;
    position: absolute;
    top: 10%;
    height: 80%;
    width: 100%;
    border-radius: 5px;
    min-width: 58px;
    text-align: center;
    font-size: 2.5vh;
    padding: 1.5vh 0.5vh;
} */

#mute-button:hover {
  background: #81623e;
}

#pause-button:hover {
  background: #81623e;
}

.sidebar-left {
  display: static;
  position: fixed;
  top: 8%;
  height: 92%;
  width: 17%;
  color: 583b1b;
  background: radial-gradient(#684521, #583b1b);
  background: radial-gradient(#5a3814, #3f270e);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  z-index: 90;
  min-width: 173px;
}

.sidebar-right {
  display: static;
  position: fixed;
  right: 0%;
  height: 92%;
  top: 8%;
  width: 17%;
  background: radial-gradient(#684521, #583b1b);
  background: radial-gradient(#5a3814, #3f270e);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  z-index: 90;
  min-width: 173px;
}

.info-panel {
  display: block;
  position: absolute;
  text-align: left;
  border: 1px solid #ebd18a;
  background: radial-gradient(#ffffff, #ebd18a);
  -moz-box-shadow: inset 0 0 4px #00000086;
  -webkit-box-shadow: inset 0 0 4px #000000;
  box-shadow: inset 0 0 4px #000000;
  color: #86633c;
  width: 92%;
  left: 4%;
  height: 40%;
  border-radius: 1%;
  min-width: 142px;
  font-size: 2.5vh;
  padding: 1.5vh 0.5vh;
}

.info-text {
  font-size: 1.8vh;
}

.info-panel-button {
  background: radial-gradient(#f0dfb2, #f0dfb2);
  display: auto;
  color: #8d6951;
  font-family: "Alice";
  font-size: 1.8vh;
  border: 1px solid #99735a;
  border-radius: 3px;
  margin: 10px 5px 0 5px;
}

.info-panel-button:hover {
  background: radial-gradient(#fdfdfd, #eee2c3);
  color: #755945;
  border: 1px solid #755945;
}

.info-panel-button:active {
  background: radial-gradient(#fdfdfd, #eee2c3);
  color: #ffffff;
  border: 1px solid #ffffff;
}

.center {
  position: absolute;
  left: 17%;
  top: 8%;
  height: 92%;
  width: 66%;
  padding: 10px;
  text-align: center;
  background: radial-gradient(#e4f5d9, #bbe2a1);
}

#game-grid-panel {
  width: calc(75vh * 17 / 13);
  height: 75vh;
  display: static;
  position: fixed;
  top: 13vh;
  left: calc((100vw - (75vh * 17 / 13)) / 2);
  text-align: center;
  color: white;
  display: grid;
  grid-template-columns: repeat(17, 5.88%);
  grid-template-rows: repeat(13, 7.69%);
}

.normal-separation-line {
  border: none;
  border-top: 1px solid #ebd18a;
  margin: 2vh 0;
}

.inner-separation-line {
  border: none;
  border-top: 1px solid #9b7955;
  margin: 5px 0;
}

.ball {
  z-index: 60;

  pointer-events: none;
}

.ball:hover {
  border: 1px solid #424242;
}

.player {
  z-index: 50;
}

h1 {
  color: transparent;
  text-shadow: 0px 2px 3px rgba(255, 255, 255, 0.5);
  -webkit-background-clip: text;
  -moz-background-clip: text;
  background-clip: text;
}

.hidden-tile {
  background: none;
  pointer-events: none;
}

.gras-tile {
  font-size: 1.2vh;
  padding: 1vh 0;
  color: #ffffff60;
  border: none;
  padding: 0;
  background: none;
}

.gras-tile:hover {
  border: 1px solid #6b6b6b;
}

.corner-tile:hover {
  border: none;
  background: #ffffff4b;
}

.lighter-gras-tile {
  background: radial-gradient(#87b86b, #6da14f);
}

.darker-gras-tile {
  background: radial-gradient(#99cf79, #8acc63);
}

/* .lighter-gras-tile {
    background: radial-gradient(#99cf79, #8acc63);
}

.darker-gras-tile {
    background: radial-gradient(#85b36b, #6ea34f);
} */

.lighter-attack-gras-tile {
  background: radial-gradient(#72a156, #67a344);
}

.darker-attack-gras-tile {
  background: radial-gradient(#638b4b, #4c7932);
}

/* .lighter-attack-gras-tile {
    background: radial-gradient(#8cbe6f, #7fbd5b);
}

.darker-attack-gras-tile {
    background: radial-gradient(#78a161, #608f45);
} */

.lighter-center-gras-tile {
  background: radial-gradient(#72a156, #67a344);
}

.darker-center-gras-tile {
  background: radial-gradient(#638b4b, #4c7932);
}

/* .lighter-center-gras-tile {
    background: radial-gradient(#a3db82, #8fd467);
}

.darker-center-gras-tile {
    background: radial-gradient(#97ca79, #7cb859);
} */

.highlighted-gras-tile {
  background: radial-gradient(#fbfccf00, #fafc8960),
    radial-gradient(#97ca79, #7cb859);
  border: 1px solid #fdff6d;
}

.highlighted-gras-tile:hover {
  background: radial-gradient(#feffc72a, #f4f777e3),
    radial-gradient(#97ca79, #7cb859);
  border: 1px solid #fdff6d;
}

.wombat-cube {
  position: absolute;
  width: calc(5.88% * 0.6);
  height: calc(7.69% * 0.6);
  margin: calc(7.69% * 0.15) calc(5.88% * 0.2);
  border: 1.5px solid #4b2709;
  background: radial-gradient(#97643a, #4b2709);
  border-radius: 3px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.377);
  font-size: 3vh;
  z-index: 50;
  padding-top: 0.65vh;
}

.player-tile {
  position: absolute;
  width: calc(5.88% * 0.9);
  height: calc(7.69% * 0.9);
  margin: calc(7.69% * 0.035) calc(5.88% * 0.05);
  border: 1.5px solid #e0a500;
  border-radius: 1vh;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.377);
  font-size: 3vh;
  z-index: 50;
  padding-top: 0.65vh;
}

.player-knockout {
  opacity: 0.5;
}

.chaser {
  background: url(../resources/chaser.svg);
  position: absolute;
  height: 90%;
  width: 90%;
  top: 5%;
  left: 5%;
  z-index: 53;
  pointer-events: none;
}

.beater {
  background: url(../resources/beater.svg);
  position: absolute;
  height: 90%;
  width: 90%;
  top: 5%;
  left: 5%;
  z-index: 53;
  pointer-events: none;
}

.keeper {
  background: url(../resources/keeper.svg);
  position: absolute;
  height: 90%;
  width: 90%;
  top: 5%;
  left: 5%;
  z-index: 53;
  pointer-events: none;
}

.seeker {
  background: url(../resources/seeker.svg);
  position: absolute;
  height: 90%;
  width: 90%;
  top: 5%;
  left: 5%;
  z-index: 53;
  pointer-events: none;
}

.player-tile:hover {
  border: 1.5px solid #ffffff;
}

.right-team-player {
  background: radial-gradient(#4bb176, #1d8649);
}

.left-team-player {
  background: radial-gradient(#5677be, #1d50be);
}

.goal-post-right-center {
  background: url(../resources/pole-center-ohne.svg);
  height: 7.69%;
  width: calc(5.88% * 2.001);
  position: absolute;
  top: calc(7.69% * 6);
  right: calc(5.88% * 2);
  z-index: 40;
  pointer-events: none;
  background-repeat: no-repeat;
  transform: perspective(130px) rotateY(-45deg);
}

.goal-post-right-top {
  background: url(../resources/pole-center-ohne.svg);
  height: 7.69%;
  width: calc(5.88% * 2.001);
  position: absolute;
  top: calc(7.69% * 4 + 1.3%);
  right: calc(5.88% * 2);
  z-index: 40;
  pointer-events: none;
  background-repeat: no-repeat;
  transform: skewY(-15deg) perspective(130px) rotateY(-45deg);
}

.goal-post-right-bottom {
  background: url(../resources/pole-center-ohne.svg);
  height: 7.69%;
  width: calc(5.88% * 2.001);
  position: absolute;
  top: calc(7.69% * 8 - 1.3%);
  right: calc(5.88% * 2);
  z-index: 40;
  pointer-events: none;
  background-repeat: no-repeat;
  transform: skewY(15deg) perspective(130px) rotateY(-45deg);
}

.goal-post-left-top {
  background: url(../resources/pole-center-ohne.svg);
  height: 7.69%;
  width: calc(5.88% * 2.001);
  position: absolute;
  top: calc(7.69% * 4 + 1.3%);
  left: calc(5.88% * 2);
  z-index: 40;
  pointer-events: none;
  background-repeat: no-repeat;
  transform: skewY(15deg) perspective(130px) rotateZ(180deg) rotateY(-45deg);
}

.goal-post-left-center {
  background: url(../resources/pole-center-ohne.svg);
  height: 7.69%;
  width: calc(5.88% * 2.001);
  position: absolute;
  top: calc(7.69% * 6);
  left: calc(5.88% * 2);
  z-index: 40;
  pointer-events: none;
  background-repeat: no-repeat;
  transform: perspective(130px) rotateZ(180deg) rotateY(-45deg);
}

.goal-post-left-bottom {
  background: url(../resources/pole-center-ohne.svg);
  height: 7.69%;
  width: calc(5.88% * 2.001);
  position: absolute;
  top: calc(7.69% * 8 - 1.4%);
  left: calc(5.88% * 2);
  z-index: 40;
  pointer-events: none;
  background-repeat: no-repeat;
  transform: skewY(-15deg) perspective(130px) rotateZ(180deg) rotateY(-45deg);
}

.panel-title {
  color: #583b1b;
  margin: 0;
  padding: 0;
  font-size: 2vh;
  text-align: center;
}

.snitch {
  background: url(../resources/snitch.svg);
  height: 7.69%;
  width: 5.88%;
  position: absolute;
  z-index: 63;
  pointer-events: none;
}

.snitch:hover {
  border: 1px solid #dddddd;
}

.quaffle {
  background: url(../resources/quaffle.svg);
  height: 7.69%;
  width: 5.88%;
  background-size: 70%;
  background-repeat: no-repeat;
  background-position: center;
  position: absolute;
  z-index: 60;
  pointer-events: none;
}

.quaffle:hover {
  border: 1px solid #dddddd;
}

.bludger1 {
  background: url(../resources/bludger.svg);
  height: 7.69%;
  width: 5.88%;
  background-size: 50%;
  background-repeat: no-repeat;
  background-position: center;
  position: absolute;
  z-index: 61;
  pointer-events: none;
}

.bludger1:hover {
  border: 1px solid #dddddd;
}

.bludger2 {
  background: url(../resources/bludger.svg);
  height: 7.69%;
  width: 5.88%;
  background-size: 50%;
  background-repeat: no-repeat;
  background-position: center;
  position: absolute;
  z-index: 62;
  pointer-events: none;
}

.bludger2:hover {
  border: 1px solid #dddddd;
}

.game-balls-move {
  transition: transform 1s;
}

.game-players-move {
  transition: transform 0.3s;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.corner-tile {
  display: hidden;
  pointer-events: none;
  text-indent: 100%;
  white-space: nowrap;
  overflow: hidden;
}

#player-info-panel {
  top: 2%;
  height: 50%;
}

#game-instructions-panel {
  top: 2%;
  height: 50%;
}

.banned-players-panel {
  top: 54%;
  height: 34%;
}

#test-functions-panel {
  top: 44%;
}

.skip-button-container {
  display: block;
  position: absolute;
  text-align: center;
  border: 1px solid #ebd18a;
  background: radial-gradient(#ffffff, #ebd18a);
  -moz-box-shadow: inset 0 0 4px #00000086;
  -webkit-box-shadow: inset 0 0 4px #000000;
  box-shadow: inset 0 0 4px #000000;
  color: #86633c;
  border-radius: 5px;
  min-height: 8%;
  min-width: 142px;
  padding: 2vh;
  font-size: 2.5vh;
  padding: 1.5vh 0.5vh;
  width: 92%;
  left: 4%;
  bottom: 2%;
}

.skip-button {
  background: radial-gradient(#bb3434, #802020);
  border: 1.5px solid #e0a500;
  color: #e0a500;
  position: absolute;
  width: 80%;
  left: 10%;
  font-family: "Alice";
  height: 60%;
  top: 20%;
  border-radius: 5px;
  text-align: center;
  font-size: 2.5vh;
  box-shadow: 2px 2px 4px 0 rgba(0, 0, 0, 0.4), 0 2px 3px 0 rgba(0, 0, 0, 0.19);
}

.skip-button:hover {
  background: #81623e;
  border: 1.5px solid #e0a500;
  color: #e0a500;
}

.skip-button:active {
  background: #ac8d6b;
  border: 1.5px solid #e0a500;
  color: #e0a500;
}
</style>
