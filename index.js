/*
    Tabela de códigos Mega
    
    login
    9  - Email ou senha inválido
    0  - Logou com sucesso
    54 - Usuário já logado

    logout
    0  - Deslogado com sucesso

    ls 
    57 - Não logado
    0  - Listou com sucesso


*/

var spawn = require('child_process').spawn;
const path = process.platform === 'win32' ? 'MEGAcmd\\MEGAclient.exe ' : "linux-path(in progress)";

function login (email, pass) {
    
    login = spawn(path, ['login', email, pass]);

    login.stdout.setEncoding('utf8');
    login.stdout.on('data', function(data){
        //console.log(data);
    });

    login.on('close', (code) => {
        switch (code) {
            case 0:
                console.log('Logado com sucesso!');
                break;
            case 9:
                console.log('Usuário ou senha inválido!');
                break;
            case 54: 
                console.log('Usuário já logado!');
                break;
            default: 
                console.log('Código desconhecido! Code: ' + code);
        }
    });

}

function logout () {

    logout = spawn(path, ['logout']);

    logout.stdout.setEncoding('utf8');  
    logout.stdout.on('data', function () {
        //console.log('data')
    });

    logout.on('close', (code) => {
        console.log(`${code}`);
    });

}

function listFiles (pathMega) {
    list = spawn(path, ['ls', pathMega]);

    //list.stdout.setEncoding('utf8');
    list.stdout.on('data', function(data){
        //console.log(`${data}`);
    });

    list.on('close', (code) => {
        console.log(`${code}`);
    });
}

function uploadFiles (files, pathMega) {

    upload = spawn(path, ['put', '-c', files, pathMega]);

    upload.stdout.setEncoding('utf8'); 
    upload.stdout.on('data', function(data){
        upload.stdin.write(data);
    });
}
