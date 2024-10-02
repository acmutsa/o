import { validateRequest } from "@/auth";
import Bubble from "@/components/bubble";
import { fuzzySearchMultipleWords } from "@/lib/fuzzyFiltering";
import { getAllOfficers } from "@/db/functions/officers";
import OfficerCard from "@/components/directory/officer-card";
import SearchBar from "@/components/directory/search-bar";

export default async function Page({
  searchParams,
}: {
  searchParams: { searchKey: string };
}) {
  const { user } = await validateRequest();
  const allOfficers = await getAllOfficers();

  // Add dummy data
  [
    {
      id: "cm1qvv6tk0001h547ac2pb3l5",
      notionId: "1bf4b30a-b908-45bd-8629-b826093da068",
      email: "vice-president@acmutsa.org",
      firstName: "Jonathan",
      lastName: "Donut",
      phone: "(542) 710-1277",
      birthday: new Date(),
      roles: ["President"],
    },
    {
      id: "cm1qw7ike0005h547wvcnw08z",
      notionId: "023fb04b-1f24-4359-a6c3-bcd4f7a9b419",
      email: "Minnie_Miller@hotmail.com",
      firstName: "Jane",
      lastName: "Donut",
      phone: "(711) 805-4097",
      birthday: new Date(),
      roles: ["Media"],
    },
    {
      id: "cm1qw7cg20003h5479zh1b897",
      notionId: "03dc743c-ab2e-48af-9f72-9e486d6a3a10",
      email: "Chaz47@yahoo.com",
      firstName: "Jillian",
      lastName: "Donut",
      phone: "(666) 779-4102",
      birthday: new Date(),
      roles: ["Public Relations"],
    },
    {
      id: "cm1qw7fks0004h547x9alnwuj",
      notionId: "0a8e65ee-2306-4cc6-9e56-94636eff4956",
      email: "Adolf.Dibbert@hotmail.com",
      firstName: "Jacob",
      lastName: "Donut",
      phone: "(551) 508-7012",
      birthday: new Date(),
      roles: ["Projects"],
    },
  ].forEach((o) => allOfficers.push(o));

  return (
    <main className="w-full mx-auto page-wrap max-w-5xl flex flex-col gap-y-5">
      <h1 className="font-black text-5xl pb-10">Directory</h1>
      <div>
        <Bubble title="Search" className="mb-4">
          <SearchBar />
        </Bubble>
        <div className="grid grid-cols-3 gap-4">
          {fuzzySearchMultipleWords(
            allOfficers,
            ["firstName", "lastName", "email", "phone"],
            searchParams.searchKey
          ).map((o) => (
            <OfficerCard key={o.id} o={o} />
          ))}
        </div>
      </div>
    </main>
  );
}
