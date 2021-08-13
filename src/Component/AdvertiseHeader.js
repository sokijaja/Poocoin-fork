import { React, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import '../css/advertise.css';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
const useStyles = makeStyles((theme) => ({
    HeaderBtn: {
        marginLeft: '.25rem!important',
        backgroundColor: '#262626',
        borderRadius: '.25rem!important',
        boxShadow: 'inset 0 1px 0 hsl(0deg 0% 100% / 15%), 0 1px 1px rgb(0 0 0 / 8%)',
        lineHeight: 1,
        textTransform: 'none',
        padding: '0px'
    },
    aTag: {
        padding: '11px'
    }
}));
export default function AdvertiseHeader() {
    const classes = useStyles();
    let location = useLocation();
    const [alignment, setAlignment] = useState();
    if (alignment == undefined) {
        if (location.pathname == '/promote/banners') {
            setAlignment('1');
        } else if (location.pathname == "/promote/un-vetted") {
            setAlignment('2');
        } else if (location.pathname == '/promote/vetted') {
            setAlignment('3');
        } else if (location.pathname == '/promote/pricebot/poocoin') {
            setAlignment('4');
        } else if (location.pathname == '/promote/pricebot/achtools') {
            setAlignment('4');
        } else if (location.pathname == '/promote/audits/shield-network') {
            setAlignment('5');
        } else if (location.pathname == '/promote/audits/ctdsec') {
            setAlignment('5');
        }
    }
    const handleAlignment = (event, newAlignment) => {
        if (newAlignment !== null) {
            setAlignment(newAlignment);
        }
    };
    return (
        <div style={{ marginBottom: '1rem' }}>
            <Card className={'Card'} style={{ textAlign: 'left', color: 'white' }}>
                <ToggleButtonGroup
                    exclusive
                    value={alignment}
                    onChange={handleAlignment}
                    aria-label="text alignment"
                >
                    <ToggleButton className={classes.HeaderBtn} value="1" aria-label="left aligned">
                        <Link className={classes.aTag} to="/promote/banners">Banner Ads</Link>
                    </ToggleButton>
                    <ToggleButton className={classes.HeaderBtn} value="2" aria-label="centered">
                        <Link className={classes.aTag} to="/promote/un-vetted">Un-Vetted List</Link>
                    </ToggleButton>
                    <ToggleButton className={classes.HeaderBtn} value="3" aria-label="right aligned">
                        <Link className={classes.aTag} to="/promote/vetted">Vetted List</Link>
                    </ToggleButton>
                    <ToggleButton className={classes.HeaderBtn} value="4" aria-label="right aligned">
                        <Link className={classes.aTag} to="/promote/pricebot">Telegram Price Bot</Link>
                    </ToggleButton>
                    <ToggleButton className={classes.HeaderBtn} value="5" aria-label="right aligned">
                        <Link className={classes.aTag} to="/promote/audits">Audits</Link>
                    </ToggleButton>
                </ToggleButtonGroup>
            </Card>
        </div >
    )
}
