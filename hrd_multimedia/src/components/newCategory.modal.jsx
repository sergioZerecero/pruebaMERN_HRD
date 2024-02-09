import React from 'react'
import { Modal, Form, Input, Checkbox, Button } from 'antd';
import { saveCategory } from '../helpers/principal.helper';
import Swal from 'sweetalert2'

const NewCategory = ({ ismodalopen, setmodalopen, token }) => {

  const [newCategoryForm] = Form.useForm()

  const handleFinish = (values) => {

    saveCategory(values, token)
      .then(res => {
        if (res.data.ok) {
          Swal.fire({
            title: 'Listo!',
            text: res.data.msg,
            icon: 'success',
            confirmButtonText: 'ok'
          })
        }
        setmodalopen(false)
      }).catch(err => {
        console.error(err)
      }).finally(() => {
        newCategoryForm.resetFields()
      })
  }

  return (
    <>
      <Modal title="Nueva categoria" open={ismodalopen} footer={null}>
        <Form
          form={newCategoryForm}
          onFinish={handleFinish}
          layout='vertical'
        >
          <Form.Item
            name={'description'}
          >
            <Input maxLength={30} required placeholder='Nombre de la categoria' />
          </Form.Item>
          <Form.Item name="acceptVideos" valuePropName="checked">
            <Checkbox>Accepta liks de videos?</Checkbox>
          </Form.Item>
          <Form.Item name="acceptImage" valuePropName="checked">
            <Checkbox>Accepta imagenes?</Checkbox>
          </Form.Item>
          <Form.Item name="acceptText" valuePropName="checked">
            <Checkbox>Accepta videos?</Checkbox>
          </Form.Item>
          <Button type='primary' block={true} htmlType='submit'>Guardar</Button>
        </Form>
      </Modal>
    </>
  );
}

export default NewCategory
