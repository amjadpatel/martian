import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Create from './components/Create.js';
import Schedule from './components/Schedule';
import 'reactjs-toastr/lib/toast.css';
import $ from 'jquery';



ReactDOM.render(

  <Router>
      <div>
        <Route exact path='/' component={App} />
        <Route path='/create' component={Create} />
        <Route path='/schedule/' component={Schedule} />
      </div>
  </Router>,
  document.getElementById('root')
);
registerServiceWorker();
