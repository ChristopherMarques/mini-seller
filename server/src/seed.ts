import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const calculatePredictiveQuality = (score: number, source: string): number => {
  const sourceWeights: Record<string, number> = {
    Referral: 100,
    Website: 80,
    LinkedIn: 75,
    "Cold Email": 40,
    "Social Media": 60,
    Event: 85,
    Partner: 90,
  }

  const sourceWeight = sourceWeights[source] || 50
  const predictiveQuality = Math.round(score * 0.7 + sourceWeight * 0.3)
  return Math.min(100, Math.max(0, predictiveQuality))
}

const seedData = {
  leads: [
    {
      name: "Sarah Johnson",
      company: "TechCorp Solutions",
      email: "sarah.johnson@techcorp.com",
      source: "Website",
      score: 85,
      status: "New",
    },
    {
      name: "Michael Chen",
      company: "DataFlow Inc",
      email: "m.chen@dataflow.com",
      source: "LinkedIn",
      score: 72,
      status: "Contacted",
    },
    {
      name: "Emily Rodriguez",
      company: "CloudVision",
      email: "emily.r@cloudvision.io",
      source: "Referral",
      score: 91,
      status: "Qualified",
    },
    {
      name: "David Kim",
      company: "StartupHub",
      email: "david@startuphub.com",
      source: "Event",
      score: 68,
      status: "New",
    },
    {
      name: "Lisa Thompson",
      company: "Enterprise Systems",
      email: "lisa.thompson@enterprise.com",
      source: "Cold Email",
      score: 79,
      status: "Contacted",
    },
  ],
  opportunities: [
    {
      name: "John Smith - InnovateTech",
      accountName: "InnovateTech",
      stage: "Proposal",
      amount: 25000,
    },
    {
      name: "Maria Garcia - GlobalCorp",
      accountName: "GlobalCorp",
      stage: "Negotiation",
      amount: 45000,
    },
  ],
}

async function main() {
  console.log("🌱 Starting database seed...")

  // Clear existing data
  await prisma.opportunity.deleteMany()
  await prisma.lead.deleteMany()

  for (const lead of seedData.leads) {
    const predictiveQuality = calculatePredictiveQuality(lead.score, lead.source)
    await prisma.lead.create({
      data: {
        ...lead,
        predictiveQuality,
      },
    })
  }

  // Seed opportunities
  for (const opportunity of seedData.opportunities) {
    await prisma.opportunity.create({
      data: opportunity,
    })
  }

  console.log("✅ Database seeded successfully!")
  console.log(`📊 Created ${seedData.leads.length} leads and ${seedData.opportunities.length} opportunities`)
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
