<template>
    <section>
        <!-- <h2>Team Konfigurator</h2> -->
        <div class="team-config__content-container">
            <h3>Partiekonfigurationen</h3>
            <div class="team-container">
                <div class="team-overview__team-list">
                    <div v-for="(match, index) in configs.matchConfigs" :key="match.id" :class="{ selected: index ===  selectedItem}" class="team-overview__team-preview">
                        <li @click="selectListItem(index)" class="team-overview__team-preview-item">{{ match.name }}</li>
                    </div>
                </div>
                <div class="team-overview__team-options">
                    <button @click="editConfig(selectedItem)" class="main-menu__small-button team-overview__team-options-button">Bearbeiten</button>
                    <button @click="downloadJSON()" class="main-menu__small-button team-overview__team-options-button"><a id="downloadAnchorElem" style="display:none"></a>Download</button>
                    <button @click="deleteConfig(selectedItem)" class="main-menu__small-button team-overview__team-options-button">Löschen</button>
                </div>
            </div>
            <hr class="team-config__content-container-hr">
            <div class="team-overview__general-options">
                <label for="file-import" class="main-menu__small-button team-overview__general-options-button">Importieren</label>
                <!-- <button @click="readFile()" class="main-menu__small-button team-overview__general-options-button">Importieren</button>
                <input type="file" id="importChooser" @change="readFile()"/> -->
                <input type="file" id="file-import" @change="readFile()"/>
                <button @click="createMatchConfig()" class="main-menu__small-button team-overview__general-options-button">Partiekonfiguration erstellen</button>
            </div>
            
        </div>
    </section>
</template>

<script>
export default {
    props: ['configs', 'state'],
    data() {
        return {
            selectedItem: 0
        }   
    },
    methods: {
        downloadJSON() {
            var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.configs.matchConfigs[this.selectedItem].config));
            var downloadAnchorNode = document.createElement('a');
            downloadAnchorNode.setAttribute("href",     dataStr);
            downloadAnchorNode.setAttribute("download", this.configs.matchConfigs[this.selectedItem].name.toLowerCase() + ".json");
            document.body.appendChild(downloadAnchorNode); // required for firefox
            downloadAnchorNode.click();
            downloadAnchorNode.remove();
        },
        selectListItem(index) {
            this.selectedItem = index;
        },
        deleteConfig(index) {
            this.configs.matchConfigs.splice(index, 1);
            const parsed = JSON.stringify(this.configs);
            localStorage.setItem('configs', parsed);
        },
        editConfig(index) {
            console.log(index);
            console.log(this.configs.matchConfigs[index]);
            this.state.index = index;
            this.state.isNew = false;
            this.state.currentState = 'inMatchConfig';
        },
        createMatchConfig() {
            var newConfig = {   
                maxRounds: 0,
                timeouts: {
                    playerTurnTimeout: 0,
                    fanTurnTimeout: 0,
                    playerPhaseTime: 0,
                    fanPhaseTime: 0,
                    ballPhaseTime: 0
                },
                probabilities: {
                    goal: 0.0,
                    throwSuccess: 0.0,
                    knockOut: 0.0,
                    foolAway: 0.0,
                    catchSnitch: 0.0,
                    catchQuaffle: 0.0,
                    wrestQuaffle: 0.0,
                    extraMove: {
                        thinderblast: 0.0,
                        cleansweep11: 0.0,
                        comet260: 0.0,
                        nimbus2001: 0.0,
                        firebolt: 0.0
                    },
                    foulDetection: {
                        flacking: 0.0,
                        haversacking: 0.0,
                        stooging: 0.0,
                        blatching: 0.0,
                        snitchnip: 0.0
                    },
                    fanFoulDetection: {
                        elfTeleportation: 0.0,
                        goblinShock: 0.0,
                        trollRoar: 0.0,
                        snitchSnatch: 0.0
                    }
                }   
            }
            var newEntry = {
                name: 'new_match_config',
                config: newConfig
            }
            this.configs.matchConfigs.unshift(newEntry);
            this.state.index = 0;
            this.state.isNew = true;
            this.state.currentState = 'inMatchConfig';
        },
        storeConfigs() {
            const parsed = JSON.stringify(this.configs);
            console.log(parsed);
            localStorage.setItem('configs', parsed);
        },
        readFile(){
            var files = document.getElementById("file-import").files;
            var file = files[0];
            var name = file.name;
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
                var my_vue = this;
                reader.onload = function(){
                    data = JSON.parse(reader.result);
                    console.log(data);
                    alert(name);
                    var newEntry = {
                        name: name,
                        config: data
                    };
                    console.log(newEntry);
                    my_vue.configs.matchConfigs.unshift(newEntry);
                    my_vue.storeConfigs();
                }
            }
        }
    }
}
    
</script>

<style scoped>
.team-overview__team-preview-item {
    list-style: none;
    text-align: left;
}

#file-import {
    display: none;
}

label.main-menu__small-button {
    height: 24px;
    display: inline-block;
    vertical-align: center;
    text-align: bottom; 
    padding: 1px 5px 3px 5px;
}

.selected {
    background: #d3c9b1;
}

#importChooser {
    display: none;
}

.team-overview__team-preview-item:hover,
.team-overview__team-preview-item:focus {
    background: #e0d9c7;
}
.team-overview__team-preview-item.active {
    background: #d3c9b1;
}

.team-overview__team-preview li.active {
    background: #d3c9b1;
}

.team-overview__team-options {
    display: inline-block;
    width: 40%;
}

.team-overview__team-list {
    vertical-align: top;
    display: inline-block;
    width: 60%;
}

.team-overview__general-options-button {
    display: inline-block;
    margin: 0 10px;
}

.team-overview__team-options-button {
    text-align: center;
    display: auto;
    width: 60%;
    margin: 10px 10px;
}

.team-container {
    vertical-align: top;
    display: block;
    padding: 0 10%;
}

.team-config__content-container-hr {
    border: none;
    border-top: 1px solid #d1cb94;
}
</style>
