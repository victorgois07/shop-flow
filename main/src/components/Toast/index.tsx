type ToastProps = {
  message: string;
};

const Toast = ({ message }: ToastProps) => {
  return (
    <div className="toast toast-bottom toast-end">
      <div className="alert alert-success">
        <span className="text-white">{message}</span>
      </div>
    </div>
  );
};

export default Toast;
