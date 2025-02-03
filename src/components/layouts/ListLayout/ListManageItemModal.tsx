import { Modal, Box, Typography, IconButton, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import {
  CenterdBox,
  CenteredBoxBetween,
  ColumnJustifyFlex,
  PrimaryButton,
} from "../../Components.styled";
import { convertToDate, convertToTimestamp } from "../../../utils/dates";
import DatePicker from "react-datepicker";
import { codeToText, localeDictionary } from "../../../utils/locale";

type CustomModalProps<T> = {
  show: boolean;
  onHide: () => void;
  title: string;
  modalType: string;
  list: string[];
  initialValue: T;
};

export const ListManageItemModal = <T extends Record<string, unknown>>({
  show,
  onHide,
  title,
  modalType,
  list,
  initialValue,
}: CustomModalProps<T>) => {
  const [managedItem, setManagedItem] = useState<T>(initialValue);
  const onChangeItemValue = <K extends keyof T>(key: K, value: unknown) => {
    let newValue = value;

    // Si el valor es numérico en el tipo T, convierte el valor a número
    if (typeof managedItem[key] === "number" && !isNaN(Number(value))) {
      newValue = Number(value);
    }

    setManagedItem((prev) => ({
      ...prev,
      [key]: newValue as T[K],
    }));
  };

  useEffect(() => {
    console.log(managedItem);
  }, [managedItem]);

  return (
    <Modal open={show} onClose={onHide} aria-labelledby="modal-title">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "white",
          boxShadow: 24,
          p: 3,
          borderRadius: 2,
        }}
      >
        {/* MODAL HEADER */}
        <CenteredBoxBetween>
          <Typography id="modal-title" variant="h6">
            {modalType === "create" ? `Crear ${title}` : `Editar ${title}`}
          </Typography>
          <IconButton onClick={onHide}>
            <CloseIcon />
          </IconButton>
        </CenteredBoxBetween>
        {/* MODAL BODY  */}
        <ColumnJustifyFlex sx={{ mt: 2 }}>
          {list.map((item) => {
            if (String(item.toLocaleLowerCase()).includes("date")) {
              return (
                <CenteredBoxBetween key={item}>
                  <Typography mr={1}>
                    {codeToText(String(item) as keyof typeof localeDictionary)}:
                  </Typography>
                  <Box>
                    <DatePicker
                      id="exampleDate"
                      name="date"
                      onChange={(date) =>
                        onChangeItemValue(
                          item as keyof T,
                          convertToTimestamp(String(date))
                        )
                      }
                      selected={
                        typeof managedItem[item] === "number"
                          ? convertToDate(managedItem[item])
                          : typeof managedItem[item] === "string" &&
                            !isNaN(Number(managedItem[item]))
                          ? convertToDate(Number(managedItem[item]))
                          : null
                      }
                    />
                  </Box>
                </CenteredBoxBetween>
              );
            } else {
              return (
                <CenteredBoxBetween key={item}>
                  <Typography mr={1}>
                    {codeToText(String(item) as keyof typeof localeDictionary)}:
                  </Typography>
                  <TextField
                    key={item}
                    variant="outlined"
                    placeholder={`${codeToText(
                      String(item) as keyof typeof localeDictionary
                    ).toLocaleLowerCase()}...`}
                    size="small"
                    onChange={(e) =>
                      onChangeItemValue(item as keyof T, e.target.value)
                    }
                    value={managedItem[item as keyof T]}
                  />
                </CenteredBoxBetween>
              );
            }
          })}
        </ColumnJustifyFlex>
        {/* M0DAL FOOTER */}
        <CenterdBox sx={{ float: "right" }} mt={2}>
          <PrimaryButton>
            {modalType === "create" ? `Crear ` : `Editar`}
          </PrimaryButton>
        </CenterdBox>
      </Box>
    </Modal>
  );
};
