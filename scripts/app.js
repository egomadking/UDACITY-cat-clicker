// MVO exercise
// MODEL contains cat info- name, image url, and click count
//
// VIEW consists of HTML, CSS, addCats(), stageCats(), 
// and incrementCounter()
// 
// OCTOPUS consists of stage.addEventListener(), 
// selector.addEventLister(), and associated callbacks
//
// TODO
// clean up HTML insertion with document.createElement(tagname, [options]),
// element.id = 'someID', element.className = 'someClass', and
// element.setAttribute('attrib', 'value')
//

var selector = document.getElementById('selector');
var stage = document.getElementById('stage');

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
    //refactor!
    var cat = model.cat;
    var adminDiv = '<div id="admin">' + 
    '<form id="console-form">' +
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

    
    var saveBtn = document.createElement('button');
    saveBtn.id = 'save-button';
    saveBtn.setAttribute('onclick', 'view.saveAdminForm();');
    saveBtn.insertAdjacentText('afterbegin', 'Save');
    var cancelBtn = document.createElement('button');
    cancelBtn.id = 'cancel-button';
    cancelBtn.setAttribute('onclick', 'view.removeAdminForm();');
    cancelBtn.insertAdjacentText('afterbegin', 'Cancel');
    var buttonDiv = document.createElement('div');
    buttonDiv.appendChild(saveBtn);
    buttonDiv.appendChild(cancelBtn);
    

    var oD = '<div>';
    var cD = '</div>';
    var form = oD + name + click + cD + oD + url + cD;

    formShell.insertAdjacentHTML('beforeend', form);
    formShell.appendChild(buttonDiv);
    
  },

  removeAdminForm: function() {
    var form = document.getElementById('admin');
    form.remove();
    model.adminMode = false;
    view.toggleConsoleBtnName();
  },

  saveAdminForm: function() {
    var name = document.getElementById('cat-name').value;
    var click = parseInt(document.getElementById('clickCount').value);
    var url = document.getElementById('cat-url').value;

    controller.updateCatStore(name, click, url);
    model.adminMode = false;
    view.stageCat(model.currentCat);
    view.toggleConsoleBtnName();
  },

  confirmAdminFormRemove: function() {
    var formName = document.getElementById('cat-name').value;
    var formClick = parseInt(document.getElementById('clickCount').value);
    var formUrl = document.getElementById('cat-url').value;

    var cat = model.currentCat;

    var stageName = model.cat[cat].name;
    var stageClick = model.cat[cat].clickCount;
    var stageUrl = model.cat[cat].url;

    if((formName === stageName) && 
      (formClick === stageClick) && 
      (formUrl === stageUrl)) {
      return;
    } else {
      ret = confirm('You have unsaved changes. Do you wish to proceed?');
      if(ret === true){
        view.toggleConsoleBtnName();
        return true;
      } else {
        return false;
      }
    }
  },

  toggleConsoleBtnName: function() {
    var btn = document.getElementById('console-toggle');
    if(model.adminMode === false) {
      btn.textContent = "Admin console";
    } else {
      btn.textContent = "Exit console mode";
    }
  },

  incrementCounter: function(e) {
    var count = model.cat[e].clickCount;
    var counterID = 'click-counter' + e;
    document.getElementById(counterID).innerHTML = count;
    if(model.adminMode === true) {
      document.getElementById('clickCount').value = count;
    }
  }
};

var controller = {
  init: function() {
    view.addCats(model.cat);
    view.stageCat(model.currentCat);
  },

  toggleAdmin: function() {
    var cancel;
    if(model.adminMode === false) {
      model.adminMode = true;
    } else {
      if(view.confirmAdminFormRemove() === false) {
        // exits out of function if user hits cancel
        return;
      }
      model.adminMode = false;
      // check to see if form data is different
    }
    view.toggleConsoleBtnName();
    
    view.stageCat(model.currentCat);
  },

  updateCatStore: function(name, click, url) {
    model.cat[model.currentCat].name = name;
    model.cat[model.currentCat].clickCount = click;
    model.cat[model.currentCat].url = url;
  }

};

// END MVC, start mess

stage.addEventListener('click', addCounter, false);

function addCounter(e) {
  if(e.target.localName === 'img') {
    num = e.target.attributes['data-cat-number'].nodeValue;
    model.currentCat = num;
    model.cat[num].clickCount++;
    view.incrementCounter(num);
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
controller.init();

//need event listener for submit-cancel buttons