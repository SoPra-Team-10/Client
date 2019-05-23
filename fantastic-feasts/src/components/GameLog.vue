<template>
    <div class="info-panel" id="game-log-panel">
        <h3 class="panel-title">Gamelog</h3>
        <hr class="inner-separation-line">
        <!-- <h5 id="game-log"></h5> -->
        <div class="log-entry-container">
            <transition-group name="slide">
                <div v-for="(log, i) in gameLog" :key=log.id :class="['log-entry', {'highlighted-log-entry': i % 2 === 0}]">
                    {{log.message}}
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
}



.log-entry {
    font-size: 1vw;
    background: #00000028;
    padding: .2vw;
    border-radius: .2vw;
    margin: .2vw 0;


}
.highlighted-log-entry {
    background: #00000010;

}
</style>
