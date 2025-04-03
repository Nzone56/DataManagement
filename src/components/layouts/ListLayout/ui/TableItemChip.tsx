import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getExpenseConcepts } from "../../../../store/expenses/expenses.selector";
import { getComplementaryColor, getOptionsType, getPropById } from "../../../../utils/getters";
import { StyledChip, StyledTooltip } from "../ListLayout.styled";

export const TableItemChip = ({ id, title }: { id: string; title: string }) => {
  const [items, setItems] = useState<{ id: string; name: string; color: string }[]>([]);
  const concepts = useSelector(getExpenseConcepts);
  const chipColor = getPropById(id, items, "color");

  useEffect(() => {
    const type = getOptionsType(title);
    if (type === "concept") setItems(concepts.expensesConcepts || []);
  }, [title, concepts]);

  const fullLabel = getPropById(id, items, "name") || "";
  const truncatedLabel = fullLabel.length > 32 ? `${fullLabel.substring(0, 29)}...` : fullLabel;

  return (
    <StyledTooltip title={fullLabel} arrow disableHoverListener={fullLabel.length <= 18}>
      <span>
        <StyledChip label={truncatedLabel} chipcolor={chipColor} chiptextcolor={getComplementaryColor(chipColor)} />
      </span>
    </StyledTooltip>
  );
};
