import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Header from './Header';
import Home from '../Pages/Home';
import Tools from '../Pages/Tools';
import Trade from '../Pages/Trade';
import Multichart from '../Pages/Multichart';
import About from '../Pages/About';
import Advertise from '../Pages/Advertise';
import Premium from '../Pages/Premium';
import Trending from '../Pages/Trending';
import Tokens from '../Pages/Tokens';
import RugCheck from '../Pages/RugCheck';
import Ape from '../Pages/Ape';
import ExternalTools from '../Pages/ExternalTools';
import SniperWatcher from '../Pages/SniperWatcher';
import Toilet from '../Pages/Toilet';
import PolygonHome from '../Pages/Polygon/PolygonHome';
import PolygonAdvertise from '../Pages/Polygon/PolygonAdvertise';
import KuchainHome from '../Pages/Kuchain/KuchainHome';
import KuchainAdvertise from '../Pages/Kuchain/KuchainAdvertise';
import networkInfo from '../constants/networkInfo.json';
import { connectType } from '../constants';
import { networkValue } from '../constants';
import {
  BscConnector,
  UserRejectedRequestError,
} from '@binance-chain/bsc-connector'
import {
  ConnectionRejectedError,
  UseWalletProvider,
} from 'use-wallet'

function Layout() {
  let localChainId = parseInt(localStorage.getItem("PoocoinChainId"));
  let [connectId, setConnectId] = useState(connectType.metamask);

  const connectHandle = (connect) => {
    setConnectId(connect);
  }

  const changeNetworkHandle = (chainId_) => {
    setID(chainId_);
    localStorage.setItem("PoocoinChainId", chainId_);
  }

  if (localChainId == null || isNaN(localChainId)) {
    localChainId = networkValue.Binance;
    localStorage.setItem("PoocoinChainId", localChainId);
  }

  let [chainId, setID] = useState(localChainId);

  let rpcUrl;
  networkInfo.forEach(network => {
    if (network.chainId == chainId) {
      rpcUrl = network.rpc;
    }
  });

  let connector;
  if (connectId == connectType.metamask) {
    connector = ({
      walletconnect: { rpcUrl: rpcUrl }
    })
  } else if (connectId == connectType.walletconnect) {
    connector = ({
      walletconnect: { rpcUrl: 'https://<Ethereum JSON RPC endpoint>' }
    })
  } else if (connectId == connectType.binance) {
    connector = ({
      bsc: {
        web3ReactConnector() {
          return new BscConnector({ supportedChainIds: [56, 97] })
        },
        handleActivationError(err) {
          if (err instanceof UserRejectedRequestError) {
            return new ConnectionRejectedError()
          }
        },
      },
    })
  }
  return (
    <React.Fragment>
      <UseWalletProvider
        chainId={parseInt(chainId)}
        connectors={connector}
      >
        <BrowserRouter>
          <Header networkChainId={chainId} changeNetwork={changeNetworkHandle} connectControl={connectHandle} />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/tools" exact component={Tools} />
            <Route path="/premium" exact component={Premium} />
            <Route path="/swap" exact component={Trade} />
            <Route path="/promote" component={Advertise} />
            <Route path="/multichart" exact component={Multichart} />
            <Route path="/about" exact component={About} />
            <Route path="/trending" exact component={Trending} />
            <Route path="/rugcheck" exact component={RugCheck} />
            <Route path="/external-tools" exact component={ExternalTools} />
            <Route path="/ape" exact component={Ape} />
            <Route path="/sniper-watcher" exact component={SniperWatcher} />
            <Route path="/toilet" exact component={Toilet} />
            <Route path="/tokens/:id" exact component={Tokens} />
            <Route path="/polygon" exact component={PolygonHome} />
            <Route path="/polygonpromote" exact component={PolygonAdvertise} />
            <Route path="/kuchain" exact component={KuchainHome} />
            <Route path="/kuchainpromote" exact component={KuchainAdvertise} />
          </Switch>
        </BrowserRouter>
      </UseWalletProvider>
    </React.Fragment>
  )
}

export default Layout;
