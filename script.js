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

// let canvas2 = document.createElement("canvas");

// // Configurez ses attributs
// canvas2.id = "myChart2"; // ID du canvas
// canvas2.width = 400; // Largeur du canvas
// canvas2.height = 200; // Hauteur du canvas

// let table2 = document.getElementById("table2");
// table.parentNode.insertBefore(canvas2, table2);

// let ctx2 = canvas2.getContext("2d");
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
