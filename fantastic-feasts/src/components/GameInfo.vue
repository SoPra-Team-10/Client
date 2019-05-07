<template>
    <div class="header__game-info">
        <div class="game-info-panel">
            <div class="header__panel" id="team-panel-left">
                <div class="header__team-panel-content">
                    <!-- {{ gameInfo.leftTeamName }} -->
                </div>
            </div>
            <div class="header__panel" id="score-panel">
                <div class="score-panel-content">
                    <!-- {{ gameInfo.scoreLeft }} : {{ gameInfo.scoreRight }} -->
                </div>
            </div>
            <div class="header__panel" id="round-panel">
                <div class="round-panel-content">
                    
                    <p class="round-label">Runde 5 <!-- {{ gameInfo.round }} --></p>
                    <p class="round-phase-label">Ziehen <!-- {{ gameInfo.phase }} --></p>
                </div>
            </div>
            <div class="header__panel" id="round-phase-panel">
                <div class="round-phase-panel-content">
                    <!-- {{ gameInfo.roundPhase }} -->
                </div>
            </div>
            <div class="header__panel" id="team-panel-right">
                <div class="header__team-panel-content">
                    <!-- {{ gameInfo.rightTeamName }} -->
                </div>
            </div>
        </div>
    </div>   
</template>

<script>
export default {
    props: ['gameInfo'],
    
}
</script>

<style>

.header__game-info {
    position: absolute;
    width: 86%;
    height: 100%;
    left: 7%;
}


#score-panel {
    position: absolute;
    width: 30%;
    left: 35%;
    top: -10%;
    background: radial-gradient(#bb3434, #802020);
    height: 120%;
    color: #e7e7e7;
    border-radius: 2px;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 2px 3px 0 rgba(0, 0, 0, 0.19);
    line-height: 80%;
    text-align: center;
    font-size: 5vh;
    padding: 1.5vh 0.5vh;
    z-index: 91;

}

#round-panel {
    position: absolute;
    width: 20%;
    left: 40%;
    top: 100%;
    padding: 0;
    margin: 0;
    background: radial-gradient(#ffffff, #e7e7e7);
    height: 90%;
    color: #4d4d4d;
    border-radius: 2px;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 2px 3px 0 rgba(0, 0, 0, 0.19);
    line-height: 80%;
    text-align: center;
    font-size: 2.7vh;
    padding: .9vh 0;
    z-index: 90;
}




.game-info-panel {
    position: absolute;
    width: 60%;
    min-height: 80%;
    top: 10%;
    left: 20%;
    background: radial-gradient(#ffffff, #ece3ca);
    border-radius: 8px;
    border: 1px solid #e4d8b8;
    -moz-box-shadow:    inset 0 0 3px #00000086;
    -webkit-box-shadow: inset 0 0 3px #000000;
    box-shadow:         inset 0 0 3px #000000;
}


.round-label {
    font-size: 1.9vh;
    color: #634b2c;
    margin: 0;
    padding: 0;
}

.round-phase-label {
    font-size: 1.4vh;
    color: #634b2c;
    margin: 0;
    padding: 0;
}

.round-panel-separation-line {
    border: none;
    border-top: 1px solid #886639;
    padding: 0;
    margin: .2vh .1vh;
}

.round-panel-content {
    margin: 0;
    padding: 0;
}


</style>
