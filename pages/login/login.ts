// function calculateDistance(origin, destination) {
  //   var service = new google.maps.DistanceMatrixService();
  //   service.getDistanceMatrix(
  //   {
  //     origins: [origin],
  //     destinations: [destination],
  //     travelMode: google.maps.TravelMode.WALKING,
  //     unitSystem: google.maps.UnitSystem.IMPERIAL,
  //     avoidHighways: false,
  //     avoidTolls: true
  //   }, callback);
  // } 

  // function callback(response, status) {
  //   if (status != google.maps.DistanceMatrixStatus.OK) {
      
  //   } else {
  //     var origin = response.originAddresses[0];
  //     var destination = response.destinationAddresses[0];
  //     if (response.rows[0].elements[0].status === "ZERO_RESULTS") {
  //     } else {
  //       var distance = response.rows[0].elements[0].distance;
  //       var distance_value = distance.value;
  //       var distance_text = distance.text;
  //       var miles = distance_text.substring(0, distance_text.length - 3);
  //       console.log(miles*1.60+' km');
  //     }
  //   }
  // }
