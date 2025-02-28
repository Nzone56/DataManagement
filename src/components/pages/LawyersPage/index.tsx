import { MainLayout } from "../../layouts/MainLayout";
import { ListLayout } from "../../layouts/ListLayout";
import { useDispatch, useSelector } from "react-redux";
import { getLawyers } from "../../../store/lawyers/lawyers.selector";
import { addLawyer, fetchLawyers, removeLawyer, updateLawyer } from "../../../store/lawyers/lawyers.actions";
import { useEffect } from "react";
import { Lawyer } from "../../../models/interfaces/Lawyer/ILawyer";
import { AppDispatch } from "../../../store/store";

const InitialLawyer: Lawyer = {
  id: "",
  name: "",
  phone: "",
  cc: "",
  email: "",
  position: "",
  address: "",
  entryDate: Date.now(),
};

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
        <Typography> CARGANDO... </Typography>
      ) : (
        <MainLayout>
          <ListLayout
            title="Abogados"
            list={lawyers}
            initialDataItem={InitialLawyer}
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
