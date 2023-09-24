import { useEffect } from 'react';
import { Overlay } from './Modal.styled';

const Modal = props => {
  const handleKeyBoard = e => {
    if (e.key === 'Escape') props.toggleModal();
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyBoard);
    return () => {
      document.removeEventListener('keydown', handleKeyBoard);
    };
  });

  return (
    <Overlay className="overlay" onClick={props.toggleModal}>
      <div className="modal">
        <img src={props.src} alt="" onClick={e => e.stopPropagation()} />
      </div>
    </Overlay>
  );
};

export default Modal;
