import { EncodingService } from "../services/EncodingService.js";

export class ConverterController {
  constructor() {
    this.encodingService = new EncodingService();
    this._bindUI();
  }

  _bindUI() {
    document.getElementById("convertBtn")
      .addEventListener("click", () => this.convert());
    document.getElementById("input")
      .addEventListener("keydown", (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          this.convert();
        }
      });
  }

  convert() {
    const inputType = document.getElementById("inputType").value;
    const input = document.getElementById("input").value;
    const output = document.getElementById("output");

    let hexArray;

    if (inputType === "hex") {
      hexArray = input.match(/.{1,2}/g).map(h => parseInt(h, 16));
    } else {
      const utf8Bytes = new TextEncoder().encode(input);
      hexArray = Array.from(utf8Bytes).map(b => (b <= 0xFF ? b : 0x3F));
    }

    const outputValue = this.encodingService.convertHexArrayToWin1252String(hexArray);
    output.value = outputValue;

    output.focus();
  }
}
