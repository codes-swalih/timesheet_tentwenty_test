import {
  Timesheet,
  TimesheetEntry,
  User,
  EntrySelectInput,
} from "@/types/types";
import { v4 as uuid } from "uuid";

// Mock users
export const users: User[] = [
  {
    id: "u1",
    email: "test@tentwenty.com",
    password: "123456",
    name: "John Doe",
  },
];

// Mock timesheets
export const timesheets: Timesheet[] = [
  {
    id: "t1",
    week: 1,
    startDate: "2025-11-10",
    endDate: "2025-11-16",
  },
  {
    id: "t2",
    week: 2,
    startDate: "2025-11-17",
    endDate: "2025-11-23",
  },
  {
    id: "t3",
    week: 3,
    startDate: "2025-11-24",
    endDate: "2025-11-30",
  },
  {
    id: "t4",
    week: 4,
    startDate: "2025-12-01",
    endDate: "2025-12-07",
  },
  {
    id: "t5",
    week: 5,
    startDate: "2025-12-08",
    endDate: "2025-12-14",
  },
];

// Mock entries
export const entries: TimesheetEntry[] = [
  // Week 1 - COMPLETED (40 hrs)
  {
    id: uuid(),
    timesheetId: "t1",
    date: "2025-11-10",
    tasks: [
      {
        id: uuid(),
        projectName: "Homepage Development",
        workType: "FrontEnd",
        description: "Implemented homepage layout",
        hours: 8,
      },
      {
        id: uuid(),
        projectName: "About page Development",
        workType: "Bug fix",
        description: "Fixed spacing issue",
        hours: 4,
      },
    ],
  },
  {
    id: uuid(),
    timesheetId: "t1",
    date: "2025-11-11",
    tasks: [
      {
        id: uuid(),
        projectName: "Homepage Development",
        workType: "Frontend",
        description: "Added responsive behavior",
        hours: 8,
      },
    ],
  },
  {
    id: uuid(),
    timesheetId: "t1",
    date: "2025-11-12",
    tasks: [
      {
        id: uuid(),
        projectName: "Homepage Development",
        workType: "Frontend",
        description: "Integrated animations",
        hours: 8,
      },
    ],
  },
  {
    id: uuid(),
    timesheetId: "t1",
    date: "2025-11-13",
    tasks: [
      {
        id: uuid(),
        projectName: "Homepage Development",
        workType: "Frontend",
        description: "Implemented client feedback",
        hours: 8,
      },
    ],
  },
  {
    id: uuid(),
    timesheetId: "t1",
    date: "2025-11-14",
    tasks: [
      {
        id: uuid(),
        projectName: "Homepage Development",
        workType: "Bug Fixes",
        description: "Fixed minor layout issues",
        hours: 8,
      },
    ],
  },

  // Week 2 - COMPLETED
  {
    id: uuid(),
    timesheetId: "t2",
    date: "2025-11-18",
    tasks: [
      {
        id: uuid(),
        projectName: "Authentication Module",
        workType: "Backend",
        description: "Added JWT authentication logic",
        hours: 8,
      },
      {
        id: uuid(),
        projectName: "Authentication Module",
        workType: "Frontend",
        description: "Built login & signup UI",
        hours: 8,
      },
    ],
  },

  // Week 3 - INCOMPLETE (less than 40 hrs)
  {
    id: uuid(),
    timesheetId: "t3",
    date: "2025-11-25",
    tasks: [
      {
        id: uuid(),
        projectName: "Dashboard Revamp",
        workType: "Frontend",
        description: "Setup base dashboard structure",
        hours: 12,
      },
    ],
  },
  {
    id: uuid(),
    timesheetId: "t3",
    date: "2025-11-26",
    tasks: [
      {
        id: uuid(),
        projectName: "Dashboard Revamp",
        workType: "Frontend",
        description: "Created chart components",
        hours: 8,
      },
    ],
  },

  // Week 4 - COMPLETED
  {
    id: uuid(),
    timesheetId: "t4",
    date: "2025-12-02",
    tasks: [
      {
        id: uuid(),
        projectName: "Admin Panel",
        workType: "Feature Dev",
        description: "Implemented role-based access control",
        hours: 8,
      },
      {
        id: uuid(),
        projectName: "Admin Panel",
        workType: "Testing QA",
        description: "Performed regression testing",
        hours: 8,
      },
    ],
  },

  // Week 5 - MISSING (no entries)
];

export const projectNames: EntrySelectInput[] = [
  { label: "Homepage Redesign", value: "homepage redesign" },
  { label: "User Authentication System", value: "user auth system" },
  { label: "E-commerce Dashboard", value: "ecommerce dashboard" },
  { label: "Mobile App API", value: "mobile app api" },
  { label: "Landing Page Optimization", value: "landing page optimization" },
  { label: "Admin Panel Development", value: "admin panel dev" },
  { label: "3D Visualization (Three.js)", value: "3d visualization" },
];

export const projectTypes: EntrySelectInput[] = [
  { label: "Feature Development", value: "feature dev" },
  { label: "Bug Fixes", value: "bug fixes" },
  { label: "Code Refactoring", value: "code refactoring" },
  { label: "Performance Optimization", value: "performance optimization" },
  { label: "API Integration", value: "api integration" },
  { label: "UI/UX Enhancement", value: "uiux enhancement" },
  { label: "Database Schema Update", value: "db schema update" },
  { label: "Testing & QA", value: "testing qa" },
  { label: "Documentation", value: "documentation" },
];
