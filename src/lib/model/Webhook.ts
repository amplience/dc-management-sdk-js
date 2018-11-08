import { HalResource } from '../hal/models/HalResource';
import { Page } from './Page';

/**
 * Class representing the [Webhook](https://api.amplience.net/v2/content/docs/api/index.html#resources-webhooks) resource.
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
    delete: (): Promise<void> => this.deleteResource()
  };
}

/**
 * @hidden
 */
export class WebhooksPage extends Page<Webhook> {
  constructor(data?: any) {
    super('webhooks', Webhook, data);
  }
}
