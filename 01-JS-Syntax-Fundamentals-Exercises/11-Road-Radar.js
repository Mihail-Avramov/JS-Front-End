function solve(speed, zone) {
    let zoneLimits = {
        'city': 50,
        'interstate': 90,
        'motorway': 130,
        'residential': 20,
    }

    function status(speed, limit){
        if(speed - limit > 40) {
          return 'reckless driving'
        }
        else if (speed - limit > 20) {
            return 'excessive speeding'
        }
        else {
            return 'speeding'
        }
    }

    if (zoneLimits[zone] > speed){
        console.log(`Driving ${speed} km/h in a ${zoneLimits[zone]} zone`)
    }
    else {
        console.log(`The speed is ${speed - zoneLimits[zone]} km/h faster than the allowed speed of ${zoneLimits[zone]} - ${status(speed, zoneLimits[zone])}`)
    }
}

solve(40, 'city')
solve(21, 'residential' )
solve(120, 'interstate')
solve(200, 'motorway')
