import express from "express"
import cors from "cors"
import { PrismaClient } from "@prisma/client"

const app = express()
const prisma = new PrismaClient()
const PORT = process.env.PORT || 3001

// Middleware
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"], // Support both Next.js and Vite
    credentials: true,
  }),
)
app.use(express.json())

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() })
})

// API Routes will be added here
app.use("/api", (req, res, next) => {
  console.log(`[API] ${req.method} ${req.path}`)
  next()
})

// Leads endpoints
app.get("/api/leads", async (req, res) => {
  try {
    const { search, status, sortBy = "createdAt", sortOrder = "desc" } = req.query

    const where: any = {}

    if (search) {
      where.OR = [
        { name: { contains: search as string, mode: "insensitive" } },
        { company: { contains: search as string, mode: "insensitive" } },
        { email: { contains: search as string, mode: "insensitive" } },
      ]
    }

    if (status) {
      where.status = status
    }

    const leads = await prisma.lead.findMany({
      where,
      orderBy: {
        [sortBy as string]: sortOrder === "desc" ? "desc" : "asc",
      },
    })

    res.json(leads)
  } catch (error) {
    console.error("Error fetching leads:", error)
    res.status(500).json({ error: "Failed to fetch leads" })
  }
})

app.put("/api/leads/:id", async (req, res) => {
  try {
    const { id } = req.params
    const updateData = req.body

    const lead = await prisma.lead.update({
      where: { id: Number.parseInt(id) },
      data: updateData,
    })

    res.json(lead)
  } catch (error) {
    console.error("Error updating lead:", error)
    res.status(500).json({ error: "Failed to update lead" })
  }
})

app.delete("/api/leads/:id", async (req, res) => {
  try {
    const { id } = req.params

    await prisma.lead.delete({
      where: { id: Number.parseInt(id) },
    })

    res.json({ success: true })
  } catch (error) {
    console.error("Error deleting lead:", error)
    res.status(500).json({ error: "Failed to delete lead" })
  }
})

app.post("/api/leads", async (req, res) => {
  try {
    const leadData = req.body

    const lead = await prisma.lead.create({
      data: leadData,
    })

    res.status(201).json(lead)
  } catch (error) {
    console.error("Error creating lead:", error)
    res.status(500).json({ error: "Failed to create lead" })
  }
})

app.post("/api/leads/:id/convert", async (req, res) => {
  try {
    const { id } = req.params

    // Get the lead first
    const lead = await prisma.lead.findUnique({
      where: { id: Number.parseInt(id) },
    })

    if (!lead) {
      return res.status(404).json({ error: "Lead not found" })
    }

    // Create opportunity from lead data
    const opportunity = await prisma.opportunity.create({
      data: {
        name: `${lead.name} - ${lead.company}`,
        accountName: lead.company,
        stage: "Discovery",
        amount: null,
      },
    })

    // Delete the lead
    await prisma.lead.delete({
      where: { id: Number.parseInt(id) },
    })

    res.json({ opportunity, message: "Lead converted successfully" })
  } catch (error) {
    console.error("Error converting lead:", error)
    res.status(500).json({ error: "Failed to convert lead" })
  }
})

// Opportunities endpoints
app.get("/api/opportunities", async (req, res) => {
  try {
    const opportunities = await prisma.opportunity.findMany({
      orderBy: { createdAt: "desc" },
    })

    res.json(opportunities)
  } catch (error) {
    console.error("Error fetching opportunities:", error)
    res.status(500).json({ error: "Failed to fetch opportunities" })
  }
})

// KPIs endpoint
app.get("/api/kpis", async (req, res) => {
  try {
    const [opportunitiesCount, leadsCount, avgScore] = await Promise.all([
      prisma.opportunity.count(),
      prisma.lead.count(),
      prisma.lead.aggregate({
        _avg: {
          score: true,
        },
      }),
    ])

    const conversionRate = leadsCount > 0 ? (opportunitiesCount / (opportunitiesCount + leadsCount)) * 100 : 0

    res.json({
      opportunitiesCount,
      leadsCount,
      averageScore: Math.round(avgScore._avg.score || 0),
      conversionRate: Math.round(conversionRate * 10) / 10,
    })
  } catch (error) {
    console.error("Error fetching KPIs:", error)
    res.status(500).json({ error: "Failed to fetch KPIs" })
  }
})

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("Unhandled error:", err)
  res.status(500).json({ error: "Internal server error" })
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
  console.log(`📊 API available at http://localhost:${PORT}/api`)
})

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("\n🛑 Shutting down server...")
  await prisma.$disconnect()
  process.exit(0)
})
