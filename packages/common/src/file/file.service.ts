import { Injectable } from "@nestjs/common";
import {
  createReadStream,
  existsSync,
  readFileSync,
  unlinkSync,
  writeFileSync,
} from "fs";
import * as path from "path";

@Injectable()
export class FileService {
  rootPath = path.join(__dirname, "../../");

  downloadFile(filePath) {
    const stream = createReadStream(path.join(this.rootPath, filePath));
    return stream; // nest StreamableFile, options을 통해 type, dispositon, length 지정 가능
  }

  // uploadFile() {}

  readFile(filePath) {
    const bufferedData = readFileSync(path.join(this.rootPath, filePath));
    const jsonData = JSON.parse(bufferedData.toString());
    return jsonData;
  }

  createFile(filePath, data) {
    const stringData = JSON.stringify(data);
    writeFileSync(path.join(this.rootPath, filePath), stringData);
  }

  // parsedFile() {}

  deleteFile(filePath) {
    if (existsSync(path.join(this.rootPath, filePath))) {
      unlinkSync(path.join(this.rootPath, filePath));
    }
  }

  // zippedFile() {}
}
