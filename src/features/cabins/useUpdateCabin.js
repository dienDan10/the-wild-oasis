import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createEditCabin } from "../../services/apiCabins";

export function useUpdateCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isEditing, mutate: editCabin } = useMutation({
    mutationFn: (newCabinData) => createEditCabin(newCabinData),
    onSuccess: () => {
      toast.success("Update cabin successfullly!");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editCabin };
}
