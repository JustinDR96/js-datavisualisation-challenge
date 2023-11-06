// Créez l'élément <canvas>
let canvas = document.createElement("canvas");

// Configurez ses attributs
canvas.id = "myChart"; // ID du canvas
canvas.width = 400; // Largeur du canvas
canvas.height = 200; // Hauteur du canvas

let table = document.getElementById("table1");
table.parentNode.insertBefore(canvas, table);

let years = [];
let countries = [];
let cells = [];

const headerRow = table.rows[1];
for (let j = 2; j < headerRow.cells.length; j++) {
  years.push(headerRow.cells[j].textContent);
}

for (let i = 2; i < table.rows.length; i++) {
  const row = table.rows[i];
  countries.push(row.cells[1].textContent);

  const rowData = [];
  for (let j = 2; j < row.cells.length; j++) {
    rowData.push(parseFloat(row.cells[j].textContent.replace(",", ".")));
  }
  cells.push(rowData);
}

const tableData = { years, countries, cells };
// Créer un graphique à l'aide de Chart.js
let ctx = canvas.getContext("2d");

new Chart(ctx, {
  type: "bar", // Choisir le type de graphique (bar, line, etc.)
  data: {
    labels: tableData.countries, // Les étiquettes de l'axe des X
    datasets: tableData.years.map((year, index) => ({
      label: year,
      data: tableData.cells.map((row) => row[index]),
      backgroundColor: [
        "#ff7979",
        "#34495e",
        "#2ecc71",
        "#e67e22",
        "#2980b9",
        "#9b59b6",
        "#95a5a6",
        "#bdc3c7",
        "#6c5ce7",
        "#6F1E51",
        "#7ed6df",
      ],
      borderColor: "rgba(75, 192, 192, 1)",
      borderWith: 1,
      barThickness: 1.5,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    })),
  },
});

// Créez un élément <canvas> pour le deuxième tableau
let canvas2 = document.createElement("canvas");

// Configurez les attributs du canvas (ID, largeur, hauteur)
canvas2.id = "myChart2"; // ID du canvas
canvas2.width = 400; // Largeur du canvas
canvas2.height = 200; // Hauteur du canvas

// Obtenez la référence au deuxième tableau (table2)
let table2 = document.getElementById("table2");

// Extraction des données du deuxième tableau (table2)
let years2 = [];
let countries2 = [];
let cells2 = [];

const headerRow2 = table2.rows[0];
for (let j = 2; j < headerRow2.cells.length; j++) {
  years2.push(headerRow2.cells[j].textContent);
}

for (let i = 1; i < table2.rows.length; i++) {
  const row2 = table2.rows[i];
  countries2.push(row2.cells[1].textContent);

  const rowData2 = [];
  for (let j = 2; j < row2.cells.length; j++) {
    rowData2.push(parseFloat(row2.cells[j].textContent));
  }
  cells2.push(rowData2);
}

// Créez un objet tableData2 pour les données du deuxième tableau (table2)
const tableData2 = { years: years2, countries: countries2, cells: cells2 };

const colors = ["#34495e", "#2ecc71"];
// Créez un deuxième graphique avec Chart.js de type "ligne"
let ctx2 = canvas2.getContext("2d");

new Chart(ctx2, {
  type: "bar", // Choisir le type de graphique (bar)
  data: {
    labels: tableData2.countries, // Les étiquettes de l'axe des X
    datasets: tableData2.years.map((year, index) => ({
      label: year,
      data: tableData2.cells.map((row) => row[index]),
      backgroundColor: colors[index], // Utilisez la couleur correspondante
    })),
  },
});

// Ajoutez le canvas2 au-dessus du tableau2
table2.parentNode.insertBefore(canvas2, table2);

//code with Ajax

// Get a reference to the canvas element
let canvas3 = document.createElement("canvas");

// Set the canvas attributes (ID, width, height)
canvas3.id = "myChart3"; // Canvas ID
canvas3.width = 400; // Canvas width
canvas3.height = 100; // Canvas height

let heading = document.getElementById("firstHeading");

heading.parentNode.insertBefore(canvas3, heading.nextSibling);
$(document).ready(function () {
  let chart;
  let dataPoints = [];

  function fetchDataAndRenderChart() {
    const url =
      "https://canvasjs.com/services/data/datapoints.php?xstart=1&ystart=10&length=10&type=json";

    const req = new XMLHttpRequest();
    req.open("GET", url, true);

    req.onreadystatechange = function () {
      if (req.readyState === 4 && req.status === 200) {
        const data = JSON.parse(req.responseText);
        dataPoints = data.map((point) => ({
          x: point[0],
          y: parseInt(point[1]),
        }));
        renderChart(dataPoints);
      }
    };

    req.send();
  }

  function renderChart(dataPoints) {
    const ctx = document.getElementById("myChart3").getContext("2d");

    chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: dataPoints.map((datapoint) => datapoint.x),
        datasets: [
          {
            label: "Live Chart with dataPoints from External JSON",
            data: dataPoints.map((datapoint) => datapoint.y),
            backgroundColor: "#ecf0f1",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  function updateChart() {
    const url =
      "https://canvasjs.com/services/data/datapoints.php?xstart=" +
      (dataPoints.length + 1) +
      "&ystart=" +
      dataPoints[dataPoints.length - 1].y +
      "&length=1&type=json";

    const req = new XMLHttpRequest();
    req.open("GET", url, true);

    req.onreadystatechange = function () {
      if (req.readyState === 4 && req.status === 200) {
        const data = JSON.parse(req.responseText);
        dataPoints.push({
          x: parseInt(data[0][0]),
          y: parseInt(data[0][1]),
        });

        chart.data.labels.push(dataPoints[dataPoints.length - 1].x);
        chart.data.datasets[0].data.push(dataPoints[dataPoints.length - 1].y);
        chart.update();
      }
    };

    req.send();
  }

  fetchDataAndRenderChart();

  setInterval(updateChart, 1000);
});
