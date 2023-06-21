function calculateCost() {
  var builtupArea = document.getElementById('builtupArea').value
  var costPerSqft = document.getElementById('costPerSqft').value

  // Calculate construction cost
  var constructionCost = builtupArea * costPerSqft
  var materialCost = constructionCost * 0.75

  // Display construction cost
  document.getElementById('result').textContent =
    'Approx. Construction Cost: Rs' + constructionCost.toFixed(2)

  // Calculate material details
  var cement = materialCost * 0.4 // Assuming 5% cement requirement
  var sand = materialCost * 0.816 // Assuming 15% sand requirement
  var aggregate = materialCost * 0.608 // Assuming 30% aggregate requirement
  var steel = materialCost * 4 // Assuming 2% steel requirement
  var finishers = materialCost * 0.165 // Assuming 10% finishers requirement
  var fittings = materialCost * 0.228 // Assuming 5% fittings requirement

  // Define material prices
  var cementPrice = 12 // $12 per bag
  var sandPrice = 25 // $25 per cubic foot
  var aggregatePrice = 30 // $30 per cubic foot
  var steelPrice = 1000 // $1000 per ton
  var finishersPrice = 15 // $15 per square foot
  var fittingsPrice = 10 // $10 per unit

  // Calculate material costs
  var cementCost = materialCost * 0.164
  var sandCost = materialCost * 0.123
  var aggregateCost = materialCost * 0.074
  var steelCost = materialCost * 0.246
  var finishersCost = materialCost * 0.165
  var fittingsCost = materialCost * 0.228
  // Define material percentages
  var cementPercentage = ((cement / materialCost) * 100).toFixed(2)
  var sandPercentage = ((sand / materialCost) * 100).toFixed(2)
  var aggregatePercentage = ((aggregate / materialCost) * 100).toFixed(2)
  var steelPercentage = ((steel / materialCost) * 100).toFixed(2)
  var finishersPercentage = ((finishers / materialCost) * 100).toFixed(2)
  var fittingsPercentage = ((fittings / materialCost) * 100).toFixed(2)

  let totalCost = constructionCost // Total cost in Rs
  const ratios = [0.219, 0.184, 0.111, 0.169, 0.178, 0.139]
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']

  // Create data for the pie chart
  var materialLabels = [
    'Cement',
    'Sand',
    'Aggregate',
    'Steel',
    'Finishers',
    'Fittings',
  ]
  var materialPercentages = [
    cementPercentage,
    sandPercentage,
    aggregatePercentage,
    steelPercentage,
    finishersPercentage,
    fittingsPercentage,
  ]
  // Insert material details
  var materialDetails = document.getElementById('materialDetails')
  materialDetails.innerHTML = '' // Clear previous content

  var materials = [
    { label: 'Cement', cost: cement.toFixed(2) },
    { label: 'Sand', cost: sand.toFixed(2) },
    { label: 'Aggregate', cost: aggregate.toFixed(2) },
    { label: 'Steel', cost: steel.toFixed(2) },
    { label: 'Finishers', cost: finishers.toFixed(2) },
    { label: 'Fittings', cost: fittings.toFixed(2) },
  ]

  materials.forEach(function (material) {
    var row = document.createElement('tr')
    var labelCell = document.createElement('td')
    var costCell = document.createElement('td')

    labelCell.textContent = material.label
    costCell.textContent = 'Rs' + material.cost

    row.appendChild(labelCell)
    row.appendChild(costCell)

    materialDetails.appendChild(row)
  })
  // Create data for the percentage chart
  //   var materialLabels = [
  //     'Cement',
  //     'Sand',
  //     'Aggregate',
  //     'Steel',
  //     'Finishers',
  //     'Fittings',
  //   ]
  var materialPrices = [
    cementCost,
    sandCost,
    aggregateCost,
    steelCost,
    finishersCost,
    fittingsCost,
  ]

  // Generate random colors for the chart slices
  var randomColors = []
  for (var i = 0; i < materialLabels.length; i++) {
    randomColors.push(getRandomColor())
  }

  // Create percentage chart
  var percentageChartCanvas = document.getElementById('percentageChart')
  var percentageChart = new Chart(percentageChartCanvas, {
    type: 'pie',
    data: {
      labels: materialLabels,
      datasets: [
        {
          data: materialPercentages,
          backgroundColor: randomColors,
        },
      ],
    },
    options: {
      responsive: true,
      legend: {
        position: 'bottom',
      },
      tooltips: {
        callbacks: {
          label: function (tooltipItem, data) {
            var label = data.labels[tooltipItem.index]
            var percentage = (
              (data.datasets[0].data[tooltipItem.index] / constructionCost) *
              100
            ).toFixed(2)
            return label + ': ' + percentage + '%'
          },
        },
      },
    },
  })

  // Calculate the cost for each month based on the total cost and ratio
  const costs = ratios.map((ratio) => Math.round(totalCost * ratio))

  // Create the bar chart
  const ctx = document.getElementById('barChart').getContext('2d')
  var barChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: months,
      datasets: [
        {
          label: 'Cost per Month (Rs)',
          data: costs,
          backgroundColor: '#3498db',
          borderColor: '#3498db',
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function (value, index, values) {
              return value + ' Rs'
            },
          },
        },
      },
    },
  })
  // Create price chart
  var priceChartCanvas = document.getElementById('priceChart')
  var priceChart = new Chart(priceChartCanvas, {
    type: 'pie',
    data: {
      labels: materialLabels,
      datasets: [
        {
          data: materialPrices,
          backgroundColor: randomColors,
        },
      ],
    },
    options: {
      responsive: true,
      legend: {
        position: 'bottom',
      },
      tooltips: {
        callbacks: {
          label: function (tooltipItem, data) {
            var label = data.labels[tooltipItem.index]
            var price = data.datasets[0].data[tooltipItem.index]
            return label + ': Rs' + price.toFixed(2)
          },
        },
      },
    },
  })
}

// Helper function to generate a random color
function getRandomColor() {
  var letters = '0123456789ABCDEF'
  var color = '#'
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}
