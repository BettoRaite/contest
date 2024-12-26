type Items = "user" | "work-shift" | "request";
class IdGenerator {
  private map: Map<Items, number> = new Map();
  getId(key: Items) {
    const id = this.map.get(key) ?? 0;
    this.map.set(key, id + 1);
    return id;
  }
}

export const idGenerator = new IdGenerator();
