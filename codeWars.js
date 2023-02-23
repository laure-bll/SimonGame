/**
 * https://www.codewars.com/kata/57fe864854685b1c420002e0
 * result shoud be : ['geko', 'octopus', 'iguana', 'eagle', 'rattlesnake']
 * or : ['jaguar', 'kangaroo', 'camel', 'ostrich', 'deer'].
 */
const sortingArrays = () => {
    // const a1 = ['giraffe', 'orangutan', 'impala', 'elephant', 'rhino'];
    // const a2 = ['rattlesnake', 'eagle', 'geko', 'iguana', 'octopus'];

    const a1 = ['jellyfish', 'koi', 'caribou', 'owl', 'dolphin'];
    const a2 = ['ostrich', 'jaguar', 'deer', 'camel', 'kangaroo'];

    const sorting = a1.map(word => {
        const firstLetter = word.charAt();
        const indexWordOfTheSameFirstLetter = a2.find(w => w.charAt() === firstLetter);
        return indexWordOfTheSameFirstLetter;
    })

    console.log(sorting);
}

/**
 * https://www.codewars.com/kata/582c81d982a0a65424000201/train/javascript
 * sort([1, 2, 3, 4, 5], [0, 2, 1, 4, 3]), [1, 3, 2, 5, 4]
 */
const sortingArraysAccordingToTheIndexes = () => {}

/**
 * https://www.codewars.com/kata/582c81d982a0a65424000201/train/javascript
 * /

/**
 * https://www.codewars.com/kata/57a6633153ba33189e000074/train/javascript
 */
const orderedCountReRefacto = function (text) {
    const splittedText = Array.from(text);
    const letters = Array.from(new Set(splittedText));
    return letters.map(letter => [letter, splittedText.reduce((accu, curr) => curr === letter ? accu+1 : accu, init = 0)]);
}

const orderedCountRefacto = function (text) {
    const splittedText = Array.from(text);
    const characters = [];
    splittedText.forEach(char => !characters.includes(char) && characters.push(char));
    return characters.map(character => [character, splittedText.filter(char => char === character).length]);
}
  
const orderedCountDraft = function (text) {
    const characters = text.split("");
    const removedLetters = [];
    const result = [];

    characters.forEach(character => {
        if(!removedLetters.includes(character)) {
            result.push([character, characters.filter(char => char === character).length])
            removedLetters.push(character);
        }
    })

    return result;
}


/**
 * https://www.codewars.com/kata/coding-meetup-number-1-higher-order-functions-series-count-the-number-of-javascript-developers-coming-from-europe
 */
const countDevelopers = (list) => {
    return list.filter(item => item.continent === "Europe" && item.language === "JavaScript").length;
}

/**
 * https://www.codewars.com/kata/58279e13c983ca4a2a00002a/train/javascript
 */
function greetDevelopers(list) {
    return list.map(developer => ({
        ...developer,
        greeting: "Hi " + developer.firstName + ", what do you like the most about " + developer.language + "?"
    }))
}

/**
 * https://www.codewars.com/kata/5827acd5f524dd029d0005a4/train/javascript.
 * La méthode some() teste si au moins un élément du tableau passe le test implémenté par la fonction fournie. Elle renvoie un booléen indiquant le résultat du test.
 */
function isRubyComing(list) {
    return list.some(dev => dev.language === "Ruby")
}

/**
 * https://www.codewars.com/kata/5827bc50f524dd029d0005f2/train/javascript
 */
function getFirstPython(list) {
    const firstPythonDev = list.find(dev => dev.language === "Python");
    return firstPythonDev ? `${firstPythonDev.firstName}, ${firstPythonDev.country}` : "There will be no Python developers";
}

/**
 * https://www.codewars.com/kata/5827bc50f524dd029d0005f2/train/javascript
 */

function getFirstPython(list) {
    const firstPythonDev = list.find(dev => dev.language === "Python");
    return firstPythonDev ? `${firstPythonDev.firstName}, ${firstPythonDev.country}` : "There will be no Python developers";
}

const getFirstPythonWithReduceRefacto = (list) => {
    const firstPythonDev = list.reduce((accu, dev) => {
      if (accu) return accu;
      if (dev.language === "Python") return `${dev.firstName}, ${dev.country}`;
    }, init = undefined);
      
    return firstPythonDev ?? "There will be no Python developers";
  }

function getFirstPythonWithReduce(list) {
    const firstPythonDev = list.reduce((accu, dev) => {    
      if (dev.language === "Python" && accu === undefined) {
        accu = dev;
      }
      
      return accu;
      
    }, init = undefined);
      
    return firstPythonDev ? `${firstPythonDev.firstName}, ${firstPythonDev.country}` : "There will be no Python developers";
}

/**
 * https://www.codewars.com/kata/5828713ed04efde70e000346/train/javascript
 */
function countLanguages(list) {
    // Solution peu adaptée niveau performances.
    const languages = new Set(list.map(dev => dev.language));
    const listing = {};
    // Le foreach fonctionne sur un objet, contrairement au map qui fonctionne uniquement avec les tableaux.
    languages.forEach(language => Object.assign(listing, { [language]: list.filter(dev => language === dev.language).length}));
    return listing;
}

/**
 * https://www.codewars.com/kata/58287977ef8d4451f90001a0/train/javascript
 */
function isSameLanguage(list) {
    const language = [...list].shift().language;
    return list.every(dev => dev.language === language);
}

/**
 * https://www.codewars.com/kata/5266876b8f4bf2da9b000362/train/javascript
 * // ! \\ DIFFERENT KATA
 */
