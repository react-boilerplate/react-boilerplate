// Copyright 2012 The Obvious Corporation.

/*
 * Tests for leb
 */


/*
 * Modules used
 */

"use strict";

var assert = require("assert");

var leb = require("../");


/*
 * Helper functions
 */

/**
 * Gets a string form for a buffer.
 */
function bufString(buf) {
  return buf.toString("hex");
}

/**
 * Compares two buffers for equality.
 */
function bufEqual(buf1, buf2) {
  var length = buf1.length;

  if (buf2.length !== length) {
    console.log("LENGTH MISMATCH:", length, buf2.length);
    return false;
  }

  for (var i = 0; i < length; i++) {
    if (buf1[i] !== buf2[i]) {
      console.log("MISMATCH AT:", i);
      return false;
    }
  }

  return true;
}

/**
 * Trims a buffer that holds a signed int encoding, so that it is
 * of minimal size.
 */
function trimIntBuffer(buffer) {
  var length = buffer.length;
  var signBit = buffer[length - 1] >> 7;
  var signByte = signBit * 0xff;

  while ((length > 1) &&
         (buffer[length - 1] === signByte) &&
         ((buffer[length - 2] >> 7) === signBit)) {
    length--;
  }

  if (length === buffer.length) {
    return buffer;
  }

  var newBuf = new Buffer(length);
  buffer.copy(newBuf);
  return newBuf;
}

/**
 * Trims a buffer that holds an usigned int encoding, so that it is
 * of minimal size.
 */
function trimUIntBuffer(buffer) {
  var length = buffer.length;
  var signBit = buffer[length - 1] >> 7;
  var signByte = signBit * 0xff;

  while ((length > 1) &&
         (buffer[length - 1] === 0)) {
    length--;
  }

  if (length === buffer.length) {
    return buffer;
  }

  var newBuf = new Buffer(length);
  buffer.copy(newBuf);
  return newBuf;
}

/**
 * Trims a buffer that holds a signed LEB encoding, so that it is
 * of minimal size.
 */
function trimLebBuffer(buffer) {
  var length = buffer.length;
  var signBit = (buffer[length - 1] >> 6) & 1;
  var signByte = (signBit * 0xff) | 0x80;

  while ((length > 1) &&
         ((buffer[length - 1] | 0x80) === signByte) &&
         (((buffer[length - 2] >> 6) & 1) === signBit)) {
    length--;
  }

  if (length === buffer.length) {
    return buffer;
  }

  var newBuf = new Buffer(length);
  buffer.copy(newBuf);
  newBuf[length - 1] &= 0x7f;
  return newBuf;
}

/**
 * Trims a buffer that holds an unsigned LEB encoding, so that it is
 * of minimal size.
 */
function trimULebBuffer(buffer) {
  var length = buffer.length;

  while ((length > 1) &&
         ((buffer[length - 1] | 0x80) === 0x80)) {
    length--;
  }

  if (length === buffer.length) {
    return buffer;
  }

  var newBuf = new Buffer(length);
  buffer.copy(newBuf);
  newBuf[length - 1] &= 0x7f;
  return newBuf;
}

/**
 * Constructs a (very) pseudo-random number generator.
 */
function Randomish(seed) {
  var x = 12345;
  var y = 1;
  var z = seed;

  this.nextByte = function nextByte() {
    x = ((x * 31) + y) & ~0;
    y = ((y * 2) + z + 1) & ~0;
    z = (x + y + z) & ~0;
    return (z + (z >>> 8) + (z >>> 16) + (z >>> 24)) & 0xff;
  }

  this.nextBit = function nextBit() {
    return this.nextByte() & 1;
  }

  this.nextUInt32 = function nextUInt32() {
    var result = 0;
    for (var i = 0; i < 4; i++) {
      result = (result * 0x100) + this.nextByte();
    }
    return result;
  }

  this.nextUInt64 = function nextUInt64() {
    var lowWord = this.nextUInt32();
    var highWord = this.nextUInt32();
    return (highWord * 0x100000000) + lowWord;
  }

  this.fillBuffer = function fillBuffer(buf) {
    for (var i = buf.length - 1; i >= 0; i--) {
      buf[i] = this.nextByte();
    }
  }
}

