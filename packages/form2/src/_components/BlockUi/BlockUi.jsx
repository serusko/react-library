//import 'date-fns';
import React from 'react';
import propTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { CircularProgress } from '@material-ui/core';

import useStyles from './useStyles';

function BlockUi({ open, setOpen }) {
  const classes = useStyles();

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      open={open}
      onClose={_ => setOpen(false)}
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      className={classes.modal}
      closeAfterTransition
    >
      <div className={classes.modalPaper}>
        <CircularProgress />
      </div>
    </Modal>
  );
}

export default React.memo(BlockUi);

BlockUi.propTypes = {
  open: propTypes.bool,
  setOpen: propTypes.func,
};
