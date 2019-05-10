<template>
    <!-- The main area that includes the configuration options -->
    <div class="main-content-window-editor" id="team-configurator">
        <!-- <h2>Team Konfigurator</h2> -->
             <h3 class="team-config-section-title">Team</h3>
            <label class="team-config__team-label" for="team-name">Name</label>
            <input
                type="text"
                id="team-name"
                maxlength="40"
                class="team-config__team-name-input"
                v-model.lazy="teamConfig.name">
            <label class="team-config__team-label" for="team-motto">Motto</label>
            <input
                type="text"
                id="team-motto"
                maxlength="80"
                class="team-config__team-motto-input"
                v-model.lazy="teamConfig.motto">
            <br>
            <label class="team-config__team-label" :style="{color: '#' + teamConfig.colors.primary}" for="team-color-primary">Hauptfarbe</label>
            <input
                type="text"
                id="team-color-primary"
                maxlength="6"
                class="team-config__team-color-input"
                v-model.lazy="teamConfig.colors.primary">
            <label class="team-config__team-label" :style="{color: '#' + teamConfig.colors.secondary}" for="team-color-secondary">Zweitfarbe</label>
            <input
                type="text"
                id="team-color-secondary"
                maxlength="6"
                class="team-config__team-color-input"
                v-model.lazy="teamConfig.colors.secondary">
            
            <label class="team-config__team-label" for="team-color-secondary">Logo</label>
            <input type="file" id="image-import" @change="encodeImageFileAsURL()" />
            <canvas id="logo-canvas"></canvas>

            <h3 class="team-config-section-title">Spieler</h3>
            <h4 class="table-header"></h4>
            <h4 class="table-header">Name</h4>
            <h4 class="table-header">Besen <span :class="[{valid: broomsAreValid},{invalid: !broomsAreValid}]" id="validation-span">{{ broomValidator }}</span></h4>
            <h4 class="table-header">Geschlecht <span :class="[{valid: sexesAreValid},{invalid: !sexesAreValid}]" id="validation-span">{{ sexValidator }}</span></h4>
            <div v-for="(player, index) in teamConfig.players" :key="index +player.sex+player.broom" class="team-config__player-selection">
                <h4 class="player-type-label">{{ mapRole(index) }}</h4>
                <!-- <label 
                    for="player-name"
                    class="team-config__player-label"
                    >Name</label> -->
                <div class="team-config__input-wrapping">
                    <input
                    type="text"
                    maxlength="30"
                    id="player-name"
                    class="team-config__player-name-input"
                    v-model.lazy="player.name">
                </div>
                
                <!-- <label 
                    for="player-broom"
                    class="team-config__player-label">
                    Besen</label> -->
                <div class="team-config__input-wrapping" id="broom-select-wrapper">
                    <select
                        id="player-broom"
                        class="team-config__player-broom-input"
                        v-model="player.broom">
                        <optgroup class="broom-options">
                            <option class="broom-options" v-for="broom in brooms" :value="broom" :key="broom.id">{{ mapBroom(broom) }}</option>
                        </optgroup>
                    </select>
                </div> 
                <label 
                    for="male"
                    class="team-config__player-label">
                <input
                    type="radio"
                    id="male"
                    value="m"
                    v-model="player.sex"> m
                </label>
                <label 
                    for="female"
                    class="team-config__player-label">
                <input
                    type="radio"
                    id="female"
                    value="f"
                    v-model="player.sex"> w
                </label>
            </div>
            <!-- The fan options -->
            <h3 class="team-config-section-title">Fans (<span :class="[{valid: fansAreValid},{invalid: !fansAreValid}]">{{ fanValidator }}</span> / 7)</h3>
            <div class="fan-selection">
                <label class="team-config__fan-label" for="team-goblins">Goblins</label>
                <input
                    type="number"
                    id="team-goblins"
                    min='1'
                    max='3'
                    class="team-config__fan-counter"
                    v-model.number="teamConfig.fans.goblins"
                    @blur="checkInput($event, teamConfig.fans, 'goblins')">
                <label class="team-config__fan-label" for="team-trolls">Trolle</label>
                <input
                    type="number"
                    id="team-trolls"
                    min='1'
                    max='3'
                    class="team-config__fan-counter"
                    v-model.number="teamConfig.fans.trolls"
                    @blur="checkInput($event, teamConfig.fans, 'trolls')">
                <label class="team-config__fan-label" for="team-elfs">Elfen</label>
                <input
                    type="number"
                    id="team-elfs"
                    min='1'
                    max='3'
                    class="team-config__fan-counter"
                    v-model.number="teamConfig.fans.elfs"
                    @blur="checkInput($event, teamConfig.fans, 'elfs')">
                <label class="team-config__fan-label" for="team-nifflers">Niffler</label>
                <input
                    type="number"
                    id="team-nifflers"
                    min='1'
                    max='3'
                    class="team-config__fan-counter"
                    v-model.number="teamConfig.fans.nifflers"
                    @blur="checkInput($event, teamConfig.fans, 'nifflers')">
                <div class="main-menu__button-container">
                    <!-- Buttons at the bottom -->
                    <button @click="saveTeamConfig()" class="app__small-button">Speichern</button>
                    <button @click="discardChanges()" class="app__small-button">Verwerfen</button>
                </div>
            </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            //define viable options
            playerRoles: [
                'Sucher', 'Hüter', 'Jäger', 'Jäger', 'Jäger', 'Treiber', 'Treiber'
            ],
            brooms: [
                'tinderblast', 'cleansweep-11', 'comet-260', 'nimbus-2001', 'firebolt'
            ],
            teamConfig: this.configs.teamConfigs[this.state.index],
            status: '',
            alertMessage: '',
            preselect: 'tinderblast',
        }
    },
    computed: {
        //returns the total number of fans
        fanValidator() {
            var sum = 0;
            for(var key in this.teamConfig.fans) {
                sum += parseInt(this.teamConfig.fans[key]);
            }
            return sum;
        },
        broomsAreValid() {
            if(this.broomValidator === '✓') {
                return true;
            } else {
                return false;
            }  
        },
        sexesAreValid() {
            if(this.sexValidator === 'Mehr Männer') {
                return false;
            }
            if(this.sexValidator === 'Mehr Frauen') {
                return false;
            }
            return true
        },
        fansAreValid(){
            if (this.fanValidator === 7) {
                return true;
            } else {
                return false;
            }
            
            
        },
        sexValidator() {
            var m = 0;
            var f = 0;
            const players = this.teamConfig.players;
            for (var key in players) {
                switch(players[key].sex) {
                    case 'm':
                        m++;
                        break;
                    case 'f':
                        f++;
                        break;
                }
            }
            if(m < 3) {
                return 'Mehr Männer';
            }
            if(f < 3) {
                return 'Mehr Frauen';
            }
            return '✓'

        },
        broomValidator() {
            var broomCount = new Array(0,0,0,0,0);
            var missingBrooms = [];
            const players = this.teamConfig.players;
            for (var key in players) {
                switch(players[key].broom) {
                    case 'tinderblast':
                        broomCount[0]++;
                        break;
                    case 'cleansweep-11':
                        broomCount[1]++;
                        break;
                    case 'comet-260':
                        broomCount[2]++;
                        break;
                    case 'nimbus-2001':
                        broomCount[3]++;
                        break;
                    case 'firebolt':
                        broomCount[4]++;
                        break;
                }
            }
            for(var i = 0; i < 5; i++) {
                if(broomCount[i] === 0) {
                    missingBrooms.unshift(this.brooms[i]);
                }
            }
            if(missingBrooms.length === 0) {
                return '✓'
            } else if(missingBrooms.length === 1) {
                return this.mapBroom(missingBrooms[0]) + ' fehlt';
            } else {
                var ans = '';
                var length = missingBrooms.length;
                for (var k = 0; k < length; k++) {
                    if(k === length - 1) {
                        ans += this.mapBroom(missingBrooms[k]);
                    } else {
                        ans += this.mapBroom(missingBrooms[k]) + ', ';
                    }
                }
                ans += ' fehlen';
                return ans;
            }
        }
    }, 
    methods: {
        //Translates role names to German for display
        mapRole(index) {
            switch (index) {
                case 'seeker':
                    return 'Sucher';
                case 'keeper':
                    return 'Hüter';
                case 'chaser1':
                    return 'Jäger 1';
                case 'chaser2':
                    return 'Jäger 2';
                case 'chaser3':
                    return 'Jäger 3';
                case 'beater1':
                    return 'Treiber 1';
                case 'beater2':
                    return 'Treiber 2';
                default: 
                return undefined;
            }
        },
        checkInput(event, item, key) {
            const max = event.target.max;
            const min = event.target.min;
            let val = item[key];
            if(val > max) {
                item[key] = parseInt(max);
            } else if( val < min ) {
                item[key] = parseInt(min);
            }
        },

        mapBroom(broomType) {
            switch(broomType) {
                case 'tinderblast':
                    return 'Zunderfauch';
                case 'cleansweep-11':
                    return 'Sauberwisch 11';
                case 'comet-260':
                    return 'Comet-2-60';
                case 'nimbus-2001':
                    return 'Nimbus-2001';
                case 'firebolt':
                    return 'Feuerblitz';
                default: undefined
            }    
        },
        //Stores the current Configuration into the browser cache
        saveTeamConfig() {
            const teamConfig = this.teamConfig;
            if(this.validateTeamConfig(teamConfig)) {
                this.storeTeamConfigs();
                this.state.currentState = 'inTeamOverview';
            } else {
                alert("Keine gültige Konfiguration.");
                this.status = 'notValid';
            }
            
        },
        validateTeamConfig(config) {
            if(config.name.length === 0) {
                return false;
            }
            if(config.motto.length === 0) {
                return false;
            }
            if(config.colors.primary.length === 0) {
                return false;
            }
            if(config.colors.secondary.length === 0) {
                return false;
            }
            if(!this.fansAreValid) {
                return false;
            }
            if(!this.broomsAreValid) {
                return false;
            }
            if(!this.sexesAreValid) {
                return false;
            }
            const players = config.players;
            for(var player_key in players) {
                if(players[player_key].name === "") {
                    return false;
                }
            }
            
            return true;
        },
        discardChanges() {
            if (this.state.isNew) {
                this.configs.teamConfigs.splice(0, 1);
                this.state.currentState = 'inTeamOverview';
            } else {
                if (localStorage.getItem('configs')) {
                    try {
                        this.configs.teamConfigs = JSON.parse(localStorage.getItem('configs')).teamConfigs;
                        this.state.currentState = 'inTeamOverview';
                    } catch(e) {
                        localStorage.removeItem('configs');
                        this.configs.teamConfigs = null;
                        this.state.currentState = 'inTeamOverview';
                    }             
                }
            }
        },
        storeTeamConfigs() {
            const parsed = JSON.stringify(this.configs);
            localStorage.setItem('configs', parsed);
        },
        encodeImageFileAsURL() {
            var files = document.getElementById("image-import").files;
            var canvas = document.getElementById("logo-canvas");
            var ctx = canvas.getContext("2d");
            var image = new Image();
            image.onload = function() {
                ctx.drawImage(image, 0, 0);
            };
            var file = files[0];
            var reader = new FileReader();
            var vm = this;
            reader.onloadend = function() {
                // Just the image data
                // var pureImageString = reader.result.split(',')[1];

                // Image with encoding header: 'data:image/png;base64,'
                
                var encodedImage = reader.result;
                image.src = encodedImage;
                vm.teamConfig.image = encodedImage;
            }
            reader.readAsDataURL(file);
        }
    },
    props: ['configs', 'state']
}
    
