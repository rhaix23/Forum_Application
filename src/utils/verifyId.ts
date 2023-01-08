import { toast } from "react-toastify";

export const verifyId = (id: string) => {
  const regex = /^[a-fA-F0-9]{24}$/;
  if (!regex.test(id)) {
    toast.error("Invalid id");
    return false;
  }
  return true;
};
