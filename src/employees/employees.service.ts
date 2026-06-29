import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

export interface Employee {
  id: number;
  name: string;
  position: string;
  salary: number;
  email: string;
}

@Injectable()
export class EmployeesService {
  private employees: Employee[] = [];
  private idCounter = 1;

  create(createEmployeeDto: CreateEmployeeDto) {
    const { name, position, email, salary } = createEmployeeDto;
    const newEmployee: Employee = {
      id: this.idCounter++,
      name: name,
      position: position,
      salary: salary,
      email: email,
    };

    this.employees.push(newEmployee);

    return {
      success: true,
      message: 'add new employee success',
    };
  }

  findAll(): Employee[] {
    return this.employees;
  }

  findOne(id: number) {
    const employee = this.employees.find((emp) => emp.id === id);

    if (!employee) {
      throw new NotFoundException(`ไม่พบพนักงานที่มี ID : ${id}`);
    }
    return {
      success: true,
      message: 'search employee success',
      result: employee,
    };
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    const index = this.employees.findIndex((emp) => emp.id === id);

    if (index === -1) {
      throw new NotFoundException(`ไม่พบพนักงานที่มี ID : ${id}`);
    }

    this.employees[index] = { ...this.employees[index], ...updateEmployeeDto };

    return {
      success: true,
      message: 'update employee success',
      result: this.employees[index],
    };
  }

  remove(id: number) {
    const index = this.employees.findIndex((emp) => emp.id === id);

    if (index === -1) {
      throw new NotFoundException(`ไม่พบพนักงานที่มี ID : ${id}`);
    }

    this.employees.splice(index, 1);

    return {
      success: true,
      message: 'delete employee success',
    };
  }
}
