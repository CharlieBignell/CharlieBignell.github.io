let words = [] //Max of 7S
let plans = []
let dayMsg = ""

let date = new Date().getDate()

document.body.style.height = `${window.innerHeight}px`

switch(date){
    case 14:
        words = [
            "DRIVER", 
            "BAKER", 
            "SHACK"
        ] 
        plans = [
            "You knew this was coming at some point... time for Topgolf!", 
            "YAY TYME 2 COOK DA CAK NOMS LUV JANE XOX", 
            "#GOLFDAY! At 17:30 we'll have plays and noms at Puttshack!"
        ]
        dayMsg = "DAY OF GOLF! Topgolf, then break in the afternoon where Charl goes for a haircut, then Puttshack in the evening!"
        break;
    case 15:
        words = [
            "COFFEE", 
            "STOLEN", 
            "POTION", 
            "WITCH"
        ] 
        plans = [
            "We're gonna start the day off with brunch at Starbucks at around 11",
            "Time to go look at all the stuff we've stolen! We'll go look around the British Museum at 12",
            "Fun drinks and noms! We're having early tea at The Alchemist at 16:30",
            "You knew this was coming... we're going to see Wicked at 19:30!"
        ]
        dayMsg = "It's the London day! Brunch at Starbucks before British museum, we have up to 4h here but we can always go to Alchemist early for drinks. Then fun noms, followed by Wicked! Yay fun yay!"
        break;
    case 16:
        words = [
            "PRETZEL", 
            "FAMILY", 
            "ORDER", 
            "PRESENT"
        ] 
        plans = [
            "More baking, this time - pretzels!",
            "Then we're going to visit Jessica and Martin at theirs! We'll watch Quali there too.",
            "Taki taki roomba! Takeaway tea of your choice.",
            "Early present!! This will go with our evening activity (just FYI, the present is exciting but the activity isn't lol)"
        ]
        dayMsg = "We'll have cinnamon rolls for breakfast, then bake pretzels to take to Jess and Martins. Then back here for takeaway and an early birthday present!"
        break;    
}

currentWord_n = 0
let word = words[currentWord_n]
let plan = plans[currentWord_n]

const gap = 6
const padding = 30
const rootContainer = document.getElementById("container")

let letterSize = 10 - word.length

let windowWidth = window.innerWidth - (word.length - 1) * gap - padding * 2
let boxWidth = windowWidth / word.length
let keyWidth = windowWidth / 10

keyboardItems = "QWERTYUIOPASDFGHJKLZXCVBNM"

let bottomRow = document.getElementById("bottomRow")

let currentGuess_no = 0
let currentGuess_word = ""
let guessed = false

function getStatus(letter, i) {
    output = "incorrect"
    if (word[i] == letter) {
        output = "correct"
    } else if (word.includes(letter)) {
        output = "partial"
    }
    return output
}

function generateLetter() {
    let letterSquare = document.createElement("div")
    letterSquare.classList.add("letter", "empty")
    letterSquare.style.width = `${boxWidth}px`
    letterSquare.style.height = `${boxWidth}px`
    return letterSquare
}

function generateKey(letter) {
    let keyContainer = document.createElement("div")
    
    keyContainer.id = letter

    let keyLetter = document.createElement("p")
    keyLetter.innerHTML = letter
    keyContainer.appendChild(keyLetter)

    keyContainer.classList.add("keyContainer")
    keyContainer.style.width = `${keyWidth}px`
    keyContainer.style.height = `${keyWidth * 1.7}px`
    keyContainer.addEventListener("click", function () { clickLetter(letter) });

    return keyContainer
}

async function clickLetter(letter) {
    if (!guessed) {
        if (letter == "ENTER") {
            if (currentGuess_word.length == word.length) {
                scoreGuess()
                await new Promise(r => setTimeout(r, 400 * word.length));
                if (currentGuess_no < word.length && !guessed) {
                    currentGuess_word = ""
                    currentGuess_no += 1
                    document.getElementById(`guess_${currentGuess_no}`).style.display = "flex"
                } else if(guessed){
                    complete()
                }
            }
        } else if (letter == "<") {
            currentGuess_word = currentGuess_word.substring(0, currentGuess_word.length - 1)
            updateDisplay(currentGuess_word.length + 1)
        } else {
            if (currentGuess_word.length < word.length) {
                currentGuess_word += letter
            }
            updateDisplay(currentGuess_word.length)
        }
    }

}

async function complete() {
    correct_letters = document.getElementById(`guess_${currentGuess_no}`).children
    for (let i = 0; i < word.length; i++) {
        correct_letters[i].classList.add("completeAnimation")
        correct_letters[i].classList.add("bounce-1")
        await new Promise(r => setTimeout(r, 150));
    }
    await new Promise(r => setTimeout(r, 700));
    formatPopup()
}

function formatPopup() {
    document.getElementById("overlay").style.visibility = "visible"
    document.getElementById("planText").innerHTML = plan
}

