import http from 'k6/http';
import { sleep, check } from 'k6';
import uuid from './libs/uuid.js'
import {htmlReport} from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js"//relatório


export function handleSummary (data){
  return{
    "summary.html": htmlReport(data),
  };
}
export const options = { //configuração de limite (qa não vai definir isso sozinho, precisa de arq)
  stages: [
    {duration:'2m', target:100}, // below normal load
    {duration:'5m', target:100},
    {duration:'2m', target:200}, // normal load
    {duration:'5m', target:200},
    {duration:'2m', target:300}, // aroung the breaking point
    {duration:'5m', target:300},
    {duration:'2m', target:400}, // beyond the breaking point
    {duration:'5m', target:400},
    {duration:'10m', target:0}, // scale down. Recovery stage.
  ],
  thresholds:{
    http_req_duration: ['p(95)<2000'], // 95% das requisicoes devem responder em ate 2s
    http_req_failed: ['rate<0.01'] // 1% das requisicoes podem ocorrer erro 
  }
}

export default function () {
  const url = 'http://localhost:3333/signup';
  //carga de solicitação (dados que serão enviados)
  const payload  = JSON.stringify({email: `${uuid.v4().substring(24)}@qa.com.br`, password: 'pdw1290903'});  //transforma objeto JSON em string 
  const headers = {
    'headers':{
        'Content-Type': 'application/json'
    }
  } 
  const res = http.post(url,payload,headers);
  
  check(res, { //verifica se o status code é 201
    'status should be 201': (r) => r.status === 201
  });

  sleep(1);
}