import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSettings } from "./useSettings";
import Spinner from "../../ui/Spinner";
import { useUpdateSetting } from "./useUpdateSetting";

function UpdateSettingsForm() {
  const { isLoading, settings } = useSettings();

  const {
    minBookingLength,
    maxBookingLength,
    maxGuestsPerBooking,
    breakfastPrice,
  } = settings ?? {};

  const { isUpdating, updateSetting } = useUpdateSetting();

  function handleUpdateSetting(attribute, value) {
    if (!value) {
      return;
    }

    updateSetting({ [attribute]: value });
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          onBlur={(e) =>
            handleUpdateSetting("minBookingLength", +e.target.value)
          }
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          onBlur={(e) =>
            handleUpdateSetting("maxBookingLength", +e.target.value)
          }
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
          onBlur={(e) =>
            handleUpdateSetting("maxGuestsPerBooking", +e.target.value)
          }
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          onBlur={(e) => handleUpdateSetting("breakfastPrice", +e.target.value)}
          disabled={isUpdating}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
