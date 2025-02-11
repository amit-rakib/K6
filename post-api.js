import { check } from 'k6'
import http from 'k6/http'


export const options = {
    vus: 10,
    duration: '5s'
}

const url = "https://reqres.in/api/users"
const data=open('./payload.json')
const payload = {
    "name": 'Bert',
        "job": "QA"
}

export default function () {
    const response = http.post(url, data)
    console.log("payload: ", data)
    console.log(response.body)

    check(response, {
        'status code validation': (response)=>response.status === 201,
        'RESPONSE ID Validation': (response)=>response.body.includes('id')
    })
}