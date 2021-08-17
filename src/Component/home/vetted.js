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
import { vettedValues } from '../../PooCoin/index.js';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    borderColor: '#262626',
    textAlignLast: 'center'
  },
  body: {
    padding: 0,
    paddingLeft: 10,
    color: '#fff',
    backgroundColor: '#303030',
    borderColor: '#262626',
    textAlignLast: 'center'
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('THOREUM', 159),
//   createData('ORFANO', 237),
//   createData('MOONSTAR', 262),
//   createData('GAVECOIN', 305),
//   createData('KABOSU', 335),
//   createData('FEED', 370),
//   createData('SHIELDNET', 399),
// ];
const rows = Array.from(Array(10).keys()).map(item => {
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
  }
});

function VettedTable(props) {
    const values = props.values;

    const tbody = values.map((item, index) => 
      <StyledTableRow key={index}>
        <StyledTableCell component="th" scope="row">
          <Link to={`/tokens/${item.linkAddress}`}>
            {item.name}&nbsp;
            <span className={'textSuccess'}>${item.amount}</span>
            <br />
            <span className={'textMuted'}>{item.name}</span>
          </Link>
        </StyledTableCell>
        <StyledTableCell>
          <span>{item.amount}</span>
          <br />
          <span className={'textSuccess'}>${item.amount}</span>
        </StyledTableCell>
        <StyledTableCell><StarOutlineIcon /></StyledTableCell>
      </StyledTableRow>
    );
    return (
        <tbody style={{ backgroundColor: '#262626' }}>{tbody}</tbody>
    );
}

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
          <VettedTable values={vettedData} />
          {/* {rows.map((row) => (
            <StyledTableRow key={row.id}>
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
          ))} */}
        </TableBody>
      </Table>
    </TableContainer>
  );
}