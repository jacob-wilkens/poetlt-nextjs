import { useState } from 'react';

import Button from 'react-bootstrap/Button';

import { Modal } from '@components/Modal';

import { DirectionsModalBody, DirectionsModalHeader } from './components';

export const DirectionsModal = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const ModalHeader = <DirectionsModalHeader />;
  const ModalBody = <DirectionsModalBody />;

  return (
    <>
      <Button variant='dark' onClick={handleShow}>
        HOW TO PLAY
      </Button>
      <Modal {...{ show, onHide: handleClose, ModalHeader, ModalBody, centered: true }} />
    </>
  );
};
