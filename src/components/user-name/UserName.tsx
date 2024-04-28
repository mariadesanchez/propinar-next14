// components/UserName.js

'use client'
import { useEffect, useState } from 'react';
import { getUserById } from '../../actions/order/get-user-by-uuid';

export function UserName({ userId }: { userId: string }) {
  
  const [userName, setUserName] = useState('');

  useEffect(() => {
    async function fetchUserName() {
      const name = await getUserById(userId);
      if(name) {
        setUserName(name);
     
      }
    }
    fetchUserName();
  }, [userId]);

  return <>{userName}
  

  </>; // Devuelve directamente userName como parte del JSX
}
