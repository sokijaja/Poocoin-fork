import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import AdvertiseHeader from '../Component/AdvertiseHeader';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Banners from './Advertise/Banners';
import UnVetted from './Advertise/UnVetted';
import Vetted from './Advertise/Vetted';
import Telegram from './Advertise/Telegram';
import Audits from './Advertise/Audits';
const useStyles = makeStyles((theme) => ({
    title: {
        color: 'white',
        fontSize: '2.5rem',
        fontWeight: '700',
        marginBottom: '1rem'
    }
}));

export default function Advertise() {
    const classes = useStyles();

    return (
        <div className={'AdvertiseBody'}>
            <h1 className={classes.title}>
                Promote your token
            </h1>

            <Router>
                <AdvertiseHeader />
                <Switch>
                    <Route path="/promote" exact>
                        <Redirect to="/promote/banners" />
                    </Route>
                    <Route path="/promote/banners" exact component={Banners} />
                    <Route path="/promote/un-vetted" exact component={UnVetted} />
                    <Route path="/promote/vetted" exact component={Vetted} />
                    <Route path="/promote/pricebot" component={Telegram} />
                    <Route path="/promote/audits" component={Audits} />
                </Switch>
            </Router>
        </div>
    )
}
