import { MainLayout } from "../../layouts/MainLayout";
import { ListLayout } from "../../layouts/ListLayout";
import { useDispatch, useSelector } from "react-redux";
import { getLawyers } from "../../../store/lawyers/lawyers.selector";
import { addLawyer, fetchLawyers, removeLawyer, updateLawyer } from "../../../store/lawyers/lawyers.actions";
import { useEffect } from "react";
import { Lawyer } from "../../../models/interfaces/Lawyer/ILawyer";
import { AppDispatch } from "../../../store/store";
import { toZonedTime } from "date-fns-tz";

const InitialLawyer: Lawyer = {
  id: "",
  name: "",
  phone: "",
  cc: "",
  email: "",
  position: "",
  address: "",
  professionalCard: "",
  entryDate: toZonedTime(new Date(), "America/Bogota").getTime(),
};

export const LawyersPage = () => {
  const { lawyers, loading } = useSelector(getLawyers);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchLawyers());
    //eslint-disable-next-line
  }, []);

  return (
    <MainLayout>
      <ListLayout
        title="Abogados"
        list={lawyers}
        initialDataItem={InitialLawyer}
        header={Object.keys(InitialLawyer)?.filter((headItem) => headItem !== "id")}
        addItem={addLawyer}
        updateItem={updateLawyer}
        removeItem={removeLawyer}
        loading={loading}
      />
    </MainLayout>
  );
};
