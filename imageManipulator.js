/*global $*/

$(window).load(function() {
	function createCanvasObject(img) {
		return {
			image: img,
			cxt: null,
	  	init: function() {
	  		this.cxt = this.createCanvas().getContext('2d');
	  		this.cxt.drawImage(this.image, 0, 0, this.image.width, this.image.height);
	      this.setButtons();
	  	},
	  	createCanvas: function() {
	  		var canvas = document.createElement('canvas');
		    canvas.setAttribute('width', this.image.width);
		    canvas.setAttribute('height', this.image.height);
		    canvas.style.cssText = 'padding: 20px 0 57px 0; box-sizing: border-box;';
		    return document.querySelector(".manipulated").appendChild(canvas);
			},
			setButtons: function() {
				var thisCanvas = this;
				
				this.image.nextElementSibling.addEventListener("click", function(e) {
					if (e.target.className === 'greyscale') {
						thisCanvas.greyscale();
					} else if (e.target.className === 'invert') {
						thisCanvas.invert();
					} else if (e.target.className === 'transparent') {
						thisCanvas.transparent();
					} else if (e.target.className === 'reset') {
						thisCanvas.resetImage();
					}
				});
			},
	  	greyscale: function() {
	  		var imageData = this.cxt.getImageData(0, 0, this.image.width, this.image.height);
	  		for (var i = 0; i < imageData.data.length; i+=4) {
	  			var red = imageData.data[i];
	  			var green = imageData.data[i + 1];
	  			var blue = imageData.data[i + 2];
	  			var grey = (red * .3086 + green * .6094 + blue * .0820);
	  			imageData.data[i] = grey;
	  			imageData.data[i + 1] = grey;
	  			imageData.data[i + 2] = grey;
	  		}
	  		this.cxt.putImageData(imageData, 0, 0);
	  	},
	  	invert: function() {
	  		var imageData = this.cxt.getImageData(0, 0, this.image.width, this.image.height);
	  		for (var i = 0; i < imageData.data.length; i+=4) {
	  			imageData.data[i] = 255 - imageData.data[i];
	  			imageData.data[i + 1] = 255 - imageData.data[i + 1];
	  			imageData.data[i + 2] = 255 - imageData.data[i + 2];
	  		}
	  		this.cxt.putImageData(imageData, 0, 0);
	  	},
	  	transparent: function() {
	  		var imageData = this.cxt.getImageData(0, 0, this.image.width, this.image.height);
	  		for (var i = 3; i < imageData.data.length; i+=4) {
	  			imageData.data[i] /= 10;
	  		}
	  		this.cxt.putImageData(imageData, 0, 0);
	  	},
	  	resetImage: function() {
	  	  this.cxt.drawImage(this.image, 0, 0, this.image.width, this.image.height);
	    },
    };
	}
  
  document.querySelectorAll('img').forEach(function(image) {
  	createCanvasObject(image).init();
  });
});