"use client";

import { useEffect, useState } from "react";
import { 
  ArrowUpRight, 
  Briefcase, 
  Building2, 
  ChevronRight, 
  LineChart, 
  TrendingUp,
  DollarSign
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import { Button } from "@/components/ui/button";

// Types for the data
interface JobRole {
  title: string;
  growth: number;
  avgSalary: number;
  demand: number;
}

interface IndustryInsight {
  industry: string;
  growth: number;
  technologies: { name: string; percentage: number }[];
}

export default function MarketTrends() {
  const [jobRoles, setJobRoles] = useState<JobRole[]>([]);
  const [industryInsights, setIndustryInsights] = useState<IndustryInsight[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data from the API
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const res = await fetch('/api/market-trends');
        const data = await res.json();
        
        if (data.jobRoles) {
          setJobRoles(data.jobRoles);
        }
        
        if (data.industryInsights) {
          setIndustryInsights(data.industryInsights);
        }
      } catch (error) {
        console.error('Error fetching market trends data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  // Custom colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  
  // Colors for industry growth chart
  const getGrowthBarColor = (growth: number) => {
    if (growth > 15) return '#10b981';
    if (growth > 10) return '#0ea5e9';
    if (growth > 5) return '#6366f1';
    return '#f59e0b';
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Blockchain Job Market Trends</h1>
      
      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Total Blockchain Roles</p>
                <h2 className="text-3xl font-bold mt-1">24,580</h2>
                <p className="text-sm text-emerald-600 mt-1">
                  <TrendingUp className="inline h-4 w-4 mr-1" />
                  +18.3% year over year
                </p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Briefcase className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Average Salary</p>
                <h2 className="text-3xl font-bold mt-1">$105,800</h2>
                <p className="text-sm text-emerald-600 mt-1">
                  <TrendingUp className="inline h-4 w-4 mr-1" />
                  +7.2% year over year
                </p>
              </div>
              <div className="h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Top Hiring Industry</p>
                <h2 className="text-3xl font-bold mt-1">Fintech</h2>
                <p className="text-sm text-emerald-600 mt-1">
                  <TrendingUp className="inline h-4 w-4 mr-1" />
                  28% of all blockchain jobs
                </p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Building2 className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Demand Growth</p>
                <h2 className="text-3xl font-bold mt-1">+32%</h2>
                <p className="text-sm text-emerald-600 mt-1">
                  <TrendingUp className="inline h-4 w-4 mr-1" />
                  Expected over next 2 years
                </p>
              </div>
              <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center">
                <LineChart className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Tabs with different views */}
      <Tabs defaultValue="job-market">
        <TabsList className="mb-6">
          <TabsTrigger value="job-market">Job Market Trends</TabsTrigger>
          <TabsTrigger value="industry">Industry Insights</TabsTrigger>
        </TabsList>
        
        {/* Job Market Trends Tab */}
        <TabsContent value="job-market">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Top Growing Blockchain Job Roles</CardTitle>
                <CardDescription>
                  Growth rate of blockchain job roles over the past 12 months
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="h-[400px] w-full flex items-center justify-center">
                    <p>Loading job market data...</p>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                      data={jobRoles}
                      layout="vertical"
                      margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                      <XAxis type="number" tick={{ fontSize: 12 }} />
                      <YAxis
                        dataKey="title"
                        type="category"
                        tick={{ fontSize: 12 }}
                        width={100}
                      />
                      <Tooltip
                        formatter={(value: number) => [`${value}% growth`, 'Growth Rate']}
                        labelFormatter={(label) => `Job: ${label}`}
                      />
                      <Bar
                        dataKey="growth"
                        fill="#10b981"
                        radius={[0, 4, 4, 0]}
                        barSize={30}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>
            
            {/* Salary Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Salary Overview</CardTitle>
                <CardDescription>
                  Average annual salaries for top blockchain roles
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="h-[400px] w-full flex items-center justify-center">
                    <p>Loading salary data...</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {jobRoles
                      .sort((a, b) => b.avgSalary - a.avgSalary)
                      .slice(0, 6)
                      .map((role, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">{role.title}</p>
                            <div className="flex items-center mt-1">
                              <div className="h-2 bg-emerald-100 rounded-full w-32">
                                <div
                                  className="h-2 bg-emerald-500 rounded-full"
                                  style={{ width: `${(role.demand / 100) * 100}%` }}
                                />
                              </div>
                              <span className="text-xs text-muted-foreground ml-2">
                                Demand: {role.demand}%
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">${role.avgSalary.toLocaleString()}</p>
                            <p className="text-xs text-emerald-600">
                              <TrendingUp className="inline h-3 w-3 mr-1" />
                              {role.growth}% growth
                            </p>
                          </div>
                        </div>
                      ))}
                      
                    <Button variant="outline" className="w-full mt-4">
                      <ChevronRight className="h-4 w-4 mr-2" /> View All Roles
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Industry Insights Tab */}
        <TabsContent value="industry">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Industry Growth Analysis</CardTitle>
                <CardDescription>
                  Growth rate in blockchain adoption across industries
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="h-[400px] w-full flex items-center justify-center">
                    <p>Loading industry data...</p>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                      data={industryInsights}
                      layout="vertical"
                      margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                      <XAxis type="number" tick={{ fontSize: 12 }} />
                      <YAxis
                        dataKey="industry"
                        type="category"
                        tick={{ fontSize: 12 }}
                        width={100}
                      />
                      <Tooltip
                        formatter={(value: number) => [`${value}% growth`, 'Growth Rate']}
                        labelFormatter={(label) => `Industry: ${label}`}
                      />
                      <Bar
                        dataKey="growth"
                        barSize={30}
                        radius={[0, 4, 4, 0]}
                      >
                        {industryInsights.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={getGrowthBarColor(entry.growth)} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>
            
            {/* Most In-Demand Technologies by Industry */}
            <Card>
              <CardHeader>
                <CardTitle>In-Demand Technologies</CardTitle>
                <CardDescription>
                  Most requested blockchain technologies
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="h-[400px] w-full flex items-center justify-center">
                    <p>Loading technology data...</p>
                  </div>
                ) : (
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={
                            industryInsights
                              .flatMap(industry => industry.technologies)
                              .reduce((acc, tech) => {
                                const existing = acc.find(t => t.name === tech.name);
                                if (existing) {
                                  existing.percentage += tech.percentage;
                                } else {
                                  acc.push({ ...tech });
                                }
                                return acc;
                              }, [] as { name: string; percentage: number }[])
                              .sort((a, b) => b.percentage - a.percentage)
                              .slice(0, 5)
                              .map(tech => ({
                                name: tech.name,
                                value: Math.round(tech.percentage / industryInsights.length)
                              }))
                          }
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {industryInsights
                            .flatMap(industry => industry.technologies)
                            .reduce((acc, tech) => {
                              const existing = acc.find(t => t.name === tech.name);
                              if (existing) {
                                existing.percentage += tech.percentage;
                              } else {
                                acc.push({ ...tech });
                              }
                              return acc;
                            }, [] as { name: string; percentage: number }[])
                            .sort((a, b) => b.percentage - a.percentage)
                            .slice(0, 5)
                            .map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Legend />
                        <Tooltip formatter={(value) => [`${value}%`, 'Demand']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Report Links */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="pt-6">
            <h3 className="font-bold flex items-center">
              <ArrowUpRight className="h-4 w-4 mr-2 text-blue-500" />
              2023 Blockchain Job Market Report
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Comprehensive analysis of the current blockchain job landscape
            </p>
            <Button variant="link" className="px-0 mt-2">
              Download PDF <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-emerald-500">
          <CardContent className="pt-6">
            <h3 className="font-bold flex items-center">
              <ArrowUpRight className="h-4 w-4 mr-2 text-emerald-500" />
              Blockchain Skills Gap Analysis
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Research on the most in-demand skills and education requirements
            </p>
            <Button variant="link" className="px-0 mt-2">
              Download PDF <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="pt-6">
            <h3 className="font-bold flex items-center">
              <ArrowUpRight className="h-4 w-4 mr-2 text-purple-500" />
              Industry Adoption Forecast 2024
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Predictions for blockchain adoption across different industries
            </p>
            <Button variant="link" className="px-0 mt-2">
              Download PDF <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 