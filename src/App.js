import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Header from './Component/Header';
import Home from './Pages/Home';
import Tools from './Pages/Tools';
import Trade from './Pages/Trade';
import Multichart from './Pages/Multichart';
import About from './Pages/About';
import Advertise from './Pages/Advertise';
import Premium from './Pages/Premium';
// import Ape from './Pages/Ape';
import Trending from './Pages/Trending';
import Tokens from './Pages/Tokens';
import RugCheck from './Pages/RugCheck';
import Ape from './Pages/Ape';
import ExternalTools from './Pages/ExternalTools';
import SniperWatcher from './Pages/SniperWatcher';
import Toilet from './Pages/Toilet';

import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/tools" exact component={Tools} />
          <Route path="/premium" exact component={Premium} />
          <Route path="/swap" exact component={Trade} />
          <Route path="/promote" component={Advertise} />
          <Route path="/multichart" exact component={Multichart} />
          <Route path="/about" exact component={About}/>
          <Route path="/trending" exact component={Trending}/>
          <Route path="/rugcheck" exact component={RugCheck}/>
          <Route path="/external-tools" exact component={ExternalTools}/>
          <Route path="/ape" exact component={Ape}/>
          <Route path="/sniper-watcher" exact component={SniperWatcher}/>
          <Route path="/toilet" exact component={Toilet}/>
            {/* <Route path="/ape" exact component={Ape}/> */}
          {/* <Route path="/tools" exact component={Tools}/>
          <Route path="/premium" exact component={Premium}/>
          <Route path="/advertise" exact component={Advertise}/> */}
          <Route path="/tokens/:id" exact component={Tokens}/>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App;
