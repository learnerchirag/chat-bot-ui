import { Settings, SendHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar } from "./avatar"
import { Textarea } from "./ui/textarea"

interface InputBarProps {
  value: string
  onChange: (value: string) => void
  onSend: () => void
  onSettingsClick: () => void
}

export function InputBar({ value, onChange, onSend, onSettingsClick }: InputBarProps) {
  return (
    <div className="p-4 border-t">
      <div className="flex gap-2 mb-2">
        <Avatar initials="CA" />
        <Textarea
          placeholder="Type your question"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !(e.shiftKey || e.metaKey)) {
              e.preventDefault();
              onSend();
            } else if (e.key === 'Enter' && e.shiftKey) {
              onChange(value + '\n');
              e.preventDefault();
            }
          }}
          className="flex-grow border-none ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 border-0 resize-none min-h-1"
        />
      </div>
      <div className="flex items-center gap-2">
        <p>Context</p>
        <div className="flex-1 items-center">
          <Select defaultValue="onboarding">
            <SelectTrigger className="w-[180px] py-1 h-auto">
              <SelectValue placeholder="Select context" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="onboarding">Onboarding</SelectItem>
              <SelectItem value="support">Support</SelectItem>
              <SelectItem value="sales">Sales</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="ghost" size="icon" onClick={onSettingsClick}>
          <Settings className="h-4 w-4" />
        </Button>
        <Button onClick={onSend} variant="ghost" size="icon">
          <SendHorizontal className="h-4 w-4 stroke-primary" />
        </Button>
      </div>
    </div>
  )
}

