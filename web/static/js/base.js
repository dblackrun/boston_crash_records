var markers = [];
var mode_type_text_map = {
  mv: 'Motor Vehicle',
  ped: 'Pedestrian',
  bike: 'Bike'
}

function initMap(crashes) {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: {lat: 42.3, lng: -71.08}
  });

  var infowindow =  new google.maps.InfoWindow({
		content: ''
	});

  crashes.forEach(function(crash){
    position = {lat: parseFloat(crash['lat']), lng: parseFloat(crash['long'])}
    var marker = new google.maps.Marker({
      position: position,
      map: map,
      mode_type: crash['mode_type'],
      datetime: new Date(crash['dispatch_ts']),
    });

    // add an event listener for this marker
		bindInfoWindow(marker, map, infowindow, "<p>" + mode_type_text_map[crash['mode_type']] + " - " + crash['dispatch_ts'] + "</p>");
    markers.push(marker);
  });
}


function bindInfoWindow(marker, map, infowindow, html) {
	google.maps.event.addListener(marker, 'click', function() {
		infowindow.setContent(html);
		infowindow.open(map, marker);
	});
}

function checkOptions(options){
  var options_to_show = {};

  options.forEach(function(option){
    var element_id = option + "Checkbox"
    if(document.getElementById(element_id).checked){
      options_to_show[option] = true;
    }else{
      options_to_show[option] = false;
    }
  });

  return options_to_show
}

function toggleGroup() {
  var type_options = ['mv', 'ped', 'bike']
  var year_options = ['y2015', 'y2016', 'y2017', 'y2018']
  var month_options = ['m0', 'm1', 'm2', 'm3', 'm4', 'm5', 'm6', 'm7', 'm8', 'm9', 'm10', 'm11']
  var day_options = ['d0', 'd1', 'd2', 'd3', 'd4', 'd5', 'd6']
  var hour_options = ['h0', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8', 'h9', 'h10', 'h11', 'h12', 'h13', 'h14', 'h15', 'h16', 'h17', 'h18', 'h19', 'h20', 'h21', 'h22', 'h23']

  var types_to_show = checkOptions(type_options);
  var years_to_show = checkOptions(year_options);
  var months_to_show = checkOptions(month_options);
  var day_to_show = checkOptions(day_options);
  var hour_to_show = checkOptions(hour_options);


  for (var i = 0; i < markers.length; i++) {
    var marker = markers[i];
    var year_string = "y" + marker.datetime.getFullYear().toString();
    var month_string = "m" + marker.datetime.getMonth().toString();
    var hours_string = "h" + marker.datetime.getHours().toString();
    var day_of_week_string = "d" + marker.datetime.getDay().toString();

    if(types_to_show[marker.mode_type] && years_to_show[year_string] && months_to_show[month_string] && day_to_show[day_of_week_string] && hour_to_show[hours_string]){
      if (!marker.getVisible()) {
          marker.setVisible(true);
      }
    } else {
        marker.setVisible(false);
    }
  }
}
