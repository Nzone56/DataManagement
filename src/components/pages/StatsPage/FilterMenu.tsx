import { useState, MouseEvent } from "react";
import { Menu, Typography, Button } from "@mui/material";
import { CenteredBox } from "../../Components.styled";
import { FilterCheckbox, FilterItemText, SmallMenuItem } from "./Stats.styled";

type FilterCategory = {
  name: string;
  enabled: boolean;
};

type FilterMenuProps = {
  localCategories: FilterCategory[];
  setLocalCategories: React.Dispatch<React.SetStateAction<FilterCategory[]>>;
};

const FilterMenu: React.FC<FilterMenuProps> = ({ localCategories, setLocalCategories }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleCategory = (name: string) => {
    setLocalCategories((prev: FilterCategory[]) =>
      prev.map((category) => (category.name === name ? { ...category, enabled: !category.enabled } : category))
    );
  };

  return (
    <CenteredBox mb={2}>
      <Typography variant="h6" mr={1}>
        Filtro de clientes:
      </Typography>
      <Button onClick={handleClick} variant="outlined" size="small">
        Seleccionar Filtros
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {localCategories.map((option) => (
          <SmallMenuItem key={option.name} onClick={() => toggleCategory(option.name)} dense>
            <FilterCheckbox checked={option.enabled} size="small" />
            <FilterItemText>{option.name}</FilterItemText>
          </SmallMenuItem>
        ))}
      </Menu>
    </CenteredBox>
  );
};

export default FilterMenu;
