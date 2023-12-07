//Variaveis globais
const pokemonImage = document.querySelector(".pokemon-img");
const pokemonNumber = document.querySelector(".pokemon-number");
const pokemonName = document.querySelector(".pokemon-name");
const form = document.querySelector(".form");
const inputSearch = document.querySelector(".input-search");
const buttonPrev = document.querySelector(".btn-prev");
const buttonNext = document.querySelector(".btn-next");
let changePokemon = 1;


//Conectando à PokeAPI
const fetchPokemon = async (pokemon) => {

    const APIresponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);


    if (APIresponse.status === 200) {
        const data = await APIresponse.json();
        return data;


    } else {

        inputSearch.value = "";
    }

};

//Renderizar dados Pokemon
const renderPokemon = async (pokemon) => {

    pokemonNumber.innerHTML = "";
    pokemonName.innerHTML = "Carregando... -";
    pokemonImage.src = "../images/ampulheta.gif";

    const data = await fetchPokemon(pokemon);

    if (data) {

        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        pokemonNumber.innerHTML = data.id;
        pokemonName.innerHTML = data.name;

        //limpa o campo input
        inputSearch.value = "";
        changePokemon = data.id;

    } else {
        pokemonImage.src = "../images/sad.png";
        pokemonName.innerHTML = "Não encontrado!";
        inputSearch.value = "";

    }


};

//Localizar o pokemon pelo input
form.addEventListener('submit', (event) => {

    event.preventDefault();
    renderPokemon(inputSearch.value.toLowerCase());

});


//Eventos dos botões prev e next
buttonPrev.addEventListener('click', () => {
    if (changePokemon > 1) {
        changePokemon -= 1;
        renderPokemon(changePokemon);
    }

});

buttonNext.addEventListener('click', () => {
    changePokemon += 1;
    renderPokemon(changePokemon);

});



