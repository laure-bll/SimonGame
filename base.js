const helloWorld = "Hello world!";
const typeOfMyString = typeof helloWorld;
const age = 34;
const average = 34.2;
const result = average - age;

// __________________________________ \\

const floatNumber = 3.9;

const fewJSFunctions = ({
    floor: Math.floor(floatNumber),
    ceil: Math.ceil(floatNumber),
    round: Math.round(floatNumber),
    random: Math.random(),
    min: Math.min(1, 9, 7, 12, 3),
    max: Math.max(1, 9, 7, 12, 3),
    pow: Math.pow(floatNumber, 2),
    power: floatNumber ** 2,
    toFixed: floatNumber.toFixed(2),
    length: helloWorld.length,
    charAt: helloWorld.charAt(3),
    indexOf: helloWorld.indexOf("ll"),
    repeat: helloWorld.repeat(4),
    trim: " Too much spaces ".trim()
});

const egal = ({
    "3 =='3' ? ": 3 == '3',
    "3 ==='3' ? ": 3 === '3',
    "null =='undefined' ? ": null == 'undefined',
    "null ==='undefined' ? ": null === 'undefined',
});


const sayHello = (language) => {
    const hello = {
        spanish: "Hola, mundo!",
        french: "Bonjour, tout le monde!",
        english: "Hello, world!",
    }

    return hello[language];
}

const count = () => {
    let i = 0;

    while(i <= 30) {
        switch (i) {
            case 10:
                console.log("ten");
                i++;
                break;
            case 20:
                console.log("twenty");
                i++
                break;
            case 30:
                console.log("thirty");
                i++
                break;
            default:
                console.log(i);
                i++
                break;
        }
    }
}

const forOf = (str = "abcdef") => {
    for  (let c of str) {
        console.log(c);
    }
}

const forIn = (str = "abcdef") => {
    for(let c in str) {
        console.log(c);
    }
}

const oddOrEven = () => {
    for (let i = 1; i <= 20; i++) {
        console.log(`${i} is ${i % 2 ? "odd" : "even"}.`);
    }
}

const lorem = "Lorem Ipsum is simply dummy text of the printing and typesetting etindustry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

const countWords = () => {
    let split = lorem.replaceAll(".", "");
    split = split.replaceAll(",", "");
    const count = split.split(" ").length;
    console.log(count);
}

const countEt = () => {
    const characters = lorem.split("");
    const arrayOfEt = characters.filter((letter, index, currentArray) => letter === "e" && currentArray[index+1] === "t");
    console.log(arrayOfEt.length);
}

const palindromes = () => {
    const sentences = [
        "A man, a plan, a canal, Panama!",
        "Amor, Roma",
        "race car",
        "stack cats",
        "step on no pets",
        "taco cat",
        "put it up"
    ];

    const sentencesSecnetnes = sentences.map(sentence => {
        const cleanSentence = sentence.replaceAll(" ", "").replaceAll(",", "").replaceAll("!", "").toLowerCase();
        const isPalindrome = cleanSentence == cleanSentence.split("").reverse().join("");

        return isPalindrome
        ? cleanSentence + " " + cleanSentence.split("").reverse().join("") + " est un palindrome" 
        :  cleanSentence + " " + cleanSentence.split("").reverse().join("") + " n'est pas un palindrome";
    });

    console.log(sentencesSecnetnes);
}

const maxOfTwoNumbers = ($x = 3, $y = 6) => console.log(Math.max($x, $y));

const food = ["test", "testi", "testa"];
food[58] = "testinou";


const printStars = () => {
    const stars = [1,2,3,4,5];
    stars.forEach((star, index) => console.log(" ".repeat(stars.length - index) + "*".repeat(star)))
}

const findLongestWord = () => {
    const words = ['machine', 'subset', 'trouble', 'starting', 'matter', 'eating', 'truth', 'disobedience'];

    const wordsLenght = words.map(word => ++word.split("").length);
    const maxLongestWordLength = Math.max(...wordsLenght);
    const indexMaxLongestWord = wordsLenght.indexOf(maxLongestWordLength);
    const maxLongestWord = words[indexMaxLongestWord];
    console.log(maxLongestWord);
}

const sumNumbers = () => {
    const numbers = [6, 12, 1, 18, 13, 16, 2, 1, 8, 19];
    const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, initialValue = 0);
    console.log(sum)
}

const avg = (mixedArr = [6, 12, "miami", 1, true, "barca", "200", "lisboa", 8, 10]) => {
    const sum = mixedArr.reduce((accumulator, currentValue) => {
        if(typeof currentValue === "boolean") {
            return accumulator + !!currentValue;
        }
        else if (typeof currentValue === "string") {
            return accumulator + currentValue.length;
        }
        else if (typeof currentValue === "number" ) {
            return accumulator + currentValue;
        }
    }, initialValue = 0);

    const average = sum / mixedArr.length;
    console.log(average);
}