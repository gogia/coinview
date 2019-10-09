 
console.log(optimizeTime());


function optimizeTime(): number {
    let time = 1;
    let callsPerMinute = (60 / time) * 8;

    while (callsPerMinute >= 90) {
      callsPerMinute = (60 / time) * 8;
      time++;
    }
    
    console.log(Math.floor(time * 1000 /60));
    return time * 1000;


    //console.log(`CALLS PER MINUTE: ${callsPerMinute}`);
  },