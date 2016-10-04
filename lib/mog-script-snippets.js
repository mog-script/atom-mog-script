'use babel';

import mog from 'mog-script';
import { CompositeDisposable } from 'atom';

export default {
  subscriptions: null,

  activate () {
    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'mog-script-snippets:toEmoji': () => this.processText('compile'),
      'mog-script-snippets:toKeywords': () => this.processText('decompile')
    }));
  },

  deactivate () {
    this.subscriptions.dispose();
  },

  processText (action) {
    const editor = atom.workspace.getActiveTextEditor()

    if (!editor) {
      return
    }

    const sourceText = editor.getText()
    let processedText = sourceText

    switch (action) {
      case 'compile':
        processedText = mog.compile(sourceText)
        break
      case 'decompile':
        processedText = mog.decompile(sourceText)
        break
    }
    editor.setText(processedText)
  }
};
