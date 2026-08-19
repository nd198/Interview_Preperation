function findRepeatedChars1(str) {
    const charCount = {};
    const repeated = {};
    
    // Count all characters
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        charCount[char] = (charCount[char] || 0) + 1;
    }
    
    console.log("Object.entries(charCount)====", Object.entries(charCount))
    // // Find characters that appear more than once
    for (const [char, count] of Object.entries(charCount)) {
        if (count > 1) {
            repeated[char] = count;
        }
    }
    
    return repeated;
}


// const testStrings = [
//     "AABBCCCDD",
//     "hello world",
//     "javascript",
//     "programming",
//     "abcdef",     // no repeats
//     "aabbccddee", // all repeats
//     "abcabc",     // multiple repeats
//     ""            // empty string
// ];

let str = 'hello world';
console.log("final string", findRepeatedChars1(str))