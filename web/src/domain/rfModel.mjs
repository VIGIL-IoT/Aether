export const CHANNEL_COUNT = 126;
export const INITIAL_SEED = 0xA37E;
export const FIXED_CHANNEL_OFFSET = 32;

export function channelFrequencyMHz(channel) {
  if (!Number.isInteger(channel) || channel < 0 || channel >= CHANNEL_COUNT) {
    throw new RangeError(`RF channel must be an integer from 0 to ${CHANNEL_COUNT - 1}`);
  }
  return 2400 + channel;
}

export function createInitialModel() {
  return {
    elapsedMs: 0,
    seed: INITIAL_SEED,
    hopMode: 'SEQUENTIAL',
    hopRateMs: 250,
    channelRange: [0, CHANNEL_COUNT - 1],
    radio1: { id: 1, bus: 'HSPI', channel: 12 },
    radio2: { id: 2, bus: 'VSPI', channel: 44 },
    visits1: Array(CHANNEL_COUNT).fill(0),
    visits2: Array(CHANNEL_COUNT).fill(0),
    steps: 0,
  };
}

function nextRandom(seed) {
  let value = seed >>> 0;
  value ^= value << 13;
  value ^= value >>> 17;
  value ^= value << 5;
  value >>>= 0;
  return [value || 1, (value || 1) / 0x100000000];
}

function nextSequential(channel, min, max) {
  return channel >= max ? min : channel + 1;
}

function channelFromRandom(random, min, max) {
  return min + Math.floor(random * (max - min + 1));
}

export function stepModel(model) {
  const [min, max] = model.channelRange;
  if (min < 0 || max >= CHANNEL_COUNT || min > max) {
    throw new RangeError('The simulation channel range must stay within RF_CH 0–125');
  }

  let channel1;
  let channel2;
  let seed = model.seed;

  if (model.hopMode === 'SEEDED_RANDOM') {
    let random;
    [seed, random] = nextRandom(seed);
    channel1 = channelFromRandom(random, min, max);
    [seed, random] = nextRandom(seed);
    channel2 = channelFromRandom(random, min, max);
  } else {
    channel1 = nextSequential(model.radio1.channel, min, max);
    channel2 = model.hopMode === 'FIXED_OFFSET'
      ? min + ((channel1 - min + FIXED_CHANNEL_OFFSET) % (max - min + 1))
      : nextSequential(model.radio2.channel, min, max);
  }

  const visits1 = model.visits1.slice();
  const visits2 = model.visits2.slice();
  visits1[channel1] += 1;
  visits2[channel2] += 1;

  return {
    ...model,
    elapsedMs: model.elapsedMs + model.hopRateMs,
    seed,
    radio1: { ...model.radio1, channel: channel1 },
    radio2: { ...model.radio2, channel: channel2 },
    visits1,
    visits2,
    steps: model.steps + 1,
  };
}
