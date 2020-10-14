# Node-UPS

Javascript client for UPS JSON apis.


## Usage

```javascript
const UPS = require('node-ups');

const ups = new UPS({
  isSandbox: true,
  username: 'UPS_ACCOUNT_USERNAME',
  password: 'UPS_ACCOUNT_PASSWORD',
  licenseNumber: '<UPS_ACCESS_KEY>',
});

try {
  const shipment = await ups.shipment.create(shipmentPayload);
} catch ({ UPSError }) {
  console.log(UPSError.response.errors);
}

```

## TODO

* Add more APIs.
* Use @jsdoc to document APIs.
