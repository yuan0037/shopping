var listOfItems= new Array();
var listOfItemIDs=new Array();

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');

    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
//        var listeningElement = parentElement.querySelector('.listening');
//        var receivedElement = parentElement.querySelector('.received');
//
//        listeningElement.setAttribute('style', 'display:none;');
//        receivedElement.setAttribute('style', 'display:block;');

       // console.log('Received Event: ' + id);
    }
};



$(document).ready(function(){
    document.addEventListener("deviceready", mySetup, false);
      
});

function mySetup(){
       //console.log("device ready");
        $("#shoppingList").append("<ul id=\"listItem\"></ul>");
        $("#addToList").click(addItemToList);
        showListFromStorage();
}
//$(document).ready(function(){
//        console.log("device ready");
//        $("#shoppingList").append("<ul id=\"listItem\"></ul>");
//        $("#addToList").click(addItemToList);
//        showListFromStorage();
//});

function showListFromStorage(){    
    var tempResult= localStorage.getItem("grocery-yuan0037");
    //console.log(tempResult);
    if (tempResult)
    {
        listOfItems = JSON.parse(tempResult);
        for (i=0; i<=listOfItems.length-1; i++)
        {
            $("#listItem").append("<li positionID="+i+">"+"<img positionID=\""+i+"\" id=\"delete\" src=\"img/delete.png\"><span>"+listOfItems[i]+"</span></li>");
        }
    }
    
    $("li").click(checkItem);
    $("img#delete").click(deleteItem);
}

function checkItem(ev){
//   console.log("check happened");
//    console.log("this="+$(this));
    $(this).toggleClass("selected");
}

function deleteItem(ev){
    //console.log("delete id="+ev.currentTarget.getAttribute("positionID"));
    $("li[positionID="+ev.currentTarget.getAttribute("positionID")+"]").hide();    

    saveToStorage();

}

function saveToStorage(){
    
    var currentListOfItemValues=$("li:visible span");
    var tempCount=currentListOfItemValues.length;
    var toSaveItemArray=new Array();
    for (i=0;i<=tempCount-1;i++)
    {
        toSaveItemArray.push(currentListOfItemValues[i].innerHTML);
    }
   localStorage.setItem("grocery-yuan0037", JSON.stringify(toSaveItemArray)); 
}
function addItemToList()
{
    currentTotalCount=$("li").length;
    
    $("#listItem").append("<li positionID="+currentTotalCount+">"+"<img positionID=\""+currentTotalCount+"\" id=\"delete\" src=\"img/delete.png\"><span>"+$("#itemName").val()+"</span></li>");
    
  
    
    $("img[positionID="+currentTotalCount+"]").filter("#delete").click(deleteItem);
    $("img[positionID="+currentTotalCount+"]").filter("#accept").click(checkItem);
   $("li[positionID="+currentTotalCount+"]").click(checkItem);
    saveToStorage();

    $("#itemName").val("");
    

}
app.initialize();
