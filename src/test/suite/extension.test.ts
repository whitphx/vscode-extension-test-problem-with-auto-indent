import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
// import * as myExtension from '../../extension';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Pasting with auto-indent', async () => {
		const doc = await vscode.workspace.openTextDocument({
			content: "{\n\n}",
			language: "json",
		});
		await vscode.window.showTextDocument(doc);
		const activeTextEditor = vscode.window.activeTextEditor;
		assert.ok(activeTextEditor);

		activeTextEditor.options.tabSize = 4;

		activeTextEditor.selection = new vscode.Selection(1, 0, 1, 0)
		await vscode.commands.executeCommand("paste", { text: '"foo": "bar"' })

		assert.strictEqual(activeTextEditor.document.getText(), '{\n    "foo": "bar"\n}')
	});
});
