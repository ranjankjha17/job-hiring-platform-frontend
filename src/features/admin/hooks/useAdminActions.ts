import { toast } from "sonner";
import {
  approveJob as approveJobApi,
  toggleUserBlock as toggleUserBlockApi,
  makeAdmin as makeAdminApi,
} from "../services/admin.service";

export const useAdminActions = () => {
  const approveJob = async (id: string) => {
    const data = await approveJobApi(id);
    toast.success(data.message || "Job approved successfully");
    return data;
  };

  const toggleUserBlock = async (id: string) => {
    const data = await toggleUserBlockApi(id);
    toast.success(data.message || "User status updated");
    return data;
  };

  const makeAdmin = async (id: string) => {
    const data = await makeAdminApi(id);
    toast.success(data.message || "User promoted to admin");
    return data;
  };

  return { approveJob, toggleUserBlock, makeAdmin };
};
