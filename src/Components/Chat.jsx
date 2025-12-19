import { useState } from "react";

export default function ChatAssistant({ onClose }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.content }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Request failed");
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-20 right-6 w-80 bg-white shadow-xl rounded-lg border z-50">

      <div className="flex justify-between items-center bg-blue-600 text-white px-4 py-2 rounded-t-lg">
        <span>E-Library Assistant</span>
        <button onClick={onClose}>✕</button>
      </div>


      <div className="p-3 h-64 overflow-y-auto text-sm space-y-2">
        {messages.length === 0 && (
          <p className="text-gray-400">Ask me anything about the library…</p>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded max-w-[85%] ${msg.role === "user"
              ? "ml-auto bg-blue-600 text-white"
              : "mr-auto bg-gray-100"
              }`}
          >
            {msg.content}
          </div>
        ))}

        {loading && (
          <p className="text-gray-400 italic text-xs">
            Assistant is typing…
          </p>
        )}

        {error && <p className="text-red-500">{error}</p>}
      </div>


      <div className="p-2 border-t">
        <textarea
          className="w-full border p-2 rounded text-sm"
          rows={2}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your question..."
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="mt-2 w-full bg-blue-600 text-white py-1 rounded"
        >
          {loading ? "Thinking..." : "Send"}
        </button>
      </div>
    </div>
  );
}
