import { useState, useEffect } from 'react'
import { X, MessageSquare, Copy, Check, ArrowUpRight, Phone, Info } from 'lucide-react'
import { BUSINESS_CONFIG } from '../config/business'

export default function WhatsAppModal({ isOpen, onClose, bookingDetails }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen || !bookingDetails) return null

  // Build clean message lines
  const messageLines = [
    'YOUR TAXI MAN — INQUIRY REQUEST',
    '',
    `Pickup: ${bookingDetails.pickup || 'To be confirmed'}`,
    `Destination: ${bookingDetails.destination || 'To be confirmed'}`,
    `Date: ${bookingDetails.date || 'Flexible'}`,
    `Time: ${bookingDetails.time || 'Flexible'}`,
    `Passengers: ${bookingDetails.passengers || '1–2 Passengers'}`,
    `Service: ${bookingDetails.serviceType || 'General Inquiry'}`,
    bookingDetails.customNote ? `Additional details: ${bookingDetails.customNote}` : null,
    '',
    'Hello, I would like to request this ride. Please confirm availability and provide a fare quotation.'
  ].filter((line) => line !== null)

  const formattedMessage = messageLines.join('\n')

  const cleanNumber = BUSINESS_CONFIG.whatsappNumber.replace(/[^0-9]/g, '')
  const url = new URL(`https://wa.me/${cleanNumber}`)
  url.searchParams.set('text', formattedMessage)
  const whatsappUrl = url.toString()

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedMessage)
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div
        className="bg-white rounded-2xl max-w-lg w-full p-5 sm:p-7 shadow-xl border border-stone-200 relative text-left max-h-[92vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-stone-400 hover:text-stone-900 hover:bg-stone-100 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4 pr-10">
          <div className="w-10 h-10 rounded-xl bg-stone-100 border border-stone-200 text-stone-900 flex items-center justify-center shrink-0">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 id="modal-title" className="text-lg font-bold text-stone-900">
              Trip Inquiry Prepared
            </h3>
            <p className="text-xs text-stone-500">Ready to coordinate with your chauffeur</p>
          </div>
        </div>

        {/* Notification note */}
        <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 mb-4 text-xs text-stone-600 flex items-start gap-2">
          <Info className="w-3.5 h-3.5 text-stone-500 shrink-0 mt-0.5" />
          <p>
            Tapping <strong>"Continue to WhatsApp"</strong> opens WhatsApp with this pre-filled message for <strong>{BUSINESS_CONFIG.whatsappDisplay}</strong>.
          </p>
        </div>

        {/* Prepared Message Preview */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs font-semibold text-stone-700 mb-1.5">
            <span>Prepared Message:</span>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1 text-[11px] bg-stone-100 hover:bg-stone-200 px-2.5 py-1 rounded-md text-stone-800 transition-colors min-h-[36px]"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="font-bold text-emerald-700">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Text</span>
                </>
              )}
            </button>
          </div>

          <pre className="p-3.5 rounded-xl bg-stone-900 text-stone-100 text-xs font-mono whitespace-pre-wrap leading-relaxed max-h-40 overflow-y-auto border border-stone-800">
            {formattedMessage}
          </pre>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm text-stone-900 bg-taxi-yellow hover:bg-taxi-yellowHover shadow-xs transition-all min-h-[46px]"
          >
            <MessageSquare className="w-4 h-4 fill-current" />
            <span>Continue to WhatsApp</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl font-semibold text-xs text-stone-800 bg-stone-100 hover:bg-stone-200 border border-stone-200 min-h-[44px]"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Message'}</span>
            </button>

            <a
              href={`tel:${BUSINESS_CONFIG.phoneNumber.replace(/\s+/g, '')}`}
              className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl font-semibold text-xs text-stone-800 bg-stone-100 hover:bg-stone-200 border border-stone-200 min-h-[44px]"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Directly</span>
            </a>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-2 text-xs font-medium text-stone-500 hover:text-stone-800 transition-colors min-h-[36px]"
          >
            Close & Return
          </button>
        </div>

      </div>
    </div>
  )
}
