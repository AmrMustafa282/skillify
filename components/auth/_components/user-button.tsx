import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAvatar from "@/components/user-avatar";
import { BadgeCheck, Bell, CreditCard, LogOut, Sparkles, User } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";


const UserButton = ({
  user,
}: {
  user:
    | ({
        name?: string | null;
        email?: string | null;
        image?: string | null;
      } & {
        username?: string | null;
      })
    | undefined;
  }) => {
  const router = useRouter()
  return (
    <DropdownMenu>
      {user && (
        <>
          <DropdownMenuTrigger className="focus:outline-none focus-within:outline-none">
            <UserAvatar user={user} />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={"bottom"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <UserAvatar user={user} withHeader />
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => router.push("/subscription/plans")}>
                <Sparkles />
                Upgrade
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => router.push("/account")}>
                <User />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/subscription")}>
                <BadgeCheck />
                My Plan
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/subscription/history")}>
                <CreditCard />
                Billing
              </DropdownMenuItem>
              {/* <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem> */}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut()}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </>
      )}
    </DropdownMenu>
  );
};

export default UserButton;
