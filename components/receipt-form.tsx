"use client"

import type React from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { ChevronDown, X } from "lucide-react"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, CheckIcon } from "lucide-react"

const TRANSACTION_TYPES = [
  "Direct Supplier",
  "Petty Cash",
  "Urgent Payable",
  "Payroll",
  "Service Charge",
  "Construction",
  "Supplier Settlements",
  "Core Reimbursements",
  "PCF Replenishment",
  "Check",
]

const STORE_NAMES = [
  "Bad Bird Mega",
  "Bad Bird Grid",
  "Flowerboy Grid",
  "Flowerboy Opus",
  "Fowlbread",
  "National Bakeshop",
  "Penguin Fresh Commi",
  "TY Seafood",
  "Tender Beef",
  "Lowbrow",
]

const SUPPLIER_SUGGESTIONS = [
  "9 Pub Heads Inc",
  "28 Derby Food Corporation",
  "AC Pacakagingaging",
  "Acquatec Incorporated",
  "AISU Food Delivery Services",
  "Alfonso8 Kitchen Hoods",
  "Alma Sayod",
  "Alta Comida",
  "Alvin charlton Leon",
  "Alvin Leon",
  "Andre Flos Gourmet",
  "Anna Marie Ferrera",
  "Ansel Juniper Harina",
  "APT VENTURES INC",
  "AUA STEEL FABRICATION SERVICES",
  "Aubrey Miranda",
  "Besterm International Corp",
  "Beyond Concepts Inc",
  "Big G Distribution",
  "BOARDWALK BUSINESS VENTURES INC",
  "Brian Aljay Mintar",
  "Brian Gregory Ver",
  "BSE Tri Axis International Inc",
  "Bugs Out Pest Defense Inc",
  "CAN COFFEE CORP",
  "Canterbury Winslow Intl Products Inc",
  "CARLOS RAPHAEL T TORRIJOS",
  "Carmat Coatings and Allied Products Inc",
  "Catering Depot Group Phils Inc",
  "Chaoshan Foods Corporation",
  "Chemlux Incorporated",
  "CLSR Printing Solutions Ltd Co",
  "Consistent Frozen Solutions Solution",
  "CT CONCEPTS GOLD AND SILVER CORP",
  "CTT Synergy Corporation",
  "Cyfreeze Refrigeration and Air",
  "Detpak Packaging Philippines",
  "Dharyll Dataylo",
  "Dimensions Distributors Inc",
  "Diosmar Pacan",
  "Dream Air Engineering Services",
  "Dwight Co",
  "Ecosci Food Inc",
  "EDR Meat Dealer Inc",
  "Edwin O Sy",
  "Elna Bersabel",
  "Estatewine Inc",
  "Euro Swiss Food Inc",
  "Fabtech International Inc",
  "First Asia Realty Development Corp",
  "First Crocus Philippines Inc",
  "Fishta Seafood Inc",
  "Foodfull Holdings Corp",
  "Fort Bonifacio Development Corporation",
  "Francis Paul Valdes",
  "Francis Tonyan Vicencio",
  "Full Basket General Merchandise",
  "GA Printing Inc",
  "Gagmax Packaging Solutions Inc",
  "Gallery Frames",
  "Geno Vitasolo",
  "Golden Ambersky Glass and Aluminum Services",
  "Grand Ace Food Essential Corp",
  "Grand Hacienda Wines Inc",
  "HAKI Engineering",
  "Hardhut Builders Inc",
  "Harvey Hsieh",
  "Hightower Inc",
  "HOWLINGS HOLDINGS CORP",
  "Ice King",
  "Iceking Delivery",
  "Imagemax Digital Printing Services",
  "Infinite Lighting N Style",
  "INTERMATRIX DOCUMENT SOLUTIONS INC",
  "Jacqueline Anne Co",
  "Jacqueline U Chua",
  "James Laderas",
  "Jane Russel Cena",
  "JBTEC Flavors and Blends Inc",
  "Jcab Seafoods",
  "JeffJeff Germar",
  "Jemerson Agustin",
  "Jenjira Khaoiem",
  "Jerome Gelito",
  "Jewelle Tagbuyawan",
  "Jimmy Edip",
  "Joel Zuniega",
  "John Bryan Lizarondo",
  "John Ejay Perez",
  "John Philip Lozada",
  "John Russel Espino",
  "Jonaliza Amantillo",
  "Joshua Salabe",
  "Jovit Santos",
  "JPN PH FOOD INC",
  "Juan Miguel Eliseo R Santiago",
  "JJe Roble",
  "Junmie Ramana Developers Inc",
  "Katrina Maria Melo",
  "Ken Malabuyoc",
  "Kenreach Distribution Partners Inc",
  "Kevin Brent Pardilla",
  "Kevin Paul Sy",
  "Kimberly Ann R Piol",
  "Kitchen Supercenter Inc",
  "Knowledgelab Inc",
  "Kolourpro Digital Print Center",
  "LANGJINKLINKS INTL TRADE INC",
  "Liberty Susas Remoroza",
  "Liezl Cruz",
  "Lite East Trading",
  "Louie Gene Joson",
  "Lowbrow Food Management Corp MB",
  "LOWBROW FOOD MANAGEMENT CORP",
  "Lowtemp Corporation",
  "Lucky 9 Logistics Corp",
  "Ma Christina M Cawad",
  "Ma Melissa Luis",
  "Macro LPG Co Inc",
  "Margarita Jeselle De Guzman",
  "Margarito Alviola",
  "Maria Stella J Cepeda",
  "Marni Buscayan",
  "Marc Steven Mocoy",
  "Marthas Trading Corp",
  "Maxicare Healthcare Coporation",
  "MBeatrix Tea Shop",
  "MD RTG SHEET METAL FABRICATION INCORPORATED",
  "Meatbros Inc",
  "Meatplus Trading Corp",
  "Megasamsotite Incorporated",
  "Merit Stainless Steel Inc",
  "Metro Fire Safety Enterprise",
  "Metolius Valley Inc",
  "MIDA FOOD DISTRIBUTORS INC",
  "Minhua Chen",
  "Mr Meat",
  "MSCS PrimeGoods Inc",
  "NAPA GAPA BEVERAGES CORP",
  "Navotas Seafood",
  "Neil John Amora",
  "NO KA OI International Trading",
  "OLM FN COMPANY",
  "Panpan Print Corp",
  "PansolFood Ventures Corp",
  "Papercon Phils Inc",
  "Pasadena Agri Ventures Corp",
  "Penguin Fresh",
  "PF Consumer",
  "Philippine Foodservice Equipment and Supplies Corporation",
  "Pialyn Junio",
  "Premier Food Choice Intl Corp",
  "Pro Possmei International Corp",
  "Proburnbox Graphic Design and Printing Services",
  "PYC Foods Corporation",
  "RGE Agridev Corporation",
  "Roberto Godofredo Macalinao",
  "Rosabel Pereyra",
  "Rosenelle Gonzales",
  "Rowelen Escleto",
  "Salemaire Industries Corp",
  "Saravia Blue Crab",
  "Saravia Blue Crab Inc",
  "Scratch Bakery Inc",
  "Seachamp Foods Corporation",
  "Serramonte Enterprises",
  "Shanchu Morilla",
  "Sherralyn Bernice Koa",
  "Sincere Construction and Dev't Corp",
  "SMMak Trading Corporation",
  "Spectrum Graphix Inc",
  "STC Agri Products Inc",
  "Steffi Directo",
  "Summit One Business Solutions",
  "Sunnywood Superfoods Corp",
  "Taishan Insurance Brokers Phil",
  "The Husbuns",
  "Ticsmeat Co",
  "Vertiflute Corporation",
  "Wavelink Design Unlimited Inc",
  "Werdenberg Intl Corp",
  "Whim Manila",
  "WHK Manufacturing and Trading Corp",
  "Wilcon Depot Inc",
  "Wisk Fine Food Inc",
  "Woori Food Wholesaling",
  "World Class Concepts Corporation",
  "Yangsuk Kim",
]

