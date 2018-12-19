nv.addGraph(function() {
  var chart = nv.models.pieChart()
      .x(function(d) { return d.label })
      .y(function(d) { return d.value })
      .showLabels(true);

    d3.select("#chart svg")
        .datum(exampleData())
        .transition().duration(350)
        .call(chart);

  return chart;
});

nv.addGraph(function() {
  var chart = nv.models.pieChart()
      .x(function(d) { return d.label })
      .y(function(d) { return d.value })
      .showLabels(true)     
      .labelThreshold(.05)  
      .labelType("percent")
      .donut(true)         
      .donutRatio(0.35)     
  .growOnHover(false)
      ;

    d3.select("#chart2 svg")
        .datum(exampleData())
        .transition().duration(350)
        .call(chart);

  return chart;
});

//Pie chart example data. Note how there is only a single array of key-value pairs.
function exampleData() {
  return  [
      { 
        "label": "2010",
        "value" : "65.689"
      } , 
      { 
        "label": "2011",
        "value" : "61.701"
      } , 
      { 
        "label": "2012",
        "value" : "48.660"
      } , 
      { 
        "label": "2013",
        "value" : "44.263"
      } , 
      { 
        "label": "2014",
        "value" : "24.704"
      } , 
      { 
        "label": "2015",
        "value" : "26.770"
      } , 
      { 
        "label": "2016",
        "value" : "25.956"
      }
    ];
}
