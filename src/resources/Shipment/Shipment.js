const Resource = require('../../Resource');
const { resolve } = require('url');

class Shipment extends Resource {
  basePath = `/ship/${this.client.version}`;

  async create(payload) {
    const endpoint = `${this.basePath}/shipments`;
    return this.client.request(endpoint, payload);
  }

  async label(payload) {
    const endpoint = `${this.basePath}/shipments/labels`;
    return this.client.request(endpoint, payload);
  }

  async cancel(shipmentId, payload) {
    const endpoint = `${this.basePath}/shipments/cancel/${shipmentId}`;
    return this.client.request(endpoint, payload, { method: 'DELETE' });
  }
}

module.exports = Shipment;
