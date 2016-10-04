'use babel';

import mog from 'mog-script';
import { CompositeDisposable } from 'atom';

export default {
  subscriptions: null,

  activate () {
    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'mog-script-snippets:toEmoji': () => this.processText('decompile'),
      'mog-script-snippets:toKeywords': () => this.processText('compile')
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
    editor.setText(mog[action](sourceText))
  }
};
