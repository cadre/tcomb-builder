const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const chaiImmutable = require('chai-immutable');

// chai-immutable needs to be loaded before every other plugin.
chai.use(chaiImmutable);
chai.use(chaiAsPromised);

global.assert = chai.assert;
global.expect = chai.expect;
global.should = chai.should();
