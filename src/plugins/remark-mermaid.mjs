import { visit } from 'unist-util-visit'

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export function remarkMermaid() {
  return (tree) => {
    visit(tree, 'code', (node, index, parent) => {
      if (!parent || index === undefined || node.lang !== 'mermaid') return
      const encoded = Buffer.from(node.value, 'utf-8').toString('base64')
      parent.children[index] = {
        type: 'html',
        value: `<div class="sl-mermaid-container not-content" data-mermaid-b64="${encoded}"><pre class="mermaid">${escapeHtml(node.value)}</pre></div>`
      }
    })
  }
}
