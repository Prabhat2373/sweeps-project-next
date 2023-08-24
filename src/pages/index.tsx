import Image from "next/image";
import { Inter } from "next/font/google";
import AppLayout from "@/layout/app/AppLayout";
import LinksTable from "@/components/table/table";
import DataTable from '@/components/table/DataTable';

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  
  return (
    <AppLayout>
      <main
        className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
      >
        {/* <LinksTable /> */}
        {/* <DataTable /> */}
      </main>
    </AppLayout>
  );
}
