const allLetters = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z'
]

var name;
var poke_pic;
var removed = 4;
var game_mode;



const diff = (difficulty) => {
    if (difficulty) {
        const startContainer = document.querySelector('.difficulty')
        startContainer.classList.add('hide')
        game_mode = difficulty
        fetchPokemon()
        loading(1)
    }
}

const fetchPokemon = () => {

    const promises = []
    for (let i = 1; i <= 400; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }

    Promise.all(promises).then(results => {
        const pokemon = results.map((data) => ({
            name: data.name,
            image: data.sprites['front_default']
        }))
        let random = Math.floor(Math.random() * 400)
        name = pokemon[random].name
        poke_pic = pokemon[random].image
        const pictureContainer = document.getElementById('poke_image');
        pictureContainer.src = poke_pic
        createSecretWord(name)
        loading()
    })
}

function createSecretWord(name) {
    const heartContainer = document.querySelector('.live');
    if (game_mode == 1) {
        console.log('game mode: ' + game_mode)
        removed = 6
    } else if (game_mode == 2) {
        removed = 4
        console.log('game mode: ' + game_mode)
    } else if (game_mode == 3) {
        console.log('game mode: ' + game_mode)
        removed = 999 // 2
    }
    heartContainer.innerHTML = removed + 1

    document.querySelector('.end').classList.add('hidden');

    const secretWord = name;
    const fullWordArray = secretWord.split('');
    const fullWordArrayUntouched = secretWord.split('');

    const containerLetter = document.querySelector('.letters');
    const containerDisplay = document.querySelector('.display');

    for (let i = 0; i < fullWordArray.length; i++) { // creating hidden word 
        const span = document.createElement('span');
        span.textContent = fullWordArray[i];
        span.classList.add('hidden')
        containerDisplay.appendChild(span)
    }

    shuffleArray(allLetters);

    for (let i = 0; i < allLetters.length; i++) {
        const button = document.createElement('button');
        let letter = allLetters[i]
        button.textContent = letter;
        button.addEventListener('click', () => {
            button.classList.add('green')
            if (fullWordArray.indexOf(letter) == -1) {
                button.classList.add(`${letter}`)
                removeHeart()
                const letterBtn = document.querySelector(`.${letter}`)
                letterBtn.parentNode.removeChild(letterBtn)
                animation('display', 'wiggle', 500)
            } else {
                for (let i = 0; i < fullWordArrayUntouched.length; i++) {
                    if (letter == fullWordArrayUntouched[i]) {
                        let element = document.getElementsByTagName('span')[i + 1];
                        element.classList.remove('hidden')
                    }
                }
            }
        })
        containerLetter.appendChild(button)
    }
}

function shuffleArray(array) {
    let currentIndex = array.length,
        temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}



function removeHeart() {
    const heartContainer = document.querySelector('.live');
    heartContainer.innerHTML = removed
    if (removed == 0) {
        endTable()
    } else {
        removed--
    }
}

function endTable(val) {
    if (val) {
        document.querySelector('.end').classList.add('hidden');
    } else {
        document.querySelector('.end').classList.remove('hidden');
    }
}


function animation(domElement, animation, timeout) {
    const element = document.querySelector(`.${domElement}`);
    element.classList.add(`${animation}`)
    setTimeout((() => {
        element.classList.remove(`${animation}`)
    }), timeout)
}



function loading(val) {
    const load = document.querySelector('.load')
    if (val) {
        load.classList.add('show')
    } else {
        load.classList.remove('show')
    }
}


function win() {

}

function reset() {

    const startContainer = document.querySelector('.difficulty')
    const display = document.querySelector('.display')
    const letters = document.querySelector('.letters')
    startContainer.classList.remove('hide')
    display.innerHTML = ''
    letters.innerHTML = ''
    endTable(1)
    diff()
}