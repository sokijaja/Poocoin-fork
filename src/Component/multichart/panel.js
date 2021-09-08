import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import Chart from '../basic/chart';
import '../../css/multichart.css';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
    height: '310px',
    backgroundColor: '#141722!important',
  },
  MulAlertPadding: {
    padding: '0px !important',
    backgroundColor: '#141722',
    zIndex: -10,
  },
  closeIcon: {
    display: 'block !important',
    paddingLeft: '0px !important',
    alignItems: 'baseline !important',
    backgroundColor: '#141722',
    color: '#fff'
  },
  chart: {
    // zIndex: 1
  },
  chartPan: {
    '& .tradingview-widget-copyright': {
      display: 'none',
    },
    color: '#fff'
  },
  chartContainer: {
    height: 285
  }
}));

export default function TransitionAlerts({ displayMode, symbolAddress, symbolName, onClickBtn, onClickIndex }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  let chart;
  if (displayMode) {
    chart = (
      <Chart className={classes.chart} symbolAddress={symbolAddress} symbolName={symbolName} />
    );
  }

  return (
    <div className={classes.root}>
      <Collapse in={open}>
        <Alert
          className={classes.MulAlertPadding}
          icon={false}
          action={
            <IconButton
              onClick={() => {
                setOpen(false);
                setOpen(true);
                onClickBtn(onClickIndex);
              }}
              aria-label="close"
              color="inherit"
              size="small"
            >
              <CloseIcon className={classes.closeIcon} fontSize="inherit" />
            </IconButton>
          }
        >
        </Alert>
        <div className={classes.chartPan}>
          {chart}
        </div>
      </Collapse>
    </div >
  );
}