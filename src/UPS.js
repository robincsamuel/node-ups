const fetch = require('node-fetch');
const { URLSearchParams, resolve } = require('url');

const SANDBOX_BASE_URL = 'https://wwwcie.ups.com/';
const PRODUCTION_BASE_URL = 'https://onlinetools.ups.com';

const Shipment = require('./resources/Shipment');
const AddressValidation = require('./resources/AddressValidation');

class UPS {
  constructor(config) {
    this.username = config.username;
    this.password = config.password;
    this.licenseNumber = config.licenseNumber;
    this.isSandbox = config.isSandbox;
    this.baseUrl = this.isSandbox ? SANDBOX_BASE_URL : PRODUCTION_BASE_URL;
    this.version = config.version || 'v1';
    this.timeout = config.timeout || 10000;

    this.shipment = new Shipment(this);
    this.addressValidation = new AddressValidation(this);
  }

  async request(endpoint, body, opts = {}) {
    const options = {
      timeout: this.timeout,
      method: 'POST',
      headers: {
        'Access-Control-Allow-Headers':
          'Origin, X-Requested-With, Content-Type, Accept',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        Accept: 'application/json',
        transId: '',
        transactionSrc: 'node-ups-client',
        AccessLicenseNumber: this.licenseNumber,
        Username: this.username,
        Password: this.password,
      },
    };

    let apiUrl = resolve(this.baseUrl, endpoint);

    if (opts.query) {
      const params = new URLSearchParams(opts.query);
      apiUrl = `${apiUrl}?${params}`;
    }

    const response = await fetch(apiUrl, {
      ...options,
      body: JSON.stringify(body),
      ...opts,
    });

    if (!response.ok) {
      const error = new Error(response.statusText);
      const UPSError = await response.json();
      Object.assign(error, { UPSError });
      throw error;
    }

    const result = await response.json();

    if (result.Error) {
      const error = new Error(result.Error.Description);
      Object.assign(error, { UPSError: result.Error });
      throw error;
    }

    return result;
  }
}

module.exports = UPS;
