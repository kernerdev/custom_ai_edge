/*
 * Enhanced hash utility
 */

const SUPPORTED_ALGORITHMS = ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'];
const SUPPORTED_ENCODINGS = ['hex', 'base64'];

function bufferToHex(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

function bufferToBase64(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;

  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }

  return btoa(binary);
}

async function digestMessage(message, algorithm = 'SHA-256', encoding = 'hex') {
  if (!SUPPORTED_ALGORITHMS.includes(algorithm)) {
    throw new Error(`Unsupported algorithm: ${algorithm}`);
  }

  if (!SUPPORTED_ENCODINGS.includes(encoding)) {
    throw new Error(`Unsupported encoding: ${encoding}`);
  }

  const msgUint8 = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest(algorithm, msgUint8);

  let result;
  if (encoding === 'hex') {
    result = bufferToHex(hashBuffer);
  } else if (encoding === 'base64') {
    result = bufferToBase64(hashBuffer);
  }

  return {
    algorithm,
    encoding,
    result
  };
}

window['ai_edge_gallery_get_result'] = async (data) => {
  try {
    const jsonData = JSON.parse(data);

    if (!jsonData.text || typeof jsonData.text !== 'string') {
      throw new Error('Field "text" must be a non-empty string');
    }

    const algorithm = jsonData.algorithm || 'SHA-256';
    const encoding = jsonData.encoding || 'hex';

    const result = await digestMessage(jsonData.text, algorithm, encoding);

    return JSON.stringify(result);
  } catch (e) {
    console.error(e);
    return JSON.stringify({
      error: `Failed to calculate hash: ${e.message}`
    });
  }
};
