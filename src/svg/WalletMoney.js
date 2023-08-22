import * as React from "react";
import Svg, { G, Path, Rect, ClipPath } from "react-native-svg";

const WalletMoney = ({ strokeColor }) => (
  <Svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M7 12.6192L7 23C7 23.5523 7.44772 24 8 24H22.9714C23.5237 24 23.9714 23.5523 23.9714 23V20.8965M7 12.6192H22.4286M7 12.6192L7 11.5849C7 11.5848 7 11.5848 7 11.5847C7 11.5805 7.00109 10.2929 7.97132 9.51573C8.63586 8.98342 9.25999 9.00136 10.0857 9.00126C13.8367 9.00082 19.2243 9.0003 21.4298 9.00009C21.9821 9.00004 22.4286 9.44777 22.4286 10.0001L22.4286 12.6192M22.4286 12.6192H22.9714C23.5237 12.6192 23.9714 13.0669 23.9714 13.6192L23.9714 16.7586M23.9714 16.7586H24C24.5523 16.7586 25 17.2063 25 17.7586V19.8965C25 20.4488 24.5523 20.8965 24 20.8965H23.9714M23.9714 16.7586L21.8573 16.7585C21.8572 16.7585 21.8572 16.7585 21.8571 16.7585C21.8519 16.7585 19.9143 16.762 19.8571 18.8276C19.7999 20.8961 21.8564 20.8965 21.8571 20.8965C21.8571 20.8965 21.8571 20.8965 21.8571 20.8965H23.9714"
      stroke="#595959"
      stroke-width="1.5"
      stroke-linejoin="round"
    />
    <Rect x="0.5" y="0.5" width="31" height="31" rx="3.5" stroke="#EFEFEF" />
  </Svg>
);

export default WalletMoney;
