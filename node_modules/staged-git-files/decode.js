
function oct2Decimal(oct) {
  oct = parseInt(oct);
  var i = 0,
      bit,
      sum = 0;
  do {
    bit = oct % 10;
    sum += bit * Math.pow(8, i++);
  } while ( (oct = ~~(oct / 10)) !== 0 )
  return sum;
}

function decode(string) {
  string = string.trim();
  return string
    .replace(/^\"(.+)\"$/, '$1')
    // x >= 128 && x <= 255
    .replace(/(\\\d{3})+/g, function (_) {
      var octArray = _.split('\\').slice(1);
      var decArray = octArray.map(function(oct) {
        return oct2Decimal(oct);
      });
      return new Buffer(decArray).toString('utf8');
    });
}

module.exports = decode;