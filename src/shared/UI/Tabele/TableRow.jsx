import React from 'react'
import './Kontent.css'
import { Link } from 'react-router-dom'

export const TableRow = ({Disc,n1,n2,info,Pid}) => {
    return (
        <>
            <td width="1" ><i className="fab fa-weixin"></i></td>
            <td   className="Sekcija"><Link to={`/threads/${Pid}`}>{Disc}</Link> 
            <p className="small-text1">
              rules are rules...  </p></td>
            <td><a href="/">{n1}</a></td>
            <td><a href="#/">{n2}</a></td>
            <td><a href="#/">{info}</a></td>
        </>
    )
}
