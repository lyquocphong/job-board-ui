import { BaseModalProps } from "../../types";

const BaseModal: React.FC<BaseModalProps> = ({ message, onClose, cancelLabel }) => (
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
    </div>
  </div>
);

export default BaseModal;