/**
 * Test the 32-bit encode/decode cycle for the given value, both as
 * signed and as unsigned.
 */
function testValue32(value) {
  var buf = leb.encodeUInt32(value);
  var decode = leb.decodeUInt32(buf);

  if (decode.nextIndex !== buf.length) {
    throw new Error("Bad nextIndex for " + value);
  }

  if (decode.value !== value) {
    throw new Error("Value mismatch for " + value);
  }

  value &= ~0; // Force it to be signed.
  buf = leb.encodeInt32(value);
  decode = leb.decodeInt32(buf);

  if (decode.nextIndex !== buf.length) {
    throw new Error("Bad nextIndex for " + value);
  }

  if (decode.value !== value) {
    throw new Error("Value mismatch for " + value);
  }
}

/**
 * Test the 64-bit encode/decode cycle for the given value, both as
 * signed and as unsigned.
 */
function testValue64(value) {
  var buf = leb.encodeUInt64(value);
  var decode = leb.decodeUInt64(buf);

  if (decode.nextIndex !== buf.length) {
    throw new Error("Bad nextIndex for " + value);
  }

  if (decode.value !== value) {
    throw new Error("Value mismatch for " + value);
  }

  assert.ok(!decode.lossy, "Bad lossy for " + value);

  // Force it to be signed.
  if (value >= 0x8000000000000000) {
    value -= 0x10000000000000000;
  }
  buf = leb.encodeInt64(value);
  decode = leb.decodeInt64(buf);

  if (decode.nextIndex !== buf.length) {
    throw new Error("Bad nextIndex for " + value);
  }

  if (decode.value !== value) {
    throw new Error("Value mismatch for " + value);
  }

  assert.ok(!decode.lossy, "Bad lossy for " + value);
}

/**
 * Test a buffer encode-decode cycle, both as signed and unsigned.
 */
function testEncodeDecode(buffer) {
  var trim = trimIntBuffer(buffer);
  var encode = leb.encodeIntBuffer(buffer);
  var decode = leb.decodeIntBuffer(encode);

  try {
    assert.ok(bufEqual(trim, decode.value));
  } catch (ex) {
    console.log("INT PROBLEM");
    console.log("ORIGINAL:", bufString(buffer));
    console.log("DECODED: ", bufString(decode.value));
    assert.ok(false);
  }

  if (decode.nextIndex !== encode.length) {
    throw new Error("Bad nextIndex for " + bufString(buffer));
  }

  trim = trimUIntBuffer(buffer);
  encode = leb.encodeUIntBuffer(buffer);
  decode = leb.decodeUIntBuffer(encode);

  try {
    assert.ok(bufEqual(trim, decode.value));
  } catch (ex) {
    console.log("UINT PROBLEM");
    console.log("ORIGINAL:", bufString(buffer));
    console.log("DECODED: ", bufString(decode.value));
    assert.ok(false);
  }

  if (decode.nextIndex !== encode.length) {
    throw new Error("Bad nextIndex for " + bufString(buffer));
  }
}

/**
 * Test a buffer decode-encode cycle, both as signed and unsigned.
 */
function testDecodeEncode(buffer) {
  var trim = trimLebBuffer(buffer);
  var decode = leb.decodeIntBuffer(buffer);
  var encode = leb.encodeIntBuffer(decode.value);

  try {
    assert.ok(bufEqual(trim, encode));
  } catch (ex) {
    console.log("INT PROBLEM");
    console.log("ORIGINAL:", bufString(buffer));
    console.log("ENCODED: ", bufString(encode));
    assert.ok(false);
  }

  if (decode.nextIndex !== buffer.length) {
    throw new Error("Bad nextIndex for " + bufString(buffer));
  }

  trim = trimULebBuffer(buffer);
  decode = leb.decodeUIntBuffer(buffer);
  encode = leb.encodeUIntBuffer(decode.value);

  try {
    assert.ok(bufEqual(trim, encode));
  } catch (ex) {
    console.log("UINT PROBLEM");
    console.log("ORIGINAL:", bufString(buffer));
    console.log("ENCODED: ", bufString(encode));
    assert.ok(false);
  }

  if (decode.nextIndex !== buffer.length) {
    throw new Error("Bad nextIndex for " + bufString(buffer));
  }
}


