import * as React from "react";
import Svg, { Path, Rect, G, Defs, ClipPath } from "react-native-svg";

const Close = (props) => (
  <Svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M15 5L5 15"
      stroke="#1E1E1E"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M5 5L15 15"
      stroke="#1E1E1E"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);

export default Close;
