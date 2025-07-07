"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, TestTube, Crown } from "lucide-react";
import Link from "next/link";
import type { SubscriptionStatus } from "@/types";
import axios from "axios";

export default function SubscriptionDashboard() {
  const [status, setStatus] = useState<SubscriptionStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/subscriptions/status", {
          withCredentials: true,
        });
        const data = response.data;
        setStatus(data);
      } catch (error) {
        console.error("Failed to fetch subscription status:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!status?.success) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">Failed to load subscription status</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { data } = status;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Subscription Dashboard</h1>
          <p className="text-muted-foreground">Manage your subscription and view usage</p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href="/subscription/history">View History</Link>
          </Button>
          <Button asChild>
            <Link href="/subscription/plans">Upgrade Plan</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Current Plan Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Plan</CardTitle>
            <Crown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.displayName}</div>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant={data.status === "active" ? "default" : "secondary"}>
                {data.status}
              </Badge>
              {data.trial && <Badge variant="outline">Trial</Badge>}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Started {new Date(data.startedAt).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>

        {/* Organizations Usage */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Organizations</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.currentOrganizations} / {data.maxOrganizations}
            </div>
            <Progress
              value={(data.currentOrganizations / data.maxOrganizations) * 100}
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-2">
              {data.canCreateOrganization ? "Can create more" : "Limit reached"}
            </p>
          </CardContent>
        </Card>

        {/* Tests Limit */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tests Limit</CardTitle>
            <TestTube className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.maxTests}</div>
            <p className="text-xs text-muted-foreground mt-2">Maximum tests allowed</p>
          </CardContent>
        </Card>
      </div>

      {/* Usage Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Usage Overview</CardTitle>
          <CardDescription>Your current usage and limits</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Overall Usage</span>
                <span>{data.usagePercentage}%</span>
              </div>
              <Progress value={data.usagePercentage} />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Organizations Used</span>
                <span>
                  {((data.currentOrganizations / data.maxOrganizations) * 100).toFixed(0)}%
                </span>
              </div>
              <Progress value={(data.currentOrganizations / data.maxOrganizations) * 100} />
            </div>
          </div>

          {data.hasReachedLimit && (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Usage Limit Reached:</strong> You've reached your plan limits. Consider
                upgrading for more resources.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Billing Information */}
      <Card>
        <CardHeader>
          <CardTitle>Billing Information</CardTitle>
          <CardDescription>Your subscription details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Plan Status</label>
              <p className="text-sm text-muted-foreground">
                {data.activeAndValid ? "Active and Valid" : "Inactive"}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium">Billing Period</label>
              <p className="text-sm text-muted-foreground">
                {data.currentPeriodStart && data.currentPeriodEnd
                  ? `${new Date(data.currentPeriodStart).toLocaleDateString()} - ${new Date(data.currentPeriodEnd).toLocaleDateString()}`
                  : "No billing period"}
              </p>
            </div>
            {data.daysRemaining && (
              <div>
                <label className="text-sm font-medium">Days Remaining</label>
                <p className="text-sm text-muted-foreground">{data.daysRemaining} days</p>
              </div>
            )}
            {data.trialEnd && (
              <div>
                <label className="text-sm font-medium">Trial Ends</label>
                <p className="text-sm text-muted-foreground">
                  {new Date(data.trialEnd).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
