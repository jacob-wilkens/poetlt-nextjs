import { ReactNode } from 'react';

import BootstrapModal from 'react-bootstrap/Modal';

type Props = {
  show: boolean;
  onHide: () => void;
  ModalHeader?: ReactNode;
  ModalBody: ReactNode;
  centered: boolean;
  centerText?: boolean;
};

export const Modal = ({ ModalBody, onHide, show, ModalHeader, centered, centerText }: Props) => {
  return (
    <BootstrapModal {...{ show, onHide, centered }}>
      <BootstrapModal.Header closeButton>{ModalHeader}</BootstrapModal.Header>
      <BootstrapModal.Body className={centerText ? 'text-center' : ''}>{ModalBody}</BootstrapModal.Body>
    </BootstrapModal>
  );
};
