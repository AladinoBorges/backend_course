const axios = require('axios');

const BTC_API = 'https://api.coindesk.com/v1/bpi/currentprice/BTC.json)';

async function getBTCPrice() {
  try {
    const btcPrice = await axios.get(BTC_API).then(({ data }) => data);

    return btcPrice;
  } catch (error) {
    return error;
  }
}

module.exports = getBTCPrice;
