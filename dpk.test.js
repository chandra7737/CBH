const { deterministicPartitionKey } = require("./dpk");
const crypto = require("crypto");
const { constants } = require("./constants");

describe("deterministicPartitionKey", () => {
  const { TRIVIAL_PARTITION_KEY, MAX_PARTITION_KEY_LENGTH } = constants();
  const mockHash = jest.fn().mockReturnValue("hashedValue");
  const mockUpdate = jest.fn().mockReturnValue({ digest: mockHash });
  const mockCreateHash = jest
    .spyOn(crypto, "createHash")
    .mockReturnValue({ update: mockUpdate });

  beforeEach(() => {
    mockHash.mockClear();
    mockUpdate.mockClear();
    mockCreateHash.mockClear();
  });

  it("Returns the TRIVIAL_PARTITION_KEY when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe(TRIVIAL_PARTITION_KEY);
  });

  it("should return event.partitionKey if it exists", () => {
    const event = {
      partitionKey: "abc123",
    };
    const result = deterministicPartitionKey(event);
    expect(result).toBe("abc123");
  });

  test("should return stringified partition key if partitionKey is not of type string", () => {
    const longString = "a".repeat(MAX_PARTITION_KEY_LENGTH + 1);
    const event = {
      partitionKey: { val1: "test1" },
    };
    const result = deterministicPartitionKey(event);
    expect(result).toBe(JSON.stringify({ val1: "test1" }));
  });

  it("should calculate partition key using SHA3-512 if event.partitionKey doesn't exist", () => {
    const event = {
      prop1: "value1",
      prop2: "value2",
    };
    const result = deterministicPartitionKey(event);
    expect(result).toBe("hashedValue");
    expect(mockCreateHash).toHaveBeenCalledWith("sha3-512");
    expect(mockUpdate).toHaveBeenCalledWith(JSON.stringify(event));
    expect(mockHash).toHaveBeenCalled();
  });

  test("should return 'hashedValue' partition key if it exceeds MAX_PARTITION_KEY_LENGTH", () => {
    const longString = "a".repeat(MAX_PARTITION_KEY_LENGTH + 1);
    const event = {
      partitionKey: longString,
    };
    const result = deterministicPartitionKey(event);
    expect(result).toBe("hashedValue");
    expect(mockCreateHash).toHaveBeenCalled();
  });
});
