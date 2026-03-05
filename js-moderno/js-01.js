//const nome = "Augustus";
let idade = 19;

//nome = "joaquim" ------- const não pode ter alteração de valor
idade = 20;
console.log(nome, idade);


//-------------------------------  
const num = [1,2,3,4,5];

const par = num.filter(numero => numero % 2 === 0);
console.log(par);

//-------------------------------
const profissional = {
    nome: "Augustus",
    profissao: "Desenvolvedor",
    experiencia: 6
};
let msg;

if (profissional.experiencia > 5) {
    msg = `Olá, meu nome é ${profissional.nome} e sou ${profissional.profissao} de nível sênior`;
} else{
    msg = `Olá, meu nome é ${profissional.nome} e sou ${profissional.profissao}`;

}

console.log(msg);


//-------------------------------
