<template>
  <section>
    <h1 class="app__header">Team auswählen</h1>
    <div class="app__content">
      <div id="team-selection__team-list" class="team-overview__team-list">
        <div
          v-for="(team, index) in configs.teamConfigs"
          :key="team.name + team.motto"
          :class="[index === configs.selectedTeam ? 'selected-team' : '']"
          class="team-overview__team-preview"
        >
          <li
            class="team-overview__team-preview-item"
            @click="selectTeam(index)"
            @mouseenter="hoverSound()"
            @mousedown="clickSound()"
          >
            {{ team.name }}
          </li>
        </div>
        <br />
        <label
          for="file-import"
          class="app__small-button app__import-label"
          @mouseenter="hoverSound()"
          @mousedown="clickSound()"
          >Importieren</label
        >
        <!-- <button @click="readFile()" class="app__small-button team-overview__general-options-button">Importieren</button>
      <input type="file" id="importChooser" @change="readFile()"/>-->
        <input id="file-import" type="file" @change="readFile()" />
      </div>
      <app-team-selection
        v-if="configs.selectedTeam != undefined"
        :configs="configs"
        :team-config="configs.teamConfigs[configs.selectedTeam]"
      ></app-team-selection>
      <!-- <div class="app__large-button-container">
                function for import is yet to be implemented!!
                <button class="app__small-button">Importieren</button>
            </div>    -->
    </div>
    <div class="app__footer">
      <hr class="app__footer-separation-line" />
      <button
        class="app__large-button app__footer-button"
        @click="game.currentState = 'inMenu'"
        @mouseenter="hoverSound()"
        @mousedown="clickSound()"
      >
        Zurück zum Menü
      </button>
    </div>
  </section>
</template>

<script>
import TeamSelection from "../components/configurator/TeamSelection.vue";
import { clickSound, hoverSound } from "../util/sounds";

export default {
  components: {
    "app-team-selection": TeamSelection
  },
  props: {
    game: {
      type: Object,
      required: true
    },
    configs: {
      type: Object,
      required: true
    }
  },
  methods: {
    // reads a file from the filesystem of the user and stores valid files as object in app store
    readFile() {
      var files = document.getElementById("file-import").files;
      var file = files[0];
      //check if the selected file is a single json file
      if (files.length !== 1) {
        alert("Please choose one file only");
      } else if (file.type !== "application/json") {
        alert("Please choose a json-file");
      } else {
        var reader = new FileReader();
        reader.readAsText(file);
        var data;
        var vm = this;
        //The reading process is asynchron
        reader.onload = function() {
          data = JSON.parse(reader.result);
          //vm.validate = ajv.compile(vm.teamConfigSchema);
          var valid = true;
          if (valid) {
            alert("Valides JSON-Schema");
            vm.configs.teamConfigs.unshift(data);
            vm.storeConfigs();
          } else {
            alert("Kein valides JSON-Schema.");
          }
        };
      }
    },
    // user can select one of the listed teams
    selectTeam(index) {
      this.configs.selectedTeam = index;
      //console.log(this.configs.selectedTeam);
      const parsed = JSON.stringify(this.configs);
      localStorage.setItem("configs", parsed);
    },
    storeConfigs() {
      const parsed = JSON.stringify(this.configs);
      localStorage.setItem("configs", parsed);
    },
    hoverSound() {
      if (!this.game.muted) hoverSound();
    },
    clickSound() {
      if (!this.game.muted) clickSound();
    }
  }
};
</script>

<style>
#team-selection__team-list {
  position: absolute;
  width: 25%;
  left: 5%;
  height: 80%;
  top: 12%;
}

.selected-team {
  background: #ddc78a;
  border-radius: 3px;
  color: #5a4222;
}
</style>
