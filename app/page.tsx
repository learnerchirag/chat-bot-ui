import { ChatWidget } from "@/components/chat-widget";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <ChatWidget />
    </div>
  );
}
