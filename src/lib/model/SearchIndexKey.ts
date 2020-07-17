import { HalResource } from '../hal/models/HalResource';

export class SearchIndexKey extends HalResource {
  public id?: string;

  public type?: string;

  public key?: string;

  public applicationId?: string;
}
