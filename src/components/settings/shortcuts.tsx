type keysType = {
  name: string;
  keys: string[]
}

export default function Shortcuts() {
  const keys: keysType[] = [
    { name: "Search Chats", keys: ['Ctrl', 'k'] },
    { name: "New Chat", keys: ['Alt', 'n'] },
    { name: "Toggle Sidebar", keys: ['Alt', 'b'] },
    { name: "Open Settings", keys: ['Ctrl', ','] },
  ]
  return (
    <div>
      {keys.map(({ name, keys }, i) => <div key={i} className='flex justify-between'>
        <div className="text-lg">{name}</div>
        <div className="flex items-end gap-3">
          {keys.map((key) => <div key={key}>{key}</div>)}
        </div>
      </div>)}
    </div>
  )
}

