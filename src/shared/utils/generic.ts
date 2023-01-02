import { Request } from 'express';

class GenericHelper {
  /**
   * It generates a unique Filename.
   * @static
   * @memberof GenericHelper
   * @returns {String} - A unique string.
   */
  static generateUniqueFileName(): string {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  static getIpAddress(req: Request) {
    return req.headers['x-forwarded-for'] || req.ip || req.socket.remoteAddress;
  }

  static getReferrerToken(req: Request) {
    return req.headers.referer || req.headers.referrer;
  }

  static getHttpVersionToken(req: Request) {
    return req.httpVersionMajor + '.' + req.httpVersionMinor;
  }

  /**
   * truncates a file name to a desired length
   * @static
   * @param { String } name - The name to be truncated.
   * @param { Number } length - The desired length of the string.
   * @memberof GenericHelper
   * @returns { String } - Returns a string whose maximum length doesn't exceed the desired length.
   */
  static truncateFileName(name: string, length: number | 100): string {
    return name.length <= length
      ? name
      : `${name.slice(0, length / 2)}${name.slice(name.indexOf('.'))}`;
  }

  /**
   * Converts a buffer to string
   * @param blob :
   * @memberof GenericHelper
   * @returns { String } -
   */
  public static bufferToString(blob: any): string {
    const b = Buffer.from(blob);
    return b.toString();
  }

  public static clfdate(dateTime: Date) {
    const CLF_MONTH = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const date = dateTime.getUTCDate();
    const hour = dateTime.getUTCHours();
    const mins = dateTime.getUTCMinutes();
    const secs = dateTime.getUTCSeconds();
    const year = dateTime.getUTCFullYear();

    const month = CLF_MONTH[dateTime.getUTCMonth()];

    return (
      GenericHelper.pad2(date) +
      '/' +
      month +
      '/' +
      year +
      ':' +
      GenericHelper.pad2(hour) +
      ':' +
      GenericHelper.pad2(mins) +
      ':' +
      GenericHelper.pad2(secs) +
      ' +0000'
    );
  }

  static pad2(num: number) {
    const str = String(num);

    // istanbul ignore next: num is current datetime
    return (str.length === 1 ? '0' : '') + str;
  }
}

export default GenericHelper;
