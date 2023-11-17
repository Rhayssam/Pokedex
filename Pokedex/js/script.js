const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchpokemon = 1;

//Função para PESQUISAR os dados do pokemon
const fetchPokemon = async (pokemon) => {
    //Site da API responsável por trazer as informações dos pokemons
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`); 
    
    if (APIResponse.status == 200){
        const data = await APIResponse.json();
        return data;
    }
}

//Função para RETORNAR os dados do pokemon
const renderPokemon = async (pokemon) => {  

    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if(data){
        pokemonImage.style.display = 'block';
        //Retorna o nome do pokemon
        pokemonName.innerHTML = data.name;
        //Retorna o ID do pokemon
        pokemonNumber.innerHTML = data.id;
        //Retorna o gif (imagem) do pokemon
        pokemonImage.src = data['sprites']['versions']['generation-v']
        ['black-white']['animated']['front_default'];
        input.value = '';
        searchpokemon = data.id;
    } else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not found :c';
        pokemonNumber.innerHTML ='';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
    if (searchpokemon > 1){
        searchpokemon -= 1;
        renderPokemon(searchpokemon);
    }
});
buttonNext.addEventListener('click', () => {
    searchpokemon += 1;
    renderPokemon(searchpokemon);
});


renderPokemon(searchpokemon);
