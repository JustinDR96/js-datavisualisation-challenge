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

$(document).ready(function () {
  // Get a reference to the canvas element
  let canvas3 = document.createElement("canvas");

  // Set the canvas attributes (ID, width, height)
  canvas3.id = "myChart3"; // Canvas ID
  canvas3.width = 400; // Canvas width
  canvas3.height = 200; // Canvas height

  let heading = document.getElementById("firstHeading");

  heading.parentNode.insertBefore(canvas3, heading.nextSibling);

  // Function to draw the chart on the canvas
  function drawChart(data) {
    const canvas = document.getElementById("myChart3");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the horizontal axis
    ctx.beginPath();
    ctx.moveTo(30, canvas.height - 30);
    ctx.lineTo(canvas.width - 30, canvas.height - 30);
    ctx.stroke();

    // Draw the vertical axis
    ctx.beginPath();
    ctx.moveTo(30, canvas.height - 30);
    ctx.lineTo(30, 30);
    ctx.stroke();

    // Draw the data points
    ctx.beginPath();
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 2;
    for (let i = 0; i < data.length; i++) {
      const x = (i * (canvas.width - 60)) / (data.length - 1) + 30;
      const y = (canvas.height - 60) * (1 - data[i].y / 100) + 30;
      ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  function fetchData() {
    $.getJSON(
      "https://canvasjs.com/services/data/datapoints.php",
      function (data) {
        drawChart(data);
        updateChart();
      }
    );
  }

  function updateChart() {
    $.getJSON(
      "https://canvasjs.com/services/data/datapoints.php?xstart=" +
        (dataPoints.length + 1) +
        "&ystart=" +
        dataPoints[dataPoints.length - 1].y +
        "&length=1&type=json",
      function (data) {
        dataPoints.push({
          x: parseInt(data[0][0]),
          y: parseInt(data[0][1]),
        });
        drawChart(dataPoints);
        setTimeout(updateChart, 1000);
      }
    );
  }

  let dataPoints = [];

  // Start by fetching the initial data and drawing the chart
  fetchData();
});
