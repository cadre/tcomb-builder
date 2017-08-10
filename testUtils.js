const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

global.assert = chai.assert;
global.expect = chai.expect;
global.should = chai.should();
