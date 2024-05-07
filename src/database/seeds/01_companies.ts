import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("companies").del();

  // Inserts seed entries
  await knex("companies").insert([
    {
      id: 1,
      name: "Netflix",
      info: "Netflix is an American subscription video on-demand over-the-top streaming service. The service primarily distributes original and acquired films and television shows from various genres, and it is available internationally in multiple languages.",
      address:
        "944 อาคารมิตรทาวน์ ออฟฟิศ ทาวเวอร์ สามย่าน มิตรทาวน์ ห้องเลขที่ เอส24 069 ชั้น 24 ถนนพระราม 4 แขวงวังใหม่ เขตปทุมวัน กรุงเทพมหานคร",
      mobile_number: "09012345600",
    },
    {
      id: 2,
      name: "Youtube",
      info: "YouTube is an American online video sharing platform owned by Google. Accessible worldwide, it was launched on February 14, 2005, by Steve Chen, Chad Hurley, and Jawed Karim, three former employees of PayPal.",
      address:
        "123 อาคารมิตรทาวน์ ออฟฟิศ ทาวเวอร์ ชั้น 24 ถนนพระราม 4 แขวงวังใหม่ เขตปทุมวัน กรุงเทพมหานคร",
      mobile_number: "08012345600",
    },
    {
      id: 3,
      name: "VIU",
      info: "Viu is a Hong Kong-based over-the-top video streaming provider from PCCW Media Group`s Viu International Ltd",
      address: "466 ถนนพระราม 4 แขวงวังใหม่ เขตปทุมวัน กรุงเทพมหานคร",
      mobile_number: "07012345600",
    },
  ]);
}
