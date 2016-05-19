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
  
  svg.append('path')
    .datum(topojson.mesh(ukJson, ukJson.objects.subunits, (a, b) => {
      return a !== b && a.id !== 'IRL';
    }))
    .attr('d', path)
    .attr('class', 'subunit__boundary');
    
  svg.append('path')
    .datum(topojson.mesh(ukJson, ukJson.objects.subunits, (a, b) => {
      return a === b && a.id === 'IRL';
    }))
    .attr('d', path)
    .attr('class', 'subunit__boundary IRL');  
  
  svg.append('path')
    .datum(topojson.feature(ukJson, ukJson.objects.places))
    .attr('d', path)
    .attr('class', 'place');
  
  svg.selectAll('.place__label')
    .data(topojson.feature(ukJson, ukJson.objects.places).features)
    .enter()
    .append('text')
    .attr('class', 'place__label')
    .attr('transform', (d) => {
      return `translate(${projection(d.geometry.coordinates)})`;
    })
    .attr('dy', '.35em')
    .attr('x', (d) => {
      return d.geometry.coordinates[0] > -1 ? 6 : -6;
    })
    .attr('text-anchor', (d) => {
      return d.geometry.coordinates[0] > -1 ? 'start' : 'end';
    })
    .text((d) => {
      return d.properties.name;
    });
  

  
});


/** 
* QUESTIONS:
* Difference between data and datum?
* what does topojson do in general?
* what do feature and mesh do exactly?
*/
