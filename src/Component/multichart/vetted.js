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
import { vettedValues } from '../../PooCoin/index.js';

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

function VettedTable(props) {
    const values = props.values;
    const classes = props.styleName;

    const tbody = values.map((item, index) => 
        <StyledTableRow key={index}>
          <StyledTableCell component="th" scope="row">
            <span className={classes.firstName}>{item.name}</span> <span className={classes.priceValue}>{item.amount}</span>
            <div className={classes.otherName}>{item.name}</div>
          </StyledTableCell>
          <StyledTableCell>{item.amount}<div className={classes.priceValue}>${item.amount}</div></StyledTableCell>
          <StyledTableCell><StarOutlineIcon /></StyledTableCell>
        </StyledTableRow>
    );
    return (
        <tbody style={{ backgroundColor: '#262626' }}>{tbody}</tbody>
    );
}

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
  createData('Thoreum', '0.00', '$0.0179'),
  createData('Orfano', '0.00', '$0.0179'),
  createData('Moonstar', '0.00', '$0.0179'),
  createData('Gabecoin', '0.00', '$0.0179'),
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

export default function CustomizedTables() {
  const [vettedData, setVettedData] = useState([]);

    const setVettedValues = (data) => {
        setVettedData(data);
    }

    useEffect(() => {
        vettedValues(setVettedValues);
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
          <VettedTable values={vettedData} styleName={classes}/>
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