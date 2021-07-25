var config = {
  name: 'Tooltip',
  repo: 'sa-si-dev/tooltip',
};

window.$docsify = {
  name: config.name,
  repo: config.repo,
  themeColor: '#512DA8',
  homepage: 'get-started.md',
  topMargin: 50,
  loadSidebar: true,
  coverpage: true,
  auto2top: true,
  executeScript: true,
  copyCode: {
    buttonText: 'Copy',
  },
  plugins: [docsifyPlugin],
};

function docsifyPlugin(hook, vm) {
  hook.beforeEach(docsifyPluginBeforeEach);
  hook.doneEach(docsifyPluginDoneEach);
}

function docsifyPluginBeforeEach(content) {
  content = replacePlaceholders(content);

  return content;
}

function docsifyPluginDoneEach() {
  replacePlaceholdersForElement('.sidebar-nav');
  replacePlaceholdersForElement('.docsify-pagination-container');
}

function replacePlaceholdersForElement(selector) {
  var ele = document.querySelector(selector);

  if (!ele) {
    return;
  }

  ele.innerHTML = replacePlaceholders(ele.innerHTML);
}

function replacePlaceholders(content) {
  Object.keys(config).forEach(function (placeholder) {
    var value = config[placeholder];

    if (value) {
      var regexp = new RegExp('{{' + placeholder + '}}', 'g');
      content = content.replace(regexp, value);
    }
  });

  return content;
}

function initPageGetStarted() {
  replacePlaceholdersForElement('.cover-main');
}
