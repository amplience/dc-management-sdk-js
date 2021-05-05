import { HalResource } from '../hal/models/HalResource';
import { Hub } from './Hub';
import { Page } from './Page';

/**
 * Class representing the [Webhook](https://amplience.com/docs/api/dynamic-content/management/#tag/Webhooks) resource.
 * A Webhook is a HTTP callback: a HTTP request that occurs when something happens; a simple event-notification via the HTTP protocol.
 */
export class Webhook extends HalResource {
  /**
   * Unique id generated on creation
   */
  public id?: string;

  /**
   * Friendly display label for the Webhook
   */
  public label?: string;

  /**
   * List of events that will cause this webhook to trigger
   */
  public events?: string[];

  /**
   * List of callback URLs to invoke when an event triggers
   */
  public handlers?: string[];

  /**
   * List of custom webhook headers to be sent.
   */
  public headers?: WebhookHeader[];

  /**
   * List of filters used to gate sending of webhooks.
   */
  public filters?: WebhookFilter[];

  /**
   * The webhooks HTTP method.
   */
  public method?: 'POST' | 'PUT' | 'PATCH' | 'DELETE';

  /**
   * A customized payload format.
   */
  public customPayload?: WebhookCustomPayload;

  /**
   * Enables or disables the webhook
   */
  public active?: boolean;

  /**
   * When a notification is sent, this value will be used to calculate a cryptographic hash which is transmitted as part of the notification.
   * This hash can be used to assert a trusted party sent the notification.
   */
  public secret?: string;

  /**
   * Resources and actions related to a Webhook
   */
  public readonly related = {
    /**
     * Retrieves the Hub this webhook is stored in
     */
    hub: (): Promise<Hub> => this.fetchLinkedResource('hub', {}, Hub),

    /**
     * Delete Webhook
     */
    delete: (): Promise<void> => this.deleteResource(),

    /**
     * Updates this Webhook with the changes in the mutation parameter.
     * @param mutation
     */
    update: (mutation: Webhook): Promise<Webhook> =>
      this.updateResource(mutation, Webhook),
  };

  public parse(data: unknown): void {
    super.parse(data);

    if (this.headers) {
      this.headers.forEach((header) => {
        // secret can come back as null, lets convert this to false
        if (header.secret == null) {
          header.secret = false;
        }
      });
    }
  }
}

/**
 * A custom webhook header which will be sent along with a webhook.
 */
export type WebhookHeader = {
  /**
   * The header
   */
  key: string;

  /**
   * The header's value.
   */
  value: string;

  /**
   * Indicates this header value is sensitive.
   */
  secret?: boolean;
};

/**
 * A custom payload format for the webhook.
 */
export type WebhookCustomPayload = {
  /**
   * MIME type of the custom payload.
   */
  type: 'text/x-handlebars-template';

  /**
   * Custom payload.
   */
  value: string;
};

/**
 * A webhook filter.
 */
export type WebhookFilter = {
  /**
   * The type of filter.
   */
  type: 'equal' | 'in';

  /**
   * The arguments for the filter.
   */
  arguments: [WebhookFilterJSONPathArgument, WebhookFilterValueArgument];
};

/**
 * A JSON Path argument.
 */
export type WebhookFilterJSONPathArgument = {
  jsonPath: string;
};

/**
 * A value argument.
 */
export type WebhookFilterValueArgument = {
  value: string | string[];
};

/**
 * @hidden
 */
export class WebhooksPage extends Page<Webhook> {
  constructor(data?: any) {
    super('webhooks', Webhook, data);
  }
}
