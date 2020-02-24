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


function createSecretWord() {
    const secretWord = 'accomplishment'; // take word from array
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

    shuffleArray(allLetters); // mixed letters array, (add more random letters)


    /*     let arrayNoDup = [...new Set(mixedArray)] // array of no duplicates

        let removed = allLetters.filter(val => !arrayNoDup.includes(val)); // isimtos raides kurias turi paduotas zodis
        console.log(removed.concat(arrayNoDup).sort())
     */



    for (let i = 0; i < allLetters.length; i++) {
        const button = document.createElement('button');
        let letter = allLetters[i]
        button.textContent = letter;
        button.addEventListener('click', () => {

            button.classList.add('touched')
            if (fullWordArray.indexOf(letter) == -1) {
                console.log('remove heart') // add red backround
            } else {
                for (let i = 0; i < fullWordArrayUntouched.length; i++) {
                    if (letter == fullWordArrayUntouched[i]) {
                        let element = document.getElementsByTagName('span')[i];
                        element.classList.remove('hidden')
                            // add green background
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
    const element = document.querySelector('.life');
    element.remove;
}


createSecretWord() // auto start