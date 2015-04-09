var pixGrid = function() {
  //Selecting our node
  var myNode = document.querySelector('#artworklist .pixgrid');

  myNode.addEventListener("click", function (e) {
    if (e.target.tagName === 'IMG') {
      var myOverlay = document.createElement('div');
      myOverlay.id = 'overlay';
      document.body.appendChild(myOverlay);

      //set overlay styles
      myOverlay.style.position = 'absolute';
      myOverlay.style.top = 0;
      myOverlay.style.backgroundColor = 'rgba(0,0,0,.7';
      myOverlay.style.cursor = 'pointer';
      
      myOverlay.style.width = window.innerWidth + 'px';
      myOverlay.style.height = window.innerHeight + 'px';
      myOverlay.style.top = window.pageYOffset + 'px';
      myOverlay.style.left = window.pageXOffset + 'px';

      var imageSrc = e.target.src;
      var largeImage = document.createElement('img');
      largeImage.id = 'largeImage';
      largeImage.src = imageSrc.substr(0, imageSrc.length-7) + '.jpg';
      largeImage.style.display = 'block';
      largeImage.style.position = 'absolute';

      //wait until the image has loaded
      largeImage.addEventListener('load', function() {
        resizeImage(this);
        centerImage(this);
        myOverlay.appendChild(largeImage);
      }); //image has loaded

      if (largeImage) {
        myOverlay.addEventListener('click', function() {
          window.removeEventListener('resize', window, false);
          window.removeEventListener('scroll', window, false);
          myOverlay.parentNode.removeChild(myOverlay);
        })
      };
      //move image when scrolling
      window.addEventListener('scroll', function() {
        if (myOverlay) {
          myOverlay.style.top = window.pageYOffset + 'px';
          myOverlay.style.left = window.pageXOffset + 'px';
        }
      }, false);

      //resize image when resize window
      window.addEventListener('resize', function() {
        if (myOverlay) {
          myOverlay.style.width = window.innerWidth + 'px';
          myOverlay.style.height = window.innerHeight + 'px';
          myOverlay.style.top = window.pageYOffset + 'px';
          myOverlay.style.left = window.pageXOffset + 'px';
          resizeImage(largeImage);
          centerImage(largeImage);
        }
      }, false);
    }
  }, false);

  function centerImage(theImage) {
    var myDifX = (window.innerWidth - theImage.width) / 2;
    var myDifY = (window.innerHeight - theImage.height) / 2;

    theImage.style.top = myDifY + 'px';
    theImage.style.left = myDifX + 'px';

    return theImage;
  };

  function resizeImage(theImage) {
    var ratioW = window.innerWidth / theImage.width;
    var ratioH = window.innerHeight / theImage.height;
        
    theImage.height = theImage.height * Math.min(ratioW, ratioH);
    theImage.width = theImage.width * Math.min(ratioW, ratioH);

  }
}();