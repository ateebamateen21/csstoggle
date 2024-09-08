// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  console.log('Congratulations, your extension "csstoggle" is now active!');

  const helloWorldCommand = vscode.commands.registerCommand(
    "csstoggle.helloWorld",
    function () {
      vscode.window.showInformationMessage("Hello World from cssToggle!");
    }
  );

  context.subscriptions.push(helloWorldCommand);

  // The actual cssToggle feature
  const toggleClassCommand = vscode.commands.registerCommand(
    "csstoggle.toggleClassVisibility",
    async function () {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return; // No open editor
      }

      const document = editor.document;
      const text = document.getText();

      // Example: Toggle visibility of class attributes
      const newText = text.replace(/class="[^"]*"/g, (match) => {
        return match.length > 10 ? 'class="..."' : match; // Adjust length as needed
      });

      const edit = new vscode.WorkspaceEdit();
      const fullRange = new vscode.Range(
        document.positionAt(0),
        document.positionAt(text.length)
      );
      edit.replace(document.uri, fullRange, newText);
      await vscode.workspace.applyEdit(edit);
    }
  );

  context.subscriptions.push(toggleClassCommand);

  /*
    Concept: Registers a command named "csstoggle.toggleClassVisibility". When this command is executed:
It checks if there's an open text editor.
Retrieves the entire document's text.
Replaces class names longer than 10 characters with a placeholder (class="...").
Applies these changes to the document.

    */
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
