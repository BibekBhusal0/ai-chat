type keysType = {
  name: string;
  keys: string[]
}

export default function Shortcuts() {
  const keys: keysType[] = [
    { name: "Search Chats", keys: ['Ctrl', 'K'] },
    { name: "New Chat", keys: ['Alt', 'N'] },
    { name: "Toggle Sidebar", keys: ['Alt', 'B'] },
    { name: "Open Settings", keys: ['Ctrl', ','] },
  ]

  return (
    <div className='divide-y-1 divide-divider'>
      {keys.map(({ name, keys }, i) => <div key={i} className='flex justify-between py-2'>
        <div className="text-lg text-primary-900">{name}</div>
        <div className="flex items-center gap-3">
          {keys.map((key, j) => <div key={j} className="px-2 py-1 bg-default-100 rounded text-sm">{key}</div>)}
        </div>
      </div>)}
    </div>
  )
}

