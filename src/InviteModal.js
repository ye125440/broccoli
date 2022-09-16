import React, { useState } from 'react';
import Modal from 'react-modal';
import toast, { Toaster } from 'react-hot-toast';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { sendInvite } from './api';
import cls from './InviteModal.module.scss';

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
const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
Modal.setAppElement('#root');

export default function InviteModal({ isOpen, handleClose }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasDone, setHasDone] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async () => {
    setIsSubmitting(true);
    const params = { name: 'test', email: 'usedemail@airwallex.com1' };
    try {
      const res = await sendInvite(params);
      if (res === 'Registered') {
        setHasDone(true);
      }
    } catch (err) {
      const errMsg = err?.response?.data?.errorMessage ?? err.message;
      toast.error(errMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmEmail = (value) => {
    console.log(
      'debug ~ file: InviteModal.js ~ line 56 ~ confirmEmail ~ value',
      value,
    );
    return true;
  };
  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={handleClose}
        style={customStyles}
        contentLabel="Invite Modal"
      >
        {!hasDone && (
          <>
            <h3 className={cls.title}>Request an invite</h3>
            <button type="button" onClick={onSubmit} disabled={isSubmitting}>
              send
            </button>
            <form onSubmit={handleSubmit((data) => console.log(data))}>
              <div>
                <input
                  className={cls.commonFormField}
                  placeholder="Full name"
                  {...register('name', { required: true, minLength: 3 })}
                />
                {errors?.name?.type === 'required' && (
                  <p className={cls.validateTip}>
                    &#9888; Full name field is required
                  </p>
                )}
                {errors?.name?.type === 'minLength' && (
                  <p className={cls.validateTip}>
                    &#9888; Full name needs to be at least 3 characters long
                  </p>
                )}
              </div>
              <div>
                <input
                  className={cls.commonFormField}
                  placeholder="Email"
                  {...register('email', {
                    required: true,
                    pattern: emailRegex,
                  })}
                />
                {errors?.email?.type === 'required' && (
                  <p className={cls.validateTip}>
                    &#9888; Email field is required
                  </p>
                )}
                {errors?.email?.type === 'pattern' && (
                  <p className={cls.validateTip}>
                    &#9888; Email needs to be in validation email format
                  </p>
                )}
              </div>
              <div>
                <input
                  className={cls.commonFormField}
                  placeholder="Confirm email"
                  {...register('confirmEmail', {
                    validate: (value) => confirmEmail(value),
                  })}
                />
                {errors?.confirmEmail?.type === 'validate' && (
                  <p className={cls.validateTip}>
                    &#9888; Confirm Email needs to match Email
                  </p>
                )}
              </div>
              <div className={cls.submitContainer}>
                <input
                  className={cls.commonFormField}
                  disabled={isSubmitting}
                  type="submit"
                  value="Send"
                />
              </div>
            </form>
          </>
        )}
        {hasDone && (
          <>
            <h3 className={cls.title}>All done!</h3>
            <form>
              <div className={cls.doneTip}>
                <span>You will be one of the first to experience</span>
                <span>Broccoli & Co. when we launch.</span>
              </div>
              <div className={cls.submitContainer}>
                <input
                  className={cls.commonFormField}
                  type="submit"
                  value="OK"
                />
              </div>
            </form>
          </>
        )}
      </Modal>
      <Toaster />
    </>
  );
}

InviteModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
