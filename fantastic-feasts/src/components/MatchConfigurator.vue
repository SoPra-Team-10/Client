<template>
    <div class="main-content-window-editor" id="match-config-editor">
    <!-- Central area that includes all the configuration options -->
            <div id="match-config__left-panel">
                <div class="match-config__number-panel">
                    <h3>Dateiname</h3>
                    <input
                        type="text"
                        id="match-config__text"
                        v-model="matchConfig.name">
                    <h3>Maximale Rundenzahl</h3>
                    <!-- Set limits for input values here. @blur-event will call function 
                    'checkInput'. This will check if user enters number out of range. -->
                    <input
                        type="number"
                        step="1"
                        max="1000"
                        min="0"
                        class="match-config__int-counter"
                        v-model.number="matchConfig.config.maxRounds"
                        :class="{questionable: matchConfig.config.maxRounds < 10}"
                        @blur="checkInput($event, matchConfig.config, 'maxRounds')">
                </div>
                <div class="match-config__number-panel">
                    <h3>Zeitbegrenzungen (ms)</h3>
                    <section v-for="(item, key) in matchConfig.config.timings" :key="key">
                        <label class="match-config__label" for="">{{ key }}</label>
                        <!-- Set limits for input values here. @blur-event will call function 
                        'checkInput'. This will check if user enters number out of range. -->
                        <input
                            type="number"
                            step="100"
                            max="99999"
                            min="0"
                            class="match-config__float-counter"
                            :class="{questionable: matchConfig.config.timings[key] < 5000}"
                            v-model.number="matchConfig.config.timings[key]"
                            @blur="checkInput($event, matchConfig.config.timings, key)">
                    </section>
                </div>
            </div>
            <div id="match-config__right-panel">
                <h3>Wahrscheinlichkeiten (0,0 ... 1,0)</h3>
                <div class="match-config__number-panel"> 
                    <h4>Allgemein</h4>
                    <section v-for="(item, key) in matchConfig.config.probabilities" :key="key">
                        <section v-if="key !== 'extraMove' && key !== 'foulDetection' && key !== 'fanFoulDetection'">
                            <label class="match-config__label" for="">{{ key }}</label>
                            <!-- Set limits for input values here. @blur-event will call function 
                             'checkInput'. This will check if user enters number out of range. -->
                            <input
                                type="number"
                                step="0.01"
                                max="1.00"
                                min="0.00"
                                class="match-config__float-counter"
                                :class="{questionable: (matchConfig.config.probabilities[key] === 0 || matchConfig.config.probabilities[key] === 1)}"
                                v-model.number="matchConfig.config.probabilities[key]"
                                @blur="checkInput($event, matchConfig.config.probabilities, key)">
                        </section>    
                    </section>
                </div>
                <div class="match-config__number-panel">
                    <h4>Extrazug</h4>
                    <section v-for="(item, key) in matchConfig.config.probabilities.extraMove" :key="key">
                        <section>
                            <label class="match-config__label" for="">{{ key }}</label>
                            <!-- Set limits for input values here. @blur-event will call function 
                            'checkInput'. This will check if user enters number out of range. -->
                            <input
                                type="number"
                                step="0.01"
                                max="1.00"
                                min="0.00"
                                class="match-config__float-counter"
                                :class="{questionable: (matchConfig.config.probabilities.extraMove[key] === 0 || matchConfig.config.probabilities.extraMove[key] === 1)}"
                                v-model.number="matchConfig.config.probabilities.extraMove[key]"
                                @blur="checkInput($event, matchConfig.config.probabilities.extraMove, key)">
                        </section>
                    </section>
                </div>
                <div class="match-config__number-panel">
                    <h4>Foulerkennung – Spieler</h4>
                    <section v-for="(item, key) in matchConfig.config.probabilities.foulDetection" :key="key">
                        <section>
                            <label class="match-config__label" for="">{{ key }}</label>
                            <!-- Set limits for input values here. @blur-event will call function 
                            'checkInput'. This will check if user enters number out of range. -->
                            <input
                                type="number"
                                step="0.01"
                                max="1.00"
                                min="0.00"
                                class="match-config__float-counter"
                                :class="{questionable: (matchConfig.config.probabilities.foulDetection[key] === 0 || matchConfig.config.probabilities.foulDetection[key] === 1)}"
                                v-model.number="matchConfig.config.probabilities.foulDetection[key]"
                                @blur="checkInput($event, matchConfig.config.probabilities.foulDetection, key)">
                        </section>
                    </section>
                </div>
                <div class="match-config__number-panel">
                    <h4>Foulerkennung – Fans</h4>
                    <section v-for="(item, key) in matchConfig.config.probabilities.fanFoulDetection" :key="key">
                        <section v-if="key !== 'extraMove' && key !== 'foulDetection' && key !== 'fanFoulDetection'">
                            <label class="match-config__label" for="">{{ key }}</label>
                            <!-- Set limits for input values here. @blur-event will call function 
                            'checkInput'. This will check if user enters number out of range. -->
                            <input
                                type="number"
                                step="0.01"
                                max="1.00"
                                min="0.00"
                                class="match-config__float-counter"
                                :class="{questionable: (matchConfig.config.probabilities.fanFoulDetection[key] === 0 || matchConfig.config.probabilities.fanFoulDetection[key] === 1)}"
                                v-model.number="matchConfig.config.probabilities.fanFoulDetection[key]"
                                @blur="checkInput($event, matchConfig.config.probabilities.fanFoulDetection, key)">
                        </section>
                    </section>
                </div>
            </div>

            <!-- The two buttons on the bottom -->
            <div class="main-menu__button-container">
                <button @click="saveConfig()" class="app__small-button">Speichern</button>
                <button @click="discardChanges()" class="app__small-button">Verwerfen</button>
            </div>
    </div>
