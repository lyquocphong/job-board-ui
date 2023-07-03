import { ConfirmModalProps } from "../../types";

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  confirmLabel,
  cancelLabel,
  message,
  onClose,
  onConfirm,
}) => (
  <div className="bg-white rounded-lg p-4">
    <h2 className="text-xl font-bold mb-2">Confirm Modal</h2>
    <p className="mb-4">{message}</p>
    <div className="flex justify-end">
      <button
        className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 mr-2"
        onClick={onClose}
      >
        {cancelLabel}
      </button>
      <button
        className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white"
        onClick={onConfirm}
      >
        {confirmLabel}
      </button>
    </div>
  </div>
);

export default ConfirmModal;
