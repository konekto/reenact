const timers = {}

module.exports = {startTimer, getElapsedTime};

function startTimer(id) {

	timers[id] = process.hrtime();
}

// get elapsed time
function getElapsedTime(id) {

  const hrend = process.hrtime(timers[id]);

  return (hrend[0] * 1000) + (hrend[1] / 1000000);
}
