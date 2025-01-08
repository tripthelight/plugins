function trimToMaxBytes(str, maxBytes) {
  let byteLength = 0;
  let result = "";

  for (const char of str) {
    const charByteLength = new TextEncoder().encode(char).length;
    if (byteLength + charByteLength > maxBytes) break;
    result += char;
    byteLength += charByteLength;
  }

  return result;
}

function textareaLimitBytes() {
  const textArea = document.getElementById("textArea");
  const byteCount = document.getElementById("byteCount");
  const maxBytes = 500;

  textArea.addEventListener("input", () => {
    let text = textArea.value;
    const encodedText = new TextEncoder().encode(text); // UTF-8 바이트 계산

    if (encodedText.length > maxBytes) {
      // 초과 입력 차단
      text = trimToMaxBytes(text, maxBytes);
      textArea.value = text;
    }

    // 현재 바이트 수 갱신
    const currentBytes = new TextEncoder().encode(text).length;
    byteCount.textContent = `${currentBytes} / ${maxBytes} bytes`;
  });
}

document.addEventListener("DOMContentLoaded", function (event) {
  textareaLimitBytes();
});
