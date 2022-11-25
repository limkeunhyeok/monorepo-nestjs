import { Injectable } from "@nestjs/common";
import { Response } from "express";
import {
  createReadStream,
  existsSync,
  readFileSync,
  ReadStream,
  unlinkSync,
  writeFileSync,
} from "fs";
import * as path from "path";

@Injectable()
export class FileService {
  rootPath: string;

  constructor() {
    this.rootPath = path.join(__dirname, "../../");
  }

  downloadFile(filepath, filename: string, res: Response) {
    const stream = createReadStream(path.join(filepath, filename));
    stream.pipe(res);
  }

  // uploadFile() {}

  readFile(filename: string): Record<string, unknown> {
    const bufferedData = readFileSync(path.join(this.rootPath, filename));
    const jsonData = JSON.parse(bufferedData.toString());
    return jsonData;
  }

  // parsedFile() {}

  createFile(filename: string, data: Record<string, unknown>): void {
    const stringData = JSON.stringify(data);
    writeFileSync(path.join(this.rootPath, filename), stringData);
  }

  deleteFile(filename: string): void {
    if (existsSync(path.join(this.rootPath, filename))) {
      unlinkSync(path.join(this.rootPath, filename));
    }
  }
}
