import { check } from 'k6'
import http from 'k6/http'


export const options = {
    vus: 10,
    duration: '5s'
}

const url = "https://quickpizza.grafana.com/api/json"

export default function () {
    const response = http.post(url, {
        name: 'Bert'
    })

    check(response, {
        'status code validation': (response)=>response.status === 201,
    })
}