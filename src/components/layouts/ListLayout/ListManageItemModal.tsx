import { Modal, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { CenteredBox, ColumnJustifyFlex, PrimaryButton } from "../../Components.styled";
import { AsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalIcon,
  ModalInnerContainer,
  ModalSubTitle,
  ModalTitle,
} from "./ListModal.styled";
import { AppDispatch, ThunkApiConfig } from "../../../store/store";
import { ModalDatePicker } from "./ui/ModalDatePicker";
import { ModalSimpleInput } from "./ui/ModalSimpleInput";
import { ModalSelectItem } from "./ui/ModalSelectItem";
import { ModalColorPicker } from "./ui/ModalColorPicker";
import { useSideMenu } from "../../../hooks/useSideMenu";
import { ModalChips } from "./ui/ModalChips";
import { ModalSimpleSelect } from "./ui/ModalSimpleSelect";

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

type Errors = {
  name: boolean;
  id: boolean;
  nitcc: boolean;
  cc: boolean;
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
  const { currentMenuOption } = useSideMenu();
  const [errors, setErrors] = useState<Errors>({ name: false, id: false, cc: false, nitcc: false });
  // We use it only when adding
  const id = crypto.randomUUID();

  // Add Item
  const handleAddItem = () => {
    if (title === "TimeManager") {
      dispatch(addItem({ ...managedItem }));
    } else {
      dispatch(addItem({ ...managedItem, id }));
    }
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
        <ModalHeader>
          <CenteredBox>
            <ModalIcon>{currentMenuOption.component}</ModalIcon>
            <ColumnJustifyFlex>
              <ModalTitle variant="h4" id="modal-title">
                {modalType === "create" ? `Crear ${title}` : `Editar ${title}`}
              </ModalTitle>
              <ModalSubTitle>
                Llena el formulario para {modalType === "create" ? `crear` : `editar`} un {title}
              </ModalSubTitle>
            </ColumnJustifyFlex>
          </CenteredBox>
          <IconButton onClick={onHide}>
            <CloseIcon />
          </IconButton>
        </ModalHeader>
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
            } else if (String(item.toLocaleLowerCase()).includes("id") && String(item.toLocaleLowerCase()) !== "id") {
              return (
                <ModalSelectItem
                  key={item}
                  item={item}
                  managedItem={managedItem}
                  onChangeItemValue={onChangeItemValue}
                />
              );
              // SELECT WITH TYPE
            } else if (String(item.toLocaleLowerCase()) === "feeconcept") {
              return (
                <ModalSimpleSelect
                  key={item}
                  item={item}
                  managedItem={managedItem}
                  onChangeItemValue={onChangeItemValue}
                />
              );
            } else if (String(item.toLocaleLowerCase()) === "categories") {
              return (
                <ModalChips key={item} item={item} managedItem={managedItem} onChangeItemValue={onChangeItemValue} />
              );
              // SIMPLE INPUT
            } else {
              return (
                <ModalSimpleInput
                  key={item}
                  item={item}
                  title={title}
                  managedItem={managedItem}
                  onChangeItemValue={onChangeItemValue}
                  errors={errors}
                  setErrors={setErrors}
                />
              );
            }
          })}
        </ModalBody>
        {/* M0DAL FOOTER */}
        <ModalFooter>
          <PrimaryButton
            onClick={modalType === "create" ? handleAddItem : handleUpdateItem}
            disabled={
              !Object.values(managedItem).every((prop, index) => prop || index === 0) || errors.name || errors.id
            }
          >
            {modalType === "create" ? `Crear ` : `Editar`}
          </PrimaryButton>
        </ModalFooter>
      </ModalInnerContainer>
    </Modal>
  );
};
