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
 * @hidden
 */
export class WebhooksPage extends Page<Webhook> {
  constructor(data?: any) {
    super('webhooks', Webhook, data);
  }
}
