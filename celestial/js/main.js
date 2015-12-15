/* Most of this was adapted from
https://github.com/pebble-hacks/slate-watchface-template/blob/master/config/js/main.js */

(function() {
  loadOptions();
  setUpHandlers();
})();

function loadOptions() {
  if (localStorage.backgroundColor) {
    var $backgroundColor = $('#background');
    var $centerpieceBGColor = $('#centerpiece-bg');
    var $centerpieceTextColor = $('#centerpiece-text');
    var $hourArcColor = $('#hour-arc');
    var $hourHandColor = $('#hour-hand');
    var $minuteArcColor = $('#minute-arc');
    var $minuteHandColor = $('#minute-hand');
    var $smoothToggle = $('#smooth');

    $backgroundColor[0].value = localStorage.backgroundColor;
    $centerpieceBGColor[0].value = localStorage.centerpieceBGColor;
    $centerpieceTextColor[0].value = localStorage.centerpieceTextColor;
    $hourArcColor[0].value = localStorage.hourArcColor;
    $hourHandColor[0].value = localStorage.hourHandColor;
    $minuteArcColor[0].value = localStorage.minuteArcColor;
    $minuteHandColor[0].value = localStorage.minuteHandColor;
    $smoothToggle[0].checked = localStorage.smoothToggle == 'true';
  }
}

function getAndStoreConfigData() {
  var $backgroundColor = $('#background');
  var $centerpieceBGColor = $('#centerpiece-bg');
  var $centerpieceTextColor = $('#centerpiece-text');
  var $hourArcColor = $('#hour-arc');
  var $hourHandColor = $('#hour-hand');
  var $minuteArcColor = $('#minute-arc');
  var $minuteHandColor = $('#minute-hand');
  var $smoothToggle = $('#smooth');

  // Get options
  var options = {
    backgroundColor: $backgroundColor.val(),
    centerpieceBGColor: $centerpieceBGColor.val(),
    centerpieceTextColor: $centerpieceTextColor.val(),
    hourArcColor: $hourArcColor.val(),
    hourHandColor: $hourHandColor.val(),
    minuteArcColor: $minuteArcColor.val(),
    minuteHandColor: $minuteHandColor.val(),
    smoothToggle: $smoothToggle[0].checked
  };

  // Store options to local cache
  localStorage.backgroundColor = options.backgroundColor;
  localStorage.centerpieceBGColor = options.centerpieceBGColor;
  localStorage.centerpieceTextColor = options.centerpieceTextColor;
  localStorage.hourArcColor = options.hourArcColor;
  localStorage.hourHandColor = options.hourHandColor;
  localStorage.minuteArcColor = options.minuteArcColor;
  localStorage.minuteHandColor = options.minuteHandColor;
  localStorage.smoothToggle = options.smoothToggle;

  console.log('Got options: ' + JSON.stringify(options));
  return options;
}

/**
 * Gets the passed 'variable' value from the request.
 * Returns the 'defaultValue' if no other matching value is found.
 */
function getQueryParam(variable, defaultValue) {
  var query = location.search.substring(1);
  var vars = query.split('&');
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    if (pair[0] === variable) {
      return decodeURIComponent(pair[1]);
    }
  }
  return defaultValue || false;
}

/**
 * Setups the click handlers for the two buttons
 */
function setUpHandlers() {
  var $submitButton = $('#submit');
  var $cancelButton = $('#cancel');

  $submitButton.on('click', function() {
    document.location = getQueryParam('return_to', 'pebblejs://close#') + encodeURIComponent(JSON.stringify(getAndStoreConfigData()));
  });

  $cancelButton.on('click', function() {
    document.location = getQueryParam('return_to', 'pebblejs://close#');
  });
}
