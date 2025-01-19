const {eventType} = require('../lib/client.js');

function stringToEnum(eventTypeStr) {
    const eventTypeKey = eventTypeStr.toUpperCase();
   let key = Object.entries(eventType).find(([_, value]) => value === eventTypeKey)[0];
   return key
  }

  module.exports = stringToEnum;