import { Box, IconButton, List, ListItem, Modal, Typography } from "@mui/material";
import * as XLSX from "xlsx";
import { ModalBody, ModalFooter, ModalHeader, ModalInnerContainer, ModalTitle } from "./ListModal.styled";
import { RawWorklog, Worklog } from "../../../models/interfaces/TimeManager/IWorklog";
import { useEffect, useState } from "react";
import { ColumnAlignFlex, PrimaryButton } from "../../Components.styled";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useTransformData } from "../../../hooks/useTransformData";
import { useDispatch } from "react-redux";
import { setWorklogs } from "../../../store/worklogs/worklogs.actions";
import { AppDispatch } from "../../../store/store";

type CustomModalProps = {
  show: boolean;
  onHide: () => void;
  title: string;
};

export const ListModalUpload = ({ show, onHide, title }: CustomModalProps) => {
  const [state, setState] = useState({
    loaded: false,
    error: false,
    msg: "",
  });
  const [data, setData] = useState<Worklog[]>([]);
  const { mapHeadersToWorklog, errorClients, errorLawyers, duplicatedData } = useTransformData();
  const dispatch = useDispatch<AppDispatch>();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      setState((prev) => ({ ...prev, error: true, msg: "No se ha seleccionado ningún archivo." }));
      return;
    }

    if (!file.name.endsWith(".xlsx")) {
      setState((prev) => ({
        ...prev,
        error: true,
        msg: "Formato de archivo no permitido. Solo se aceptan archivos .xlsx",
      }));
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const sheetdata = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(sheetdata, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData: RawWorklog[] = XLSX.utils.sheet_to_json(sheet);

        const transformedData = mapHeadersToWorklog(jsonData);
        setData(transformedData);
        setState((prev) => ({
          ...prev,
          error: false,
          loaded: true,
          msg: `Se han cargado satisfactoriamente ${jsonData.length} datos`,
        }));
      } catch (error) {
        setState((prev) => ({ ...prev, error: true, msg: `Error al procesar el archivo: ${error}` }));
      }
    };
    reader.onerror = () => setState((prev) => ({ ...prev, error: true, msg: "Error al leer el archivo." }));
    reader.readAsArrayBuffer(file);
  };

  const handleUpload = async () => {
    try {
      console.log(data);
      await dispatch(setWorklogs(data));
      onHide();
    } catch (error) {
      console.error("Error al subir worklogs:", error);
    }
  };

  useEffect(() => {
    if (errorClients.length > 0 || errorLawyers.length > 0) {
      setState((prev) => ({
        ...prev,
        error: true,
        msg: "missing",
      }));
    }
  }, [data, errorClients, errorLawyers]);

  //TODO: CHECK DOUBLE ERROR, DUPLICATED AND NOT FIND CLIENT/LAWYER
  return (
    <Modal open={show} onClose={onHide} aria-labelledby="modal-title">
      <ModalInnerContainer>
        {/* MODAL HEADER */}
        <ModalHeader>
          <ModalTitle variant="h4" id="modal-title">
            {`Subir ${title}`}
          </ModalTitle>
        </ModalHeader>
        {/* MODAL BODY  */}

        <ModalBody alignItems={"center"}>
          <ColumnAlignFlex mt={5}>
            <Typography variant="body1">
              NOTA: ASEGURARSE QUE LOS CLIENTES Y ABOGADOS ESTEN AÑÁDIDOS Y SU NOMBRE SEA EXACTAMENTE IGUAL TANTO EN EL
              EXCEL COMO EN LA PLATAFORMA
            </Typography>
            <input type="file" accept=".xlsx" onChange={handleFileUpload} style={{ display: "none" }} id="file-input" />
            <label htmlFor="file-input">
              <IconButton component="span" color="primary" sx={{ fontSize: 250 }}>
                <CloudUploadIcon fontSize="inherit" />
              </IconButton>
            </label>
            {state.error ? (
              state.msg === "missing" ? (
                <Box>
                  <Typography color="error" variant="body1">
                    No se encontraron los siguientes datos:
                  </Typography>
                  <List>
                    {Array.from(errorLawyers).map((lawyer, index) => (
                      <ListItem sx={{ color: "#d32f2f", padding: "2px" }} key={index}>{`Abogado: ${lawyer}`}</ListItem>
                    ))}
                    {Array.from(errorClients).map((client, index) => (
                      <ListItem sx={{ color: "#d32f2f", padding: "2px" }} key={index}>{`Cliente: ${client}`}</ListItem>
                    ))}
                  </List>
                </Box>
              ) : (
                <Typography color="error" variant={"body1"}>
                  {state.msg}
                </Typography>
              )
            ) : null}
            {state.msg && !state.error && (
              <Typography color="success" variant={"body1"} sx={{ color: "green" }}>
                {state.msg}
              </Typography>
            )}
            {duplicatedData.length > 0 ? (
              <Box>
                <Typography color="error" variant="body1">
                  {`Los siguientes id's ya se encuentran en la plataforma, se ignoraran ${duplicatedData.length} datos: `}
                </Typography>
                <List>
                  {Array.from(duplicatedData).map((data, index) => (
                    <ListItem sx={{ color: "#d32f2f", padding: "2px" }} key={index}>{`ID: ${data}`}</ListItem>
                  ))}
                </List>
              </Box>
            ) : null}
          </ColumnAlignFlex>
        </ModalBody>

        {/* M0DAL FOOTER */}
        <ModalFooter>
          <PrimaryButton onClick={handleUpload} disabled={!state.loaded || state.error || data.length === 0}>
            Subir
          </PrimaryButton>
        </ModalFooter>
      </ModalInnerContainer>
    </Modal>
  );
};
