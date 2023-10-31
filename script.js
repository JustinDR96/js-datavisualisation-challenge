// Créez l'élément <canvas>
var canvas = document.createElement("canvas");

// Configurez ses attributs
canvas.id = "myChart"; // ID du canvas
canvas.width = 400; // Largeur du canvas
canvas.height = 200; // Hauteur du canvas

// Sélectionnez la table avec l'ID "table2"
var table = document.getElementById("table1");

// Insérez le canvas juste après la table
table.parentNode.insertBefore(canvas, table);

var table = document.getElementById("table1");
var labels = [];
var data = [];

for (var i = 2; i < table.rows.length; i++) {
  var row = table.rows[i];
  labels.push(row.cells[1].textContent);
  data.push(parseFloat(row.cells[2].textContent.replace(",", ""))); // Convertir les nombres en virgule en nombres décimaux
}

// Créer un graphique à l'aide de Chart.js
var ctx = document.getElementById("myChart").getContext("2d");

var chart = new Chart(ctx, {
  type: "bar", // Choisir le type de graphique (bar, line, etc.)
  data: {
    labels: labels, // Les étiquettes de l'axe des X
    datasets: [
      {
        label: "Données",
        data: data, // Les données à afficher sur le graphique
        backgroundColor: "rgba(75, 192, 192, 0.2)", // Couleur de remplissage des barres
        borderColor: "rgba(75, 192, 192, 1)", // Couleur de la bordure des barres
        borderWidth: 1, // Largeur de la bordure des barres
      },
    ],
  },
  options: {
    // Autres options de personnalisation du graphique
  },
});

var canvas = document.createElement("canvas");

// Configurez ses attributs
canvas.id = "myChart2"; // ID du canvas
canvas.width = 400; // Largeur du canvas
canvas.height = 200; // Hauteur du canvas

// Sélectionnez la table avec l'ID "table2"
var table = document.getElementById("table2");

// Insérez le canvas juste après la table
table.parentNode.insertBefore(canvas, table);

var table = document.getElementById("table2");
var labels = [];
var data = [];

for (var i = 2; i < table.rows.length; i++) {
  var row = table.rows[i];
  labels.push(row.cells[1].textContent);
  data.push(parseFloat(row.cells[2].textContent.replace(",", ""))); // Convertir les nombres en virgule en nombres décimaux
}

// Créer un graphique à l'aide de Chart.js
var ctx = document.getElementById("myChart2").getContext("2d");

var chart = new Chart(ctx, {
  type: "bar", // Choisir le type de graphique (bar, line, etc.)
  data: {
    labels: labels, // Les étiquettes de l'axe des X
    datasets: [
      {
        label: "Données",
        data: data, // Les données à afficher sur le graphique
        backgroundColor: "rgba(75, 192, 192, 0.2)", // Couleur de remplissage des barres
        borderColor: "rgba(75, 192, 192, 1)", // Couleur de la bordure des barres
        borderWidth: 1, // Largeur de la bordure des barres
      },
    ],
  },
  options: {
    // Autres options de personnalisation du graphique
  },
});
