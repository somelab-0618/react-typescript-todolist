import React, { useState, useEffect } from 'react';
import { Button, FormControl, TextField, Typography } from '@material-ui/core';
import styles from './Login.module.css';
import { auth } from './firebase';

const Login: React.FC = (props: any) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      user && props.history.push('/');
    });
    return unSub();
  }, [props.history]);

  return (
    <div className={styles.login__root}>
      <h1>{isLogin ? 'Login' : 'Register'}</h1>
      <FormControl>
        <TextField
          InputLabelProps={{ shrink: true }}
          name='email'
          label='E-mail'
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value);
          }}
        />
      </FormControl>
      <br />
      <FormControl>
        <TextField
          InputLabelProps={{ shrink: true }}
          name='password'
          label='password'
          value={password}
          type='password'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value);
          }}
        />
      </FormControl>
      <br />
      <Button
        variant='contained'
        color='primary'
        size='small'
        onClick={
          isLogin
            ? async () => {
                try {
                  await auth.signInWithEmailAndPassword(email, password);
                  props.history.push('/');
                } catch (error: any) {
                  alert(error.message);
                }
              }
            : async () => {
                try {
                  await auth.createUserWithEmailAndPassword(email, password);
                  props.history.push('/');
                } catch (error: any) {
                  alert(error.message);
                }
              }
        }
      >
        {isLogin ? 'Login' : 'Register'}
      </Button>
      <br />
      <Typography align='center'>
        <span onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Create new Account?' : 'Back to Login'}
        </span>
      </Typography>
    </div>
  );
};

export default Login;
