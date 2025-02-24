import { SketchPicker } from "react-color";
import { ColumnJustifyFlex } from "../../../Components.styled";
import { ModalFormTitle, ModalPickerPrev } from "../ListModal.styled";
import { codeToText, localeDictionary } from "../../../../utils/locale";
import { useCallback, useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";

interface ColorPickerProps<T> {
  item: string;
  managedItem: T;
  onChangeItemValue: (key: keyof T, value: unknown) => void;
}

export const ModalColorPicker = <T extends Record<string, unknown>>({
  item,
  managedItem,
  onChangeItemValue,
}: ColorPickerProps<T>) => {
  const [openPicker, setOpenPicker] = useState<boolean>(false);
  const pickerRef = useRef<HTMLDivElement | null>(null);
  const handleChangeColor = (color: { hex: string }) => {
    onChangeItemValue(item as keyof T, color.hex);
  };

  // Handle click outside the picker
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
      setOpenPicker(false);
    }
  }, []);

  // Listeeer then the picker is open
  useEffect(() => {
    if (openPicker) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [openPicker, handleClickOutside]);

  return (
    <ColumnJustifyFlex key={item} mt={2} mr={4}>
      <ModalFormTitle>{codeToText(String(item) as keyof typeof localeDictionary)}:</ModalFormTitle>
      <ModalPickerPrev color={String(managedItem[item as keyof T])} onClick={() => setOpenPicker((prev) => !prev)} />
      {openPicker ? (
        <Box style={{ width: "220px" }} ref={pickerRef}>
          <SketchPicker
            onChangeComplete={handleChangeColor}
            onChange={handleChangeColor}
            color={String(managedItem[item as keyof T])}
          />
        </Box>
      ) : null}
    </ColumnJustifyFlex>
  );
};
