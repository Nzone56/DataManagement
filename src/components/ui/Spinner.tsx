import React from "react";
import { CircularProgress } from "@mui/material";
import { CenteredBox } from "../Components.styled";

type SpinnerProps = {
  size?: number;
  thickness?: number;
};

export const Spinner: React.FC<SpinnerProps> = ({ size = 40, thickness = 4 }) => {
  return (
    <CenteredBox justifyContent={"center"}>
      <CircularProgress size={size} thickness={thickness} />
    </CenteredBox>
  );
};
