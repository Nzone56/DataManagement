import { useSelector } from "react-redux";
import { RawWorklog, Worklog } from "../models/interfaces/TimeManager/IWorklog";
import { getLawyers } from "../store/lawyers/lawyers.selector";
import { getClients } from "../store/clients/clients.selector";
import { getWorklogs } from "../store/worklogs/worklogs.selector";
import { parseISO } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { Client, RawClient } from "../models/interfaces/Client/IClient";
import { RawReceipt, Receipt } from "../models/interfaces/Receipt/IReceipts";
import { getReceipts } from "../store/receipts/receipts.selector";
import { getBills } from "../store/bills/bills.selector";
import { Bill, RawBill } from "../models/interfaces/Bill/IBill";

export const useTransformData = () => {
  const { lawyers } = useSelector(getLawyers);
  const { clients } = useSelector(getClients);
  const { worklogs } = useSelector(getWorklogs);
  const { receipts } = useSelector(getReceipts);
  const { bills } = useSelector(getBills);

  const removeSpaces = (str: string) => String(str).replace(/\s+/g, "");

  const mapHeadersToWorklog = (
    data: RawWorklog[]
  ): {
    errorClients: string[];
    errorLawyers: string[];
    errorBills: string[];
    duplicatedData: string[];
    uniqueData: Worklog[];
  } => {
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

    const uniqueErrorClients = new Set<string>();
    const uniqueErrorLawyers = new Set<string>();
    const errorData = new Set<string>();

    mappedData.map((data) => {
      const duplicated = worklogs.find((worklog) => worklog.id === data.id);
      if (duplicated) errorData.add(duplicated.id);
    });

    const uniqueData = mappedData.filter((data) => !worklogs.find((worklog) => worklog.id === data.id));

    uniqueData.forEach((mapped) => {
      if (mapped.lawyerId === "Error Abogado") {
        const lawyerName = data.find((raw) => String(raw.ID) === mapped.id)?.Usuario.trim();
        if (lawyerName) uniqueErrorLawyers.add(lawyerName);
      }

      if (mapped.clientId === "Error Cliente") {
        const clientName = data.find((raw) => String(raw.ID) === mapped.id)?.Cliente.trim();
        if (clientName) uniqueErrorClients.add(clientName);
      }
    });

    const errorClients = Array.from(uniqueErrorClients);
    const errorLawyers = Array.from(uniqueErrorLawyers);
    const errorBills: string[] = [];
    const duplicatedData = Array.from(errorData);
    return { errorClients, errorLawyers, errorBills, duplicatedData, uniqueData };
  };

  const mapHeadersToClient = (
    data: RawClient[]
  ): {
    errorClients: string[];
    errorLawyers: string[];
    errorBills: string[];
    duplicatedData: string[];
    uniqueData: Client[];
  } => {
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

    const errorData = new Set<string>();
    const uniqueErrorClients = new Set<string>();

    mappedData.map((data) => {
      const duplicated = clients.find((client) => client.name.trim().toLowerCase() === data.name.trim().toLowerCase());
      if (duplicated) errorData.add(duplicated.name);
    });

    const uniqueData = mappedData.filter(
      (data) => !clients.find((client) => client.name.trim().toLowerCase() === data.name.trim().toLowerCase())
    );

    uniqueData.forEach((mapped, index) => {
      if (
        uniqueData.findIndex((finder) => finder.name.trim().toLowerCase() === mapped.name.trim().toLowerCase()) !==
        index
      ) {
        uniqueErrorClients.add(mapped.name);
      }
    });

    const errorClients = Array.from(uniqueErrorClients);
    const errorLawyers: string[] = [];
    const errorBills: string[] = [];
    const duplicatedData = Array.from(errorData);
    return { errorClients, errorLawyers, errorBills, duplicatedData, uniqueData };
  };

  const mapHeadersToReceipt = (
    data: RawReceipt[]
  ): {
    errorClients: string[];
    errorLawyers: string[];
    errorBills: string[];
    duplicatedData: string[];
    uniqueData: Receipt[];
  } => {
    const mappedData = data.map((row) => ({
      id: String(crypto.randomUUID()),
      receiptNumber: String(row["N° Recibo"] || "").trim(),
      date: new Date(row.Fecha || "").getTime() || 0,
      clientId: String(
        clients.find(
          (client) =>
            removeSpaces(String(row.Cliente || "")).toLocaleLowerCase() ===
            removeSpaces(String(client.name || "")).toLocaleLowerCase()
        )?.id || "Error Cliente"
      ),
      registered: String(row["Registrado por"] || "").trim(),
      paymentMethod: String(row["Forma de pago"] || "").trim(),
      totalValue: Number(row.Total) || 0,
      bills: String(row.Facturas || "").trim(),
      observations: String(row.Observaciones || "").trim(),
    }));

    const errorData = new Set<string>();

    mappedData.map((data) => {
      const duplicated = receipts.find(
        (receipt) => receipt.receiptNumber.trim().toLowerCase() === data.receiptNumber.trim().toLowerCase()
      );
      if (duplicated) errorData.add(duplicated.receiptNumber);
    });

    const uniqueData = mappedData.filter(
      (data) =>
        !receipts.find(
          (receipt) => receipt.receiptNumber.trim().toLowerCase() === data.receiptNumber.trim().toLowerCase()
        )
    );

    const uniqueErrorClients = new Set<string>();

    uniqueData.forEach((mapped) => {
      if (mapped.clientId === "Error Cliente") {
        const clientName = data.find((raw) => String(raw["N° Recibo"]) === mapped.receiptNumber)?.Cliente.trim();
        if (clientName) uniqueErrorClients.add(clientName);
      }
    });

    const errorClients = Array.from(uniqueErrorClients);
    const errorLawyers: string[] = [];
    const errorBills: string[] = [];
    const duplicatedData = Array.from(errorData);
    return { errorClients, errorLawyers, errorBills, duplicatedData, uniqueData };
  };

  const mapHeadersToBill = (
    data: RawBill[]
  ): {
    errorClients: string[];
    errorLawyers: string[];
    errorBills: string[];
    duplicatedData: string[];
    uniqueData: Bill[];
  } => {
    const mappedData = data.map((row) => ({
      id: String(crypto.randomUUID()),
      billNumber: String(row["Factura N°"] || "").trim(),
      issueDate: new Date(row["Fecha emisión"] || "").getTime() || 0,
      expirationDate: new Date(row["Fecha vencimiento"] || "").getTime() || 0,
      clientId: String(
        clients.find(
          (client) =>
            removeSpaces(String(row["Razón Social"] || "")).toLocaleLowerCase() ===
            removeSpaces(String(client.name || "")).toLocaleLowerCase()
        )?.id || "Error Cliente"
      ),
      nitcc: String(row.Nit || "").trim(),
      value: Number(row.Valor) || 0,
      totalValue: Number(row["Valor Total"]) || 0,
      concept: String(row.Concepto || "").trim(),
      subject: String(row.Asunto || "").trim(),
      status: String(row.Estado || "").trim(),
      city: String(row.Ciudad || "").trim(),
    }));
    const errorData = new Set<string>();

    mappedData.map((data) => {
      const duplicated = bills.find((bill) => bill.billNumber === data.billNumber);
      if (duplicated) errorData.add(duplicated.billNumber);
    });

    // Filter the duplicated with value of 0
    const uniqueData = mappedData.filter(
      (data) => data.value !== 0 && !bills.find((bill) => bill.billNumber === data.billNumber)
    );
    const uniqueErrorClients = new Set<string>();
    const uniqueErrorBills = new Set<string>();

    uniqueData.forEach((mapped, index) => {
      if (mapped.clientId === "Error Cliente") {
        const clientName = data.find((raw) => String(raw["Factura N°"]) === mapped.billNumber)?.["Razón Social"].trim();
        if (clientName) uniqueErrorClients.add(clientName);
      }

      if (uniqueData.findIndex((finder) => finder.billNumber === mapped.billNumber) !== index) {
        uniqueErrorBills.add(mapped.billNumber);
      }
    });

    // console.log(
    //   "DATA",
    //   mappedData.map((map) => map.concept)
    // );
    // console.log(
    //   "FILTERED",
    //   uniqueData.map((map) => map.billNumber)
    // );

    // console.log("ERROR", Array.from(uniqueErrorBills));
    const errorClients = Array.from(uniqueErrorClients);
    const errorLawyers: string[] = [];
    const errorBills = Array.from(uniqueErrorBills);
    const duplicatedData = Array.from(errorData);
    return { errorClients, errorLawyers, errorBills, duplicatedData, uniqueData };
  };

  return {
    mapHeadersToWorklog,
    mapHeadersToClient,
    mapHeadersToReceipt,
    mapHeadersToBill,
  };
};
