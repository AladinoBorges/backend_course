const axios = require('axios').default;

const API_TOKEN = '2d635ea9b637ea0f27d58985cc161d64';
const headers = { Authorization: API_TOKEN };
const body = {
  name: 'Aladino',
  email: 'aladino@teste.email',
  password: 'P455w0rd_2021@?|',
};

async function get(requisition) {
  return axios
    .get(`https://postman-echo.com/${requisition}?param1=teste`, { headers })
    .then((response) => {
      return response.data;
    })
    .then((data) => {
      console.log(data);
    })
    .catch((errorOrResponse) => {
      if (errorOrResponse.status) {
        return console.error(`Request failed with status ${errorOrResponse.status}`);
      }

      console.error(errorOrResponse);
    });
}

async function post(requisition) {
  return axios
    .post(`https://postman-echo.com/${requisition}?param1=teste`, body, { headers })
    .then((response) => {
      return response.data;
    })
    .then((data) => {
      console.log(data);
    })
    .catch((errorOrResponse) => {
      if (errorOrResponse.status) {
        return console.error(`Request failed with status ${errorOrResponse.status}`);
      }

      console.error(errorOrResponse);
    });
}

async function requisitions(request) {
  const formated = request.toLowerCase();

  switch (formated) {
    case 'get':
      return get(formated);
    case 'post':
      return post(formated);
    default:
      break;
  }
}

requisitions('get');
