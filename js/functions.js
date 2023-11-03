let titleCategory = "";
let currentSongArray = [];
let playedSongArray = [];
let songNumber = 0;
let playedNumber = 0;
let currentRandomNumber = -1;
let groupName = "";
let currSong = "";

/*
 get the arrayname, category, and ?groupname? 
    if it is not "ALL", 
        1. get a random number from the array length
        2. check and see if it has been played
        3. if not, play it
        4. if so, get another number, until one is playable
        5. play it
        6. put the name and number of the song into the playedArray
        7. Get a) the groupname, and post it at top
               b) the length of the array  
               c) the remaining number of songs
               d) the  song and title
               e) if Disney, post instructions film and song
                    otherwise band and song   

    else if All:
        1) get total number of songs.
        2) Get random category
        3) get random song number
            ---redo this until playable...? 
        4) Do the Disney thing again, or maybe just post the category        

*/



function chooseSong(array_name, categoryName, group, buttonID) {
    console.log("ChooseSong: ", categoryName, group, buttonID);


    if (group !== "All") {

        titleCategory = categoryName;
        currentSongArray = array_name;
        playedSongArray = [];
        groupName = group;
        // console.log(groupName);
        resetButtonColors(buttonID);
        showInstructions(group);

        document.getElementById("songsPlayed").innerText = playedSongArray.length;
        document.getElementById("songsRemaining").innerText = currentSongArray.length - playedSongArray.length;

        let playButton = document.getElementById("playASong");
        playButton.textContent = "Play a Song";

    } else {
        console.log("All chosen ", categoryName, group);
        resetButtonColors(buttonID);
        groupName = "All";
        playedSongArray = [];
        document.getElementById("songsPlayed").innerText = playedSongArray.length;
        document.getElementById("songsRemaining").innerText = arraysLength - playedSongArray.length;

    }

};

function getRandomSong() {
    if (groupName !== "All") {

        if (currentSongArray.length === 0) {
            alert("Please choose a song category.");
        }

        songNumber = currentSongArray.length;
        playedNumber = playedSongArray.length;

        if (playedNumber < songNumber) { ///prevents endless loop
            do {
                currentRandomNumber = randomNumber(songNumber);
                currSong = titleCategory + currentRandomNumber;
                //console.log(currSong);

            }
            while (playedSongArray.indexOf(currSong) > -1);
            if (playedSongArray.indexOf(currSong) > -1) {
                //console.log("Duplicate found!", currSong);
            };

            presentTitles();
        };
    } else {

        playAllSongs();
    }
};

function presentTitles() {

    let categoryEntry = currentSongArray[currentRandomNumber - 1];
    document.getElementById("answer1").innerText = categoryEntry[1];
    document.getElementById("answer2").innerText = '"' + categoryEntry[2] + '"';

    keepTrackOfPlayedSongs(titleCategory, currentRandomNumber);


    /* Only works if table showing
         let tab = document.getElementById("songTable");
         if (tab) {
             var rows = tab.getElementsByTagName("tr");
             rows[currentRandomNumber].style.backgroundColor = "red";
         }
    */
    let currentSong = "./music/" + titleCategory + "/" + currentRandomNumber + ".mp3";
    //console.log(currentSong);
    playSong(currentSong);
}




function randomNumber(count) {
    console.log(count, titleCategory);
    console.log(titleCategory.length);
    const rndInt = Math.floor(Math.random() * currentSongArray.length) + 1;
    let fullChosen = titleCategory + count;
    //console.log(playedSongArray);
    let indexOfSong = playedSongArray.indexOf(fullChosen)
        //console.log("Index: ", indexOfSong);

    return rndInt;
    /*
         if (indexOfSong < 0) {
             return rndInt;
         } else {
             randomNumber(count);
         }
    */
};


function playSong(sourceUrl) {


    let checkBox = document.getElementById("showAns");
    let ansBlock = document.getElementById("answers");
    //console.log(sourceUrl);



    if (checkBox.checked == true) {
        ansBlock.style.visibility = "hidden";
        answerButton.textContent = 'Show Answer';
    }

    //console.log(sourceUrl);
    var audio = document.getElementById("player"),
        source = document.getElementById("mp3_src");
    console.log(source);
    source.src = sourceUrl;

    //audio.pause();
    audio.load();
    audio.play();
};



function keepTrackOfPlayedSongs(cat, numb) {
    playedSongArray.push(cat + numb);
    console.log(playedSongArray);
    playedNumber = playedNumber + 1; ///shim to get count correct
    document.getElementById("songsPlayed").innerText = playedNumber;
    document.getElementById("songsRemaining").innerText = songNumber - playedNumber;
    //console.log("keep track; ", songNumber, playedNumber);



    if (playedNumber === songNumber) {
        console.log("All songs played.");
        let playButton = document.getElementById("playASong");
        playButton.textContent = "All Songs Played";
        document.getElementById("answer1").innerText = "All songs played";
        document.getElementById("answer2").innerText = "";

        return;
    }

};

function drawTableAddHeaders(obj, headers, target) {

    document.getElementById(target).innerHTML = '';

    var tbody = document.getElementById(target);
    //set some basic styling -- but better done in CSS
    tbody.innerHTML = '';
    tbody.border = "1";
    tbody.padding = "1";
    var columnCount = headers.length;
    var row = tbody.insertRow(-1);
    //set the headers
    for (var i = 0; i < columnCount; i++) {
        var headerCell = document.createElement("TH");
        headerCell.innerHTML = headers[i];
        row.appendChild(headerCell);
    }
    // loop through data source
    for (var i = 0; i < obj.length; i++) {
        var tr = document.createElement("tr");

        for (var colName in obj[i]) {
            var td = document.createElement("td");
            td.innerHTML = obj[i][colName];

            tr.appendChild(td);

        }
        tbody.appendChild(tr);
    }

    //getRowNumber();
    // tryNumber();
};

function tablePlay(e) {
    console.log(songNumber, playedNumber);
    var node = e.target;
    while (node && node.tagName !== "TR") {
        if (node.tagName === "TD" || node.tagName === "TH") {
            //console.log("The cell's index is " + node.cellIndex);
        }
        node = node === node.tagName === "TABLE" ? null : node.parentNode;
    }
    if (node) {
        console.log("Row's index is " + node.rowIndex);
        let tab = document.getElementById("songTable");
        var rows = tab.getElementsByTagName("tr");
        rows[node.rowIndex].style.backgroundColor = "red";
        //console.log(titleCategory[node.rowIndex - 1]);
        ///playSong(node.rowIndex);
        songNumber = currentSongArray.length;
        playedNumber = playedSongArray.length;
        console.log("table: ", songNumber, playedNumber)

        playSong("../music/" + titleCategory + "/" + node.rowIndex + ".mp3");
        keepTrackOfPlayedSongs(titleCategory, node.rowIndex);
    }
};

function resetButtonColors(butID) {
    console.log(butID);
    let buttons = document.getElementsByClassName('decadeButton');

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.backgroundColor = '#008CBA';
    };

    document.getElementById(butID).style.backgroundColor = "darkred";

};