const historyLimit = tempHistory.length;
// const historyLimit = 145;

const ctx = document.getElementById('history_chart');
var date = new Date();
const lastSaveDate = new Date(date - millsSinceLastSave);
const labels = Array.from(new Array(24),(val,index)=>index + ' ч')

// console.log(tempHistory);
// console.log(millsSinceLastSave);
// console.log(savePeriod);
// console.log(date - 0);
// console.log(date);
// console.log(date - millsSinceLastSave);
// console.log(new Date(date - millsSinceLastSave));


const empty_dataset = {
  data: [],
  label: '',
  borderWidth: 1,
  cubicInterpolationMode: 'monotone',
  tension: 0.4
}

// DEBUG DATA
// var tempHistory = [];
// for (let i = 0; i < 256; i++) {
//   tempHistory.push(Math.floor(Math.random() * (30 - 0 + 1) + 0 ));
// }
// console.log(tempHistory);
// ----------

var datasets = [];
var itemDate = lastSaveDate;
var d = 0;
// for (let i = 0; i < tempHistory.length; i++) {
for (let i = 0; i < historyLimit; i++) {
  let itemDateStr;
  itemDateStr = itemDate.toLocaleDateString('ru-RU').slice(0,5);

  if (datasets.length == 0) {
    datasets.push({ data: [], label: '', hidden: false, borderWidth: 1, cubicInterpolationMode: 'monotone', tension: 0.4 });
    datasets[d]['label'] = itemDateStr;
  }

  if (datasets[d]['label'] != itemDateStr) {
    datasets[d]['data'] = datasets[d]['data'].reverse();
    datasets.push({ data: [], label: '', hidden: true, borderWidth: 1, cubicInterpolationMode: 'monotone', tension: 0.4 });
    d++;
    datasets[d]['label'] = itemDateStr;
  }

  if (tempHistory[i] == -10000) {
    datasets[d]['data'].push(NaN);
  }
  else {
    datasets[d]['data'].push(tempHistory[i]);
  }

  itemDate = new Date(itemDate - savePeriod);
}
console.log("Unfiltered:")
console.log(datasets);


var datasetsFiltered = [];
for (let i = 0; i < datasets.length; i++) {
  for (n in datasets[i]['data']) {
    if (datasets[i]['data'][n]) {
      datasetsFiltered.push(datasets[i]);
      console.log(datasets[i]['data'][n]);
      break;
    }
  }
}
console.log("Filtered:")
console.log(datasetsFiltered);

new Chart(ctx, {
  type: 'line',
  data: {
    labels: labels,
    datasets: datasetsFiltered,
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        fullSize: true,
        labels: {
          boxWidth: 30
        }
      },
      title: {
        display: false,
        text: 'История температуры'
      },
    },
    interaction: {
      intersect: false,
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true
        }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: '℃'
        },
        suggestedMin: -20,
        suggestedMax: 25
      }
    }
  },
});
