import { check } from 'k6'
import http from 'k6/http'


export const options = {
    vus: 10,
    iterations: 20
}


export default function () {
    const response = http.get("https://test.k6.io")

   check(response, {
    'status code validation':(response)=>response.status===200
   }) 
}