/*
 * Test cases
 */

/**
 * Tests conversion of values that encode into one byte. This
 * includes exactly comparing the encoded values (whereas other tests
 * merely verify a encode-decode or decode-encode cycle).
 */
function testOneByteEncodings() {
  var buf = new Buffer(1);

  for (var value = 0; value < 127; value++) {
    var asSigned = (value << 25) >> 25; // sign-extend bit #6
    buf[0] = value;

    assert.equal(leb.decodeInt32(buf).value, asSigned);
    assert.equal(leb.decodeInt64(buf).value, asSigned);
    assert.equal(leb.decodeUInt32(buf).value, value);
    assert.equal(leb.decodeUInt64(buf).value, value);

    var decodeInt = leb.decodeIntBuffer(buf);
    var decodeUInt = leb.decodeUIntBuffer(buf);

    assert.equal(decodeInt.nextIndex, 1);
    assert.equal(decodeInt.value.length, 1);
    assert.equal(decodeInt.value[0], asSigned & 0xff);
    assert.equal(decodeUInt.nextIndex, 1);
    assert.equal(decodeUInt.value.length, 1);
    assert.equal(decodeUInt.value[0], value);

    var encodeInt = leb.encodeIntBuffer(decodeInt.value);
    var encodeUInt = leb.encodeUIntBuffer(decodeUInt.value);

    assert.equal(encodeInt.length, 1);
    assert.equal(encodeInt[0], value);
    assert.equal(encodeUInt.length, 1);
    assert.equal(encodeUInt[0], value);
  }
}

/**
 * Tests conversion of values that encode into two bytes. This
 * includes exactly comparing the encoded values (whereas other tests
 * merely verify a encode-decode or decode-encode cycle).
 */
function testTwoByteEncodings() {
  var buf = new Buffer(2);

  for (var value = 0; value < 16384; value++) {
    var asSigned = (value << 18) >> 18; // sign-extend bit #14
    buf[0] = (value & 0x7f) | 0x80;
    buf[1] = (value >> 7) & 0x7f;

    assert.equal(leb.decodeInt32(buf).value, asSigned);
    assert.equal(leb.decodeInt64(buf).value, asSigned);
    assert.equal(leb.decodeUInt32(buf).value, value);
    assert.equal(leb.decodeUInt64(buf).value, value);

    var decodeInt = leb.decodeIntBuffer(buf);
    var decodeUInt = leb.decodeUIntBuffer(buf);

    assert.equal(decodeInt.nextIndex, 2);
    assert.equal(decodeInt.value[0], asSigned & 0xff);
    if ((asSigned >= -128) && (asSigned <= 127)) {
      assert.equal(decodeInt.value.length, 1);
    } else {
      assert.equal(decodeInt.value.length, 2);
      assert.equal(decodeInt.value[1], (asSigned >> 8) & 0xff);
    }

    if ((asSigned < -64) || (asSigned > 63)) {
      // These are the ones that should re-encode as two bytes.
      var encodeInt = leb.encodeIntBuffer(decodeInt.value);
      assert.equal(encodeInt.length, 2);
      assert.equal(encodeInt[0], buf[0]);
      assert.equal(encodeInt[1], buf[1]);
    }

    assert.equal(decodeUInt.nextIndex, 2);
    assert.equal(decodeUInt.value[0], value & 0xff);
    if (value <= 255) {
      assert.equal(decodeUInt.value.length, 1);
    } else {
      assert.equal(decodeUInt.value.length, 2);
      assert.equal(decodeUInt.value[1], (value >> 8) & 0xff);
    }

    if (value > 127) {
      // These are the ones that should re-encode as two bytes.
      var encodeUInt = leb.encodeUIntBuffer(decodeUInt.value);
      assert.equal(encodeUInt.length, 2);
      assert.equal(encodeUInt[0], buf[0]);
      assert.equal(encodeUInt[1], buf[1]);
    }
  }
}

