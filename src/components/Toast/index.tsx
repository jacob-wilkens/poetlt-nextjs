import { useState } from 'react';

import { ToastPosition } from 'react-bootstrap/esm/ToastContainer';

import { Toast, ToastContainer } from 'react-bootstrap';

type Props = {
  bg: string;
  delay: number;
  autohide: boolean;
  message: string;
  position: ToastPosition;
};

export const PoetltToast = ({ bg, delay, autohide, message, position }: Props) => {
  const [show, setShow] = useState(true);

  return (
    <ToastContainer {...{ position, className: 'p-3' }}>
      <Toast {...{ show, bg, delay, autohide, onClose: () => setShow(false) }}>
        <Toast.Header>
          <strong className='me-auto'>Error</strong>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};
