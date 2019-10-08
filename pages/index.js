import React, { useState, useCallback } from "react";
import Head from 'next/head';
import Link from 'next/link'
import Layout from '../components/layout';
import { Title, SelectUserWidget, SelectList, SelectButton } from '../components/styled';

const App = () => { 
  const [state, setState] = useState({
    user:''
  });

  const selectUser = useCallback((e) => {
    setState({
      ...state,
      user:e.target.value
    })
  }, []);

  return (
    <Layout>
      <Head>
        <title>React Socket Chat</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <SelectUserWidget>
        <Title>사용자를 선택해주세요. &#x1F64F;</Title>
        <SelectList value={state.user} onChange={(e)=>{selectUser(e)}}>
          <option value="">선택</option>
          <option value="admin">admin</option>
          <option value="장만월 사장님">장만월 사장님</option>
        </SelectList>
        <Link href={`/list?user=${state.user}`} as='/list'>
          <SelectButton disabled={!state.user}>Select</SelectButton>
        </Link>
      </SelectUserWidget>
    </Layout>
  )
}

export default App;