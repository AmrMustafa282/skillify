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
import { LucideIcon } from "lucide-react";
import { Button } from "./button";

interface ConfirmActionProps {
  action?: string;
  Icon?: LucideIcon;
  onAction: () => void;
  title?: string;
  desc?: string;
}

const ConfirmAction = ({ action, onAction, title, desc, Icon }: ConfirmActionProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full" asChild>
        <Button
          className="w-full p-2 justify-start items-center text-red-500 hover:text-red-600 gap-2"
          variant="ghost"
        >
          {Icon && <Icon className="w-5 h-5" />}
          {action}
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
          <AlertDialogAction onClick={onAction}>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmAction;
