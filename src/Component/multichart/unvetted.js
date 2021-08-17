import React, { Component, useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import { Link } from 'react-router-dom';
import { unvettedValues } from '../../PooCoin/index.js';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    borderColor: '#262626'
  },
  body: {
    fontSize: 12,
    padding: 0,
    paddingLeft: 10,
    color: '#fff',
    backgroundColor: '#303030',
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

function createData(name, balance, price) {
  return { name, balance, price };
}

const rows = [
  createData('BNBack', '0.00', '$0.0179'),
  createData('DOGE LOVE', '0.00', '$0.0179'),
  createData('StackCake', '0.00', '$0.0179'),
  createData('FAT CAKE', '0.00', '$0.0179'),
  createData('BABYUNI', '0.00', '$0.0179'),
];

const useStyles = makeStyles({
  table: {
    minWidth: 100,
    fontSize: '0.875rem',
    padding: '10px !important',
    color: '#fff'
  },
  tableTh: {
    padding: 0,
    fontSize: '0.8125rem',
    paddingLeft: 10,
    backgroundColor: '#262626'
  },
  priceValue: {
    color: '#28a745'
  },
  firstName: {
    textTransform: 'uppercase',
    fontSize: 13
  },
  otherName: {
    fontSize: 12,
    color: '#ADB5BD'
  }
});

function UnvettedTable(props) {
    const values = props.values;
    const classes = props.styleName;

    const tbody = values.map((item, index) => 
      <StyledTableRow key={index}>
        <StyledTableCell component="th" scope="row">
          <a href={"https://poocoin.app/tokens/" + item[0]}>
            <span className={classes.firstName}>{item[1].split('/')[3]}</span> <span className={classes.priceValue}>$ 0.0000</span>
            <div className={classes.otherName}>{item[1].split('/')[3]}</div>
          </a>
        </StyledTableCell>
        <StyledTableCell>0.00<div className={classes.priceValue}>$0.00</div></StyledTableCell>
        <StyledTableCell><StarOutlineIcon /></StyledTableCell>
      </StyledTableRow>
    );
    return (
        <tbody style={{ backgroundColor: '#262626' }}>{tbody}</tbody>
    );
}

export default function CustomizedTables() {

  const [unvettedData, setUnvettedData] = useState([]);

  const setUnvettedValues = (data) => {
      setUnvettedData(data);
  }

  useEffect(() => {
      unvettedValues(setUnvettedValues);
  }, []);
  
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell className={classes.tableTh}>Tokens</StyledTableCell>
            <StyledTableCell className={classes.tableTh}>Balance</StyledTableCell>
            <StyledTableCell className={classes.tableTh}></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <UnvettedTable values={unvettedData} styleName={classes}/>
          {/* {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                <span className={classes.firstName}>{row.name}</span> <span className={classes.priceValue}>{row.price}</span>
                <div className={classes.otherName}>{row.name}</div>
              </StyledTableCell>
              <StyledTableCell>{row.balance}<div className={classes.priceValue}>${row.balance}</div></StyledTableCell>
              <StyledTableCell><StarOutlineIcon /></StyledTableCell>
            </StyledTableRow>
          ))} */}
        </TableBody>
      </Table>
    </TableContainer>
  );
}