</script>

<style>
.team-config__player-selection {
    margin: 0;
    padding: 0;
}

#logo-canvas {
    position: relative;
    width: 2.5vh;
    height: 2.5vh;
    top: .5vh;
    border: 1px solid #00000027;
    border-radius: .2vh;
}

#team-configurator input {
    padding: 0.5vh;
    font-size: 1.5vh;
    font-family: 'Alice';
}

#validation-span {
    font-size: 1.1vh;
    font-weight: lighter;
}

#team-configurator option {
    padding: 0.5vh;
    font-size: 1.4vh;
    font-family: 'Alice';
}

.team-config-section-title {
    margin: 1vh;
    margin-top: 2vh;
}

#broom-select-wrapper {
	height: 2.8vh;
	width: 16vw;
	background: url(http://i50.tinypic.com/9ldb8j.png) no-repeat right center #00000013;
    background-size: 10vh;
    border-radius: .3vh;
    padding: 0;
    margin: 0;
}

#broom-select-wrapper select {
	font-size: 1.5vh;
	border-radius: 0;
	border: none;
	background: transparent;
	width: 16vw;
	overflow: hidden;
	height: 2.3h;
    padding-top: .6vh;
    padding-left: .6vh;
	color: #795a46;
	-webkit-appearance: none;
}

#broom-select-wrapper optgroup {
    font-size: 1.5vh;
}

#broom-select-wrapper option.broom-options {
	font-size: 14px;
	padding: 5px;
	background: #5c5c5c;
}

.broom-options {
    font-size: 5vh;
}

.valid {
    color: #54bd62;
}

.invalid {
    color: #b84747;
}

.player-type-label {
    display: inline-block;
    width: 25%;
    margin-block-start: 0;
}


</style>
