const allCategories = [
    [disney, 'disneySongs', 'Disney'],
    [sixties, 'sixtiesSongs', 'Sixties'],
    [seventies, 'seventiesSongs', 'Seventies'],
    [eighties, 'eightiesSongs', 'Eighties'],
    [nineties, 'ninetiesSongs', 'Nineties'],
    [twoThousands, 'twoThousandsSongs', '2000s'],
    [twentyTens, 'twentyTenSongs', '2010s'],
    [twentyTwenties, 'twentyTwentiesSongs', '2020s'],
    [rock, 'rockSongs', 'Rock'],
    [protest, 'protestSongs', 'Protest'],
    [covers, 'coverSongs', "Covers"]
];
let allCatLen = allCategories.length;
let arraysLength = getAllArraysLength();
let currentSong = "";

function getAllArraysLength() {
    let len = 0;
    for (a = 0; a < allCatLen; a++) {
        len = len + allCategories[a][0].length;

    };

    return len;
};



function getUnusedItem() {

    let catNum = getRandom(allCatLen);
    let itemNum = getRandom(allCategories[catNum][0].length);
    let chosenTitleArray = allCategories[catNum][0];
    let chosenSongArray = allCategories[catNum][1];
    let chosenCatName = allCategories[catNum][2];
    let chosenItem = itemNum + 1;
    let chosenGroupAndSong = chosenSongArray + chosenItem;

    let itemIndex = playedSongArray.indexOf(chosenGroupAndSong);
    let chosenTitles = chosenTitleArray[chosenItem - 1];

    currentSong = "./music/" + chosenSongArray + "/" + chosenItem + ".mp3";

    if (itemIndex < 0) {

        keepTrackOfPlayedSongs(chosenSongArray, chosenItem);

        //let categoryEntry = chosenTitles;
        document.getElementById("answer1").innerText = chosenTitles[1];
        document.getElementById("answer2").innerText = '"' + chosenTitles[2] + '"';
        document.getElementById("songsPlayed").innerText = playedSongArray.length;
        document.getElementById("songsRemaining").innerText = arraysLength - playedSongArray.length;

        showInstructions(chosenCatName);
        getTitles(chosenSongArray, catNum, itemNum, arraysLength);

        return currentSong;
    } else {
        console.log("Rejected: " + currentSong);


    }

};

function playAllSongs() {

    let newItem;
    let myPromise = new Promise(function(myResolve, myReject) {

        console.log(playedSongArray.length + " songs played so far/", arraysLength);

        if (playedSongArray.length < arraysLength) {
            let playButton = document.getElementById("playASong");
            playButton.textContent = "Play a Song";
            do {
                newItem = getUnusedItem();
            } while (newItem === undefined);
            myResolve(); // when successful
            //myReject(); // when error   
        } else {
            console.log("All done");
            document.getElementById("answer1").innerText = "All songs played";
            document.getElementById("answer2").innerText = "";

            //let playButton = document.getElementById("playASong");
            playButton.textContent = "All Songs Played";
            return;
        }
    });
    myPromise.then(
        function(value) {
            playSong(currentSong);
        } //,
        //function(error) {
        //    console.log(myReject);
        //}
    );

};

function getRandom(num) {
    let randNum = Math.floor(Math.random() * num);
    return randNum;
};



function getTitles(songCat, songCatNum, currRand, allLength) {
    console.log("Alllength: ", allLength);

    let titleGroup = allCategories[songCatNum][0][currRand];

    document.getElementById("answer1").innerText = titleGroup[1];
    document.getElementById("answer2").innerText = '"' + titleGroup[2] + '"';


    let catMax = allCategories[songCatNum][0].length;
    let playedCategoryCount = getPlayedCategoryCount(songCat, catMax);

    playedNumber = playedSongArray.length;
    document.getElementById("songsPlayed").innerText = playedNumber;
    document.getElementById("songsRemaining").innerText = allLength - playedNumber;
    console.log(playedCategoryCount, songCat, catMax);
};

function getPlayedCategoryCount(cat, catMax) {

    let playedCount = 0;
    for (j = 0; j < playedSongArray.length; j++) {

        if (playedSongArray[j].includes(cat)) {
            playedCount++;
        }

    }
    // console.log(cat, playedCount, catMax);

    if (playedCount >= catMax) {
        // chooseACategory();
        console.log("All Category Played? ", playedCount, catMax)
    } else {
        return cat;
    }

};

function showInstructions(categ) {
    console.log(categ);
    if (categ.includes("Disney")) {
        document.getElementById("instructions1").innerText = categ;
        document.getElementById("instructions2").innerText = "Name the song and the movie";
    } else if (categ.includes("Cover")) {
        document.getElementById("instructions1").innerText = categ + ": Name the song and ORIGINAL artist";
        document.getElementById("instructions2").innerText = "(Bonus point for naming the covering artist.)";
    } else {
        document.getElementById("instructions1").innerText = categ;
        document.getElementById("instructions2").innerText = "Name the song and the artist";
    }

};