function likes(names) {
    switch (names.length) {
      case 0:
          return "no one likes this"
      case 1:
          return `${names[0]} likes this`
      case 2:
          return `${names.join(" and ")} like this`
      case 3:
         return `${names[0]}, ${names[1]} and ${names[2]} like this`
      default:
          return `${names[0]}, ${names[1]} and ${names.length - 2} others like this`
    }
  }

/**
 * https://www.codewars.com/kata/582887f7d04efdaae3000090/train/javascript
 */
function findSenior(list) {
    const ages = list.map(dev => dev.age);
    return list.filter(dev => dev.age === Math.max(...ages));
}

/**
 * https://www.codewars.com/kata/58291fea7ff3f640980000f9/train/javascript
 */
function allContinents(list) {
    const expectedContinents = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
    const continents = list.map(dev => dev.continent);
    const res = expectedContinents.map(continent => continents.includes(continent));
    return !res.includes(false);
}

/**
 * https://www.codewars.com/kata/5829ca646d02cd1a65000284/train/javascript
 */
function isAgeDiverseRefacto(list) {
    const ranges = [0, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    const ages = list.map(dev => dev.age);
      
    return ranges.every((range, i) =>  i === (ranges.length - 1) 
        ? ages.find(age => age >= range) 
        : ages.find(age => age >= range && age < ranges[i+1]));
  }

function isAgeDiverse(list) {
    const ranges = [0, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    const ages = list.map(dev => dev.age);
    
    const res = ranges.map((range, index) => {
      if(index !== ranges.length - 1) {  
        return ages.find(age => age >= range && age < ranges[index+1]);
      }

        return ages.find(age => age >= range);
    });
    
    return !res.includes(undefined);
  }

/**
 * https://www.codewars.com/kata/582a53ed261c2af9d200018c/train/javascript
 */
function addUsername(list) {
    return list.map(dev => ({
      ...dev,
      username: `${dev.firstName.toLowerCase()}${dev.lastName.charAt().toLowerCase()}${(new Date().getFullYear()) - dev.age}`
    }))
}

/**
 * https://www.codewars.com/kata/582ba36cc1901399a70005fc/train/javascript
 */
function getAverageAge(list) {
    const ages = list.map(dev => dev.age);
    return Math.round(ages.reduce((accu, age) => accu + age, 0) / list.length);
}

/**
 * https://www.codewars.com/kata/582dace555a1f4d859000058/train/javascript
 */
function findAdmin(list, lang) {
    return list.filter(dev => dev.language === lang && dev.githubAdmin === "yes");
}

/**
 * https://www.codewars.com/kata/58381907f8ac48ae070000de/train/javascript
 */
function isLanguageDiverse(list) {
    const languages = Array.from(new Set(list.map(dev => dev.language)));
    
    const sorting = languages.map(lang => list.reduce((accu, dev) => dev.language === lang ? accu + 1 : accu, 0));
    const max = Math.max(...sorting);
    const min = Math.min(...sorting);
      
    return max <= (min * 2);
}

function isLanguageDiverseCorrection(list) {
    const languages = list.reduce((accu, dev) => ({
        ...accu,
        [dev.language]: dev.language in accu ? accu[dev.language]+1 : 1
      }), {});
    
    const count = Object.values(languages);
    return  Math.max(...count) <= (Math.min(...count) * 2);
  }

/**
 * https://www.codewars.com/kata/583952fbc23341c7180002fd/train/javascript
 */
function orderFood(list) {
    const foodOptions = Array.from(new Set(list.map(dev => dev.meal)));
    const res = {};

    foodOptions.forEach(option => res[option] = list.filter(dev => dev.meal === option).length);
    return res;
}

function orderFoodWithReduceRefacto(list) {  
    return list.reduce((accu, dev) => ({
      ...accu,
      [dev.meal]: accu[dev.meal] ? accu[dev.meal] +1 : 1
    }), {});
  }

function orderFoodWithReduce(list) {
    const foodOptions = Array.from(new Set(list.map(dev => dev.meal)));
    
    const res = {};
    
    foodOptions.forEach(option => res[option] = list.reduce((accu, dev) => dev.meal === option ? accu + 1 : accu, 0));
    
    return res;
}

/**
 * https://www.codewars.com/kata/583a8bde28019d615a000035/train/javascript
 */
function findOddNames(list) {
    return list.filter(dev => (dev.firstName.split("").reduce((accu, letter) => accu + letter.charCodeAt(0), 0)) % 2)
}

/**
 * https://www.codewars.com/kata/583d972b8bbc0402cf000121/train/javascript
 */

function askForMissingDetails(list) {
    const missingDetails = list.map(dev => {
      let nullProperty = undefined;
      
      for(const property in dev) {
        if (dev[property] === null) {
          nullProperty = property;
        }
      }
  
      return nullProperty ? {
        ...dev,
        question: `Hi, could you please provide your ${nullProperty}.`
      } : undefined;
    });
    
    return missingDetails.filter(detail => detail !== undefined);
}

/**
 * https://www.codewars.com/kata/583ea278c68d96a5fd000abd/train/javascript
 */
function sortByLanguageRefacto(list) {
    return list.sort((a, b) => {
      return a.language === b.language 
        ? a.firstName.localeCompare(b.firstName)
        : a.language.localeCompare(b.language)
    })
}

function sortByLanguageCorrection(list) {
    // Trier d'abord par prénom puis trier par langage (puisque l'ordre est conservé).
    return list.sort((a, b) => a.firstName.localeCompare(b.firstName))
    .sort((a, b) => a.language.localeCompare(b.language))
}