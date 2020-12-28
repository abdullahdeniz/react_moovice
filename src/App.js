import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import Discover from './components/Discover';
import DiscoverBattle from './components/DiscoverBattle';
import PopularBattle from './components/PopularBattle';
import Popular from './components/Popular';
import MyList from './components/MyList';

import './bootstrap-grid.min.css';
import './App.css';

class App extends React.Component {

  render() {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">This week</Link>
              </li>
              <li>
                <Link to="/battle">This week Battle</Link>
              </li>
              <li>
                <Link to="/popular">Popular</Link>
              </li>
              <li>
                <Link to="/popular-battle">Popular Battle</Link>
              </li>
              <li>
                <Link to="/my-list/">My List</Link>
              </li>
            </ul>
          </nav>
          <AnimatedSwitch
            atEnter={{ opacity: 0 }}
            atLeave={{ opacity: 0 }}
            atActive={{ opacity: 1 }}
            className="switch-wrapper">
            <Route path="/popular" component={Popular} />
            <Route path="/popular-battle" component={PopularBattle} />
            <Route path="/my-list/" component={MyList} />
            <Route path="/battle" component={DiscoverBattle} />
            <Route path="/" component={Discover} />
          </AnimatedSwitch>
        </div>
      </Router>
    );
  }
}

export default App;