import ProgressBar from "react-bootstrap/ProgressBar";

const CustomProgressBar = ({ now, label }) => {
  const labelPosition = now < 100 ? `${now}%` : "100%";
  return (
    <div style={{ position: "relative", width: "100%" }}>
      <ProgressBar now={now} />
      <div
        style={{
          position: "absolute",
          left: labelPosition,
          top: 0,
          transform: "translateX(5px)",
          height: "100%",
          display: "flex",
          alignItems: "center",
          padding: "0 5px",
          whiteSpace: "nowrap",
          fontWeight: "bold",
        }}
      >
        {label}
      </div>
    </div>
  );
};

function ProgressBarWithPercentage({ pPresentTotal, pPercentage }) {
  pPercentage = parseFloat(pPercentage);
  return <CustomProgressBar now={pPercentage} label={`${pPresentTotal}`} />;
}

export default ProgressBarWithPercentage;
