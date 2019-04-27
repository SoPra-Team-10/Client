<template>
    <div>
        <h1 class="subtitle">Hilfe</h1>
        <div class="text-content-container">
            <h3 class="help__title">Spielanleitung</h3>
            <h4 class="help__sub-title">Teil 1</h4>
            <p class="help__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Donec quis lobortis nibh. Suspendisse potenti. Maecenas lobortis feugiat quam non aliquam.
                Nulla sed justo non eros pellentesque varius. Phasellus semper risus a libero bibendum, ac egestas lacus aliquet. 
                Nam rutrum quis mi sit amet pharetra. Suspendisse turpis ipsum, lobortis id ullamcorper at, commodo at massa. 
                Integer nec lectus enim. Pellentesque et ex dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, 
                per inceptos himenaeos. Curabitur nec elit ipsum. Donec ac orci ut lacus bibendum sagittis sit amet non ex. 
                Donec magna sem, tincidunt vitae dui id, ornare vestibulum elit. Cras suscipit enim sed vehicula ullamcorper. 
                Suspendisse fermentum est ut sollicitudin imperdiet. Suspendisse potenti. Quisque scelerisque lacus ligula, 
                sit amet pretium ligula volutpat ut. Suspendisse potenti. Suspendisse potenti. Mauris rhoncus orci et aliquam mattis. 
                Quisque lectus sem, accumsan non pretium laoreet, aliquet et sem. Curabitur rhoncus ullamcorper sem, 
                quis dictum quam placerat non. Proin a consectetur lectus, sed pellentesque turpis. 
                Etiam sed nibh id neque convallis semper eget venenatis ipsum. Aliquam quis mauris finibus diam maximus interdum. 
                Integer mattis neque tortor, id finibus ex ultrices nec. 
                Sed venenatis nunc non turpis accumsan consequat eget sit amet risus. Nam nisi enim, aliquam sed enim vitae, 
                bibendum feugiat ipsum. Duis sed enim et lectus ultricies pellentesque eu sit amet orci.
                Maecenas sagittis auctor leo ac vestibulum. Cras ornare tempor leo, a consectetur ipsum vestibulum ac. 
                Duis volutpat erat eget ante lacinia commodo. Sed rhoncus a dolor a vestibulum. Fusce sit amet convallis lorem. 
                Cras in nisi finibus, pulvinar turpis a, gravida massa. Morbi accumsan, magna sit amet feugiat mattis, 
                quam felis molestie diam, id luctus purus nibh quis ante. Curabitur porttitor ut nisi vitae porta. 
                Aenean tincidunt pretium dolor, id tincidunt erat rhoncus vel. Curabitur malesuada pretium purus a porttitor. 
                Etiam euismod dolor in augue vehicula egestas eu nec mauris.</p>
        </div>
        <div class="main-menu__button-container footer-bar">
            <hr>
            <button @click="game.currentState = 'inMenu'" class="main-menu__button">Zurück zum Menü</button>
            <button @click="game.currentState = 'inMenu'" class="main-menu__button">Shortcuts anzeigen</button>
        </div>
    </div>
</template>

<script>
export default {
    props: ['game']
}
</script>

<style>

</style>
