import { Injectable } from "@nestjs/common";
import { createReadStream } from "fs";
import path from "path";

@Injectable()
export class FileService {
  downloadFile(filePath) {
    const stream = createReadStream(path.join(__dirname, filePath));
    return stream;
  }
}
