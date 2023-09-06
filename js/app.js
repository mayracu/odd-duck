'use strict';

// ***** GLOBALS ******
let votingRounds = 25;
let productsArray = [];

// ***** DOM WINDOWS ****

let imgContainer = document.getElementById('img-container');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');
let resultBtn = document.getElementById('show-results-btn');
/*let resultsList = document.getElementById('results-container');*/

// *** Canvas element ***//

let ctx = document.getElementById('my-chart');

// **** CONSTRUCTOR FUNCTION ****

function Product(name, imageExtension = 'jpg'){
  this.name = name;
  this.image = `img/${name}.${imageExtension}`;
  this.votes = 0;
  this.views = 0;
}


// **** HELPER FUNCTIONS / UTILITIES ****

function randomIndexGenerator(){
  return Math.floor(Math.random() * productsArray.length);
}

let indexArray = [];
console.log('index array start of while loop:', indexArray);
function renderImgs(){
  while(indexArray.length < 6){
    let randomNumber = randomIndexGenerator();
    if(!indexArray.includes(randomNumber)){
      indexArray.push(randomNumber);
    }
  }
  console.log('index array end of while loop:', indexArray);



  let imageOneIndex = indexArray.shift();
  let imageTwoIndex = indexArray.shift();
  let imageThreeIndex = indexArray.shift();

  console.log(indexArray);
  // DONE: get 3 random images on the page
  /*
  let imageOneIndex = randomIndexGenerator();
  let imageTwoIndex = randomIndexGenerator();
  let imageThreeIndex = randomIndexGenerator();

  // DONE: make sure they are unique
  while(imageOneIndex === imageTwoIndex || imageOneIndex === imageThreeIndex || imageTwoIndex === imageThreeIndex){
    imageOneIndex = randomIndexGenerator();
    imageTwoIndex = randomIndexGenerator();
  }*/

  imgOne.src = productsArray[imageOneIndex].image;
  imgOne.title = productsArray[imageOneIndex].name;

  imgTwo.src = productsArray[imageTwoIndex].image;
  imgTwo.title = productsArray[imageTwoIndex].name;

  imgThree.src = productsArray[imageThreeIndex].image;
  imgThree.title = productsArray[imageThreeIndex].name;

  // DONE: Increase the products views
  productsArray[imageOneIndex].views++;
  productsArray[imageTwoIndex].views++;
  productsArray[imageThreeIndex].views++;

}


// function grabbed from chartjs.org
function renderChart(){
  let productNames = [];
  let productViews = [];
  let productVotes = [];

  for (let i=0; i< productsArray.length; i++){
    productNames.push(productsArray[i].name);
    productViews.push(productsArray[i].views);
    productVotes.push(productsArray[i].votes);
  }




  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [{
        label: '# of Views',
        data: productViews,
        borderWidth: 1,
        backgroundColor: [
          'rgb(255, 99, 132)'

        ],
        hoverOffset: 4
      }, {
        label: '# of Votes',
        data: productVotes,
        borderWidth: 1,
        backgroundColor: [
          'rgb(54, 162, 235)'

        ],
        hoverOffset: 4        
      }]
    },
    options: {
      plugins: {
        legend: {
          labels: {
            // This more specific font property overrides the global property
            font: {
              size: 30
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

Chart.defaults.color = '#000';

// **** EVENT HANDLERS ****

function handleImgClick(event){
  // DONE: Identify the image that was clicked

  let imageClicked = event.target.title;
  // console.dir(event.target);
  // console.log(imageClicked);

  // TODO: Increase the vote on that image
  for(let i = 0; i < productsArray.length; i++){
    if(imageClicked === productsArray[i].name){
      productsArray[i].votes++;
      // TODO: decrement the voting round
      votingRounds--;
      // TODO: generate new images
      renderImgs();
    }
  }

  // TODO: once voting are done, we want to remove the ability to click
  if(votingRounds === 0){
    imgContainer.removeEventListener('click', handleImgClick);
  }

}

function handleShowResults(){
  if(votingRounds === 0){
    renderChart();



    /*for(let i = 0; i < productsArray.length; i++){
      let productsListItem = document.createElement('li');

      productsListItem.textContent = `${productsArray[i].name} had ${productsArray[i].votes} votes and was seen ${productsArray[i].views} times`;

      resultsList.appendChild(productsListItem);
    }*/
    resultBtn.removeEventListener('click', handleShowResults);
  }
}



// **** EXECUTABLE CODE *****
let bag = new Product('bag');
let banana = new Product('banana');
let bathroom = new Product('bathroom');
let boots = new Product('boots');
let breakfast = new Product('breakfast');
let bubblegum = new Product('bubblegum');
let chair = new Product('chair');
let cthulhu = new Product('cthulhu');
let dogDuck = new Product('dog-duck');
let dragon = new Product('dragon');
let pen = new Product('pen');
let petSweep = new Product('pet-sweep');
let scissors = new Product('scissors');
let shark = new Product('shark');
let sweep = new Product('sweep','png');
let tauntaun = new Product('tauntaun');
let unicorn = new Product('unicorn');
let waterCan = new Product('water-can');
let wineGlass = new Product('wine-glass');

productsArray.push(bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogDuck, dragon, pen, petSweep, scissors, shark, sweep, tauntaun, unicorn, waterCan, wineGlass);

renderImgs();

imgContainer.addEventListener('click', handleImgClick);
resultBtn.addEventListener('click', handleShowResults);


