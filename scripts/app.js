// When loaded, the event listener
// listens for the cat

var cat = [{
  'name': 'Whiskers',
  'url': 'https://lh3.ggpht.com/nlI91wYNCrjjNy5f-S3CmVehIBM4cprx-JFWOztLk7vFlhYuFR6YnxcT446AvxYg4Ab7M1Fy0twaOCWYcUk=s0#w=640&h=426',
  'clickCount': 0
  },
  {
  'name': 'Blued-eyes',
  'url': 'https://lh3.ggpht.com/kixazxoJ2ufl3ACj2I85Xsy-Rfog97BM75ZiLaX02KgeYramAEqlEHqPC3rKqdQj4C1VFnXXryadFs1J9A=s0#w=640&h=496',
  'clickCount': 0
  },
  {
  'name': 'Max and Anne',
  'url': 'https://lh5.ggpht.com/LfjkdmOKkGLvCt-VuRlWGjAjXqTBrPjRsokTNKBtCh8IFPRetGaXIpTQGE2e7ZCUaG2azKNkz38KkbM_emA=s0#w=640&h=454',
  'clickCount': 0
  },
  {
    'name': 'Bob',
    'url': 'http://www.catster.com/wp-content/uploads/2017/08/A-fluffy-cat-looking-funny-surprised-or-concerned.jpg',
    'clickCount': 0
  },
  {
    'name': 'Gloria',
    'url': 'https://iheartcats.com/wp-content/uploads/2016/01/7411170072_a9579445e4_z.jpg',
    'clickCount': 0
  }
];

var main = document.getElementById('main');
var selector = document.getElementById('selector');

function addCats(cat) {
  var miniCard = '<div class="miniCard"></div>';
  var catCount = cat.length;
  for(var i = 0; i < catCount; i++) {
    selector.insertAdjacentHTML('beforeend', miniCard);
    var catCard = document.getElementsByClassName('miniCard');
    var catName = '<div class="catName"><h3>' + cat[i].name + '</h3></div>';
    var catThumb = '<div class="catPrev"><img data-cat-thumb-number="' + [i] + '" class="catThumb" src="' + cat[i].url + '"></div>';
    catCard[i].insertAdjacentHTML('beforeend',catName + catThumb);
  }
}

addCats(cat);

var stage = document.getElementById('stage');

// where e is the [data-thumb-number].nodeValue
// found inside addCounter()
function stageCat(e) {
  var card = '<div class="card"></div>';
  stage.innerHTML = card;
  var catCard = document.getElementsByClassName('card');
  var catName = '<div class="catName"><h2>' + cat[e].name + '</h2></div>';
  var catPic = '<div class="catPicture"><img data-cat-number="' + [e] + '" src="' + cat[e].url + '"></div>';
  var clickCounterDispl = '<div class="clickCounter">Number of times clicked: ' +
    '<span id="clickCounter' +[e] + '">' + cat[e].clickCount + '</span>';
  catCard[0].insertAdjacentHTML('beforeend',catName + catPic + clickCounterDispl);
}

stageCat(1);

stage.addEventListener('click', addCounter, false);

function addCounter(e) {
  if(e.target.localName === 'img') {
    num = e.target.attributes['data-cat-number'].nodeValue;
    cat[num].clickCount++;
    incrementCounter(num);
  }
}

function incrementCounter(e) {
  var counter = 'clickCounter' + e;
  document.getElementById(counter).innerHTML = cat[e].clickCount;
}

selector.addEventListener('click', addSelector, false);

function addSelector(e) {
  num = e.target.attributes['data-cat-thumb-number'].nodeValue;
  stageCat(num);
}

// Need event listener on stage
// that takes the item clicked and
// replaces the currently staged
// cat