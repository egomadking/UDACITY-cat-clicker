// MVO exercise
// MODEL contains cat info- name, image url, and click count
//
// VIEW consists of HTML, CSS, addCats(), stageCats(), 
// and incrementCounter()
// 
// OCTOPUS consists of stage.addEventListener(), 
// selector.addEventLister(), and associated callbacks

var model = {
  adminMode: false,
  currentCat: 0,

  "cat":[{
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
  ]
};

var view = {

  addCats: function(cat) {
    var miniCard = '<div class="mini-card"></div>';   
    var catCount = cat.length;
    for(var i = 0; i < catCount; i++) {
      selector.insertAdjacentHTML('beforeend', miniCard);
      var catCard = document.getElementsByClassName('mini-card');
      var catName = '<div class="cat-name"><h3>' + cat[i].name + '</h3></div>';
      var catThumb = '<div class="cat-prev"><img data-cat-thumb-number="' + [i] + '" class="cat-thumb" src="' + cat[i].url + '"></div>';
      catCard[i].insertAdjacentHTML('beforeend',catName + catThumb);
    }
  },

  stageCat: function(e) {
    var cat = model.cat;
    var card = '<div class="card"></div>';
    stage.innerHTML = card;
    var catCard = document.getElementsByClassName('card');
    var catName = '<div class="cat-name"><h2>' + cat[e].name + '</h2></div>';
    var catPic = '<div class="cat-picture"><img data-cat-number="' + [e] + '" src="' + model.cat[e].url + '"></div>';
    var clickCounterDispl = '<div class="click-counter">Number of times clicked: ' +
    '<span id="click-counter' +[e] + '">' + cat[e].clickCount + '</span>';
    catCard[0].insertAdjacentHTML('beforeend',catName + catPic + clickCounterDispl);

    if(model.adminMode === true) {
      view.addAdminForm(e);
    }
  },

  addAdminForm: function(e) {
    var cat = model.cat;
    var adminDiv = '<div id="admin">' + 
    '<form id="console-form" action="" method="post">' +
    '</form></div>';
    stage.insertAdjacentHTML('beforeend', adminDiv);
    var formShell = document.getElementById('console-form');
    
    var name = '<label for="cat-name">Name: '+
    '</label><input id="cat-name" type="text" ' +
    'name="name" value="' + cat[e].name + '">';
    var click = '<label for="clickCount">Click count: ' +
    '</label><input id="clickCount" type="number"' +
    ' name="clickCount" value="' + cat[e].clickCount + '">';
    var url = '<label for="cat-url">Image URL: ' +
    '</label><input id="cat-url" type="url"' +
    ' name="url" value="' + cat[e].url + '">';

    var oD = '<div>';
    var cD = '</div>';
    var form = oD + name + click + cD + oD + url + cD;

    formShell.insertAdjacentHTML('beforeend', form);
    
  },

  removeAdminForm: function() {
    // check if values are the same as stored
    // if different, confirm exit
    // set adminMode = false
    // call stageCat
  },

  toggleConsoleBtnName: function() {
    var btn = document.getElementById('console-toggle');
    if(model.adminMode === false) {
      btn = "Admin console";
    } else {
      btn = "Exit console mode";
    }
  }
};

var controller = {
  
  //I  should create an init containing
  // 2 builder functions and event listeners
  
  //incrementCounter()

  toggleAdmin: function() {
    if(model.adminMode === false) {
      model.adminMode = true;
    } else {
      model.adminMode = false;
    }
    view.stageCat(model.currentCat);
  }
};

var selector = document.getElementById('selector');
var stage = document.getElementById('stage');


function incrementCounter(e) {
  //consider renaming to stageInfoRefresh
  var counter = 'click-counter' + e;
  document.getElementById(counter).innerHTML = model.cat[e].clickCount;
  // if adminMode === true, update form
}

stage.addEventListener('click', addCounter, false);

function addCounter(e) {
  if(e.target.localName === 'img') {
    num = e.target.attributes['data-cat-number'].nodeValue;
    model.currentCat = num;
    model.cat[num].clickCount++;
    incrementCounter(num);
  }
}

selector.addEventListener('click', addSelector, false);

function addSelector(e) {
  if(e.target.localName === 'img') {
    num = e.target.attributes['data-cat-thumb-number'].nodeValue;
    view.stageCat(num);
  }
}

// app init
view.addCats(model.cat);
view.stageCat(model.currentCat);

//need event listener for submit-cancel buttons