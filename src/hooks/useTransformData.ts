import { useSelector } from "react-redux";
import { RawWorklog, Worklog } from "../models/interfaces/TimeManager/IWorklog";
import { getLawyers } from "../store/lawyers/lawyers.selector";
import { getClients } from "../store/clients/clients.selector";
import { useState } from "react";
import { getWorklogs } from "../store/worklogs/worklogs.selector";

export const useTransformData = () => {
  const { lawyers } = useSelector(getLawyers);
  const { clients } = useSelector(getClients);
  const { worklogs } = useSelector(getWorklogs);

  const [errorLawyers, setErrorLawyers] = useState<string[]>([]);
  const [errorClients, setErrorClients] = useState<string[]>([]);
  const [duplicatedData, setDuplicated] = useState<string[]>([]);
  const removeSpaces = (str: string) => String(str).replace(/\s+/g, "");

  const mapHeadersToWorklog = (data: RawWorklog[]): Worklog[] => {
    //TODO: SE ESTA GUARDANDO STRING DE UNDEFINED
    const mappedData = data.map((row) => ({
      id: String(row.ID).trim(),
      lawyerId: String(
        lawyers.find(
          (lawyer) =>
            removeSpaces(String(row.Usuario)).toLocaleLowerCase() ===
            removeSpaces(String(lawyer.name)).toLocaleLowerCase()
        )?.id || "Error Abogado"
      ),
      clientId: String(
        clients.find(
          (client) =>
            removeSpaces(String(row.Cliente)).toLocaleLowerCase() ===
            removeSpaces(String(client.name)).toLocaleLowerCase()
        )?.id || "Error Cliente"
      ),
      topic: String(row.Asunto).trim(),
      area: String(row.Area).trim(),
      billingMode: String(row["Modo de Facturación"]).trim(),
      billingResponsible: String(row["Responsable Facturación"]).trim(),
      reportedTime: Number(row["Tiempo Reportado (Minutos)"]) || 0,
      workedTime: Number(row["Tiempo Trabajado (Minutos)"]) || 0,
      dateWork: new Date(row["Fecha Trabajo"]).getTime(),
      concept: String(row.Concepto).trim(),
      hourlyRate: Number(row["Tarifa Horaria"]) || 0,
      currency: String(row.Moneda).trim(),
      total: Number(row.Total) || 0,
      billed: row.Facturado.trim() === "Sí",
      status: String(row.Estado).trim(),
      billable: row.Facturable.trim() === "Sí",
      documentNumber: String(row["N° Documento"]).trim(),
      lastModifiedDate: new Date(row["Fecha_Ultima_Modificacion"]).getTime(),
      creationDate: new Date(row["Fecha Creación"]).getTime(),
      source: String(row.Origen).trim(),
    }));

    mappedData.map((data) => {
      const duplicated = worklogs.find((worklog) => worklog.id === data.id);
      if (duplicated) setDuplicated((prev) => [...prev, duplicated.id]);
    });

    const uniqueData = mappedData.filter((data) => !worklogs.find((worklog) => worklog.id === data.id));
    const uniqueErrorClients = new Set<string>();
    const uniqueErrorLawyers = new Set<string>();

    uniqueData.forEach((mapped) => {
      if (mapped.lawyerId === "Error Abogado") {
        const lawyerName = data.find((raw) => String(raw.ID) === mapped.id)?.Usuario.trim();
        if (lawyerName) uniqueErrorLawyers.add(lawyerName);
      }

      if (mapped.clientId === "Error Cliente") {
        const clientName = data.find((raw) => String(raw.ID) === mapped.id)?.Cliente.trim();
        if (clientName) {
          console.log(mapped);
          uniqueErrorClients.add(clientName);
        }
      }
    });

    setErrorClients(Array.from(uniqueErrorClients));
    setErrorLawyers(Array.from(uniqueErrorLawyers));
    return uniqueData;
  };

  return { mapHeadersToWorklog, errorLawyers, errorClients, duplicatedData };
};
