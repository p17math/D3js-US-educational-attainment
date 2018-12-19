var margin = 10;
var width = 480,
    height = 300;

var radius = ((Math.min((width - margin), (height - margin)) / 2) * 0.9  ),
		outerRadius = radius - margin,
		innerRadius = 0;
		// innerRadius = 0;

var data = [
      {number: "2010", rate: 1579 },
      {number: "2012", rate: 1860 },
      {number: "2014", rate: 2833},
      {number: "2015", rate: 2710},
			{number: "2016", rate: 2623
}
    ];

var color = d3.scale.ordinal().range([
	'#30a5e3', '#ee5de0', '#d0e868', '#29e3b6', '#2dc7da'
]);


var svg_wraper = d3.select('.chart-wrapper.chart-wrapper_pie')
	.attr('style', 
				'width:'+(width)+'px;'+
				'height:'+(height)+'px')
	.style('margin', '20px auto 0')
  .style('position', 'relative');


var svg = d3.select('#chart-pie')
	.attr("class", "axis chart chart-pie")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  	.attr("transform", "translate(" +(width / 2) + "," + (height / 2 ) + ")");


var tooltip_pie = d3.select('.tooltip.tooltip-pie');

tooltip_pie.append('div', '')
	.attr('class', 'tooltip-pie__title')
	.text('Gross Revenue')
tooltip_pie.append('div', '')
	.attr('class', 'tooltip-pie__value')
	.text('testValue')
tooltip_pie.append('div', '')
	.attr('class', 'tooltip-pie__status')

var tooltip_pie__value = document.querySelector('.tooltip-pie__value');


var arc = d3.svg.arc()
	.outerRadius(outerRadius)
	.innerRadius(innerRadius);

var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { 
			return d.rate; 
		});


var g = svg.selectAll(".arc")
    .data(pie(data))
    .enter()
		.append("g")
      .attr("class", "arc")
			.style("transform", "scale(1.0)")
			.style("opacity", 0.7)

/*
			.on("mouseover", function (d) {
				tooltip_pie__value.textContent = accounting.formatMoney(d.value, '');
				tooltip_pie.style('left', function () {
					return arc.centroid(d)[0] + width / 2 - 65 + 'px';
				});
				tooltip_pie.style('top', function () {
					return arc.centroid(d)[1] + height / 2 - 80 + 'px';
				});
				tooltip_pie.style('opacity', 1);
				
				d3.select(this)
					.transition()
					.duration(200)
					.style("opacity", 1)
					.style("transform", "scale(1.1")
			})
			.on("mouseout", function (d) {
				tooltip_pie.style('opacity', 0);
				
				d3.select(this)
					.transition()
					.duration(200)
					.style("opacity", 0.7)
					.style("transform", "scale(1")
			});

			.on('mouseover', function(){
				d3.selectAll('.arc')
						.classed('arc_active', false)
						.transition()
						.duration(200)
						.style("opacity", 0.7)
						.style("transform", "scale(1")
					
					d3.select(this)
						.classed('arc_active', true)
						.transition()
						.duration(200)
						.style("opacity", 1)
						.style("transform", "scale(1.1")
			})
			.on('mouseout', function(){
				d3.selectAll('.arc')
						.classed('arc_active', false)
						.transition()
						.duration(200)
						.style("opacity", 0.7)
						.style("transform", "scale(1")
			});
*/
			.on("click", function (d) {
				if( this.classList.contains('arc_active') ){
					// tooltip_pie.style('left', '-100%');
					// tooltip_pie.style('top', '-100%');
					tooltip_pie.style('opacity', 0);

					d3.select(this)
						.classed('arc_active', false)
						.transition()
						.duration(200)
						.style("opacity", 0.7)
						.style("transform", "scale(1.1")

				}else {
					tooltip_pie__value.textContent = accounting.formatMoney(d.value, '');
					tooltip_pie.style('left', function () {
						return arc.centroid(d)[0] + width / 2 - 65 + 'px';
					});
					tooltip_pie.style('top', function () {
						return arc.centroid(d)[1] + height / 2 - 80 + 'px';
					});
					tooltip_pie.style('opacity', 1);

					d3.selectAll('.arc')
						.classed('arc_active', false)
						.transition()
						.duration(200)
						.style("opacity", 0.7)
						.style("transform", "scale(1.0)")

					d3.select(this)
						.classed('arc_active', true)
						.transition()
						.duration(200)
						.style("opacity", 1)
						.style("transform", "scale(1.1")
					
				}
			});

 
g.append("path")
	.attr("d", arc)
	.attr("class", 'arc__path')
	.style("fill", function(d) {
	return color(d.data.number);
});



g.append("text")
	.attr("class", function(d) {
		var str = '';
		if(str.replace(/\s/g,'')==''){
    	str = (d.data.number);
		}
		return "arc__text arc__text_"+ (str.replace(/\s+/g,'-')).toLowerCase();
	})
  .attr("transform", function(d) {
    return "translate(" + arc.centroid(d) + ")";
  })
  .style("text-anchor", "middle")
  .style("font-size", "12px")
  .style("fill", "#fff")
  .style("font-weight", "normal")
  .text(function(d) {
    return d.data.number;
  })
