import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("users").del();

  // Inserts seed entries
  await knex("users").insert([
    {
      id: 1,
      name: "สมใจ",
      last_name: "ดวงดี",
      address:
        "46 ถ วชิรปราการ Bang Pla Soi, Chon Buri District, Chon Buri 20000",
      mobile_number: "038285445",
      gender: "female",
      marital_status_id: 1,
      date_of_birth: "1990-10-12",
      salary_rate: 50000.0,
      salary_type_id: 1,
      position_of_work: "หัวหน้างาน",
      company_id: 1,
    },
    {
      id: 2,
      name: "สมชาย",
      last_name: "หาญกล้า",
      address:
        "46 ถ วชิรปราการ Bang Pla Soi, Chon Buri District, Chon Buri 20000",
      mobile_number: "038285445",
      gender: "female",
      marital_status_id: 2,
      date_of_birth: "1997-12-12",
      salary_rate: 75000.0,
      salary_type_id: 1,
      position_of_work: "หัวหน้างาน",
      company_id: 1,
    },
    {
      id: 3,
      name: "มานัส",
      last_name: "มีสุข",
      address:
        "46 ถ วชิรปราการ Bang Pla Soi, Chon Buri District, Chon Buri 20000",
      mobile_number: "038285445",
      gender: "female",
      marital_status_id: 2,
      date_of_birth: "1990-10-12",
      salary_rate: 30000.0,
      salary_type_id: 1,
      position_of_work: "ทั่วไป",
      company_id: 2,
    },
    {
      id: 4,
      name: "อรนงค์",
      last_name: "งามวงศ์",
      address:
        "522 หมู่ที่ 6 Sounrajchakarn Rd, Rim Kok, Mueang Chiang Rai District, Chiang Rai 57100",
      mobile_number: "053152078",
      gender: "female",
      marital_status_id: 1,
      date_of_birth: "1990-10-01",
      salary_rate: 450,
      salary_type_id: 2,
      position_of_work: "ทั่วไป",
      company_id: 3,
    },
    {
      id: 5,
      name: "สมหญิง",
      last_name: "มั่งมี",
      address:
        "185 ถ.ประจวบคีรีขันธ์ ต.ประจวบคีรีขันธ์ อ.เมือง จ.ประจวบคีรีขันธ์ 77000",
      mobile_number: "032602038",
      gender: "female",
      marital_status_id: 3,
      date_of_birth: "2003-10-12",
      salary_rate: 750.0,
      salary_type_id: 2,
      position_of_work: "ประชาสัมพันธ์",
      company_id: 3,
    },
  ]);
}
