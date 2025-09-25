// src/utils/mockDataGenerator.ts
export interface DetailedUser {
  id: number;
  organization: string;
  username: string;
  email: string;
  phone: string;
  dateJoined: string;
  status: 'Active' | 'Inactive' | 'Pending' | 'Blacklisted';
  fullName: string;
  firstName: string;
  lastName: string;
  tier: number;
  bankName: string;
  bvn: string;
  gender: string;
  maritalStatus: string;
  children: number;
  typeOfResidence: string;
  levelOfEducation: string;
  employmentStatus: string;
  sectorOfEmployment: string;
  durationOfEmployment: string;
  officialEmail: string;
  monthlyIncome: string;
  loanRepayment: string;
  twitter: string;
  facebook: string;
  instagram: string;
  guarantors: Array<{
    name: string;
    phone: string;
    email: string;
    relationship: string;
  }>;
}

export interface User {
  id: number;
  organization: string;
  username: string;
  email: string;
  phone: string;
  dateJoined: string;
  status: 'Active' | 'Inactive' | 'Pending' | 'Blacklisted';
  fullName: string;
  firstName?: string;
  lastName?: string;
  hasLoans?: boolean;
  hasSavings?: boolean;
}

const organizations = ['Lendsqr', 'Irorun', 'Lendstar', 'Union Bank', 'Access Bank'];
const firstNames = ['Ade', 'Grace', 'Tosin', 'Debby', 'Chike', 'Funke', 'Emeka', 'Bola'];
const lastNames = ['Adedeji', 'Effiom', 'Osibodu', 'Ogana', 'Nwosu', 'Adeyemi', 'Okafor', 'Ahmed'];
const bankNames = ['Union Bank', 'Access Bank', 'GT Bank', 'Zenith Bank', 'First Bank'];
const sectors = ['Technology', 'Finance', 'Healthcare', 'Education', 'Manufacturing'];
const educationLevels = ['B.Sc', 'M.Sc', 'PhD', 'High School', 'OND'];
const employmentStatuses = ['Employed', 'Self-employed', 'Unemployed'];
const maritalStatuses = ['Single', 'Married', 'Divorced'];
const residenceTypes = ["Parent's Apartment", 'Own Apartment', 'Rented Apartment'];
const relationships = ['Parent', 'Sibling', 'Friend', 'Colleague'];

export const generateDetailedUser = (id: number): DetailedUser => {
  const firstName = firstNames[id % firstNames.length];
  const lastName = lastNames[id % lastNames.length];
  const organization = organizations[id % organizations.length];
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${organization.toLowerCase().replace(' ', '')}.com`;
  const username = `${firstName}${lastName}`;
  
  return {
    id,
    organization,
    username,
    email,
    phone: `080${String(30000000 + id).slice(-8)}`,
    dateJoined: new Date(2020 + Math.floor(id / 100), id % 12, (id % 28) + 1).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
    status: ['Active', 'Inactive', 'Pending', 'Blacklisted'][id % 4] as DetailedUser['status'],
    fullName: `${firstName} ${lastName}`,
    firstName,
    lastName,
    tier: (id % 3) + 1,
    bankName: bankNames[id % bankNames.length],
    bvn: `123456789${String(id).padStart(2, '0')}`,
    gender: id % 2 === 0 ? 'Male' : 'Female',
    maritalStatus: maritalStatuses[id % maritalStatuses.length],
    children: id % 4,
    typeOfResidence: residenceTypes[id % residenceTypes.length],
    levelOfEducation: educationLevels[id % educationLevels.length],
    employmentStatus: employmentStatuses[id % employmentStatuses.length],
    sectorOfEmployment: sectors[id % sectors.length],
    durationOfEmployment: `${(id % 10) + 1} years`,
    officialEmail: `official.${firstName.toLowerCase()}@company.com`,
    monthlyIncome: `₦${((id % 50) + 10) * 10000}`,
    loanRepayment: `₦${((id % 20) + 1) * 5000}`,
    twitter: `@${firstName.toLowerCase()}${lastName.toLowerCase()}`,
    facebook: `${firstName} ${lastName}`,
    instagram: `@${firstName.toLowerCase()}${lastName.toLowerCase()}`,
    guarantors: Array.from({ length: (id % 2) + 1 }, (_, index) => ({
      name: `${firstNames[(id + index + 1) % firstNames.length]} ${lastNames[(id + index + 1) % lastNames.length]}`,
      phone: `080${String(40000000 + id + index).slice(-8)}`,
      email: `guarantor${index + 1}.${firstName.toLowerCase()}@example.com`,
      relationship: relationships[(id + index) % relationships.length]
    }))
  };
};

export const generateMockUsers = (count: number = 500): User[] => {
  return Array.from({ length: count }, (_, i) => {
    const detailedUser = generateDetailedUser(i + 1);
    return {
      id: detailedUser.id,
      organization: detailedUser.organization,
      username: detailedUser.username,
      email: detailedUser.email,
      phone: detailedUser.phone,
      dateJoined: detailedUser.dateJoined,
      status: detailedUser.status,
      fullName: detailedUser.fullName,
      firstName: detailedUser.firstName,
      lastName: detailedUser.lastName,
      hasLoans: i % 3 === 0,
      hasSavings: i % 2 === 0,
    };
  });
};

export const mockUsers = generateMockUsers(500);