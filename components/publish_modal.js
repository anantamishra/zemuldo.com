import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';

export default function PublishDialogue({open, handleClose, handlePublish, message, submitText}) {

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Please confirm'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Not yet!
          </Button>
          <Button onClick={handlePublish} color="primary" >
            {submitText || 'Publish'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

PublishDialogue.propTypes = {
  open: PropTypes.bool,
  message: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  handlePublish: PropTypes.func.isRequired,
  submitText: PropTypes.string,
};