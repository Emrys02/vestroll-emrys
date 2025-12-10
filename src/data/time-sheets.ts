export type Timesheet = {
  id: string;
  employeeName: string;
  profileImage: string;
  employeeRole: string;
  rate: number;
  totalWorked: number;
  totalAmount: number;
  status: 'Pending' | 'Rejected' | 'Approved';
  submittedAt: string;
};

export const timesheets: Timesheet[] = [
  {
    id: '0x6885afa...63b3',
    employeeName: 'John Doe',
    profileImage: '/profileImage.png',
    employeeRole: 'Software Engineer',
    rate: 12.00,
    totalWorked: 11.65,
    totalAmount: 1200.00,
    status: 'Pending',
    submittedAt: '25th Oct 2025'
  },
  {
    id: '0x6885afa...63b3',
    employeeName: 'Cody Fisher',
    profileImage: '/profileImage.png',
    employeeRole: 'Front-end Developer',
    rate: 15.00,
    totalWorked: 18.55,
    totalAmount: 1200.00,
    status: 'Rejected',
    submittedAt: '25th Oct 2025'
  },
  {
    id: '0x6885afa...63b3',
    employeeName: 'Lizzie Alba',
    profileImage: '/profileImage.png',
    employeeRole: 'Backend Engineer',
    rate: 10.00,
    totalWorked: 12.33,
    totalAmount: 1200.00,
    status: 'Approved',
    submittedAt: '25th Oct 2025'
  }
];