const BANK_SUGGESTIONS = [
  "AL AMANAH ISLAMIC BANK",
  "ALLBANK (A THRIFT BANK), INC.",
  "AUSTRALIA AND NEW ZEALAND BANKING GROUP LTD",
  "ASIA UNITED BANK",
  "BANCO DE ORO",
  "BANGKO KABAYAN, INC. (PRIVATE DEVELOPMENT BANK)",
  "BANGKO MABUHAY (A RURAL BANK), INC",
  "BANGKO NUESTRA SEÑORA DEL PILAR, INC. (A RURAL BANK)",
  "BANGKOK BANK",
  "BANK OF AMERICA",
  "BANK OF CHINA, MANILA BRANCH",
  "BANK OF COMMERCE",
  "BANK OF FLORIDA INC.",
  "BANK OF MAKATI (A SAVINGS BANK), INC.",
  "BANK OF THE PHIL. ISLANDS",
  "BANK OF TOKYO - MITSUBISHI UFJ",
  "BANKO, A SUBSIDIARY OF BPI",
  "BDO NETWORK BANK, INC.",
  "BIÑAN RURAL BANK, INC.",
  "CAMALIG BANK, INC.",
  "CANTILAN BANK, INC. (A RURAL BANK)",
  "CATHAY UNITED BANK CO., LTD. - MANILA BRANCH",
  "CEBUANA LHUILLER RURAL BANK",
  "CHINA BANK SAVINGS INC.",
  "CHINA BANKING CORPORATION",
  "CHINA TRUST (PHILS.) COMMERCIAL",
  "CIMB BANK PHILIPPINES, INC.",
  "CITIBANK N.A.",
  "COOPERATIVE BANK OF QUEZON PROVINCE",
  "COUNTRY BUILDING BANK, INC. (A RURAL BANK)",
  "DCPAY PHILIPPINES(COINS.PH)",
  "DEUTSCHE BANK",
  "DEVELOPMENT BANK OF THE PHILS.",
  "DUMAGUETE CITY DEVELOPMENT BANK, INC.",
  "DUNGGANUN BANK INC.",
  "EAST WEST BANK",
  "EAST WEST RURAL BANK, INC.",
  "EQUICOM SAVINGS BANK",
  "FIRST CONSOLIDATED BANK INC.",
  "GOTYME BANK CORPORATION",
  "GPAY NETWORK PH, INC.",
  "GUCAGUA RURAL BANK, INC.",
  "G-XCHANGE, INC. (GCASH)",
  "HONGKONG SHANGHAI BANK",
  "INDUSTRIAL AND COMMERCIAL BANK OF CHINA LIMITED - MANILA BRANCH",
  "INDUSTRIAL BANK OF KOREA - MANILA",
  "INNOVATIVE BANK, INC. (A RURAL BANK)",
  "JP MORGAN CHASE MANILA",
  "KOREA EXCHANGE BANK",
  "LAGUNA PRESTIGE BANKING CORPORATION (A RURAL BANK)",
  "LAND BANK OF OF PHILS.",
  "LULU FINANCIAL SERVICES (PHILS), INC.",
  "MALARAYAT RURAL BANK, INC.",
  "MALAYAN SAVINGS BANK, INC",
  "MAYA BANK, INC.",
  "MAYBANK PHILS. INC.",
  "MEGA INTL COMML BANK CO. LTD.",
  "METROBANK",
  "MIZUHO CORPORATE BANK",
  "MONEY MALL RURAL BANK, INC.",
  "MVSM BANK (A RURAL BANK SINCE 1953), INC.",
  "NETBANK (A RURAL BANK), INC.",
  "NEW RURAL BANK OF SAN LEONARDO (NUEVA ECIJA), INC.",
  "OWN BANK, THE RURAL BANK OF CAVITE CITY, INC.",
  "PAYMAYA PHILIPPINES, INC.",
  "PAYMONGO PAYMENTS, INC",
  "PHIL. BANK OF COMMUNICATION",
  "PHIL. BUSINESS BANK",
  "PHILIPPINE DIGITAL ASSET EXCHANGE (PDAX), INC.",
  "PHIL. NATIONAL BANK",
  "PHIL. SAVINGS BANK",
  "PHIL. TRUST COMPANY",
  "PHIL. VETERANS BANK",
  "PRODUCERS SAVINGS BANK CORP.",
  "QUEEN CITY DEVELOPMENT BANK, INC.",
  "RANG-AY BANK, INC. (A RURAL BANK)",
  "RBT BANK, INC. A RURAL BANK",
  "RIZAL COMML. BANKING CORPORATION",
  "ROBINSONS BANK CORPORATION",
  "RURAL BANK OF BACOLOD CITY, INC.",
  "RURAL BANK OF BAUANG, INC.",
  "RURAL BANK OF DIGIG, INC.",
  "RURAL BANK OF GUINOBATAN, INC.",
  "RURAL BANK OF LA PAZ, INC.",
  "RURAL BANK OF LEBAK (SULTAN KUDARAT), INCORPORATED",
  "RURAL BANK OF MONTALBAN, INC.",
  "RURAL BANK OF PORAC (PAMPANGA), INC.",
  "RURAL BANK OF ROSARIO (LA UNION), INC.",
  "RURAL BANK OF SAGAY, INC",
  "RURAL BANK OF STA. IGNACIA, INC.",
  "SEABANK PHHIPPINES, INC. (A RURAL BANK)",
  "SECURITY BANK AND TRUST COMPANY",
  "SHINHAN BANK",
  "STANDARD CHARTERED BANK",
  "STERLING BANK OF ASIA",
  "SUMITOMO MITSUI BANKING CORP",
  "TAGCASH LTD. INC.",
  "TAYOCASH, INC",
  "TONG YANG SAVINGS BANK INC.",
  "TONIK DIGITAL BANK, INC",
  "UCPB SAVINGS BANK",
  "UNION BANK OF THE PHILS.",
  "UNION DIGITAL BANK",
  "UNITED OVERSEAS BANK",
  "UNO BANK, INC.",
  "USSC MONEY SERVICES, INC",
  "WEALTH DEVELOPMENT BANK",
  "ZYBI TECH, INC.",
  "BPI / VYBE BY BPI",
]

