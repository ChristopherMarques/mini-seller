import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

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

  // Seed leads
  for (const lead of seedData.leads) {
    await prisma.lead.create({
      data: lead,
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
