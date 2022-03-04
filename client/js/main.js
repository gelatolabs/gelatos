/* GoldenLayout setup */
var config = {
    content: [{
        type: 'row',
        isClosable: false
    }]
};
var layout = new GoldenLayout(config, $('#layoutContainer'));

layout.registerComponent('window', function(container, state) {
    container.getElement().html(state.content);

    container.on('tab', function(tab) {
        tab.element.prepend($('<img src="img/apps/' + container._config.title + '.png" />'));
    });
});

layout.init();

/* GelatoHello */
var menuHello = $('<li><img src="img/apps/GelatoHello.png" />GelatoHello</li>');
$('#menuContainer').append(menuHello);
menuHello.click(function() {
    layout.root.contentItems[0].addChild({
        title: 'GelatoHello',
        type: 'component',
        componentName: 'window',
        componentState: { content: '<p>Hello, world!</p>' }
    });
});

/* GelatoTerm */
var termNum = 0;
var menuTerm = $('<li><img src="img/apps/GelatoTerm.png" />GelatoTerm</li>');
$('#menuContainer').append(menuTerm);
menuTerm.click(function() {
    layout.root.contentItems[0].addChild({
        title: 'GelatoTerm',
        type: 'component',
        componentName: 'window',
        componentState: {
            content: '<div class="termContainer" id="termContainer-' + termNum + '"></div>'
        }
    });
    createTerm($('#termContainer-' + termNum)[0]);
});

async function createTerm(termContainer) {
    termNum++;

    var term = new Terminal({
        fontFamily: 'Go-Mono, monospace',
        fontSize: 12,
        theme: {
            foreground: '#0f0'
        }
    });
    term.open(termContainer);
    term.focus();

    term.history = [];
    term.pwd = "/";

    var termFit = new FitAddon.FitAddon();
    term.loadAddon(termFit);
    termFit.fit(termContainer.clientWidth, termContainer.clientHeight);

    var localEcho = new LocalEchoController();
    term.loadAddon(localEcho);

    term.onKey(e => {input = termKeyEvent(e, term, localEcho)});

    while (true) {
        await localEcho.read(term.pwd + '$ ')
            .then(input => gsh(term, localEcho, input))
            .catch(error => void(0));
    }
}

/* Use OS dark/light theme preference by default */
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    document.querySelector('#theme-dark').disabled = 'disabled';
    document.querySelector('#theme-light').disabled = undefined;
}

/* Track uptime */
bootTime = new Date();
function uptime() {
    var delta = Math.abs(bootTime - new Date()) / 1000;
    var days = Math.floor(delta / 86400);
    delta -= days * 86400;
    var hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;
    var minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;
    var seconds = Math.floor(delta % 60);

    result = "";
    if (days > 0) { result += days + "d " }
    if (hours > 0) { result += hours + "h " }
    if (minutes > 0) { result += minutes  + "m " }
    if (seconds > 0) { result += seconds + "s " }
    return result;
}
