import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { Button } from "./button";

interface ConfirmActionProps {
  action?: string;
  onAction: () => void;
  title?: string;
  desc?: string;
}

const ConfirmAction = ({ action, onAction, title, desc }: ConfirmActionProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full" asChild>
        <Button
          className="w-full p-2 justify-start text-red-500 hover:text-red-600"
          variant={"ghost"}
        >
          {action ?? <Trash2 />}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title ?? "Are you absolutely sure?"}</AlertDialogTitle>
          <AlertDialogDescription>
            {desc ??
              "This action cannot be undone. This will permanently delete your data from our servers."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onAction}>Confirm</AlertDialogAction>{" "}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmAction;
