import React, { useEffect, useState } from 'react'
import Menu from '../layout/Menu'
import '../assets/styles/principal.css';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { verifySession } from '../auth/verifySesion';


const Principal = () => {

  const navigator = useNavigate();
  const [permissions, setPermissions] = useState([])
  const [category, setCategory] = useState({
    title: "No se tiene categorias",
    items: []
  })

  const [cookies, setCookie, removeCookie] = useCookies(['identify']);

  useEffect(() => {
    verifySession(cookies.identify)
      .then(res => {
        if (!res.data?.ok) {
          navigator('/login');
          removeCookie('identify')
        }
      }).catch(err => {
        removeCookie('identify')
      })
  }, []);

  return (
    <div style={{ display: 'flex', height: "100vh" }}>
      <Menu token={cookies.identify} setPermissions={setPermissions} setCategory={setCategory} />
      <div style={{ width: "100%", height: "80%", padding: "2em", overflowY: 'scroll' }}>
        <h1>{category.title}</h1>
        <hr />

      </div>
    </ div>
  )
}

export default Principal
