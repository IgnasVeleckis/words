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
var word = [];



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
    const containerDisplay = document.querySelector('.display_container');

    for (let i = 0; i < fullWordArray.length; i++) { // creating hidden word 
        const span = document.createElement('span');
        span.textContent = fullWordArray[i];
        span.classList.add('hidden')
        containerDisplay.appendChild(span)
    }


    shuffleArray(allLetters);
    const display = document.querySelector('.display_container')
    const units = display.children;
    for (let i = 0; i < fullWordArrayUntouched.length; i++) {
        word.push(units[i].classList)
    }

    for (let i = 0; i < allLetters.length; i++) {
        const button = document.createElement('button');
        let letter = allLetters[i]
        button.textContent = letter;
        let value = button.value
        value = 0

        button.addEventListener('click', () => {
            value++

            button.classList.add('green')

            if (fullWordArray.indexOf(letter) == -1) {
                button.classList.add(`${letter}`)
                removeHeart()
                const letterBtn = document.querySelector(`.${letter}`)
                letterBtn.parentNode.removeChild(letterBtn)
                animation('display', 'wiggle', 500)
            } else {
                if (value == 1) {
                    for (let i = 0; i < fullWordArrayUntouched.length; i++) {
                        if (letter == fullWordArrayUntouched[i]) {
                            let element = document.getElementsByTagName('span')[i + 1];
                            element.classList.remove('hidden')
                            word.pop()
                            if (word.length == 0) {
                                win(1)
                                setTimeout(() => {
                                    win()
                                }, 5000)
                            }

                        }
                    }
                }
            }
        })


        containerLetter.appendChild(button)
    }
}

function removeEvent() {
    console.log('aaa')

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


function win(add) {



    if (add) {
        const container = document.createElement('div')
        const div = document.createElement('div')
        container.classList.add('win')
        div.classList.add('win_win')
        div.textContent = "YOU WIN!!!"
        container.classList.add('show')
        container.appendChild(div)
        document.body.appendChild(container)
        animation('win_win', 'zoom_in_out', 5000)
    } else {
        const containerr = document.querySelector('.win')
        document.body.removeChild(containerr)
        reset()
    }
}

/* win(1)

setTimeout(() => {
    win()
}, 2000) */

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