<template>
    <div>
        <h1 class="subtitle">Team auswählen</h1>
        <div class="text-content-container">
            <div class="team-overview__team-list" id="team-selection__team-list">
                <div v-for="(team, index) in configs.teamConfigs" :key="team.id" :class="{ selectedTeam: index ===  selectedTeam}" class="team-overview__team-preview">
                    <li @click="selectedTeam = index" class="team-overview__team-preview-item">{{ team.name }}</li>
                </div>
            </div>
            <app-team-selection :configs=configs :teamConfig="configs.teamConfigs[selectedTeam]"></app-team-selection> 
            <div class="main-menu__button-container">
                <button @click="discardChanges()" class="main-menu__small-button">Importieren</button>
            </div>   
        </div>
        
        <div class="main-menu__button-container footer-bar">
            <hr>
            <button @click="game.currentState = 'inMenu'" class="main-menu__button">Zurück zum Menü</button>
        </div>
    </div>
</template>

<script>
import TeamSelection from './TeamSelection.vue';
import MatchSelection from './MatchSelection.vue';

export default {
    data() {
        return {
            selectedTeam: 0
        }
    },
    methods:{
        readFile : function(){
            var files = document.getElementById("fileChooser").files;
            var file = files[0];
            if(files.length !== 1){
                alert("Please choose one file only");
            }
            else if(file.type !== "application/json"){
                alert("Please choose a json-file");
            }
            else{
                var reader = new FileReader();
                reader.readAsText(file);
                var data;
                reader.onload = function(){
                    data = JSON.parse(reader.result);
                    alert(data.name);
                }
                
                
            }
        }
    },
    props: ['game', 'configs'],
    components: {
        'app-team-selection': TeamSelection,
        'app-match-selection': MatchSelection
    }
}
</script>

<style>

#team-selection__team-list {
    display: inline-block;
    margin-top: 40px;
    width: 20%;
}

.selectedTeam {
    background: #ddc78a;
    border-radius: 3px;
    color: #5a4222;
    
}

</style>
