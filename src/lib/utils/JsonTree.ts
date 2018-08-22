/**
 * @hidden
 */
export type JsonVisitor = (value: any) => void;

/**
 * @hidden
 */
export class JsonTree {
  public static visit(
    data: any,
    visitor: JsonVisitor,
    depth: number = 0
  ): void {
    if (depth > 1000) {
      throw new Error(
        'Tree depth exceeded maximum of 1000, verify the data is not self-referential'
      );
    }

    if (data == null) {
      return;
    } else if (Array.isArray(data)) {
      for (const item of data) {
        JsonTree.visit(item, visitor, depth + 1);
        visitor(item);
      }
    } else if (typeof data === 'object') {
      const keys = Object.keys(data);
      for (const key of keys) {
        JsonTree.visit(data[key], visitor, depth + 1);
        visitor(data[key]);
      }
    }
  }
}
