import { useSession } from "next-auth/react";

const Control = () => {
  const { data: session } = useSession()
  console.log(session?.user)
  return (<div>
    controle page
  </div> );
}

export default Control;
