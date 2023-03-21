import { useState } from 'react';

import Button from 'react-bootstrap/Button';

import { Modal } from '@components/Modal';

import { PlayerPictureModalBody } from './components';

export const PlayerPictureModal = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const ModalBody = <PlayerPictureModalBody />;

  return (
    <>
      <Button variant='link' onClick={handleShow}>
        SHOW SILHOUETTE
      </Button>
      <Modal {...{ show, onHide: handleClose, ModalBody, centered: true }} />
    </>
  );
};
