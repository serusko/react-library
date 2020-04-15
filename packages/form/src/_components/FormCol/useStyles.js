import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flex: p => p.width + ' 1 0%',
    [theme.breakpoints.down('md')]: {
      flex: p => p.width + ' 1 100%',
    },
  },
}));

export default useStyles;
