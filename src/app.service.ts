import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getCuaca(): string {
    return 'cuaca cerah';
  }

  getBagi(): number {
    const hasil: number = 80 / 4;
    return hasil;
  }
}
