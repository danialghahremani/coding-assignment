import { useState, useEffect, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';

import styles from './modal.module.scss';

type Props = {
  title?: string;
  children: ReactNode;
  visible: boolean;
  onClose: () => void;
};

const Modal = ({ title, children, visible, onClose }: Props) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const modalContent = visible ? (
    <div className={styles.ModalOverlay}>
      <div
        className={clsx(styles.ModalContainer, {
          [styles.visible]: visible,
        })}
      >
        <button className={styles.ModalCloseButton} onClick={onClose}>
          <i className='bi bi-x'></i>
        </button>

        {title && <div>{title}</div>}
        <div className={styles.ModalBody}>{children}</div>
      </div>
    </div>
  ) : null;

  if (isBrowser) {
    return createPortal(
      modalContent,
      document.getElementById('modal-root') as HTMLDivElement
    );
  } else {
    return null;
  }
};

export default Modal;