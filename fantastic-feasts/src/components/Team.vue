<template>
    <div>
        <h1 class="subtitle">Team auswählen</h1>
        <input type="file" id="fileChooser" @change="readFile()"/>
        <button class="main-menu__button">Dateien</button>
        <div class="main-menu__button-container footer-bar">
            <hr>
            <button @click="game.currentState = 'inMenu'" class="main-menu__button">Zurück zum Menü</button>
        </div>
    </div>
</template>

<script>


export default {
    methods:{
        readFile : function(){
            var files = document.getElementById("fileChooser").files;
            var file = files[0];
            if(files.length !== 1){
                alert("Please choose one file only");
            }
            else if(file.type !== "application/json"){
                alert("Please choose a json-file");
            }
            else{
                var reader = new FileReader();
                reader.readAsText(file);
                var data;
                reader.onload = function(){
                    data = JSON.parse(reader.result);
                    alert(data.name);
                }
                
                
            }
        }
    },
    props: ['game']
}
</script>

<style>

</style>
