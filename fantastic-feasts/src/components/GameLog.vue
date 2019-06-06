<template>
    <div class="info-panel" id="game-log-panel">
        <h3 class="panel-title">Gamelog</h3>
        <hr class="inner-separation-line">
        <!-- <h5 id="game-log"></h5> -->
        <div class="log-entry-container">
            <transition-group name="slide">
                <div v-for="(log, i) in gameLog" :key="log.time" :class="['log-entry', {'highlighted-log-entry': i % 2 === 0}]">
                    {{log.message}} <span v-if="log.time" style="color: gray">@{{ log.time }}</span>
                </div>
            </transition-group>
        </div>
    </div>
</template>

<script>
export default {
    props: ['gameLog'],
    data() {
        return {
            //gameLog: [{message: 'moved player from x to y'}, {message: 'moved player from x to y'}, {message: 'moved player from x to y'}, {message: 'moved player from x to y'}, {message: 'moved player from x to y'}, {message: 'moved player from x to y'}, {message: 'moved player from x to y'}, {message: 'moved player from x to y'}, {message: 'moved player from x to y'}, {message: 'moved player from x to y'}, {message: 'moved player from x to y'}, {message: 'moved player from x to y'}, {message: 'moved player from x to y'}, {message: 'moved player from x to y'}, {message: 'moved player from x to y'}, {message: 'moved player from x to y'}, {message: 'moved player from x to y'}, {message: 'moved player from x to y'} ]
        }
    }
}
</script>

<style scoped>
#game.log-panel {
    
}

.log-entry-container {
    overflow-y: auto;
    padding: .2vw .2vw;
    max-height: 30vh;
    height: 100%;
}



.log-entry {
    font-size: 1vw;
    background: radial-gradient(#ffffff, #eeeeee);
    border: 1px solid #eeeeee;
    padding: .6vw .4vw;
    box-shadow: 0 0 3px #00000056;
    margin: .4vw 0;
    border-radius: .5vw;
    overflow-x: hidden;
}

.highlighted-log-entry {
    
}

.log-entry:hover {
    background: radial-gradient(#ffffff, #f5f5f5);
    box-shadow: 0 0 3px #0000008c;
}

</style>
