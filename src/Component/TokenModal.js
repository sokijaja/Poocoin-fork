import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { Fade, Button, TextField } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import BNB from '../Images/BNB.png';
import ETH from '../Images/ETH.png';
import BUSD from '../Images/BUSD.png';
import USDT from '../Images/USDT.png';
import BTCB from '../Images/BTCB.png';
import TokenSelect from './TokenSelect';
import { ListSubheader, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  close: {
    color: 'white',
    textAlign: 'right',
    '&:hover': {
      cursor: 'pointer',
      color: 'skyblue'
    }
  },
  paper: {
    backgroundColor: 'rgb(34, 34, 34)',
    // border: '2px solid #000',
    padding: '20px',
    width: '350px',
    border: '1px solid rgb(51, 51, 51)'
  },
  label: {
    marginBottom: '10px'
  },
  list: {
    backgroundColor: '#262626',
    color: 'white'
  },
  listBody: {
    backgroundColor: '#303032'
  }
}));

export default function TokenModal(props) {
  const classes = useStyles();
  const [token, setToken] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const buttonClass = props.css;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onTokenSelect = (tk) => {

    let icon;
    if (tk == 'BNB') icon = BNB;
    else if (tk == 'BUSD') icon = BUSD;
    else if (tk == 'USDT') icon = USDT;
    else if (tk == 'BTCB') icon = BTCB;
    else if (tk == 'ETH') icon = ETH;

    setToken(<Fragment><img src={icon} width="23px"/>&nbsp;{tk}</Fragment>);
    props.tokenChange(tk);
    setOpen(false);
  }

  if (token == "") setToken("Select a currency");

  return (
    <div>
      <Button onClick={handleOpen} className={buttonClass}>{token}</Button> 
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <div className={classes.close} onClick={handleClose}>
              <Icon>close</Icon>
            </div>
            <div className={classes.label}>
              <span style={{color: 'white'}}>Select a token</span>
            </div>
            <TokenSelect></TokenSelect>
            <List
              component="nav"
              subheader={
                <ListSubheader component="div" style={{color: 'white'}}>
                  Token
                </ListSubheader>
              }
              className={classes.list}
            >
              <ListItem button className={classes.listBody} onClick={() => onTokenSelect('BNB')}>
                <ListItemIcon>
                  <img src={BNB} style={{width: '20px'}}/>
                </ListItemIcon>
                <ListItemText primary="BNB" />
              </ListItem>
              <ListItem button className={classes.listBody} onClick={() => onTokenSelect('BUSD')}>
                <ListItemIcon>
                  <img src={BUSD} style={{width: '20px'}}/>
                </ListItemIcon>
                <ListItemText primary="BUSD" />
              </ListItem>
              <ListItem button className={classes.listBody} onClick={() => onTokenSelect('USDT')}>
                <ListItemIcon>
                  <img src={USDT} style={{width: '20px'}}/>
                </ListItemIcon>
                <ListItemText primary="USDT" />
              </ListItem>
              <ListItem button className={classes.listBody} onClick={() => onTokenSelect('BTCB')}>
                <ListItemIcon>
                  <img src={BTCB} style={{width: '20px'}}/>
                </ListItemIcon>
                <ListItemText primary="BTCB" />
              </ListItem>
              <ListItem button className={classes.listBody} onClick={() => onTokenSelect('ETH')}>
                <ListItemIcon>
                  <img src={ETH} style={{width: '20px'}}/>
                </ListItemIcon>
                <ListItemText primary="ETH" />
              </ListItem>
            </List>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
