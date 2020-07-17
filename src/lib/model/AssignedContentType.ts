import { HalResource } from '../hal/models/HalResource';
import { Page } from './Page';

export class AssignedContentType extends HalResource {
  public id?: string;

  public contentTypeUri?: string;

  public createdDate?: string;

  public lastModifiedDate?: string;
}

/**
 * @hidden
 */
export class AssignedContentTypePage extends Page<AssignedContentType> {
  constructor(data?: any) {
    super('assigned-content-types', AssignedContentType, data);
  }
}
