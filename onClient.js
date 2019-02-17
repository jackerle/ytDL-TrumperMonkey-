// ==UserScript==
// @name         youtubeDownloader
// @namespace    https://www.youtubeinmp3.com
// @version      1.2.2
// @description  Adds a download button to YouTube videos which allows you to download the MP3 of the video without having to leave the page
// @author       Arari
// @include      http*://*.youtube.com/*
// @include      http*://youtube.com/*
// @include      http*://*.youtu.be/*
// @include      http*://youtu.be/*
// @run-at       document-end
// ==/UserScript==
'use strict';




var currentLocation = window.location.href;
console.log(currentLocation);
function polymerInject(){

    /* Create button */
    var buttonDiv = document.createElement("div");
    buttonDiv.style.width = "100%";
    buttonDiv.id = "parentButton";

    var addForm = document.createElement("form");
    var url = window.location.href
    var param = url.substring((url.indexOf("watch?v="))+8)
    addForm.action = 'http://localhost:3000/downlaod'

    var s_param = document.createElement("input");
    s_param.type = "hidden"
    s_param.name = "param"
    s_param.value= String(param)
    addForm.appendChild(s_param)


    var addButton = document.createElement("input");
    addButton.appendChild(document.createTextNode("Download"));


    addButton.style.width = "100%";
    addButton.style.backgroundColor = "#181717";
    addButton.style.color = "white";
    addButton.style.textAlign = "center";
    addButton.style.padding = "10px 0";
    addButton.style.marginTop = "5px";
    addButton.style.fontSize = "14px";
    addButton.style.border = "0";
    addButton.style.cursor = "pointer";
    addButton.style.borderRadius = "2px";
    addButton.style.fontFamily = "Roboto, Arial, sans-serif";
    addButton.type = "submit"
    addButton.value = "sendParam"

    addForm.appendChild(addButton);
    buttonDiv.appendChild(addForm);

    /* Find and add to target */
    var targetElement = document.querySelectorAll("[id='subscribe-button']");

    for(var i = 0; i < targetElement.length; i++){

        if(targetElement[i].className.indexOf("ytd-video-secondary-info-renderer") > -1){

            targetElement[i].appendChild(buttonDiv);

        }

    }

    /* Fix hidden description bug */
    var descriptionBox = document.querySelectorAll("ytd-video-secondary-info-renderer");
    if(descriptionBox[0].className.indexOf("loading") > -1){

        descriptionBox[0].classList.remove("loading");

    }

}
function run(){

    if(!document.getElementById("parentButton") && window.location.href.substring(0, 25).indexOf("youtube.com") > -1 && window.location.href.indexOf("watch?") > -1){

        var parentButton = document.createElement("div");

        parentButton.className = "yt-uix-button yt-uix-button-default";
        parentButton.id = "parentButton";

        parentButton.style.height = "23px";
        parentButton.style.marginLeft = "28px";
        parentButton.style.paddingBottom = "1px";

        parentButton.onclick = function () {

            this.remove();


        };

        document.getElementById("watch7-user-header").appendChild(parentButton);

        var childButton = document.createElement("span");
        childButton.appendChild(document.createTextNode("Download MP3"));
        childButton.className = "yt-uix-button-content";

        childButton.style.lineHeight = "25px";
        childButton.style.fontSize = "12px";

        parentButton.appendChild(childButton);

    }

}if(document.getElementById("polymer-app") || document.getElementById("masthead") || window.Polymer){

    setInterval(function(){

        if(window.location.href.indexOf("watch?v=") < 0){

            return false;

        }

        if(document.getElementById("count") && document.getElementById("parentButton") === null){

            polymerInject();


        }

    }, 100);

}

else{



}