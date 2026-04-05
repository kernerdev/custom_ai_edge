---
name: calculate-hash
description: Calculate cryptographic hashes of text using multiple algorithms and encodings.
---

# Calculate hash

This skill calculates the hash of a given text.

## Supported algorithms
- SHA-1
- SHA-256 (default)
- SHA-384
- SHA-512

## Supported encodings
- hex (default)
- base64

## Examples

* "Calculate SHA-256 hash of hello"
* "Hash this text using SHA-512"
* "Give me base64 SHA-256 of hello world"

## Instructions

Call the `run_js` tool with the following exact parameters:

- script name: `index.html`
- data: A JSON string with the following fields:
  - text: (string, required)
  - algorithm: (string, optional, default: SHA-256)
  - encoding: (string, optional, default: hex)

## Example payload

```json
{
  "text": "hello world",
  "algorithm": "SHA-256",
  "encoding": "hex"
}
