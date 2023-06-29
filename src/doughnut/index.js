import { CategoryScale, Chart } from "chart.js/auto";
import jsPDF from "jspdf";
import React, { useCallback } from "react";
import { Doughnut } from "react-chartjs-2";

Chart.register(CategoryScale);

const DoughnutChart = ({
  containerStyle = null,
  chartStyle = null,
  buttonStyle = null,
  data = null,
}) => {
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
        height: 500,
        backgroundColor: "white",
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
    const canvas = document.getElementById("myChart");
    const pdf = new jsPDF();

    const imgData = canvas.toDataURL("image/jpeg", 1.0);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("chart.pdf");
  }, []);

  return (
    <div style={chartContainerStyle}>
      {data?.labels?.length > 0 && (
        <div style={chartBoxStyle}>
          <Doughnut
            style={{ backgroundColor: "white" }}
            id="myChart"
            data={data}
          />
        </div>
      )}
      <button style={chartButtonStyle} onClick={downloadChart}>
        Salvar gráfico
      </button>
    </div>
  );
};

export default DoughnutChart;
