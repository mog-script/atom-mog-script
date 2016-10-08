'use babel'

import mog from 'mog-script'
import { CompositeDisposable } from 'atom'

const KEYWORDS_MAP_CONFIG_KEY = 'mog-script-snippets.keyword:'

export default {
  subscriptions: null,

  config: {
    [`keyword:`]: {
      title: 'Keywords Map',
      type: 'object',
      properties: getKeywordsMapAsConfigObject(mog.keywordsMap)
    }
  },

  activate () {
    this.subscriptions = new CompositeDisposable()

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'mog-script-snippets:toEmoji': () => this.processText('decompile'),
      'mog-script-snippets:toKeywords': () => this.processText('compile')
    }))
  },

  deactivate () {
    this.subscriptions.dispose()
  },

  processText (action) {
    const editor = atom.workspace.getActiveTextEditor()

    if (!editor) {
      return
    }

    const sourceText = editor.getText()
    const currentMap = atom.config.get(KEYWORDS_MAP_CONFIG_KEY) || mog.keywordsMap

    editor.setText(mog[action](sourceText, currentMap))
  }
}

function getKeywordsMapAsConfigObject(keywordsMap) {
  return Object.keys(keywordsMap).reduce((mappedObj, key) => {
    mappedObj[key] = {
      type: 'string',
      default: keywordsMap[key]
    }
    return mappedObj
  }, {})
}
