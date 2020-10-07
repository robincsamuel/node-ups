const Resource = require('../../Resource');
const { resolve } = require('url');

class AddressValidation extends Resource {
  basePath = '/rest/AV';

  //  {
  //     "Request": {
  //         "TransactionReference": {
  //             "CustomerContext": "Your Customer Context"
  //         },
  //         "RequestAction": "AV"
  //     },
  //     "Address": {
  //         "City": "ALPHARETTA",
  //         "StateProvinceCode": "GA",
  //         "PostalCode": "30005"
  //     }
  // }
  async check(AddressValidationRequest) {
    const payload = {
      AccessRequest: {
        UserId: this.client.username,
        Password: this.client.password,
        AccessLicenseNumber: this.client.licenseNumber,
      },
      AddressValidationRequest,
    };

    return this.client.request(this.basePath, payload);
  }
}

module.exports = AddressValidation;
