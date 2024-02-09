import React, { useState } from 'react'
import { Button, Menu } from 'antd';
import { useEffect } from 'react';
import { getPermissions } from '../auth/verifySesion';
import { getCategories } from '../helpers/principal.helper';
import NewCategory from '../components/newCategory.modal'
function getItem(label, key, children) {
  return {
    key,
    children,
    label
  };
}


const menu = ({ token, setPermissions, setCategory }) => {

  const [categories, setCategories] = useState([])
  const [items, setItems] = useState([])
  const [isOpenNewCategory, setOpenNewCategory] = useState(false);

  const handleItemMenu = ({ key }) => {
    if (key == "2") {
      setOpenNewCategory(true)
    }
  }


  useEffect(() => {
    getCategories(token).then(res => {
      if (res.data.ok) {
        const { data } = res.data;
        setCategories([...data])
      }
    }).catch(error => {
      console.error(error)
    })

    getPermissions(token).then(res => {
      if (res.data.ok) {
        const { data } = res.data;
        setPermissions([data.permissions]);

        data.menu.forEach((item) => {
          if (item.label == "Categorias") {
            setItems(items => ([
              ...items,
              getItem(item.label, item.position, null,
                categories.map((category, i) => (
                  getItem(category.label, i, null)
                ))
              )
            ]))
          } else {
            setItems(items => (
              [
                ...items,
                getItem(item.label, item.position, null, null)
              ]))
          }
        })
      }
    }).catch(error => {
      console.error(error);
    })
  }, [])


  return (
    <div
      style={{
        width: 256,
        height: "100%",
        display: 'flex',
        alignItems: 'center',
        backgroundColor: "#001529"
      }}
    >
      <Menu
        title='prueba MERN'
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        items={items}
        style={{}}
        onClick={handleItemMenu}
      />

      <NewCategory ismodalopen={isOpenNewCategory} setmodalopen={setOpenNewCategory} token={token} />

    </div>
  );
}

export default menu


