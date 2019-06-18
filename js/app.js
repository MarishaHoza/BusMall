'use strict';

// ------------------- Global Variables -------------------

var imageContainer = document.getElementById('image-container');
var img1 = document.getElementById('img1');
var img2 = document.getElementById('img2');
var img3 = document.getElementById('img3');
var desc1 = document.getElementById('desc1');
var desc2 = document.getElementById('desc2');
var desc3 = document.getElementById('desc3');
var resultsContainer = document.getElementById('results');

var totalClicks = 0;
var availableClicks = 25;

var currentImages = [];
var previousImages = null;



// ------------------- Constructor -------------------

var ProductImage = function(name, imgSrc, id){
  this.name = name;
  this.clicks = 0;
  this.timesShown = 0;
  this.src = imgSrc;
  this.id = id;
  ProductImage.allImages.push(this);
};
ProductImage.allImages = [];


// ------------------- Functions -------------------

var renderImages = function(firstIndex, secondIndex, thirdIndex){
  img1.src = ProductImage.allImages[firstIndex].src;
  img1.id = ProductImage.allImages[firstIndex].id;
  desc1.textContent = ProductImage.allImages[firstIndex].name;
  img2.src = ProductImage.allImages[secondIndex].src;
  img2.id = ProductImage.allImages[secondIndex].id;
  desc2.textContent = ProductImage.allImages[secondIndex].name;
  img3.src = ProductImage.allImages[thirdIndex].src;
  img3.id = ProductImage.allImages[thirdIndex].id;
  desc3.textContent = ProductImage.allImages[thirdIndex].name;
};

var setCurrentAndPrevious = function(firstIndex, secondIndex, thirdIndex){
  if (currentImages.length === 0){
    currentImages.push(ProductImage.allImages[firstIndex]);
    currentImages.push(ProductImage.allImages[secondIndex]);
    currentImages.push(ProductImage.allImages[thirdIndex]);
  } else {
    previousImages = currentImages;
    currentImages = [];
    currentImages.push(ProductImage.allImages[firstIndex]);
    currentImages.push(ProductImage.allImages[secondIndex]);
    currentImages.push(ProductImage.allImages[thirdIndex]);
  }
};

var incrementTimesShown = function(){
  for (var i = 0; i < currentImages.length; i++){
    currentImages[i].timesShown++;
  }
};

var checkIfOnPage = function(numToCheck){
  var isOnPage = false;
  for (var i = 0; i < currentImages.length; i++){
    if (ProductImage.allImages[numToCheck] === currentImages[i]){
      isOnPage = true;
    }
  }
  return isOnPage;
};


var generateImages = function(){

  do {
    var firstIndex = Math.floor(Math.random() * ProductImage.allImages.length);
  } while (checkIfOnPage(firstIndex));

  do {
    var secondIndex = Math.floor(Math.random() * ProductImage.allImages.length);
  } while (secondIndex === firstIndex || checkIfOnPage(secondIndex));

  do {
    var thirdIndex = Math.floor(Math.random() * ProductImage.allImages.length);
  } while (thirdIndex === firstIndex || thirdIndex === secondIndex || checkIfOnPage(thirdIndex));

  renderImages(firstIndex, secondIndex, thirdIndex);
  setCurrentAndPrevious(firstIndex, secondIndex, thirdIndex);
  incrementTimesShown();
};

var displayResults = function(){
  for (var i = 0; i < ProductImage.allImages.length; i++){
    var liEl = document.createElement('li');
    var currentProduct = ProductImage.allImages[i];
    var percentage = Math.round((currentProduct.clicks / currentProduct.timesShown) * 100);
    liEl.textContent = currentProduct.id + ': ' + percentage + '% votes';
    resultsContainer.appendChild(liEl);
  }
};

var handleImageClick = function(event){

  if (totalClicks < availableClicks){
    var target = event.target;
    var imgId = target.id;
    for (var i = 0; i < currentImages.length; i++){
      if (imgId === currentImages[i].id) {
        currentImages[i].clicks++;
        generateImages();
      }
    }
  }

  totalClicks++;

  if (totalClicks === availableClicks) {
    imageContainer.removeEventListener('click', handleImageClick);
    displayResults();
  }
};




// ------------------- Add event listener -------------------
imageContainer.addEventListener('click', handleImageClick);




// ------------------- Add all images -------------------

new ProductImage('R2-D2 Bag', '../img/bag.jpg', 'bag');
new ProductImage('Banana Slicer', '../img/banana.jpg', 'banana');
new ProductImage('Bathroom Tablet Holder', '../img/bathroom.jpg', 'bathroom');
new ProductImage('Peekaboo Toe Rain Boots', '../img/boots.jpg', 'boots');
new ProductImage('All-In-One Breakfast Maker', '../img/breakfast.jpg', 'breakfast');
new ProductImage('Meatball Bubblegum', '../img/bubblegum.jpg', 'bubblegum');
new ProductImage('Rounded Chair', '../img/chair.jpg', 'chair');
new ProductImage('Cthulhu Figurine', '../img/cthulhu.jpg', 'cthulhu');
new ProductImage('Doggie Duck Bill', '../img/dog-duck.jpg', 'dog-duck');
new ProductImage('Dragon Meat', '../img/dragon.jpg', 'dragon');
new ProductImage('Pen Silverware', '../img/pen.jpg', 'pen');
new ProductImage('Pet Sweep Dust Boots', '../img/pet-sweep.jpg', 'pet-sweep');
new ProductImage('Pizza Scissors', '../img/scissors.jpg', 'scissors');
new ProductImage('Shark Sleeping Bag', '../img/shark.jpg', 'shark');
new ProductImage('Baby Sweeper Onesie', '../img/sweep.png', 'sweep');
new ProductImage('Tauntaun Sleeping Bag', '../img/tauntaun.jpg', 'tauntaun');
new ProductImage('Unicorn Meat', '../img/unicorn.jpg', 'unicorn');
new ProductImage('Tentacle USB', '../img/usb.gif', 'usb');
new ProductImage('Self-Watering Can', '../img/water-can.jpg', 'water-can');
new ProductImage('Peep-Hole Wine Glass', '../img/wine-glass.jpg', 'wine-glass');


generateImages();
