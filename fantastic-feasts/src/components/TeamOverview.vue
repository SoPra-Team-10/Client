<template>
    <div class="main-content-window-overview">
            <h3 class="config-submenu-title">Teams</h3>
            <div class="team-container">
                <div class="overview-list">
                    <!-- List of selectable configurations -->
                    <transition-group name="slide">
                        <li v-for="(team, index) in configs.teamConfigs" :key="team.name + team.motto + team.players.chaser1.broom" @click="selectListItem(index)" class="overview-list-item" :class="{ 'selected-list-item': index ===  selectedItem}">{{ team.name }}
                        </li>
                    </transition-group>
                    
                </div>
                <!-- Buttons on the right -->
                <div class="overview-options">
                    <button @click="editTeamConfig(selectedItem)" class="app__small-button overview-options-button">Bearbeiten</button>
                    <button @click="downloadJSON()" class="app__small-button overview-options-button"><a id="downloadAnchorElem" style="display:none"></a>Download</button>
                    <button @click="deleteTeamConfig(selectedItem)" class="app__small-button overview-options-button">Löschen</button>
                </div>
            </div>
            
            <!-- Buttons at the bottom -->
            <div class="overview__general-options">
                <hr class="team-config__content-container-hr">
                <label for="file-import" class="app__small-button app__import-label">Importieren</label>
                <!-- <button @click="readFile()" class="app__small-button team-overview__general-options-button">Importieren</button>
                <input type="file" id="importChooser" @change="readFile()"/> -->
                <input type="file" id="file-import" @change="readFile()"/>
                <button @click="createTeamConfig()" class="app__small-button overview__general-options-button">Team erstellen</button>
            </div>
    </div>
</template>

<script>
var Ajv = require('ajv');
var ajv = new Ajv();

