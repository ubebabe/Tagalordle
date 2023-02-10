import engWordBank from "./eng-words.txt";

export const boardDefault = [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
]

export const generateWordSet = async () => {
    let wordSet;
    let todaysWord;
        await fetch(engWordBank)
        .then((response) => response.text())
        .then ((result) => {
            // turns txt file into an array
            const wordArr = result.split("\n")
            todaysWord = wordArr[Math.floor(Math.random() * wordArr.length)]
            console.log(todaysWord);
            wordSet = new Set(wordArr)
        })

        return {wordSet, todaysWord}

}