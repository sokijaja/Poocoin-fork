/* eslint-disable no-use-before-define */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import Grid from '@material-ui/core/Grid';
import Tab from '../Component/basic/tab';
import Input from '../Component/basic/input';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Panel from '../Component/multichart/panel';
import rightPoster from '../Images/moonstar3.gif';
import leftPoster from '../Images/leftposter.gif';
import SearchInput from '../Component/TokenSelect';
import FileCopyIcon from '@material-ui/icons/FileCopy';

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
  const [displayModeValue1, setDisplayModeValue1] = React.useState(1);
  const [displayModeValue2, setDisplayModeValue2] = React.useState(0);
  const [displayModeValue3, setDisplayModeValue3] = React.useState(0);
  const [displayModeValue4, setDisplayModeValue4] = React.useState(0);
  const [displayModeValue5, setDisplayModeValue5] = React.useState(0);
  const [displayModeValue6, setDisplayModeValue6] = React.useState(0);
  const [displayModeValue7, setDisplayModeValue7] = React.useState(0);
  const [displayModeValue8, setDisplayModeValue8] = React.useState(0);
  const [displayModeValue9, setDisplayModeValue9] = React.useState(0);
  const [symbolAddress, setSymbolAddress] = React.useState(null);
  const [symbolName, setSymbolName] = React.useState(null);

  // let displayMode = 9;
  // displayMode = (showMode === 0)? displayMode = 9: displayMode = 12;

  const handleChange = () => {
    setShowMode(!showMode);
  };

  const handleChangeRight = () => {
    setShowMode(!showMode);
  };

  const onClickBtn = (index) => {
    if (index === 1) {
      setDisplayModeValue1(0);
    } else if (index === 2) {
      setDisplayModeValue2(0);
    } else if (index === 3) {
      setDisplayModeValue3(0);
    } else if (index === 4) {
      setDisplayModeValue4(0);
    } else if (index === 5) {
      setDisplayModeValue5(0);
    } else if (index === 6) {
      setDisplayModeValue6(0);
    } else if (index === 7) {
      setDisplayModeValue7(0);
    } else if (index === 8) {
      setDisplayModeValue8(0);
    } else if (index === 9) {
      setDisplayModeValue9(0);
    }
  }

  const onSymbol = (symbolAddress, symbolName) => {
    setSymbolAddress(symbolAddress);
    setSymbolName(symbolName);

    if (!displayModeValue1) {
      setDisplayModeValue1(1);
    } else if (!displayModeValue2) {
      setDisplayModeValue2(1);
    } else if (!displayModeValue3) {
      setDisplayModeValue3(1);
    } else if (!displayModeValue4) {
      setDisplayModeValue4(1);
    } else if (!displayModeValue5) {
      setDisplayModeValue5(1);
    } else if (!displayModeValue6) {
      setDisplayModeValue6(1);
    } else if (!displayModeValue7) {
      setDisplayModeValue7(1);
    } else if (!displayModeValue8) {
      setDisplayModeValue8(1);
    } else if (!displayModeValue9) {
      setDisplayModeValue9(1);
    }
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
            <SearchInput />
          </div>
        </div>
        <div className={classes.iconPadding}>
          <IconButton color="primary" aria-label="upload picture" component="span" className={classes.iconBtn} onClick={handleChange}>
            <FileCopyIcon />
          </IconButton>
        </div>
      </div>
      <Grid item xs={12} lg={12} container>
        <Grid item xs={4} lg={4} style={{ padding: '5px' }}>
          <Panel displayMode={displayModeValue1} symbolAddress={symbolAddress} symbolName={symbolName} onClickBtn={onClickBtn} onClickIndex={1} />
        </Grid>
        <Grid item xs={4} style={{ padding: '5px' }}>
          <Panel displayMode={displayModeValue2} symbolAddress={symbolAddress} symbolName={symbolName} onClickBtn={onClickBtn} onClickIndex={2} />
        </Grid>
        <Grid item xs={4} style={{ padding: '5px' }}>
          <Panel displayMode={displayModeValue3} symbolAddress={symbolAddress} symbolName={symbolName} onClickBtn={onClickBtn} onClickIndex={3} />
        </Grid>
        <Grid item xs={4} style={{ padding: '5px' }}>
          <Panel displayMode={displayModeValue4} symbolAddress={symbolAddress} symbolName={symbolName} onClickBtn={onClickBtn} onClickIndex={4} />
        </Grid>
        <Grid item xs={4} style={{ padding: '5px' }}>
          <Panel displayMode={displayModeValue5} symbolAddress={symbolAddress} symbolName={symbolName} onClickBtn={onClickBtn} onClickIndex={5} />
        </Grid>
        <Grid item xs={4} style={{ padding: '5px' }}>
          <Panel displayMode={displayModeValue6} symbolAddress={symbolAddress} symbolName={symbolName} onClickBtn={onClickBtn} onClickIndex={6} />
        </Grid>
        <Grid item xs={4} style={{ padding: '5px' }}>
          <Panel displayMode={displayModeValue7} symbolAddress={symbolAddress} symbolName={symbolName} onClickBtn={onClickBtn} onClickIndex={7} />
        </Grid>
        <Grid item xs={4} style={{ padding: '5px' }}>
          <Panel displayMode={displayModeValue8} symbolAddress={symbolAddress} symbolName={symbolName} onClickBtn={onClickBtn} onClickIndex={8} />
        </Grid>
        <Grid item xs={4} style={{ padding: '5px' }}>
          <Panel displayMode={displayModeValue9} symbolAddress={symbolAddress} symbolName={symbolName} onClickBtn={onClickBtn} onClickIndex={9} />
        </Grid>
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