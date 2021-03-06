import React, { useState } from 'react';
import { Modal, ClickAwayListener } from '@material-ui/core';
import { MdClose } from 'react-icons/md';
import { linearAlertBottom } from '../../utils/swalMixins';

const EntryImagesModal = ({
    open,
    handleClose,
    getResultPhoneVerificationStart,
    phoneNumber,
    userId,
}) => {
    const [code, setCode] = useState('');

    const handleChange = (e) => {
        const value = e.target.value;
        setCode(value);
    };

    const handleSubmit = () => {
        if (code.length < 6) {
            return;
        }
        getResultPhoneVerificationStart({ phoneNumber, code, userId });
    };

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
                            <h2>Enter 6-digit Code</h2>
                            <MdClose onClick={handleClose} />
                        </div>
                        <div className='m-body'>
                            <input
                                type='text'
                                className='auth-input'
                                value={code}
                                onChange={handleChange}
                            />
                            <button
                                className='btn btn-auth mt-1'
                                onClick={handleSubmit}
                            >
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
