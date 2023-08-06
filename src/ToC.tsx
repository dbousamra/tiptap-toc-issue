import { TableOfContentDataItem } from '@tiptap-pro/extension-table-of-content'
import { TextSelection } from '@tiptap/pm/state'
import { Editor } from '@tiptap/react'

interface TocItemProps {
  index: number
  item: TableOfContentDataItem & { level: number }
  onItemClick: (e: React.MouseEvent<HTMLAnchorElement>, id: string) => void
}

export const ToCItem = (props: TocItemProps) => {
  const { item, onItemClick } = props;

  return (
    <div className={`toc--item toc--item--level_${item.level}`} style={{
      // '--level': item.level,
    }}>
      <a style={{
        display: 'block',
        backgroundColor: item.isActive ? 'rgba(0, 0, 0, .05)' : 'transparent',
        color: item.isScrolledOver && !item.isActive ? '#888' : '#000',
        borderRadius: '4px',
      }} href={`#${item.id}`} onClick={e => onItemClick(e, item.id)}>{item.itemIndex}. {item.textContent}</a>
    </div>
  )
}

export const ToCEmptyState = () => {
  return (
    <div className="toc--empty_state">
      <p>Start editing your document to see the outline.</p>
    </div>
  )
}


interface ToCProps {
    items: TableOfContentDataItem[],
    editor: Editor
}

export const ToC = (props: ToCProps) => {

  const { items, editor } = props;

  if (items.length === 0) {
    return <ToCEmptyState />
  }

  const onItemClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()

    if (editor) {
      const element = editor.view.dom.querySelector(`[data-toc-id="${id}"`)
      const pos = editor.view.posAtDOM(element!, 0)

      // set focus
      const tr = editor.view.state.tr

      tr.setSelection(new TextSelection(tr.doc.resolve(pos)))

      editor.view.dispatch(tr)

      editor.view.focus()

      // if (history.pushState) { // eslint-disable-line
      //   // @ts-ignore 
      //   history.pushState(null, null, `#${id}`) // eslint-disable-line
      // }

      window.scrollTo({
        top: element!.getBoundingClientRect().top + window.scrollY,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div className="toc--list">
      {items.map((item, i) => (
        <ToCItem  key={item.id} onItemClick={onItemClick} item={item} index={i + 1} />
      ))}
    </div>
  )
}