import React    from 'react';
import ReactDOM from 'react-dom';

import H1BGraph from './components/H1BGraph';

ReactDOM.render(
  <H1BGraph url="h1bs.csv" />,
  document.querySelectorAll('.h1bgraph')[0]
);
