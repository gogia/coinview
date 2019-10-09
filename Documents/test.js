'use strict';
$_$wp(1);
$_$w(1, 0), $_$tracer.log(optimizeTime(), 'optimizeTime()', 1, 0);
function optimizeTime() {
    $_$wf(1);
    var time = ($_$w(1, 1), 1);
    var callsPerMinute = ($_$w(1, 2), 60 / time * 8);
    while ($_$w(1, 3), callsPerMinute >= 90) {
        $_$w(1, 4), callsPerMinute = 60 / time * 8;
        $_$w(1, 5), time++;
    }
    $_$w(1, 6), $_$tracer.log(Math.floor(time * 1000 / 60), 'Math.floor(time * 1000 / 60)', 1, 6);
    return $_$w(1, 7), time * 1000;
}
$_$wpe(1);