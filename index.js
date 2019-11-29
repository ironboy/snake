// Watch and compile SASS (scss) to CSS
require('all-that-sass')({ reportCompiles: true });
// Start a web server with the
// www folder as root folder on port 3000
// (compress/gzip files when possible)
const express = require('express');
const compression = require('compression')
const app = express();
app.use(compression());
app.use(express.static('www'));
app.listen(3000, () => console.log('Listening on port 3000'));