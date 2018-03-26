/** Construct a URL with a bunch of args. */
import { Map } from 'immutable';

function validArgs(rootUrl, args) {
  return rootUrl && args && args.length !== 0;
}

function constructUrl(rootUrl, args) {
  const sep = u => (u.indexOf('?') > -1 ? '&' : '?');
  return args.reduce((r, v, k) => `${r}${sep(r)}${k}=${v}`, rootUrl);
}

export function url(root : string, args: Map<string, string>) : string {
  return validArgs(root, args) ? constructUrl(root, args) : root;
}
