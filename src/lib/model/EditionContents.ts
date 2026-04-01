import { HalResource } from '../hal/models/HalResource';
import { Edition } from './Edition';
import { EditionContent } from './EditionContent';

/**
 * EditionsContents represents the content of an Edition, and provides methods for updating the content and retrieving the associated Edition
 */
export class EditionContents extends HalResource {
  public id?: string;
  public content?: EditionContent | null;
  public readonly related = {
    /**
     * Update content of this EditionContents
     */
    updateContent: (mutation: EditionContent): Promise<EditionContent> =>
      this.updateLinkedResource('content', {}, mutation, EditionContent),

    /**
     * Updates this EditionContents
     */
    update: (mutation: EditionContents): Promise<EditionContents> =>
      this.updateResource(mutation, EditionContents),

    /**
     * Retrieves the Edition associated with this EditionContent
     */
    edition: (): Promise<Edition> =>
      this.fetchLinkedResource('edition', {}, Edition),
  };
}
