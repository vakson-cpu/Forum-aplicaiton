import React from 'react'
import './Kontent.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { TableRow } from './TableRow';
import uuid from "react-uuid"

//Naizivi sekcija,sekcija sadrzi i tableID kojoj pripada
const DUMMY_SEKCIJE = [
    {
        name: "Discussion",
        numberOfReplies: 34343,
        numberOfPosts: 4343,
        lastThreadName: 'Whats Cooking',
        tableID: 1,
        PostsId:1

    },
    {
        name: "Rules",
        numberOfReplies: 34343,
        numberOfPosts: 4343,
        lastThreadName: 'Rules are rules',
        tableID: 1,
        PostsId:2,

    },
    {
        name: "Clan War",
        numberOfReplies: 34343,
        numberOfPosts: 4343,
        lastThreadName: 'War is upon us',
        tableID: 1,
        PostsId:3

    },
    {
        name: "Bug Reports",
        numberOfReplies: 34343,
        numberOfPosts: 4343,
        lastThreadName: 'Aim not working',
        tableID: 2,
        PostsId:4,

    },
    {
        name: "Suggestions",
        numberOfReplies: 456343,
        numberOfPosts: 11243,
        lastThreadName: 'Mechanics',
        tableID: 2,
        PostsId:5

    },
    {
        name: "WAHA_TEAM NEWS",
        numberOfReplies: 34343,
        numberOfPosts: 4343,
        lastThreadName: 'CW 2 when?',
        tableID: 3,
        PostsId:6,

    },
    {
        name: "Staff recruiting",
        numberOfReplies: 456343,
        numberOfPosts: 11243,
        lastThreadName: 'In need of front ends',
        tableID: 3,
        PostsId:7

    },
    {
        name: "General Chat",
        numberOfReplies: 34343,
        numberOfPosts: 4343,
        lastThreadName: 'Imm tirreed :3',
        tableID: 4,
        PostsId:8,

    },
    {
        name: "Forum Games",
        numberOfReplies: 23213,
        numberOfPosts: 112,
        lastThreadName: 'Hide ANd Seek',
        tableID: 4,
        PostsId:9,
    },





];









export const Kontent = ({NazivSekcije, id}) => {
    return (
        <>
            <Container className="sirina pt-5" >
                <table className="table bgBoja text-white table-bordered">
                    <thead >
                        <tr>
                            <th colSpan="5" ><div>
                                <p className="logo" >Cold   War </p>
                                <p className="small-text" >{NazivSekcije}</p>
                            </div></th>

                        </tr>
                    </thead>

                    <tbody>
                        <tr className="bgSvetla">
                            <td colSpan="2" className="Sadrzaj">Name of The Section</td>
                            <td className="Sadrzaj">Number of Threads</td>
                            <td className="Sadrzaj">Number of Comments</td>
                            <td className="Sadrzaj">Last Post</td>
                        </tr>
                        {
                            DUMMY_SEKCIJE.filter(T=>T.tableID === +id).map(f=>(
                                <tr key={uuid()}>
                                    <TableRow key={uuid()} Pid={f.PostsId} Disc={f.name} n1={f.numberOfPosts} n2={f.numberOfReplies} info={f.lastThreadName} />
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

            </Container>
        </>
    )
}
export default Kontent;