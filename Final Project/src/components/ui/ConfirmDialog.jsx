import { Modal } from './Modal';
import { Button } from '../common/Button';

// A specific use case (confirm-then-destroy) built on top of the generic
// Modal, rather than duplicating the portal/escape-key/scroll-lock logic.
export function ConfirmDialog({ isOpen, onClose, onConfirm, title = 'Are you sure?', description }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      {description && <p className="mb-6 text-sm text-ink-muted">{description}</p>}
      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            onConfirm();
            onClose();
          }}
        >
          Delete
        </Button>
      </div>
    </Modal>
  );
}
