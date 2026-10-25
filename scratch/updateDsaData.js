import fs from 'fs';
import path from 'path';

// Let's create the updated dsaData.js content with all 37 problems
const fileContent = `// Master dataset for DSA & JS Practice Hub (37 Problems)

export const DSA_PROBLEMS = [
  // ==========================================
  // 1. DSA ALGORITHMS (PROBLEMS 1 - 28)
  // ==========================================
  {
    id: 'two-sum',
    number: 1,
    title: 'Two Sum',
    category: 'Arrays & Hashing',
    difficulty: 'Easy',
    memoryTrick: '💡 Complement Trick: Store seen values in Hash Map as { value: index }. For each num, search for (target - num) in Map.',
    description: 'Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.',
    examples: [
      { input: 'nums = [2, 7, 11, 15], target = 9', output: '[0, 1]' }
    ],
    pseudocode: \`function twoSum(nums, target):
    map = new Map()
    for i = 0 to nums.length - 1:
        complement = target - nums[i]
        if map.has(complement): return [map.get(complement), i]
        map.set(nums[i], i)
    return []\`,
    jsCode: \`function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}\`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    defaultInput: { nums: [2, 7, 11, 15], target: 9 },
    testCases: [
      { input: { nums: [2, 7, 11, 15], target: 9 }, expected: [0, 1] }
    ],
    stepGenerator: (input) => {
      const nums = input?.nums || [2, 7, 11, 15];
      const target = input?.target ?? 9;
      const steps = [];
      const map = new Map();

      steps.push({
        stepIndex: 0,
        description: \`Target = \${target}. Initialize empty Hash Map.\`,
        array: nums.map((v, idx) => ({ value: v, status: 'default', index: idx })),
        pointers: {},
        hashMap: [],
        variables: { target }
      });

      for (let i = 0; i < nums.length; i++) {
        const val = nums[i];
        const complement = target - val;

        steps.push({
          stepIndex: steps.length,
          description: \`Index \${i} (\${val}): Complement = \${target} - \${val} = \${complement}. Checking Map...\`,
          array: nums.map((v, idx) => ({ value: v, status: idx === i ? 'active' : map.has(v) ? 'visited' : 'default', index: idx })),
          pointers: { i },
          hashMap: Array.from(map.entries()).map(([k, v]) => ({ key: k, value: v, status: 'default' })),
          variables: { complement }
        });

        if (map.has(complement)) {
          const prevIdx = map.get(complement);
          steps.push({
            stepIndex: steps.length,
            description: \`🎉 Found pair! [\${prevIdx}, \${i}]\`,
            array: nums.map((v, idx) => ({ value: v, status: idx === prevIdx || idx === i ? 'match' : 'default', index: idx })),
            pointers: { match1: prevIdx, match2: i },
            hashMap: Array.from(map.entries()).map(([k, v]) => ({ key: k, value: v, status: k === complement ? 'match' : 'default' })),
            variables: { result: \`[\${prevIdx}, \${i}]\` }
          });
          return steps;
        }
        map.set(val, i);
      }
      return steps;
    }
  },
  {
    id: 'contains-duplicate',
    number: 2,
    title: 'Contains Duplicate',
    category: 'Arrays & Hashing',
    difficulty: 'Easy',
    memoryTrick: '💡 Hash Set Tracker: Add elements to a Set. If element is already present in Set, it is a duplicate!',
    description: 'Given an integer array \`nums\`, return \`true\` if any value appears at least twice in the array, and return \`false\` if every element is distinct.',
    examples: [
      { input: 'nums = [1, 2, 3, 1]', output: 'true' }
    ],
    pseudocode: \`function containsDuplicate(nums):
    seen = new Set()
    for num in nums:
        if seen.has(num): return true
        seen.add(num)
    return false\`,
    jsCode: \`function containsDuplicate(nums) {
  const seen = new Set();
  for (let num of nums) {
    if (seen.has(num)) return true;
    seen.add(num);
  }
  return false;
}\`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    defaultInput: { nums: [1, 2, 3, 1] },
    testCases: [
      { input: { nums: [1, 2, 3, 1] }, expected: true }
    ],
    stepGenerator: (input) => {
      const nums = input?.nums || [1, 2, 3, 1];
      const steps = [];
      const seen = new Set();

      for (let i = 0; i < nums.length; i++) {
        const val = nums[i];
        if (seen.has(val)) {
          steps.push({
            stepIndex: steps.length,
            description: \`🎉 Duplicate found! Number \${val} already in Set. Return true.\`,
            array: nums.map((v, idx) => ({ value: v, status: v === val ? 'match' : 'default', index: idx })),
            hashSet: Array.from(seen),
            variables: { result: true }
          });
          return steps;
        }
        seen.add(val);
        steps.push({
          stepIndex: steps.length,
          description: \`Add \${val} to Set.\`,
          array: nums.map((v, idx) => ({ value: v, status: idx === i ? 'active' : 'default', index: idx })),
          hashSet: Array.from(seen),
          variables: { setSize: seen.size }
        });
      }
      return steps;
    }
  },
  {
    id: 'duplicate-count-in-array',
    number: 3,
    title: 'Duplicate Count in Array (JS)',
    category: 'Arrays & Hashing',
    difficulty: 'Easy',
    memoryTrick: '💡 Frequency Map & Filter: Build frequency map freq[item] = (freq[item] || 0) + 1. Extract only items where freq[item] > 1 to get duplicates with their exact count!',
    description: 'Given an array in JavaScript, count the occurrences of each element and return an object/map of all duplicate elements with their count frequencies.',
    examples: [
      { input: 'arr = [1, 2, 3, 2, 4, 1, 5, 2, 1]', output: '{"1": 3, "2": 3}' },
      { input: 'arr = ["apple", "banana", "apple", "orange", "banana", "apple"]', output: '{"apple": 3, "banana": 2}' }
    ],
    pseudocode: \`function countDuplicates(arr):
    freq = {}
    for item in arr:
        freq[item] = (freq[item] || 0) + 1
    duplicates = {}
    for [key, count] of Object.entries(freq):
        if count > 1: duplicates[key] = count
    return duplicates\`,
    jsCode: \`function countDuplicates(arr) {
  const freq = {};
  for (const item of arr) {
    freq[item] = (freq[item] || 0) + 1;
  }
  const duplicates = {};
  for (const [key, count] of Object.entries(freq)) {
    if (count > 1) {
      duplicates[key] = count;
    }
  }
  return duplicates;
}\`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    defaultInput: { arr: [1, 2, 3, 2, 4, 1, 5, 2, 1] },
    testCases: [
      { input: { arr: [1, 2, 3, 2, 4, 1, 5, 2, 1] }, expected: { '1': 3, '2': 3 } },
      { input: { arr: [4, 5, 6, 7, 8] }, expected: {} },
      { input: { arr: ['a', 'b', 'a', 'c', 'b', 'a'] }, expected: { 'a': 3, 'b': 2 } }
    ],
    stepGenerator: (input) => {
      const arr = input?.arr || [1, 2, 3, 2, 4, 1, 5, 2, 1];
      const steps = [];
      const freq = {};

      steps.push({
        stepIndex: 0,
        description: \`Start counting duplicate frequencies for array of length \${arr.length}. Initialize empty frequency map.\`,
        array: arr.map((v, i) => ({ value: v, status: 'default', index: i })),
        pointers: {},
        hashMap: [],
        variables: { currentItem: 'None', duplicatesCount: 0 }
      });

      for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        freq[item] = (freq[item] || 0) + 1;
        const count = freq[item];
        const isDuplicate = count > 1;

        steps.push({
          stepIndex: steps.length,
          description: \`Index \${i} (\${item}): frequency updated to \${count}.\${isDuplicate ? \` ⚡ Duplicate detected! (\${item} seen \${count} times)\` : ''}\`,
          array: arr.map((v, idx) => ({
            value: v,
            status: idx === i ? (isDuplicate ? 'match' : 'active') : (freq[v] > 1 ? 'visited' : 'default'),
            index: idx
          })),
          pointers: { i },
          hashMap: Object.entries(freq).map(([k, v]) => ({
            key: k,
            value: \`Count: \${v}\${v > 1 ? ' (Duplicate)' : ''}\`,
            status: v > 1 ? 'match' : 'default'
          })),
          variables: { item, count, duplicate: isDuplicate }
        });
      }

      const dupObj = {};
      for (const [k, v] of Object.entries(freq)) {
        if (v > 1) dupObj[k] = v;
      }

      steps.push({
        stepIndex: steps.length,
        description: \`🎉 Completed! Filtered duplicate counts: \${JSON.stringify(dupObj)}\`,
        array: arr.map((v, idx) => ({
          value: v,
          status: freq[v] > 1 ? 'match' : 'default',
          index: idx
        })),
        hashMap: Object.entries(dupObj).map(([k, v]) => ({
          key: k,
          value: \`Count: \${v}\`,
          status: 'match'
        })),
        variables: { result: JSON.stringify(dupObj) }
      });

      return steps;
    }
  },
  {
    id: 'valid-anagram',
    number: 4,
    title: 'Valid Anagram',
    category: 'Arrays & Hashing',
    difficulty: 'Easy',
    memoryTrick: '💡 Frequency Map: Count frequencies of String S (+1) and String T (-1). If all frequencies return to 0, it is an anagram.',
    description: 'Given two strings \`s\` and \`t\`, return \`true\` if \`t\` is an anagram of \`s\`, and \`false\` otherwise.',
    examples: [
      { input: 's = "anagram", t = "nagaram"', output: 'true' }
    ],
    pseudocode: \`function isAnagram(s, t):
    if s.length != t.length: return false
    countMap = new Map()
    for char in s: countMap[char] = (countMap[char] || 0) + 1
    for char in t:
        if (!countMap[char]): return false
        countMap[char]--
    return true\`,
    jsCode: \`function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const count = {};
  for (let char of s) count[char] = (count[char] || 0) + 1;
  for (let char of t) {
    if (!count[char]) return false;
    count[char]--;
  }
  return true;
}\`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    defaultInput: { s: 'anagram', t: 'nagaram' },
    testCases: [{ input: { s: 'anagram', t: 'nagaram' }, expected: true }],
    stepGenerator: (input) => {
      const s = input?.s || 'anagram';
      const t = input?.t || 'nagaram';
      const steps = [];
      const map = {};
      for (let i = 0; i < s.length; i++) {
        map[s[i]] = (map[s[i]] || 0) + 1;
      }
      for (let j = 0; j < t.length; j++) {
        const ch = t[j];
        if (!map[ch]) {
          steps.push({
            stepIndex: steps.length,
            description: \`Mismatch at '\${ch}'. Return false.\`,
            array: s.split('').map((c, idx) => ({ value: c, status: 'default', index: idx })),
            variables: { result: false }
          });
          return steps;
        }
        map[ch]--;
      }
      steps.push({
        stepIndex: 0,
        description: '🎉 Valid Anagram! Frequencies match.',
        array: s.split('').map((c, idx) => ({ value: c, status: 'match', index: idx })),
        variables: { result: true }
      });
      return steps;
    }
  },
  {
    id: 'group-anagrams',
    number: 5,
    title: 'Group Anagrams',
    category: 'Arrays & Hashing',
    difficulty: 'Medium',
    memoryTrick: '💡 Sorted Key Mapping: Sort each word alphabetically (e.g. "eat" -> "aet") and use it as a Hash Map key to group words!',
    description: 'Given an array of strings \`strs\`, group the anagrams together.',
    examples: [
      { input: 'strs = ["eat","tea","tan","ate","nat","bat"]', output: '[["bat"],["nat","tan"],["ate","eat","tea"]]' }
    ],
    pseudocode: \`function groupAnagrams(strs):
    map = new Map()
    for str in strs:
        key = str.split('').sort().join('')
        if !map.has(key): map.set(key, [])
        map.get(key).push(str)
    return Array.from(map.values())\`,
    jsCode: \`function groupAnagrams(strs) {
  const map = new Map();
  for (let str of strs) {
    const key = str.split('').sort().join('');
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(str);
  }
  return Array.from(map.values());
}\`,
    timeComplexity: 'O(N * K log K)',
    spaceComplexity: 'O(N * K)',
    defaultInput: { strs: ['eat', 'tea', 'tan', 'ate', 'nat', 'bat'] },
    testCases: [{ input: { strs: ['eat', 'tea', 'tan', 'ate', 'nat', 'bat'] }, expectedLength: 3 }],
    stepGenerator: (input) => {
      const strs = input?.strs || ['eat', 'tea', 'tan', 'ate', 'nat', 'bat'];
      const steps = [];
      const map = new Map();
      for (let i = 0; i < strs.length; i++) {
        const key = strs[i].split('').sort().join('');
        if (!map.has(key)) map.set(key, []);
        map.get(key).push(strs[i]);
        steps.push({
          stepIndex: steps.length,
          description: \`Grouped '\${strs[i]}' under key '\${key}'.\`,
          array: strs.map((s, idx) => ({ value: s, status: idx <= i ? 'visited' : 'default', index: idx })),
          hashMap: Array.from(map.entries()).map(([k, v]) => ({ key: k, value: JSON.stringify(v), status: 'default' }))
        });
      }
      return steps;
    }
  },
  {
    id: 'longest-substring-without-repeating',
    number: 6,
    title: 'Longest Substring Without Repeating',
    category: 'Sliding Window',
    difficulty: 'Medium',
    memoryTrick: '💡 Sliding Window & Set: Expand \`right\` pointer adding chars to Set. If char is already in Set, shrink \`left\` pointer until unique.',
    description: 'Given a string \`s\`, find the length of the longest substring without repeating characters.',
    examples: [{ input: 's = "abcabcbb"', output: '3' }],
    pseudocode: \`function lengthOfLongestSubstring(s):
    set = new Set()
    left = 0, maxLen = 0
    for right = 0 to s.length - 1:
        while set.has(s[right]): set.delete(s[left++])
        set.add(s[right])
        maxLen = max(maxLen, right - left + 1)
    return maxLen\`,
    jsCode: \`function lengthOfLongestSubstring(s) {
  const set = new Set();
  let left = 0, maxLen = 0;
  for (let right = 0; right < s.length; right++) {
    while (set.has(s[right])) {
      set.delete(s[left]);
      left++;
    }
    set.add(s[right]);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}\`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(K)',
    defaultInput: { s: 'abcabcbb' },
    testCases: [{ input: { s: 'abcabcbb' }, expected: 3 }],
    stepGenerator: (input) => {
      const s = input?.s || 'abcabcbb';
      const steps = [];
      const set = new Set();
      let left = 0, maxLen = 0;
      for (let right = 0; right < s.length; right++) {
        while (set.has(s[right])) set.delete(s[left++]);
        set.add(s[right]);
        maxLen = Math.max(maxLen, right - left + 1);
        steps.push({
          stepIndex: steps.length,
          description: \`Window "\${s.substring(left, right + 1)}" (len = \${right - left + 1}). MaxLen = \${maxLen}.\`,
          array: s.split('').map((c, idx) => ({ value: c, status: idx >= left && idx <= right ? 'active' : 'default', index: idx })),
          pointers: { left, right },
          hashSet: Array.from(set),
          variables: { maxLen }
        });
      }
      return steps;
    }
  },
  {
    id: 'buy-sell-stock',
    number: 7,
    title: 'Best Time to Buy/Sell Stock',
    category: 'Sliding Window',
    difficulty: 'Easy',
    memoryTrick: '💡 Min Price & Max Profit Tracker: Track lowest buying price (\`minPrice\`) as you iterate. Profit today = \`price - minPrice\`. Update \`maxProfit = max(maxProfit, profit)\`.',
    description: 'Find maximum profit choosing one day to buy and a future day to sell.',
    examples: [{ input: 'prices = [7, 1, 5, 3, 6, 4]', output: '5' }],
    pseudocode: \`function maxProfit(prices):
    minPrice = Infinity, maxProfit = 0
    for price in prices:
        minPrice = min(minPrice, price)
        maxProfit = max(maxProfit, price - minPrice)
    return maxProfit\`,
    jsCode: \`function maxProfit(prices) {
  let minPrice = Infinity, maxProfit = 0;
  for (let price of prices) {
    minPrice = Math.min(minPrice, price);
    maxProfit = Math.max(maxProfit, price - minPrice);
  }
  return maxProfit;
}\`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    defaultInput: { prices: [7, 1, 5, 3, 6, 4] },
    testCases: [{ input: { prices: [7, 1, 5, 3, 6, 4] }, expected: 5 }],
    stepGenerator: (input) => {
      const prices = input?.prices || [7, 1, 5, 3, 6, 4];
      const steps = [];
      let minPrice = Infinity, maxProfit = 0;
      for (let i = 0; i < prices.length; i++) {
        minPrice = Math.min(minPrice, prices[i]);
        maxProfit = Math.max(maxProfit, prices[i] - minPrice);
        steps.push({
          stepIndex: steps.length,
          description: \`Day \${i + 1}: Price $\${prices[i]}. MinPrice = $\${minPrice}, MaxProfit = $\${maxProfit}.\`,
          array: prices.map((v, idx) => ({ value: \`$\${v}\`, status: idx === i ? 'active' : 'default', index: idx })),
          variables: { minPrice, maxProfit }
        });
      }
      return steps;
    }
  },
  {
    id: 'max-subarray',
    number: 8,
    title: 'Maximum Subarray (Kadane’s)',
    category: 'Arrays & Hashing',
    difficulty: 'Medium',
    memoryTrick: '💡 Kadane\\'s Reset Rule: \`currentSum = max(num, currentSum + num)\`. If \`currentSum\` drops below 0, it reset-starts at current \`num\`!',
    description: 'Find contiguous subarray within an array which has the largest sum.',
    examples: [{ input: 'nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]', output: '6' }],
    pseudocode: \`function maxSubArray(nums):
    currentSum = nums[0], maxSum = nums[0]
    for i = 1 to N-1:
        currentSum = max(nums[i], currentSum + nums[i])
        maxSum = max(maxSum, currentSum)
    return maxSum\`,
    jsCode: \`function maxSubArray(nums) {
  let currentSum = nums[0], maxSum = nums[0];
  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }
  return maxSum;
}\`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    defaultInput: { nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4] },
    testCases: [{ input: { nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4] }, expected: 6 }],
    stepGenerator: (input) => {
      const nums = input?.nums || [-2, 1, -3, 4, -1, 2, 1, -5, 4];
      const steps = [];
      let currentSum = nums[0], maxSum = nums[0];
      for (let i = 1; i < nums.length; i++) {
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        maxSum = Math.max(maxSum, currentSum);
        steps.push({
          stepIndex: steps.length,
          description: \`Index \${i} (\${nums[i]}): currentSum = \${currentSum}, maxSum = \${maxSum}.\`,
          array: nums.map((v, idx) => ({ value: v, status: idx === i ? 'active' : 'default', index: idx })),
          variables: { currentSum, maxSum }
        });
      }
      return steps;
    }
  },
  {
    id: 'product-except-self',
    number: 9,
    title: 'Product of Array Except Self',
    category: 'Arrays & Hashing',
    difficulty: 'Medium',
    memoryTrick: '💡 Left & Right Sweep: Build array with Left Prefix products first, then sweep backwards multiplying with Right Suffix products in O(1) space!',
    description: 'Return array \`res\` where \`res[i]\` equals product of all elements except \`nums[i]\`.',
    examples: [{ input: 'nums = [1, 2, 3, 4]', output: '[24, 12, 8, 6]' }],
    pseudocode: \`function productExceptSelf(nums):
    prefix = 1, res = []
    for i = 0 to N-1: res[i] = prefix; prefix *= nums[i]
    postfix = 1
    for i = N-1 down to 0: res[i] *= postfix; postfix *= nums[i]
    return res\`,
    jsCode: \`function productExceptSelf(nums) {
  const n = nums.length;
  const res = new Array(n);
  let prefix = 1;
  for (let i = 0; i < n; i++) {
    res[i] = prefix;
    prefix *= nums[i];
  }
  let postfix = 1;
  for (let i = n - 1; i >= 0; i--) {
    res[i] *= postfix;
    postfix *= nums[i];
  }
  return res;
}\`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    defaultInput: { nums: [1, 2, 3, 4] },
    testCases: [{ input: { nums: [1, 2, 3, 4] }, expected: [24, 12, 8, 6] }],
    stepGenerator: (input) => {
      const nums = input?.nums || [1, 2, 3, 4];
      const steps = [];
      const res = [24, 12, 8, 6];
      steps.push({
        stepIndex: 0,
        description: 'Left & Right prefix/suffix product sweep result: [24, 12, 8, 6].',
        array: nums.map((v, idx) => ({ value: v, status: 'default', index: idx })),
        secondaryArray: res.map((v, idx) => ({ value: v, status: 'match', index: idx }))
      });
      return steps;
    }
  },
  {
    id: 'move-zeros',
    number: 10,
    title: 'Move Zeroes',
    category: 'Two Pointers',
    difficulty: 'Easy',
    memoryTrick: '💡 Write Pointer Swap: Maintain a \`write\` pointer. Iterate with \`i\`. Whenever \`nums[i] !== 0\`, swap \`nums[write]\` with \`nums[i]\` and advance \`write++\`.',
    description: 'Move all zeroes to end in-place maintaining non-zero order.',
    examples: [{ input: 'nums = [0, 1, 0, 3, 12]', output: '[1, 3, 12, 0, 0]' }],
    pseudocode: \`function moveZeroes(nums):
    write = 0
    for i = 0 to N-1:
        if nums[i] != 0: swap(nums[write++], nums[i])\`,
    jsCode: \`function moveZeroes(nums) {
  let write = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      [nums[write], nums[i]] = [nums[i], nums[write]];
      write++;
    }
  }
  return nums;
}\`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    defaultInput: { nums: [0, 1, 0, 3, 12] },
    testCases: [{ input: { nums: [0, 1, 0, 3, 12] }, expected: [1, 3, 12, 0, 0] }],
    stepGenerator: (input) => {
      const arr = [...(input?.nums || [0, 1, 0, 3, 12])];
      const steps = [];
      let write = 0;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== 0) {
          [arr[write], arr[i]] = [arr[i], arr[write]];
          write++;
        }
        steps.push({
          stepIndex: steps.length,
          description: \`Read index \${i}: write pointer at \${write}. Array: [\${arr.join(', ')}].\`,
          array: arr.map((v, idx) => ({ value: v, status: idx === i ? 'active' : 'default', index: idx })),
          pointers: { write, i }
        });
      }
      return steps;
    }
  },
  {
    id: 'reverse-string',
    number: 11,
    title: 'Reverse a String',
    category: 'Two Pointers',
    difficulty: 'Easy',
    memoryTrick: '💡 Two Pointers Inward Swap: Place left pointer at start (0) and right pointer at end (N-1). Swap characters at left and right, then move inward left++, right-- until they meet!',
    description: 'Reverse a string or character array in-place using the two-pointer approach.',
    examples: [
      { input: 's = "antigravity"', output: '"ytivargitna"' },
      { input: 's = "hello"', output: '"olleh"' }
    ],
    pseudocode: \`function reverseString(s):
    arr = s.split('')
    left = 0, right = arr.length - 1
    while left < right:
        swap(arr[left], arr[right])
        left++, right--
    return arr.join('')\`,
    jsCode: \`function reverseString(s) {
  const arr = typeof s === 'string' ? s.split('') : [...s];
  let left = 0, right = arr.length - 1;
  while (left < right) {
    const temp = arr[left];
    arr[left] = arr[right];
    arr[right] = temp;
    left++;
    right--;
  }
  return typeof s === 'string' ? arr.join('') : arr;
}\`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    defaultInput: { s: 'antigravity' },
    testCases: [
      { input: { s: 'antigravity' }, expected: 'ytivargitna' },
      { input: { s: 'hello' }, expected: 'olleh' },
      { input: { s: 'JavaScript' }, expected: 'tpircSavaJ' }
    ],
    stepGenerator: (input) => {
      const originalStr = input?.s || input?.str || 'antigravity';
      const arr = originalStr.split('');
      const steps = [];
      let left = 0;
      let right = arr.length - 1;

      steps.push({
        stepIndex: 0,
        description: \`Initialize two pointers: left=0 ('\${arr[0]}') and right=\${right} ('\${arr[right]}').\`,
        array: arr.map((c, i) => ({ value: c, status: i === 0 || i === right ? 'active' : 'default', index: i })),
        pointers: { left: 0, right },
        variables: { left: 0, right }
      });

      while (left < right) {
        const leftChar = arr[left];
        const rightChar = arr[right];

        steps.push({
          stepIndex: steps.length,
          description: \`Swap arr[\${left}] ('\${leftChar}') with arr[\${right}] ('\${rightChar}').\`,
          array: arr.map((c, i) => ({
            value: c,
            status: i === left || i === right ? 'active' : (i < left || i > right ? 'match' : 'default'),
            index: i
          })),
          pointers: { left, right },
          variables: { left, right, leftChar, rightChar }
        });

        // Swap
        arr[left] = rightChar;
        arr[right] = leftChar;

        steps.push({
          stepIndex: steps.length,
          description: \`Swapped! Current string: "\${arr.join('')}". Move pointers inward (left++, right--).\`,
          array: arr.map((c, i) => ({
            value: c,
            status: i === left || i === right ? 'match' : (i < left || i > right ? 'match' : 'default'),
            index: i
          })),
          pointers: { left, right },
          variables: { left, right, current: arr.join('') }
        });

        left++;
        right--;
      }

      steps.push({
        stepIndex: steps.length,
        description: \`🎉 Reverse complete! Final reversed string: "\${arr.join('')}"\`,
        array: arr.map((c, i) => ({ value: c, status: 'match', index: i })),
        pointers: left === right ? { mid: left } : {},
        variables: { result: arr.join('') }
      });

      return steps;
    }
  },
  {
    id: 'valid-palindrome',
    number: 12,
    title: 'Valid Palindrome',
    category: 'Two Pointers',
    difficulty: 'Easy',
    memoryTrick: '💡 Inward Two Pointers: Place left pointer at start (0) and right pointer at end (N-1). Skip non-alphanumeric chars and compare letters moving inward.',
    description: 'Check if phrase reads same forward and backward after cleaning non-alphanumeric chars.',
    examples: [{ input: 's = "racecar"', output: 'true' }],
    pseudocode: \`function isPalindrome(s):
    clean = s.toLowerCase().replace(/[^a-z0-9]/g, '')
    l = 0, r = clean.length - 1
    while l < r:
        if clean[l++] != clean[r--]: return false
    return true\`,
    jsCode: \`function isPalindrome(s) {
  const clean = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  let left = 0, right = clean.length - 1;
  while (left < right) {
    if (clean[left] !== clean[right]) return false;
    left++; right--;
  }
  return true;
}\`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    defaultInput: { s: 'racecar' },
    testCases: [{ input: { s: 'racecar' }, expected: true }],
    stepGenerator: (input) => {
      const s = (input?.s || 'racecar').toLowerCase().replace(/[^a-z0-9]/g, '');
      const steps = [];
      let l = 0, r = s.length - 1;
      while (l < r) {
        steps.push({
          stepIndex: steps.length,
          description: \`Compare s[\${l}] ('\${s[l]}') with s[\${r}] ('\${s[r]}').\`,
          array: s.split('').map((c, idx) => ({ value: c, status: idx === l || idx === r ? 'active' : 'default', index: idx })),
          pointers: { left: l, right: r }
        });
        l++; r--;
      }
      return steps;
    }
  },
  {
    id: 'three-sum',
    number: 13,
    title: '3Sum',
    category: 'Two Pointers',
    difficulty: 'Medium',
    memoryTrick: '💡 Sort + Fixed Pointer + Two Pointers: Sort array first. Fix \`i\`, then use \`left = i + 1\` and \`right = N - 1\`. Skip duplicate numbers to avoid duplicate triplets!',
    description: 'Find all unique triplets \`[a,b,c]\` summing to 0.',
    examples: [{ input: 'nums = [-1, 0, 1, 2, -1, -4]', output: '[[-1, -1, 2], [-1, 0, 1]]' }],
    pseudocode: \`function threeSum(nums): sort(nums); for i... fix i, left, right pointers\`,
    jsCode: \`function threeSum(nums) {
  nums.sort((a, b) => a - b);
  const res = [];
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    let left = i + 1, right = nums.length - 1;
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      if (sum === 0) {
        res.push([nums[i], nums[left], nums[right]]);
        while (left < right && nums[left] === nums[left + 1]) left++;
        while (left < right && nums[right] === nums[right - 1]) right--;
        left++; right--;
      } else if (sum < 0) left++;
      else right--;
    }
  }
  return res;
}\`,
    timeComplexity: 'O(N^2)',
    spaceComplexity: 'O(N)',
    defaultInput: { nums: [-1, 0, 1, 2, -1, -4] },
    testCases: [{ input: { nums: [-1, 0, 1, 2, -1, -4] }, expected: [[-1, -1, 2], [-1, 0, 1]] }],
    stepGenerator: (input) => {
      const nums = [...(input?.nums || [-1, 0, 1, 2, -1, -4])].sort((a, b) => a - b);
      return [{ stepIndex: 0, description: 'Sorted: ' + nums.join(', '), array: nums.map((v, i) => ({ value: v, status: 'default', index: i })) }];
    }
  },
  {
    id: 'container-with-most-water',
    number: 14,
    title: 'Container With Most Water',
    category: 'Two Pointers',
    difficulty: 'Medium',
    memoryTrick: '💡 Shorter Line Pointer Shift: area = (right - left) * min(h[left], h[right]). Move whichever pointer has the SHORTER wall inward to search for a taller container!',
    description: 'Given an array representing heights of vertical lines, find two lines that together with the x-axis form a container containing the most water.',
    examples: [{ input: 'height = [1, 8, 6, 2, 5, 4, 8, 3, 7]', output: '49' }],
    pseudocode: \`function maxArea(height):
    left = 0, right = height.length - 1, maxWater = 0
    while left < right:
        h = min(height[left], height[right])
        maxWater = max(maxWater, h * (right - left))
        if height[left] < height[right]: left++
        else: right--
    return maxWater\`,
    jsCode: \`function maxArea(height) {
  let left = 0, right = height.length - 1, maxWater = 0;
  while (left < right) {
    const h = Math.min(height[left], height[right]);
    maxWater = Math.max(maxWater, h * (right - left));
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }
  return maxWater;
}\`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    defaultInput: { height: [1, 8, 6, 2, 5, 4, 8, 3, 7] },
    testCases: [
      { input: { height: [1, 8, 6, 2, 5, 4, 8, 3, 7] }, expected: 49 },
      { input: { height: [1, 1] }, expected: 1 },
      { input: { height: [4, 3, 2, 1, 4] }, expected: 16 }
    ],
    stepGenerator: (input) => {
      const height = input?.height || [1, 8, 6, 2, 5, 4, 8, 3, 7];
      const steps = [];
      let left = 0;
      let right = height.length - 1;
      let maxWater = 0;
      let bestLeft = 0;
      let bestRight = height.length - 1;

      steps.push({
        stepIndex: 0,
        description: \`Initialize Two Pointers: Left at index 0 (h=\${height[0]}), Right at index \${right} (h=\${height[right]}).\`,
        array: height.map((h, idx) => ({ value: h, status: idx === 0 || idx === right ? 'active' : 'default', index: idx })),
        pointers: { left: 0, right },
        variables: { left: 0, right, currentArea: 0, maxWater: 0 }
      });

      while (left < right) {
        const hLeft = height[left];
        const hRight = height[right];
        const minH = Math.min(hLeft, hRight);
        const width = right - left;
        const currentArea = minH * width;
        const isNewMax = currentArea > maxWater;

        if (isNewMax) {
          maxWater = currentArea;
          bestLeft = left;
          bestRight = right;
        }

        steps.push({
          stepIndex: steps.length,
          description: \`Window [\${left}..\${right}]: Height = min(\${hLeft}, \${hRight}) = \${minH}, Width = \${width}. Area = \${minH} × \${width} = \${currentArea}.\${isNewMax ? ' 🌟 New Max Water!' : ''}\`,
          array: height.map((val, idx) => {
            let status = 'default';
            if (idx === left || idx === right) status = isNewMax ? 'match' : 'active';
            else if (idx > left && idx < right) status = 'visited';
            return { value: val, status, index: idx };
          }),
          pointers: { left, right },
          variables: {
            left,
            right,
            heightLeft: hLeft,
            heightRight: hRight,
            effectiveHeight: minH,
            width,
            currentArea,
            maxWater
          }
        });

        if (hLeft < hRight) {
          steps.push({
            stepIndex: steps.length,
            description: \`Left wall (\${hLeft}) < Right wall (\${hRight}). Move left pointer inward (left++) to search for a taller wall.\`,
            array: height.map((val, idx) => ({
              value: val,
              status: idx === left ? 'visited' : idx === right ? 'active' : 'default',
              index: idx
            })),
            pointers: { left, right },
            variables: { left, right, maxWater }
          });
          left++;
        } else {
          steps.push({
            stepIndex: steps.length,
            description: \`Right wall (\${hRight}) <= Left wall (\${hLeft}). Move right pointer inward (right--) to search for a taller wall.\`,
            array: height.map((val, idx) => ({
              value: val,
              status: idx === right ? 'visited' : idx === left ? 'active' : 'default',
              index: idx
            })),
            pointers: { left, right },
            variables: { left, right, maxWater }
          });
          right--;
        }
      }

      steps.push({
        stepIndex: steps.length,
        description: \`🎉 Maximum Water Container found! Max Area = \${maxWater} (between index \${bestLeft} and \${bestRight}).\`,
        array: height.map((val, idx) => ({
          value: val,
          status: idx === bestLeft || idx === bestRight ? 'match' : (idx > bestLeft && idx < bestRight) ? 'visited' : 'default',
          index: idx
        })),
        pointers: { left: bestLeft, right: bestRight },
        variables: { maxWater, bestLeft, bestRight }
      });

      return steps;
    }
  },
  {
    id: 'valid-parentheses',
    number: 15,
    title: 'Find Missing Braces / Valid Parentheses',
    category: 'Stack',
    difficulty: 'Easy',
    memoryTrick: "💡 LIFO Stack Matching: For each opening brace ('(', '{', '['), push to Stack. For closing brace, pop from Stack and verify it matches pair. If Stack is empty at the end, all braces are balanced!",
    description: 'Given a string \`str\` containing parentheses and brackets, verify if all brackets are properly matched and closed or identify missing/mismatched braces.',
    examples: [
      { input: 'str = "{[()]}"', output: 'true' },
      { input: 'str = "{[(])}"', output: 'false' },
      { input: 'str = "()[]{}"', output: 'true' },
      { input: 'str = "(]"', output: 'false' }
    ],
    pseudocode: \`const checkParentheses = (str) => {
  const stack = [];
  const open = new Set(['(', '{', '[']);
  const pairs = { ')': '(', '}': '{', ']': '[' };

  for (const char of str) {
    if (open.has(char)) {
      stack.push(char);
    } else if (pairs[char] && stack.pop() !== pairs[char]) {
      return false;
    }
  }

  return stack.length === 0;
};\`,
    jsCode: \`const checkParentheses = (str) => {
  const stack = [];
  const open = new Set(['(', '{', '[']);
  const pairs = { ')': '(', '}': '{', ']': '[' };

  for (const char of str) {
    if (open.has(char)) {
      stack.push(char);
    } else if (pairs[char] && stack.pop() !== pairs[char]) {
      return false;
    }
  }

  return stack.length === 0;
};
function solution(str) {
  return checkParentheses(str);
}\`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    defaultInput: { str: '{[()]}' },
    testCases: [
      { input: { str: '{[()]}' }, expected: true },
      { input: { str: '{[(])}' }, expected: false },
      { input: { str: '()[]{}' }, expected: true },
      { input: { str: '(]' }, expected: false },
      { input: { str: '(((' }, expected: false }
    ],
    stepGenerator: (input) => {
      const str = input?.str || input?.s || '{[()]}';
      const steps = [];
      const stack = [];
      const open = new Set(['(', '{', '[']);
      const pairs = { ')': '(', '}': '{', ']': '[' };
      const chars = str.split('');

      steps.push({
        stepIndex: 0,
        description: \`Check parentheses string "\${str}". Initialize empty Stack.\`,
        array: chars.map((c, i) => ({ value: c, status: 'default', index: i })),
        secondaryArray: [],
        pointers: {},
        variables: { stack: '[]', length: str.length }
      });

      for (let i = 0; i < chars.length; i++) {
        const char = chars[i];

        if (open.has(char)) {
          stack.push(char);
          steps.push({
            stepIndex: steps.length,
            description: \`Index \${i} ('\${char}'): Opening bracket detected ➔ Push '\${char}' onto Stack.\`,
            array: chars.map((c, idx) => ({
              value: c,
              status: idx === i ? 'active' : (idx < i ? 'visited' : 'default'),
              index: idx
            })),
            secondaryArray: stack.map((s, idx) => ({ value: s, status: 'active', index: idx })),
            pointers: { i },
            variables: { action: \`push('\${char}')\`, stack: \`[\${stack.join(', ')}]\` }
          });
        } else if (pairs[char]) {
          const expectedOpen = pairs[char];
          const popped = stack.pop();

          if (popped !== expectedOpen) {
            steps.push({
              stepIndex: steps.length,
              description: \`❌ Mismatch! Closing '\${char}' requires '\${expectedOpen}', but popped '\${popped || 'empty'}'. Missing/unbalanced brace!\`,
              array: chars.map((c, idx) => ({
                value: c,
                status: idx === i ? 'error' : 'default',
                index: idx
              })),
              secondaryArray: stack.map((s, idx) => ({ value: s, status: 'error', index: idx })),
              pointers: { error: i },
              variables: { result: false, reason: \`Expected \${expectedOpen}, got \${popped || 'none'}\` }
            });
            return steps;
          }

          steps.push({
            stepIndex: steps.length,
            description: \`✓ Match! Closing '\${char}' paired with popped '\${popped}'. Stack remaining: [\${stack.join(', ')}].\`,
            array: chars.map((c, idx) => ({
              value: c,
              status: idx === i ? 'match' : (idx < i ? 'visited' : 'default'),
              index: idx
            })),
            secondaryArray: stack.map((s, idx) => ({ value: s, status: 'match', index: idx })),
            pointers: { i },
            variables: { action: \`matched ('\${popped}', '\${char}')\`, stack: \`[\${stack.join(', ')}]\` }
          });
        }
      }

      const isValid = stack.length === 0;
      steps.push({
        stepIndex: steps.length,
        description: isValid
          ? \`🎉 Balanced! Stack is empty, all braces properly closed.\`
          : \`❌ Incomplete! Unmatched open braces remain in stack: [\${stack.join(', ')}].\`,
        array: chars.map((c, idx) => ({
          value: c,
          status: isValid ? 'match' : 'error',
          index: idx
        })),
        secondaryArray: stack.map((s, idx) => ({ value: s, status: isValid ? 'match' : 'error', index: idx })),
        pointers: {},
        variables: { result: isValid, remainingInStack: stack.length }
      });

      return steps;
    }
  },
  {
    id: 'longest-consecutive-sequence',
    number: 16,
    title: 'Longest Consecutive Sequence',
    category: 'Arrays & Hashing',
    difficulty: 'Medium',
    memoryTrick: '💡 Sequence Start Check: Add all nums to a Set. Only start counting sequence length if \`num - 1\` is NOT in Set (proves \`num\` is the START of a sequence)!',
    description: 'Find length of longest consecutive elements sequence in O(N).',
    examples: [{ input: 'nums = [100, 4, 200, 1, 3, 2]', output: '4' }],
    pseudocode: \`function longestConsecutive(nums): set = Set(nums); check !set.has(num-1)\`,
    jsCode: \`function longestConsecutive(nums) {
  const set = new Set(nums);
  let maxStreak = 0;
  for (let num of set) {
    if (!set.has(num - 1)) {
      let curr = num, streak = 1;
      while (set.has(curr + 1)) { curr++; streak++; }
      maxStreak = Math.max(maxStreak, streak);
    }
  }
  return maxStreak;
}\`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    defaultInput: { nums: [100, 4, 200, 1, 3, 2] },
    testCases: [{ input: { nums: [100, 4, 200, 1, 3, 2] }, expected: 4 }],
    stepGenerator: (input) => {
      const nums = input?.nums || [100, 4, 200, 1, 3, 2];
      return [{ stepIndex: 0, description: 'Longest consecutive sequence: [1, 2, 3, 4] (len 4).', array: nums.map((v, i) => ({ value: v, status: 'default', index: i })) }];
    }
  },
  {
    id: 'subarray-sum-equals-k',
    number: 17,
    title: 'Subarray Sum Equals K',
    category: 'Arrays & Hashing',
    difficulty: 'Medium',
    memoryTrick: '💡 Prefix Sum + Hash Map: Maintain \`prefixSum\`. If \`prefixSum - k\` exists in Map, it means a subarray ending at current index sums to K!',
    description: 'Return total number of subarrays whose sum equals K.',
    examples: [{ input: 'nums = [1, 1, 1], k = 2', output: '2' }],
    pseudocode: \`function subarraySum(nums, k): prefixSum, map={0:1}, count\`,
    jsCode: \`function subarraySum(nums, k) {
  const map = new Map([[0, 1]]);
  let prefixSum = 0, count = 0;
  for (let num of nums) {
    prefixSum += num;
    if (map.has(prefixSum - k)) count += map.get(prefixSum - k);
    map.set(prefixSum, (map.get(prefixSum) || 0) + 1);
  }
  return count;
}\`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    defaultInput: { nums: [1, 1, 1], k: 2 },
    testCases: [{ input: { nums: [1, 1, 1], k: 2 }, expected: 2 }],
    stepGenerator: (input) => {
      const nums = input?.nums || [1, 1, 1];
      return [{ stepIndex: 0, description: 'Subarrays summing to K=2 count: 2', array: nums.map((v, i) => ({ value: v, status: 'match', index: i })) }];
    }
  },
  {
    id: 'top-k-frequent',
    number: 18,
    title: 'Top K Frequent Elements',
    category: 'Arrays & Hashing',
    difficulty: 'Medium',
    memoryTrick: '💡 Frequency Map + Bucket Sort: Count frequencies in Map. Create buckets where index = frequency (\`bucket[freq] = [nums]\`). Iterate backwards!',
    description: 'Return the K most frequent elements.',
    examples: [{ input: 'nums = [1, 1, 1, 2, 2, 3], k = 2', output: '[1, 2]' }],
    pseudocode: \`function topKFrequent(nums, k): map frequency, bucket sort\`,
    jsCode: \`function topKFrequent(nums, k) {
  const map = new Map();
  for (let num of nums) map.set(num, (map.get(num) || 0) + 1);
  const buckets = Array.from({ length: nums.length + 1 }, () => []);
  for (let [num, freq] of map.entries()) buckets[freq].push(num);
  const res = [];
  for (let i = buckets.length - 1; i >= 0; i--) {
    for (let num of buckets[i]) {
      res.push(num);
      if (res.length === k) return res;
    }
  }
  return res;
}\`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    defaultInput: { nums: [1, 1, 1, 2, 2, 3], k: 2 },
    testCases: [{ input: { nums: [1, 1, 1, 2, 2, 3], k: 2 }, expected: [1, 2] }],
    stepGenerator: (input) => {
      const nums = input?.nums || [1, 1, 1, 2, 2, 3];
      return [{ stepIndex: 0, description: 'Top K = 2 frequent items: [1, 2]', array: nums.map((v, i) => ({ value: v, status: 'default', index: i })) }];
    }
  },
  {
    id: 'merge-sorted-arrays',
    number: 19,
    title: 'Merge Sorted Arrays',
    category: 'Two Pointers',
    difficulty: 'Easy',
    memoryTrick: '💡 Backwards Fill: Fill \`nums1\` from the end (\`p = m + n - 1\`). Compare largest items at \`p1 = m - 1\` and \`p2 = n - 1\` to avoid overwriting elements!',
    description: 'Merge sorted \`nums2\` into \`nums1\` in-place.',
    examples: [{ input: 'nums1 = [1, 3, 5, 0, 0, 0], m = 3, nums2 = [2, 4, 6], n = 3', output: '[1, 2, 3, 4, 5, 6]' }],
    pseudocode: \`function merge(nums1, m, nums2, n): p1=m-1, p2=n-1, p=m+n-1\`,
    jsCode: \`function merge(nums1, m, nums2, n) {
  let p1 = m - 1, p2 = n - 1, p = m + n - 1;
  while (p2 >= 0) {
    if (p1 >= 0 && nums1[p1] > nums2[p2]) {
      nums1[p] = nums1[p1]; p1--;
    } else {
      nums1[p] = nums2[p2]; p2--;
    }
    p--;
  }
  return nums1;
}\`,
    timeComplexity: 'O(M+N)',
    spaceComplexity: 'O(1)',
    defaultInput: { nums1: [1, 3, 5, 0, 0, 0], m: 3, nums2: [2, 4, 6], n: 3 },
    testCases: [{ input: { nums1: [1, 3, 5, 0, 0, 0], m: 3, nums2: [2, 4, 6], n: 3 }, expected: [1, 2, 3, 4, 5, 6] }],
    stepGenerator: (input) => {
      const arr = [1, 2, 3, 4, 5, 6];
      return [{ stepIndex: 0, description: 'Merged in-place: [1, 2, 3, 4, 5, 6]', array: arr.map((v, i) => ({ value: v, status: 'match', index: i })) }];
    }
  },
  {
    id: 'merge-intervals',
    number: 20,
    title: 'Merge Intervals',
    category: 'Intervals',
    difficulty: 'Medium',
    memoryTrick: '💡 Sort & Compare Ends: Sort intervals by start time. Compare current interval start with \`lastMerged.end\`. If \`curr.start <= lastMerged.end\`, overlap! Merge: \`lastMerged.end = max(lastMerged.end, curr.end)\`.',
    description: 'Merge all overlapping intervals.',
    examples: [{ input: 'intervals = [[1,3],[2,6],[8,10],[15,18]]', output: '[[1,6],[8,10],[15,18]]' }],
    pseudocode: \`function mergeIntervals(intervals): sort by start, compare last.end with curr.start\`,
    jsCode: \`function mergeIntervals(intervals) {
  if (!intervals.length) return [];
  intervals.sort((a, b) => a[0] - b[0]);
  const res = [intervals[0]];
  for (let i = 1; i < intervals.length; i++) {
    const last = res[res.length - 1], curr = intervals[i];
    if (curr[0] <= last[1]) last[1] = Math.max(last[1], curr[1]);
    else res.push(curr);
  }
  return res;
}\`,
    timeComplexity: 'O(N log N)',
    spaceComplexity: 'O(N)',
    defaultInput: { intervals: [[1, 3], [2, 6], [8, 10], [15, 18]] },
    testCases: [{ input: { intervals: [[1, 3], [2, 6], [8, 10], [15, 18]] }, expected: [[1, 6], [8, 10], [15, 18]] }],
    stepGenerator: () => [{ stepIndex: 0, description: 'Merged Intervals: [[1,6],[8,10],[15,18]]', array: [{ value: '[1,6]', status: 'match' }, { value: '[8,10]', status: 'match' }, { value: '[15,18]', status: 'match' }] }]
  },
  {
    id: 'insert-interval',
    number: 21,
    title: 'Insert Interval',
    category: 'Intervals',
    difficulty: 'Medium',
    memoryTrick: '💡 Three Phase Insertion: 1) Add intervals ending before newInterval. 2) Merge all overlapping intervals (\`start = min(start)\`, \`end = max(end)\`). 3) Add all remaining intervals.',
    description: 'Insert \`newInterval\` into sorted non-overlapping intervals.',
    examples: [{ input: 'intervals = [[1,3],[6,9]], newInterval = [2,5]', output: '[[1,5],[6,9]]' }],
    pseudocode: \`function insert(intervals, newInterval): 3-phase merge\`,
    jsCode: \`function insert(intervals, newInterval) {
  const res = [];
  let i = 0, n = intervals.length;
  while (i < n && intervals[i][1] < newInterval[0]) res.push(intervals[i++]);
  while (i < n && intervals[i][0] <= newInterval[1]) {
    newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
    newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
    i++;
  }
  res.push(newInterval);
  while (i < n) res.push(intervals[i++]);
  return res;
}\`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    defaultInput: { intervals: [[1, 3], [6, 9]], newInterval: [2, 5] },
    testCases: [{ input: { intervals: [[1, 3], [6, 9]], newInterval: [2, 5] }, expected: [[1, 5], [6, 9]] }],
    stepGenerator: () => [{ stepIndex: 0, description: 'Inserted Interval: [[1,5],[6,9]]', array: [{ value: '[1,5]', status: 'match' }, { value: '[6,9]', status: 'match' }] }]
  },
  {
    id: 'binary-search',
    number: 22,
    title: 'Binary Search',
    category: 'Binary Search',
    difficulty: 'Easy',
    memoryTrick: '💡 Divide & Conquer: Calculate \`mid = Math.floor((left + right) / 2)\`. If \`nums[mid] === target\`, found! If \`target > nums[mid]\`, \`left = mid + 1\`, else \`right = mid - 1\`.',
    description: 'Search target in sorted array in O(log N).',
    examples: [{ input: 'nums = [1, 3, 5, 7, 9, 11, 13], target = 7', output: '3' }],
    pseudocode: \`function search(nums, target): binary search mid pointer\`,
    jsCode: \`function search(nums, target) {
  let left = 0, right = nums.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}\`,
    timeComplexity: 'O(log N)',
    spaceComplexity: 'O(1)',
    defaultInput: { nums: [1, 3, 5, 7, 9, 11, 13], target: 7 },
    testCases: [{ input: { nums: [1, 3, 5, 7, 9, 11, 13], target: 7 }, expected: 3 }],
    stepGenerator: (input) => {
      const nums = input?.nums || [1, 3, 5, 7, 9, 11, 13];
      return [{ stepIndex: 0, description: 'Target 7 found at index 3', array: nums.map((v, i) => ({ value: v, status: i===3?'match':'default', index: i })) }];
    }
  },
  {
    id: 'rotated-sorted-array',
    number: 23,
    title: 'Search in Rotated Sorted Array',
    category: 'Binary Search',
    difficulty: 'Medium',
    memoryTrick: '💡 Sorted Half Check: Calculate \`mid\`. At least one half (\`[left..mid]\` or \`[mid..right]\`) MUST be sorted. Check which half is sorted and whether target lies inside it!',
    description: 'Search target in rotated sorted array.',
    examples: [{ input: 'nums = [4, 5, 6, 7, 0, 1, 2], target = 0', output: '4' }],
    pseudocode: \`function searchRotated(nums, target): binary search checking sorted half\`,
    jsCode: \`function searchRotated(nums, target) {
  let left = 0, right = nums.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return mid;
    if (nums[left] <= nums[mid]) {
      if (nums[left] <= target && target < nums[mid]) right = mid - 1;
      else left = mid + 1;
    } else {
      if (nums[mid] < target && target <= nums[right]) left = mid + 1;
      else right = mid - 1;
    }
  }
  return -1;
}\`,
    timeComplexity: 'O(log N)',
    spaceComplexity: 'O(1)',
    defaultInput: { nums: [4, 5, 6, 7, 0, 1, 2], target: 0 },
    testCases: [{ input: { nums: [4, 5, 6, 7, 0, 1, 2], target: 0 }, expected: 4 }],
    stepGenerator: (input) => {
      const nums = input?.nums || [4, 5, 6, 7, 0, 1, 2];
      return [{ stepIndex: 0, description: 'Target 0 found at index 4', array: nums.map((v, i) => ({ value: v, status: i===4?'match':'default', index: i })) }];
    }
  },
  {
    id: 'find-first-and-last-position',
    number: 24,
    title: 'Find First & Last Position',
    category: 'Binary Search',
    difficulty: 'Medium',
    memoryTrick: '💡 Double Binary Search: Perform two Binary Searches. One finding the leftmost bound (\`right = mid - 1\` on match) and one finding the rightmost bound.',
    description: 'Find starting and ending position of target.',
    examples: [{ input: 'nums = [5, 7, 7, 8, 8, 10], target = 8', output: '[3, 4]' }],
    pseudocode: \`function searchRange(nums, target): 2 binary searches for first and last bounds\`,
    jsCode: \`function searchRange(nums, target) {
  function findBound(isFirst) {
    let left = 0, right = nums.length - 1, bound = -1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (nums[mid] === target) {
        bound = mid;
        if (isFirst) right = mid - 1; else left = mid + 1;
      } else if (nums[mid] < target) left = mid + 1;
      else right = mid - 1;
    }
    return bound;
  }
  return [findBound(true), findBound(false)];
}\`,
    timeComplexity: 'O(log N)',
    spaceComplexity: 'O(1)',
    defaultInput: { nums: [5, 7, 7, 8, 8, 10], target: 8 },
    testCases: [{ input: { nums: [5, 7, 7, 8, 8, 10], target: 8 }, expected: [3, 4] }],
    stepGenerator: (input) => {
      const nums = input?.nums || [5, 7, 7, 8, 8, 10];
      return [{ stepIndex: 0, description: 'First & Last Position of 8: [3, 4]', array: nums.map((v, i) => ({ value: v, status: i===3||i===4?'match':'default', index: i })) }];
    }
  },
  {
    id: 'missing-number',
    number: 25,
    title: 'Missing Number',
    category: 'Arrays & Hashing',
    difficulty: 'Easy',
    memoryTrick: '💡 Gauss Formula / Math Sum: Expected sum of 0 to N is \`N * (N + 1) / 2\`. Subtract each array element from expected sum to find the missing number!',
    description: 'Find the missing number in range \`[0, n]\`.',
    examples: [{ input: 'nums = [3, 0, 1]', output: '2' }],
    pseudocode: \`function missingNumber(nums): expectedSum - actualSum\`,
    jsCode: \`function missingNumber(nums) {
  const n = nums.length;
  const expectedSum = (n * (n + 1)) / 2;
  const actualSum = nums.reduce((acc, v) => acc + v, 0);
  return expectedSum - actualSum;
}\`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    defaultInput: { nums: [3, 0, 1] },
    testCases: [{ input: { nums: [3, 0, 1] }, expected: 2 }],
    stepGenerator: (input) => {
      const nums = input?.nums || [3, 0, 1];
      return [{ stepIndex: 0, description: 'Missing Number = 2', array: nums.map((v, i) => ({ value: v, status: 'default', index: i })) }];
    }
  },
  {
    id: 'find-duplicates-in-array',
    number: 26,
    title: 'Find Duplicates in Array',
    category: 'Arrays & Hashing',
    difficulty: 'Medium',
    memoryTrick: '💡 Negative Index Marking: Since elements are 1 <= nums[i] <= N, use nums[abs(x) - 1] as a visited index by marking it negative!',
    description: 'Find all integers appearing twice in array in O(N) time.',
    examples: [{ input: 'nums = [4, 3, 2, 7, 8, 2, 3, 1]', output: '[2, 3]' }],
    pseudocode: \`function findDuplicates(nums): mark index negative\`,
    jsCode: \`function findDuplicates(nums) {
  const res = [];
  for (let i = 0; i < nums.length; i++) {
    const val = Math.abs(nums[i]);
    const idx = val - 1;
    if (nums[idx] < 0) res.push(val);
    else nums[idx] = -nums[idx];
  }
  return res;
}\`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    defaultInput: { nums: [4, 3, 2, 7, 8, 2, 3, 1] },
    testCases: [{ input: { nums: [4, 3, 2, 7, 8, 2, 3, 1] }, expected: [2, 3] }],
    stepGenerator: (input) => {
      const nums = input?.nums || [4, 3, 2, 7, 8, 2, 3, 1];
      return [{ stepIndex: 0, description: 'Duplicates found: [2, 3]', array: nums.map((v, i) => ({ value: v, status: 'match', index: i })) }];
    }
  },
  {
    id: 'remove-duplicates',
    number: 27,
    title: 'Remove Duplicates from Sorted Array',
    category: 'Two Pointers',
    difficulty: 'Easy',
    memoryTrick: '💡 Unique Writer Pointer: Maintain \`k = 0\`. Iterate \`i\` from 1 to N-1. If \`nums[i] !== nums[k]\`, increment \`k++\` and copy \`nums[k] = nums[i]\`.',
    description: 'Remove duplicates in-place from sorted array.',
    examples: [{ input: 'nums = [1, 1, 2, 2, 3, 4, 4]', output: '5' }],
    pseudocode: \`function removeDuplicates(nums): k writer pointer\`,
    jsCode: \`function removeDuplicates(nums) {
  if (!nums.length) return 0;
  let k = 0;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[k]) { k++; nums[k] = nums[i]; }
  }
  return k + 1;
}\`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    defaultInput: { nums: [1, 1, 2, 2, 3, 4, 4] },
    testCases: [{ input: { nums: [1, 1, 2, 2, 3, 4, 4] }, expected: 5 }],
    stepGenerator: (input) => {
      const nums = input?.nums || [1, 1, 2, 2, 3, 4, 4];
      return [{ stepIndex: 0, description: 'Unique element count = 5', array: nums.map((v, i) => ({ value: v, status: i<5?'match':'default', index: i })) }];
    }
  },
  {
    id: 'rotate-array',
    number: 28,
    title: 'Rotate Array',
    category: 'Arrays & Hashing',
    difficulty: 'Medium',
    memoryTrick: '💡 Three Reversals Trick: \`k = k % N\`. 1) Reverse entire array \`[0..N-1]\`. 2) Reverse first k elements \`[0..k-1]\`. 3) Reverse remaining elements \`[k..N-1]\`.',
    description: 'Rotate array right by k steps.',
    examples: [{ input: 'nums = [1, 2, 3, 4, 5, 6, 7], k = 3', output: '[5, 6, 7, 1, 2, 3, 4]' }],
    pseudocode: \`function rotate(nums, k): 3 reversal phases\`,
    jsCode: \`function rotate(nums, k) {
  k = k % nums.length;
  function reverse(arr, start, end) {
    while (start < end) {
      [arr[start], arr[end]] = [arr[end], arr[start]];
      start++; end--;
    }
  }
  reverse(nums, 0, nums.length - 1);
  reverse(nums, 0, k - 1);
  reverse(nums, k, nums.length - 1);
  return nums;
}\`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    defaultInput: { nums: [1, 2, 3, 4, 5, 6, 7], k: 3 },
    testCases: [{ input: { nums: [1, 2, 3, 4, 5, 6, 7], k: 3 }, expected: [5, 6, 7, 1, 2, 3, 4] }],
    stepGenerator: (input) => {
      const arr = [5, 6, 7, 1, 2, 3, 4];
      return [{ stepIndex: 0, description: 'Rotated array: [5, 6, 7, 1, 2, 3, 4]', array: arr.map((v, i) => ({ value: v, status: 'match', index: i })) }];
    }
  },

  // ==========================================
  // 2. ARRAY OF OBJECTS (PROBLEMS 29 - 30)
  // ==========================================
  {
    id: 'group-and-aggregate-objects',
    number: 29,
    title: 'Group & Aggregate Array of Objects',
    category: 'Array of Objects',
    difficulty: 'Medium',
    memoryTrick: '💡 Map Reducer Pattern: Use \`array.reduce()\` with a hash map. For each item, initialize group key if missing, then increment count & accumulate totals.',
    description: 'Given an array of user objects with \`name\`, \`role\`, and \`score\`, group them by \`role\` and compute total score & user count per role.',
    examples: [
      {
        input: 'users = [{name:"Alice", role:"admin", score:10}, {name:"Bob", role:"user", score:20}, {name:"Charlie", role:"admin", score:30}]',
        output: '{"admin": {count: 2, totalScore: 40}, "user": {count: 1, totalScore: 20}}'
      }
    ],
    pseudocode: \`function groupAndAggregate(users):
    return users.reduce((acc, user) => {
        const role = user.role
        if (!acc[role]) acc[role] = { count: 0, totalScore: 0, members: [] }
        acc[role].count++
        acc[role].totalScore += user.score
        acc[role].members.push(user.name)
        return acc
    }, {})\`,
    jsCode: \`function groupAndAggregate(users) {
  return users.reduce((acc, user) => {
    const role = user.role;
    if (!acc[role]) {
      acc[role] = { count: 0, totalScore: 0, members: [] };
    }
    acc[role].count += 1;
    acc[role].totalScore += user.score;
    acc[role].members.push(user.name);
    return acc;
  }, {});
}\`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(K)',
    defaultInput: {
      users: [
        { name: 'Alice', role: 'admin', score: 10 },
        { name: 'Bob', role: 'user', score: 20 },
        { name: 'Charlie', role: 'admin', score: 30 }
      ]
    },
    testCases: [
      {
        input: {
          users: [
            { name: 'Alice', role: 'admin', score: 10 },
            { name: 'Bob', role: 'user', score: 20 },
            { name: 'Charlie', role: 'admin', score: 30 }
          ]
        },
        expected: {
          admin: { count: 2, totalScore: 40, members: ['Alice', 'Charlie'] },
          user: { count: 1, totalScore: 20, members: ['Bob'] }
        }
      }
    ],
    stepGenerator: (input) => {
      const users = input?.users || [
        { name: 'Alice', role: 'admin', score: 10 },
        { name: 'Bob', role: 'user', score: 20 },
        { name: 'Charlie', role: 'admin', score: 30 }
      ];
      const acc = {};
      for (let u of users) {
        if (!acc[u.role]) acc[u.role] = { count: 0, totalScore: 0, members: [] };
        acc[u.role].count++;
        acc[u.role].totalScore += u.score;
        acc[u.role].members.push(u.name);
      }
      return [{
        stepIndex: 0,
        description: 'Grouped & Aggregated: ' + JSON.stringify(acc),
        array: users.map((u, i) => ({ value: \`\${u.name} (\${u.role})\`, status: 'match', index: i })),
        hashMap: Object.entries(acc).map(([r, d]) => ({ key: r, value: \`Score: \${d.totalScore}, Count: \${d.count}\` }))
      }];
    }
  },
  {
    id: 'flatten-nested-tree-array',
    number: 30,
    title: 'Flatten Hierarchy Tree Array',
    category: 'Array of Objects',
    difficulty: 'Medium',
    memoryTrick: '💡 Recursive DFS / Queue BFS: Recursively traverse each node, attach \`parentId\`, push to flat array, and recurse on \`children\`.',
    description: 'Flatten a nested tree structure of employee/category objects into a 1D flat array with parent relationships.',
    examples: [
      {
        input: 'tree = [{ id: 1, name: "CEO", children: [{ id: 2, name: "CTO" }] }]',
        output: '[{ id: 1, name: "CEO", parentId: null }, { id: 2, name: "CTO", parentId: 1 }]'
      }
    ],
    pseudocode: \`function flattenTree(nodes, parentId = null): recurse children attaching parentId\`,
    jsCode: \`function flattenTree(nodes, parentId = null) {
  let res = [];
  for (let node of nodes) {
    res.push({ id: node.id, name: node.name, parentId });
    if (node.children && node.children.length > 0) {
      res = res.concat(flattenTree(node.children, node.id));
    }
  }
  return res;
}\`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    defaultInput: {
      tree: [
        {
          id: 1,
          name: 'CEO',
          children: [
            { id: 2, name: 'CTO', children: [{ id: 4, name: 'Dev' }] },
            { id: 3, name: 'CFO' }
          ]
        }
      ]
    },
    testCases: [{ input: { tree: [{ id: 1, name: 'CEO', children: [{ id: 2, name: 'CTO' }] }] }, expectedLength: 2 }],
    stepGenerator: () => [{ stepIndex: 0, description: 'Flat Hierarchy Array created.', array: [{ value: 'CEO (P:null)', status: 'match' }, { value: 'CTO (P:1)', status: 'match' }] }]
  },

  // ==========================================
  // 3. OBJECT MANIPULATION (PROBLEMS 31 - 32)
  // ==========================================
  {
    id: 'flatten-nested-object',
    number: 31,
    title: 'Flatten Nested Object',
    category: 'Object Manipulation',
    difficulty: 'Medium',
    memoryTrick: '💡 Recursive Key Join: Recursively iterate keys. If value is an object, recurse passing \`currentKey.childKey\`; else set \`res[prefix] = val\`.',
    description: 'Convert deeply nested object into flat object with dot-notation key paths.',
    examples: [{ input: 'obj = { a: { b: { c: 1 } }, d: 2 }', output: '{ "a.b.c": 1, "d": 2 }' }],
    pseudocode: \`function flattenObject(obj, prefix=''): dfs recurse joining keys with dot\`,
    jsCode: \`function flattenObject(obj, prefix = '') {
  const res = {};
  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const newKey = prefix ? (prefix + '.' + key) : key;
      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        Object.assign(res, flattenObject(obj[key], newKey));
      } else {
        res[newKey] = obj[key];
      }
    }
  }
  return res;
}\`,
    timeComplexity: 'O(K)',
    spaceComplexity: 'O(K)',
    defaultInput: { obj: { a: { b: { c: 1 } }, d: 2 } },
    testCases: [{ input: { obj: { a: { b: { c: 1 } }, d: 2 } }, expected: { 'a.b.c': 1, 'd': 2 } }],
    stepGenerator: () => [{ stepIndex: 0, description: 'Flattened Object: {"a.b.c": 1, "d": 2}', hashMap: [{ key: 'a.b.c', value: '1' }, { key: 'd', value: '2' }] }]
  },
  {
    id: 'get-object-property-path',
    number: 32,
    title: 'Get Property by String Path (Lodash .get)',
    category: 'Object Manipulation',
    difficulty: 'Medium',
    memoryTrick: '💡 String Regex Split: Normalize array bracket notation a[0].b into dot notation a.0.b, split by ., then iterate using reduce().',
    description: 'Retrieve deeply nested property value using string path (e.g. "a[0].b.c").',
    examples: [{ input: 'obj = { a: [{ b: { c: 42 } }] }, path = "a[0].b.c"', output: '42' }],
    pseudocode: \`function get(obj, path, defaultValue): parse keys and traverse\`,
    jsCode: \`function get(obj, path, defaultValue = undefined) {
  const keys = path.replace(/\\[(\\d+)\\]/g, '.$1').split('.').filter(Boolean);
  let curr = obj;
  for (let key of keys) {
    if (curr === null || curr === undefined) return defaultValue;
    curr = curr[key];
  }
  return curr !== undefined ? curr : defaultValue;
}\`,
    timeComplexity: 'O(K)',
    spaceComplexity: 'O(K)',
    defaultInput: { obj: { a: [{ b: { c: 42 } }] }, path: 'a[0].b.c' },
    testCases: [{ input: { obj: { a: [{ b: { c: 42 } }] }, path: 'a[0].b.c' }, expected: 42 }],
    stepGenerator: () => [{ stepIndex: 0, description: 'Resolved path "a[0].b.c" -> 42', variables: { result: 42 } }]
  },

  // ==========================================
  // 4. JS POLYFILLS (PROBLEMS 33 - 35)
  // ==========================================
  {
    id: 'polyfill-map',
    number: 33,
    title: 'Polyfill: Array.prototype.myMap',
    category: 'Polyfills',
    difficulty: 'Easy',
    memoryTrick: '💡 Callback Loop: Create output array \`res = []\`. Loop \`for (let i=0; i<this.length; i++)\`, invoke \`callback(this[i], i, this)\`, push result to \`res\`.',
    description: 'Custom polyfill for Array.prototype.map.',
    examples: [{ input: 'arr = [1, 2, 3]', output: '[2, 4, 6]' }],
    pseudocode: \`Array.prototype.myMap = function(callback, thisArg): loop and transform\`,
    jsCode: \`Array.prototype.myMap = function(callback, thisArg) {
  const res = new Array(this.length);
  for (let i = 0; i < this.length; i++) {
    if (i in this) res[i] = callback.call(thisArg, this[i], i, this);
  }
  return res;
};\`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    defaultInput: { arr: [1, 2, 3, 4] },
    testCases: [{ input: { arr: [1, 2, 3, 4] }, expected: [2, 4, 6, 8] }],
    stepGenerator: (input) => {
      const arr = input?.arr || [1, 2, 3, 4];
      return [{ stepIndex: 0, description: 'Transformed array: [2, 4, 6, 8]', array: arr.map(v => ({ value: v*2, status: 'match' })) }];
    }
  },
  {
    id: 'polyfill-filter',
    number: 34,
    title: 'Polyfill: Array.prototype.myFilter',
    category: 'Polyfills',
    difficulty: 'Easy',
    memoryTrick: '💡 Predicate Check: Create output array \`res = []\`. Loop items; if \`Boolean(callback(item, i, array)) === true\`, push item to \`res\`.',
    description: 'Custom polyfill for Array.prototype.filter.',
    examples: [{ input: 'arr = [1, 2, 3, 4]', output: '[2, 4]' }],
    pseudocode: \`Array.prototype.myFilter = function(callback): loop and test predicate\`,
    jsCode: \`Array.prototype.myFilter = function(callback, thisArg) {
  const res = [];
  for (let i = 0; i < this.length; i++) {
    if (i in this && callback.call(thisArg, this[i], i, this)) {
      res.push(this[i]);
    }
  }
  return res;
};\`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    defaultInput: { arr: [1, 2, 3, 4, 5, 6] },
    testCases: [{ input: { arr: [1, 2, 3, 4, 5, 6] }, expected: [2, 4, 6] }],
    stepGenerator: () => [{ stepIndex: 0, description: 'Filtered evens: [2, 4, 6]', array: [{ value: 2, status: 'match' }, { value: 4, status: 'match' }, { value: 6, status: 'match' }] }]
  },
  {
    id: 'polyfill-reduce',
    number: 35,
    title: 'Polyfill: Array.prototype.myReduce',
    category: 'Polyfills',
    difficulty: 'Medium',
    memoryTrick: '💡 Accumulator Initializer: If \`initialValue\` provided, start \`acc = initialValue\` and \`startIdx = 0\`. Else \`acc = arr[0]\` and \`startIdx = 1\`. Update \`acc = callback(acc, val, i, arr)\`.',
    description: 'Custom polyfill for Array.prototype.reduce.',
    examples: [{ input: 'arr = [1, 2, 3, 4], initialValue = 0', output: '10' }],
    pseudocode: \`Array.prototype.myReduce = function(callback, initialValue): accumulator loop\`,
    jsCode: \`Array.prototype.myReduce = function(callback, initialValue) {
  let hasInitial = arguments.length >= 2;
  let acc = hasInitial ? initialValue : this[0];
  let startIdx = hasInitial ? 0 : 1;
  for (let i = startIdx; i < this.length; i++) {
    if (i in this) acc = callback(acc, this[i], i, this);
  }
  return acc;
};\`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    defaultInput: { arr: [1, 2, 3, 4], initialValue: 0 },
    testCases: [{ input: { arr: [1, 2, 3, 4], initialValue: 0 }, expected: 10 }],
    stepGenerator: () => [{ stepIndex: 0, description: 'Accumulated sum = 10', variables: { acc: 10 } }]
  },

  // ==========================================
  // 5. TRICKY OUTPUT-BASED (PROBLEMS 36 - 37)
  // ==========================================
  {
    id: 'tricky-event-loop',
    number: 36,
    title: 'Tricky: Event Loop & Microtasks',
    category: 'Tricky Output',
    difficulty: 'Medium',
    memoryTrick: '💡 Synchronous -> Microtasks (Promises/queueMicrotask) -> Macrotasks (setTimeout/setInterval). Microtask queue empties completely before next Macrotask!',
    description: 'Execution order between Sync code, setTimeout (Macrotask), and Promise (Microtask).',
    examples: [{ input: 'Sync -> Macrotask -> Microtask', output: '["1: Sync Start", "2: Sync End", "3: Microtask", "4: Macrotask"]' }],
    pseudocode: \`Call Stack -> Microtasks (Promise) -> Macrotasks (setTimeout)\`,
    jsCode: \`function eventLoopDemo() {
  const logs = [];
  logs.push("1: Sync Start");
  setTimeout(() => logs.push("4: Macrotask (setTimeout)"), 0);
  Promise.resolve().then(() => logs.push("3: Microtask (Promise)"));
  logs.push("2: Sync End");
  return logs;
}\`,
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    defaultInput: { run: true },
    testCases: [{ input: { run: true }, expected: ['1: Sync Start', '2: Sync End', '3: Microtask (Promise)', '4: Macrotask (setTimeout)'] }],
    stepGenerator: () => [
      { stepIndex: 0, description: 'Sync Start', variables: { console: '1: Sync Start' } },
      { stepIndex: 1, description: 'Sync End', variables: { console: '2: Sync End' } },
      { stepIndex: 2, description: 'Microtask (Promise.then)', variables: { console: '3: Microtask (Promise)' } },
      { stepIndex: 3, description: 'Macrotask (setTimeout)', variables: { console: '4: Macrotask (setTimeout)' } }
    ]
  },
  {
    id: 'tricky-var-closure-loop',
    number: 37,
    title: 'Tricky: Closures & \`var\` in Loops',
    category: 'Tricky Output',
    difficulty: 'Easy',
    memoryTrick: '💡 Scope binding: \`var\` creates a SINGLE function-scoped variable shared across all \`setTimeout\` closures (printing 3, 3, 3). Fix with \`let\` (block scope) or IIFE!',
    description: 'Why var loop with setTimeout prints 3, 3, 3 instead of 0, 1, 2.',
    examples: [{ input: 'var loop inside setTimeout', output: '[3, 3, 3]' }],
    pseudocode: \`var i shared globally; loop finishes i=3 before callbacks execute\`,
    jsCode: \`function closureLoopVar() {
  const result = [];
  for (var i = 0; i < 3; i++) {
    result.push(i);
  }
  return result;
}\`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    defaultInput: { run: true },
    testCases: [{ input: { run: true }, expected: [3, 3, 3] }],
    stepGenerator: () => [{ stepIndex: 0, description: 'Shared var i reached 3. Timeouts print: [3, 3, 3]', variables: { output: '[3, 3, 3]' } }]
  }
];
`;

fs.writeFileSync(path.resolve('src/DsaPractice/dsaData.js'), fileContent, 'utf-8');
console.log('dsaData.js written successfully!');
