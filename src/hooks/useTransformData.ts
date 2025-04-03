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
import { Expense, ExpenseConcept, Fee, rawConcept, RawExpense, RawFee } from "../models/interfaces/Expense/IExpense";
import { getExpenseConcepts, getExpenses, getFees } from "../store/expenses/expenses.selector";
import { getPropById, getRandomColor } from "../utils/getters";
import { formatDateText } from "../utils/dates";

export const useTransformData = () => {
  const { lawyers } = useSelector(getLawyers);
  const { clients } = useSelector(getClients);
  const { worklogs } = useSelector(getWorklogs);
  const { receipts } = useSelector(getReceipts);
  const { bills } = useSelector(getBills);
  const { expensesConcepts } = useSelector(getExpenseConcepts);
  const { expenses } = useSelector(getExpenses);
  const { fees } = useSelector(getFees);

  const removeSpaces = (str: string) => String(str).replace(/\s+/g, "");

  const mapHeadersToWorklog = (
    data: RawWorklog[]
  ): {
    errorClients: string[];
    errorLawyers: string[];
    errorBills: string[];
    errorConcepts: string[];
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
      lastModifiedDate: row["Fecha_Ultima_Modificacion"]
        ? toZonedTime(parseISO(row["Fecha_Ultima_Modificacion"]), "UTC").getTime()
        : 0,
      creationDate: row["Fecha Creación"] ? toZonedTime(parseISO(row["Fecha Creación"]), "UTC").getTime() : 0,
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
    const errorConcepts: string[] = [];
    const duplicatedData = Array.from(errorData);
    return { errorClients, errorLawyers, errorBills, errorConcepts, duplicatedData, uniqueData };
  };

  const mapHeadersToClient = (
    data: RawClient[]
  ): {
    errorClients: string[];
    errorLawyers: string[];
    errorBills: string[];
    errorConcepts: string[];

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
    const errorConcepts: string[] = [];
    const duplicatedData = Array.from(errorData);
    return { errorClients, errorLawyers, errorBills, errorConcepts, duplicatedData, uniqueData };
  };

  const mapHeadersToReceipt = (
    data: RawReceipt[]
  ): {
    errorClients: string[];
    errorLawyers: string[];
    errorBills: string[];
    errorConcepts: string[];
    duplicatedData: string[];
    uniqueData: Receipt[];
  } => {
    const mappedData = data.map((row) => ({
      id: String(crypto.randomUUID()),
      receiptNumber: String(row["N° Recibo"] || "").trim(),
      date: row.Fecha ? toZonedTime(parseISO(row.Fecha), "UTC").getTime() : 0,
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
    const errorConcepts: string[] = [];
    const duplicatedData = Array.from(errorData);
    return { errorClients, errorLawyers, errorBills, errorConcepts, duplicatedData, uniqueData };
  };

  const mapHeadersToBill = (
    data: RawBill[]
  ): {
    errorClients: string[];
    errorLawyers: string[];
    errorBills: string[];
    errorConcepts: string[];
    duplicatedData: string[];
    uniqueData: Bill[];
  } => {
    const mappedData = data.map((row) => ({
      id: String(crypto.randomUUID()),
      billNumber: String(row["Factura N°"] || "").trim(),
      issueDate: row["Fecha emisión"] ? toZonedTime(parseISO(row["Fecha emisión"]), "UTC").getTime() : 0,
      expirationDate: row["Fecha vencimiento"] ? toZonedTime(parseISO(row["Fecha vencimiento"]), "UTC").getTime() : 0,
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

    const errorClients = Array.from(uniqueErrorClients);
    const errorLawyers: string[] = [];
    const errorConcepts: string[] = [];
    const errorBills = Array.from(uniqueErrorBills);
    const duplicatedData = Array.from(errorData);
    return { errorClients, errorLawyers, errorBills, errorConcepts, duplicatedData, uniqueData };
  };

  const mapHeaderToConcept = (
    data: rawConcept[]
  ): {
    errorClients: string[];
    errorLawyers: string[];
    errorBills: string[];
    errorConcepts: string[];
    duplicatedData: string[];
    uniqueData: ExpenseConcept[];
  } => {
    const mappedData = data.map((row) => ({
      id: crypto.randomUUID(),
      name: row.Concepto.trim(),
      type: "",
      color: getRandomColor(),
      categories: [],
    }));

    const errorData = new Set<string>();
    const uniqueErrorsConcepts = new Set<string>();

    // Find duplicated on table
    mappedData.map((data) => {
      const duplicated = expensesConcepts.find(
        (concept) => concept.name.toLocaleLowerCase().trim() === data.name.toLocaleLowerCase().trim()
      );
      if (duplicated) errorData.add(duplicated.name.trim());
    });

    // Find duplicated on the same file
    mappedData.forEach((mapped, index) => {
      if (
        mappedData.findIndex(
          (finder) => finder.name.toLocaleLowerCase().trim() === mapped.name.toLocaleLowerCase().trim()
        ) !== index
      ) {
        uniqueErrorsConcepts.add(mapped.name.trim());
      }
    });

    const errorConcepts = Array.from(uniqueErrorsConcepts);
    const errorLawyers: string[] = [];
    const errorBills: string[] = [];
    const errorClients: string[] = [];
    const duplicatedData = Array.from(errorData);
    const uniqueData = Array.from(new Map(mappedData.map((item) => [item.name, item])).values()).filter(
      (filtered) => !duplicatedData.find((duplicated) => duplicated === filtered.name)
    );

    return { errorClients, errorLawyers, errorBills, errorConcepts, duplicatedData, uniqueData };
  };

  const mapHeadersToExpense = (
    data: RawExpense[]
  ): {
    errorClients: string[];
    errorLawyers: string[];
    errorBills: string[];
    errorConcepts: string[];
    duplicatedData: string[];
    uniqueData: Expense[];
  } => {
    const mappedData: Expense[] = [];

    data.forEach((row) => {
      const cleanConcept = removeSpaces(String(row.Concepto || "").trim()).toLocaleLowerCase();
      const findConcept = expensesConcepts.find(
        (concept) => removeSpaces(String(concept.name || "").trim()).toLocaleLowerCase() === cleanConcept
      );

      Object.entries(row).forEach(([key, value]) => {
        if (key === "Concepto") return; // Omit "Concepto"

        const amount = isNaN(Number(value)) ? 0 : Number(value); // If is  " ", add 0

        mappedData.push({
          id: crypto.randomUUID(),
          conceptId: findConcept?.id || "Error Concepto",
          categoryId: "",
          date: key ? toZonedTime(parseISO(key), "UTC").getTime() : 0,
          amount: amount,
          description: "",
        });
      });
    });

    const errorData = new Set<string>();
    const conceptCount = new Map();

    mappedData.map((data) => {
      // Duplicated on existing expenses
      const duplicated = expenses.find((expense) => expense.conceptId === data.conceptId && expense.date === data.date);
      if (duplicated)
        errorData.add(
          "Concepto: " +
            getPropById(duplicated.conceptId as keyof ExpenseConcept, expensesConcepts, "name") +
            ", con fecha: " +
            formatDateText(duplicated.date)
        );
    });

    // Duplicated on same file
    data.forEach((data) => {
      const count = conceptCount.get(data.Concepto) || 0;
      conceptCount.set(data.Concepto, count + 1);
    });

    conceptCount.forEach((count, conceptId) => {
      if (count > 1) {
        errorData.add(`El concepto "${conceptId}".`);
      }
    });

    // Filter the duplicated with value of 0
    const uniqueData = mappedData.filter((data) => data.amount !== 0);

    const uniqueErrorsConcepts = new Set<string>();

    uniqueData.forEach((mapped) => {
      if (mapped.conceptId === "Error Concepto") {
        // Search for the OG using data and amount
        const originalConcept = data
          .find((raw) =>
            Object.entries(raw).some(
              ([key, value]) =>
                toZonedTime(parseISO(key), "UTC").getTime() === mapped.date && Number(value) === mapped.amount
            )
          )
          ?.Concepto?.trim();
        if (originalConcept) uniqueErrorsConcepts.add(originalConcept);
      }
    });

    const errorConcepts = Array.from(uniqueErrorsConcepts);
    const errorLawyers: string[] = [];
    const errorBills: string[] = [];
    const errorClients: string[] = [];
    const duplicatedData = Array.from(errorData);

    console.log(mappedData, uniqueData);
    return { errorClients, errorLawyers, errorBills, errorConcepts, duplicatedData, uniqueData };
  };

  const mapHeadersToFee = (
    data: RawFee[],
    concept?: "Germán Ulloa" | "Carlos Bermúdez"
  ): {
    errorClients: string[];
    errorLawyers: string[];
    errorBills: string[];
    errorConcepts: string[];
    duplicatedData: string[];
    uniqueData: Fee[];
  } => {
    const mappedData: Fee[] = [];

    data.forEach((row) => {
      const cleanConcept = removeSpaces(String(row.Concepto || "").trim()).toLocaleLowerCase();
      const findConcept = expensesConcepts.find(
        (concept) => removeSpaces(String(concept.name || "").trim()).toLocaleLowerCase() === cleanConcept
      );

      Object.entries(row).forEach(([key, value]) => {
        if (key === "Concepto") return; // Omit "Concepto"

        const amount = isNaN(Number(value)) ? 0 : Number(value); // If is  " ", add 0

        mappedData.push({
          id: crypto.randomUUID(),
          feeConcept: concept || "Carlos Bermúdez",
          conceptId: findConcept?.id || "Error Concepto",
          categoryId: "",
          date: key ? toZonedTime(parseISO(key), "UTC").getTime() : 0,
          amount: amount,
          description: "",
        });
      });
    });

    const errorData = new Set<string>();
    const conceptCount = new Map();

    mappedData.map((data) => {
      // Duplicated on existing expenses
      const duplicated = fees.find(
        (fee) => fee.conceptId === data.conceptId && fee.date === data.date && fee.feeConcept === data.feeConcept
      );
      if (duplicated)
        errorData.add(
          "Concepto: " +
            getPropById(duplicated.conceptId as keyof ExpenseConcept, expensesConcepts, "name") +
            ", con fecha: " +
            formatDateText(duplicated.date) +
            ", de " +
            duplicated.feeConcept
        );
    });

    // Duplicated on same file
    data.forEach((data) => {
      const count = conceptCount.get(data.Concepto) || 0;
      conceptCount.set(data.Concepto, count + 1);
    });

    conceptCount.forEach((count, conceptId) => {
      if (count > 1) {
        errorData.add(`El concepto "${conceptId}".`);
      }
    });

    // Filter the duplicated with value of 0
    const uniqueData = mappedData.filter((data) => data.amount !== 0);

    const uniqueErrorsConcepts = new Set<string>();

    uniqueData.forEach((mapped) => {
      if (mapped.conceptId === "Error Concepto") {
        // Search for the OG using data and amount
        const originalConcept = data
          .find((raw) =>
            Object.entries(raw).some(
              ([key, value]) =>
                toZonedTime(parseISO(key), "UTC").getTime() === mapped.date && Number(value) === mapped.amount
            )
          )
          ?.Concepto?.trim();
        if (originalConcept) uniqueErrorsConcepts.add(originalConcept);
      }
    });

    const errorConcepts = Array.from(uniqueErrorsConcepts);
    const errorLawyers: string[] = [];
    const errorBills: string[] = [];
    const errorClients: string[] = [];
    const duplicatedData = Array.from(errorData);

    return { errorClients, errorLawyers, errorBills, errorConcepts, duplicatedData, uniqueData };
  };

  return {
    mapHeadersToWorklog,
    mapHeadersToClient,
    mapHeadersToReceipt,
    mapHeadersToBill,
    mapHeadersToExpense,
    mapHeaderToConcept,
    mapHeadersToFee,
  };
};
