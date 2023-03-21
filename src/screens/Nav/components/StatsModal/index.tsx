import { useState } from 'react';

import Button from 'react-bootstrap/Button';

import { Modal } from '@components/Modal';

import { StatModalBody, StatModalHeader } from './components';

export const StatsModal = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const ModalHeader = <StatModalHeader />;
  const ModalBody = <StatModalBody />;

  return (
    <>
      <Button variant='dark' onClick={handleShow}>
        STATS
      </Button>
      <Modal {...{ show, onHide: handleClose, ModalHeader, ModalBody, centered: true }} />
    </>
  );
};
