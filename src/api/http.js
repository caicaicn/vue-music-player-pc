import axios from './config';
let request_url = window.location.port === '9688' ? 'http://localhost:3000' : 'http://139.224.229.251:3000';
let httprequest = function (type, url, params){
    if (type == 'get'){
        return new Promise((resolve, reject)=>{
            axios({
                type,
                url: `${request_url}${url}`,
                params
            })
            .then(res=>{
                resolve(res.data)
            }, err => {
                reject(err);
            })
            .catch(error=>{
                reject(error)
            })
        })
    } else if (type == 'post'){
        return new Promise((resolve, reject) => {
            axios({
                method,
                url: `${request_url}${url}`,
                data
            })
            .then(res => {
                resolve(res.data)
            })
            .catch(error => {
                reject(error)
            })
        })
    }
}

export default httprequest;