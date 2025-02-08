import { Modal, Box, IconButton, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useId, useState } from "react";
import { CenteredBox, ColumnJustifyFlex, PrimaryButton, StartBoxBetween } from "../../Components.styled";
import { convertToDate, convertToTimestamp } from "../../../utils/dates";
import DatePicker from "react-datepicker";
import { codeToText, localeDictionary } from "../../../utils/locale";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import {
  ModalFooter,
  ModalFormTitle,
  ModalIcon,
  ModalInnerContainer,
  ModalSubTitle,
  ModalTitle,
} from "./ListModal.styled";
import { menuSections } from "../../SideMenu/SideMenuVariables";
import { MenuOptionType } from "../../../models/interfaces/Other/IMenu";

type CustomModalProps<T> = {
  show: boolean;
  onHide: () => void;
  title: string;
  modalType: string;
  list: string[];
  initialValue: T;
  addItem: ActionCreatorWithPayload<T>;
  updateItem: ActionCreatorWithPayload<T>;
};

export const ListManageItemModal = <T extends Record<string, unknown>>({
  show,
  onHide,
  title,
  modalType,
  list,
  initialValue,
  addItem,
  updateItem,
}: CustomModalProps<T>) => {
  const dispatch = useDispatch();
  const [managedItem, setManagedItem] = useState<T>(initialValue);

  // We use it only when adding
  const id = useId();

  // Add Item
  const handleAddItem = () => {
    dispatch(addItem({ ...managedItem, id }));
    onHide();
  };

  // update Item
  const handleUpdateItem = () => {
    dispatch(updateItem(managedItem));
    onHide();
  };

  // Set the prop of Item with the right type
  const onChangeItemValue = <K extends keyof T>(key: K, value: unknown) => {
    let newValue = value;
    console.log(typeof managedItem[key]);
    // If the value on T is type numeric we do the typechange before setting it
    if (typeof managedItem[key] === "number" && !isNaN(Number(value))) {
      newValue = Number(value);
    }

    setManagedItem((prev) => ({
      ...prev,
      [key]: newValue as T[K],
    }));
  };

  return (
    <Modal open={show} onClose={onHide} aria-labelledby="modal-title">
      <ModalInnerContainer>
        {/* MODAL HEADER */}
        <StartBoxBetween>
          <CenteredBox>
            <ModalIcon>
              {menuSections[1].items.find((menu: MenuOptionType) => menu.label === title.concat("s"))?.component}
            </ModalIcon>
            <ColumnJustifyFlex>
              <ModalTitle id="modal-title">{modalType === "create" ? `Crear ${title}` : `Editar ${title}`}</ModalTitle>
              <ModalSubTitle>
                Llena el formulario para {modalType === "create" ? `crear` : `editar`} un {title}
              </ModalSubTitle>
            </ColumnJustifyFlex>
          </CenteredBox>
          <IconButton onClick={onHide}>
            <CloseIcon />
          </IconButton>
        </StartBoxBetween>
        {/* MODAL BODY  */}
        <ColumnJustifyFlex sx={{ mt: 2 }}>
          {list.map((item) => {
            if (String(item.toLocaleLowerCase()).includes("date")) {
              return (
                <ColumnJustifyFlex key={item}>
                  <ModalFormTitle mr={1}>{codeToText(String(item) as keyof typeof localeDictionary)}:</ModalFormTitle>
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
            } else {
              return (
                <ColumnJustifyFlex key={item} mb={2}>
                  <ModalFormTitle>{codeToText(String(item) as keyof typeof localeDictionary)}:</ModalFormTitle>
                  <TextField
                    key={item}
                    variant="outlined"
                    placeholder={`${codeToText(String(item) as keyof typeof localeDictionary).toLocaleLowerCase()}...`}
                    size="small"
                    onChange={(e) => onChangeItemValue(item as keyof T, e.target.value)}
                    value={managedItem[item as keyof T]}
                  />
                </ColumnJustifyFlex>
              );
            }
          })}
        </ColumnJustifyFlex>
        {/* M0DAL FOOTER */}
        <ModalFooter>
          <PrimaryButton
            onClick={modalType === "create" ? handleAddItem : handleUpdateItem}
            disabled={!Object.values(managedItem).every((prop, index) => prop || index === 0)}
          >
            {modalType === "create" ? `Crear ` : `Editar`}
          </PrimaryButton>
        </ModalFooter>
      </ModalInnerContainer>
    </Modal>
  );
};
