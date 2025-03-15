import { TextField, Typography } from "@mui/material";
import { ColumnJustifyFlex } from "../../../Components.styled";
import { codeToText, localeDictionary } from "../../../../utils/locale";
import { ModalFormTitle } from "../ListModal.styled";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getClients } from "../../../../store/clients/clients.selector";
import { getLawyers } from "../../../../store/lawyers/lawyers.selector";
import { getExpenseConcepts } from "../../../../store/expenses/expenses.selector";
import { getWorklogs } from "../../../../store/worklogs/worklogs.selector";
import { Client } from "../../../../models/interfaces/Client/IClient";
import { Lawyer } from "../../../../models/interfaces/Lawyer/ILawyer";
import { ExpenseConcept } from "../../../../models/interfaces/Expense/IExpense";
import { Worklog } from "../../../../models/interfaces/TimeManager/IWorklog";
type Errors = {
  name: boolean;
  id: boolean;
  nitcc: boolean;
  cc: boolean;
};

interface SimpleInputProps<T> {
  item: string;
  managedItem: T;
  onChangeItemValue: (key: keyof T, value: unknown) => void;
  title: string;
  errors: Errors;
  setErrors: React.Dispatch<React.SetStateAction<Errors>>;
}

type EntityList = Client[] | Lawyer[] | ExpenseConcept[] | Worklog[];
export const ModalSimpleInput = <T extends Record<string, unknown>>({
  item,
  managedItem,
  onChangeItemValue,
  title,
  errors,
  setErrors,
}: SimpleInputProps<T>) => {
  const { clients } = useSelector(getClients);
  const { lawyers } = useSelector(getLawyers);
  const { expensesConcepts } = useSelector(getExpenseConcepts);
  const { worklogs } = useSelector(getWorklogs);

  const removeSpaces = (str: string) => String(str).replace(/\s+/g, "");
  useEffect(() => {
    type DataMap = {
      [key: string]: { list: EntityList; keys: string[] };
    };

    const dataMap: DataMap = {
      Cliente: { list: clients, keys: ["name", "nitcc"] },
      Abogado: { list: lawyers, keys: ["name", "cc"] },
      Concepto: { list: expensesConcepts, keys: ["name"] },
      TimeManager: { list: worklogs, keys: ["id"] },
    };

    if (title in dataMap && dataMap[title].keys.includes(item)) {
      const { list } = dataMap[title];

      const exists = list.some(
        (entry) =>
          removeSpaces(
            String(entry[item as keyof (Client | Lawyer | ExpenseConcept | Worklog)] ?? "")
          ).toLocaleLowerCase() === removeSpaces(String(managedItem[item] ?? "")).toLocaleLowerCase()
      );

      setErrors((prev: Errors) => ({ ...prev, [item]: exists }));
    }
    // eslint-disable-next-line
  }, [managedItem]);

  return (
    <ColumnJustifyFlex key={item} mt={2} mr={4}>
      <ModalFormTitle>{codeToText(String(item) as keyof typeof localeDictionary)}:</ModalFormTitle>
      <TextField
        key={item}
        variant="outlined"
        placeholder={`${codeToText(String(item) as keyof typeof localeDictionary)?.toLocaleLowerCase()}...`}
        size="small"
        onChange={(e) => onChangeItemValue(item as keyof T, e.target.value)}
        value={managedItem[item as keyof T]}
      />
      {errors[item as keyof Errors] && (
        <Typography variant="body1" color="error">
          Ya existe un {title} con ese {codeToText(String(item) as keyof typeof localeDictionary)} creado
        </Typography>
      )}
    </ColumnJustifyFlex>
  );
};
