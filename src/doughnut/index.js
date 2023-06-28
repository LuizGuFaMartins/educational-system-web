import { CategoryScale, Chart } from "chart.js/auto";
import React, { useCallback, useRef } from "react";
import { Doughnut } from "react-chartjs-2";

Chart.register(CategoryScale);

const DoughnutChart = ({
  containerStyle = null,
  chartStyle = null,
  buttonStyle = null,
}) => {
  const ref = useRef(null);

  const data = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "My First Dataset",
        data: [300, 50, 100],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const chartContainerStyle = containerStyle
    ? containerStyle
    : {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      };

  const chartBoxStyle = chartStyle
    ? chartStyle
    : {
        width: 500,
        height: 500
      };

  const chartButtonStyle = buttonStyle
    ? buttonStyle
    : {
        width: 200,
        cursor: "pointer",
        outline: "none",
        marginTop: 20,
        backgroundColor: "#d3cb09",
        border: "none",
        color: "white",
      };

  const downloadChart = useCallback(() => {
    const link = document.createElement("a");
    link.download = "chart.png";
    link.href = ref.current.toBase64Image();
    link.click();
  }, []);

  return (
    <div style={chartContainerStyle}>
      <div style={chartBoxStyle}>
        <Doughnut data={data} />
      </div>
      <button style={chartButtonStyle} onClick={downloadChart}>
        Salvar gráfico
      </button>
    </div>
  );
};

export default DoughnutChart;
