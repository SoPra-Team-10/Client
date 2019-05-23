var socket;

function toMainMenu(){
    document.getElementById("MainMenu").style.display="initial";
    document.getElementById("Matchmaking").style.display="none";
    document.getElementById("Help").style.display="none";
    document.getElementById("Hotkeys").style.display="none";
    document.getElementById("ConnectionLost").style.display="none";
    document.getElementById("GameEnd").style.display="none";
    document.getElementById("InGame").style.display="none";
}

function toMatchmaking(){
    document.getElementById("MainMenu").style.display="none";
    document.getElementById("Matchmaking").style.display="initial";
    document.getElementById("Help").style.display="none";
    document.getElementById("Hotkeys").style.display="none";
    document.getElementById("ConnectionLost").style.display="none";
    document.getElementById("GameEnd").style.display="none";
    document.getElementById("InGame").style.display="none";
}

function toHelp(){
    document.getElementById("MainMenu").style.display="none";
    document.getElementById("Matchmaking").style.display="none";
    document.getElementById("Help").style.display="initial";
    document.getElementById("Hotkeys").style.display="none";
    document.getElementById("ConnectionLost").style.display="none";
    document.getElementById("GameEnd").style.display="none";
    document.getElementById("InGame").style.display="none";
}

function toHotkeys(){
    document.getElementById("MainMenu").style.display="none";
    document.getElementById("Matchmaking").style.display="none";
    document.getElementById("Help").style.display="none";
    document.getElementById("Hotkeys").style.display="initial";
    document.getElementById("ConnectionLost").style.display="none";
    document.getElementById("GameEnd").style.display="none";
    document.getElementById("InGame").style.display="none";
}

function toConnectionLost(){
    document.getElementById("MainMenu").style.display="none";
    document.getElementById("Matchmaking").style.display="none";
    document.getElementById("Help").style.display="none";
    document.getElementById("Hotkeys").style.display="none";
    document.getElementById("ConnectionLost").style.display="initial";
    document.getElementById("GameEnd").style.display="none";
    document.getElementById("InGame").style.display="none";
}

function toGameEnd(){
    document.getElementById("MainMenu").style.display="none";
    document.getElementById("Matchmaking").style.display="none";
    document.getElementById("Help").style.display="none";
    document.getElementById("Hotkeys").style.display="none";
    document.getElementById("ConnectionLost").style.display="none";
    document.getElementById("GameEnd").style.display="initial";
    document.getElementById("InGame").style.display="none";
}

function toInGame(){
    document.getElementById("MainMenu").style.display="none";
    document.getElementById("Matchmaking").style.display="none";
    document.getElementById("Help").style.display="none";
    document.getElementById("Hotkeys").style.display="none";
    document.getElementById("ConnectionLost").style.display="none";
    document.getElementById("GameEnd").style.display="none";
    document.getElementById("InGame").style.display="initial";
}

function openFileChooser(){
    //TODO: Open a file chooser popup
}

function connectToServer(){
    var address = document.getElementById("server").value;
    socket = new WebSocket(server);
    socket.onerror = function(err){
        alert("Connection failed: " + err);
    }
    socket.onopen = function(evt){
        socket.send("echo");
    }
    socket.onmessage = function(msg){
        alert(msg);
    }

}

