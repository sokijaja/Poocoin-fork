/* eslint-disable no-use-before-define */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import Grid from '@material-ui/core/Grid';
import Tab from '../Component/basic/tab';
import Input from '../Component/basic/input';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Panel from '../Component/multichart/panel';
import rightPoster from '../Images/moonstar3.gif';
import leftPoster from '../Images/leftposter.gif';
import TokenSelect from '../Component/TokenSelect';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import DefaultTokens from '../config/default_tokens.json';
import { storeLocalMultichart } from "../PooCoin/util";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      padding: 0
    },
  },
  input: {
    display: 'none',
  },
  button: {
    margin: theme.spacing(1),
    float: theme.right,
  },
  rightTitle: {
    color: '#ffffff',
    paddingBottom: 10
  },
  inputWidth: {
    width: '100%',
    padding: '20px',
  },
  tabContainer: {
    minHeight: '700px !important'
  },
  leftSide: {
    [theme.breakpoints.down("sm")]: {
      display: 'none',
    },
  },
  leftSideOther: {
    [theme.breakpoints.down("xs")]: {
      '& .MuiGrid-grid-xs-4': {
        flexBasis: '100%',
        maxWidth: '100%'
      }
    },
  },
  rightSide: {
    backgroundColor: '#303030',
    marginTop: 20,
    padding: 0,
    position: 'relative',
    [theme.breakpoints.down("sm")]: {
      minWidth: '400px',
      position: 'relative',
      marginTop: '30px',
      marginLeft: '15%',
    },
  },
  searchInput: {
    paddingLeft: 30,
    marginTop: 10,
    flexGrow: 1,
  },
  iconBtn: {
    backgroundColor: '#fff',
    height: 35,
    top: 10,
    float: 'left',
    marginRight: 10,
  },
  iconBtnRight: {
    backgroundColor: '#fff',
    float: 'left'
  },
  iconPadding: {
    float: 'right',
  },
  iconPaddingRight: {
    paddingTop: 10,
    display: 'none',
    [theme.breakpoints.down("sm")]: {
      display: 'flex',
    },
  },
}));

export default function Multichart() {
  const classes = useStyles();
  const [showMode, setShowMode] = React.useState(1);

  const handleChange = () => {
    setShowMode(!showMode);
  };

  const handleChangeRight = () => {
    setShowMode(!showMode);
  };

  const handleTokenPropsChange = (tokenInfo) => {
    storeLocalMultichart(tokenInfo.address);
    setMultichartData(JSON.parse(localStorage.getItem('multichart')))
  };

  const inputHandle = (tokenAddress) => {
    storeLocalMultichart(tokenAddress);
    setMultichartData(JSON.parse(localStorage.getItem('multichart')))
  };

  const [multichartData, setMultichartData] = useState(JSON.parse(localStorage.getItem('multichart')));

  if (multichartData == null) {
    storeLocalMultichart(DefaultTokens.POOCOIN.address)
  }
  // let multichartData = ;

  const onSymbol = () => {
    setMultichartData(JSON.parse(localStorage.getItem('multichart')))
  }

  let leftContainer = (
    <div className={showMode ? classes.leftSide : classes.leftSideOther}>
      <div className={'row'}>
        <div className={'cell'}>
          <a href="https://click.a-ads.com/1602418/134863/" rel="nofollow noreferrer" target="_blank">
            <img alt="Alien Doge" height="90" src={leftPoster} width="970" />
          </a>
        </div>
      </div>
      <div style={{ display: 'flex' }}>
        <div className={classes.searchInput}>
          <div style={{ maxWidth: '400px' }}>
            <TokenSelect inputHandle={inputHandle} tokenProps={handleTokenPropsChange} />
          </div>
        </div>
        <div className={classes.iconPadding}>
          <IconButton color="primary" aria-label="upload picture" component="span" className={classes.iconBtn} onClick={handleChange}>
            <FileCopyIcon />
          </IconButton>
        </div>
      </div>
      <Grid item xs={12} lg={12} container>
        {multichartData.address.map((data, index) => (
          <Grid item xs={4} lg={4} style={{ padding: '5px' }} key={index}>
            <Panel tokenAddress={data} index={index} />
          </Grid>
        ))
        }
      </Grid>
    </div>
  );

  let container;

  if (showMode) {
    container = (
      <Grid className={classes.subContainer} container spacing={3} item xs={12}>
        <Grid item xs={9} lg={9} md={8} sm={12}>
          {leftContainer}
        </Grid>
        <Grid item xs={3} lg={3} md={4} sm={6} className={classes.rightSide}>
          <div className={classes.iconPaddingRight}>
            <IconButton color="primary" aria-label="upload picture" component="span" className={classes.iconBtnRight} onClick={handleChangeRight}>
              <FileCopyIcon />
            </IconButton>
          </div>
          <div className={classes.rightTitle}>Sponsored BSC Project</div>
          <div>
            <a href="https://moonstartoken.com/" target="_blank" rel="noreferrer">
              <img className={'img-fluid'} src={rightPoster} width="350" height="100" />
            </a>
          </div>
          <div className={classes.inputWidth} >
            <Input />
          </div>
          <Tab className={classes.tabContainer} onSymbol={onSymbol} />
        </Grid>
      </Grid>
    )
  } else {
    container = (
      <Grid container spacing={3} item xs={12}>
        <Grid item xs={12}>
          {leftContainer}
        </Grid>
      </Grid>
    )
  }

  return (
    <div>
      {container}
    </div>
  );
}