import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const UserAvatar = ({
  user,
  withHeader = false,
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

  withHeader?: boolean;
}) => {
  if (!user) {
    return null;
  }
  return (
    <>
      <Avatar className="h-8 w-8 rounded-lg">
        <AvatarImage src={user.image!} alt={user.email!} />
        <AvatarFallback className="rounded-lg">
          {user?.username?.charAt(0).toUpperCase() || "CN"}
        </AvatarFallback>
      </Avatar>
      {withHeader && (
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-semibold">{user.username}</span>
          <span className="truncate text-xs">{user.email}</span>
        </div>
      )}
    </>
  );
};

export default UserAvatar;
