/**
 * @hidden
 */
// tslint:disable-next-line
const template = require('url-template');

/**
 * @hidden
 */
export class CURIEs {
  public static expand(href: string, variables?: any): string {
    variables = variables || {};
    const compiledTemplate = template.parse(href);
    return compiledTemplate.expand(variables);
  }
}
