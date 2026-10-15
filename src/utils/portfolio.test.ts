import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatCounter,
  getBentoColSpan,
  getCycleItem,
  calculateReadingTime,
  computeParallaxOffset,
} from './portfolio.ts';

test('formatCounter pads numbers to 3 digits and clamps bounds', () => {
  assert.equal(formatCounter(0), '000');
  assert.equal(formatCounter(7), '007');
  assert.equal(formatCounter(42), '042');
  assert.equal(formatCounter(99), '099');
  assert.equal(formatCounter(100), '100');
  assert.equal(formatCounter(150), '100');
  assert.equal(formatCounter(-5), '000');
});

test('getBentoColSpan follows alternating 7/5/5/7 pattern', () => {
  assert.equal(getBentoColSpan(0), 7);
  assert.equal(getBentoColSpan(1), 5);
  assert.equal(getBentoColSpan(2), 5);
  assert.equal(getBentoColSpan(3), 7);
  assert.equal(getBentoColSpan(4), 7);
  assert.equal(getBentoColSpan(5), 5);
});

test('getCycleItem handles cyclic rotation correctly', () => {
  const roles = ['Creative', 'Fullstack', 'Founder', 'Scholar'] as const;
  assert.equal(getCycleItem(0, roles), 'Creative');
  assert.equal(getCycleItem(1, roles), 'Fullstack');
  assert.equal(getCycleItem(2, roles), 'Founder');
  assert.equal(getCycleItem(3, roles), 'Scholar');
  assert.equal(getCycleItem(4, roles), 'Creative');
});

test('calculateReadingTime calculates reasonable estimates', () => {
  const shortText = 'One two three four five';
  assert.equal(calculateReadingTime(shortText, 200), 1);

  const longText = Array(450).fill('word').join(' ');
  assert.equal(calculateReadingTime(longText, 200), 3);
});

test('computeParallaxOffset produces expected translation offsets', () => {
  assert.equal(computeParallaxOffset(500, 100, 0.2), 80);
  assert.equal(computeParallaxOffset(100, 100, 0.2), 0);
  assert.equal(computeParallaxOffset(0, 100, -0.1), 10);
});
