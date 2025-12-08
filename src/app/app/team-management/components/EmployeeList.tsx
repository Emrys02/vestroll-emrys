"use client";

import React from "react";
import Image from "next/image";
import { Edit2, Trash2 } from "lucide-react";
import { Employee } from "@/types/teamManagement.types";
import { Badge } from "@/components/ui/badge";

type EmployeeListProps = {
  employees: Employee[];
};

export const EmployeeList = ({ employees }: EmployeeListProps) => {
  return (
    <div className="w-full">
      {employees.map((employee) => (
        <div key={employee.id}>
          <p>{employee.name}</p>
          <p>{employee.email}</p>
          <p>{employee.role}</p>
          <p>{employee.department}</p>
          <p>{employee.status}</p>
        </div>
      ))}
    </div>
  );
};
