import dict from "./dictionary.js";
import { numbers, letters, tld } from "./dicts.js";

const createLink = () => {
    const randomNumber = Math.floor(Math.random() * 1000000);
    const randomLetters = letters[Math.floor(Math.random() * letters.length)];
    const useHyphen = Math.random() < 0.2;
    const separator = useHyphen ? "-" : "";

    const linkTypeRandomizer = Math.floor(Math.random() * 5);
    let random_link;

    switch(linkTypeRandomizer) {
        case 0: // Numbers only
            random_link = `${randomNumber}.${tld[Math.floor(Math.random() * tld.length)]}`;
            break;
        case 1: // Letters only
            random_link = `${randomLetters}.${tld[Math.floor(Math.random() * tld.length)]}`;
            break;
        case 2: // Words from dictionary
            let randomWord;
            do {
                randomWord = dict[Math.floor(Math.random() * dict.length)];
            } while (numbers.includes(randomWord) || letters.includes(randomWord));
            
            // Randomly decide to add numbers to the word
            const addNumbers = Math.random() < 0.5;
            if (addNumbers) {
                random_link = `${randomWord}${separator}${randomNumber}.${tld[Math.floor(Math.random() * tld.length)]}`;
            } else {
                random_link = `${randomWord}.${tld[Math.floor(Math.random() * tld.length)]}`;
            }
            break;
        case 3: { // Multiple words
            const numWords = Math.floor(Math.random() * 3) + 2; // 2-4 words
            const useHyphen = Math.random() < 0.5;
            let words = [];
            for (let i = 0; i < numWords; i++) {
                let word;
                do {
                    word = dict[Math.floor(Math.random() * dict.length)];
                } while (numbers.includes(word) || letters.includes(word));
                words.push(word);
            }
            const joined = words.join(useHyphen ? '-' : '');
            random_link = `${joined}.${tld[Math.floor(Math.random() * tld.length)]}`;
            break;
        }
        case 4: { // Random letters
            const length = Math.floor(Math.random() * 15) + 1; // 1-15 random letters
            let randomString = '';
            for (let i = 0; i < length; i++) {
                randomString += letters[Math.floor(Math.random() * letters.length)];
            }
            random_link = `${randomString}.${tld[Math.floor(Math.random() * tld.length)]}`;
            break;
        }
    }

    return random_link;
}

const generateLinks = () => {
    const site = document.getElementById("site");
    const dupe_check_array = new Set();
    let duplicates = 0;

    for (let i = 0; i < 10000; i++) {
        const link = document.createElement("a");
        const randomLink = createLink();
        
        if (dupe_check_array.has(randomLink)) {
            duplicates++;
            continue;
        }
        
        dupe_check_array.add(randomLink);
        link.href = `https://${randomLink}`;
        link.textContent = randomLink;
        site.appendChild(link);
    }
    
    const duplicatesElement = document.getElementById("duplicates");
    if (duplicatesElement) {
        duplicatesElement.textContent = duplicates;
    }
}


document.addEventListener("DOMContentLoaded", generateLinks);
