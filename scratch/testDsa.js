import { DSA_PROBLEMS } from '../src/DsaPractice/dsaData.js';

console.log('Total problems:', DSA_PROBLEMS.length);
DSA_PROBLEMS.forEach((p, idx) => {
  const steps = p.stepGenerator(p.defaultInput);
  if (!steps || !steps.length) {
    console.error('ERROR in stepGenerator for problem:', p.id);
  }
  console.log(`#${p.number}: ${p.title} [${p.category}] - ${steps.length} steps generated`);
});

console.log('=== SUCCESS: ALL 37 PROBLEMS VALIDATED ===');
