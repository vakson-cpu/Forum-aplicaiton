import React from 'react'
import Kontent from './Kontent'




const Tabla = () => {
    return (
        <>
        <Kontent NazivSekcije={"All about Cw"} id={1} />

        <Kontent className='my-5' NazivSekcije={"Bug reports"} id={2} />

        <Kontent className='my-5' NazivSekcije={"WAHA TEAM STAFF"} id={3} />

        <Kontent className='my-5' NazivSekcije={"GENERAL TOPICS"} id={4} />

        
        </>
    )
}

export default Tabla