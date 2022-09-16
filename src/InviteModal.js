import React from 'react';
import Modal from 'react-modal';
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
  const afterOpenModal = () => {
    // subtitle.style.color = '#f00';
  };
  const handleSubmit = async () => {
    const params = { name: 'test', email: 'test@gmail.com' };
    const res = await sendInvite(params);
    console.log('debug ~ file: InviteModal.js ~ line 34 ~ handleSubmit ~ res', res);
  };
  return (
    <Modal
      isOpen={isOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={handleClose}
      style={customStyles}
      contentLabel="Invite Modal"
    >
      <h2>Hello</h2>
      <button type="button" onClick={handleSubmit}>
        send
      </button>
      <div>I am a modal</div>
      <form>
        <input />
      </form>
    </Modal>
  );
}

InviteModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
