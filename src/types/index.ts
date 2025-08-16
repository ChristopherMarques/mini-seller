export interface Lead {
  id: number
  name: string
  company: string
  email: string
  source: string
  score: number
  status: "New" | "Contacted" | "Qualified"
}

export interface Opportunity {
  id: number
  name: string
  stage: string
  accountName: string
  amount: number
}