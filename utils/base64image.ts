export default function arrayBufferToBase64(buffer: ArrayBuffer) : string {
    // Convert the ArrayBuffer to a Uint8Array
    const bytes = new Uint8Array(buffer);
    // Create a binary string from the bytes
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    // Use btoa to encode the binary string to Base64
    const base64String = btoa(binary);
    // Return the data URL format
    return `data:image/jpg;base64,${base64String}`;
  }