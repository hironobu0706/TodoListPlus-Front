"use client" // ←※※注意ポイント①※※

// import { ReactNode } from 'react'
import Button from '@mui/material/Button';

interface SamplePageProps {
    test: string;
}

const SamplePage =(param: SamplePageProps) => {
    const changeTidle = () => {
        document.title = "実行"
    }

    const { test } = param;

    return (
        <>
          -----以下、サンプル21-----
          <br/>
          {test}
          
          <br/>
          <Button variant="contained" color="secondary" 
          action={() => {}}
          onClick={() => changeTidle()}>削除</Button>
        </>
    )
}
export default SamplePage