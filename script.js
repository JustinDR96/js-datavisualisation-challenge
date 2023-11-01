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
    })),
  },
});
