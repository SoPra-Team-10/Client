<template>
    <div>
        <h1 class="subtitle">Konfigurator</h1>
        <div class="config__main-content">
            <div class="team-config__content-container">
                <div class="text-content-container">
                    <div v-if="state.currentState === 'inTeamOverview' || state.currentState === 'inMatchOverview'">
                        <button @click="state.currentState = 'inTeamOverview'" :class="{ selected: state.currentState === 'inTeamOverview'}" class="config__header-button" id="config__header-button-left">Team</button>
                        <button @click="state.currentState = 'inMatchOverview'" :class="{ selected: state.currentState === 'inMatchOverview'}" class="config__header-button" id="config__header-button-right">Partie</button>
                    </div>
                    <app-team-config v-if="state.currentState === 'inTeamConfig'" :game="game" :state="state" :configs="configs"></app-team-config>
                    <app-match-config v-if="state.currentState === 'inMatchConfig'" :game="game" :state="state" :configs="configs"></app-match-config>
                    <app-team-overview v-if="state.currentState === 'inTeamOverview'" :game="game" :state="state" :configs="configs"></app-team-overview>
                    <app-match-overview v-if="state.currentState === 'inMatchOverview'" :game="game" :state="state" :configs="configs"></app-match-overview>
                </div>
            </div>
        </div>
        <div class="main-menu__button-container footer-bar">
            <hr>
            <button @click="game.currentState = 'inMenu'" class="main-menu__button">Zurück zum Menü</button>
        </div>
    </div>
</template>

<script>
import TeamConfig from './TeamConfigurator.vue';
import TeamOverview from './TeamOverview.vue';
import MatchConfig from './MatchConfigurator.vue';
import MatchOverview from './MatchOverview.vue';

export default {
    data() {
        return {
            state: {
                currentState: 'inTeamOverview',
                index: 0,
                isNew: false
            } 
        }
    },
    props: ['game', 'configs'],
    components: {
        'app-team-config': TeamConfig,
        'app-match-config': MatchConfig,
        'app-team-overview': TeamOverview,
        'app-match-overview': MatchOverview
    }
}
</script>

<style>

.team-config__content-container {
    display: inline-block;
    width: 100%;
}

.team-config__content-container h3 {
    margin: 10px 0;

    
}


.team-config__content-container h4 {
    margin: 5px 0;
    display: inline-block;
    width: 80px;
    text-align: left;
}

.config__header-button {
    background: #f8f1df;
    padding: 4px;
    color: #8d6951;
    font-family: 'Alice';
    font-size: 1em;
    border: 1px solid #99735a;
}

.config__header-button:hover {
    background: #f7e9c6;
}

.config__header-button:active {
    background: #fcf2da;
}

.config__header-button:focus {
    background: #f7e9c6;
}

#config__header-button-left {
    border-right: none;
    border-radius: 3px 0 0 3px;
}

#config__header-button-right {
    border-radius: 0 3px 3px 0;
}

.team-config__content-container input {
    border-radius: 3px;
    border: .5px solid #ebd18a;
    color: #795a46;
    text-align: left;
    font-family: 'Alice';
    padding: 3px;
    vertical-align: center;
}

.team-config__content-container input:hover {
    box-shadow: 0 0 10px 0 rgba(255, 228, 110, 0.534);
}

.team-config__content-container input:active {
    box-shadow: 0 0 3px 0 rgba(185, 141, 59, 0.534);
}

.team-config__content-container input:active,
.team-config__content-container input:focus {
    box-shadow: 0 0 3px 0 rgba(121, 92, 38, 0.734);
}

.team-config__fan-counter {
    width: 30px;
    border-radius: 3px;
    border: .5px solid #ebd18a;
    color: #795a46;
    text-align: right;
    font-family: 'Alice';
}

.team-config__input-wrapping {
    display: inline-block;
    width: 25%;
    padding: 0 15px;
}

.config__main-content {
    margin-top: 30px;
    display: block;
    position: relative;
}

.team-config__fan-label {
    width: 40px;
    color: #795a46;
    text-align: left;
    font-weight: bold;
    margin: 5px;
}

.team-config__player-selection {
    position: relative;
}

.team-config__player-selection h4 {
    width: 25%;
    margin-block-start: 0;
}

h4.table-header {
    display: inline-block;
    text-align: center;
    width: 25%;
}

.team-config__team-label {
    width: 40px;
    color: #795a46;
    text-align: left;
    font-weight: bold;
    margin: 5px;
}

.team-config__team-name-input {
    border-radius: 3px;
    border: .5px solid #ebd18a;
    color: #795a46;
    text-align: left;
    width: 80px;
}

.team-config__team-motto-input {
    border-radius: 3px;
    border: .5px solid #ebd18a;
    color: #795a46;
    text-align: left;
    width: 250px;
}
.team-config__team-color-input {
    border-radius: 3px;
    border: .5px solid #ebd18a;
    color: #795a46;
    text-align: left;
    width: 50px;
}

.team-config__player-label {
    color: #795a46;
    text-align: center;
    width: 12.5%;
    display: inline-block;
}

.team-config__player-name-input {
    color: #795a46;
    font-family: 'Alice';
    text-align: left;
    border-radius: 3px;
    width: 100%;
    border: .5px solid #ebd18a;
}

.team-config__player-broom-input {
    color: #795a46;
    font-family: 'Alice';
    text-align: left;
    width: 100%;
    border-radius: 3px;
    border: .5px solid #ebd18a;
}

.selected {
    background: #f3e7c0;
}


</style>
