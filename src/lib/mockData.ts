// Mock data for the mentors API
const mockMentors = [
  {
    id: "1",
    name: "Mentor 001",
    expertise: ["Blockchain", "Solidity", "Smart Contracts"],
    wallet: "0xf29bbCFB987F3618515ddDe75D6CAd34cc1855D7",
    isApproved: true,
    createdAt: "2023-09-15T10:00:00Z",
  },
  {
    id: "2",
    name: "Mentor 002",
    expertise: ["Web3", "DeFi", "NFTs"],
    wallet: "0xf29bbCFB987F3618515ddDe75D6CAd34cc1855D7",
    isApproved: true,
    createdAt: "2023-09-16T11:30:00Z",
  },
  {
    id: "3",
    name: "Rohit Shahi",
    expertise: ["Blockchain Development", "Smart Contracts", "Web3"],
    wallet: "0xf29bbCFB987F3618515ddDe75D6CAd34cc1855D7",
    isApproved: true,
    createdAt: "2023-09-17T09:45:00Z",
  },
  {
    id: "4",
    name: "Mentor 004",
    expertise: ["Ethereum", "Tokenomics", "DAO"],
    wallet: "0xf29bbCFB987F3618515ddDe75D6CAd34cc1855D7",
    isApproved: false,
    createdAt: "2023-09-18T14:20:00Z",
  },
  {
    id: "5",
    name: "Mentor 005",
    expertise: ["Layer 2", "Security", "Auditing"],
    wallet: "0xf29bbCFB987F3618515ddDe75D6CAd34cc1855D7",
    isApproved: true,
    createdAt: "2023-09-19T16:15:00Z",
  }
];

export const getMockMentors = () => {
  return Promise.resolve(mockMentors);
};

export const getMockMentorById = (id: string) => {
  const mentor = mockMentors.find((m) => m.id === id);
  return Promise.resolve(mentor || null);
};

export const getMockPendingMentors = () => {
  const pendingMentors = mockMentors.filter((m) => !m.isApproved);
  return Promise.resolve(pendingMentors);
};

export const approveMockMentor = (id: string) => {
  // In a real implementation, this would update a database
  console.log(`Approving mentor with ID: ${id}`);
  return Promise.resolve(true);
};

export const rejectMockMentor = (id: string) => {
  // In a real implementation, this would update a database
  console.log(`Rejecting mentor with ID: ${id}`);
  return Promise.resolve(true);
}; 