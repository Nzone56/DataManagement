import { useSelector } from "react-redux";
import { RawWorklog, Worklog } from "../models/interfaces/TimeManager/IWorklog";
import { getLawyers } from "../store/lawyers/lawyers.selector";
import { getClients } from "../store/clients/clients.selector";
import { useState } from "react";
import { getWorklogs } from "../store/worklogs/worklogs.selector";
import { parseISO } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { Client, RawClient } from "../models/interfaces/Client/IClient";

export const useTransformData = () => {
  const { lawyers } = useSelector(getLawyers);
  const { clients } = useSelector(getClients);
  const { worklogs } = useSelector(getWorklogs);

  const [errorLawyers, setErrorLawyers] = useState<string[]>([]);
  const [errorClients, setErrorClients] = useState<string[]>([]);
  const [duplicatedData, setDuplicated] = useState<string[]>([]);
  const removeSpaces = (str: string) => String(str).replace(/\s+/g, "");

  const mapHeadersToWorklog = (data: RawWorklog[]): Worklog[] => {
    const mappedData = data.map((row) => ({
      id: String(row.ID || "").trim(),
      lawyerId: String(
        lawyers.find(
          (lawyer) =>
            removeSpaces(String(row.Usuario || "")).toLocaleLowerCase() ===
            removeSpaces(String(lawyer.name || "")).toLocaleLowerCase()
        )?.id || "Error Abogado"
      ),
      clientId: String(
        clients.find(
          (client) =>
            removeSpaces(String(row.Cliente || "")).toLocaleLowerCase() ===
            removeSpaces(String(client.name || "")).toLocaleLowerCase()
        )?.id || "Error Cliente"
      ),
      topic: String(row.Asunto || "").trim(),
      area: String(row.Area || "").trim(),
      billingMode: String(row["Modo de Facturación"] || "").trim(),
      billingResponsible: String(row["Responsable Facturación"] || "").trim(),
      reportedTime: Number(row["Tiempo Reportado (Minutos)"]) || 0,
      workedTime: Number(row["Tiempo Trabajado (Minutos)"]) || 0,
      dateWork: row["Fecha Trabajo"] ? toZonedTime(parseISO(row["Fecha Trabajo"]), "UTC").getTime() : 0,
      concept: String(row.Concepto || "").trim(),
      hourlyRate: Number(row["Tarifa Horaria"]) || 0,
      currency: String(row.Moneda || "").trim(),
      total: Number(row.Total) || 0,
      billed: String(row.Facturado || "").trim() === "Sí",
      status: String(row.Estado || "").trim(),
      billable: String(row.Facturable || "").trim() === "Sí",
      documentNumber: String(row["N° Documento"] || "").trim(),
      lastModifiedDate: new Date(row["Fecha_Ultima_Modificacion"] || "").getTime() || 0,
      creationDate: new Date(row["Fecha Creación"] || "").getTime() || 0,
      source: String(row.Origen || "").trim(),
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
          uniqueErrorClients.add(clientName);
        }
      }
    });

    setErrorClients(Array.from(uniqueErrorClients));
    setErrorLawyers(Array.from(uniqueErrorLawyers));
    return uniqueData;
  };

  const mapHeadersToClient = (data: RawClient[]): Client[] => {
    const mappedData = data.map((row) => ({
      id: String(crypto.randomUUID()),
      name: String(row["Razón Social"] || "").trim(),
      repLegal: String(row.Representante || "").trim(),
      phone: String(row.Teléfono || "").trim(),
      nitcc: String(row.NIT || "").trim(),
      address: String(row["Dirección"] || "").trim(),
      city: String(row.Ciudad || "").trim(),
      email: String(row["e-mail"] || "").trim(),
      joinedDate: toZonedTime(new Date(), "America/Bogota").getTime(),
    }));

    mappedData.map((data) => {
      const duplicated = clients.find((client) => client.name === data.name);
      if (duplicated) setDuplicated((prev) => [...prev, duplicated.name]);
    });

    const uniqueData = mappedData.filter(
      (data) => !clients.find((client) => client.name.trim().toLowerCase() === data.name.trim().toLowerCase())
    );

    return uniqueData;
  };

  return { mapHeadersToWorklog, mapHeadersToClient, errorLawyers, errorClients, duplicatedData };
};
