"use client"

import { useState } from "react"
import Link from "next/link"
import { PlusCircle, Search, MoreVertical, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type Message = {
  id: number
  content: string
  sender: "vendor" | "buyer"
  timestamp: string
  read: boolean
}

type Conversation = {
  id: number
  company: string
  avatar: string
  lastMessage: string
  timestamp: string
  unread: number
  messages: Message[]
}

export default function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: 1,
      company: "Global Construction Corp",
      avatar: "GC",
      lastMessage: "We need additional information about your safety certifications for the upcoming project.",
      timestamp: "2 hours ago",
      unread: 2,
      messages: [
        {
          id: 1,
          content: "Hello, we're considering your company for our upcoming project in Dubai.",
          sender: "buyer",
          timestamp: "2023-04-10T10:30:00",
          read: true,
        },
        {
          id: 2,
          content: "Thank you for considering us. We'd be happy to provide any information you need.",
          sender: "vendor",
          timestamp: "2023-04-10T11:15:00",
          read: true,
        },
        {
          id: 3,
          content:
            "Great! We need additional information about your safety certifications for the upcoming project. Can you share your latest safety records and certifications?",
          sender: "buyer",
          timestamp: "2023-04-11T09:45:00",
          read: false,
        },
        {
          id: 4,
          content: "Also, do you have experience working in similar environments?",
          sender: "buyer",
          timestamp: "2023-04-11T09:47:00",
          read: false,
        },
      ],
    },
    {
      id: 2,
      company: "Tech Solutions Inc",
      avatar: "TS",
      lastMessage: "Thank you for submitting your proposal. We have a few follow-up questions.",
      timestamp: "Yesterday",
      unread: 1,
      messages: [
        {
          id: 1,
          content: "We've received your proposal for the IT infrastructure upgrade.",
          sender: "buyer",
          timestamp: "2023-04-09T14:20:00",
          read: true,
        },
        {
          id: 2,
          content: "Thank you for confirming. Is there anything specific you'd like to discuss?",
          sender: "vendor",
          timestamp: "2023-04-09T15:05:00",
          read: true,
        },
        {
          id: 3,
          content:
            "Thank you for submitting your proposal. We have a few follow-up questions about your implementation timeline and resource allocation.",
          sender: "buyer",
          timestamp: "2023-04-10T11:30:00",
          read: false,
        },
      ],
    },
    {
      id: 3,
      company: "Manufacturing Partners",
      avatar: "MP",
      lastMessage: "Your annual compliance documents have been reviewed and approved.",
      timestamp: "3 days ago",
      unread: 0,
      messages: [
        {
          id: 1,
          content: "We've completed the review of your annual compliance documents.",
          sender: "buyer",
          timestamp: "2023-04-08T09:15:00",
          read: true,
        },
        {
          id: 2,
          content: "Thank you for the update. Is there anything else you need from us?",
          sender: "vendor",
          timestamp: "2023-04-08T10:20:00",
          read: true,
        },
        {
          id: 3,
          content:
            "Your annual compliance documents have been reviewed and approved. You're all set for the coming year.",
          sender: "buyer",
          timestamp: "2023-04-08T11:45:00",
          read: true,
        },
        {
          id: 4,
          content: "That's great news! Thank you for the confirmation.",
          sender: "vendor",
          timestamp: "2023-04-08T13:10:00",
          read: true,
        },
      ],
    },
  ])

  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(conversations[0])
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const handleSelectConversation = (conversation: Conversation) => {
    // Mark all messages as read when selecting a conversation
    const updatedConversations = conversations.map((conv) => {
      if (conv.id === conversation.id) {
        return {
          ...conv,
          unread: 0,
          messages: conv.messages.map((msg) => ({ ...msg, read: true })),
        }
      }
      return conv
    })

    setConversations(updatedConversations)
    setSelectedConversation(conversation)
  }

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return

    const updatedConversations = conversations.map((conv) => {
      if (conv.id === selectedConversation.id) {
        const newMsg: Message = {
          id: Math.max(...conv.messages.map((m) => m.id)) + 1,
          content: newMessage,
          sender: "vendor",
          timestamp: new Date().toISOString(),
          read: true,
        }

        return {
          ...conv,
          lastMessage: newMessage,
          timestamp: "Just now",
          messages: [...conv.messages, newMsg],
        }
      }
      return conv
    })

    setConversations(updatedConversations)
    setSelectedConversation(updatedConversations.find((c) => c.id === selectedConversation.id) || null)
    setNewMessage("")
  }

  const filteredConversations = conversations.filter((conv) =>
    conv.company.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col md:flex-row">
      <div className="w-full md:w-80 border-r flex flex-col">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-lg">Messages</h2>
            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700" asChild>
              <Link href="/dashboard/messages/new">
                <PlusCircle className="h-4 w-4 mr-1" />
                New
              </Link>
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search conversations..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          {filteredConversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedConversation?.id === conversation.id ? "bg-gray-50" : ""
              }`}
              onClick={() => handleSelectConversation(conversation)}
            >
              <div className="flex items-start gap-3">
                <Avatar>
                  <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${conversation.avatar}`} />
                  <AvatarFallback>{conversation.avatar}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="font-medium truncate">{conversation.company}</div>
                    <div className="text-xs text-gray-500">{conversation.timestamp}</div>
                  </div>
                  <div className="text-sm text-gray-500 truncate">{conversation.lastMessage}</div>
                  {conversation.unread > 0 && (
                    <div className="mt-1">
                      <Badge className="bg-emerald-600">{conversation.unread} new</Badge>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${selectedConversation.avatar}`} />
                  <AvatarFallback>{selectedConversation.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{selectedConversation.company}</div>
                  <div className="text-xs text-gray-500">Active now</div>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View Company Profile</DropdownMenuItem>
                  <DropdownMenuItem>Mark as Unread</DropdownMenuItem>
                  <DropdownMenuItem>Archive Conversation</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex-1 p-4 overflow-auto">
              <div className="space-y-4">
                {selectedConversation.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "vendor" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender === "vendor" ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      <div>{message.content}</div>
                      <div
                        className={`text-xs mt-1 ${message.sender === "vendor" ? "text-emerald-100" : "text-gray-500"}`}
                      >
                        {new Date(message.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Textarea
                  placeholder="Type your message..."
                  className="min-h-[80px]"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                />
                <Button className="bg-emerald-600 hover:bg-emerald-700 self-end" onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send</span>
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center p-4">
            <div className="text-center">
              <h3 className="font-medium text-lg">No conversation selected</h3>
              <p className="text-gray-500 mt-1">Select a conversation from the list or start a new one</p>
              <Button className="mt-4 bg-emerald-600 hover:bg-emerald-700" asChild>
                <Link href="/dashboard/messages/new">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  New Conversation
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
