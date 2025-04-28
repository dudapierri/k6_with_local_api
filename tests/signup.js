import http from 'k6/http';
import { sleep, check } from 'k6';
import uuid from './libs/uuid.js'

export const options = { //configuração de limite (qa não vai definir isso sozinho, precisa de arq)
  vus:1,
  duration: '10s',
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

  console.log(res.body)

  
  check(res, { //verifica se o status code é 201
    'status should be 201': (r) => r.status === 201
  });

  sleep(1);
}