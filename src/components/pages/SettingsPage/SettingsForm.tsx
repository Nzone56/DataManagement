import { MenuItem, Select, Typography } from "@mui/material";
import { SettingsLayoutContainer } from "./SettingsForm.styled";
import { useDispatch, useSelector } from "react-redux";
import { getSettings } from "../../../store/settings/settings.selector";
import { useEffect, useState } from "react";
import { CenteredBox, ColumnJustifyFlex, PrimaryButton } from "../../Components.styled";
import { formatDateInternational, formatDateText } from "../../../utils/dates";
import type { ISettings } from "../../../models/interfaces/Settings/ISettings";
import { updateSettings } from "../../../store/settings/settings.actions";
import { deepEqual } from "../../../utils/compare";
import { AppDispatch } from "../../../store/store";
import { toZonedTime } from "date-fns-tz";

const initialSettings: ISettings = {
  id: "nubiatorres",
  theme: "light",
  dateFormat: "international",
};

export const SettingsForm = () => {
  const settings = useSelector(getSettings);
  const dispatch = useDispatch<AppDispatch>();

  const [localSettings, setLocalSettings] = useState<ISettings>(initialSettings);

  const saveSettings = () => {
    dispatch(updateSettings(localSettings));
    localStorage.setItem("settings", JSON.stringify(localSettings));
  };

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  return (
    <SettingsLayoutContainer>
      <ColumnJustifyFlex>
        <Typography variant="h3">General</Typography>
        <CenteredBox mt={2}>
          <Typography variant="h5" mr={2}>
            Tema:
          </Typography>
          <Select
            sx={{ width: "200px" }}
            size="small"
            value={localSettings?.theme}
            onChange={(e) =>
              setLocalSettings((prev) => ({
                ...prev,
                theme: e.target.value as "light" | "dark",
                dateFormat: prev?.dateFormat || "text",
              }))
            }
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value="light">Claro</MenuItem>
            <MenuItem value="dark">Oscuro</MenuItem>
          </Select>
        </CenteredBox>
      </ColumnJustifyFlex>
      <ColumnJustifyFlex mt={4}>
        <Typography variant="h3">Formateo de Datos</Typography>
        <CenteredBox mt={2}>
          <Typography variant="h5" mr={2}>
            Estilo de Fecha:
          </Typography>
          <Select
            sx={{ width: "200px" }}
            size="small"
            value={localSettings?.dateFormat}
            onChange={(e) =>
              setLocalSettings((prev) => ({
                ...prev,
                theme: prev?.theme || "light",
                dateFormat: e.target.value as "text" | "international",
              }))
            }
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value="text">{formatDateText(toZonedTime(new Date(), "America/Bogota").getTime())}</MenuItem>
            <MenuItem value="international">
              {formatDateInternational(toZonedTime(new Date(), "America/Bogota").getTime())}
            </MenuItem>
          </Select>
        </CenteredBox>
      </ColumnJustifyFlex>
      <CenteredBox mt={4}>
        <PrimaryButton onClick={saveSettings} disabled={deepEqual(localSettings, settings)}>
          Guardar
        </PrimaryButton>
      </CenteredBox>
    </SettingsLayoutContainer>
  );
};
