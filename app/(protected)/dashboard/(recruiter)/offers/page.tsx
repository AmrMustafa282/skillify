"use client";
import { columns, Payment } from "@/components/payment/columns";
import { DataTable } from "@/components/payment/data-table";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52g",
      amount: 200,
      status: "processing",
      email: " f@example.com",
    },
  ];
}
const OffersPage = () => {
  const router = useRouter();
  const [data, setData] = useState<Payment[]>([]);

  useEffect(() => {
    getData().then((data) => setData(data));
  }, []);

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-end mb-3">
        <Button onClick={() => router.push("offers/create")}>Create Offer</Button>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default OffersPage;
