import { MenuItem, Select } from "@mui/material";
import { ColumnJustifyFlex } from "../../../Components.styled";
import { codeToText, localeDictionary } from "../../../../utils/locale";
import { ModalFormTitle } from "../ListModal.styled";
import { useSelector } from "react-redux";
import { getExpenseConcepts } from "../../../../store/expenses/expenses.selector";
import { useEffect, useState } from "react";
import { getOptionsType } from "../../../../utils/getters";

interface SelectItemProps<T1> {
  item: string;
  managedItem: T1;
  onChangeItemValue: (key: keyof T1, value: unknown) => void;
}

export const ModalSelectItem = <T1 extends Record<string, unknown>>({
  item,
  managedItem,
  onChangeItemValue,
}: SelectItemProps<T1>) => {
  const [selectOptions, setSelectOptions] = useState<{ id: string; name: string; type?: string; color: string }[]>();
  const concepts = useSelector(getExpenseConcepts);

  const getSelectOptions = () => {
    const type = getOptionsType(item);
    if (type === "concept") setSelectOptions(concepts.expensesConcepts);
  };

  useEffect(() => {
    getSelectOptions();
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
        <MenuItem value="">Sin definir</MenuItem>
        {selectOptions?.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
            <Typography style={{ color: String(option.color) }}>
              &nbsp;
              {option.type ? `(${option.type})` : ""}
            </Typography>
          </MenuItem>
        ))}
      </Select>
    </ColumnJustifyFlex>
  );
};
