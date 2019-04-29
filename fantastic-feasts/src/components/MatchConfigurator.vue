<template>
    <section>
            <div id="match-config__left-panel">
                <div class="match-config__number-panel">
                    <h3>Dateiname</h3>
                    <input
                        type="text"
                        id="match-config__text"
                        v-model="matchConfig.name">
                    <h3>Maximale Rundenzahl</h3>
                    <input
                        type="number"
                        step="1"
                        min="0"
                        class="match-config__int-counter"
                        v-model="matchConfig.config.maxRounds">
                </div>
                <div class="match-config__number-panel">
                    <h3>Zeitbegrenzungen</h3>
                    <section v-for="(item, key) in matchConfig.config.timeouts" :key="key">
                        <label class="match-config__label" for="">{{ key }}</label>
                        <input
                            type="number"
                            step="1"
                            min="0"
                            class="match-config__float-counter"
                            v-model="matchConfig.config.timeouts[key]">
                    </section>
                </div>
            </div>
            <div id="match-config__right-panel">
                <h3>Wahrscheinlichkeiten</h3>
                <div class="match-config__number-panel"> 
                    <h4>Allgemein</h4>
                    <section v-for="(item, key) in matchConfig.config.probabilities" :key="key">
                        <section v-if="key !== 'extraMove' && key !== 'foulDetection' && key !== 'fanFoulDetection'">
                            <label class="match-config__label" for="">{{ key }}</label>
                            <input
                                type="number"
                                step="0.01"
                                max="1.00"
                                min="0.00"
                                class="match-config__float-counter"
                                v-model="matchConfig.config.probabilities[key]">
                        </section>    
                    </section>
                </div>
                <div class="match-config__number-panel">
                    <h4>Extrazug</h4>
                    <section v-for="(item, key) in matchConfig.config.probabilities.extraMove" :key="key">
                        <section>
                            <label class="match-config__label" for="">{{ key }}</label>
                            <input
                                type="number"
                                step="0.01"
                                max="1.00"
                                min="0.00"
                                class="match-config__float-counter"
                                v-model="matchConfig.config.probabilities.extraMove[key]">
                        </section>
                    </section>
                </div>
                <div class="match-config__number-panel">
                    <h4>Foulerkennung – Spieler</h4>
                    <section v-for="(item, key) in matchConfig.config.probabilities.foulDetection" :key="key">
                        <section>
                            <label class="match-config__label" for="">{{ key }}</label>
                            <input
                                type="number"
                                step="0.01"
                                max="1.00"
                                min="0.00"
                                class="match-config__float-counter"
                                v-model="matchConfig.config.probabilities.foulDetection[key]">
                        </section>
                    </section>
                </div>
                <div class="match-config__number-panel">
                    <h4>Foulerkennung – Fans</h4>
                    <section v-for="(item, key) in matchConfig.config.probabilities.fanFoulDetection" :key="key">
                        <section v-if="key !== 'extraMove' && key !== 'foulDetection' && key !== 'fanFoulDetection'">
                            <label class="match-config__label" for="">{{ key }}</label>
                            <input
                                type="number"
                                step="0.01"
                                max="1.00"
                                min="0.00"
                                class="match-config__float-counter"
                                v-model="matchConfig.config.probabilities.fanFoulDetection[key]">
                        </section>
                    </section>
                </div>
            </div>
        
            <div class="main-menu__button-container">
                <button @click="saveConfig()" class="main-menu__small-button">Speichern</button>
                <button @click="discardChanges()" class="main-menu__small-button">Verwerfen</button>
            </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            matchConfig: this.configs.matchConfigs[this.state.index]
        }
    },
    methods: {
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
    width: 60%;
    text-align: left;
    vertical-align: top;
}

.match-config__number-panel input {
    display: inline-block;
    width: 20%;
    vertical-align: top;
}

#match-config__text {
    width: 80%;
}

#match-config__left-panel {
    width: 30%;
    height: 100%;
    vertical-align: top;
    display: inline-block;
}

#match-config__left-panel > .match-config__number-panel {
    display: inline-block;
    text-align: top;
    vertical-align: top;
    height: 100%;
    width: 100%;
}



#match-config__right-panel {
    width: 60%;
    height: 100%;
    display: inline-block;
}

.main-menu__button-container .main-menu__small-button {
    margin: 25px 10px 0 15px;
}

.match-config__float-counter {
    text-align: right !important;
}

</style>
