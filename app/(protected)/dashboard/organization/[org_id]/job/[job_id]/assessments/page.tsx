// export default function AssessmentPag() {
//   return (
//     <div>
//       <div className="flex items-center justify-between mb-8">
//         <h1 className="text-3xl font-bold">My Assessments</h1>
//         <Link href="assessments/create">
//           <Button>
//             <PlusCircle className="mr-2 h-4 w-4" />
//             Create Assessment
//           </Button>
//         </Link>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {[...Array(3)].map((_, i) => (
//           <div
//             key={i}
//             className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
//           >
//             <div className="h-40 bg-muted flex items-center justify-center border-b">
//               <span className="text-muted-foreground">Form Preview</span>
//             </div>
//             <div className="p-4">
//               <h2 className="font-semibold text-lg mb-1">Sample Form {i + 1}</h2>
//               <p className="text-sm text-muted-foreground mb-4">
//                 Last edited: {new Date().toLocaleDateString()}
//               </p>
//               <div className="flex gap-2">
//                 <Link href={`create-invitation/form/${i + 1}`}>
//                   <Button variant="outline" size="sm">
//                     Edit
//                   </Button>
//                 </Link>
//                 <Link href={`create-invitation/form/${i + 1}/responses`}>
//                   <Button variant="outline" size="sm">
//                     Responses
//                   </Button>
//                 </Link>
//                 <Link href={`create-invitation/form/${i + 1}/preview`}>
//                   <Button variant="outline" size="sm">
//                     Preview
//                   </Button>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import { Button } from "@/components/ui/button";
import { columns } from "./_components/assessments-columns";
import { DataTable } from "@/components/ui/data-table";
import { server } from "@/lib/api";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { Assessment } from "@/types";
import { API_URL } from "@/config";

async function getAssessments() {
  const res = await server.get(`${API_URL}/tests`);
  return res.data.data as Assessment[];
}

export default async function AssessmentsPage() {
  const data = await getAssessments();

  return (
    <div>
      <div className="flex w-full justify-between items-center mb-12">
        <h1 className="text-3xl font-bold">Assessments ({data.length})</h1>
        <Link href="assessments/create">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Assessment
          </Button>
        </Link>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
