"use client"

import { useState } from "react"
import { Header } from "./header"
import { InputBar } from "./input-bar"
import type { Message as MessageType, User } from "../types/chat"

const botUser: User = {
  id: "bot",
  name: "Ava",
  avatar: "https://miro.medium.com/v2/resize:fit:525/1*lyyXmbeoK5JiIBNCnzzjjg.png",
  initials: "AV",
}

export function ChatWidget() {
  const [inputValue, setInputValue] = useState("")

  const handleSend = () => {
  }


  return (
    <div className="flex flex-col h-[80vh] w-[400px] bg-background rounded-3xl shadow-lg">
      <Header user={botUser} onClose={() => console.log("Close clicked")} />
      <div className="flex-1 overflow-y-auto p-4 space-y-4 border-none">
      </div>
      <InputBar
        value={inputValue}
        onChange={setInputValue}
        onSend={handleSend}
        onSettingsClick={() => console.log("Settings clicked")}
      />
    </div>
  )
}