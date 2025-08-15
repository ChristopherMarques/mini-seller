import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Sparkles } from "lucide-react"
import { KpiCards } from "@/components/kpi-cards"
import type { Opportunity } from "@/types"

interface OpportunitiesTableProps {
  opportunities: Opportunity[]
}

export function OpportunitiesTable({ opportunities }: OpportunitiesTableProps) {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold gradient-text">Converted Opportunities</h2>
          <p className="text-gray-600 mt-2">Track your successful conversions</p>
        </div>
      </div>

      <KpiCards opportunities={opportunities} />

      {opportunities.length === 0 && (
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardContent className="py-16">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-400 rounded-full flex items-center justify-center mb-6 hover:scale-105 transition-transform duration-200">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Ready to convert your first lead?</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Start converting qualified leads into opportunities and watch your pipeline grow.
              </p>
              <Button className="bg-purple-500 hover:bg-purple-600 text-white btn-press hover:scale-105 transition-all duration-200 px-6 py-3 rounded-full">
                <Plus className="h-4 w-4 mr-2" />
                Convert First Lead
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
