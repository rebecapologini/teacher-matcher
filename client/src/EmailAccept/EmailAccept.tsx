import React from 'react'
import {Card} from 'antd'
import './emaistyles.css'

const EmailAccept: React.FC = () => {
    return(
    <>
        <h1>Teacher Matcher</h1>
        <Card className='emailCard'>
            <div className='imgacpt'>
            <img src="/images/EmailAccept.png"  alt="" />
            </div>
            <h2>Подтвердите свой Email</h2>
            <h3>Для полного доступа ко всем возможностям нашего приложения, пожалуйста, подтвердите свой email. </h3>
            <h3>Проверьте свою почту и следуйте инструкциям в письме, чтобы завершить процесс верификации</h3>
        </Card>
     </>
    )
}

export default EmailAccept