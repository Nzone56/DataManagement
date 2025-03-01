import { MainLayout } from "../../layouts/MainLayout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { AppDispatch } from "../../../store/store";
import { Typography } from "@mui/material";
import { Worklog } from "../../../models/interfaces/TimeManager/IWorklog";
import { getWorklogs } from "../../../store/worklogs/worklogs.selector";
import { addWorklog, fetchWorklogs, removeWorklog, updateWorklog } from "../../../store/worklogs/worklogs.actions";
import { ListLayout } from "../../layouts/ListLayout";

const InitialWorklog: Worklog = {
  id: "",
  lawyerId: "",
  clientId: "",
  topic: "",
  area: "",
  billingMode: "",
  billingResponsible: "",
  reportedTime: 0, //Minutes
  workedTime: 0, //Minutes
  dateWork: 0,
  concept: "",
  hourlyRate: 0,
  currency: "",
  total: 0,
  billed: false,
  status: "",
  billable: false,
  documentNumber: "",
  lastModifiedDate: 0,
  creationDate: 0,
  source: "",
};

export const TimeManagerPage = () => {
  const { worklogs, loading } = useSelector(getWorklogs);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchWorklogs());
    //eslint-disable-next-line
  }, []);

  return (
    <>
      {loading || worklogs.length === 0 ? (
        <Typography> CARGANDO... </Typography>
      ) : (
        <MainLayout>
          <ListLayout
            title="TimeManager"
            list={worklogs}
            initialDataItem={InitialWorklog}
            header={Object.keys(worklogs[0])}
            addItem={addWorklog}
            updateItem={updateWorklog}
            removeItem={removeWorklog}
            loading={loading}
          />
        </MainLayout>
      )}
    </>
  );
};
