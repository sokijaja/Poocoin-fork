/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import Grid from '@material-ui/core/Grid';
import Tab from '../Component/basic/hometab';
import Lefttab from '../Component/about/tab';
import Chart from '../Component/home/chart';
import Input from '../Component/basic/input';
// import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
// import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Panel from '../Component/multichart/panel';
import rightPoster from '../Images/moonstar3.gif';
import leftPoster from '../Images/leftposter.gif';
import SearchInput from '../Component/TokenSelect';
import SelectBox from '../Component/about/select';
import Button from '@material-ui/core/Button';
import logo from '../Images/TokenIcons/logo2.png';
import Buttonicon from '../Images/bscscan.png';
import LanguageIcon from '@material-ui/icons/Language';
import TelegramIcon from '@material-ui/icons/Telegram';
import Switch from '../Component/multichart/switch';
import Chart2 from '../Component/about/chart';
import TableTab from '../Component/home/centercontain/tabletab';
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
    width: '100%'
  },
  tabContainer: {
    minHeight: '700px !important'
  },
  rightSide: {
    backgroundColor: '#303030',
    marginTop: 20,
    padding: 0
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  buttongrid: {
    textAlign: '-webkit-right',
  },
  button: {
    backgroundColor: '#303032',
    color: 'white',
    height: 35,
    marginLeft: 3
  },
  selectBox: {
    color: 'rgb(51,51,51)',
    fontSize: 14,
  },
  TokenSelect: {
    backgroundColor: 'white',
    marginLeft: 10
  }

}));

export default function Tokens() {
  
  const classes = useStyles();
  const [showMode, setShowMode] = React.useState(1);

  const handleChange = () => {
    setShowMode(!showMode);
  };
  const handleChangeLeft = () => {
    setShowMode(!showMode);
  };

  let centerContainer = (
    <Grid>
      <Grid container spacing={2}>
          <Grid xs>
              <Grid item style={{}}>
                  <p style={{display: 'flex', color:'white', textAlign: 'left', margin: 0,float:'left'}}>
                      <img className={classes.img} src={logo} width="32" height="32"/>
                      <span>
                          Thoreum (THOREUM/BNB)
                          <br />$0.0188328
                      </span>
                  </p>
                  <Grid style={{float:'left'}}>
                      <Input />
                  </Grid>
              </Grid>
          </Grid>
          <Grid xs >
              <Grid className={classes.buttongrid} >
                  <Button className={classes.button}><img src={Buttonicon} width="18" height="18"/></Button>
                  <Button className={classes.button}>Trade</Button>
                  <Button className={classes.button} onClick={handleChange}>A</Button>
              </Grid>
              <Grid className={classes.buttongrid}>
                  <Button style={{color:'white'}}><LanguageIcon style={{color:'white'}} />Website</Button>
                  <Button style={{color:'white'}}><TelegramIcon style={{color:'white'}} />Telegram</Button>
              </Grid>
          </Grid>
      </Grid>
      <Grid container spacing={2} xs={12} style={{marginTop:15, flexFlow: 'row' }}>
          <Button className={classes.button}>Reload</Button>
          <SelectBox className={classes.selectBox} />
          <Switch />
      </Grid>
      <Grid xs={12} style={{marginTop:20}}>
          <Chart2  />
          <TableTab />
      </Grid>
    </Grid>
  );

  let container;

  if(showMode) {
    container = (
      <Grid container item xs={12}>
        <Grid item xs={3}>
          <Lefttab />
        </Grid>
        <Grid item xs={6} style={{marginTop: 20}} >
          {centerContainer}
        </Grid>
        <Grid item xs={3} className={classes.rightSide}>
          <div className={classes.rightTitle}>Sponsored BSC Project</div>
            <div>
              <a href="https://moonstartoken.com/" target="_blank" rel="noreferrer">
                <img class="img-fluid" src={rightPoster} width="350" height="100"/>
              </a>
            </div>
          <Input className={classes.inputWidth} />
          <Tab className={classes.tabContainer} />
        </Grid>
      </Grid>
    );
  } else{
    container = (
      <Grid container item xs={12}>
        <Grid item xs={3}>
          <Lefttab />
        </Grid>
        <Grid item xs={9}>
          {centerContainer}
        </Grid>
      </Grid>
    );
  } 


  return (
    <Grid>
      {container}
    </Grid>

    // <div>
    //   <Grid container spacing={3} item xs={12}>
    //     <Grid item xs={3}>
    //         <Lefttab />
    //     </Grid>
    //     <Grid item xs={6}>
            // <Chart />

    //    </Grid> 
    //     <Grid item xs={3} className={classes.rightSide}>
    //       <div className={classes.rightTitle}>Sponsored BSC Project</div>
    //       <div>
    //         <a href="https://moonstartoken.com/" target="_blank" rel="noreferrer">
    //         <img class="img-fluid" src={rightPoster} width="350" height="100"/>
    //         </a></div>
    //       <Input className={classes.inputWidth}/>
    //       <Tab className={classes.tabContainer} />
    //     </Grid>
    //   </Grid>
    // </div> 

  );
}