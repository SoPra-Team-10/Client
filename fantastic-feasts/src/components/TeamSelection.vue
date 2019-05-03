<template>
    <div id="team-overview">
        <h3>{{ teamConfig.name }} </h3>
        <em id="team-motto">{{ teamConfig.motto }}</em> 
        <p>~</p>
        <!-- <hr class="team-property-separation"> -->
        <section v-for="(player, key) in teamConfig.players" :key="key">
            <div class="team-property"> <b>{{ mapRole(key) }}</b> </div>
            <div class="team-property">{{ player.name }}</div>
            <div class="team-property">{{ mapBroom(player.broom) }}</div>
            <div class="team-property player-sex">{{ player.sex }}</div>
        </section>
        <p>~</p>
        <!-- <hr class="team-property-separation"> -->
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
                case 'comet-260':
                    return 'Comet-2-60';
                case 'nimbus-2001':
                    return 'Nimbus-2001';
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
    margin: 15px;
    padding: 5px 0 20px 0;
    border-radius: 5px;
    display: inline-block;
    width: 60%;
    background: radial-gradient(#ffffff, #f3eddd);
    border-radius: 25px;
    border: 1px solid #e4d8b8;
    -moz-box-shadow:    inset 0 0 3px #00000086;
    -webkit-box-shadow: inset 0 0 3px #000000;
    box-shadow:         inset 0 0 3px #000000;
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
    border-top: 0.5px solid #d6cb8d;
    width: 60%;
}

</style>
