import toast from "react-hot-toast";

export const handleError = (error: any) => {
  console.log(error.data.message);
  toast.error("Error: " + error.data.message);
};