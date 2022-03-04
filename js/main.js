var config = {
    content: [{
        type: 'row',
        isClosable: false
    }]
};
var layout = new GoldenLayout(config, $('#layoutContainer'));

layout.registerComponent('window', function(container, state) {
    container.getElement().html(state.content);
});

layout.init();

/* GelatoHello */
var menuHello = $('<li>GelatoHello</li>');
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
var menuTerm = $('<li>GelatoTerm</li>');
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

function createTerm(termContainer) {
    termNum++;

    var term = new Terminal({
        fontFamily: 'Go-Mono, monospace',
        theme: {
            foreground: '#0f0'
        }
    });
    term.open(termContainer);
    term.focus();

    var termFit = new FitAddon.FitAddon();
    term.loadAddon(termFit);
    termFit.fit(termContainer.clientWidth, termContainer.clientHeight);

    var localEcho = new LocalEchoController();
    term.loadAddon(localEcho);

    localEcho.read('$ ');
}
