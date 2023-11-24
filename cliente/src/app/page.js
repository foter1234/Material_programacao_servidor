'use client'
import { useState } from "react";
//import handlerAcessUser from "./functions/handlerAcess"
import handlerAcessUser from "./functions/handlerAcess"
import { useRouter } from "next/navigation";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import styles from "../app/pages/alterar/style.module.css"

export default  function Login() {
  const [user, setUser] = useState({
    usuario: '',
    senha: '',
  });
  const { push, refresh } = useRouter();

  const handlerLogin = async (e) => {
    e.preventDefault();
    try {
       const userAuth = await handlerAcessUser(user)
       if (userAuth.token === undefined) {
       toast.error("erro no e-mail ou senha")
  }
      push('/pages/dashboard');
      localStorage.setItem('nome', userAuth.nome)

    } catch {
      toast.error("Erro na aplicação")
      refresh();
    }
  }


  return (
   
<div className={styles.Container}>
      
      <form onSubmit={handlerLogin} className={styles.form}>
      <h1 className={styles.h1}>Login</h1>
        <input
          placeholder='nome'
          name="nome"                   
          type="text"
          className={styles.input}
          onChange={(e) => { setUser({ ...user, usuario: e.target.value }) }}>
        </input>

        <input
          placeholder='Senha'
          className={styles.input}
          type='password'
          onChange={(e) => { setUser({ ...user, senha: e.target.value }) }}>
        </input>
        <button  className={styles.button}>Entrar</button>
      </form>
      <a href='/' className={styles.link}><button  className={styles.voltar}>Voltar</button></a>
      
      <ToastContainer/>
    </div>
  )
}
