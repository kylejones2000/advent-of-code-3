import fs from 'fs';

const convertLowerCaseCharToPriority = (char) => char.charCodeAt(0) - 96;
const convertUpperCaseCharToPriority = (char) => char.charCodeAt(0) - 38;
const divideIntoTwo = (str) => {
    return {
        first: str.substring(0, str.length / 2),
        second: str.substring(str.length / 2)
    };
}

const findTheRepeater = (collection) => {
    const dividedString = divideIntoTwo(collection);
    const referenceString = new Set([...dividedString.first]);

    for (const c of [...dividedString.second]) {
        if (referenceString.has(c)) {
            return c;
        }
    }
}

const calculateCasePriority = (repeater) => {
    return repeater.toUpperCase() === repeater ?
        convertUpperCaseCharToPriority(repeater) :
        convertLowerCaseCharToPriority(repeater);
}

const findTheSum = (inputLines) => {
    return inputLines.reduce((acc, curr) => {
        const repeater = findTheRepeater(curr);
        return acc + calculateCasePriority(repeater);
    }, 0);
}

const calculateGroupSum = (slices) => {
    const charSlices = slices.map(slice => [...slice]);
    const result = charSlices.shift().reduce(function(res, v) {
        if (res.indexOf(v) === -1 && charSlices.every(function(a) {
            return a.indexOf(v) !== -1;
        })) res.push(v);
        return res;
    }, []);
    return calculateCasePriority(result[0]);
}

const data = fs.readFileSync('input.txt', 'UTF-8')
const lines = data.split(/\r?\n/);
const resultPart1 = findTheSum(lines);

console.log(resultPart1);

function calculatePart2(lines) {
    let sum = 0;
    while (lines.length > 0) {
        const slices = lines.splice(0, 3);
        sum = sum + calculateGroupSum(slices)
    }
    return sum;

}
console.log(calculatePart2(lines));