import { Request, Response } from 'express';

export class ImportCategoryController {
  handle(request: Request, response: Response) {
    const { file } = request;
    console.log(file);
    return response.send();
  }
}
