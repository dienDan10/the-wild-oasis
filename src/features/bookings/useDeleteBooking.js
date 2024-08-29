import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: (bookingId) => deleteBookingApi(bookingId),
    onSuccess: () => {
      toast.success(`Delete booking successfully!`);
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: () => {
      toast.error("There was an error while delete booking");
    },
  });

  return { isDeleting, deleteBooking };
}
