const isDevelopment = process.env.NODE_ENV === "development";

export class Logger {
  static prefix = "🎲:bgg::";

  static debug(...params: any[]) {
    if (isDevelopment) {
      console.log(this.prefix, ...params);
    }
  }

  static info(...params: any[]) {
    console.log(this.prefix, ...params);
  }

  static error(...params: any[]) {
    console.error(this.prefix, ...params);
  }
}
