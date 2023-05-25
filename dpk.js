const crypto = require("crypto");
const { constants } = require("./constants");

exports.deterministicPartitionKey = (event) => {
  const { TRIVIAL_PARTITION_KEY, MAX_PARTITION_KEY_LENGTH } = constants();
  let candidate = event && event.partitionKey;

  if (!candidate && event) {
    const data = JSON.stringify(event);
    candidate = crypto.createHash("sha3-512").update(data).digest("hex");
  }

  candidate = candidate || TRIVIAL_PARTITION_KEY;

  if (typeof candidate !== "string") {
    candidate = JSON.stringify(candidate);
  }

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
  }

  return candidate;
};
