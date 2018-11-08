# Cat Clicker
As the name explains, this is a web application with some cute cat pictures fetched from [Unsplash.com]((https://unsplash.com/). A side bar gives a caption list for varoius cat images. Each caption can be clicked to see the correponding cat image. If you like a cat, you can click its image and the <span>&hearts</span> count for the cat will increase.

## MVO
This project explores the concept of _separation of concerns_ by using **Model, View, and Octopus(MVO)**, an architectural design pattern (also known as MVC). In the context of application programming, separation of concerns means the separation of code into few fundamentally different pieces namely Model, View, and Octopus. The rationale behind using this design pattern is that _Model_ and _View_ can be organized, maintained and optimized 
independently of each other.

### The View
View is user's interface to the application and contains all the DOM elements. For Cat Clicker, view consists of two objects; `catDisplayView` and `catListView`. `catDisplayView` displays the image and information of cat selected by user from `catListView`.

### The Model
Model is where all the data is stored. In Cat Clicker, `model` object stores cats data including cat image, caption and click count.

### The Octopus
Octopus is the central hub, containing logic that keeps model and view connected to each other. Following snippet is an expample exhibiting the role of `octopus` object when the page first loads.

```
    fetch(queryUnsplash, {
    headers: {
        Authorization: `Client-ID ${apiKeyUnsplash}`
    }})
    .then(function(response){
        // Response received
        return response.json();
    })
    .then(function(response){
        // Fill Model with Data
        model.init(response);
    })
    .then(function(){
        // Render View
        catDisplayView.render(model.currentCat);
        catListView.init(model.catList);
    });
```

## Built with
- [Unsplash API](https://unsplash.com/developers) - Open collection of high-quality photos.
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) - An interface for fetching resources.
- [JavaScript Objects](https://www.w3schools.com/js/js_object_definition.asp)
- [DocumentFragment](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment) - Avoids multiple _reflow_ and consquently any performance impact that can occur when changes are made to DOM.
- [CSS Flexbox](https://www.w3schools.com/css/css3_flexbox.asp) -  CSS layout module to design flexible responsive layout structure without using float or positioning.
- [Google Fonts](https://fonts.google.com/) - A library of 900 libre licensed fonts
- [gulp](https://www.npmjs.com/package/gulp) Plugins: browser-sync, gulp-sass, gulp-cssnano

## Live Version
Live version of this project is [here](https://ssaleem.github.io/Cat-Clicker/)