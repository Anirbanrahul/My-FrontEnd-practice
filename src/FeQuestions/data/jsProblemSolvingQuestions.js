// 27 JS Problem Solving Questions & Code Solutions (from Saikrishna Nangunuri Ebook)

export const JS_PROBLEM_SOLVING_QUESTIONS = [
  {
    id: 'jsp-1',
    section: 'js-problem-solving',
    number: 1,
    question: 'Write a program to remove duplicates from an array (2 ways).',
    answer: `Removing duplicates from an array is one of the most fundamental data structure manipulation tasks.

### Approach 1: Using \`Set\` (Modern & Optimal - $O(n)$ Time)
The \`Set\` collection stores unique values. Spreading the \`Set\` into an array yields unique elements in $O(n)$ linear time.

\`\`\`javascript
function removeDuplicatesSet(arr) {
  if (!Array.isArray(arr)) return [];
  return [...new Set(arr)];
}

const input = [1, 2, 2, 3, 4, 4, 5, "a", "b", "a"];
console.log(removeDuplicatesSet(input)); // [1, 2, 3, 4, 5, "a", "b"]
\`\`\`

### Approach 2: Using \`Array.prototype.filter\` and \`indexOf\` ($O(n^2)$ Time)
Keeps an element only if its first found occurrence matches its current iteration index.

\`\`\`javascript
function removeDuplicatesFilter(arr) {
  return arr.filter((item, index) => arr.indexOf(item) === index);
}
\`\`\`

### Complexity & Comparison:
- **Set Approach**:
  - **Time Complexity**: $\\mathcal{O}(n)$ — each insertion and lookup is $\\mathcal{O}(1)$.
  - **Space Complexity**: $\\mathcal{O}(n)$ — auxiliary Set memory.
- **Filter + indexOf Approach**:
  - **Time Complexity**: $\\mathcal{O}(n^2)$ — \`indexOf\` scans the array on each iteration.
  - **Space Complexity**: $\\mathcal{O}(n)$ — returned array.

👉 Interview Tip: Always recommend the \`Set\` approach first due to its $\\mathcal{O}(n)$ performance, and explain why \`filter + indexOf\` is $\\mathcal{O}(n^2)$ for large datasets.`
  },
  {
    id: 'jsp-2',
    section: 'js-problem-solving',
    number: 2,
    question: 'Write a JavaScript function that takes an array of numbers and returns a new array with only the even numbers.',
    answer: `Filter out odd integers using the modulus operator (\`% 2 === 0\`) within a pure, non-mutating higher-order function.

\`\`\`javascript
function findEvenNumbers(arr) {
  if (!Array.isArray(arr)) return [];
  
  // Guard against non-integers and check even parity
  return arr.filter(num => typeof num === "number" && Number.isInteger(num) && num % 2 === 0);
}

// Test cases including negative numbers and zero
console.log(findEvenNumbers([1, 2, 3, 4, 5, 6, 0, -2, -3])); 
// Output: [2, 4, 6, 0, -2]
\`\`\`

### Complexity:
- **Time Complexity**: $\\mathcal{O}(n)$ — single linear pass through the array.
- **Space Complexity**: $\\mathcal{O}(k)$ — where $k \\le n$ is the count of even elements.

📌 Note: Remember that \`0\` is an even integer ($0 \\% 2 = 0$) and negative numbers like \`-2\` are also even ($-2 \\% 2 = -0$, which equals $0$).`
  },
  {
    id: 'jsp-3',
    section: 'js-problem-solving',
    number: 3,
    question: 'How to check whether a string is palindrome or not?',
    answer: `A palindrome is a string that reads the exact same forwards and backwards, ignoring casing, spaces, and punctuation.

### Approach 1: Two-Pointer Technique (Optimal — $O(1)$ Extra Space)
Compares opposite ends moving inward, short-circuiting on the first mismatch.

\`\`\`javascript
function isPalindrome(str) {
  if (typeof str !== "string") return false;
  
  // Normalize: lowercase and strip non-alphanumeric characters
  const clean = str.toLowerCase().replace(/[^a-z0-9]/g, "");
  
  let left = 0;
  let right = clean.length - 1;

  while (left < right) {
    if (clean[left] !== clean[right]) return false;
    left++;
    right--;
  }

  return true;
}

console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("racecar"));                         // true
console.log(isPalindrome("frontend"));                        // false
\`\`\`

### Approach 2: Built-in Array Reverse
\`\`\`javascript
const isPalindromeSimple = (str) => {
  const clean = str.toLowerCase().replace(/[^a-z0-9]/g, "");
  return clean === clean.split("").reverse().join("");
};
\`\`\`

### Complexity:
- **Two-Pointer**: **Time**: $\\mathcal{O}(n)$, **Space**: $\\mathcal{O}(1)$ beyond the normalized string.
- **Array Reverse**: **Time**: $\\mathcal{O}(n)$, **Space**: $\\mathcal{O}(n)$ due to string splitting.`
  },
  {
    id: 'jsp-4',
    section: 'js-problem-solving',
    number: 4,
    question: 'Find the factorial of given number?',
    answer: `The factorial of a non-negative integer $n$ (denoted as $n!$) is the product of all positive integers less than or equal to $n$. Note that $0! = 1$.

### Approach 1: Iterative Solution (Best for Production — Avoids Stack Overflow)
\`\`\`javascript
function factorialIterative(n) {
  if (n < 0) throw new RangeError("Factorial is undefined for negative numbers");
  if (n === 0 || n === 1) return 1;

  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

console.log(factorialIterative(5)); // 120
console.log(factorialIterative(0)); // 1
\`\`\`

### Approach 2: Recursive Solution
\`\`\`javascript
function factorialRecursive(n) {
  if (n < 0) throw new RangeError("Factorial undefined for negative numbers");
  if (n <= 1) return 1;
  return n * factorialRecursive(n - 1);
}
\`\`\`

### Complexity:
- **Iterative**: **Time**: $\\mathcal{O}(n)$, **Space**: $\\mathcal{O}(1)$.
- **Recursive**: **Time**: $\\mathcal{O}(n)$, **Space**: $\\mathcal{O}(n)$ Call Stack frames.

👉 Interview Tip: For large factorials ($n > 21$), JavaScript numbers lose precision. Use \`BigInt\` (\`1n\`) to support arbitrarily large factorials.`
  },
  {
    id: 'jsp-5',
    section: 'js-problem-solving',
    number: 5,
    question: 'Program to find longest word in a given sentence?',
    answer: `Extract words by splitting whitespace, strip punctuation, and track the maximum length word.

\`\`\`javascript
function findLongestWord(sentence) {
  if (!sentence || typeof sentence !== "string") return "";

  // Split by whitespace and strip non-alphanumeric punctuation
  const words = sentence.trim().split(/\\s+/);
  
  let longest = "";
  for (const rawWord of words) {
    const cleanWord = rawWord.replace(/[^a-zA-Z0-9]/g, "");
    if (cleanWord.length > longest.length) {
      longest = cleanWord;
    }
  }

  return longest;
}

console.log(findLongestWord("The asynchronous JavaScript event loop is brilliant!"));
// Output: "asynchronous"
\`\`\`

### Alternative: Using \`reduce\`
\`\`\`javascript
const findLongestReduce = (sentence) =>
  sentence.split(/\\s+/).reduce((acc, word) => word.length > acc.length ? word : acc, "");
\`\`\`

### Complexity:
- **Time Complexity**: $\\mathcal{O}(n)$ where $n$ is total character count of the sentence.
- **Space Complexity**: $\\mathcal{O}(w)$ where $w$ is the count of words.`
  },
  {
    id: 'jsp-6',
    section: 'js-problem-solving',
    number: 6,
    question: 'Write a JavaScript program to find the maximum number in an array.',
    answer: `### Approach 1: Single Linear Loop (Production Safe — No Stack Limits)
Iterate through the array maintaining a running maximum.

\`\`\`javascript
function findMax(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return undefined;

  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}

console.log(findMax([14, 28, 92, 5, 41])); // 92
console.log(findMax([-10, -50, -2]));      // -2
\`\`\`

### Approach 2: Using \`Math.max(...arr)\`
\`\`\`javascript
const findMaxSpread = (arr) => arr.length ? Math.max(...arr) : undefined;
\`\`\`

📌 Note: **Gotcha Warning**: \`Math.max(...arr)\` fails with \`RangeError: Maximum call stack size exceeded\` if the array contains more than ~65,536 elements because arguments are pushed onto the stack. For enterprise datasets, always prefer the single-pass \`for\` loop or \`reduce()\`!`
  },
  {
    id: 'jsp-7',
    section: 'js-problem-solving',
    number: 7,
    question: 'Write a JavaScript function to check if a given number is prime.',
    answer: `A prime number is a natural number strictly greater than 1 that has no positive divisors other than 1 and itself.

### Optimal $O(\\sqrt{n})$ Algorithm:
Any composite factor pair $(a, b)$ of $n$ satisfies $a \\le \\sqrt{n} \\le b$. Therefore, we only need to test divisors up to $\\sqrt{n}$.

\`\`\`javascript
function isPrime(num) {
  if (num <= 1 || !Number.isInteger(num)) return false;
  if (num <= 3) return true; // 2 and 3 are prime

  // Eliminate even numbers and multiples of 3 immediately
  if (num % 2 === 0 || num % 3 === 0) return false;

  // Check 6k +/- 1 step optimization
  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
  }

  return true;
}

console.log(isPrime(2));   // true
console.log(isPrime(17));  // true
console.log(isPrime(4));   // false
console.log(isPrime(997)); // true
\`\`\`

### Complexity:
- **Time Complexity**: $\\mathcal{O}(\\sqrt{n})$ — dramatically faster than $\\mathcal{O}(n)$ trial division.
- **Space Complexity**: $\\mathcal{O}(1)$ — constant space.`
  },
  {
    id: 'jsp-8',
    section: 'js-problem-solving',
    number: 8,
    question: 'Program to find Reverse of a string without using built-in method?',
    answer: `Reversing a string without \`.split('').reverse().join('')\` tests loop mechanics and character iteration.

\`\`\`javascript
function reverseString(str) {
  if (typeof str !== "string") return "";

  let reversed = "";
  // Traverse backwards from last character to first
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }
  return reversed;
}

console.log(reverseString("JavaScript")); // "tpircSavaJ"
console.log(reverseString("hello world")); // "dlrow olleh"
\`\`\`

### Two-Pointer In-Place Array Alternative:
\`\`\`javascript
function reverseInPlace(str) {
  const chars = [...str]; // Handles unicode emoji surrogate pairs
  let left = 0, right = chars.length - 1;
  while (left < right) {
    [chars[left], chars[right]] = [chars[right], chars[left]];
    left++;
    right--;
  }
  return chars.join("");
}
\`\`\`

### Complexity:
- **Time Complexity**: $\\mathcal{O}(n)$ where $n$ is string length.
- **Space Complexity**: $\\mathcal{O}(n)$ to store the reversed string.`
  },
  {
    id: 'jsp-9',
    section: 'js-problem-solving',
    number: 9,
    question: 'Find the smallest word in a given sentence?',
    answer: `Scan words in a sentence to identify the word with the minimum positive length.

\`\`\`javascript
function findSmallestWord(sentence) {
  if (!sentence || typeof sentence !== "string") return "";

  // Split by whitespace and strip punctuation
  const words = sentence.trim().split(/\\s+/);
  if (words.length === 0) return "";

  let smallest = words[0].replace(/[^a-zA-Z0-9]/g, "");

  for (let i = 1; i < words.length; i++) {
    const clean = words[i].replace(/[^a-zA-Z0-9]/g, "");
    if (clean.length > 0 && clean.length < smallest.length) {
      smallest = clean;
    }
  }

  return smallest;
}

console.log(findSmallestWord("Frontend development is an exciting journey"));
// Output: "is" (or "an")
\`\`\`

### Complexity:
- **Time Complexity**: $\\mathcal{O}(n)$ single pass.
- **Space Complexity**: $\\mathcal{O}(w)$ where $w$ is word count.`
  },
  {
    id: 'jsp-10',
    section: 'js-problem-solving',
    number: 10,
    question: 'Write a function sumOfThirds(arr) that returns the sum of every third number starting from index 0.',
    answer: `Traverse the array stepping with stride index \`i += 3\`.

\`\`\`javascript
function sumOfThirds(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return 0;

  let totalSum = 0;
  for (let i = 0; i < arr.length; i += 3) {
    if (typeof arr[i] === "number") {
      totalSum += arr[i];
    }
  }

  return totalSum;
}

// Indices summed: 0 (val 10), 3 (val 40), 6 (val 70)
const data = [10, 20, 30, 40, 50, 60, 70, 80];
console.log(sumOfThirds(data)); // 10 + 40 + 70 = 120
\`\`\`

### Complexity:
- **Time Complexity**: $\\mathcal{O}(n/3) = \\mathcal{O}(n)$ linear time.
- **Space Complexity**: $\\mathcal{O}(1)$ constant memory.`
  },
  {
    id: 'jsp-11',
    section: 'js-problem-solving',
    number: 11,
    question: 'Write a JavaScript function that returns the Fibonacci sequence up to a given number of terms.',
    answer: `The Fibonacci sequence is defined by $F(0) = 0$, $F(1) = 1$, and $F(n) = F(n-1) + F(n-2)$.

\`\`\`javascript
function generateFibonacci(n) {
  if (n <= 0) return [];
  if (n === 1) return [0];

  const sequence = [0, 1];
  for (let i = 2; i < n; i++) {
    sequence.push(sequence[i - 1] + sequence[i - 2]);
  }

  return sequence;
}

console.log(generateFibonacci(8)); 
// Output: [0, 1, 1, 2, 3, 5, 8, 13]
\`\`\`

### Complexity:
- **Time Complexity**: $\\mathcal{O}(n)$ — each term computed in $\\mathcal{O}(1)$ time.
- **Space Complexity**: $\\mathcal{O}(n)$ — array holding $n$ terms.`
  },
  {
    id: 'jsp-12',
    section: 'js-problem-solving',
    number: 12,
    question: 'Find the max count of consecutive 1’s in an array.',
    answer: `Track current contiguous streak of \`1\`s and update global maximum.

\`\`\`javascript
function findMaxConsecutiveOnes(nums) {
  if (!Array.isArray(nums)) return 0;

  let maxStreak = 0;
  let currentStreak = 0;

  for (const num of nums) {
    if (num === 1) {
      currentStreak++;
      if (currentStreak > maxStreak) {
        maxStreak = currentStreak;
      }
    } else {
      currentStreak = 0; // Reset streak on 0
    }
  }

  return maxStreak;
}

console.log(findMaxConsecutiveOnes([1, 1, 0, 1, 1, 1, 0, 1])); // 3
console.log(findMaxConsecutiveOnes([0, 0, 0]));                 // 0
\`\`\`

### Complexity:
- **Time Complexity**: $\\mathcal{O}(n)$ single pass.
- **Space Complexity**: $\\mathcal{O}(1)$ constant memory.`
  },
  {
    id: 'jsp-13',
    section: 'js-problem-solving',
    number: 13,
    question: 'Given 2 sorted arrays [0,3,4,31] and [4,6,30], merge them into one sorted array.',
    answer: `Classic **Two-Pointer Merge Algorithm** (the merge step of MergeSort).

\`\`\`javascript
function mergeSortedArrays(arr1, arr2) {
  const result = [];
  let i = 0;
  let j = 0;

  // Compare elements from both arrays and push smaller one
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] <= arr2[j]) {
      result.push(arr1[i++]);
    } else {
      result.push(arr2[j++]);
    }
  }

  // Append remaining items from either array
  while (i < arr1.length) result.push(arr1[i++]);
  while (j < arr2.length) result.push(arr2[j++]);

  return result;
}

const a = [0, 3, 4, 31];
const b = [4, 6, 30];
console.log(mergeSortedArrays(a, b));
// Output: [0, 3, 4, 4, 6, 30, 31]
\`\`\`

### Complexity:
- **Time Complexity**: $\\mathcal{O}(n + m)$ where $n$ and $m$ are lengths of the input arrays.
- **Space Complexity**: $\\mathcal{O}(n + m)$ to store the merged array.`
  },
  {
    id: 'jsp-14',
    section: 'js-problem-solving',
    number: 14,
    question: 'Function accepting 2 arrays returning true if every value in arr1 has its squared value in arr2 with same frequency.',
    answer: `Uses the **Frequency Counter Pattern** via Hash Maps for optimal $\\mathcal{O}(n)$ performance.

\`\`\`javascript
function sameFrequencySquared(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;

  const freq1 = {};
  const freq2 = {};

  for (const val of arr1) freq1[val] = (freq1[val] || 0) + 1;
  for (const val of arr2) freq2[val] = (freq2[val] || 0) + 1;

  for (const key in freq1) {
    const squaredKey = Number(key) ** 2;
    // Check if squared key exists in freq2 with identical frequency
    if (freq2[squaredKey] !== freq1[key]) {
      return false;
    }
  }

  return true;
}

console.log(sameFrequencySquared([1, 2, 3], [4, 1, 9]));       // true
console.log(sameFrequencySquared([1, 2, 3], [1, 9]));          // false (lengths mismatch)
console.log(sameFrequencySquared([1, 2, 1], [4, 4, 1]));       // false (frequencies mismatch)
\`\`\`

### Complexity:
- **Time Complexity**: $\\mathcal{O}(n)$ linear time.
- **Space Complexity**: $\\mathcal{O}(n)$ to store frequency counts.`
  },
  {
    id: 'jsp-15',
    section: 'js-problem-solving',
    number: 15,
    question: 'Find if one string can be formed by rearranging letters of another string (Anagram).',
    answer: `An anagram is a word formed by rearranging the letters of another word, using all original letters exactly once.

### Optimal Frequency Counter Pattern ($O(n)$):
\`\`\`javascript
function isAnagram(str1, str2) {
  // Normalize strings
  const s1 = str1.toLowerCase().replace(/[^a-z0-9]/g, "");
  const s2 = str2.toLowerCase().replace(/[^a-z0-9]/g, "");

  if (s1.length !== s2.length) return false;

  const charCount = {};

  // Count frequencies in first string
  for (const char of s1) {
    charCount[char] = (charCount[char] || 0) + 1;
  }

  // Decrement frequencies with second string
  for (const char of s2) {
    if (!charCount[char]) return false; // Missing char or exhausted count
    charCount[char]--;
  }

  return true;
}

console.log(isAnagram("listen", "silent"));       // true
console.log(isAnagram("rail safety", "fairy tales")); // true
console.log(isAnagram("hello", "billion"));       // false
\`\`\`

### Complexity:
- **Time Complexity**: $\\mathcal{O}(n)$ linear time.
- **Space Complexity**: $\\mathcal{O}(1)$ since English alphabet has maximum 26 fixed character keys.`
  },
  {
    id: 'jsp-16',
    section: 'js-problem-solving',
    number: 16,
    question: 'Write logic to get unique objects from array of objects.',
    answer: `Deduplicate an array of objects based on a specific key (e.g. \`id\` or \`name\`) using a \`Set\` tracker or \`Map\`.

\`\`\`javascript
function deduplicateByKey(arr, key) {
  const seen = new Set();
  return arr.filter(item => {
    const val = item[key];
    if (seen.has(val)) return false;
    seen.add(val);
    return true;
  });
}

const employees = [
  { id: 1, name: "Alice", dept: "HR" },
  { id: 2, name: "Bob", dept: "Eng" },
  { id: 1, name: "Alice Duplicate", dept: "Sales" },
  { id: 3, name: "Charlie", dept: "Design" }
];

console.log(deduplicateByKey(employees, "id"));
// Output: Unique by id -> Alice (id 1), Bob (id 2), Charlie (id 3)
\`\`\`

### Alternative: Using \`Map\`
\`\`\`javascript
const uniqueViaMap = (arr, key) => [...new Map(arr.map(item => [item[key], item])).values()];
\`\`\`

### Complexity:
- **Time Complexity**: $\\mathcal{O}(n)$ linear time.
- **Space Complexity**: $\\mathcal{O}(n)$ hash set storage.`
  },
  {
    id: 'jsp-17',
    section: 'js-problem-solving',
    number: 17,
    question: 'Write a JavaScript program to find the largest element in a nested array.',
    answer: `Find the maximum number in an arbitrarily nested multi-dimensional array using recursion or stack traversal.

\`\`\`javascript
function findLargestInNested(arr) {
  let max = -Infinity;

  function traverse(list) {
    for (const item of list) {
      if (Array.isArray(item)) {
        traverse(item); // Recurse into nested sub-array
      } else if (typeof item === "number" && item > max) {
        max = item;
      }
    }
  }

  traverse(arr);
  return max === -Infinity ? undefined : max;
}

const nestedData = [1, [4, [25, 10], 8], [99, [3, [105]]], 42];
console.log(findLargestInNested(nestedData)); // 105
\`\`\`

### Modern ES2019 Alternative: \`flat(Infinity)\`
\`\`\`javascript
const findLargestModern = (arr) => Math.max(...arr.flat(Infinity));
\`\`\`

### Complexity:
- **Time Complexity**: $\\mathcal{O}(N)$ where $N$ is total elements across all nested depths.
- **Space Complexity**: $\\mathcal{O}(D)$ where $D$ is maximum nesting depth (call stack frames).`
  },
  {
    id: 'jsp-18',
    section: 'js-problem-solving',
    number: 18,
    question: 'Count occurrences of each character in a string.',
    answer: `Build a frequency map tallying character counts.

\`\`\`javascript
function countCharacterFrequency(str) {
  if (typeof str !== "string") return {};

  const counts = {};
  for (const char of str) {
    counts[char] = (counts[char] || 0) + 1;
  }
  return counts;
}

console.log(countCharacterFrequency("engineering"));
// Output: { e: 3, n: 3, g: 2, i: 2, r: 1 }
\`\`\`

### Alternative: Using \`Array.prototype.reduce\`
\`\`\`javascript
const countFreqReduce = (str) =>
  [...str].reduce((acc, ch) => ((acc[ch] = (acc[ch] || 0) + 1), acc), {});
\`\`\`

### Complexity:
- **Time Complexity**: $\\mathcal{O}(n)$ linear scan.
- **Space Complexity**: $\\mathcal{O}(k)$ where $k$ is count of unique characters.`
  },
  {
    id: 'jsp-19',
    section: 'js-problem-solving',
    number: 19,
    question: 'QuickSort ascending order implementation.',
    answer: `**QuickSort** is an efficient divide-and-conquer sorting algorithm. It selects a 'pivot' element, partitions elements into smaller and greater subsets, and recursively sorts the partitions.

\`\`\`javascript
function quickSort(arr) {
  // Base case: arrays of length 0 or 1 are already sorted
  if (arr.length <= 1) return arr;

  const pivot = arr[arr.length - 1]; // Pick last element as pivot
  const left = [];
  const right = [];
  const equal = [];

  for (const element of arr) {
    if (element < pivot) left.push(element);
    else if (element > pivot) right.push(element);
    else equal.push(element);
  }

  // Recursively sort left and right partitions
  return [...quickSort(left), ...equal, ...quickSort(right)];
}

console.log(quickSort([64, 34, 25, 12, 22, 11, 90]));
// Output: [11, 12, 22, 25, 34, 64, 90]
\`\`\`

### Complexity:
- **Average Time Complexity**: $\\mathcal{O}(n \\log n)$.
- **Worst Case Time Complexity**: $\\mathcal{O}(n^2)$ (occurs when pivot is consistently the minimum/maximum).
- **Space Complexity**: $\\mathcal{O}(n)$ in this partition copy implementation (or $\\mathcal{O}(\\log n)$ in in-place Hoare/Lomuto partitioning).`
  },
  {
    id: 'jsp-20',
    section: 'js-problem-solving',
    number: 20,
    question: 'QuickSort descending order implementation.',
    answer: `QuickSort configured for descending order by placing elements greater than pivot on the left and smaller on the right.

\`\`\`javascript
function quickSortDesc(arr) {
  if (arr.length <= 1) return arr;

  const pivot = arr[Math.floor(arr.length / 2)];
  const greater = [];
  const smaller = [];
  const equal = [];

  for (const item of arr) {
    if (item > pivot) greater.push(item);
    else if (item < pivot) smaller.push(item);
    else equal.push(item);
  }

  return [...quickSortDesc(greater), ...equal, ...quickSortDesc(smaller)];
}

console.log(quickSortDesc([5, 1, 9, 3, 7])); 
// Output: [9, 7, 5, 3, 1]
\`\`\``
  },
  {
    id: 'jsp-21',
    section: 'js-problem-solving',
    number: 21,
    question: 'Reverse order of words in a sentence without using built-in reverse().',
    answer: `\`\`\`javascript
function reverseWords(sentence) {
  if (!sentence) return "";

  // Split words by whitespace
  const words = sentence.trim().split(/\\s+/);
  let result = "";

  for (let i = words.length - 1; i >= 0; i--) {
    result += words[i] + (i > 0 ? " " : "");
  }

  return result;
}

console.log(reverseWords("Frontend Interview Preparation Bible"));
// Output: "Bible Preparation Interview Frontend"
\`\`\`

### Alternative: Two-Pointer Word Inversion
\`\`\`javascript
function reverseWordsTwoPointer(sentence) {
  const words = sentence.trim().split(/\\s+/);
  let left = 0, right = words.length - 1;
  while (left < right) {
    [words[left], words[right]] = [words[right], words[left]];
    left++;
    right--;
  }
  return words.join(" ");
}
\`\`\``
  },
  {
    id: 'jsp-22',
    section: 'js-problem-solving',
    number: 22,
    question: 'Flatten nested array into 1D array using Stack.',
    answer: `Iterative array flattening using an explicit **LIFO Stack** to avoid recursion stack overflow limits.

\`\`\`javascript
function flattenWithStack(arr) {
  const stack = [...arr];
  const result = [];

  while (stack.length > 0) {
    const item = stack.pop();

    if (Array.isArray(item)) {
      // Push unpacked elements back onto stack to process deeper nesting
      stack.push(...item);
    } else {
      result.push(item);
    }
  }

  // Because stack pops from end, reverse result to restore original order
  return result.reverse();
}

const deeplyNested = [1, [2, [3, [4, 5]]], 6];
console.log(flattenWithStack(deeplyNested)); 
// Output: [1, 2, 3, 4, 5, 6]
\`\`\`

### Complexity:
- **Time Complexity**: $\\mathcal{O}(N)$ where $N$ is total elements across all levels.
- **Space Complexity**: $\\mathcal{O}(N)$ auxiliary stack.`
  },
  {
    id: 'jsp-23',
    section: 'js-problem-solving',
    number: 23,
    question: 'Convert string path "a.b.c" and value into object {a:{b:{c:"value"}}}.',
    answer: `Converts dot-delimited path into nested object hierarchy using \`reduceRight\` or iterative nesting.

### Approach 1: Using \`reduceRight\`
\`\`\`javascript
function stringPathToObject(path, value) {
  return path.split(".").reduceRight((acc, key, index, arr) => {
    return { [key]: index === arr.length - 1 ? value : acc };
  }, {});
}

console.log(stringPathToObject("a.b.c", "deepValue"));
// Output: { a: { b: { c: "deepValue" } } }
\`\`\`

### Approach 2: Mutating Builder Pattern
\`\`\`javascript
function createPathObject(path, value) {
  const keys = path.split(".");
  const root = {};
  let current = root;

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (i === keys.length - 1) {
      current[key] = value;
    } else {
      current[key] = {};
      current = current[key];
    }
  }

  return root;
}
\`\`\``
  },
  {
    id: 'jsp-24',
    section: 'js-problem-solving',
    number: 24,
    question: 'Return array where each value is product of next two items [3, 4, 5] -> [20, 15, 12].',
    answer: `Use modulo indexing (\`% length\`) to create a circular array lookahead:

\`\`\`javascript
function productOfNextTwo(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return [];

  const len = arr.length;
  return arr.map((_, i) => {
    const next1 = arr[(i + 1) % len];
    const next2 = arr[(i + 2) % len];
    return next1 * next2;
  });
}

console.log(productOfNextTwo([3, 4, 5]));
// Index 0: 4 * 5 = 20
// Index 1: 5 * 3 = 15
// Index 2: 3 * 4 = 12
// Output: [20, 15, 12]
\`\`\`

### Complexity:
- **Time Complexity**: $\\mathcal{O}(n)$ linear time.
- **Space Complexity**: $\\mathcal{O}(n)$ mapped array.`
  },
  {
    id: 'jsp-25',
    section: 'js-problem-solving',
    number: 25,
    question: 'Find 2nd largest element in an array [100,20,112,22].',
    answer: `Find the second distinct maximum in a single pass without sorting.

\`\`\`javascript
function findSecondLargest(arr) {
  if (!Array.isArray(arr) || arr.length < 2) return null;

  let largest = -Infinity;
  let secondLargest = -Infinity;

  for (const num of arr) {
    if (num > largest) {
      secondLargest = largest;
      largest = num;
    } else if (num > secondLargest && num < largest) {
      secondLargest = num;
    }
  }

  return secondLargest === -Infinity ? null : secondLargest;
}

console.log(findSecondLargest([100, 20, 112, 22])); // 100
console.log(findSecondLargest([10, 10, 10]));       // null (no distinct 2nd largest)
console.log(findSecondLargest([-5, -10, -2, -1]));  // -2
\`\`\`

### Complexity:
- **Time Complexity**: $\\mathcal{O}(n)$ single pass (Sorting would be $\\mathcal{O}(n \\log n)$).
- **Space Complexity**: $\\mathcal{O}(1)$ constant variables.`
  },
  {
    id: 'jsp-26',
    section: 'js-problem-solving',
    number: 26,
    question: 'Find pairs in array summing to target value (e.g. input [1..9], target 10).',
    answer: `Classic **Two Sum Pairs** problem solved in $\\mathcal{O}(n)$ time using a Hash Set to track complements.

\`\`\`javascript
function findPairsWithSum(arr, targetSum) {
  const seenNumbers = new Set();
  const pairs = [];
  const recordedComplements = new Set();

  for (const num of arr) {
    const complement = targetSum - num;

    if (seenNumbers.has(complement) && !recordedComplements.has(num)) {
      pairs.push([complement, num]);
      // Prevent duplicate symmetric pairs
      recordedComplements.add(complement);
      recordedComplements.add(num);
    }

    seenNumbers.add(num);
  }

  return pairs;
}

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(findPairsWithSum(numbers, 10));
// Output: [[1, 9], [2, 8], [3, 7], [4, 6]]
\`\`\`

### Complexity:
- **Time Complexity**: $\\mathcal{O}(n)$ linear time.
- **Space Complexity**: $\\mathcal{O}(n)$ for hash sets.`
  },
  {
    id: 'jsp-27',
    section: 'js-problem-solving',
    number: 27,
    question: 'Run length string encoding ("abbcccddddeea" -> "1a2b3c4d2e1a").',
    answer: `**Run-Length Encoding (RLE)** is a basic lossless data compression technique that replaces consecutive repeating characters with their frequency count and character.

\`\`\`javascript
function runLengthEncode(str) {
  if (!str || typeof str !== "string") return "";

  let encoded = "";
  let count = 1;

  for (let i = 0; i < str.length; i++) {
    // If next character is identical, increment run count
    if (str[i] === str[i + 1]) {
      count++;
    } else {
      // Append frequency count and character token
      encoded += \`\${count}\${str[i]}\`;
      count = 1; // Reset counter for next run
    }
  }

  return encoded;
}

console.log(runLengthEncode("abbcccddddeea")); 
// Output: "1a2b3c4d2e1a"
console.log(runLengthEncode("AAAAABBBCC"));   
// Output: "5A3B2C"
\`\`\`

### Complexity:
- **Time Complexity**: $\\mathcal{O}(n)$ where $n$ is string length.
- **Space Complexity**: $\\mathcal{O}(n)$ for the compressed string output.`
  }
];
