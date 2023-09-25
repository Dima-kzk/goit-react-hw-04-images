import { useEffect } from 'react';
import { Overlay } from './Modal.styled';

const Modal = ({ src, toggleModal }) => {
  useEffect(() => {
    const handleKeyBoard = e => {
      if (e.key === 'Escape') toggleModal();
    };

    document.addEventListener('keydown', handleKeyBoard);
    return () => {
      document.removeEventListener('keydown', handleKeyBoard);
    };
  }, [toggleModal]);

  return (
    <Overlay className="overlay" onClick={toggleModal}>
      <div className="modal">
        <img src={src} alt="" onClick={e => e.stopPropagation()} />
      </div>
    </Overlay>
  );
};

export default Modal;
