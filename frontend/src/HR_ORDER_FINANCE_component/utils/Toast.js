import toast from "react-hot-toast";

const Toast = (props) => {
  // Success toast
  if (props.type === "success") {
    toast.success(props.message);
  }
  // Error toast
  else if (props.type === "error") {
    toast.error(props.message);
  }
  // Loading toast
  else if (props.type === "loading") {
    toast.loading(props.message);
  }
  // Promise toast
  else if (props.type === "promise") {
    toast.promise(props.myPromise, {
      loading: props.loadingMessage,
      success: props.successMessage,
      error: props.errorMessage,
    });
  }
  // Default toast
  else {
    toast(props.message);
  }
};

export default Toast;