const EWT_PERCENTAGES = ["0%", "1%", "2%", "5%"]

export function ReceiptForm({ className, ...props }: React.ComponentProps<"form">) {
  const [transactionType, setTransactionType] = useState("")
  const [storeName, setStoreName] = useState("")
  const [supplierName, setSupplierName] = useState("")
  const [supplierBankAccount, setSupplierBankAccount] = useState("")
  const [supplierAccountNo, setSupplierAccountNo] = useState("")
  const [deliveryDate, setDeliveryDate] = useState<Date>()
  const [drSiNumber, setDrSiNumber] = useState("")
  const [vatAmount, setVatAmount] = useState("")
  const [invoiceAmount, setInvoiceAmount] = useState("")
  const [ewtPercent, setEwtPercent] = useState("0%")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [showBankSuggestions, setShowBankSuggestions] = useState(false)
  const [showStoreSuggestions, setShowStoreSuggestions] = useState(false)
  const [dateOpen, setDateOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const [highlightedBankIndex, setHighlightedBankIndex] = useState(-1)
  const [highlightedStoreIndex, setHighlightedStoreIndex] = useState(-1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const formatCurrency = (value: string): string => {
    const num = value.replace(/[^\d.]/g, "")
    if (!num) return ""
    const parts = num.split(".")
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    return parts.length > 1 ? `${parts[0]}.${parts[1].slice(0, 2)}` : parts[0]
  }

  const parseCurrency = (value: string): string => {
    return value.replace(/,/g, "")
  }

  const handleVatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCurrency(e.target.value)
    setVatAmount(formatted)
  }

  const handleInvoiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCurrency(e.target.value)
    setInvoiceAmount(formatted)
  }

  const handlePreview = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!transactionType) {
      alert("Please select a transaction type")
      return
    }

    if (!storeName) {
      alert("Please select a store name")
      return
    }

    if (!supplierName) {
      alert("Please enter the supplier name")
      return
    }

    if (!deliveryDate) {
      alert("Please select a delivery date")
      return
    }

    if (!drSiNumber) {
      alert("Please enter the DR/SI number")
      return
    }

    if (!vatAmount) {
      alert("Please enter the VAT amount")
      return
    }

    if (!invoiceAmount) {
      alert("Please enter the invoice amount")
      return
    }

    if (!ewtPercent) {
      alert("Please select the EWT percentage")
      return
    }

    setShowConfirmation(true)
  }

  const handleActualSubmit = async () => {
    setIsSubmitting(true)
    setSubmitError(null)
    setSubmitSuccess(false)
    setShowConfirmation(false)

    try {
      const formattedDate = deliveryDate
        ? `${deliveryDate.getMonth() + 1}/${deliveryDate.getDate()}/${deliveryDate.getFullYear()}`
        : ""

      const submitData = {
        transactionType,
        storeName,
        supplierName,
        deliveryDate: formattedDate,
        drsiNumber: drSiNumber,
        vatAmount: parseCurrency(vatAmount),
        invoiceAmount: parseCurrency(invoiceAmount),
        ewtPercent,
        supplierBankAccount: supplierBankAccount || "",
        supplierAccountNo: supplierAccountNo || "",
      }

      const response = await fetch(
        process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL ||
          "https://script.google.com/macros/s/AKfycbyGoFWOrQtG1Et1cIYxh3gLLiDfVqk18yPT2z-BKwO73w2B5Yz90a7MZsSS5RYwhxE4/exec",
        {
          method: "POST",
          body: JSON.stringify(submitData),
        },
      )

      const result = await response.json()

      if (result.success) {
        alert("Receipt submitted successfully!")
        setSubmitSuccess(true)
        handleClearForm()
      } else {
        throw new Error(result.message || "Submission failed")
      }
    } catch (error) {
      console.error("[v0] Form submission error:", error)
      const errorMessage = error instanceof Error ? error.message : "Failed to submit receipt. Please try again."
      alert(errorMessage)
      setSubmitError(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    handleClearForm()
  }

  const handleClearForm = () => {
    setTransactionType("")
    setStoreName("")
    setSupplierName("")
    setSupplierBankAccount("")
    setSupplierAccountNo("")
    setDeliveryDate(undefined)
    setDrSiNumber("")
    setVatAmount("")
    setInvoiceAmount("")
    setEwtPercent("0%")
    setSubmitError(null)
    setSubmitSuccess(false)
  }

  const filteredStores = storeName
    ? STORE_NAMES.filter((store) => store.toLowerCase().includes(storeName.toLowerCase()))
    : STORE_NAMES

  const filteredSuppliers = supplierName
    ? SUPPLIER_SUGGESTIONS.filter((supplier) => supplier.toLowerCase().includes(supplierName.toLowerCase()))
    : SUPPLIER_SUGGESTIONS

  const filteredBanks = supplierBankAccount
    ? BANK_SUGGESTIONS.filter((bank) => bank.toLowerCase().includes(supplierBankAccount.toLowerCase()))
    : BANK_SUGGESTIONS

  const handleSupplierKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || filteredSuppliers.length === 0) return

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setHighlightedIndex((prev) => (prev < filteredSuppliers.length - 1 ? prev + 1 : prev))
        break
      case "ArrowUp":
        e.preventDefault()
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1))
        break
      case "Enter":
        e.preventDefault()
        if (highlightedIndex >= 0 && highlightedIndex < filteredSuppliers.length) {
          setSupplierName(filteredSuppliers[highlightedIndex])
          setShowSuggestions(false)
          setHighlightedIndex(-1)
        }
        break
      case "Escape":
        setShowSuggestions(false)
        setHighlightedIndex(-1)
        break
    }
  }

  const handleBankKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showBankSuggestions || filteredBanks.length === 0) return

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setHighlightedBankIndex((prev) => (prev < filteredBanks.length - 1 ? prev + 1 : prev))
        break
      case "ArrowUp":
        e.preventDefault()
        setHighlightedBankIndex((prev) => (prev > 0 ? prev - 1 : -1))
        break
      case "Enter":
        e.preventDefault()
        if (highlightedBankIndex >= 0 && highlightedBankIndex < filteredBanks.length) {
          setSupplierBankAccount(filteredBanks[highlightedBankIndex])
          setShowBankSuggestions(false)
          setHighlightedBankIndex(-1)
        }
        break
      case "Escape":
        setShowBankSuggestions(false)
        setHighlightedBankIndex(-1)
        break
    }
  }

  const handleStoreKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showStoreSuggestions || filteredStores.length === 0) return

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setHighlightedStoreIndex((prev) => (prev < filteredStores.length - 1 ? prev + 1 : prev))
        break
      case "ArrowUp":
        e.preventDefault()
        setHighlightedStoreIndex((prev) => (prev > 0 ? prev - 1 : -1))
        break
      case "Enter":
        e.preventDefault()
        if (highlightedStoreIndex >= 0 && highlightedStoreIndex < filteredStores.length) {
          setStoreName(filteredStores[highlightedStoreIndex])
          setShowStoreSuggestions(false)
          setHighlightedStoreIndex(-1)
        }
        break
      case "Escape":
        setShowStoreSuggestions(false)
        setHighlightedStoreIndex(-1)
        break
    }
  }

  return (
    <>
      <form noValidate onSubmit={handlePreview} className={cn("space-y-6 px-4 py-6", className)} {...props}>
        <FieldGroup>
          {/* Transaction Type */}
          <Field name="transaction-type">
            <FieldLabel isRequired>Transaction Type</FieldLabel>
            <Select value={transactionType} onValueChange={setTransactionType}>
              <SelectTrigger id="transaction-type" className="w-full h-11 font-sans" aria-required="true">
                <SelectValue placeholder="Select transaction type" />
              </SelectTrigger>
              <SelectContent>
                {TRANSACTION_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          {/* Store Name */}
          <Field name="store-name">
            <FieldLabel isRequired>Store Name</FieldLabel>
            <div className="relative">
              <Input
                id="store-name"
                type="text"
                placeholder="Type or select store"
                value={storeName}
                onChange={(e) => {
                  setStoreName(e.target.value)
                  setShowStoreSuggestions(true)
                  setHighlightedStoreIndex(-1)
                }}
                onFocus={() => setShowStoreSuggestions(true)}
                onBlur={() => {
                  setTimeout(() => {
                    setShowStoreSuggestions(false)
                    setHighlightedStoreIndex(-1)
                  }, 150)
                }}
                onKeyDown={handleStoreKeyDown}
                required
                className="pr-16"
                autoComplete="off"
              />
              {storeName && (
                <button
                  type="button"
                  onClick={() => {
                    setStoreName("")
                    setShowStoreSuggestions(false)
                  }}
                  className="absolute right-8 top-1/2 -translate-y-1/2 p-1 hover:bg-accent rounded-sm transition-colors"
                >
                  <X className="size-4 opacity-50" />
                </button>
              )}
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-4 opacity-50 pointer-events-none" />

              {showStoreSuggestions && filteredStores.length > 0 && (
                <div className="absolute z-50 w-full mt-1 bg-popover border border-border rounded-md shadow-md max-h-[200px] overflow-y-auto">
                  {filteredStores.map((store, index) => (
                    <button
                      key={store}
                      type="button"
                      className={cn(
                        "w-full px-3 py-2 text-left text-sm transition-colors flex items-center gap-2",
                        index === highlightedStoreIndex ? "bg-accent" : "hover:bg-accent",
                      )}
                      onMouseDown={(e) => {
                        e.preventDefault()
                        setStoreName(store)
                        setShowStoreSuggestions(false)
                        setHighlightedStoreIndex(-1)
                      }}
                      onMouseEnter={() => setHighlightedStoreIndex(index)}
                    >
                      <CheckIcon
                        className={cn("size-4 flex-shrink-0", storeName === store ? "opacity-100" : "opacity-0")}
                      />
                      <span className="flex-1">{store}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </Field>

          {/* Supplier Name - Autocomplete */}
          <Field name="supplier-name">
            <FieldLabel isRequired>Supplier Name</FieldLabel>
            <div className="relative">
              <Input
                id="supplier-name"
                type="text"
                placeholder="Type or select supplier"
                value={supplierName}
                onChange={(e) => {
                  setSupplierName(e.target.value)
                  setShowSuggestions(true)
                  setHighlightedIndex(-1)
                }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => {
                  setTimeout(() => {
                    setShowSuggestions(false)
                    setHighlightedIndex(-1)
                  }, 150)
                }}
                onKeyDown={handleSupplierKeyDown}
                required
                className="pr-16"
                autoComplete="off"
              />
              {supplierName && (
                <button
                  type="button"
                  onClick={() => {
                    setSupplierName("")
                    setShowSuggestions(false)
                  }}
                  className="absolute right-8 top-1/2 -translate-y-1/2 p-1 hover:bg-accent rounded-sm transition-colors"
                >
                  <X className="size-4 opacity-50" />
                </button>
              )}
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-4 opacity-50 pointer-events-none" />

              {showSuggestions && filteredSuppliers.length > 0 && (
                <div className="absolute z-50 w-full mt-1 bg-popover border border-border rounded-md shadow-md max-h-[200px] overflow-y-auto">
                  {filteredSuppliers.map((supplier, index) => (
                    <button
                      key={supplier}
                      type="button"
                      className={cn(
                        "w-full px-3 py-2 text-left text-sm transition-colors flex items-center gap-2",
                        index === highlightedIndex ? "bg-accent" : "hover:bg-accent",
                      )}
                      onMouseDown={(e) => {
                        e.preventDefault()
                        setSupplierName(supplier)
                        setShowSuggestions(false)
                        setHighlightedIndex(-1)
                      }}
                      onMouseEnter={() => setHighlightedIndex(index)}
                    >
                      <CheckIcon
                        className={cn("size-4 flex-shrink-0", supplierName === supplier ? "opacity-100" : "opacity-0")}
                      />
                      <span className="flex-1">{supplier}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </Field>

          {/* Delivery Date */}
          <Field name="delivery-date">
            <FieldLabel isRequired>Delivery Date</FieldLabel>
            <Popover open={dateOpen} onOpenChange={setDateOpen}>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  id="delivery-date"
                  className="border-input data-[placeholder]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 flex w-full items-center justify-between gap-2 rounded-md border bg-transparent h-11 px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] font-sans"
                  aria-required="true"
                >
                  <span className={cn(!deliveryDate && "text-muted-foreground")}>
                    {deliveryDate
                      ? deliveryDate.toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "Select date"}
                  </span>
                  <CalendarIcon className="size-4 opacity-50" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={deliveryDate}
                  onSelect={(date) => {
                    setDeliveryDate(date)
                    setDateOpen(false)
                  }}
                />
              </PopoverContent>
            </Popover>
          </Field>

          {/* DR/SI Number */}
          <Field name="dr-si-number">
            <FieldLabel isRequired>DR/SI Number</FieldLabel>
            <Input
              id="dr-si-number"
              type="text"
              placeholder="Enter DR/SI number"
              value={drSiNumber}
              onChange={(e) => setDrSiNumber(e.target.value)}
              required
            />
          </Field>

          {/* VAT Amount */}
          <Field name="vat-amount">
            <FieldLabel isRequired>VAT Amount</FieldLabel>
            <Input
              id="vat-amount"
              type="tel"
              placeholder="0.00"
              value={vatAmount}
              onChange={handleVatChange}
              required
            />
            <FieldDescription>Enter amount in PHP</FieldDescription>
          </Field>

          {/* Invoice Amount */}
          <Field name="invoice-amount">
            <FieldLabel isRequired>Invoice Amount</FieldLabel>
            <Input
              id="invoice-amount"
              type="tel"
              placeholder="0.00"
              value={invoiceAmount}
              onChange={handleInvoiceChange}
              required
            />
            <FieldDescription>Total invoice amount in PHP</FieldDescription>
          </Field>

          {/* EWT % */}
          <Field name="ewt-percent">
            <FieldLabel isRequired>EWT %</FieldLabel>
            <Select value={ewtPercent} onValueChange={setEwtPercent}>
              <SelectTrigger id="ewt-percent" className="w-full h-11 font-sans" aria-required="true">
                <SelectValue placeholder="Select EWT percentage" />
              </SelectTrigger>
              <SelectContent>
                {EWT_PERCENTAGES.map((percentage) => (
                  <SelectItem key={percentage} value={percentage}>
                    {percentage}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          {/* Supplier Bank Account - Autocomplete */}
          <Field name="supplier-bank-account">
            <FieldLabel>
              Supplier Bank <span className="text-muted-foreground text-xs">(Optional)</span>
            </FieldLabel>
            <div className="relative">
              <Input
                id="supplier-bank-account"
                type="text"
                placeholder="Type or select bank"
                value={supplierBankAccount}
                onChange={(e) => {
                  setSupplierBankAccount(e.target.value)
                  setShowBankSuggestions(true)
                  setHighlightedBankIndex(-1)
                }}
                onFocus={() => setShowBankSuggestions(true)}
                onBlur={() => {
                  setTimeout(() => {
                    setShowBankSuggestions(false)
                    setHighlightedBankIndex(-1)
                  }, 150)
                }}
                onKeyDown={handleBankKeyDown}
                className="pr-16"
                autoComplete="off"
              />
              {supplierBankAccount && (
                <button
                  type="button"
                  onClick={() => {
                    setSupplierBankAccount("")
                    setShowBankSuggestions(false)
                  }}
                  className="absolute right-8 top-1/2 -translate-y-1/2 p-1 hover:bg-accent rounded-sm transition-colors"
                >
                  <X className="size-4 opacity-50" />
                </button>
              )}
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-4 opacity-50 pointer-events-none" />

              {showBankSuggestions && filteredBanks.length > 0 && (
                <div className="absolute z-50 w-full mt-1 bg-popover border border-border rounded-md shadow-md max-h-[200px] overflow-y-auto">
                  {filteredBanks.map((bank, index) => (
                    <button
                      key={bank}
                      type="button"
                      className={cn(
                        "w-full px-3 py-2 text-left text-sm transition-colors flex items-center gap-2",
                        index === highlightedBankIndex ? "bg-accent" : "hover:bg-accent",
                      )}
                      onMouseDown={(e) => {
                        e.preventDefault()
                        setSupplierBankAccount(bank)
                        setShowBankSuggestions(false)
                        setHighlightedBankIndex(-1)
                      }}
                      onMouseEnter={() => setHighlightedBankIndex(index)}
                    >
                      <CheckIcon
                        className={cn(
                          "size-4 flex-shrink-0",
                          supplierBankAccount === bank ? "opacity-100" : "opacity-0",
                        )}
                      />
                      <span className="flex-1">{bank}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </Field>

          {/* Supplier Account No */}
          <Field name="supplier-account-no">
            <FieldLabel>
              Supplier Account No <span className="text-muted-foreground text-xs">(Optional)</span>
            </FieldLabel>
            <Input
              id="supplier-account-no"
              type="text"
              inputMode="numeric"
              placeholder="Enter account number"
              value={supplierAccountNo}
              onChange={(e) => setSupplierAccountNo(e.target.value)}
            />
          </Field>

        </FieldGroup>

        {/* Success message */}
        {submitSuccess && (
          <div className="bg-green-500/10 text-green-700 dark:text-green-400 p-3 rounded-md text-sm border border-green-500/20">
            Receipt submitted successfully!
          </div>
        )}
        {/* Error message */}
        {submitError && (
          <div className="bg-destructive/10 text-destructive p-3 rounded-md text-sm border border-destructive/20">
            {submitError}
          </div>
        )}

        <div className="flex gap-3 pt-4">
          <Button type="button" variant="outline" onClick={handleCancel} className="flex-1 bg-transparent">
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting} className="flex-1">
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>

      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 space-y-4">
              <h2 className="text-xl font-semibold text-foreground">Review Your Submission</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium text-muted-foreground">Transaction Type:</span>
                  <span className="text-foreground">{transactionType}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium text-muted-foreground">Store Name:</span>
                  <span className="text-foreground">{storeName}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium text-muted-foreground">Supplier Name:</span>
                  <span className="text-foreground">{supplierName}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium text-muted-foreground">Delivery Date:</span>
                  <span className="text-foreground">
                    {deliveryDate
                      ? `${deliveryDate.getMonth() + 1}/${deliveryDate.getDate()}/${deliveryDate.getFullYear()}`
                      : ""}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium text-muted-foreground">DR/SI Number:</span>
                  <span className="text-foreground">{drSiNumber}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium text-muted-foreground">VAT Amount:</span>
                  <span className="text-foreground">₱{vatAmount}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium text-muted-foreground">Invoice Amount:</span>
                  <span className="text-foreground">₱{invoiceAmount}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium text-muted-foreground">EWT %:</span>
                  <span className="text-foreground">{ewtPercent}</span>
                </div>
                {supplierBankAccount && (
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium text-muted-foreground">Bank Account:</span>
                    <span className="text-foreground">{supplierBankAccount}</span>
                  </div>
                )}
                {supplierAccountNo && (
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium text-muted-foreground">Account No:</span>
                    <span className="text-foreground">{supplierAccountNo}</span>
                  </div>
                )}
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 h-12 bg-transparent"
                  onClick={() => setShowConfirmation(false)}
                >
                  Cancel
                </Button>
                <Button type="button" className="flex-1 h-12" onClick={handleActualSubmit} disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
