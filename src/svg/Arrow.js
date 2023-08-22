import * as React from "react";
import Svg, { Path } from "react-native-svg";

const Arrow = ({ color }) => (
  <Svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M8.28783 12.6931L14.3223 18.7127C14.7062 19.0958 15.3285 19.0958 15.7122 18.7127C16.0959 18.3299 16.0959 17.7091 15.7122 17.3263L10.3726 11.9999L15.7121 6.67367C16.0958 6.29074 16.0958 5.66997 15.7121 5.2872C15.3284 4.90427 14.706 4.90427 14.3221 5.2872L8.28767 11.3069C8.09582 11.4984 8 11.7491 8 11.9999C8 12.2508 8.09601 12.5017 8.28783 12.6931Z"
      fill={color || "#1E1E1E"}
    />
  </Svg>
);

export default Arrow;
