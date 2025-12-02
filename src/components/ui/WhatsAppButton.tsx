'use client'

import { MessageCircle } from 'lucide-react'
import { sendWhatsAppMessage } from '@/lib/whatsapp'

export default function WhatsAppButton() {
    const handleClick = () => {
        sendWhatsAppMessage('Hello! I would like to know more about IVS.')
    }

    return (
        <button
            onClick={handleClick}
            className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 hover:scale-110 transition-all"
            aria-label="WhatsApp"
        >
            <MessageCircle className="w-6 h-6" />
        </button>
    )
}