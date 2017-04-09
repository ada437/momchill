var model = {
    "log": function(str){
        console.log(str);
    },
    "activeDataSet": {},
    "activeGiphyData": {}
};



model.getYouthRiskData = function(caller){
    model.log("MODEL: getYouthRiskData() called...");
    
    $.ajax({
        url: "https://data.cityofnewyork.us/resource/6buc-vtir.json",
        type: "GET",
        data: {
          "$limit" : 5000,
          "$$app_token" : "qp1tLQ012yji1coh4y65jg28L"
        }
    }).done(function(data) {
        model.activeDataSet = data;
        caller(true);
    });
};

model.getCommunityData = function(caller){
    model.log("MODEL: getCommunityData() called...");
    
    $.ajax({
        url: "https://data.cityofnewyork.us/resource/hw9t-9zpc.json",
        type: "GET",
        data: {
          "$limit" : 5000,
          "$$app_token" : "qp1tLQ012yji1coh4y65jg28L"
        }
    }).done(function(data) {
        model.activeDataSet = data;
        caller(true);
    });
};


//needs some error handling....
model.getQuestion = function(index){    
    return model.activeDataSet[index];
};

model.getGiphySearch = function(keywords){
    model.log("MODEL: Searching for keywords: " + keywords);
    
    $.ajax({
        url: "http://api.giphy.com/v1/gifs/search?q="+keywords+"&api_key=dc6zaTOxFJmzC&rating=pg",
        type: "GET",
        data: {}
    }).done(function(data) {
        model.log(data);
        model.activeGiphyData = data;
        view.displayGiphyInfo(keywords);
    });
};