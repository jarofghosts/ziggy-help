help.help = [
    '!help - list all plugins with help'
  , '!help <plugin name> - display help text for <plugin name>'
].join('\n')

module.exports = help

function help(ziggy) {
  ziggy.on('message', parse_message)
  ziggy.on('pm', parse_pm)

  function parse_message(user, channel, message) {
    var bits = message.split(/\s+/)

    if(bits[0] !== '!help') return

    if(!bits[1]) return list_helps()

    for(var i = 0, l = ziggy.settings.plugins.length; i < l; ++i) {
      if(ziggy.settings.plugins[i].name === bits[1]
          && ziggy.settings.plugins[i].setup.help) {
            return say_help(ziggy.settings.plugins[i].setup.help)
      }
    }

    ziggy.say(channel, 'I\'m sorry, no help text found for "' + bits[1] + '"')

    function list_helps() {
      ziggy.say(
          channel
        , 'Available topics: ' + ziggy.settings.plugins.reduce(get_helps, '')
      )
    }

    function say_help(text) {
      ziggy.say(channel, text)
    }
  }

  function parse_pm(user, message) {
    parse_message(user, user.nick, message)
  }
}

function get_helps(str, plugin) {
  if(plugin.setup.help) str += plugin.name + ' '

  return str
}
