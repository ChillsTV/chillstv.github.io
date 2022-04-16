
var videoDB  = '';
var currentVideoID = '';



var sendURL = 'https://script.google.com/macros/s/AKfycbyBSAC1EZmJ0XvLi7JB8TtrWmbGFszdc3C5Y1Lezb6-_HkVG41JaYnaYO7OFn-NK3Lu/exec' ;
//var DBURL = 'https://script.google.com/macros/s/AKfycbyJdaqDtzAFYNRj5N4fl6JZxgK0df2uqlODYvbTfbzDCc90N1Ct30z1enoD3YGl4ztTeQ/exec';
var DBURL = 'https://script.google.com/macros/s/AKfycbxn0A1pw0ZWSPZpVNRXzDbecgOpMDfSfyUCvGf1HUTKAGaqKC3W3_wEaC-ZcD-69pVcDw/exec' ;


var thresh = 10; // ViewCounts per video
var disableKeyboard = 1;
var displayControls = 0;
var sequence = 0 ; // 0 for Random and 1 for Sequential

var divForm0 = document.getElementById("div_instructions");
var divForm1 = document.getElementById("div_demograph_form");
var divForm2 = document.getElementById("div_ocean_form");
var divForm3 = document.getElementById("div_affective_form");
var divYTPlayer = document.getElementById("ytplayer"); // Form 4
var divForm5 = document.getElementById("div_post_form");
var divFinal = document.getElementById("div_final");

var gotoForm1Button = document.getElementById("form0");
var gotoForm2Button = document.getElementById("form2");
var gotoForm3Button = document.getElementById("form3");
var gotoForm4Button = document.getElementById("form4");
var gotoForm5Button = document.getElementById("form5");
var sendButton = document.getElementById("sendData");

var form1 = document.getElementById('demograph_form');
var form2 = document.getElementById('ocean_form');
var form3 = document.getElementById('affective_form');
var form5 = document.getElementById('post_form');

divForm1.style.visibility = "hidden";
divForm2.style.visibility = "hidden";
divForm3.style.visibility = "hidden";
divForm5.style.visibility = "hidden";
divYTPlayer.style.visibility = "hidden";
divFinal.style.visibility = "hidden";


function fetchDB(){
     fetch(DBURL).then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        videoDB=myJson; // DB of videoIDs and ViewCount
        console.log(videoDB); 
        parseDB();
      });
}

function parseDB(){
    thresh = videoDB[1][2]
    disableKeyboard = videoDB[2][2]
    displayControls = videoDB[3][2]
    sequence = videoDB[4][2]

    var i = 0
    while(i == 0){
        i = getRandomInt(videoDB.length)
    }

    if(sequence == 1){
    //For Sequantial
    
    for(let i = 1 ; i < videoDB.length ; i++){
        if(videoDB[i][1] < thresh){
            currentVideoID = videoDB[i][0];
            break;
        }
    }
    }
    else{
    //For Random
        while(videoDB[i][1] >= thresh){
                i = getRandomInt(videoDB.length)
                console.log(i)
                while(i == 0){
                    i = getRandomInt(videoDB.length)
                }
            }
        currentVideoID = videoDB[i][0];
    }        




    
    console.log(currentVideoID);
    //currentVideoID = 'HqbnuVF__wA'
    loadVideo();
    
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function loadVideo(){
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var player;
}

function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
          height: '640',
          width: '720',
          videoId: currentVideoID,
          playerVars: {
            'controls':displayControls, 
            'iv_load_policy':3,
            'disablekb': disableKeyboard,
            'playsinline': 1
          },
          events: {
            'onError' : onPlayerError,  
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
      }

function onPlayerReady(event) {
  //event.target.playVideo();
}

var videoDone = false;

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED && !videoDone) {
          videoDone = true;
          gotoForm5Button.style.visibility = "visible";
    }
}

function onPlayerError(event){
    console.log("EROROROROROROR");
    alert("Sorry, There seems to be an error with the experiment, Please contact experimenters");
    gotoForm5Button.style.visibility = "visible";
}


fetchDB();


var duration = [] ;
var chillsCount = 0 ;


var chillsButton = document.getElementById("clickme");
chillsButton.onclick = function() {
  duration.push(player.playerInfo.currentTime.toFixed(2));
  chillsCount += 1;
  chillsButton.innerHTML = "I felt a chill: " + chillsCount;
  //document.getElementById("p1").innerHTML =  duration ;
};


