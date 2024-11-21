'use client'

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'

interface ConfirmationDialogProps {
  isOpen: boolean
  title?: string
  description?: string
  type?: 'confirm-only' | 'yes-no'
  confirmLabel?: string
  yesLabel?: string
  noLabel?: string
  onNo?: () => void
  onYes?: () => void
  onClose: () => void
  onConfirm?: () => void
}

export default function ConfirmationDialog ({
  onNo,
  onYes,
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirmation',
  description = 'Are you sure you want to proceed?',
  type = 'confirm-only',
  confirmLabel = 'OK',
  yesLabel = 'Yes',
  noLabel = 'No',
}: ConfirmationDialogProps) {
  const handleConfirm = () => {
    if (onConfirm) onConfirm()
    onClose()
  }

  const handleYes = () => {
    if (onYes) onYes()
    onClose()
  }

  const handleNo = () => {
    if (onNo) onNo()
    onClose()
  }

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />

      <div className="fixed inset-0 z-10 flex items-center justify-center p-4">
        <DialogPanel className="rounded-lg bg-white shadow-xl sm:max-w-md sm:w-full">
          <div className="px-4 py-5 sm:p-6">
            <DialogTitle className="text-lg font-medium text-gray-900">{title}</DialogTitle>
            <div className="mt-2">
              <p className="text-sm text-gray-500">{description}</p>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 flex justify-end space-x-3">
            {type === 'yes-no' ? (
              <>
                <button
                  type="button"
                  onClick={handleNo}
                  className="rounded-md bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-200"
                >
                  {noLabel}
                </button>
                <button
                  type="button"
                  onClick={handleYes}
                  className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500"
                >
                  {yesLabel}
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={handleConfirm}
                className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
              >
                {confirmLabel}
              </button>
            )}
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}
