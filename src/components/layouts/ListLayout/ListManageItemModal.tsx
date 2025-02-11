import { Modal, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useId, useState } from "react";
import { CenteredBox, ColumnJustifyFlex, PrimaryButton, StartBoxBetween } from "../../Components.styled";
import { AsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { ModalBody, ModalFooter, ModalIcon, ModalInnerContainer, ModalSubTitle, ModalTitle } from "./ListModal.styled";
import { menuSections } from "../../SideMenu/SideMenuVariables";
import { MenuOptionType } from "../../../models/interfaces/Other/IMenu";
import { AppDispatch, ThunkApiConfig } from "../../../store/store";
import { ModalDatePicker } from "./ui/ModalDatePicker";
import { ModalSimpleInput } from "./ui/ModalSimpleInput";
import { ModalSelectItem } from "./ui/ModalSelectItem";
import { ModalColorPicker } from "./ui/ModalColorPicker";

type CustomModalProps<T> = {
  show: boolean;
  onHide: () => void;
  title: string;
  modalType: string;
  list: string[];
  initialValue: T;
  addItem: AsyncThunk<T, T, ThunkApiConfig>;
  updateItem: AsyncThunk<T, T, ThunkApiConfig>;
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
  const dispatch = useDispatch<AppDispatch>();
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
          {}
        </StartBoxBetween>
        {/* MODAL BODY  */}

        <ModalBody>
          {list.map((item) => {
            // DATE PICKER
            if (String(item.toLocaleLowerCase()).includes("date")) {
              return (
                <ModalDatePicker
                  key={item}
                  item={item}
                  managedItem={managedItem}
                  onChangeItemValue={onChangeItemValue}
                />
              );
              // COLOR PICKER
            } else if (String(item.toLocaleLowerCase()).includes("color")) {
              return (
                <ModalColorPicker
                  key={item}
                  item={item}
                  managedItem={managedItem}
                  onChangeItemValue={onChangeItemValue}
                />
              );
              // SELECT WITH TYPE
            } else if (String(item.toLocaleLowerCase()).includes("id")) {
              return (
                <ModalSelectItem
                  key={item}
                  item={item}
                  managedItem={managedItem}
                  onChangeItemValue={onChangeItemValue}
                />
              );
              // SIMPLE INPUT
            } else {
              return (
                <ModalSimpleInput
                  key={item}
                  item={item}
                  managedItem={managedItem}
                  onChangeItemValue={onChangeItemValue}
                />
              );
            }
          })}
        </ModalBody>

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
