import { useState, FormEvent } from 'react';
import './App.css'
import logoImg from './assets/logo.png';

interface InfoProps {
  title: string;
  alcool: number;
  gasolina: number;
}

function App() {
  const [alcoolInput, setAlcoolInput] = useState(0);
  const [gasolinaInput, setGasolinaInput] = useState(0);
  const [info, setInfo] = useState<InfoProps>({
    title: '',
    alcool: 0,
    gasolina: 0,
  });

  function calcular(e: FormEvent) {
    e.preventDefault();

    const calculo = (alcoolInput / gasolinaInput);

    if (calculo <= 0.7) {
      setInfo({
        title: "Abasteça com álcool",
        alcool: alcoolInput,
        gasolina: gasolinaInput,
      });
    } else {
      setInfo({
        title: "Abasteça com gasolina",
        alcool: alcoolInput,
        gasolina: gasolinaInput,
      });
    }

    setAlcoolInput(0);
    setGasolinaInput(0);
  }

  function formatarMoeda(valor: number){
    const valorFormatado = valor.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL'
    });

    console.log('chamou')

    return valorFormatado;
  }

  return (
    <div>
      <main className='container'>
        <img src={logoImg} alt="Logo calculadora combustível" />
        <h1 className='title'>Qual a melhor opção?</h1>

        <form className='form' onSubmit={calcular}>
          <label htmlFor="alcool">Álcool (preço por litro):</label>
          <input type="number" name="alcool" id="alcool" className="input" placeholder='4,90' min="1" step="0.01" required value={alcoolInput} onChange={(e) => setAlcoolInput(Number(e.target.value))} />
          <label htmlFor="gasolina">Gasolina (preço por litro):</label>
          <input type="number" name="gasolina" id="gasolina" className="input" placeholder='4,90' min="1" step="0.01" required value={gasolinaInput} onChange={(e) => setGasolinaInput(Number(e.target.value))} />

          <input className='button' type="submit" value="Calcular" />
        </form>

        {
          info.title !== '' && (
            <section className="result">
              <h3>{info.title}</h3>
              <span>Álcool {formatarMoeda(info.alcool)}</span>
              <span>Gasolina {formatarMoeda(info.gasolina)}</span>
            </section>
          )
        }

      </main>
    </div>
  )
}

export default App
