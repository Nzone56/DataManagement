import { Chip, TextField } from "@mui/material";
import { CenteredBox, CenteredBoxBetween, ColumnJustifyFlex, PrimaryButton } from "../../../Components.styled";
import { codeToText, localeDictionary } from "../../../../utils/locale";
import { CloseIcon, ModalFormTitle } from "../ListModal.styled";
import { Add as AddIcon } from "@mui/icons-material";
import { useState } from "react";
import { getComplementaryColor } from "../../../../utils/getters";

interface SimpleInputProps<T> {
  item: string;
  managedItem: T;
  onChangeItemValue: (key: keyof T, value: unknown) => void;
}

export const ModalOptions = <T extends Record<string, unknown>>({
  item,
  managedItem,
  onChangeItemValue,
}: SimpleInputProps<T>) => {
  const [newConcept, setNewConcept] = useState<string>("");

  const handleAddConcept = () => {
    const currentArray = Array.isArray(managedItem[item]) ? managedItem[item] : [];
    onChangeItemValue(item as keyof T, [...currentArray, newConcept]);
  };

  const handleDelete = (deleteItem: string) => {
    onChangeItemValue(
      item as keyof T,
      Array.isArray(managedItem[item]) && managedItem[item].filter((subitem: string) => subitem !== deleteItem)
    );
  };

  return (
    <ColumnJustifyFlex key={item} mt={2} mr={4}>
      <ModalFormTitle>{codeToText(String(item) as keyof typeof localeDictionary)}:</ModalFormTitle>
      <CenteredBoxBetween>
        <TextField
          key={item}
          variant="outlined"
          placeholder={`${codeToText(String(item) as keyof typeof localeDictionary).toLocaleLowerCase()}...`}
          size="small"
          onChange={(e) => setNewConcept(e.target.value)}
          value={newConcept}
          sx={{ flexGrow: 1, marginRight: "12px" }}
        />
        <PrimaryButton variant="contained" startIcon={<AddIcon />} onClick={handleAddConcept}>
          Añadir
        </PrimaryButton>
      </CenteredBoxBetween>
      <CenteredBox mt={2}>
        {Array.isArray(managedItem[item]) &&
          managedItem[item].map((item: string) => (
            <Chip
              label={item}
              onDelete={() => handleDelete(item)}
              sx={{
                marginRight: "10px",
                backgroundColor: managedItem.color || "#FFFFFF29",
                color: getComplementaryColor(String(managedItem.color)),
              }}
              deleteIcon={<CloseIcon xcolor={getComplementaryColor(String(managedItem.color))} />}
            />
          ))}
      </CenteredBox>
    </ColumnJustifyFlex>
  );
};
