
export class Calories {
  compute_cals(distanceTravelled,hours,minutes,seconds,userWeight,movement) {
  let time;  // minutes
  let speed;  // mph (initially -- will be converted to meters/min later)
  let distance; // miles
  let incline= 0.0;
  let weight = userWeight * 1.0 || 65; 
  let oxy_rate = 0;
  let vertical_rate = 0;
    
    time = hours*60 + minutes + seconds/60;
    distance = distanceTravelled * 0.621371192;
    speed = distance / (time / 60);
    speed *= 26.8224; // The conversion factor changes things to mph; multiply by 26.8224 to convert to meters/min
  
  if (movement=="WALKING") {
    vertical_rate = 1.8 * speed * incline;
    oxy_rate = (0.1 * speed) + vertical_rate + 3.5;
  } else {
    vertical_rate = 0.9 * speed * incline;
    oxy_rate = (0.2 * speed) + vertical_rate + 3.5;
  }
  
    let cals_burned_per_minute = oxy_rate * weight * 5 / 1000;
    return Math.round(cals_burned_per_minute * time);
  }

}
