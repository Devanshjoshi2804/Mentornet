"use client"

// import { useAccount } from "wagmi"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

// Sample data for the chart
const data = [
  {
    name: "Jan",
    tokens: 400,
  },
  {
    name: "Feb",
    tokens: 300,
  },
  {
    name: "Mar",
    tokens: 500,
  },
  {
    name: "Apr",
    tokens: 450,
  },
  {
    name: "May",
    tokens: 470,
  },
  {
    name: "Jun",
    tokens: 600,
  },
]

// Sample learning paths
const learningPaths = [
  {
    id: 1,
    title: "Blockchain Fundamentals",
    progress: 67,
    modules: 12,
    completed: 8,
  },
  {
    id: 2,
    title: "Smart Contract Development",
    progress: 30,
    modules: 10,
    completed: 3,
  },
  {
    id: 3,
    title: "Web3 Frontend Development",
    progress: 12,
    modules: 8,
    completed: 1,
  },
]

// Sample marketplace items
const marketplaceItems = [
  {
    id: 1,
    title: "DeFi Masterclass",
    author: "Alex Johnson",
    price: "50 MATIC",
    image: "https://placehold.co/600x400/3b82f6/FFFFFF/png?text=DeFi+Masterclass",
  },
  {
    id: 2,
    title: "NFT Creation Workshop",
    author: "Maria Garcia",
    price: "35 MATIC",
    image: "https://placehold.co/600x400/10b981/FFFFFF/png?text=NFT+Workshop",
  },
  {
    id: 3,
    title: "Blockchain Security",
    author: "David Chen",
    price: "45 MATIC",
    image: "https://placehold.co/600x400/ef4444/FFFFFF/png?text=Security",
  },
]

