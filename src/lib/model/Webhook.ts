import { HalResource } from '../hal/models/HalResource';
import { Hub } from './Hub';
import { Page } from './Page';

/**
 * Class representing the [Webhook](https://amplience.com/docs/api/dynamic-content/management/#tag/Webhooks) resource.
 * A WebHook is an HTTP callback: an HTTP POST that occurs when something happens; a simple event-notification via HTTP POST.
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
   * List of custom webhook headers to be send with webhook.
   */
  public headers?: WebhookHeader[];

  /**
   * List of filters used to gate sending of webhooks.
   */
  public filters?: WebhookFilter[];

  /**
   * The HTTP method the webhook should use to communicate with the handlers.
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

    delete: (): Promise<void> => this.deleteResource(),
  };
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
   * The headers value.
   */
  value: string;
  /**
   * Is the header a secret.
   */
  secret: boolean;
};

/**
 * A custom payload format for the webhook.
 */
export type WebhookCustomPayload = {
  /**
   * What type of custom payload format being used.
   */
  type: 'text/x-handlebars-template';

  /**
   * The shape of the custom payload.
   */
  value: string;
};

/**
 * A webhook filter to allow for body to be interigated to control whether a webhook is sent or not.
 */
export type WebhookFilter = {
  /**
   * The how will the filter arguments be treated.
   */
  type: 'equal' | 'in';
  /**
   * The arguments for the filter.
   */
  arguments: (WebhookFilterJSONPathArgument | WebhookFilterValueArgument)[];
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
