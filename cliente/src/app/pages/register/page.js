'use client'
import { useState } from "react";
import handlerAcessUser from "@/app/functions/handlerAcess"
import { useRouter } from "next/navigation";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import styles from "../alterar/style.module.css"
import { postUser } from "@/app/functions/handlerAcessAPI";


export default  function register() {

  const [user, setUser] = useState({
    usuario: '',
    senha: '',
    confirmarSenha:''
  });

  const {push} =useRouter()
  const {refresh } = useRouter();

  const handlerLogin = async (e) => {
    e.preventDefault();
   
  
   

    try {

      await postUser(user)
      return push("/pages/dashboard")

    } catch {
      
      toast.error("Erro na aplicação")
      refresh();
    }

  }
  return (
    <div className={styles.Container}>
      <div className={styles.empurrar}></div>
      <div className={styles.form}>
      <form onSubmit={handlerLogin}>
      <h1 className={styles.h1}>registrar</h1>

        <input
          placeholder='E-mail'
          type="text"
          className={styles.input}
          onChange={(e) => { setUser({ ...user, usuario: e.target.value }) }}>
        </input>

        <input
          placeholder='Senha'
          className={styles.input}
          type='text'
          onChange={(e) => { setUser({ ...user, senha: e.target.value }) }}>
        </input>

        <input
          placeholder='ConfirmarSenha'
          className={styles.input}
          type='text'
          onChange={(e) => { setUser({ ...user, confirmarSenha: e.target.value }) }}>
        </input>

        <button  className={styles.button}>Registrar</button>


      </form>
      <a href='/' className={styles.link}><button  className={styles.voltar}>Voltar</button></a>
      </div>
      <ToastContainer/>
    </div>
  )
}

