interface ValidityProps {
  isValid: boolean;
  field: string;
  value: string;
  isRequired?: boolean;
  invalidFields: string[];
  setInvalidFields: (newInvalidFields: string[]) => void;
}

export default function handleValidity({
  isValid,
  field,
  value,
  invalidFields,
  setInvalidFields,
  isRequired = true,
}: ValidityProps) {
  if (isRequired) {
    if (isValid) {
      const updatedInvalidFields = invalidFields.filter(
        (f: string) => f !== field
      );
      setInvalidFields(updatedInvalidFields);
    } else if (!isValid) {
      const updatedInvalidFields = [...invalidFields, field];
      setInvalidFields(updatedInvalidFields);
    }
  } else {
    if (isValid || value === "") {
      const updatedInvalidFields = invalidFields.filter(
        (field: string) => field !== field
      );
      setInvalidFields(updatedInvalidFields);
    } else if (!isValid) {
      const updatedInvalidFields = [...invalidFields, field];
      setInvalidFields(updatedInvalidFields);
    }
  }
}
