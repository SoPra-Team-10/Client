<template>
    <div id="team-overview">
        <h3>{{ teamConfig.name }} </h3>
        <em id="team-motto">{{ teamConfig.motto }}</em> 
        <hr class="team-property-separation">
        <section v-for="(player, key) in teamConfig.players" :key="player.name">
            <div class="team-property"> <b>{{ mapRole(key) }}</b> </div>
            <div class="team-property">{{ player.name }}</div>
            <div class="team-property">{{ mapBroom(player.broom) }}</div>
            <div class="team-property player-sex">{{ player.sex }}</div>
        </section>
        <hr class="team-property-separation">
        <section v-for="(fan, key) in teamConfig.fans" :key="key">
            <div class="team-property"> <b>{{ mapFan(key) }}</b> </div>
            <div class="team-property fan-number">{{ teamConfig.fans[key] }}</div>
        </section>
    </div>
</template>

<script>
export default {
    data() {
        return {
            playerRoles: [
                'Sucher', 'Hüter', 'Jäger', 'Jäger', 'Jäger', 'Klopper', 'Klopper'
            ],
            brooms: [
                'thinderblast', 'cleansweep-11', 'comet-260', 'nimbus-2001', 'firebolt'
            ]
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
                    return 'Klopper 1';
                case 'beater2':
                    return 'Klopper 2';
                default: 
                return undefined;
            }
        },
        mapBroom(broom) {
            switch(broom) {
                case 'thinderblast':
                    return 'Zunderfauch';
                case 'cleansweep-11':
                    return 'Sauberwisch 11';
                case 'thinderblast':
                    return 'comet-260';
                case 'thinderblast':
                    return 'nimbus-2001';
                case 'firebolt':
                    return 'Feuerblitz';
                default: undefined
            }    
        },
        mapFan(key) {
            switch(key) {
                case 'goblins':
                    return 'Goblins';
                case 'elfs':
                    return 'Elfen';
                case 'nifflers':
                    return 'Niffler';
                case 'trolls':
                    return 'Trolle';
                default: undefined
            } 
        }
    },
    props: ['configs', 'state', 'teamConfig']
}
    
</script>

<style scoped>
.team-config__player-selection {
    margin: 0;
    padding: 0;
}

#team-overview {
    border: 1px solid #d6cb8d;
    margin: 15px;
    padding: 5px 0 20px 0;
    border-radius: 10px;
    display: inline-block;
    width: 60%;
}

#team-motto {
    display: inline-block;
    margin: 0 0 15px 0;
}


.team-property {
    display: inline-block;
    width: 120px;
    text-align: left;
}

.player-sex {
    width: 30px;
}

.fan-number {
    width: 30px;
}

.team-property-separation {
    border: none;
    border-top: 1px solid #d6cb8d;
}

</style>
