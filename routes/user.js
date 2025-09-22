'use strict';

const passport = require('passport');

module.exports.info = [
  passport.authenticate('bearer', { session: true }),
  (request, response) => {
    response.json({
      user_id: request.user.id,
      name: request.user.name,
      scope: request.authInfo.scope
    });
  }
];


module.exports.ping = [
  passport.authenticate('bearer', { session: true }),
  (request, response) => {
    response.status(200);
    response.send('OK');
  }
];

module.exports.devices = [
  passport.authenticate('bearer', { session: true }),
  (request, response) => {
    var r = {
      request_id: '1',
      payload: {
        user_id: '1',
        devices: []
      }
    };
    for (const i in global.devices) {
      r.payload.devices.push(global.devices[i].getInfo());
    }

    response.status(200);
    response.send(r);
  }
];

module.exports.query = [
  passport.authenticate('bearer', { session: true }),
  (request, response) => {
    const reqId = request.get('X-Request-Id');
    const r = {
      request_id: reqId,
      payload: {
        devices: []
      }
    };

    for (const d of request.body.devices) {
      const curDevice = global.devices.find(device => device.data.id == d.id);
      r.payload.devices.push(curDevice.getState());
    };

    response.send(r);
  }
];

module.exports.action = [
  passport.authenticate('bearer', { session: true }),
  (request, response) => {
    const reqId = request.get('X-Request-Id');
    const r = {
      request_id: reqId,
      payload: {
        devices: []
      }
    };

    for (const payloadDevice of request.body.payload.devices) {
      const {id} = payloadDevice;

      const capabilities = [];
      const curDevice = global.devices.find(device => device.data.id == id);

      for (const pdc of payloadDevice.capabilities) {
        try {
          capabilities.push(curDevice.setState(pdc.state.value, pdc.type, pdc.state.instance));
        } catch (err) {
          capabilities.push(curDevice.setState(true, pdc.type, 'mute'));
        }
      }

      r.payload.devices.push({id, capabilities});
    };
    response.send(r);
  }
];

module.exports.unlink = [
  passport.authenticate('bearer', { session: true }),
  (request, response) => {
    response.status(200);
  }
];
