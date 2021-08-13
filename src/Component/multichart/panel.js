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
    backgroundColor: '#141722!important'
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
    zIndex: 100000
  },
  chartPan: {
    '& .tradingview-widget-copyright': {
      display: 'none',
    }
  }
}));

export default function TransitionAlerts() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  return (
    <div className={classes.root}>
      <Collapse in={open}>
        <Alert
          className={classes.MulAlertPadding}
          icon={false}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon className={classes.closeIcon} fontSize="inherit" />
            </IconButton>
          }
        >
        </Alert>
        <div className={classes.chartPan}>
          <Chart className={classes.chart} />
        </div>
      </Collapse>
    </div>
  );
}