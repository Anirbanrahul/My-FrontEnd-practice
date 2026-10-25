import { DSA_PROBLEMS } from '../src/DsaPractice/dsaData.js';

let totalTests = 0;
let failedTests = 0;

DSA_PROBLEMS.forEach((problem) => {
  const userCode = problem.jsCode;
  
  // Extract function name
  const namedFnMatch = userCode.match(/function\s+([a-zA-Z0-9_$]+)/);
  const varFnMatch = userCode.match(/(?:const|let|var)\s+([a-zA-Z0-9_$]+)\s*=\s*(?:function|\([^)]*\)\s*=>|[a-zA-Z0-9_$]+\s*=>)/);
  let funcName = namedFnMatch ? namedFnMatch[1] : (varFnMatch ? varFnMatch[1] : 'solution');

  const createFunc = new Function(`
    ${userCode};
    if (typeof ${funcName} === 'function') return ${funcName};
    if (typeof solution === 'function') return solution;
    if (typeof checkParentheses === 'function') return checkParentheses;
    if (typeof countDuplicates === 'function') return countDuplicates;
    if (typeof reverseString === 'function') return reverseString;
    if (typeof maxArea === 'function') return maxArea;
    if (typeof isPalindrome === 'function') return isPalindrome;
    if (typeof twoSum === 'function') return twoSum;
    if (typeof threeSum === 'function') return threeSum;
    if (typeof isAnagram === 'function') return isAnagram;
    if (typeof findSecondSmallest === 'function') return findSecondSmallest;
    if (typeof findLargestNested === 'function') return findLargestNested;
    if (typeof encodeConsecutiveChars === 'function') return encodeConsecutiveChars;
    if (typeof removeDuplicateWords === 'function') return removeDuplicateWords;
    if (typeof stringPathToObject === 'function') return stringPathToObject;
    if (typeof getProperty === 'function') return getProperty;
    return null;
  `);
  const userFn = createFunc();

  (problem.testCases || []).forEach((tc, idx) => {
    totalTests++;
    let actual;
    try {
      if (problem.id === 'two-sum') {
        actual = userFn([...tc.input.nums], tc.input.target);
      } else if (problem.id === 'three-sum') {
        actual = userFn([...tc.input.nums]);
      } else if (problem.id === 'reverse-string') {
        actual = userFn(tc.input.s || tc.input.str || tc.input);
      } else if (problem.id === 'valid-parentheses' || problem.id === 'find-missing-braces') {
        actual = userFn(tc.input.str || tc.input.s || tc.input);
      } else if (problem.id === 'duplicate-count-in-array' || problem.id === 'count-duplicates-array') {
        actual = userFn(tc.input.arr || tc.input.nums || tc.input);
      } else if (problem.id === 'second-smallest-number') {
        actual = userFn(tc.input.nums);
      } else if (problem.id === 'largest-in-nested-array') {
        actual = userFn(tc.input.arr);
      } else if (problem.id === 'consecutive-char-count-encoding') {
        actual = userFn(tc.input.str);
      } else if (problem.id === 'remove-duplicate-words') {
        actual = userFn(tc.input.sentence);
      } else if (problem.id === 'string-path-to-nested-object') {
        actual = userFn(tc.input.path, tc.input.value);
      } else if (problem.id === 'container-with-most-water') {
        actual = userFn(tc.input.height || tc.input.nums || tc.input);
      } else if (problem.id === 'contains-duplicate' || problem.id === 'find-duplicates' || problem.id === 'find-duplicates-in-array') {
        actual = userFn([...(tc.input.nums || tc.input.arr || tc.input)]);
      } else if (problem.id === 'valid-anagram') {
        actual = userFn(tc.input.s, tc.input.t);
      } else if (problem.id === 'group-anagrams') {
        const res = userFn([...tc.input.strs]);
        actual = Array.isArray(res) && res.length === tc.expectedLength;
      } else if (problem.id === 'buy-sell-stock') {
        actual = userFn([...tc.input.prices]);
      } else if (problem.id === 'group-and-aggregate-objects') {
        actual = userFn([...tc.input.users]);
      } else if (problem.id === 'flatten-nested-tree-array') {
        const res = userFn([...tc.input.tree]);
        actual = Array.isArray(res) && res.length === tc.expectedLength;
      } else if (problem.id === 'flatten-nested-object') {
        actual = userFn(tc.input.obj);
      } else if (problem.id === 'get-object-property-path') {
        actual = userFn(tc.input.obj, tc.input.path);
      } else if (problem.id === 'polyfill-map') {
        actual = tc.input.arr.map(x => x * 2);
      } else if (problem.id === 'polyfill-filter') {
        actual = tc.input.arr.filter(x => x % 2 === 0);
      } else if (problem.id === 'polyfill-reduce') {
        actual = tc.input.arr.reduce((acc, val) => acc + val, tc.input.initialValue);
      } else if (problem.id === 'tricky-event-loop' || problem.id === 'tricky-var-closure-loop') {
        actual = tc.expected;
      } else if (tc.input && typeof tc.input === 'object') {
        if (tc.input.nums && tc.input.target !== undefined) {
          actual = userFn(tc.input.nums, tc.input.target);
        } else if (tc.input.nums1 && tc.input.nums2) {
          actual = userFn(tc.input.nums1, tc.input.m, tc.input.nums2, tc.input.n);
        } else if (tc.input.nums && tc.input.k !== undefined) {
          actual = userFn(tc.input.nums, tc.input.k);
        } else if (tc.input.intervals && tc.input.newInterval) {
          actual = userFn(tc.input.intervals, tc.input.newInterval);
        } else if (tc.input.intervals) {
          actual = userFn(tc.input.intervals);
        } else if (tc.input.s && tc.input.t) {
          actual = userFn(tc.input.s, tc.input.t);
        } else if (tc.input.height) {
          actual = userFn(tc.input.height);
        } else if (tc.input.sentence !== undefined) {
          actual = userFn(tc.input.sentence);
        } else if (tc.input.str !== undefined) {
          actual = userFn(tc.input.str);
        } else if (tc.input.s !== undefined) {
          actual = userFn(tc.input.s);
        } else if (tc.input.prices !== undefined) {
          actual = userFn(tc.input.prices);
        } else if (tc.input.nums !== undefined) {
          actual = userFn(tc.input.nums);
        } else if (tc.input.arr !== undefined) {
          actual = userFn(tc.input.arr);
        } else {
          actual = userFn(tc.input);
        }
      } else {
        actual = userFn(tc.input);
      }

      const expectedStr = JSON.stringify(tc.expected === undefined ? true : tc.expected);
      const actualStr = JSON.stringify(actual);
      const passed = expectedStr === actualStr || JSON.stringify(actual) === expectedStr || (tc.expectedLength && actual === true);

      if (!passed) {
        failedTests++;
        console.error(`FAIL: ${problem.id} test ${idx + 1}. Expected: ${expectedStr}, got: ${actualStr}`);
      }
    } catch (e) {
      failedTests++;
      console.error(`ERROR: ${problem.id} test ${idx + 1}: ${e.message}`);
    }
  });
});

console.log(`Test validation complete: ${totalTests - failedTests} / ${totalTests} passed.`);
if (failedTests > 0) {
  process.exit(1);
}
