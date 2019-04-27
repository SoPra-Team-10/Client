<template>
    <div>
        <h1>Team auswählen</h1>
        <input type="file" id="fileChooser" @change="readFile()"/>
        <hr>
        <button @click="game.currentState = 'inMenu'">Zurück zum Menü</button>
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