export default {
    props: ['configs', 'state'],
    data() {
        return {
            selectedItem: 0,
            teamConfigSchema: {
                "type": "object",
                "properties": {
                    "name": {"type": "string"},
                    "motto": {"type": "string"},
                    "colors": {
                        "properties": {
                            "primary": {"type": "string"},
                            "secondary": {"type": "string"}
                        },
                        "required": ["primary", "secondary"]
                    },
                    "image": {"type": "string"},
                    "fans": {
                        "properties": {
                            "goblins": {"type": "number"},
                            "trolls": {"type": "number"},
                            "elves": {"type": "number"},
                            "nifflers": {"type": "number"}
                        },
                        "required": ["goblins", "trolls", "elves", "nifflers"]
                    },
                    "players": {
                        "properties": {
                            "seeker": {
                                "properties": {
                                    "name": {"type": "string"},
                                    "broom": {"type": "string"},
                                    "sex": {"type": "string"}
                                },
                                "required": ["name", "broom", "sex"]
                            },
                            "keeper": {
                                "properties": {
                                "name": {"type": "string"},
                                "broom": {"type": "string"},
                                "sex": {"type": "string"}
                                },
                                "required": ["name", "broom", "sex"]
                            },
                            "chaser1": {
                                "properties": {
                                    "name": {"type": "string"},
                                    "broom": {"type": "string"},
                                    "sex": {"type": "string"}
                                },
                                "required": ["name", "broom", "sex"]
                            },
                            "chaser2": {
                                "properties": {
                                    "name": {"type": "string"},
                                    "broom": {"type": "string"},
                                    "sex": {"type": "string"}
                                },
                                "required": ["name", "broom", "sex"]
                            },
                            "chaser3": {
                                "properties": {
                                    "name": {"type": "string"},
                                    "broom": {"type": "string"},
                                    "sex": {"type": "string"}
                                },
                                "required": ["name", "broom", "sex"]
                            },
                            "beater1": {
                                "properties": {
                                    "name": {"type": "string"},
                                    "broom": {"type": "string"},
                                    "sex": {"type": "string"}
                                },
                                "required": ["name", "broom", "sex"]
                            },
                            "beater2": {
                                "properties": {
                                    "name": {"type": "string"},
                                    "broom": {"type": "string"},
                                    "sex": {"type": "string"}
                                },
                                "required": ["name", "broom", "sex"]
                            }
                        },
                        "required": ["seeker", "keeper", "chaser1", "chaser2", "chaser3", "beater1", "beater2"]
                    }
                },
                "required": ["name", "motto", "colors", "fans", "players"]
            }
        }   
    },
    methods: {
        //Downloads the json file from the cache, writing it to the hard drive
        downloadJSON() {
            var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.configs.teamConfigs[this.selectedItem]));
            var downloadAnchorNode = document.createElement('a');
            downloadAnchorNode.setAttribute("href",     dataStr);
            downloadAnchorNode.setAttribute("download", this.configs.teamConfigs[this.selectedItem].name.toLowerCase() + ".json");
            document.body.appendChild(downloadAnchorNode); // required for firefox
            downloadAnchorNode.click();
            downloadAnchorNode.remove();
        },
        selectListItem(index) {
            this.selectedItem = index;
        },
        //Removes the object from the cache
        deleteTeamConfig(index) {
            this.configs.teamConfigs.splice(index, 1);
            const parsed = JSON.stringify(this.configs);
            localStorage.setItem('configs', parsed);
        },
        //Opens the TeamConfiguration component and loads the selected configuration
        editTeamConfig(index) {
            this.state.index = index;
            this.state.isNew = false;
            this.state.currentState = 'inTeamConfig';
        },
        //sets up a new team-configuration object and switches to the TeamConfiguration component
        createTeamConfig() {
            var newConfig = {   
                name: 'Name',
                motto: 'Motto',
                colors: {
                    primary: 'bb3434',
                    secondary: 'f8c22d'
                },
                image: '',
                fans: {
                    goblins: 3,
                    trolls: 2,
                    elves: 1,
                    nifflers: 1,
                    wombats: 0,
                },
                players: {
                    seeker: {
                        name: 'Luna',
                        broom: 'firebolt',
                        sex: 'f'
                    },
                    keeper: {
                        name: 'Tom',
                        broom: 'nimbus2001',
                        sex: 'm'
                    },
                    chaser1: {
                        name: 'Arthur',
                        broom: 'comet260',
                        sex: 'm'
                    },
                    chaser2: {
                        name: 'Rita',
                        broom: 'cleansweep11',
                        sex: 'f'
                    },
                    chaser3: {
                        name: 'Fleur',
                        broom: 'firebolt',
                        sex: 'f'
                    },
                    beater1: {
                        name: 'Mafalda',
                        broom: 'tinderblast',
                        sex: 'f'
                    },
                    beater2: {
                        name: 'Phineus',
                        broom: 'tinderblast',
                        sex: 'm'
                    }
                }   
            }
            this.configs.teamConfigs.unshift(newConfig);
            this.state.index = 0;
            this.state.isNew = true;
            this.state.currentState = 'inTeamConfig';
        },
        //Reads a json file on the hard drive and converts it into an javascript object
        readFile(){
            var files = document.getElementById("file-import").files;
            var file = files[0];
            //check if the selected file is a single json file
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
                var vm = this;
                //The reading process is asynchron
                reader.onload = function(){
                    data = JSON.parse(reader.result);
                    vm.validate = ajv.compile(vm.teamConfigSchema);
                    var valid = vm.validate(data);
                    if(valid) {
                        alert('Valides JSON-Schema');
                        vm.configs.teamConfigs.unshift(data);
                        vm.storeConfigs();
                    } else {
                        alert('Kein valides JSON-Schema.');
                    }  
                }
            }
        },
        
        storeConfigs() {
            const parsed = JSON.stringify(this.configs);
            localStorage.setItem('configs', parsed);
        }
    }
}
    
</script>

<style>


#file-import {
    display: none;
}

.selected {
    background: #d3c9b1;
}

#importChooser {
    display: none;
}


.team-container {
    display: block;
    padding: 0 10%;
}

.team-config__content-container-hr {
    border: none;
    border-top: 1px solid #d1cb94;
}


    .slide-enter {
        opacity: 0;
        /*transform: translateY(20px);*/
    }

    .slide-enter-active {
        animation: slide-in 1s ease-out forwards;
        transition: opacity 1s;
    }

    .slide-leave {

    }

    .slide-leave-active {
        animation: slide-out 1s ease-out forwards;
        transition: opacity 1s;
        opacity: 0;
        position: absolute;
    }

    .slide-move {
        transition: transform 1s;
    }

    @keyframes slide-in {
        from {
            transform: translateY(20px);
        }
        to {
            transform: translateY(0);
        }
    }

    @keyframes slide-out {
        from {
            transform: translateY(0);
        }
        to {
            transform: translateY(20px);
        }
    }


</style>
