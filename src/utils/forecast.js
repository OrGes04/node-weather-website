const request = require("request");

const forecast = (longitude, latitude, callback) => {
  const url = `https://api.weatherstack.com/current?access_key=686d567b0360b0cacd2f773cc01c52fe&query=${encodeURI(latitude)},${encodeURI(longitude)}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service.", undefined);
    } else if (body.error) {
      callback("Unable to find location.", undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out. The humidity is ${body.current.humidity}%.`,
      );
    }
  });
};

module.exports = forecast;
