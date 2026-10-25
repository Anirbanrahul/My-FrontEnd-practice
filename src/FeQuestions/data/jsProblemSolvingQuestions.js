// 27 JS Problem Solving Questions & Code Solutions (from Saikrishna Nangunuri Ebook)

export const JS_PROBLEM_SOLVING_QUESTIONS = [
  {
    id: 'jsp-1',
    section: 'js-problem-solving',
    number: 1,
    question: 'Write a program to remove duplicates from an array (2 ways).',
    answer: `**Way 1 (indexOf)**:
\`\`\`javascript
const removeDuplicates = (arr) => arr.filter((item, index) => arr.indexOf(item) === index);
\`\`\`
**Way 2 (Set)**:
\`\`\`javascript
const removeDuplicates = (arr) => [...new Set(arr)];
\`\`\``
  },
  {
    id: 'jsp-2',
    section: 'jsp-2',
    number: 2,
    question: 'Write a JavaScript function that takes an array of numbers and returns a new array with only the even numbers.',
    answer: `\`\`\`javascript
function findEvenNumbers(arr) {
  return arr.filter(num => num % 2 === 0);
}
\`\`\``
  },
  {
    id: 'jsp-3',
    section: 'js-problem-solving',
    number: 3,
    question: 'How to check whether a string is palindrome or not?',
    answer: `\`\`\`javascript
const checkPalindrome = (str) => {
  const len = str.length;
  for (let i = 0; i < len / 2; i++) {
    if (str[i] !== str[len - i - 1]) return "Not palindrome";
  }
  return "Palindrome";
};
\`\`\``
  },
  {
    id: 'jsp-4',
    section: 'js-problem-solving',
    number: 4,
    question: 'Find the factorial of given number?',
    answer: `\`\`\`javascript
const findFactorial = (num) => {
  if (num <= 1) return 1;
  return num * findFactorial(num - 1);
};
\`\`\``
  },
  {
    id: 'jsp-5',
    section: 'js-problem-solving',
    number: 5,
    question: 'Program to find longest word in a given sentence?',
    answer: `\`\`\`javascript
const findLongestWord = (sentence) => {
  const words = sentence.split(" ");
  let longest = "";
  for (let word of words) {
    if (word.length > longest.length) longest = word;
  }
  return longest;
};
\`\`\``
  },
  {
    id: 'jsp-6',
    section: 'js-problem-solving',
    number: 6,
    question: 'Write a JavaScript program to find the maximum number in an array.',
    answer: `\`\`\`javascript
function findMax(arr) {
  if (!arr.length) return undefined;
  return Math.max(...arr);
}
\`\`\``
  },
  {
    id: 'jsp-7',
    section: 'js-problem-solving',
    number: 7,
    question: 'Write a JavaScript function to check if a given number is prime.',
    answer: `\`\`\`javascript
function isPrime(num) {
  if (num <= 1) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}
\`\`\``
  },
  {
    id: 'jsp-8',
    section: 'js-problem-solving',
    number: 8,
    question: 'Program to find Reverse of a string without using built-in method?',
    answer: `\`\`\`javascript
const findReverse = (str) => {
  let rev = "";
  for (let i = str.length - 1; i >= 0; i--) {
    rev += str[i];
  }
  return rev;
};
\`\`\``
  },
  {
    id: 'jsp-9',
    section: 'js-problem-solving',
    number: 9,
    question: 'Find the smallest word in a given sentence?',
    answer: `\`\`\`javascript
function findSmallestWord(sentence) {
  const words = sentence.split(" ");
  let smallest = words[0];
  for (let word of words) {
    if (word.length < smallest.length) smallest = word;
  }
  return smallest;
}
\`\`\``
  },
  {
    id: 'jsp-10',
    section: 'js-problem-solving',
    number: 10,
    question: 'Write a function sumOfThirds(arr) that returns the sum of every third number starting from index 0.',
    answer: `\`\`\`javascript
const sumOfThirds = (arr) => {
  let sum = 0;
  for (let i = 0; i < arr.length; i += 3) {
    sum += arr[i];
  }
  return sum;
};
\`\`\``
  },
  {
    id: 'jsp-11',
    section: 'js-problem-solving',
    number: 11,
    question: 'Write a JavaScript function that returns the Fibonacci sequence up to a given number of terms.',
    answer: `\`\`\`javascript
function fibonacciSequence(numTerms) {
  if (numTerms <= 0) return [];
  if (numTerms === 1) return [0];
  const seq = [0, 1];
  for (let i = 2; i < numTerms; i++) {
    seq.push(seq[i - 1] + seq[i - 2]);
  }
  return seq;
}
\`\`\``
  },
  {
    id: 'jsp-12',
    section: 'js-problem-solving',
    number: 12,
    question: 'Find the max count of consecutive 1’s in an array.',
    answer: `\`\`\`javascript
const findConsecutiveOnes = (arr) => {
  let maxCount = 0, current = 0;
  for (let val of arr) {
    if (val === 1) {
      current++;
      maxCount = Math.max(maxCount, current);
    } else {
      current = 0;
    }
  }
  return maxCount;
};
\`\`\``
  },
  {
    id: 'jsp-13',
    section: 'js-problem-solving',
    number: 13,
    question: 'Given 2 sorted arrays [0,3,4,31] and [4,6,30], merge them into one sorted array.',
    answer: `\`\`\`javascript
function mergeSortedArrays(arr1, arr2) {
  const merged = [];
  let i = 0, j = 0;
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) merged.push(arr1[i++]);
    else merged.push(arr2[j++]);
  }
  return [...merged, ...arr1.slice(i), ...arr2.slice(j)];
}
\`\`\``
  },
  {
    id: 'jsp-14',
    section: 'js-problem-solving',
    number: 14,
    question: 'Function accepting 2 arrays returning true if every value in arr1 has its squared value in arr2 with same frequency.',
    answer: `\`\`\`javascript
function isSameFrequency(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  const f1 = {}, f2 = {};
  for (let v of arr1) f1[v] = (f1[v] || 0) + 1;
  for (let v of arr2) f2[v] = (f2[v] || 0) + 1;
  for (let k in f1) {
    if (f2[k * k] !== f1[k]) return false;
  }
  return true;
}
\`\`\``
  },
  {
    id: 'jsp-15',
    section: 'js-problem-solving',
    number: 15,
    question: 'Find if one string can be formed by rearranging letters of another string (Anagram).',
    answer: `\`\`\`javascript
function isAnagram(str1, str2) {
  if (str1.length !== str2.length) return false;
  const count = {};
  for (let ch of str1) count[ch] = (count[ch] || 0) + 1;
  for (let ch of str2) {
    if (!count[ch]) return false;
    count[ch]--;
  }
  return true;
}
\`\`\``
  },
  {
    id: 'jsp-16',
    section: 'js-problem-solving',
    number: 16,
    question: 'Write logic to get unique objects from array of objects.',
    answer: `\`\`\`javascript
function getUniqueArr(arr) {
  const seen = new Set();
  return arr.filter(item => {
    if (seen.has(item.name)) return false;
    seen.add(item.name);
    return true;
  });
}
\`\`\``
  },
  {
    id: 'jsp-17',
    section: 'js-problem-solving',
    number: 17,
    question: 'Write a JavaScript program to find the largest element in a nested array.',
    answer: `\`\`\`javascript
function findLargestElement(arr) {
  let max = -Infinity;
  function traverse(list) {
    for (let item of list) {
      if (Array.isArray(item)) traverse(item);
      else if (item > max) max = item;
    }
  }
  traverse(arr);
  return max;
}
\`\`\``
  },
  {
    id: 'jsp-18',
    section: 'js-problem-solving',
    number: 18,
    question: 'Count occurrences of each character in a string.',
    answer: `\`\`\`javascript
function countCharacters(str) {
  const counts = {};
  for (let ch of str) {
    counts[ch] = (counts[ch] || 0) + 1;
  }
  return counts;
}
\`\`\``
  },
  {
    id: 'jsp-19',
    section: 'js-problem-solving',
    number: 19,
    question: 'QuickSort ascending order implementation.',
    answer: `\`\`\`javascript
function quickSort(arr) {
  if (arr.length <= 1) return arr;
  const pivot = arr[0];
  const left = arr.slice(1).filter(x => x < pivot);
  const right = arr.slice(1).filter(x => x >= pivot);
  return [...quickSort(left), pivot, ...quickSort(right)];
}
\`\`\``
  },
  {
    id: 'jsp-20',
    section: 'js-problem-solving',
    number: 20,
    question: 'QuickSort descending order implementation.',
    answer: `\`\`\`javascript
function quickSortDesc(arr) {
  if (arr.length <= 1) return arr;
  const pivot = arr[0];
  const left = arr.slice(1).filter(x => x >= pivot);
  const right = arr.slice(1).filter(x => x < pivot);
  return [...quickSortDesc(left), pivot, ...quickSortDesc(right)];
}
\`\`\``
  },
  {
    id: 'jsp-21',
    section: 'js-problem-solving',
    number: 21,
    question: 'Reverse order of words in a sentence without using built-in reverse().',
    answer: `\`\`\`javascript
function reverseWords(sentence) {
  return sentence.split(" ").reduce((acc, word) => word + " " + acc, "").trim();
}
\`\`\``
  },
  {
    id: 'jsp-22',
    section: 'js-problem-solving',
    number: 22,
    question: 'Flatten nested array into 1D array using Stack.',
    answer: `\`\`\`javascript
function flattenArray(arr) {
  const stack = [...arr], res = [];
  while (stack.length) {
    const next = stack.pop();
    if (Array.isArray(next)) stack.push(...next);
    else res.push(next);
  }
  return res.reverse();
}
\`\`\``
  },
  {
    id: 'jsp-23',
    section: 'js-problem-solving',
    number: 23,
    question: 'Convert string path "a.b.c" and value into object {a:{b:{c:"value"}}}.',
    answer: `\`\`\`javascript
function stringToObject(str, val) {
  return str.split('.').reduceRight((acc, key, i, arr) => ({ [key]: i === arr.length - 1 ? val : acc }), {});
}
\`\`\``
  },
  {
    id: 'jsp-24',
    section: 'js-problem-solving',
    number: 24,
    question: 'Return array where each value is product of next two items [3, 4, 5] -> [20, 15, 12].',
    answer: `\`\`\`javascript
function productOfNextTwo(arr) {
  return arr.map((_, i) => arr[(i + 1) % arr.length] * arr[(i + 2) % arr.length]);
}
\`\`\``
  },
  {
    id: 'jsp-25',
    section: 'js-problem-solving',
    number: 25,
    question: 'Find 2nd largest element in an array [100,20,112,22].',
    answer: `\`\`\`javascript
function findSecondLargest(arr) {
  let max = -Infinity, second = -Infinity;
  for (let num of arr) {
    if (num > max) { second = max; max = num; }
    else if (num > second && num < max) second = num;
  }
  return second;
}
\`\`\``
  },
  {
    id: 'jsp-26',
    section: 'js-problem-solving',
    number: 26,
    question: 'Find pairs in array summing to target value (e.g. input [1..9], target 10).',
    answer: `\`\`\`javascript
function findPairs(arr, target) {
  const seen = new Set(), pairs = [];
  for (let num of arr) {
    const comp = target - num;
    if (seen.has(comp)) pairs.push([comp, num]);
    seen.add(num);
  }
  return pairs;
}
\`\`\``
  },
  {
    id: 'jsp-27',
    section: 'js-problem-solving',
    number: 27,
    question: 'Run length string encoding ("abbcccddddeea" -> "1a2b3c4d2e1a").',
    answer: `\`\`\`javascript
function encodeString(str) {
  let res = "", count = 1;
  for (let i = 1; i <= str.length; i++) {
    if (str[i] === str[i - 1]) count++;
    else { res += count + str[i - 1]; count = 1; }
  }
  return res;
}
\`\`\``
  }
];
