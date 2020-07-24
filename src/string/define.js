import { defineStatic, defineInstance } from '../core/string';
import * as methods from './methods';

defineStatic('range', methods.range);
defineInstance('at', methods.at);
defineInstance('camelize', methods.camelize);
defineInstance('capitalize', methods.capitalize);
defineInstance('compact', methods.compact);
defineInstance('dasherize', methods.dasherize);
defineInstance('decodeBase64', methods.decodeBase64);
defineInstance('encodeBase64', methods.encodeBase64);
defineInstance('escapeHtml', methods.escapeHtml);
defineInstance('first', methods.first);
defineInstance('from', methods.from);
defineInstance('insert', methods.insert);
defineInstance('isBlank', methods.isBlank);
defineInstance('isEmpty', methods.isEmpty);
defineInstance('last', methods.last);
defineInstance('pad', methods.pad);
defineInstance('parameterize', methods.parameterize);
defineInstance('remove', methods.remove);
defineInstance('replaceWith', methods.replaceWith);
defineInstance('reverse', methods.reverse);
defineInstance('spacify', methods.spacify);
defineInstance('stripTags', methods.stripTags);
defineInstance('titleize', methods.titleize);
defineInstance('to', methods.to);
defineInstance('toNumber', methods.toNumber);
defineInstance('truncate', methods.truncate);
defineInstance('truncateOnWord', methods.truncateOnWord);
defineInstance('underscore', methods.underscore);
defineInstance('unescapeHtml', methods.unescapeHtml);
