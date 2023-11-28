//"use client"
import ListUsers from "@/app/components/ListUsers"
import { getUsers } from "@/app/functions/handlerAcessAPI";
import {Suspense} from 'react'
import Link from 'next/link'
import styles from '@/app/pages/dashboard/style.module.css';


export default async function Dashboard() {



const users = await getUsers();



return (
    <div className={styles.divprincipal}>
    <nav className={styles.nav} >
    <ul class={styles.container}>
      <li class={styles.dropdown}><a href='/' >Home</a></li>
      <li class={styles.dropdown}>
        <a href='/pages/alterar'>Alterar</a>
      </li>
      <li class={styles.dropdown}>
        <a href='/pages/register'>Registrar</a>
      </li>
      
    </ul>
</nav>
        <h1 className={styles.titulo}>Dashboard</h1>

        <Suspense fallback={<p>carregando...</p>}>
        
        <ListUsers user={users}/>

  

</Suspense>
    </div>
);

    
};