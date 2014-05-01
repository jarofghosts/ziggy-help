var help = require('../')

var test = require('tape')

var EE = require('events').EventEmitter

test('lists only plugins with help text', function(t) {
  t.plan(2)

  var ziggy = new EE
  ziggy.settings = {
      plugins: [
          {name: 'derp', setup: {help: 'merp'}}
        , {name: 'werp', setup: {}}
      ]
  }

  help(ziggy)

  ziggy.say = function(channel, text) {
    t.equal(channel, '#lawl')
    t.equal(text, 'Available topics: derp ')
  }

  ziggy.emit('message', {nick: 'doo'}, '#lawl', '!help')
})

test('reads help text', function(t) {
  t.plan(2)

  var ziggy = new EE
  ziggy.settings = {
      plugins: [
          {name: 'derp', setup: {help: 'merp'}}
        , {name: 'werp', setup: {}}
      ]
  }

  help(ziggy)

  ziggy.say = function(channel, text) {
    t.equal(channel, '#lawl')
    t.equal(text, 'merp')
  }

  ziggy.emit('message', {nick: 'doo'}, '#lawl', '!help derp')
})

test('responds if help text unavailable', function(t) {
  t.plan(2)

  var ziggy = new EE
  ziggy.settings = {
      plugins: [
          {name: 'derp', setup: {help: 'merp'}}
        , {name: 'werp', setup: {}}
      ]
  }

  help(ziggy)

  ziggy.say = function(channel, text) {
    t.equal(channel, '#lawl')
    t.equal(text, 'I\'m sorry, no help text found for "werp"')
  }

  ziggy.emit('message', {nick: 'doo'}, '#lawl', '!help werp')
})
