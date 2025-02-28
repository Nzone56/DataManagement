import { MenuItem, Select } from "@mui/material";
import { ColumnJustifyFlex } from "../../../Components.styled";
import { codeToText, localeDictionary } from "../../../../utils/locale";
import { ModalFormTitle } from "../ListModal.styled";
import { useEffect, useState } from "react";
import { getSimpleOptions } from "../../../../utils/getters";

interface SelectItemProps<T1> {
  item: string;
  managedItem: T1;
  onChangeItemValue: (key: keyof T1, value: unknown) => void;
}

export const ModalSimpleSelect = <T1 extends Record<string, unknown>>({
  item,
  managedItem,
  onChangeItemValue,
}: SelectItemProps<T1>) => {
  const [selectOptions, setSelectOptions] = useState<string[]>([]);

  useEffect(() => {
    setSelectOptions(getSimpleOptions(item));
    //eslint-disable-next-line
  }, []);

  return (
    <ColumnJustifyFlex mt={2} mr={4}>
      <ModalFormTitle>{codeToText(String(item) as keyof typeof localeDictionary)}:</ModalFormTitle>
      <Select
        value={managedItem[item as keyof T1]}
        onChange={(e) => onChangeItemValue(item as keyof T1, e.target.value)}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
      >
        {selectOptions?.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </ColumnJustifyFlex>
  );
};
