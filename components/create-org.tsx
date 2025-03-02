// import { useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Plus } from "lucide-react";
// import CreateOrgForm from "@/app/(protected)/dashboard/organization/create/_components/create-org-form";



// const CreateOrg = () => {
//   const [open, setOpen] = useState(false);

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger asChild>
//         <Button variant="ghost" className="w-full justify-start" onClick={() => setOpen(true)}>
//           <div className="flex size-6 items-center justify-center rounded-md border bg-background">
//             <Plus className="size-4" />
//           </div>
//           <div className="font-medium text-muted-foreground">Create Organization</div>
//         </Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>Create Organization</DialogTitle>
//         </DialogHeader>
//         <CreateOrgForm />
//         <div className="flex w-full gap-4">
//           <Button type="button" variant="outline" className="w-full" onClick={() => setOpen(false)}>
//             Cancel
//           </Button>
//           <Button className="w-full" type="submit">
//             Create
//           </Button>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default CreateOrg;
