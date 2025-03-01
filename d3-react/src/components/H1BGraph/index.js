import React, { Component } from 'react';
import d3 from 'd3';
import Histogram from '../Histogram';

class H1BGraph extends Component {
  constructor() {
    super();
    this.state = {
      rawData: [],
    };
  }
  componentWillMount() {
    this.loadRawData();
  }
  loadRawData() {
    let dateFormat = d3.time.format('%m/%d/%Y');
    
    d3.csv(this.props.url)
      .row((d) => {
        if (!d['base salary']) {
          return null;
        }
        return {
          employer:         d.employer,
          submit_date:      dateFormat.parse(d['submit date']),
          start_date:       dateFormat.parse(d['start date']),
          case_status:      d['case status'],
          job_title:        d['job title'],
          // clean_job_title:  this.cleanJobs(d['job title']),
          base_salary:      Number(d['base salary']),
          salary_to:        d['salary to'] ? Number(d['salary to']) : null,
          city:             d.city,
          state:            d.state,
        };
      })
      .get((err, rows) => {
        if (err) {
          console.error(err.stack);
          console.error(err);
        } else {
          this.setState({ rawData: rows });
        }
      });
  }
  render() {
    if (!this.state.rawData.length) {
      return (
        <h2>Loading data</h2>
      );
    }
    let fullWidth = 700;
    let params = {
      bins: 20,
      width: 500,
      height: 500,
      axisMargin: 83, 
      topMargin: 10, 
      bottomMargin: 5,
      value: (d) => d.base_salary,
    };
    
    return (
      <div>
        <svg width={fullWidth} height={params.height}>
          <Histogram {...params} data={this.state.rawData} />
        </svg>
      </div>
    );
  }
}

H1BGraph.propTypes = {
  url: React.PropTypes.string,
};

export default H1BGraph;
