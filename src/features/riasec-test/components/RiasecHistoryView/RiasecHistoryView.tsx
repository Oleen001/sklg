'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui'
import { RiasecTestResultHistoryCard } from '@/features/riasec-test/components/RiasecTestResultHistoryCard'
import { riasecHistory } from '@/features/riasec-test/constants'
import { Route } from '@/enums'

export function RiasecHistoryView() {
  const router = useRouter()
  // Local copy so deletes are in-memory only (no API).
  const [items, setItems] = useState(riasecHistory)
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null)

  const confirmDelete = () => {
    if (deleteTargetId) {
      setItems((prev) => prev.filter((item) => item.id !== deleteTargetId))
    }
    setDeleteTargetId(null)
  }

  return (
    <div className="container-compact py-8 md:py-10">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-text-base-primary">ประวัติการทดสอบ</h1>
        <Button size="sm" onClick={() => router.push(Route.RIASEC_TEST)}>
          ทำแบบทดสอบใหม่
        </Button>
      </div>

      {items.length === 0 ? (
        <div className="rounded-xl border border-border-base-gray-medium bg-fill-base-white py-16 text-center">
          <p className="text-lg font-semibold text-text-base-primary">ยังไม่มีประวัติการทดสอบ</p>
          <p className="mt-1 text-base text-text-base-secondary">
            เริ่มทำแบบทดสอบ RIASEC เพื่อค้นหาบุคลิกภาพของคุณ
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {items.map((item) => (
            <RiasecTestResultHistoryCard key={item.id} item={item} onDelete={setDeleteTargetId} />
          ))}
        </div>
      )}

      <Dialog
        open={deleteTargetId !== null}
        onOpenChange={(open) => !open && setDeleteTargetId(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>ลบผลการทดสอบ?</DialogTitle>
            <DialogDescription>เมื่อลบแล้วจะไม่สามารถกู้คืนผลการทดสอบนี้ได้</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outlineNeutral" onClick={() => setDeleteTargetId(null)}>
              ยกเลิก
            </Button>
            <Button variant="solidDanger" onClick={confirmDelete}>
              ลบ
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
