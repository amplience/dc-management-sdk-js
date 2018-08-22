import { HalResource, HalResourceConstructor } from '../hal/models/HalResource';

/**
 * @hidden
 */
export abstract class EmbeddedCollection<
  T extends HalResource
> extends HalResource {
  private key: string;
  private resourceType: HalResourceConstructor<T>;
  private items: T[];

  constructor(
    key: string,
    resourceType: HalResourceConstructor<T>,
    data?: any
  ) {
    super(data);
    this.key = key;
    this.resourceType = resourceType;
  }

  public getItems(): T[] {
    if (!this.items) {
      this.items = this.parseEmbedded<T>(this.key, this.resourceType);
    }
    return this.items;
  }
}
