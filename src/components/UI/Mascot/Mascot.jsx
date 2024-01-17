import "./Mascot.scss";

import Hellogif from "../../../../public/assets/hello.gif";
import idlegif from "../../../../public/assets/idle.png";

import { useMascot } from "../../../context/MascotContext";
function Mascot() {
  const { mascotMessage } = useMascot();
  const text =
    "Type any text here and the bubble will grow to fit the text no matter how many lines.  Isn't that nifty?";

  return (
    <>
      {mascotMessage && (
        <div>
          <div>
            <div className="bubble bubble-bottom-left  typing-demo">
              {mascotMessage}
            </div>
          </div>
          <div className="mascot-wrapper">
            <img className="" src={Hellogif} alt="" height={"100%"}></img>
          </div>
        </div>
      )}

      {!mascotMessage && (
        <div className="mascot-wrapper">
          <img className="" src={idlegif} alt="" height={"100%"}></img>
        </div>
      )}
    </>
  );
}

export default Mascot;
