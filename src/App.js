import React, { useState } from 'react';
import InviteModal from './InviteModal';
import cls from './App.module.scss';

function App() {
  const [isModalOpen, setIsOpen] = useState(false);
  const handleInviteClick = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className={cls.container}>
      <div className={cls.header}>BROCCOLI & CO.</div>
      <div className={cls.main}>
        <div className={cls.slogan}>A better way</div>
        <div className={cls.slogan}>to enjoy every day.</div>
        <div className={cls.hint}>Be the first to know when we launch.</div>
        <button className={cls.inviteButton} onClick={handleInviteClick} type="button">
          {isModalOpen}
          Request an invite
        </button>
      </div>
      <div className={`${cls.footer} ${cls.italic}`}>
        <span>Made with &hearts; in Melbourne.</span>
        <span>&copy; 2016 Brocoli & Co. All right reserved</span>
      </div>
      <InviteModal isOpen={isModalOpen} handleClose={handleClose} />
    </div>
  );
}

export default App;
