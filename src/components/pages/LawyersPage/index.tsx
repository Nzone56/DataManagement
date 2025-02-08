import { MainLayout } from "../../layouts/MainLayout";
import { ListLayout } from "../../layouts/ListLayout";
import { useDispatch, useSelector } from "react-redux";
import { getLawyers } from "../../../store/lawyers/lawyers.selector";
import { addLawyer, fetchLawyers, removeLawyer, updateLawyer } from "../../../store/lawyers/lawyers.actions";
import { useEffect } from "react";
import { AppDispatch } from "../../../store/store";
import { Lawyer, LawyerWorkLog } from "../../../models/interfaces/Lawyer/ILawyer";

const InitialLawyer: Lawyer = {
  id: "",
  firstName: "",
  lastName: "",
  phone: "",
  cc: "",
  email: "",
  joinedDate: Date.now(),
};

const LawyerWorkLogs: LawyerWorkLog[] = [
  {
    id: "",
    lawyerId: "",
    hoursWorked: 0,
    month: 0,
    year: 0,
  },
];

export const LawyersPage = () => {
  const { lawyers, loading } = useSelector(getLawyers);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchLawyers());
    //eslint-disable-next-line
  }, []);

  return (
    <>
      {loading || lawyers.length === 0 ? (
        <span> CARGANDO... </span>
      ) : (
        <MainLayout>
          <ListLayout
            title="Abogados"
            list={lawyers}
            initialDataItem={InitialLawyer}
            data={LawyerWorkLogs}
            header={Object.keys(lawyers[0])?.filter((headItem) => headItem !== "id")}
            addItem={addLawyer}
            updateItem={updateLawyer}
            removeItem={removeLawyer}
            loading={loading}
          />
        </MainLayout>
      )}
    </>
  );
};
