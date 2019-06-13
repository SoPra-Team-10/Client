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
          >
            {{ team.name }}
          </li>
        </div>
        <button class="app__small-button">Importieren</button>
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
      >
        Zurück zum Menü
      </button>
    </div>
  </section>
</template>

<script>
import TeamSelection from "../components/configurator/TeamSelection.vue";

export default {
  components: {
    "app-team-selection": TeamSelection
  },
  props: ["game", "configs"],
  methods: {
    readFile: function() {
      var files = document.getElementById("fileChooser").files;
      var file = files[0];
      if (files.length !== 1) {
        alert("Please choose one file only");
      } else if (file.type !== "application/json") {
        alert("Please choose a json-file");
      } else {
        var reader = new FileReader();
        reader.readAsText(file);
        var data;
        reader.onload = function() {
          data = JSON.parse(reader.result);
          alert(data.name);
        };
      }
    },
    selectTeam(index) {
      this.configs.selectedTeam = index;
      console.log(this.configs.selectedTeam);
      const parsed = JSON.stringify(this.configs);
      localStorage.setItem("configs", parsed);
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
