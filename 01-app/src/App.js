import './App.css';

//1- definição dos componentes
function App() {
  //2- lógica js / antes do return
  const estiloh1 = {
    color: 'red',
    textAlign: 'center',
    fontSize: '50px'
  };

  const nome = "Dev";



  return (
    <div className="App">
      <header className="App-header">
        <h1 style={estiloh1}>Olá {nome}!</h1>
      </header>
      <button onClick={() => alert("oi")}>Clique aqui</button>
    </div>

    
  );
}

export default App;
