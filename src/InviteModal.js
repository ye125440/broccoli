import React, { useState } from 'react';
import Modal from 'react-modal';
import toast, { Toaster } from 'react-hot-toast';
import PropTypes from 'prop-types';
import { sendInvite } from './api';
// import cls from './InviteModal.module.scss';

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(32, 33, 36, 0.6)',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '75vmin',
  },
};
Modal.setAppElement('#root');

export default function InviteModal({ isOpen, handleClose }) {
  const [isSendingRequest, setIsSendingRequest] = useState(false);
  const handleSubmit = async () => {
    setIsSendingRequest(true);
    const params = { name: 'test', email: 'usedemail@airwallex.com1' };
    try {
      const res = await sendInvite(params);
      toast.success(res);
    } catch (err) {
      const errMsg = err?.response?.data?.errorMessage ?? err.message;
      toast.error(errMsg);
    } finally {
      setIsSendingRequest(false);
    }
  };
  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={handleClose}
        style={customStyles}
        contentLabel="Invite Modal"
      >
        <h2>Hello</h2>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSendingRequest}
        >
          send
        </button>
        <div>I am a modal</div>
        <form>
          <input />
        </form>
      </Modal>
      <Toaster />
    </>
  );
}

InviteModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
