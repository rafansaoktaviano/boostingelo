import { ToastOptions, toast } from "react-toastify";

const toastStyle = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};

export const toastSuccess = (text: string) =>
  toast.success(text, toastStyle as ToastOptions);
export const toastError = (text: string) =>
  toast.error(text, toastStyle as ToastOptions);
