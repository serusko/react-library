import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  yes: {
    color: '#74B500',
    fontWeight: 'bold',
  },
  no: {
    color: 'red',
    fontWeight: 'bold',
  },
  off: {
    color: 'grey',
  },
  mr: {
    marginRight: '10px',
  },
  ml: {
    marginLeft: '10px',
  },
  pl: {
    '& .MuiFormControlLabel-label': {
      paddingLeft: '25px',
    },
  },
  pr: {
    '& .MuiFormControlLabel-label': {
      paddingRight: '25px',
    },
  },
  label: {
    color: 'rgb(0, 0, 0, 0.75)',
  },
}));

export default useStyles;
