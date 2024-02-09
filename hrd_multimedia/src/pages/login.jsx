import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, Form, Input } from 'antd';
import { useCookies } from 'react-cookie'
import { PoweroffOutlined, UserOutlined, LockOutlined, MailOutlined, SendOutlined } from '@ant-design/icons';
import '../assets/styles/login.css';
import logo from '../assets/images/logo.png'
import { animated, useSpring } from '@react-spring/web';
import { signIn, signUp } from '../helpers/login.helper';
import { verifySession } from '../auth/verifySesion'
import Swal from 'sweetalert2'


const Login = () => {

  const navigator = useNavigate();

  const [cookies, setCookie, removeCookie] = useCookies(['identify']);

  useEffect(() => {
    verifySession(cookies.identify)
      .then(res => {
        if (res.data?.ok) {
          navigator('/')
        }
      }).catch(err => {
        removeCookie('identify')
      })
  }, []);


  const [signInForm] = Form.useForm();
  const [signUpForm] = Form.useForm();
  const [singUpEffect, actionUp] = useSpring(
    () => ({ from: { opacity: 0 } }),
    []
  );

  const [singInEffect, actionIn] = useSpring(
    () => ({ from: { opacity: 1 } }),
    []
  )

  const handleHideSingUp = () => {
    actionUp.start({
      from: {
        x: 0,
        opacity: 1,
      },
      to: {
        x: 100,
        opacity: 0,
      },
      config: { duration: 500 }
    });

    actionIn.start({
      from: {
        x: 100,
        opacity: 0,
      },
      to: {
        x: 0,
        opacity: 1,
      },
      config: { duration: 500 }
    })
  }

  const handleHideSingIn = () => {
    actionIn.start({
      from: {
        x: 0,
        opacity: 1,
      },
      to: {
        x: -100,
        opacity: 0,
      },
    })

    actionUp.start({
      from: {
        x: -100,
        opacity: 0
      },
      to: {
        x: 0,
        opacity: 1
      }
    })
  }

  const onFinishSignIn = ({ userName, password }) => {
    signIn(userName, password).then((res) => {
      console.log(res)
      if (res.data?.ok) {
        const { data } = res.data
        setCookie('identify', data.token);
        navigator('/')
      } else {
        Swal.fire({
          title: 'ups!',
          text: res.response.data.msg,
          icon: 'info',
          confirmButtonText: 'ok!'
        })
      }
    }).catch(err =>
      Swal.fire({
        title: 'oh no!',
        text: err,
        icon: 'error',
        confirmButtonText: 'ok :('
      })
    ).finally(() => signInForm.resetFields())
  }

  const onFinishSignUp = (newUSer) => {
    signUp(newUSer).then((res) => {
      if (res.data.ok) {
        Swal.fire({
          title: 'Listo!',
          text: res.data.msg,
          icon: 'success',
          confirmButtonText: 'ok'
        })
        handleHideSingUp();
      } else {
        Swal.fire({
          title: 'ups!',
          text: res.response.data.msg,
          icon: 'info',
          confirmButtonText: 'ok'
        });

      }
    }).catch(err => {
      Swal.fire({
        title: 'oh no!',
        text: err,
        icon: 'error',
        confirmButtonText: 'ok :('
      })
    }).finally(() => signUpForm.resetFields())
  }

  return (
    <div className='background'  >
      <animated.div style={{ ...singInEffect }}>
        <div className='divContent' >
          <img src={logo} />
          <Form
            form={signInForm}
            layout='vertical'
            onFinish={onFinishSignIn}
          >
            <Form.Item
              name={'userName'}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username / Email" required />
            </Form.Item>
            <Form.Item
              name={'password'}
            >
              <Input prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password" required />
            </Form.Item>
            <Button type='primary' icon={<PoweroffOutlined />} block={true} htmlType='submit'>
              Iniciar sesión
            </Button>
            <a onClick={handleHideSingIn} style={{ fontWeight: "bold" }}>
              Registrame
            </a>
          </Form>
        </div>
      </animated.div>

      <animated.div
        style={{
          ...singUpEffect
        }}
      >
        <div className='divContent'>
          <img src={logo} />
          <Form
            form={signUpForm}
            layout='vertical'
            onFinish={onFinishSignUp}
          >
            <Form.Item
              name={'userName'}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>

            <Form.Item
              name={'email'}
            >
              <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="email" />
            </Form.Item>

            <Form.Item
              name={'password'}
            >
              <Input prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password" />
            </Form.Item>
            <Button type='primary' icon={<SendOutlined />} block={true} htmlType='submit'>
              Registrar
            </Button>
            <a onClick={handleHideSingUp} style={{ fontWeight: "bold" }}>
              Iniciar sesion
            </a>
          </Form>
        </div>
      </animated.div>


    </div>
  )
}

export default Login
