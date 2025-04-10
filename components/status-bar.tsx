export function StatusBar() {
  return (
    <div className="flex items-center justify-between text-xs px-4 py-1 bg-slate-200 dark:bg-slate-800 text-muted-foreground">
      <div className="flex space-x-4">
        <div>Cashier: admin</div>
        <div>Closed: 33</div>
        <div>Idle: 0</div>
        <div>In Use: 8</div>
      </div>

      <div className="flex space-x-4">
        <div>Use Ratio: 20%</div>
        <div>Auto Ping: Off</div>
        <div>v2.3.2</div>
      </div>
    </div>
  )
}
