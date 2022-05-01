import React from 'react'
import './Comments.css'
const SingleComment = ({name,description,date,image}) => {
    return (
        <div className='Comments--Area'>
            <div className='Comment--Author'>
                <img className='mt-3 Author--Pic' src={image} alt="greska"></img>
                <p className='Author--Info'>{name}</p>
                {/* <p className='Author--Info'>{date}</p> */}
            </div>
            <div className='Comments'>
                <p>{description}</p>
            </div>
        </div>
    )
}

export default SingleComment
