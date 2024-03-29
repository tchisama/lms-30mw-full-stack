import { server } from '@/server';
import { useClerk } from '@clerk/nextjs';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
const useProtuctDashboard = () => {
  const [loading, setLoading] = React.useState(true)
  const user = useClerk()
  const route = useRouter()
  React.useEffect(() => {
    if(user.user?.id){
      fetch(`${server}auth/user/${user.user?.id}`).then(res => res.json()).then(data => {
        if(data.rule=="admin"||data.rule=="teacher"||data.rule=="contributor"){
          setLoading(false)
          if(data.rule=="contributor"){
            route.push("/dashboard/users")
          }
        }else{
          route.push("/")
        }
      }).catch(err=>{
        console.log(err)
        route.push("/sign-in")
      })
    }
  },[user.user?.id])

  return { loading };
};

export default useProtuctDashboard;
