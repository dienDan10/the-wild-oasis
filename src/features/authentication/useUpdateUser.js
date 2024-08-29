import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateUser } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: ({ user }) => {
      toast.success("Update user information successfully");
      queryClient.setQueryData(["user"], user);
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isUpdating, updateUser };
}
