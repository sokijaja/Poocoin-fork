import React, { Component, useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { GradeOutlined, Grade } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { unvettedValues } from '../../PooCoin/index.js';

const StyledTableCell = withStyles((theme) => ({
  head: {
    // backgroundColor: theme.palette.common.black,
    backgroundColor: '#262626',
    color: theme.palette.common.white,
    padding: '0 0 0 10px',
    textAlignLast: 'center',
    borderColor: '#262626'
  },
  body: {
    fontSize: 12,
    lineHeight: 1.43,
    padding: 0,
    paddingLeft: 10,
    color: '#fff',
    textAlignLast: 'center',
    backgroundColor: '#303030',
    borderColor: '#262626',
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
    id: item,
    tokenMoney: "0.0000",
    balanceMoney: "0.00",
    calories: '0.00',
    favor: 1,
  }
})

const useStyles = makeStyles({
  table: {
    minWidth: 100,
  },
});

function UnvettedTable(props) {
    const values = props.values;

    const tbody = values.map((item, index) => 
      <StyledTableRow key={index}>
        <StyledTableCell component="th" scope="row">
          {/* <span>{item[1].split('/')[3]}</span> */}
            <Link to={`/tokens/${item[0]}`}>
              {item[1].split('/')[3]}&nbsp;
              <span className={'textSuccess'}>$0.0000</span>
              <br />
              <span className={'textMuted'}>{item[1].split('/')[3]}</span>
            </Link>
        </StyledTableCell>
        <StyledTableCell>
          <span>0.00</span>
          <br />
          <span className={'textSuccess'}>$0.00</span>
        </StyledTableCell>
        <StyledTableCell><GradeOutlined /></StyledTableCell>
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
            <StyledTableCell>Tokens</StyledTableCell>
            <StyledTableCell>Balance</StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <UnvettedTable values={unvettedData}/>
          {/* {rows.map((row) => (
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
              <StyledTableCell><i>{row.favor == 1 ? <Grade /> : <GradeOutlined />}</i></StyledTableCell>
            </StyledTableRow>
          ))} */}
        </TableBody>
      </Table>
    </TableContainer>
  );
}