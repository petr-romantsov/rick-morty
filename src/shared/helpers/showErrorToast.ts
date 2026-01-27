import toast from 'react-hot-toast';

export const showErrorToast = (message: string): void => {
  toast.error(message);
};
