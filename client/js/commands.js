commands = {
    clear: { description: "clear the terminal screen" },
    history: { description: "return command history" },
    pwd: { description: "return working directory name" },
    reboot: { description: "reboot the machine" },
    screenfetch: { description: "display system information" },
    uptime: { description: "tell how long the system has been running" },
    whatis: { description: "describe commands" }
};

commands.clear.run = function(args, term, echo) {
    echo.print('\x9B2J\x9BH');
};

commands.history.run = function(args, term, echo) {
    for (var i = 0; i < term.history.length; i++) {
        echo.println(term.history[i]);
    }
};

commands.pwd.run = function(args, term, echo) {
    echo.println(term.pwd);
};

commands.reboot.run = function(args, term, echo) {
    location.reload();
};

commands.screenfetch.run = function(args, term, echo) {
    var theme = "Light";
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        theme = "Dark";
    }

    echo.println(`
[0m[1m            #########           [0m[0m[37m [0m[37mgelato[0m[1m@[0m[0m[37m`+location.hostname+`[0m[0m
[0m[1m        #################       [0m[0m[37m [0m[37mOS:[0m GelatOS[0m[0m
[0m[1m     ####               ####    [0m[0m[37m [0m[37mUptime:[0m `+uptime()+`[0m[0m
[0m[1m   ###       #######       ###  [0m[0m[37m [0m[37mShell:[0m gsh[0m[0m
[0m[1m  ###     #############     ### [0m[0m[37m [0m[37mResolution:[0m `+document.body.clientWidth+`x`+document.body.clientHeight+`[0m[0m
[0m[1m ###     ###############     ###[0m[0m[37m [0m[37mWM:[0m GoldenLayout[0m[0m
[0m[1m ###     ###############     ###[0m[0m[37m [0m[37mCSS Theme:[0m `+theme+` [0m
[0m[1m ###     ###############     ###[0m[0m[37m [0m[37mTerminal:[0m Xterm.js[0m[0m
[0m[1m  ###  ###################  ### [0m[0m[37m [0m[37mFont:[0m Go 12[0m[0m
[0m[1m   ###  ###  ### ###  ###  ###  [0m[0m
[0m[1m     ####               ####    [0m[0m
[0m[1m        #################       [0m[0m
[0m[1m            #########          [0m[0m
        `);
};

commands.uptime.run = function(args, term, echo) {
    echo.println(uptime());
};

commands.whatis.run = function(args, term, echo) {
    if (args.length == 0) {
        echo.println("whatis what?");
    } else {
        for (var i = 0; i < args.length; i++) {
            if (args[i] in commands) {
                echo.println(args[i] + ": " + commands[args[i]].description);
            }
        }
    }
};
