import { WINDOWS_1252_TABLE } from "./Windows1252Table.js";

export class EncodingService {
  convertHexArrayToWin1252String(hexArray) {
    return hexArray.map(b => WINDOWS_1252_TABLE[b] ?? "?").join("");
  }
}
