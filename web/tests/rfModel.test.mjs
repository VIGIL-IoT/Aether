import test from 'node:test';
import assert from 'node:assert/strict';
import {
  CHANNEL_COUNT,
  FIXED_CHANNEL_OFFSET,
  channelFrequencyMHz,
  createInitialModel,
  stepModel,
} from '../src/domain/rfModel.mjs';

test('RF_CH frequency mapping covers 2400 through 2525 MHz', () => {
  assert.equal(channelFrequencyMHz(0), 2400);
  assert.equal(channelFrequencyMHz(125), 2525);
  assert.throws(() => channelFrequencyMHz(126), RangeError);
  assert.throws(() => channelFrequencyMHz(-1), RangeError);
  assert.throws(() => channelFrequencyMHz(1.5), RangeError);
  assert.throws(() => channelFrequencyMHz(Number.NaN), RangeError);
});

test('sequential hopping advances both radios and counts channel selections', () => {
  const initial = createInitialModel();
  const next = stepModel(initial);

  assert.equal(next.radio1.channel, 13);
  assert.equal(next.radio2.channel, 45);
  assert.equal(next.steps, 1);
  assert.equal(next.elapsedMs, initial.hopRateMs);
  assert.equal(next.visits1[13], 1);
  assert.equal(next.visits2[45], 1);
  assert.equal(next.visits1.reduce((sum, count) => sum + count, 0), 1);
  assert.equal(next.visits2.reduce((sum, count) => sum + count, 0), 1);
});

test('sequential hopping wraps at the configured channel range', () => {
  const initial = createInitialModel();
  initial.radio1.channel = 125;
  initial.radio2.channel = 125;
  const next = stepModel(initial);

  assert.equal(next.radio1.channel, 0);
  assert.equal(next.radio2.channel, 0);
});

test('sequential hopping enters a custom range from an out-of-range channel', () => {
  const initial = createInitialModel();
  initial.channelRange = [124, 125];

  const next = stepModel(initial);

  assert.equal(next.radio1.channel, 124);
  assert.equal(next.radio2.channel, 124);
});

test('single-channel ranges keep every hop mode on that channel', () => {
  for (const hopMode of ['SEQUENTIAL', 'FIXED_OFFSET', 'SEEDED_RANDOM']) {
    const initial = createInitialModel();
    initial.channelRange = [125, 125];
    initial.hopMode = hopMode;

    const next = stepModel(initial);

    assert.equal(next.radio1.channel, 125, `${hopMode} radio 1`);
    assert.equal(next.radio2.channel, 125, `${hopMode} radio 2`);
  }
});

test('invalid channel ranges are rejected before indexing visit arrays', () => {
  for (const channelRange of [
    [-1, 125],
    [0, 126],
    [8, 7],
    [0.5, 10],
    [0, Number.NaN],
    [0],
    [0, 10, 11],
  ]) {
    const model = { ...createInitialModel(), channelRange };
    assert.throws(() => stepModel(model), RangeError, JSON.stringify(channelRange));
  }
});

test('fixed separation is modulo the configured range', () => {
  const initial = createInitialModel();
  initial.hopMode = 'FIXED_OFFSET';
  const next = stepModel(initial);

  assert.equal(next.radio2.channel, (next.radio1.channel + FIXED_CHANNEL_OFFSET) % CHANNEL_COUNT);
});

test('seeded random hopping is repeatable and remains inside the configured range', () => {
  const first = createInitialModel();
  first.hopMode = 'SEEDED_RANDOM';
  let left = first;
  let right = { ...first, visits1: first.visits1.slice(), visits2: first.visits2.slice() };

  for (let i = 0; i < 100; i += 1) {
    left = stepModel(left);
    right = stepModel(right);
    assert.equal(left.radio1.channel, right.radio1.channel);
    assert.equal(left.radio2.channel, right.radio2.channel);
    assert.ok(left.radio1.channel >= 0 && left.radio1.channel <= 125);
    assert.ok(left.radio2.channel >= 0 && left.radio2.channel <= 125);
  }

  assert.equal(left.steps, 100);
  assert.equal(left.visits1.reduce((sum, count) => sum + count, 0), 100);
  assert.equal(left.visits2.reduce((sum, count) => sum + count, 0), 100);
});
