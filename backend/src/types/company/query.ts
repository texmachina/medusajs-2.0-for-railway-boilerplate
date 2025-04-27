import { CustomerDTO } from "@medusajs/types";
import { ModuleCompany, ModuleEmployee } from "types";
import { QueryApprovalSettings } from "types";
import { HttpTypes } from "@medusajs/framework/types";

export type QueryCompany = ModuleCompany & {
  employees: QueryEmployee[];
  approval_settings: QueryApprovalSettings;
  carts: HttpTypes.StoreCart[];
};

export type QueryEmployee = ModuleEmployee & {
  company: QueryCompany;
  customer: CustomerDTO;
};
