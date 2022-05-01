
import React from 'react'
import  uuid from 'react-uuid'
import {  Pagination} from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import './Paginacija.css'
console.log("PAGINACIJA")

 const Paginacija = ({postsPerPAge,totalPosts,paginate}) => {
    const pageNumbers=[];
    const Pid = useParams().PostId; //Id posta
    for(let i=1;i<=Math.ceil(totalPosts/postsPerPAge);i++){
        pageNumbers.push(i)
    }

  return (
    
    <nav>
        <Pagination  >
        {
            pageNumbers.map(number=>(
                <Pagination.Item key={uuid()}  className='m-1 mt-3 '>
                    <Link onClick={()=>paginate(number)} to={`/threads/info/${Pid}/${number}`}  className='m-1 text-black  '  >{number}</Link>
                </Pagination.Item>
            ))
        }
       </Pagination>
    </nav>
  )
}

export default Paginacija