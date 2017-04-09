var view = {
    "loading": '<span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>',
    "giphyindex": 0
};

view.resetUI = function(){
    model.log("VIEW: Resetting the UI");
};

view.displayDataQuestions = function(){
    var html = '<div class="list-group">';
    for(var i=0; i<model.activeDataSet.length; i++){

            html += '<a href="#" data-index='+i+' class="list-group-item data-question">';
            model.log(model.activeDataSet[i].question);
            html += model.activeDataSet[i].question;
            html += "</a>";

    }
    html += "</div>";
    $("#panel-side-content").html(html);
    
    //setup listeners
    $(".data-question").click(function(e){
        var index = $(this).data('index');
        //alert("question clicked: " + index);  
        controller.selectQuestion(index);
    });
}


view.displayGiphyInfo = function(keywords){
    //grab the first giphy in the index
    var giphyurl = model.activeGiphyData.data[view.giphyindex].images.original.url;

    //update the css with the gif
    //$("#panel-main-content").css("background-image","url("+giphyurl+")");
    $("#image-content").html('<img width="100%" height="100%" src="'+giphyurl+'"/>');
    
    //populate the textfield for keywords
    if(keywords != undefined){
        $("#giphykeywords").val(keywords);
    }
};

view.displayGiphyInfo2 = function(keywords){
    //grab the first giphy in the index
    var giphyurl = model.activeGiphyData.data[view.giphyindex].images.original.url;

    //update the css with the gif
    $("#panel-main-content").css("background-image","url("+giphyurl+")");
    
    //populate the textfield for keywords
    if(keywords != undefined){
        $("#giphykeywords").val(keywords);
    }
};

view.resetGiphyIndex = function(){
    view.giphyindex = 0;
};

view.resetDisplay = function(){
    $("#memewords").val('');
    $("#meme-label").text('');
};


view.updateMemeContent = function(){
    $("#meme-label").text($("#memewords").val());
};


view.displayPie = function(dataObj){
    model.log("VIEW: Displaying pie...");
    
    $('#chart').html("");
    
    //display the chart label
    $("#chart-label").html(dataObj.prevalence + "% of youth in "+dataObj.year+ " said they " + dataObj.question);
    
    //display the chart
    var width = 25;
    var height = 25;
    var radius = Math.min(width, height) / 2;
    var donutWidth = 7; 
    var color = d3.scaleOrdinal(d3.schemeCategory20);
    
    var prevalence = dataObj.prevalence;
    var other = 100 - (dataObj.prevalence);
    
    var dataset = [
      { label: 'Prevalence', percent: prevalence },
      { label: 'Other', percent: other}
    ];
    
    var svg = d3.select('#chart')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(' + (width / 2) +  ',' + (height / 2) + ')');
    
    var arc = d3.arc()
      .innerRadius(radius - donutWidth)
      .outerRadius(radius);

    var pie = d3.pie()
      .value(function(d) { return d.percent; })
      .sort(null);
    
    var path = svg.selectAll('path')
      .data(pie(dataset))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', function(d, i) {
        return color(d.data.label);
      });
    
    path.transition()
    .duration(1000)
    .attrTween('d', function(d) {
        var interpolate = d3.interpolate({startAngle: 0, endAngle: 0}, d);
        return function(t) {
            return arc(interpolate(t));
        };
    });

    /*
    var text=svg.selectAll('text')
      .data(pie(dataset))
      .enter()
      .append("text")
      .transition()
      .duration(200)
      .attr("transform", function (d) {
          return "translate(" + arc.centroid(d) + ")";
      })
      .attr("dy", ".4em")
      .attr("text-anchor", "middle")
      .text(function(d){
          return d.data.percent+"%";
      })
      .style({
          fill:'#ffffff',
          'font-size':'10px'
      });
    
    
    var legendRectSize=20;
    var legendSpacing=7;
    var legendHeight=legendRectSize+legendSpacing;


    var legend=svg.selectAll('.legend')
      .data(color.domain())
      .enter()
      .append('g')
      .attr({
          class:'legend',
          transform:function(d,i){
              //Just a calculation for x and y position
              return 'translate(-35,' + ((i*legendHeight)-65) + ')';
          }
      });
    
    legend.append('rect')
      .attr({
          width:legendRectSize,
          height:legendRectSize,
          rx:20,
          ry:20
      })
      .style({
          fill:color,
          stroke:color
      });

    legend.append('text')
      .attr({
          x:30,
          y:15
      })
      .text(function(d){
          return d;
      }).style({
          fill:'#929DAF',
          'font-size':'14px'
      });
      */
      
};
