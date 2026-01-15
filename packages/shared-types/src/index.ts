export interface VacationRequest {
  employeeId: string;
  startDate: string;
  endDate: string;
  approved: boolean;
}

export enum Role {
  ADMIN = "ADMIN",
  EMPLOYEE = "EMPLOYEE",
}
