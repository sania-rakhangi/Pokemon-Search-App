const input = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const character = document.getElementById("pokemon-name");
const id = document.getElementById("pokemon-id");
const image = document.getElementById("pokemon-image");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const types = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const spAttack = document.getElementById("special-attack");
const spDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

const getPokemon = async(input) => {
    try{
        const pokemon = input.toLowerCase();
        const res = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemon}`);
        const data = await res.json();

        character.textContent = `${data.name.toUpperCase()}`;
        id.textContent = `#${data.id}`;
        weight.textContent = `Weight: ${data.weight}`;
        height.textContent = `Height: ${data.height}`;
        image.innerHTML = `<img id="sprite" src="${data.sprites.front_default}" alt="${data.name} front default sprite">`;
        hp.textContent = `${data.stats[0].base_stat}`;
        attack.textContent = `${data.stats[1].base_stat}`;
        defense.textContent = `${data.stats[2].base_stat}`;
        spAttack.textContent = `${data.stats[3].base_stat}`;
        spDefense.textContent = `${data.stats[4].base_stat}`;
        speed.textContent = `${data.stats[5].base_stat}`;
        types.innerHTML = data.types.map(obj => `<div class="type ${obj.type.name}">${obj.type.name.toUpperCase()}</div>`).join('');
    } catch (err) {
        reset();
        alert("Pokémon not found");
        console.log(`Pokémon not found: ${err}`);
    }
};

const reset = () => {
    const sprite = document.getElementById("sprite");
    if(sprite) sprite.remove();

    character.textContent = "";
    id.textContent = "";
    types.innerHTML = "";
    height.textContent = "";
    weight.textContent = '';
    hp.textContent = '';
    attack.textContent = '';
    defense.textContent = '';
    spAttack.textContent = '';
    spDefense.textContent = '';
    speed.textContent = '';
}

searchButton.addEventListener("click", () => {
    getPokemon(input.value);
    input.value = "";
});

input.addEventListener("keydown", e => {
    if(e.key === "Enter"){
        getPokemon(input.value);
        input.value = "";  
    }
})