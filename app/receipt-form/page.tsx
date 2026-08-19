import { ReceiptForm } from "@/components/receipt-form"

export default function ReceiptSubmissionPage() {
  return (
    <div className="flex min-h-svh flex-col md:bg-muted md:items-center md:justify-start md:p-8">
      <div className="w-full md:max-w-2xl md:rounded-xl md:shadow-lg md:bg-background">
        <div
          className="sticky top-0 z-10 bg-background border-b px-4 py-3 md:rounded-t-xl"
          style={{ paddingTop: "calc(env(safe-area-inset-top) + 12px)" }}
        >
          <div className="flex items-center gap-2">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-md overflow-hidden">
              <img src="/images/lowbrow-20logo.jpg" alt="Lowbrow Logo" className="w-full h-full object-cover" />
            </div>
            <h1 className="text-base font-semibold truncate">Eatlowbrow</h1>
          </div>
        </div>
        <ReceiptForm />
      </div>
    </div>
  )
}
