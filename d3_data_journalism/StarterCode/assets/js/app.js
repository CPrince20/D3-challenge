const w = 600;
const h = 600;
const padding = 60;

d3.csv("assets/data/data.csv", function (d) {
    return [
        +d['poverty'],
        +d['smokes'],
        d['abbr']
    ]
    }).then(plotData);

function plotData(data) {
    const xMin = 8;
    const xMax = 24;
    const yMin = 8;
    const yMax = 28;

    const xLinearScale = d3.scaleLinear().domain([xMin, xMax]).range([padding, w - padding]);
    const yLinearScale = d3.scaleLinear().domain([yMin, yMax]).range([h - padding, padding]);
    var dataInRange = [];
    data.forEach(function (e) {
        if (e[0] >= xMin && e[0] <= xMax) {
            dataInRange.push(e);
        };
    });
    console.log(dataInRange)
    const svg = d3.select("#scatter").append('svg').attr('width', w).attr('height', h);

    svg.selectAll("circle").data(dataInRange).enter().append("circle")
    .attr("cx", d => xLinearScale(d[0]))
    .attr("cy", d => yLinearScale(d[1]))
    .attr("r", 8.5)
    .attr("fill", "#779ecb")
    

    svg.append('g')
    .style('font-size', '12px')
    .attr('transform', 'translate(0,' + (h - padding) + ')')
    .call(d3.axisBottom(xLinearScale));

    svg.append('text')
    .attr('x', w/2)
    .attr('y', h - 15)
    .attr('text-anchor', 'middle')
    .style('font-family', 'sans-serif')
    .text('Poverty (%)');

    svg.append('g')
    .style('font-size', '12px')
    .attr('transform', 'translate(' + padding + ',0)')
    .call(d3.axisLeft(yLinearScale));

    svg.append('text')
    .attr('text-anchor', 'middle')
    .attr('transform', 'translate(15,' + h/2 + ')rotate(-90)')
    .style('font-family', 'sans-serif')
    .text('Smoker (%)');

    svg.selectAll("text")
    .data(dataInRange)
    .enter()
    .append("text")
    
    .attr("x", function(d) {
            return xLinearScale(d[0]);
    })
    .attr("y", function(d) {
            return yLinearScale(d[1]);
    })
    .text(function(d) {
        return d[2];
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "15px")
    .attr("fill", "black");
};