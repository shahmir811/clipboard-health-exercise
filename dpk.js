const crypto = require('crypto');

const TRIVIAL_PARTITION_KEY = '0';
const MAX_PARTITION_KEY_LENGTH = 256;

const hash = data => crypto.createHash('sha3-512').update(data).digest('hex');

const stringify = candidate => {
	if (typeof candidate !== 'string') {
		return JSON.stringify(candidate);
	}
	return candidate;
};

const deterministicPartitionKey = event => {
	if (!event) {
		return TRIVIAL_PARTITION_KEY;
	}

	let candidate = event.partitionKey || hash(JSON.stringify(event));
	candidate = stringify(candidate);

	if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
		return hash(candidate);
	}

	return candidate;
};

module.exports = { crypto, TRIVIAL_PARTITION_KEY, MAX_PARTITION_KEY_LENGTH, hash, deterministicPartitionKey };
