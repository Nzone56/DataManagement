import { Box } from "@mui/material";
import { codeToText, localeDictionary } from "../../../../utils/locale";
import { ColumnJustifyFlex } from "../../../Components.styled";
import { ModalFormTitle } from "../ListModal.styled";
import { convertToDate, convertToTimestamp } from "../../../../utils/dates";
import DatePicker from "react-datepicker";

interface DatePickerProps<T> {
  item: string;
  managedItem: T;
  onChangeItemValue: (key: keyof T, value: number) => void;
}

export const ModalDatePicker = <T extends Record<string, unknown>>({
  item,
  managedItem,
  onChangeItemValue,
}: DatePickerProps<T>) => {
  return (
    <ColumnJustifyFlex key={item} mt={2} mr={4}>
      <ModalFormTitle mr={1}>{codeToText(item as keyof typeof localeDictionary)}:</ModalFormTitle>
      <Box>
        <DatePicker
          id="exampleDate"
          name="date"
          onChange={(date) => onChangeItemValue(item as keyof T, convertToTimestamp(String(date)))}
          selected={
            typeof managedItem[item] === "number"
              ? convertToDate(managedItem[item])
              : typeof managedItem[item] === "string" && !isNaN(Number(managedItem[item]))
              ? convertToDate(Number(managedItem[item]))
              : null
          }
        />
      </Box>
    </ColumnJustifyFlex>
  );
};
