import * as React from "react";
import Svg, { G, Path, Circle, ClipPath, Rect, Mask } from "react-native-svg";

const FileIcon = () => (
  <Svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M10.8335 1.66667H5.00016C4.55814 1.66667 4.13421 1.84227 3.82165 2.15483C3.50909 2.46739 3.3335 2.89131 3.3335 3.33334V16.6667C3.3335 17.1087 3.50909 17.5326 3.82165 17.8452C4.13421 18.1577 4.55814 18.3333 5.00016 18.3333H15.0002C15.4422 18.3333 15.8661 18.1577 16.1787 17.8452C16.4912 17.5326 16.6668 17.1087 16.6668 16.6667V7.5L10.8335 1.66667Z"
      stroke="#717171"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M10.8335 1.66667V7.50001H16.6668"
      stroke="#717171"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);

export default FileIcon;
