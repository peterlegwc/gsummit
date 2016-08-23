'use strict';

var speaker_api = 'http://apius.gwcevents.com/en-us/speaker/getspeakerlist';
var event_id = 16;
var speakers = [];

$(document).ready(function() {
  if ($('.slideshow').length) {
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
          setTimeout(slideshow, 6000);
        });
    };
    setTimeout(slideshow, 6000);
  }
  if ($('.speakers').length) {
    var opt = {gmicId:event_id};

    if (location.pathname == '/') {
      opt.isMainPage = true;
    }

    $.getJSON(speaker_api, opt, function (data) {
      if (data.message != "SUCCESS") {
        console.log('There was an error with the request');
      }
      else {
        speakers = data.result.speakers;
        // returns an array of objects sorted by last name
        $.each(speakers, function(index, speaker) {
          var $ele = $('<div>', {'class': 'small-4 medium-3 columns'})
            .append($('<div>', {'class' : 'speaker-box text-center'})
              .append($('<a>', {
                'class' : 'speaker-' + speaker.id
              })
                .append($('<img>', {
                  'src' : speaker.photo_url,
                  'alt' : speaker.name
                }))
              )
              .append($('<div>', {
                'class': 'speaker-name',
                'text' : speaker.name
              }))
              .append($('<div>', {
                'class': 'speaker-title',
                'text' : speaker.title
              }))
              .append($('<div>', {
                'class': 'speaker-company',
                'text' : speaker.company
              }))
          );
          $ele.appendTo('#speakers');
        });

        $('#speakers').on('click', 'a', function(e) {
          var id = $(this).attr('class').split('-')[1];
          var selected = {};
          clearModal();

          $.each(speakers, function(index, speaker) {
            if (speaker.id == id) {
              selected = speaker;
            }
          });

          if (selected) {
            $('#speaker-detail .photo').html($('<img>', {
              'src': selected.photo_url,
              'alt': selected.name,
              'class': 'speaker-photo'
            }));
            $('#speaker-detail .speaker-name').html(selected.name);
            $('#speaker-detail .speaker-title').html(selected.title);
            $('#speaker-detail .speaker-company').html(selected.company);
            if (selected.intro) {
              $('#speaker-detail .speaker-bio').html('<hr>' + selected.intro);
            }
            $('#speaker-detail').foundation('open');
          }
          else {
            console.log('Speaker with id ' + id + ' not found');
          }
        });

        function clearModal() {
          $('#speaker-detail .photo').html('');
          $('#speaker-detail .speaker-name').html('');
          $('#speaker-detail .speaker-title').html('');
          $('#speaker-detail .speaker-company').html('');
          $('#speaker-detail .speaker-bio').html('');
        }
      }
    });
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
