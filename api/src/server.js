//const _0x3e55ca=_0x1cf8;function _0x1cf8(_0x167b00,_0x12b74e){const _0x802be4=_0x802b();return _0x1cf8=function(_0x1cf8e2,_0x595814){_0x1cf8e2=_0x1cf8e2-0x161;let _0x16bff3=_0x802be4[_0x1cf8e2];return _0x16bff3;},_0x1cf8(_0x167b00,_0x12b74e);}function _0x802b(){const _0x5007e5=['Server','http','24831144xlOZCT','6fLoTGz','connect','express','./routes','listen','846331UHEHev','cors','57415hQmIJk','PORT','User\x20API\x20by\x20Papito','mongoose','env','4499719vjqjQH','3396636DBrBMn','1.2','config','400736eBKUZX','use','460869vzrngs','json'];_0x802b=function(){return _0x5007e5;};return _0x802b();}(function(_0x43e531,_0x1671b1){const _0x57be6f=_0x1cf8,_0x43c24c=_0x43e531();while(!![]){try{const _0x5bf9a2=-parseInt(_0x57be6f(0x174))/0x1+-parseInt(_0x57be6f(0x16f))/0x2*(parseInt(_0x57be6f(0x16a))/0x3)+parseInt(_0x57be6f(0x168))/0x4+-parseInt(_0x57be6f(0x176))/0x5+-parseInt(_0x57be6f(0x165))/0x6+-parseInt(_0x57be6f(0x164))/0x7+parseInt(_0x57be6f(0x16e))/0x8;if(_0x5bf9a2===_0x1671b1)break;else _0x43c24c['push'](_0x43c24c['shift']());}catch(_0x425012){_0x43c24c['push'](_0x43c24c['shift']());}}}(_0x802b,0xa5277));const express=require(_0x3e55ca(0x171)),mongoose=require(_0x3e55ca(0x162)),cors=require(_0x3e55ca(0x175)),{errors}=require('celebrate');require('dotenv')[_0x3e55ca(0x167)]({'path':__dirname+'/.env'});const http=require(_0x3e55ca(0x16d)),routes=require(_0x3e55ca(0x172)),app=express(),server=http[_0x3e55ca(0x16c)](app);mongoose[_0x3e55ca(0x170)](process[_0x3e55ca(0x163)]['MONGO_URL'],{'useNewUrlParser':!![],'useUnifiedTopology':!![],'useCreateIndex':!![]});const connectedUsers={};app[_0x3e55ca(0x169)]((_0x4950e1,_0x5545c6,_0x2f338c)=>{return _0x4950e1['connectedUsers']=connectedUsers,_0x2f338c();}),app['use'](cors()),app[_0x3e55ca(0x169)](express[_0x3e55ca(0x16b)]()),app['use'](routes),app['use'](errors()),app['get']('/',function(_0x4a82d9,_0x4df967){const _0x3b7ba0=_0x3e55ca;_0x4df967['json']({'app':_0x3b7ba0(0x161),'version':_0x3b7ba0(0x166),'beta':!![]});});const PORT=process['env'][_0x3e55ca(0x177)]||0xd05;server[_0x3e55ca(0x173)](PORT);
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const dotenv = require('dotenv');
const http = require('http');
const routes = require('./routes');

dotenv.config({ path: __dirname + '/.env' });

const app = express();
const server = http.createServer(app);

// Conexão com MongoDB (corrigida, sem 'useCreateIndex')
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const connectedUsers = {};

// Middleware global para repassar usuários conectados
app.use((req, res, next) => {
  req.connectedUsers = connectedUsers;
  next();
});

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());

// Rota base para checagem da API
app.get('/', (req, res) => {
  res.json({
    app: 'User API by Papito',
    version: '1.2',
    beta: true
  });
});

// Porta padrão (PORT) ou 3333
const PORT = process.env.PORT || 3333;
server.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
