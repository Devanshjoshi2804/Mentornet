"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Certificate {
  id: string;
  title: string;
  issueDate: string;
  projectId: string;
  projectTitle: string;
  issuer: {
    id: string;
    name: string;
    role: string;
    imageUrl: string;
  };
  skills: string[];
  imageUrl: string;
  tokenId: string;
  transactionHash: string;
}

const mockCertificates: Certificate[] = [
  {
    id: "cert_1",
    title: "NFT Marketplace Development",
    issueDate: "2023-05-15",
    projectId: "1",
    projectTitle: "Build a Simple NFT Marketplace",
    issuer: {
      id: "2",
      name: "Jane Smith",
      role: "Senior Blockchain Developer",
      imageUrl: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    skills: ["Solidity", "React", "Web3.js", "ERC-721"],
    imageUrl: "https://via.placeholder.com/400x300/4ade80/ffffff?text=NFT+Marketplace+Certificate",
    tokenId: "12345",
    transactionHash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
  },
  {
    id: "cert_2",
    title: "DeFi Protocol Integration",
    issueDate: "2023-04-10",
    projectId: "3",
    projectTitle: "Introduction to DeFi Protocols",
    issuer: {
      id: "1",
      name: "John Doe",
      role: "DeFi Specialist",
      imageUrl: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    skills: ["DeFi", "Solidity", "Blockchain", "Smart Contracts"],
    imageUrl: "https://via.placeholder.com/400x300/4ade80/ffffff?text=DeFi+Certificate",
    tokenId: "54321",
    transactionHash: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
  },
];

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data from API or blockchain
    const loadCertificates = async () => {
      try {
        // In a real app, we would fetch from API or blockchain
        await new Promise(resolve => setTimeout(resolve, 1000));
        setCertificates(mockCertificates);
      } catch (error) {
        console.error("Error loading certificates:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCertificates();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">My Certificates</h1>
        <p className="text-gray-500 mt-1">
          View and verify your earned blockchain certificates
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : certificates.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600">You haven't earned any certificates yet.</p>
          <Link
            href="/dashboard/projects"
            className="mt-4 inline-block px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-md"
          >
            Browse Projects to Get Started
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificates.map((certificate) => (
            <div key={certificate.id} className="bg-white rounded-lg border shadow-sm overflow-hidden">
              <div className="h-48 overflow-hidden bg-emerald-50">
                <img 
                  src={certificate.imageUrl} 
                  alt={certificate.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-medium mb-2">{certificate.title}</h3>
                <div className="text-sm text-gray-500 mb-4">
                  Issued on {new Date(certificate.issueDate).toLocaleDateString()}
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {certificate.skills.map((skill) => (
                    <span 
                      key={skill} 
                      className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center space-x-3 mb-4">
                  <div className="h-10 w-10 rounded-full overflow-hidden">
                    <img 
                      src={certificate.issuer.imageUrl} 
                      alt={certificate.issuer.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium text-sm">{certificate.issuer.name}</div>
                    <div className="text-xs text-gray-500">{certificate.issuer.role}</div>
                  </div>
                </div>
                
                <div className="border-t pt-4 mt-4">
                  <div className="text-xs text-gray-500 mb-1">
                    <span className="font-medium">Token ID:</span> {certificate.tokenId}
                  </div>
                  <div className="text-xs text-gray-500 mb-4 break-all">
                    <span className="font-medium">Transaction:</span> {certificate.transactionHash.substring(0, 18)}...
                  </div>
                  
                  <div className="flex space-x-3 mt-4">
                    <Link
                      href={`/dashboard/certificates/${certificate.id}`}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-md flex-1 text-center"
                    >
                      View Details
                    </Link>
                    <a
                      href={`https://mumbai.polygonscan.com/tx/${certificate.transactionHash}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm font-medium rounded-md flex-1 text-center"
                    >
                      Verify on Blockchain
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 