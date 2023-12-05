import styles from '../pages/dashboard/style.module.css'
import Image from 'next/image'
export default async function ListUsers({user}) {
    
    await new Promise((resolve)=> setTimeout(resolve, 5000))


    return(
        <div>
             {user?.map((users, index)=>
             <div class={styles.divPrincipal}>
            
             
             <div class={styles.conteiner}>

             <div class={styles.card2} key={index}>
               <div class={styles.card22}>
               
               <div class={styles.img} >
                
               </div>
               <h3> {users.usuario}</h3>
             </div>
             </div>   
             </div>
             
             </div>
             
             )}


        </div>
    )
    
}