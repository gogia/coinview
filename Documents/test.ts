 //Only allow 90 coins in coinList
console.log(optimizeTime());


function optimizeTime(): number {
    let time = 1;
    let numCoins = 1;

    let callsPerMinute;

    callsPerMinute = 60/ (90/numCoins);
    console.log(callsPerMinute);

    return ;


    //console.log(`CALLS PER MINUTE: ${callsPerMinute}`);
  },