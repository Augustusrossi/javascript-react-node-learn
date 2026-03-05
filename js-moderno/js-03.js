// Simulando operações assíncronas encadeadas
function buscarUsuario(id) {
  return new Promise((resolve, reject) => {
    console.log(`Buscando usuário ${id}...`);
    
    setTimeout(() => {
      // Simulando sucesso
      const usuario = { id: id, nome: "João Silva", email: "joao@email.com" };
      resolve(usuario);
      // Se quisesse simular erro: reject("Usuário não encontrado");
    }, 1000);
  });
}

function buscarPedidos(usuario) {
  return new Promise((resolve, reject) => {
    console.log(`Buscando pedidos de ${usuario.nome}...`);
    
    setTimeout(() => {
      const pedidos = [
        { id: 1, produto: "Notebook", valor: 3500 },
        { id: 2, produto: "Mouse", valor: 150 }
      ];
      // Passamos adiante o usuário E os pedidos
      resolve({ usuario, pedidos });
    }, 15000);
  });
}

function calcularTotal(dados) {
  return new Promise((resolve) => {
    console.log("Calculando total dos pedidos...");
    
    setTimeout(() => {
      const total = dados.pedidos.reduce((soma, p) => soma + p.valor, 0);
      // Podemos passar apenas o total ou um objeto completo
      resolve({
        usuario: dados.usuario,
        pedidos: dados.pedidos,
        total: total
      });
    }, 5000);
  });
}

// Usando o encadeamento - MUITO mais legível que callbacks!
buscarUsuario(123)
  .then((usuario) => {
    console.log("Usuário encontrado:", usuario);
    // Retornar uma nova promise permite o encadeamento
    return buscarPedidos(usuario);
  })
  .then((dados) => {
    console.log("Pedidos encontrados:", dados.pedidos);
    return calcularTotal(dados);
  })
  .then((resultadoFinal) => {
    console.log("===== RESUMO FINAL =====");
    console.log(`Cliente: ${resultadoFinal.usuario.nome}`);
    console.log(`Email: ${resultadoFinal.usuario.email}`);
    console.log(`Quantidade de pedidos: ${resultadoFinal.pedidos.length}`);
    console.log(`Total a pagar: R$ ${resultadoFinal.total.toFixed(2)}`);
  })
  .catch((erro) => {
    // UM ÚNICO .catch() captura erros de QUALQUER promise da cadeia
    console.error("Falha no processo:", erro);
  })
  .finally(() => {
    console.log("Processo de compra finalizado!");
  });


  //--------------------------------

  // Promise.all() - Aguarda TODAS as promises resolverem
// Se UMA falhar, todas falham

console.log("Buscando múltiplos produtos...");

const promessa1 = new Promise(resolve => setTimeout(() => resolve("Produto 1"), 2000));
const promessa2 = new Promise(resolve => setTimeout(() => resolve("Produto 2"), 1000));
const promessa3 = new Promise(resolve => setTimeout(() => resolve("Produto 3"), 3000));

Promise.all([promessa1, promessa2, promessa3])
  .then((resultados) => {
    // resultados é um ARRAY com os valores na mesma ordem
    console.log("TODOS produtos carregados:", resultados);
    // Resultado após 3 segundos: ["Produto 1", "Produto 2", "Produto 3"]
  })
  .catch(erro => console.log("Alguma promessa falhou:", erro));

// Promise.race() - Retorna a PRIMEIRA promise que resolver ou rejeitar
console.log("Corrida de promises...");

Promise.race([promessa1, promessa2, promessa3])
  .then((vencedor) => {
    console.log("Primeiro a responder:", vencedor); // "Produto 2" (após 1 segundo)
  });

// Promise.allSettled() - Aguarda TODAS, mas não falha se alguma rejeitar
const promessa4 = Promise.resolve("Sucesso 1");
const promessa5 = Promise.reject("Erro 2");
const promessa6 = Promise.resolve("Sucesso 3");

Promise.allSettled([promessa4, promessa5, promessa6])
  .then((resultados) => {
    console.log("Status de todas:");
    resultados.forEach((resultado, index) => {
      if (resultado.status === "fulfilled") {
        console.log(`Promise ${index + 1}: OK - ${resultado.value}`);
      } else {
        console.log(`Promise ${index + 1}: ERRO - ${resultado.reason}`);
      }
    });
  });

// Promise.any() - Retorna a PRIMEIRA que RESOLVER com sucesso
// Ignora rejeições até encontrar uma resolução
const promessaLenta = new Promise(resolve => setTimeout(() => resolve("Lenta"), 3000));
const promessaRapida = new Promise((_, reject) => setTimeout(() => reject("Rápida falhou"), 1000));
const promessaMedia = new Promise(resolve => setTimeout(() => resolve("Média"), 2000));

Promise.any([promessaLenta, promessaRapida, promessaMedia])
  .then((primeiraBemSucedida) => {
    console.log("Primeira a dar certo:", primeiraBemSucedida); // "Média" (após 2 segundos)
  });