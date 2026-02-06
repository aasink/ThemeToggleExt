const vscode = require('vscode')

function activate (context) {

    const statusBar_button = vscode.window.createStatusBarItem(
        vscode.StatusBarAlignment.Left,      // create status bar button
        100
    );

    statusBar_button.text = "$(color-mode)";      // set button properties
    statusBar_button.tooltip = "Toggle Theme";
    statusBar_button.command = "themeToggle.toggle";
    statusBar_button.show();

    context.subscriptions.push(statusBar_button);

    const disposable = vscode.commands.registerCommand(
        "themeToggle.toggle",       // register command
        () => toggleTheme()
    )

    context.subscriptions.push(disposable);
}

function toggleTheme () {
    const config = vscode.workspace.getConfiguration("workbench");
    const current_theme = config.get("colorTheme");

    const themes = [
        "Solarized Light",
        "Dracula Theme",
    ];

    const idx = themes.indexOf(current_theme);
    const nextIdx = (idx + 1) % themes.length;
    const new_theme = themes[nextIdx];             // get next theme

    config.update("colorTheme", new_theme, vscode.ConfigurationTarget.Global)    // update global theme settings

    vscode.window.setStatusBarMessage(`Switched to ${new_theme}`, 5000);    // status bar msg notifying theme change
}

function deactivate () {}

module.exports = { activate, deactivate };