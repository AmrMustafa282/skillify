"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowLeft } from "lucide-react"
import Link from "next/link"
import type { SubscriptionHistory } from "@/types"
import axios from "axios"

export default function SubscriptionHistoryPage() {
  const [history, setHistory] = useState<SubscriptionHistory | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/subscriptions/history", {
          withCredentials: true
        })
        const data = response.data
        setHistory(data)
      } catch (error) {
        console.error("Failed to fetch subscription history:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchHistory()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!history?.success) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">Failed to load subscription history</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Subscription History</h1>
          <p className="text-muted-foreground">View your past and current subscriptions</p>
        </div>
      </div>

      {history.data.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto" />
              <h3 className="text-lg font-semibold">No subscription history</h3>
              <p className="text-muted-foreground">You don't have any subscription history yet.</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {history.data.map((subscription) => (
            <Card key={subscription.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">{subscription.plan.displayName}</CardTitle>
                    <CardDescription>Subscription ID: {subscription.id}</CardDescription>
                  </div>
                  <Badge variant={subscription.status === "active" ? "default" : "secondary"}>
                    {subscription.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-muted-foreground">Plan Details</label>
                    <div className="space-y-1">
                      <p className="text-sm">Max Organizations: {subscription.plan.maxOrganizations}</p>
                      <p className="text-sm">Max Tests: {subscription.plan.maxTests}</p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium text-muted-foreground">Started</label>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <p className="text-sm">{new Date(subscription.startedAt).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium text-muted-foreground">Status</label>
                    <p className="text-sm">
                      {subscription.endedAt
                        ? `Ended ${new Date(subscription.endedAt).toLocaleDateString()}`
                        : "Currently Active"}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium text-muted-foreground">Last Updated</label>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <p className="text-sm">{new Date(subscription.updatedAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>

                {subscription.currentPeriodStart && subscription.currentPeriodEnd && (
                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-medium mb-2">Billing Period</h4>
                    <p className="text-sm text-muted-foreground">
                      {new Date(subscription.currentPeriodStart).toLocaleDateString()} -{" "}
                      {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
                    </p>
                  </div>
                )}

                {subscription.trialEnd && (
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-medium mb-2 text-blue-900">Trial Information</h4>
                    <p className="text-sm text-blue-700">
                      Trial ended: {new Date(subscription.trialEnd).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
