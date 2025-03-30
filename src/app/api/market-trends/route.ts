import { NextResponse } from 'next/server';

export async function GET() {
  // In a real application, this data would come from a database or external API
  // This is mock data for demonstration purposes
  
  const jobRoles = [
    {
      title: "Blockchain Developer",
      growth: 43,
      avgSalary: 125000,
      demand: 82
    },
    {
      title: "Smart Contract Engineer",
      growth: 38,
      avgSalary: 135000,
      demand: 78
    },
    {
      title: "Web3 Frontend Developer",
      growth: 35,
      avgSalary: 115000,
      demand: 75
    },
    {
      title: "Solidity Engineer",
      growth: 32,
      avgSalary: 130000,
      demand: 80
    },
    {
      title: "Blockchain Security Analyst",
      growth: 29,
      avgSalary: 128000,
      demand: 85
    },
    {
      title: "Blockchain Project Manager",
      growth: 26,
      avgSalary: 118000,
      demand: 65
    },
    {
      title: "DeFi Specialist",
      growth: 25,
      avgSalary: 122000,
      demand: 70
    },
    {
      title: "Crypto Data Scientist",
      growth: 22,
      avgSalary: 126000,
      demand: 68
    },
    {
      title: "Blockchain Consultant",
      growth: 20,
      avgSalary: 115000,
      demand: 62
    }
  ];

  const industryInsights = [
    {
      industry: "Finance & Banking",
      growth: 28,
      technologies: [
        { name: "Hyperledger", percentage: 32 },
        { name: "Ethereum", percentage: 28 },
        { name: "Solana", percentage: 15 },
        { name: "Polygon", percentage: 12 },
        { name: "Corda", percentage: 13 }
      ]
    },
    {
      industry: "Healthcare",
      growth: 18,
      technologies: [
        { name: "Ethereum", percentage: 25 },
        { name: "Hyperledger", percentage: 35 },
        { name: "Polygon", percentage: 15 },
        { name: "IPFS", percentage: 15 },
        { name: "Solana", percentage: 10 }
      ]
    },
    {
      industry: "Supply Chain",
      growth: 22,
      technologies: [
        { name: "VeChain", percentage: 30 },
        { name: "Hyperledger", percentage: 30 },
        { name: "Ethereum", percentage: 20 },
        { name: "Polygon", percentage: 10 },
        { name: "IPFS", percentage: 10 }
      ]
    },
    {
      industry: "Insurance",
      growth: 15,
      technologies: [
        { name: "Ethereum", percentage: 30 },
        { name: "Hyperledger", percentage: 28 },
        { name: "Chainlink", percentage: 18 },
        { name: "Corda", percentage: 15 },
        { name: "Polygon", percentage: 9 }
      ]
    },
    {
      industry: "Real Estate",
      growth: 12,
      technologies: [
        { name: "Ethereum", percentage: 35 },
        { name: "Polygon", percentage: 25 },
        { name: "IPFS", percentage: 20 },
        { name: "Chainlink", percentage: 12 },
        { name: "Solana", percentage: 8 }
      ]
    },
    {
      industry: "Gaming & NFTs",
      growth: 32,
      technologies: [
        { name: "Ethereum", percentage: 30 },
        { name: "Polygon", percentage: 25 },
        { name: "Solana", percentage: 20 },
        { name: "IPFS", percentage: 15 },
        { name: "Flow", percentage: 10 }
      ]
    },
    {
      industry: "Government",
      growth: 8,
      technologies: [
        { name: "Hyperledger", percentage: 40 },
        { name: "Ethereum", percentage: 20 },
        { name: "Corda", percentage: 18 },
        { name: "Polygon", percentage: 12 },
        { name: "Chainlink", percentage: 10 }
      ]
    },
    {
      industry: "Energy & Utilities",
      growth: 14,
      technologies: [
        { name: "Energy Web", percentage: 35 },
        { name: "Ethereum", percentage: 25 },
        { name: "Hyperledger", percentage: 20 },
        { name: "Polygon", percentage: 10 },
        { name: "Corda", percentage: 10 }
      ]
    }
  ];

  // Return the combined data
  return NextResponse.json({
    jobRoles,
    industryInsights
  });
} 