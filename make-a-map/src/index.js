const d3          = require('d3');
const topojson    = require('topojson');

const plotHeight  = 1160;
const plotWidth   = 960;

let svg = d3.select('main').append('svg')
  .attr('width', plotWidth)
  .attr('height', plotHeight);


d3.json('uk.json', (err, ukJson) => {
  if (err) {
    return console.error('ERROR IMPORTING UK JSON: ', err);
  }
  console.log(ukJson);
  
  let subunits    = topojson.feature(ukJson, ukJson.objects.subunits);
  let projection  = d3.geo.albers()
                      .center([0, 55.4])
                      .rotate([4.4, 0])
                      .parallels([50, 60])
                      .scale(6000)
                      .translate([plotWidth / 2, plotHeight / 2]);
  let path        = d3.geo.path().projection(projection);
  
  
  // svg.append('path')
  //   .datum(subunits)
  //   .attr('d', path);
  
  svg.selectAll('.subunit')
    .data(subunits.features)
    .enter()
    .append('path')
    .attr('class', (d) => {
      return `subunit ${d.id}`;
    })
    .attr('d', path);
  
  
});
