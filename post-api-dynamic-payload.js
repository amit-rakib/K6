import { check } from 'k6';
import http from 'k6/http'
import { randomString } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';

export const options = {
    vus: 20,
    duration: '5s'
}





url = "https://reqres.in/api/users"

const payload = {
    "name": randomString(10),
    "job": "QA"
}

export default function (){
    const response = http.post(url, payload)

    console.log("Payload is: ", payload)
    console.log("Response is: ", response.body)

  check(response, {
    'Status Code Validation': (response) => response.status === 201,
    'Response Validation': (response) => response.body.includes('id')
  })

}