gotoForm1Button.onclick = function() {
    // divForm0.style.visibility = "hidden";
    // divForm1.style.visibility = "visible";
    // divForm2.style.visibility = "hidden";
    // divForm3.style.visibility = "hidden";
    // divForm5.style.visibility = "hidden";
    // divYTPlayer.style.visibility = "hidden";
    // divFinal.style.visibility = "hidden";

    divForm0.style.visibility = "hidden";
    divForm1.style.visibility = "hidden";
    divForm2.style.visibility = "hidden";
    divForm3.style.visibility = "hidden";
    divForm5.style.visibility = "hidden";
    divYTPlayer.style.visibility = "visible";
    divFinal.style.visibility = "hidden";

    scrollTop();
}

gotoForm2Button.onclick = function() {
    getFormData(form1,1);
    divForm0.style.visibility = "hidden";
    divForm1.style.visibility = "hidden";
    divForm2.style.visibility = "visible";
    divForm3.style.visibility = "hidden";
    divForm5.style.visibility = "hidden";
    divYTPlayer.style.visibility = "hidden";
    divFinal.style.visibility = "hidden";
    scrollTop();
}

gotoForm3Button.onclick = function() {
    getFormData(form2,2);
    divForm0.style.visibility = "hidden";
    divForm1.style.visibility = "hidden";
    divForm2.style.visibility = "hidden";
    divForm3.style.visibility = "visible";
    divForm5.style.visibility = "hidden";
    divYTPlayer.style.visibility = "hidden";
    divFinal.style.visibility = "hidden";
    scrollTop();
}

gotoForm4Button.onclick = function() {
    getFormData(form3,3);
    divForm0.style.visibility = "hidden";
    divForm1.style.visibility = "hidden";
    divForm2.style.visibility = "hidden";
    divForm3.style.visibility = "hidden";
    divForm5.style.visibility = "hidden";
    divYTPlayer.style.visibility = "visible";
    divFinal.style.visibility = "hidden";
    setTimeout(alertMessage, 500);
    scrollTop();
    gotoForm5Button.style.visibility = "hidden";
    document.getElementById("p1").style.visibility = "hidden";
}

gotoForm5Button.onclick = function() {
    divForm0.style.visibility = "hidden";
    divForm1.style.visibility = "hidden";
    divForm2.style.visibility = "hidden";
    divForm3.style.visibility = "hidden";
    divYTPlayer.style.visibility = "hidden";
    divForm5.style.visibility = "visible";
    divFinal.style.visibility = "hidden";
    gotoForm5Button.style.visibility = "hidden";
    scrollTop();
    
}

sendButton.onclick = function() {
    getFormData(form5,5);
    sendData();
    divForm0.style.visibility = "hidden";
    divForm2.style.visibility = "hidden";
    divForm3.style.visibility = "hidden";
    divForm5.style.visibility = "hidden";
    divYTPlayer.style.visibility = "hidden";
    divFinal.style.visibility = "visible";
    gotoForm5Button.style.visibility = "hidden";
    scrollTop();
}


function alertMessage() {
    alert("Welcome to the video page. Please keep your mouse over the 'I felt a chill' button on the right side. When you experience a shiver down your spine please click the button.")
    alert("Please watch the video in its entirety. You will only be able to continue once the video has played until the end. Thank you")
}


//var PID = '';
//var Gender = '';
//var Location = '';
//var Age = '';
//var Profession = '';
//var Ethnicity = '';

var PID = [[]] ;
var OCEAN =[[]] ;
var AFF =[[]] ;
var POST_AFF =[[]] ;

function scrollTop(){
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}


function getFormData(_form, _num){
//    PID = document.getElementById("PID").value;
//    Gender = document.getElementById("gender").value;
//    Location = document.getElementById("location").value;
//    Age = document.getElementById("age").value;
//    Profession = document.getElementById("profession").value;
//    Ethnicity = document.getElementById("ethnicity").value;
//    console.log(Ethnicity);
    var formTemp = [[]];
    var _id = '';
    var _value = '';
    
    for (var i = 0; i < _form.elements.length; i++) {
        _id = _form.elements[i].id;
        _value = _form.elements[i].value;
        formTemp.push([_id,_value]);
        console.log(formTemp);
    }
    
    switch(_num){
        case 1 : PID = formTemp;
        case 2 : OCEAN = formTemp;
        case 3 : AFF = formTemp;
        case 5 : POST_AFF = formTemp;
    }
}

function sendData(){
    
    var data = new FormData();
    data.set('VideoID',currentVideoID);
    data.set('PID',PID);
    data.set('OCEAN',OCEAN);
    data.set('Affective',AFF);
    data.set('Chills',chillsCount);
    data.set('Triggers',duration);
    data.set('Post_Affective',POST_AFF);

    console.log(data);

    let request = new XMLHttpRequest();
    request.open("POST", sendURL, true);
    request.send(data) 
    
}



