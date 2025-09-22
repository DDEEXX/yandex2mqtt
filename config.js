module.exports = {

  mqtt: {
    host: '192.168.1.4',
    port: 1883,
    user: 'dxhome',
    password: '16384',
  },

  https: {
    privateKey: '/etc/letsencrypt/live/ddeexx80.ru/privkey.pem',
    certificate: '/etc/letsencrypt/live/ddeexx80.ru/fullchain.pem',
    port: 444,
  },

  clients: [
    {
      id: '1',
      name: 'YandexDxHome',
      clientId: 'yandexDxhome80t',
      clientSecret: 'dxhome16384$#',
      isTrusted: false,
    },
  ],

  users: [{
    id: '1',
    username: 'root',
    password: 'dxhome16384',
    name: 'AdministratorDxHome',
  },
  ],

  devices: [
    // _______________Свет в столовой______________//
    {
      id: 'dx-light-dining',
      name: 'Свет в столовой',
      room: 'Столовая',
      type: 'devices.types.light',
      mqtt: [
        {
          type: 'on',
          set: 'alice/home/dining/light/set',
          state: 'alice/home/dining/light',
        },
      ],
      capabilities: [
        {
          type: 'devices.capabilities.on_off',
          retrievable: true,
          state: {
            instance: 'on',
            value: true,
          },
        },
      ],
    },
    // __________Конец устройства__________//

    // _______________Подсветка в зале______________//
    {
      id: 'dx-backlight-hall',
      name: 'Подсветка в зале',
      room: 'Зал',
      type: 'devices.types.light',
      mqtt: [
        {
          type: 'on',
          set: 'alice/home/hall/backlight/set',
          state: 'alice/home/hall/backlight',
        },
        {
          type: 'brightness',
          set: 'alice/home/hall/backlight/brightness/set',
          state: 'alice/home/hall/backlight/brightness',
        },
      ],
      capabilities: [
        {
          type: 'devices.capabilities.on_off',
          retrievable: true,
          state: {
            instance: 'on',
            value: true,
          },
        },
        {
          type: 'devices.capabilities.range',
          retrievable: true,
          parameters: {
            instance: 'brightness',
            unit: 'unit.percent',
            range: {
              min: 0,
              max: 100,
              precision: 10,
            },
          },
          state: {
            instance: 'brightness',
            value: 10,
          },
        },
      ],
    },
    // __________Конец устройства__________//

    // _______________Жалюзи в зале______________//
    {
      id: 'dx-jalousie-hall',
      name: 'Жалюзи',
      room: 'Зал',
      type: 'devices.types.openable.curtain',
      mqtt: [
        {
          type: 'on',
          set: 'alice/home/hall/jalousie_hall_1/set',
          state: 'alice/home/hall/jalousie_hall_1',
        },
        {
          type: 'open',
          set: 'alice/home/hall/jalousie_hall_1/open/set',
          state: 'alice/home/hall/jalousie_hall_1/open',
        },
      ],
      capabilities: [
        {
          type: 'devices.capabilities.on_off',
          retrievable: true,
          state: {
            instance: 'on',
            value: true,
          },
        },
        {
          type: 'devices.capabilities.range',
          retrievable: true,
          parameters: {
            instance: 'open',
            random_access: true,
            range: {
              max: 100,
              min: 0,
              precision: 10,
            },
            unit: 'unit.percent',
          },
          state: {
            instance: 'channel',
            value: 0,
          },
        },
      ],
    },
    // __________Конец устройства__________//
    // _______________Жалюзи в зале______________//
    {
      id: 'dx-jalousie-kitchen',
      name: 'Жалюзи',
      room: 'Кухня',
      type: 'devices.types.openable.curtain',
      mqtt: [
        {
          type: 'on',
          set: 'alice/home/kitchen/jalousie/set',
          state: 'alice/home/kitchen/jalousie',
        },
        {
          type: 'open',
          set: 'alice/home/kitchen/jalousie/open/set',
          state: 'alice/home/kitchen/jalousie/open',
        },
      ],
      capabilities: [
        {
          type: 'devices.capabilities.on_off',
          retrievable: true,
          state: {
            instance: 'on',
            value: true,
          },
        },
        {
          type: 'devices.capabilities.range',
          retrievable: true,
          parameters: {
            instance: 'open',
            random_access: true,
            range: {
              max: 100,
              min: 0,
              precision: 10,
            },
            unit: 'unit.percent',
          },
          state: {
            instance: 'channel',
            value: 0,
          },
        },
      ],
    },
    // __________Конец устройства__________//

  ],
};
