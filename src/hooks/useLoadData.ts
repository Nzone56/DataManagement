import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBillsReceiptsGraphs,
  fetchClientsGraphs,
  fetchExpensesGraphs,
  fetchLawyersGraphs,
} from "../store/actions";
import { AppDispatch, RootState } from "../store/store";

const graphDispatchers = [fetchExpensesGraphs, fetchLawyersGraphs, fetchClientsGraphs, fetchBillsReceiptsGraphs];

export const useLoadData = (currentTab: number) => {
  const dispatch = useDispatch<AppDispatch>();
  const state = useSelector((state: RootState) => state);
  const loadedTabs = useRef<Set<number>>(new Set());
  const [loading, setLoading] = useState(false);

  console.log(state);

  useEffect(() => {
    if (loadedTabs.current.has(currentTab)) {
      setLoading(false);
      return;
    }

    setLoading(true);

    const timeout = setTimeout(async () => {
      const action = graphDispatchers[currentTab];
      if (action) {
        await dispatch(action());
      }
      loadedTabs.current.add(currentTab);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timeout);
  }, [currentTab, dispatch]);

  return loading;
};
