var model = {
	catList : [],
	currentCat: null,

	init: function(data) {
		let images = data.results.filter(item => item.description != null);
		if(images.length > 10){
			images = images.slice(0,10);
		}
    	this.catList = images.map(function(item){
    		var obj = {
    			url: item.urls.regular,
    			caption: item.description,
    			count: 0
    		};
    		return obj;
    	});
    	this.updateCurrentCat(this.catList[0]);
	},

	updateCurrentCat: function(currCat) {
		this.currentCat = currCat
	},

	updateClickCount: function() {
		this.currentCat.count++;
	},

	getClickCount: function() {
		return this.currentCat.count;
	},

	updateCaption: function(caption) {
		this.currentCat.caption = caption;
	},

	getCurrentCatIndex: function(){
		return this.catList.indexOf(this.currentCat);
	}
};


var octopus = {
	init: function(argument) {

		const queryUnsplash = `https://api.unsplash.com/search/photos?orientation=landscape&query=cat&per_page=30&page=2`;
    	const apiKeyUnsplash = `022c9f35d65246727ff3ac0d6441de5654d9e5a12215e9e179a1ba47d31ea792`;

     	catDisplayView.init();
        fetch(queryUnsplash, {
        	headers: {
        		Authorization: `Client-ID ${apiKeyUnsplash}`
        	}
        }).then(function(response){
        	// Response received
        	return response.json();
        }).then(function(response){
        	// Fill Model with Data
        	model.init(response);
        }).then(function(){
        	// Render View
			catDisplayView.render(model.currentCat);
			catListView.init(model.catList);
        });

        this.captionFormIsOpen = false;
	},

	handleCatClick: function() {
		model.updateClickCount();
		catDisplayView.renderClickCount(model.getClickCount());
	},

	handleCatSelect: function(cat) {
		model.updateCurrentCat(cat);
		catDisplayView.render(model.currentCat);
		if(this.captionFormIsOpen){
			this.closeForm();
		}
	},

	openForm:function() {
		catDisplayView.captionForm['caption'].size = model.currentCat.caption.length;
		catDisplayView.captionForm['caption'].value = model.currentCat.caption;
		catDisplayView.toggleCaptionForm();
		catDisplayView.changeCaptionButton.classList.add('hide');
		this.captionFormIsOpen = true;
	},

	updateCaption: function(caption) {
		model.updateCaption(caption);
		catDisplayView.render(model.currentCat);
		catDisplayView.toggleCaptionForm();
		catListView.update(caption, model.getCurrentCatIndex());
	},

	closeForm: function() {
		catDisplayView.toggleCaptionForm();
		this.captionFormIsOpen = false;
	}

};

var catDisplayView = {
	init: function() {
		this.catImg = document.getElementById('catImg');
		this.catImg.addEventListener('click', function(event) {
			event.preventDefault();
			octopus.handleCatClick();
		});

		this.catText = document.getElementById('catText');
		this.clickCount = document.getElementById('clickCount');

		this.changeCaptionButton = document.getElementById('changeCaption');
		this.changeCaptionButton.addEventListener('click', function(event){
			octopus.openForm();
		});

		this.captionForm = document.getElementById('captionForm');
		this.captionForm.addEventListener('submit', function(event){
			event.preventDefault(); //to prevent restting page after form submit
			octopus.updateCaption(event.target['caption'].value);
		});
		this.captionForm.addEventListener('reset', function(event){
			octopus.closeForm();
		});

	},

	render: function(cat) {
		this.catImg.src = cat.url;
		this.catText.innerText = cat.caption;
		this.renderClickCount(cat.count);
	},

	renderClickCount: function(clickCountfromModel) {
		this.clickCount.innerHTML = `<span id="cc">Click Count: </span>${clickCountfromModel}`;
	},

	toggleCaptionForm: function() {
		this.captionForm.classList.toggle('hide');
		catDisplayView.changeCaptionButton.classList.remove('hide');
	}

};

var catListView ={
	init: function(catList) {
		this.catListMenu = document.getElementById('catListMenu');

		const fragment = document.createDocumentFragment();
		for(const cat of catList){
			const newItem = document.createElement(`li`);
			newItem.innerText = cat.caption;
			newItem.addEventListener('click', (function(cat){
				return function(event) {
					octopus.handleCatSelect(cat);
				}
			})(cat));
			fragment.appendChild(newItem);
		}
		this.catListMenu.appendChild(fragment);
	},

	update: function(caption,n) {
		let listItem = this.catListMenu.children.item(n);
		listItem.innerText = caption;
	}
};

octopus.init();