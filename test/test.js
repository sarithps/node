var assert = require('assert');
const some = require('../moc').some;

describe('App', function(){
  it('some should return zero', function(){
    let result = some();
    assert.equal(result,0);
  });
});