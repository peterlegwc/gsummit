'use strict';

$(document).ready(function() {
  // change this if not in a root folder
  if (location.pathname == '/') {
    var $slides = $('[data-slides]');
    var slideImgs = $slides.data('slides');
    var slideCount = slideImgs.length;
    var currentSlide = 0;

    var slideshow = function() {
      if (currentSlide >= slideCount)
        currentSlide = 0;
      $slides
        .css('background-image', 'url("' + slideImgs[currentSlide++] + '")')
        .show(0, function() {
          setTimeout(slideshow, 5000);
        });
    };
    setTimeout(slideshow, 5000);
  }
});

function initMap() {
  var office = {lat: 37.794482, lng: -122.395843};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16,
    center: office,
    scrollwheel: false
  });

  var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h6>Hyatt Regency San Francisco</h6>'+
      '<div id="bodyContent">'+
      '<p>5 Embarcadero Center<br>'+
      'San Francisco, CA 94111</p>'+
      '</div>'+
      '</div>';

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  var marker = new google.maps.Marker({
    position: office,
    map: map,
    title: 'Hyatt Regency'
  });
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
}
