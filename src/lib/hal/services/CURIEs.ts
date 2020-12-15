/**
 * @hidden
 */

import template from 'url-template';

/**
 * @hidden
 */
export class CURIEs {
  public static expand(href: string, variables?: unknown): string {
    variables = variables || {};
    const compiledTemplate = template.parse(href);
    return compiledTemplate.expand(variables);
  }
}