function nextWord() {
    document.getElementById("overlay").style.visibility = "hidden"

    while (rootContainer.firstChild) {
        rootContainer.removeChild(rootContainer.lastChild);

    }

    currentGuess_word = ""
    guessed = false
    currentWord_n++
    currentGuess_no = 0

    word = words[currentWord_n]
    plan = plans[currentWord_n]

    for(let i = 0; i < 26; i++){
        letter_i = keyboardItems[i]
        document.getElementById(letter_i).classList.remove("incorrect_key")
        document.getElementById(letter_i).classList.remove("correct_key")

    }
    setup()

}

function updateDisplay(end) {
    let guessWord = Array.from(document.getElementById(`guess_${currentGuess_no}`).childNodes)

    for (let i = 0; i < end; i++) {

        // If the letter exists, remove it
        if (guessWord[i].firstChild) {
            guessWord[i].removeChild(guessWord[i].firstElementChild)
        }

        let letter = document.createElement("p")
        letter.style.fontSize = `${letterSize}vh`

        if (i >= currentGuess_word.length) {
            letter.innerHTML = ""
            guessWord[i].classList.remove("filled")
            guessWord[i].classList.add("empty")
        } else {
            letter.innerHTML = currentGuess_word[i]
            guessWord[i].classList.remove("empty")
            guessWord[i].classList.add("filled")
        }

        guessWord[i].appendChild(letter)
    }
}

async function scoreGuess() {
    let guessWord = Array.from(document.getElementById(`guess_${currentGuess_no}`).childNodes)

    for (let i = 0; i < word.length; i++) {
        guess = guessWord[i].firstChild.innerHTML
        guessWord[i].classList.remove("filled")
        guessLetter = document.getElementById(guessWord[i].firstChild.innerHTML)

        if (guess == word[i]) {
            // Correct
            guessWord[i].classList.add("correct")
            guessLetter.classList.remove("partial_key")
            guessLetter.classList.add("correct_key")
        } else if (word.indexOf(guess) > -1) {
            if (gotAllLetters(i, guessWord)) {
                // It's in the word, but they've already got the letter
                guessWord[i].classList.add("incorrect")
                guessLetter.classList.add("incorrect_key")
            } else {
                // It's in the word but not in this position
                guessWord[i].classList.add("partial")
                guessLetter.classList.add("partial_key")
            }
        } else {
            // Incorrect
            guessWord[i].classList.add("incorrect")
            guessLetter.classList.add("incorrect_key")
        }

        await new Promise(r => setTimeout(r, 400));
        if (word == currentGuess_word) {
            guessed = true
        }      
    }


}

function gotAllLetters(i, guessWord) {
    let letter = currentGuess_word[i]
    let correctLetters = ""

    // Get all correct letters
    for (let i = 0; i < word.length; i++) {
        guess = guessWord[i].firstChild.innerHTML

        if (guess == word[i]) {
            correctLetters += currentGuess_word[i]
        }
    }

    n_currentCorrect = correctLetters.split(letter).length - 1
    n_word = word.split(letter).length - 1

    return n_currentCorrect == n_word

}

function setup() {    
    if (word != null) {
        letterSize = 10 - word.length
        windowWidth = window.innerWidth - (word.length - 1) * gap - padding * 2
        boxWidth = windowWidth / word.length
        document.getElementById("keyboard").style.visibility = "visible"
        firstGuess = document.createElement("div")
        firstGuess.id = "guess_0"
        firstGuess.classList.add("word")
        rootContainer.appendChild(firstGuess)

        // For the length of the word
        for (var i = 0; i < word.length; i++) {

            // Add letters to the first div
            document.getElementById("guess_0").appendChild(generateLetter())

            // Create a new word div, as wordlength + 1 is the number of max guesses
            newWord = document.createElement("div")
            newWord.id = `guess_${i + 1}`
            newWord.classList.add("word")
            newWord.style.display = "none"

            // Add letters to the new div
            for (var j = 0; j < word.length; j++) {
                newWord.appendChild(generateLetter())
            }

            // Add the div to the container
            rootContainer.appendChild(newWord)
        }
    }else{
        let msg = document.createElement("p")
        msg.innerHTML = dayMsg
        rootContainer.appendChild(msg)
        document.getElementById("keyboard").style.visibility = "hidden"
    }
}

setup()

// For each letter of the alphabet
for (var i = 0; i < 26; i++) {
    container = generateKey(keyboardItems[i])

    if (i < 10) {
        document.getElementById("topRow").appendChild(container)
    } else if (i < 19) {
        document.getElementById("middleRow").appendChild(container)
    } else {
        bottomRow.appendChild(container)
    }
}

document.getElementById("close").addEventListener("click", function () { nextWord() });

// Add enter and backspace buttons
let backspace = generateKey("<")
backspace.style.width = `${keyWidth * 1.8}px`

let enter = generateKey("ENTER")
enter.style.width = `${keyWidth * 1.8}px`

bottomRow.appendChild(backspace)
bottomRow.insertBefore(enter, bottomRow.firstChild);
