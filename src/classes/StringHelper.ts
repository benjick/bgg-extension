export class StringHelper {
  static stringsToRemove = [
    "(exp.)",
    "(swe)",
    "(sve)",
    "(swe.)",
    "(eng)",
    "(eng.)",
  ];

  static escapeRegExp(string: string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  static sanitizeName(name: string) {
    name = name.trim().split("\n")[0];
    return this.stringsToRemove
      .reduce((string, toRemove) => {
        const safeNeedle = this.escapeRegExp(toRemove);
        return string.replace(new RegExp(safeNeedle, "gi"), "");
      }, name)
      .trim();
  }

  static camelCaseToHyphen(string: string) {
    return string
      .split(/(?=[A-Z])/)
      .join("-")
      .toLowerCase();
  }
}
