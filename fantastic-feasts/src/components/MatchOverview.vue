<template>
    <div class="main-content-window-overview">
            <h3 class="config-submenu-title">Partiekonfigurationen</h3>
            <div class="team-container">
                <div class="overview-list">
                    <!-- List of selectable configurations -->
                    <transition-group name="slide">
                        <li v-for="(match, index) in configs.matchConfigs" :key="match.name" @click="selectListItem(index)" class="overview-list-item" :class="{ 'selected-list-item': index ===  selectedItem}">{{ match.name }}
                    </li>
                    </transition-group>
                    
                </div>
                <!-- The buttons on the right -->
                <div class="overview-options">
                    <button @click="editConfig(selectedItem)" class="app__small-button overview-options-button">Bearbeiten</button>
                    <button @click="downloadJSON()" class="app__small-button overview-options-button"><a id="downloadAnchorElem" style="display:none"></a>Download</button>
                    <button @click="deleteConfig(selectedItem)" class="app__small-button overview-options-button">Löschen</button>
                </div>
            </div>
            
            <!-- The buttons at the bottom -->
            <div class="overview__general-options">
                <hr class="team-config__content-container-hr">
                <label for="file-import" class="app__small-button app__import-label">Importieren</label>
                <!-- <button @click="readFile()" class="app__small-button team-overview__general-options-button">Importieren</button>
                <input type="file" id="importChooser" @change="readFile()"/> -->
                <input type="file" id="file-import" @change="readFile()"/>
                <button @click="createMatchConfig()" class="app__small-button overview__general-options-button">Partiekonfiguration erstellen</button>
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
            test: {
                "properties": {
                    "test": {"type": "string"}
                }
            },
            testvar: {test: "Hi"},
            selectedItem: 0,
            validate: undefined,
            matchConfigSchema: {
                "properties": {
                    "maxRounds": {"type": "number"},
                    "timings": {
                        "properties": {
                            "teamFormationTimeout": {"type": "number"},
                            "playerTurnTimeout": {"type": "number"},
                            "fanTurnTimeout": {"type": "number"},
                            "minPlayerPhaseAnimationDuration": {"type": "number"},
                            "minFanPhaseAnimationDuration": {"type": "number"},
                            "minBallPhaseAnimationDuration": {"type": "number"}
                        }
                        
                    },
                    "probabilities": {
                        "required": ["throwSuccess", "knockOut", "foolAway", "catchSnitch", "catchQuaffle", "wrestQuaffle", "extraMove", "foulDetection", "fanFoulDetection"],
                        "properties": {
                            "throwSuccess": {"type": "number"},
                            "knockOut": {"type": "number"},
                            "foolAway": {"type": "number"},
                            "catchSnitch": {"type": "number"},
                            "catchQuaffle": {"type": "number"},
                            "wrestQuaffle": {"type": "number"},
                            "extraMove": {
                                "properties": {
                                    "tinderblast": {"type": "number"},
                                    "cleansweep11": {"type": "number"},
                                    "comet260": {"type": "number"},
                                    "nimbus2001": {"type": "number"},
                                    "firebolt": {"type": "number"}
                                },
                                "required": ["tinderblast", "cleansweep11", "comet260", "nimbus2001", "firebolt"]
                            },
                            "foulDetection": {
                                "properties": {
                                    "flacking": {"type": "number"},
                                    "haversacking": {"type": "number"},
                                    "stooging": {"type": "number"},
                                    "blatching": {"type": "number"},
                                    "snitchnip": {"type": "number"}
                                },
                                "required": ["flacking", "haversacking", "stooging", "blatching", "snitchnip"]
                            },
                            "fanFoulDetection": {
                                "properties": {
                                    "elfTeleportation": {"type": "number"},
                                    "goblinShock": {"type": "number"},
                                    "trollRoar": {"type": "number"},
                                    "snitchSnatch": {"type": "number"}
                                },
                                "required": ["elfTeleportation", "goblinShock", "trollRoar", "snitchSnatch"]
                            }               
                        }           
                    }
                },
                "required": ["maxRounds", "timings", "probabilites"]
            }  
        }   
    },
    methods: {
        //Downloads the configuration as a json file, writing it to the hard drive
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
        //Removes selected configuration from the cache
        deleteConfig(index) {
            this.configs.matchConfigs.splice(index, 1);
            const parsed = JSON.stringify(this.configs);
            localStorage.setItem('configs', parsed);
        },
        //Switches to the MatchConfigurator component and loads the selected configuration
        editConfig(index) {
            this.state.index = index;
            this.state.isNew = false;
            this.state.currentState = 'inMatchConfig';
        },
        //Sets up a new configuration and switches to the MatchConfigurator component. All values are 
        //initialized with 0.
        createMatchConfig() {
            var newConfig = {   
                maxRounds: 200,
                timings: {
                    teamFormationTimeout: 30000,
                    playerTurnTimeout: 20000,
                    fanTurnTimeout: 20000,
                    minPlayerPhaseAnimationDuration: 3000,
                    minFanPhaseAnimationDuration: 3000,
                    minBallPhaseAnimationDuration: 3000
                },
                probabilities: {
                    throwSuccess: 0.5,
                    knockOut: 0.33,
                    foolAway: 0.33,
                    catchSnitch: 0.1,
                    catchQuaffle: 0.2,
                    wrestQuaffle: 0.2,
                    extraMove: {
                        thinderblast: 0.5,
                        cleansweep11: 0.4,
                        comet260: 0.3,
                        nimbus2001: 0.2,
                        firebolt: 0.1
                    },
                    foulDetection: {
                        flacking: 0.33,
                        haversacking: 0.33,
                        stooging: 0.33,
                        blatching: 0.33,
                        snitchnip: 0.33
                    },
                    fanFoulDetection: {
                        elfTeleportation: 0.33,
                        goblinShock: 0.33,
                        trollRoar: 0.33,
                        snitchSnatch: 0.33
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
            localStorage.setItem('configs', parsed);
        },
        //Reads a json file on the hard drive and conerts it to a javascript object
        readFile(){
            var files = document.getElementById("file-import").files;
            var file = files[0];
            var name = file.name.split('.')[0];
            //Check of the selected file is a single json file
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
                    var valid = true;
                    // this functionality is not working yet!
                    // var valid = vm.validate(data);
                    if(valid) {
                        alert('Valides JSON-Schema');
                        var newEntry = {
                            name: name,
                            config: data
                        };
                        vm.configs.matchConfigs.unshift(newEntry);
                        vm.storeConfigs();
                    } else {
                        alert('Kein valides JSON-Schema.');
                    }   
                }
            }
        }
    },
    mounted() {
        this.validate = ajv.compile(this.matchConfigSchema);
    }
}
    
</script>

<style scoped>


#file-import {
    display: none;
}

#importChooser {
    display: none;
}

</style>
