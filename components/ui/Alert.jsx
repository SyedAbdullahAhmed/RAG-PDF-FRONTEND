// components/Alert.js
import { CheckCircleIcon, XCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';

const Alert = ({ type = 'success', title, message, onClose }) => {
  const isSuccess = type === 'success';

  const icon = isSuccess ? (
    <CheckCircleIcon className="size-6 text-green-600" />
  ) : (
    <XCircleIcon className="size-6 text-red-600" />
  );

  return (
    <div
      role="alert"
      className={`rounded-md border p-4 shadow-sm ${
        isSuccess ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50'
      }`}
    >
      <div className="flex items-start gap-4">
        {icon}

        <div className="flex-1">
          <strong className={`font-medium ${isSuccess ? 'text-green-900' : 'text-red-900'}`}>
            {title}
          </strong>
          <p className="mt-0.5 text-sm text-gray-700">{message}</p>
        </div>

        <button
          onClick={onClose}
          className="-m-3 rounded-full p-1.5 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
          type="button"
          aria-label="Dismiss alert"
        >
          <XMarkIcon className="size-5" />
        </button>
      </div>
    </div>
  );
};

export default Alert;