/**
 * Tests conversion of 32-bit zero.
 */
function testZero32() {
  testValue32(0);
}

/**
 * Tests each possible 32-bit int that just consists of a contiguous
 * chunk of 1-bits.
 */
function testContiguousBits32() {
  for (var bitCount = 1; bitCount <= 32; bitCount++) {
    var maxOffset = 32 - bitCount;
    var baseValue = (~0 >>> maxOffset);
    for (var offset = 0; offset < maxOffset; offset++) {
      testValue32(baseValue << offset);
    }
  }
}

/**
 * Tests a (fixed but) pseudo-randomish series of 32-bit values.
 */
function testMisc32() {
  var rand = new Randomish(123);

  for (var i = 0; i < 100000; i++) {
    testValue32(rand.nextUInt32());
  }
}

/**
 * Tests conversion of 64-bit zero.
 */
function testZero64() {
  testValue64(0);
}

/**
 * Tests each possible 64-bit int that just consists of a contiguous
 * chunk of 1-bits.
 */
function testContiguousBits64() {
  // Max bit count is 53, since floating point format can't represent
  // more than that.
  for (var bitCount = 1; bitCount <= 53; bitCount++) {
    var maxOffset = 64 - bitCount;
    var baseValue = 1;

    for (var i = 1; i < bitCount; i++) {
      baseValue = (baseValue * 2) + 1;
    }

    for (var offset = 0; offset < maxOffset; offset++) {
      testValue64(baseValue);
      baseValue *= 2;
    }
  }
}

/**
 * Tests a (fixed but) pseudo-randomish series of encoded 64-bit values
 * that are expected to be lossily decoded.
 */
function testLossy64() {
  var rand = new Randomish(9140);
  var buf = new Buffer(8);

  for (var bitCount = 54; bitCount < 64; bitCount++) {
    var maxOffset = 64 - bitCount;
    for (var offset = 0; offset < maxOffset; offset++) {
      for (var i = 0; i < 100; i++) {
	trial(offset, bitCount);
      }
    }
  }

  function trial(offset, bitCount) {
    buf.fill(0);

    for (var i = 0; i < bitCount; i++) {
      var bit = ((i == 0) || (i == (bitCount - 1))) ? 1 : rand.nextBit();
      var at = offset + i;
      if (bit) {
	buf[Math.floor(at / 8)] |= (1 << (at % 8));
      }
    }

    var encode = leb.encodeIntBuffer(buf);
    var decode = leb.decodeInt64(encode);
    assert.ok(decode.lossy);

    encode = leb.encodeUIntBuffer(buf);
    decode = leb.decodeUInt64(encode);
    assert.ok(decode.lossy);
  }
}

/**
 * Tests a (fixed but) pseudo-randomish series of 64-bit values.
 */
function testMisc64() {
  var rand = new Randomish(65432);

  for (var i = 0; i < 100000; i++) {
    testValue64(rand.nextUInt64());
  }
}

/**
 * Tests a (fixed but) pseudo-randomish series of buffer values.
 */
function testBuffers() {
  var rand = new Randomish(999);

  for (var length = 1; length < 300; length++) {
    var buffer = new Buffer(length);
    for (var i = 0; i < 20; i++) {
      rand.fillBuffer(buffer);
      testEncodeDecode(buffer);
      makeValidEncoding(buffer);
      testDecodeEncode(buffer);
    }
  }

  function makeValidEncoding(buffer) {
    for (var i = buffer.length - 2; i >= 0; i--) {
      buffer[i] |= 0x80;
    }
    buffer[buffer.length - 1] &= 0x7f;
  }
}

testOneByteEncodings();
testTwoByteEncodings();
testZero32();
testContiguousBits32();
testMisc32();
testZero64();
testContiguousBits64();
testLossy64();
testMisc64();
testBuffers();

console.log("All tests pass.");