export default function DashboardPage() {
  // const { isConnected } = useAccount()
  const isConnected = false; // Mock connection state

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Welcome to your MentorNet dashboard. Manage your mentorships and projects.
        </p>
      </div>

      {/* Wallet Information - This is shown in the sidebar on desktop */}
      <div className="bg-white p-4 rounded-lg border mb-6 md:hidden">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-base font-medium">Wallet</h3>
            <div className="text-sm text-gray-500 mt-1">
              <div className="flex items-center">
                <span className="mr-1">Address:</span>
                <span className="font-mono text-xs">0xf29bbCF9987...</span>
              </div>
              <div className="flex items-center mt-1">
                <span className="mr-1">Network:</span>
                <span>Polygon Amoy</span>
              </div>
              <div className="flex items-center mt-1">
                <span className="mr-1">Balance:</span>
                <span>1.5 MATIC</span>
              </div>
            </div>
          </div>
          <div className="bg-yellow-100 p-3 rounded-lg">
            <div className="text-yellow-800 text-xs font-medium">⚠️ Testnet Mode</div>
            <div className="text-yellow-700 text-xs mt-1">No real assets are involved</div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">Total Learning Hours</div>
              <div className="text-2xl font-bold mt-1">24.5</div>
              <div className="text-xs text-gray-500 mt-1">+2.5 from last week</div>
            </div>
            <div className="text-emerald-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">Earned Tokens</div>
              <div className="text-2xl font-bold mt-1">250 MENT</div>
              <div className="text-xs text-gray-500 mt-1">+36 MENT from last week</div>
            </div>
            <div className="text-emerald-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">Courses Completed</div>
              <div className="text-2xl font-bold mt-1">3</div>
              <div className="text-xs text-gray-500 mt-1">+1 since last month</div>
            </div>
            <div className="text-emerald-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.717 50.717 0 0 1 9.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">Active Mentorships</div>
              <div className="text-2xl font-bold mt-1">2</div>
              <div className="text-xs text-gray-500 mt-1">1 session scheduled today</div>
            </div>
            <div className="text-emerald-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Progress and Learning Paths */}
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6 mb-8">
        {/* Learning Progress Chart */}
        <div className="lg:col-span-4 bg-white p-6 rounded-lg border">
          <h2 className="text-lg font-semibold mb-1">Learning Progress</h2>
          <p className="text-sm text-gray-500 mb-6">Your token earnings over the last 6 months</p>
          
          {/* Mock chart */}
          <div className="h-64 w-full">
            <div className="flex h-full items-end space-x-2">
              <div style={{ height: "40%" }} className="w-1/6 bg-emerald-500 rounded-t"></div>
              <div style={{ height: "30%" }} className="w-1/6 bg-emerald-500 rounded-t"></div>
              <div style={{ height: "50%" }} className="w-1/6 bg-emerald-500 rounded-t"></div>
              <div style={{ height: "45%" }} className="w-1/6 bg-emerald-500 rounded-t"></div>
              <div style={{ height: "48%" }} className="w-1/6 bg-emerald-500 rounded-t"></div>
              <div style={{ height: "65%" }} className="w-1/6 bg-emerald-500 rounded-t"></div>
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <div>Jan</div>
              <div>Feb</div>
              <div>Mar</div>
              <div>Apr</div>
              <div>May</div>
              <div>Jun</div>
            </div>
          </div>
        </div>

        {/* Learning Paths */}
        <div className="lg:col-span-3 bg-white p-6 rounded-lg border">
          <h2 className="text-lg font-semibold mb-1">Your Learning Paths</h2>
          <p className="text-sm text-gray-500 mb-4">Track your progress in active learning paths</p>
          
          <div className="space-y-4">
            {learningPaths.map((path) => (
              <div key={path.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{path.title}</div>
                  <div className="text-sm text-gray-500">
                    {path.completed}/{path.modules} modules
                  </div>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full">
                  <div 
                    className="h-2 bg-emerald-500 rounded-full" 
                    style={{ width: `${path.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          
          <Link 
            href="/learning-center" 
            className="mt-6 block w-full text-center py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md text-sm font-medium"
          >
            View All Courses
          </Link>
        </div>
      </div>

      {/* Connect Wallet CTA - Only show when not connected */}
      {!isConnected && (
        <div className="bg-gray-50 p-6 rounded-lg border mb-6">
          <div className="flex flex-col items-center text-center">
            <div className="bg-emerald-100 p-3 rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-emerald-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Connect Your Wallet</h3>
            <p className="text-gray-500 max-w-md mb-4">
              Connect your Polygon Amoy wallet to access all features, including token earning, course purchases, and mentor sessions.
            </p>
            <button className="py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md text-sm font-medium">
              Connect Wallet
            </button>
          </div>
        </div>
      )}

      {/* Quick Links Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Link 
            href="/dashboard/learn"
            className="bg-white p-4 rounded-lg border hover:border-emerald-500 transition-colors"
          >
            <div className="font-medium mb-1">Learning Paths</div>
            <p className="text-sm text-gray-500">Explore curated learning paths</p>
          </Link>
          <Link 
            href="/dashboard/ai-mentor"
            className="bg-white p-4 rounded-lg border hover:border-emerald-500 transition-colors"
          >
            <div className="font-medium mb-1">Ask AI Mentor</div>
            <p className="text-sm text-gray-500">Get help with blockchain concepts</p>
          </Link>
          <Link 
            href="/dashboard/projects"
            className="bg-white p-4 rounded-lg border hover:border-emerald-500 transition-colors"
          >
            <div className="font-medium mb-1">My Projects</div>
            <p className="text-sm text-gray-500">View your active projects</p>
          </Link>
          <Link 
            href="/dashboard/mentors"
            className="bg-white p-4 rounded-lg border hover:border-emerald-500 transition-colors"
          >
            <div className="font-medium mb-1">Find Mentors</div>
            <p className="text-sm text-gray-500">Connect with blockchain experts</p>
          </Link>
        </div>
      </div>

      {/* Marketplace Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Marketplace</h2>
          <Link 
            href="/dashboard/marketplace"
            className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
          >
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {marketplaceItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg border overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium mb-1">{item.title}</h3>
                <p className="text-sm text-gray-500 mb-2">by {item.author}</p>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-sm">{item.price}</span>
                  <Link 
                    href={`/dashboard/marketplace/${item.id}`}
                    className="text-xs px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 