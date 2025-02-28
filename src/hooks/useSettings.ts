import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSettings, setSettings } from "../store/settings/settings.actions";
import { getSettings } from "../store/settings/settings.selector";
import { AppDispatch } from "../store/store";

const useSettings = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentSettings = useSelector(getSettings);

  useEffect(() => {
    const storageSettings = localStorage.getItem("settings");
    if (storageSettings) {
      dispatch(setSettings(JSON.parse(storageSettings)));
    } else {
      dispatch(fetchSettings());
    }
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(currentSettings));
  }, [currentSettings]);
};

export default useSettings;