</template>

<script>


export default {
    data() {
        return {
            matchConfig: this.configs.matchConfigs[this.state.index],   
        }
    },
    methods: {
        //Stores the configuration into the browser cache
        saveConfig() {
            this.storeConfigs();
            this.state.currentState = 'inMatchOverview';
        },
        discardChanges() {
            if (this.state.isNew) {
                this.configs.matchConfigs.splice(0, 1);
                this.state.currentState = 'inMatchOverview';
            } else {
                if (localStorage.getItem('configs')) {
                    try {
                        this.configs.matchConfigs = JSON.parse(localStorage.getItem('configs')).matchConfigs;
                        this.state.currentState = 'inMatchOverview';
                    } catch(e) {
                        localStorage.removeItem('configs');
                        this.configs.teamConfigs = null;
                        this.state.currentState = 'inTeamOverview';
                    }             
                }
            }
        },
        checkInput(event, item, key) {
            const max = event.target.max;
            const min = event.target.min;
            let val = item[key];
            if(val > max) {
                item[key] = parseFloat(max);
            } else if( val < min ) {
                item[key] = parseFloat(min);
            }
        },
        storeConfigs() {
            const parsed = JSON.stringify(this.configs);
            localStorage.setItem('configs', parsed);
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

.match-config__number-panel {
    display: inline-block;
    width: 45%;
    text-align: left;
    vertical-align: top;
}

.match-config__number-panel label {
    display: inline-block;
    width: 70%;
    text-align: left;
    vertical-align: top;
}

.match-config__number-panel input {
    display: inline-block;
    width: 23%;
    vertical-align: top;
}

#match-config__text {
    width: 80%;
}

#match-config__left-panel {
    width: 45%;
    height: 100%;
    position: relative;
    vertical-align: top;
    display: inline-block;
}




#match-config-editor input {
    padding: 0.3vh;
    font-size: 1.5vh;
    font-family: 'Alice';
    margin: .1vh;
    border: 1px solid #d6cc9d;
    border-radius: .4vh;
    color: #664213;
}

#match-config-editor .questionable {
    color: #f1b900;
}

#match-config__left-panel > .match-config__number-panel {
    display: inline-block;
    text-align: top;
    vertical-align: top;
    width: 100%;

}
#match-config__right-panel {
    width: 55%;
    height: 100%;
    display: inline-block;
}

.match-config__float-counter {
    text-align: right !important;
}

.match-config__int-counter {
    text-align: right;
}

</style>
