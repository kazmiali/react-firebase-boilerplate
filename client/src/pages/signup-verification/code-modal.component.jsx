import React from 'react';
import { Modal, ClickAwayListener } from '@material-ui/core';
import { MdClose } from 'react-icons/md';

const EntryImagesModal = ({ open, handleClose }) => {
    return (
        <Modal
            aria-labelledby='simple-modal-title'
            aria-describedby='simple-modal-description'
            open={open}
            onClose={handleClose}
        >
            <div className='modal-container'>
                <ClickAwayListener onClickAway={handleClose}>
                    <div className='modal add-image-modal'>
                        <div className='m-header'>
                            <h2>Enter Code</h2>
                            <MdClose onClick={handleClose} />
                        </div>
                        <div className='m-body'>
                            <input type='text' className='auth-input' />
                            <button className='btn btn-auth mt-1'>
                                Verify
                            </button>
                            <span>Didn't Recived code ? Resend Code.</span>
                        </div>
                        <div className='m-footer'>
                            <p onClick={handleClose}>Close</p>
                        </div>
                    </div>
                </ClickAwayListener>
            </div>
        </Modal>
    );
};

export default EntryImagesModal;
