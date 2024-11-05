"use client"

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Button } from './ui/button'
import { useToast } from '@/hooks/use-toast'
import { PaymentIntent } from '@/lib/types'

interface PaymentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  mediaId: string
  onSuccess?: () => void
}

export function PaymentModal({
  open,
  onOpenChange,
  mediaId,
  onSuccess
}: PaymentModalProps) {
  const [processing, setProcessing] = useState(false)
  const { toast } = useToast()

  const handlePayment = async () => {
    setProcessing(true)

    try {
      // Mock payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))

      const mockPayment: PaymentIntent = {
        id: `pi_${Date.now()}`,
        amount: 500,
        status: 'completed',
        mediaId
      }

      toast({
        title: "Payment Successful",
        description: "Your media will be displayed shortly",
      })

      onSuccess?.()
      onOpenChange(false)
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "Please try again",
        variant: "destructive",
      })
    } finally {
      setProcessing(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Display Your Media</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Display your media on this venue for $5.00
          </p>
          <Button
            className="w-full"
            onClick={handlePayment}
            disabled={processing}
          >
            {processing ? 'Processing...' : 'Pay $5.00'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}