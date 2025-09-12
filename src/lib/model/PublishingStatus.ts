/**
 * Edition publishing status
 */
export enum PublishingStatus {
  DRAFT = 'DRAFT',
  SCHEDULING = 'SCHEDULING',
  SCHEDULED = 'SCHEDULED',
  PUBLISHED = 'PUBLISHED',
  UNSCHEDULING = 'UNSCHEDULING',
  PUBLISHING = 'PUBLISHING',
}

/**
 * publishing status of the content item
 *
 * NONE - hasn't been published before
 *
 * EARLY - changes have been made since last publish
 *
 * LATEST - no changes have been made since last publish
 */
export enum ContentItemPublishingStatus {
  NONE = 'NONE',
  EARLT = 'EARLY',
  LATEST = 'LATEST',
  UNPUBLISHED = 'UNPUBLISHED',
}
