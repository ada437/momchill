var controller = {};

controller.initialize = function () {
    model.log("CONTROLLER: Starting...");
    
    view.resetUI();
    controller.setupListeners();
    
    //automatically start by loading first dataset
    controller.getYouthRiskData();
};

controller.setupListeners = function(){
    model.log("CONTROLLER: Setting up listeners...");
    $("#btn-updategiphy").on("click",function(e){
       model.getGiphySearch($("#giphykeywords").val());
    });
    $("#btn-giphyright").on("click",function(){
        controller.nextGiphy("right"); 
    });
    $("#btn-giphyleft").on("click",function(){
        controller.nextGiphy("left"); 
    });
    $("#memewords").on("input", function(){
        view.updateMemeContent(); 
    });
    $("#btn-saveimage").on("click", function(){
        controller.saveImage();
    });
    $("#data-source-selector").on("change", function(){
        controller.selectDataSource();
    });
    $("#btn-clear-keywords").on("click", function(){
        $("#giphykeywords").val('');
    });
};

controller.selectDataSource = function(){
    var datasource = $("#data-source-selector").val();
   
    switch(datasource){
        case "Youth Health":
            controller.getYouthRiskData();
            break;
        case "Community Health":
            controller.getCommunityData();
            break;
    }
    
};

controller.getYouthRiskData = function(){
    model.getYouthRiskData(function(success){
        if(success){
            controller.updateSidePanelQuestions();
        }else{
            alert("For some reason we cannot get the data. Please try again...");
        }
    });
};
controller.getCommunityData = function(){
    model.getCommunityData(function(success){
        if(success){
            controller.updateSidePanelQuestions();
        }else{
            alert("For some reason we cannot get the data. Please try again...");
        }
    });
};

controller.updateSidePanelQuestions = function(){
    view.displayDataQuestions();
    
}

controller.selectQuestion = function(index){
    var questionObj = model.getQuestion(index);
    console.log(questionObj);
    
    //reset display
    view.resetDisplay();
    
    //display the pie chart at bottom w/ legend
    view.displayPie(questionObj);
    
    //automatically display the giphy
    var replaced = questionObj.question.replace(/ /g, '+');
    view.resetGiphyIndex();
    model.getGiphySearch(replaced);
    
    
};

controller.nextGiphy = function(direction){
    model.log("CONTROLLER: Calling the next giphy..["+direction+"].");
    
    //increment the giphy index and call disply again
    if(direction == "right"){
        view.giphyindex++;
    }else{
        view.giphyindex--;
    }
    view.displayGiphyInfo();
};

controller.saveImage = function(){
    model.log("CONTROLLER: Saving image...");
    
    html2canvas($("#panel-main-content"), {
        onrendered: function(canvas) {
            theCanvas = canvas;
            document.body.appendChild(canvas);

            // Convert and download as image 
            Canvas2Image.saveAsPNG(canvas); 
            $("#img-out").append(canvas);
            // Clean up 
            //document.body.removeChild(canvas);
        }
    });
};





