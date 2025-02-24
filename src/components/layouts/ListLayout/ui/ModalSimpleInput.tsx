import { TextField } from "@mui/material";
import { ColumnJustifyFlex } from "../../../Components.styled";
import { codeToText, localeDictionary } from "../../../../utils/locale";
import { ModalFormTitle } from "../ListModal.styled";

interface SimpleInputProps<T> {
  item: string;
  managedItem: T;
  onChangeItemValue: (key: keyof T, value: unknown) => void;
}

export const ModalSimpleInput = <T extends Record<string, unknown>>({
  item,
  managedItem,
  onChangeItemValue,
}: SimpleInputProps<T>) => {
  return (
    <ColumnJustifyFlex key={item} mt={2} mr={4}>
      <ModalFormTitle>{codeToText(String(item) as keyof typeof localeDictionary)}:</ModalFormTitle>
      <TextField
        key={item}
        variant="outlined"
        placeholder={`${codeToText(String(item) as keyof typeof localeDictionary).toLocaleLowerCase()}...`}
        size="small"
        onChange={(e) => onChangeItemValue(item as keyof T, e.target.value)}
        value={managedItem[item as keyof T]}
        // label={codeToText(String(item) as keyof typeof localeDictionary)}
      />
    </ColumnJustifyFlex>
  );
};
