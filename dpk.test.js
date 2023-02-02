const { crypto, TRIVIAL_PARTITION_KEY, MAX_PARTITION_KEY_LENGTH, hash, deterministicPartitionKey } = require('./dpk');

// Tests
const event = { partitionKey: 'pk', data: 'data' };

describe('deterministicPartitionKey', () => {
	test('returns partitionKey if present', () => {
		expect(deterministicPartitionKey(event)).toBe('pk');
	});

	test('returns hash of event if partitionKey is not present', () => {
		const eventWithoutPartitionKey = { data: 'data' };
		expect(deterministicPartitionKey(eventWithoutPartitionKey)).toBe(hash(JSON.stringify(eventWithoutPartitionKey)));
	});

	test('returns trivial partitionKey if event is not present', () => {
		expect(deterministicPartitionKey()).toBe(TRIVIAL_PARTITION_KEY);
	});

	test('returns hash of candidate if candidate length is greater than max length', () => {
		const longCandidate = 'a'.repeat(MAX_PARTITION_KEY_LENGTH + 1);
		expect(deterministicPartitionKey({ partitionKey: longCandidate })).toBe(hash(longCandidate));
	});
});

describe('deterministicPartitionKey', () => {
	it("Returns the literal '0' when given no input", () => {
		const trivialKey = deterministicPartitionKey();
		expect(trivialKey).toBe('0');
	});
});
