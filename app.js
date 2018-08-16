var model = {
	catList : [],
	currentCat: null,

	init: function(data) {
    	this.catList = data.results.map(function(item){
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
	}
};


var octopus = {
	init: function(argument) {

		const queryUnsplash = `https://api.unsplash.com/search/photos?orientation=landscape&query=cat`;
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

		function createCatList() {
			model.init(JSON.parse(this.responseText));
		}

	},

	handleCatClick: function() {
		model.updateClickCount();
		catDisplayView.renderClickCount(model.getClickCount());
	},

	handleCatSelect: function(cat) {
		model.updateCurrentCat(cat);
		catDisplayView.render(model.currentCat);
	}

};

var catDisplayView = {
	init: function() {
		this.catDisplay = document.getElementById('catDisplay');
		catDisplay.addEventListener('click', function(event) {
			event.preventDefault();
			octopus.handleCatClick();
		});
		this.catImg = document.getElementById('catImg');
		this.catText = document.getElementById('catText');
		this.clickCount = document.getElementById('clickCount');
	},

	render: function(cat) {
		this.catImg.src = cat.url;
		this.catText.innerText = cat.caption;
		this.renderClickCount(cat.count);
	},

	renderClickCount: function(clickCountfromModel) {
		this.clickCount.innerText = clickCountfromModel;
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

	render: function(argument) {
		// needed for admin control
	}
};

octopus.init();