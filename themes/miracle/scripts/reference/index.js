var renderFootnotes = require('./lib/footnotes');
util = require('hexo-util');

// Register footnotes filter
hexo.extend.filter.register('before_post_render', function (data) {
  data.content = renderFootnotes(data.content);
  return data;
});