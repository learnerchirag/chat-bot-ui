import { useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LoginForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const { login, error } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log(name, email)
    await login({name, email})
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <h2 className="text-lg font-semibold text-center mb-4">First thing first<br />Introduce yourself</h2>
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1" />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1"
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Button type="submit" className="w-full">
        Login
      </Button>
    </form>
  )
}

