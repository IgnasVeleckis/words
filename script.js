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
    })
}




fetchPokemon()


function createSecretWord(name) {
    const heartContainer = document.querySelector('.life');
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
                animation('display', 'wiggle')
            } else {
                for (let i = 0; i < fullWordArrayUntouched.length; i++) {
                    if (letter == fullWordArrayUntouched[i]) {
                        let element = document.getElementsByTagName('span')[i];
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
    const heartContainer = document.querySelector('.life');
    heartContainer.innerHTML = removed

    if (removed == 0) {
        endTable()
    } else {
        removed--
    }
}

function endTable() {
    document.querySelector('.end').classList.remove('hidden');
}


function animation(domElement, animation) {
    const element = document.querySelector(`.${domElement}`);
    element.classList.add(`${animation}`)
    setTimeout((() => {
        element.classList.remove(`${animation}`)
    }), 500)
}