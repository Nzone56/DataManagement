import * as XLSX from "xlsx";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { Spinner } from "../../ui/Spinner";
import { AsyncThunk } from "@reduxjs/toolkit";
import { getSimpleOptions } from "../../../utils/getters";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { AppDispatch, ThunkApiConfig } from "../../../store/store";
import { CenteredBox, ColumnAlignFlex, PrimaryButton } from "../../Components.styled";
import { Box, IconButton, List, ListItem, MenuItem, Modal, Select, Typography } from "@mui/material";
import { ModalBody, ModalFooter, ModalHeader, ModalInnerContainer, ModalTitle } from "./ListModal.styled";

type CustomModalProps<T, T2> = {
  show: boolean;
  onHide: () => void;
  title: string;
  loading: boolean;
  setData: AsyncThunk<T[], T[], ThunkApiConfig>;
  mapUpload: (
    data: T2[],
    concept?: "Germán Ulloa" | "Carlos Bermúdez"
  ) => {
    errorClients: string[];
    errorLawyers: string[];
    errorBills: string[];
    errorConcepts: string[];
    duplicatedData: string[];
    uniqueData: T[];
  };
};

export const ListModalUpload = <T, T2>({
  show,
  onHide,
  title,
  loading,
  mapUpload,
  setData,
}: CustomModalProps<T, T2>) => {
  const [state, setState] = useState({
    loaded: false,
    error: false,
    msg: "",
  });
  const [XLSXData, setXLSXData] = useState<T[]>([]);
  const [jsonData, setJsonData] = useState<T2[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const [errorLawyers, setErrorLawyers] = useState<string[]>([]);
  const [errorClients, setErrorClients] = useState<string[]>([]);
  const [errorBills, setErrorBills] = useState<string[]>([]);
  const [errorConcepts, setErrorConcepts] = useState<string[]>([]);
  const [duplicatedData, setDuplicated] = useState<string[]>([]);

  const [selectFeeConcept, setSelectFeeConcept] = useState<"Germán Ulloa" | "Carlos Bermúdez">("Carlos Bermúdez");

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

        let jsonData: T2[] = [];
        jsonData = XLSX.utils.sheet_to_json<T2>(sheet);

        let errorClients, errorLawyers, errorBills, errorConcepts, duplicatedData, uniqueData;

        if (title === "Honorarios") {
          ({ errorClients, errorLawyers, errorBills, errorConcepts, duplicatedData, uniqueData } = mapUpload(
            jsonData,
            selectFeeConcept
          ));
        } else {
          ({ errorClients, errorLawyers, errorBills, errorConcepts, duplicatedData, uniqueData } = mapUpload(jsonData));
        }

        setErrorBills(errorBills);
        setDuplicated(duplicatedData);
        setErrorClients(errorClients);
        setErrorConcepts(errorConcepts);
        setErrorLawyers(errorLawyers);
        setXLSXData(uniqueData);

        console.log(uniqueData);
        if (
          (title === "TimeManager" && (errorClients.length > 0 || errorLawyers.length > 0)) ||
          ((title === "Facturación" || title === "Ingresos") && errorClients.length > 0) ||
          ((title === "Gastos" || title === "Honorarios") && errorConcepts.length > 0)
        ) {
          setState((prev) => ({
            ...prev,
            error: true,
            msg: "missing",
          }));
        } else {
          if (title === "Clientes" && errorClients.length > 0) {
            setState((prev) => ({
              ...prev,
              error: true,
              msg: "duplicated",
            }));
          } else {
            if (title === "Facturación" && errorBills.length > 0) {
              setState((prev) => ({
                ...prev,
                error: true,
                msg: "duplicated",
              }));
            } else {
              if (title === "Conceptos" && errorConcepts.length > 0) {
                setState((prev) => ({
                  ...prev,
                  error: true,
                  msg: "duplicated",
                }));
              } else {
                if (title === "Gastos" && errorConcepts.length > 0) {
                  setState((prev) => ({
                    ...prev,
                    error: true,
                    msg: "duplicated",
                  }));
                } else {
                  if (title === "Honorarios" && errorConcepts.length > 0) {
                    setState((prev) => ({
                      ...prev,
                      error: true,
                      msg: "duplicated",
                    }));
                  } else {
                    setState((prev) => ({
                      ...prev,
                      error: false,
                      loaded: true,
                      msg: `Se han cargado satisfactoriamente ${
                        title === "Gastos" || title === "Honorarios" ? uniqueData.length : jsonData.length
                      } datos`,
                    }));

                    setJsonData(jsonData);
                  }
                }
              }
            }
          }
        }
      } catch (error) {
        if (String(error).startsWith("TypeError:")) {
          setState((prev) => ({
            ...prev,
            error: true,
            msg: `Error al procesar el archivo: No tiene la estructura deseada`,
          }));
        }
      }
    };
    reader.onerror = () => setState((prev) => ({ ...prev, error: true, msg: "Error al leer el archivo." }));
    reader.readAsArrayBuffer(file);
  };

  const handleUpload = async () => {
    try {
      await dispatch(setData(XLSXData));
      onHide();
    } catch (error) {
      toast.error(`Error al subir ${title}: ${error}`);
    }
  };

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
          {loading ? (
            <CenteredBox>
              <Spinner />
            </CenteredBox>
          ) : (
            <ColumnAlignFlex mt={5}>
              <Typography variant="body1">
                {title === "TimeManager"
                  ? "⚠️ Nota Importante: Asegúrese de que los nombres de clientes y abogados estén correctamente añadidos y sean idénticos tanto en el archivo Excel como en la plataforma, sin variaciones ni errores de escritura."
                  : `⚠️ Nota Importante: Asegúrese de elegir el archivo xlsx de  ${title} correcto`}
              </Typography>
              {title === "Honorarios" && (
                <Select
                  value={selectFeeConcept}
                  onChange={(e) => setSelectFeeConcept(e.target.value as "Germán Ulloa" | "Carlos Bermúdez")}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  {getSimpleOptions("feeConcept")?.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              )}

              <input
                type="file"
                accept=".xlsx"
                onChange={handleFileUpload}
                style={{ display: "none" }}
                id="file-input"
              />
              <label htmlFor="file-input">
                <IconButton component="span" color="primary" sx={{ fontSize: 250 }}>
                  <CloudUploadIcon fontSize="inherit" />
                </IconButton>
              </label>
              {state.error ? (
                state.msg === "missing" || state.msg === "duplicated" ? (
                  <Box>
                    <Typography color="error" variant="body1">
                      {state.msg === "missing"
                        ? "No se encontraron los siguientes datos:"
                        : "Los siguentes datos se repiten en el archivo subido:"}
                    </Typography>
                    <List>
                      {Array.from(errorLawyers).map((lawyer, index) => (
                        <ListItem
                          sx={{ color: "#d32f2f", padding: "2px" }}
                          key={index}
                        >{`Abogado: ${lawyer}`}</ListItem>
                      ))}
                      {Array.from(errorClients).map((client, index) => (
                        <ListItem
                          sx={{ color: "#d32f2f", padding: "2px" }}
                          key={index}
                        >{`Cliente: ${client}`}</ListItem>
                      ))}
                      {Array.from(errorConcepts).map((client, index) => (
                        <ListItem
                          sx={{ color: "#d32f2f", padding: "2px" }}
                          key={index}
                        >{`Concepto: ${client}`}</ListItem>
                      ))}
                      {Array.from(errorBills).map((bill, index) => (
                        <ListItem sx={{ color: "#d32f2f", padding: "2px" }} key={index}>{`Factura: ${bill}`}</ListItem>
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
                    {XLSXData.length < jsonData.length - duplicatedData.length &&
                    jsonData.length > duplicatedData.length
                      ? `⚠️ ADVERTENCIA: Hay ${
                          jsonData.length - duplicatedData.length - XLSXData.length
                        } ${title} repetidos en la tabla se recomienda revisar los datos`
                      : null}
                  </Typography>
                  <Typography color="error" variant="body1">
                    {`Los siguientes ${
                      title === "Clientes" ? "nombres" : "id's"
                    } ya se encuentran en la plataforma, se ignoraran ${duplicatedData.length} datos: `}
                  </Typography>
                  <List>
                    {Array.from(duplicatedData).map((data, index) => (
                      <ListItem sx={{ color: "#d32f2f", padding: "2px" }} key={index}>
                        {title === "Clientes" ? `Nombre: ${data}` : `ID: ${data}`}
                      </ListItem>
                    ))}
                  </List>
                </Box>
              ) : null}
            </ColumnAlignFlex>
          )}
        </ModalBody>

        {/* M0DAL FOOTER */}
        <ModalFooter>
          <PrimaryButton
            onClick={handleUpload}
            disabled={!state.loaded || state.error || XLSXData.length === 0 || loading}
          >
            Subir
          </PrimaryButton>
        </ModalFooter>
      </ModalInnerContainer>
    </Modal>
  );
};
