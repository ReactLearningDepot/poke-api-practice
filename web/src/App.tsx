import {useEffect, useState} from "react";
import './App.css'

export default function App() {
  const [pokemons, setPokemons] = useState<GetPokemonType[]>([])
  const [pokemonSprites, setPokemonSprites] = useState<GetPokemonSpritesType | null>(null)

  const handleSelectPokemon = (url: string) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setPokemonSprites(data['sprites']['other']['official-artwork']))
  }

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
      .then((res) => res.json())
      .then((data) => setPokemons(data.results))
  }, []);

  return (
    <div className='container'>
      <ul>
        {pokemons.map((pokemon) => (
          <li key={pokemon.name} onClick={() => handleSelectPokemon(pokemon.url)}>
            {pokemon.name}
          </li>
        ))
        }
      </ul>
      <div className='pokemon-image'>
        {pokemonSprites && <img src={pokemonSprites?.front_default} alt="pokemon-image"/>}
      </div>
    </div>
  )
}

type GetPokemonType = {
  name: string,
  url: string
}

type GetPokemonSpritesType = {
  front_default: string,
}