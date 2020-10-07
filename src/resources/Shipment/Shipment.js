const Resource = require('../../Resource');
const { resolve } = require('url');

class Shipment extends Resource {
  basePath = `/ship/${this.client.version}`;

  async create(payload) {
    const endpoint = `${this.basePath}/shipments`;
    return this.client.request(endpoint, payload);
  }
}

module.exports = Shipment;
