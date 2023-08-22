import * as React from "react";
import Svg, { Path, Rect } from "react-native-svg";

const AddIcon = () => (
  <Svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Rect x="0.5" y="0.5" width="31" height="31" rx="3.5" stroke="#EFEFEF" />
    <Path
      d="M16 10.1667V21.8333"
      stroke="#26989F"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M10.167 16H21.8337"
      stroke="#26989F"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);

export default AddIcon;
