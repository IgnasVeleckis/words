let allLetters = [
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

let withoutName = [];
let name;
let poke_pic;
let removed = 4;
let game_mode;
let word = [];



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


const createSecretWord = (name) => {
    const heartContainer = document.querySelector('.live');

    if (game_mode == 1) {
        removed = 6
    } else if (game_mode == 2) {
        removed = 4
    } else if (game_mode == 3) {
        removed = 999 // 2
    }

    heartContainer.innerHTML = removed + 1

    document.querySelector('.end').classList.add('hidden');

    const secretWord = name;
    const fullWordArray = secretWord.split('');

    const containerLetter = document.querySelector('.letters');
    const containerDisplay = document.querySelector('.display_container');

    for (let i = 0; i < fullWordArray.length; i++) {
        const span = document.createElement('span');
        span.textContent = fullWordArray[i];
        span.classList.add('hidden')
        containerDisplay.appendChild(span)
    }

    for (var i = 0; i < allLetters.length; i++) {
        if (fullWordArray.indexOf(allLetters[i]) === -1) {
            withoutName.push(allLetters[i]);
        }
    }

    withoutName.pop()
    withoutName.pop()

    withoutName = withoutName.concat(fullWordArray)

    const newSet = new Set(withoutName)
    const newArray = [...newSet]
    allLetters = newArray

    shuffleArray(allLetters);

    const display = document.querySelector('.display_container')
    const units = display.children;

    for (let i = 0; i < fullWordArray.length; i++) {
        word.push(units[i].classList)
    }

    for (let letters in allLetters) {
        const button = document.createElement('button');
        let letter = allLetters[letters]
        button.textContent = letter;
        let value = button.value
        value = 0;
        button.addEventListener('click', () => {
            value++
            button.classList.add('green')

            if (fullWordArray.indexOf(letter) == -1) {
                button.classList.add(`${letter}`)
                removeHeart()
                const letterBtn = document.querySelector(`.${letter}`)
                letterBtn.parentNode.removeChild(letterBtn)
                animation('display_container', 'wiggle', 500)
            } else {
                if (value === 1) {
                    for (let i = 0; i < fullWordArray.length; i++) {
                        if (letter == fullWordArray[i]) {
                            let element = document.getElementsByTagName('span')[i + 1];
                            element.classList.remove('hidden')
                            word.pop()

                            if (word.length == 0) {
                                win(fullWordArray.join(''), poke_pic)
                                setTimeout(() => {
                                    win()
                                }, 10000)
                            }

                        }
                    }
                }
            }
        })
        containerLetter.appendChild(button)
    }
}

const shuffleArray = (array) => {
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

const removeHeart = () => {
    const heartContainer = document.querySelector('.live');
    heartContainer.innerHTML = removed
    if (removed == 0) {
        endTable()
    } else {
        removed--
    }
}

const endTable = (val) => {
    if (val) {
        document.querySelector('.end').classList.add('hidden');
    } else {
        document.querySelector('.end').classList.remove('hidden');
    }
}

const animation = (domElement, animation, timeout) => {
    const element = document.querySelector(`.${domElement}`);
    element.classList.add(`${animation}`)
    setTimeout((() => {
        element.classList.remove(`${animation}`)
    }), timeout)
}

const loading = (val) => {
    const load = document.querySelector('.load')
    if (val) {
        load.classList.add('show')
    } else {
        load.classList.remove('show')
    }
}

const win = (name, img) => {

    const image = img
    if (name) {
        console.log('hello')
        const container = document.createElement('div')
        const div = document.createElement('div')
        const divImg = document.createElement('img')
        divImg.src = image
        container.classList.add('win')
        div.classList.add('win_win')
        div.textContent = `${name}`
        container.classList.add('show')
        container.appendChild(divImg)
        container.appendChild(div)
        document.body.appendChild(container)
        animation('win_win', 'zoom_in_out', 5000)
    } else {
        const containerr = document.querySelector('.win')
        document.body.removeChild(containerr)
    }
    reset()
}

const reset = () => {
    const startContainer = document.querySelector('.difficulty')
    const display = document.querySelector('.display_container')
    const letters = document.querySelector('.letters')
    startContainer.classList.remove('hide')
    display.innerHTML = ''
    letters.innerHTML = ''
    endTable(1)
    diff()
}