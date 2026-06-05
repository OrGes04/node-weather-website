const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/search/geocode/v6/forward?q=${encodeURIComponent(address)}&access_token=pk.eyJ1Ijoib3JnZXMwNCIsImEiOiJjbWwyZ3dyMzIwYXg4M2NzYjQ3d2dxd3YzIn0.2VDDHg3BIJhqfR5eeYEA7w&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services.", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].geometry.coordinates[0],
        longitude: body.features[0].geometry.coordinates[1],
        location: body.features[0].properties.full_address,
      });
    }
  });
};

module.exports = geocode;
