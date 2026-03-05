const usuario = {
    id: 123,
    nome: "Mariana",
    email: "mariana@email.com",
    endereco: {
        rua: "Augusta",
        numero: 500,
        cidade: "São Paulo"
    }
};

const {nome, email} = usuario;
console.log(nome, email);

const {rua, cidade} =usuario.endereco;
console.log(rua, cidade);

function exibirUser({nome, email, endereco}){
    console.log(`Nome: ${nome}, Email: ${email}, Rua: ${endereco.rua}, Cidade: ${endereco.cidade}`);
}

//--------------------------------
function addNum(array, num){

   return [...array, num];
}

const nums = [1, 2, 3, 4, 5];
console.log(addNum(nums, 6));

