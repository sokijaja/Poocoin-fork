import React, { useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Modal, Grid, Paper } from '@material-ui/core';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import { Link } from 'react-router-dom';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#262626',
    color: theme.palette.common.white,
    padding: 0,
    paddingLeft: 10,
    textAlignLast: 'center',
    borderColor: '#262626'
  },
  body: {
    fontSize: '0.875rem',
    padding: 0,
    paddingLeft: 10,
    maxWidth: 100,
    backgroundColor: '#303030',
    color: '#fff',
    textAlignLast: 'center',
    borderColor: '#262626'
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const rows = Array.from(Array(1).keys()).map(item => {
  return {
    name: "THOREUM",
    othername: "Thoreum",
    id: "0x580de58c1bd593a43dadcf0a739d504621817c05",
    tokenMoney: "0.0000",
    balanceMoney: "0.00",
    calories: '0.00'
  }
})
const useStyles = makeStyles({

  modalLeft: {
    textAlign: 'left',
    color: '#3eb8ff !important',
    cursor: 'pointer',
  },
  modalRight: {
    textAlign: 'right',
    cursor: 'pointer',
    color: '#3eb8ff !important'
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#262626',
  },
  paper: {
    backgroundColor: 'white',
    border: 'none',
    padding: '40px 30px 30px 30px',
    display: 'grid',
    borderRadius: '8px',
    textAlign: 'center',
  },
});

export default function CustomizedTables() {
  const classes = useStyles();
  const [open, setModalOpen] = useState(false);

  const modalClose = () => {
    setModalOpen(false);
  };

  const modalOpen = () => {
    setModalOpen(true);
  }
  return (
    <div>
      <Grid container className={classes.tableHead}>
        <Grid item xs={6}>
          <div onClick={modalOpen} className={classes.modalLeft}>
            Track another wallet
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className={classes.modalRight}>
            Load new tokens
          </div>
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Tokens</StyledTableCell>
              <StyledTableCell>Balance</StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.id
                    ? <Link to={`/tokens/${row.id}`}>
                      {row.name}&nbsp;
                      <span className={'textSuccess'}>${row.tokenMoney}</span>
                      <br />
                      <span className={'textMuted'}>{row.othername}</span>
                    </Link>
                    : row.name}
                </StyledTableCell>
                <StyledTableCell>
                  <span>{row.calories}</span>
                  <br />
                  <span className={'textSuccess'}>${row.balanceMoney}</span>
                </StyledTableCell>
                <StyledTableCell><StarOutlineIcon /></StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        className={classes.modal}
        open={open}
        onClose={modalClose}
      >
        <div className={classes.paper}>
          <h1>Premium required</h1>
          <p>This features requires premium tier 1.</p>
          <p>Unlock this premium tier by holding $100 worth of <a className={'textBlue fs3'} target="_blank" href="https://pancakeswap.finance/swap#/add/ETH/0x7ceb23fd6bc0add59e62ac25578270cff1b9f619">POOCOIN/BNB LP</a></p>
          <p>(approximately Infinity POOCOIN/BNB LP created from Infinity <a className={'textBlue fs3'} target="_blank" href="polygon/swap?outputCurrency=0xB27ADAfFB9fEa1801459a1a81B17218288c097cc">POOCOIN</a> and Infinity BNB)
            tokens in your wallet.</p>
        </div>
      </Modal>
    </div>
  );
}