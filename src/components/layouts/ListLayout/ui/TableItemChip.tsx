import { useEffect, useState } from "react";
import { getExpenseConcepts } from "../../../../store/expenses/expenses.selector";
import { useSelector } from "react-redux";
import { getComplementaryColor, getOptionsType, getPropById } from "../../../../utils/getters";
import { StyledChip } from "../ListLayout.styled";

export const TableItemChip = ({ id, title }: { id: string; title: string }) => {
  const [items, setItems] = useState<{ id: string; name: string; color: string }[]>([]);
  const concepts = useSelector(getExpenseConcepts);
  const chipColor = getPropById(id, items, "color");

  useEffect(() => {
    const type = getOptionsType(title);
    if (type === "concept") setItems(concepts.expensesConcepts || []);
  }, [title, concepts]);

  return (
    <StyledChip
      label={getPropById(id, items, "name")}
      chipcolor={chipColor}
      chipTextColor={getComplementaryColor(chipColor)}
    />
  );
};
