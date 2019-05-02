<template>
    <section>
        <!-- <h2>Team Konfigurator</h2> -->
             <h3>Team</h3>
            <label class="team-config__team-label" for="team-name">Name</label>
            <input
                type="text"
                id="team-name"
                class="team-config__team-name-input"
                v-model.lazy="teamConfig.name">
            <label class="team-config__team-label" for="team-motto">Motto</label>
            <input
                type="text"
                id="team-motto"
                class="team-config__team-motto-input"
                v-model.lazy="teamConfig.motto">
            <label class="team-config__team-label" for="team-color-primary">Hauptfarbe</label>
            <input
                type="text"
                id="team-color-primary"
                class="team-config__team-color-input"
                v-model.lazy="teamConfig.colors.primary">
            <label class="team-config__team-label" for="team-color-secondary">Zweitfarbe</label>
            <input
                type="text"
                id="team-color-secondary"
                class="team-config__team-color-input"
                v-model.lazy="teamConfig.colors.secondary">
            <h3>Spieler</h3>
            <h4 class="table-header"></h4>
            <h4 class="table-header">Name</h4>
            <h4 class="table-header">Besen</h4>
            <h4 class="table-header">Geschlecht</h4>
            <div v-for="(player, index) in teamConfig.players" :key="index +player.sex+player.broom" class="team-config__player-selection">
                <h4>{{ mapRole(index) }}</h4>
                <!-- <label 
                    for="player-name"
                    class="team-config__player-label"
                    >Name</label> -->
                <div class="team-config__input-wrapping">
                    <input
                    type="text"
                    id="player-name"
                    class="team-config__player-name-input"
                    v-model.lazy="player.name">
                </div>
                
                <!-- <label 
                    for="player-broom"
                    class="team-config__player-label">
                    Besen</label> -->
                <div class="team-config__input-wrapping">
                    <select
                        id="player-broom"
                        class="team-config__player-broom-input"
                        v-model="player.broom">
                    <option v-for="broom in brooms" :selected="broom == 'thinderblast'" :key="broom.id">{{ broom }}</option>
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
            <h3>Fans (<span :class="[{valid: fanSum == 7},{invalid: fanSum > 7}]">{{ fanSum }}</span> / 7)</h3>
            <div class="fan-selection">
                <label class="team-config__fan-label" for="team-goblins">Goblins</label>
                <input
                    type="number"
                    id="team-goblins"
                    min='1'
                    max='3'
                    class="team-config__fan-counter"
                    v-model="teamConfig.fans.goblins">
                <label class="team-config__fan-label" for="team-trolls">Trolle</label>
                <input
                    type="number"
                    id="team-trolls"
                    min='1'
                    max='3'
                    class="team-config__fan-counter"
                    v-model="teamConfig.fans.trolls">
                <label class="team-config__fan-label" for="team-elfs">Elfen</label>
                <input
                    type="number"
                    id="team-elfs"
                    min='1'
                    max='3'
                    class="team-config__fan-counter"
                    v-model="teamConfig.fans.elfs">
                <label class="team-config__fan-label" for="team-nifflers">Niffler</label>
                <input
                    type="number"
                    id="team-nifflers"
                    min='1'
                    max='3'
                    class="team-config__fan-counter"
                    v-model="teamConfig.fans.nifflers">
                <div class="main-menu__button-container">
                    <button @click="saveTeamConfig()" class="main-menu__small-button">Speichern</button>
                    <button @click="discardChanges()" class="main-menu__small-button">Verwerfen</button>
                </div>
            </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            playerRoles: [
                'Sucher', 'Hüter', 'Jäger', 'Jäger', 'Jäger', 'Treiber', 'Treiber'
            ],
            brooms: [
                'thinderblast', 'cleansweep-11', 'comet-260', 'nimbus-2001', 'firebolt'
            ],
            teamConfig: this.configs.teamConfigs[this.state.index]
        }
    },
    computed: {
        fanSum() {
            var sum = 0;
            for(var key in this.teamConfig.fans) {
                sum += parseInt(this.teamConfig.fans[key], 10);
            }
            return sum;
        }
    }, 
    methods: {
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
        saveTeamConfig() {
            this.storeTeamConfigs();
            this.state.currentState = 'inTeamOverview';
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

.valid {
    color: #54bd62;
}

.invalid {
    color: #b84747;
}


</style>
