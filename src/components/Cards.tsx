import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../store-reducers/store";
import {
    deleteCardTC,
    newCardTC,
    pageCardsAC,
    pageCountCardsAC,
    searchQCardsAC,
    sortCardsAC
} from "../store-reducers/cards-reducer";
import {Navigate, NavLink} from "react-router-dom";
import {useEffect, useState} from "react";
import row from './../IMG/Polygon 2.png'
import s from './AllPacks.module.css'
import {SuperInput} from "../features/SuperInput";
import {Button, CircularProgress} from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import {CardType, getCardsTC} from "../store-reducers/cards-reducer";
import {HalfRating} from "../features/HalfRating";
import {v1} from "uuid";
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import {Menushka} from "../features/Menushka";
import {StatusType} from "../store-reducers/error-reducer";

interface Column {
    id: 'question' | 'Answer' | 'Updated' | 'Grade' | 'Actions';
    label: string;
    minWidth?: number;
    align?: 'center';
}

const columns: readonly Column[] = [
    {id: 'question', label: 'Question', minWidth: 170},
    {id: 'Answer', label: 'Answer', minWidth: 100},
    {
        id: 'Updated',
        label: 'Last Updated',
        minWidth: 170,
        align: 'center'
    },
    {
        id: 'Grade',
        label: 'Grade',
        minWidth: 170,
        align: 'center'
    },
    {
        id: 'Actions',
        label: 'Actions',
        minWidth: 170,
        align: 'center'
    }
];


interface Data {
    question: string;
    Answer: string;
    Updated: string;
    Grade: JSX.Element;
    Actions: JSX.Element[] | undefined;
    id: string
}


function createData(
    question: string,
    Answer: string,
    Updated: string,
    Grade: JSX.Element,
    Actions: JSX.Element[] | undefined,
    id: string
): Data {
    return {question, Answer, Updated, Grade, Actions, id};
}


export function Cards() {
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const cards = useSelector<AppRootStateType, CardType[]>(state => state.cardsReducer.cards)
    const sort = useSelector<AppRootStateType, string>(state => state.cardsReducer.sort)
    const id = useSelector<AppRootStateType, string>(state => state.cardsReducer.id)
    const userId = useSelector<AppRootStateType, string>(state => state.registrationAuthLoginReducer.id)
    const packId = useSelector<AppRootStateType, string>(state => state.cardsReducer.packUserId)
    const searchQ = useSelector<AppRootStateType, string>(state => state.cardsReducer.searchQ)
    const searchA = useSelector<AppRootStateType, string>(state => state.cardsReducer.searchA)
    const cardsTotalCount = useSelector<AppRootStateType, number>(state => state.cardsReducer.cardsTotalCount)
    const auth = useSelector<AppRootStateType, boolean>(state => state.registrationAuthLoginReducer.auth)
    const min = useSelector<AppRootStateType, number>(state => state.cardsReducer.minGrade)
    const max = useSelector<AppRootStateType, number>(state => state.cardsReducer.maxGrade)
    const pageReducer = useSelector<AppRootStateType, number>(state => state.cardsReducer.page)
    const status = useSelector<AppRootStateType, StatusType>(state => state.errorReducer.status)
    const wait = useSelector<AppRootStateType, boolean>(state => state.errorReducer.wait)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCardsTC() as any)
    }, [rowsPerPage, dispatch, pageReducer, sort, min, max, searchQ, searchA, id])
    if (!auth) {
        return <Navigate to='/signin'/>
    }
    const HandleClickSort = () => {
        if (sort === '0grade') {
            dispatch(sortCardsAC({sort: '1grade'}))
        } else {
            dispatch(sortCardsAC({sort: '0grade'}))
        }

    }

    if (wait) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
        dispatch(pageCardsAC({page: newPage + 1}))
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        dispatch(pageCountCardsAC({pageCount: +event.target.value}))
        setPage(0);
        dispatch(pageCardsAC({page: 0}))
    };
    const rows = cards.map(el => createData(el.question, el.answer, el.updated.slice(0, 10), <HalfRating grade={el.grade}/>,
        [<button disabled={status === 'loading'}><BorderColorIcon key={v1()} className={s.action}/></button>,
            <button disabled={status === 'loading'}><DeleteForeverIcon key={v1()} onClick={() => dispatch(deleteCardTC(el._id) as any)} className={s.action}/></button>], el.user_id
    ))



    return (
        <>
            <NavLink onClick={() => dispatch(searchQCardsAC({text: ''}))} className={s.back} to='/'><ArrowCircleLeftOutlinedIcon/> <span>Back to Packs List</span></NavLink>
            <div className={s.glav}> {packId === userId ? <span className={s.packs}>My Pack<Menushka/></span> : <span className={s.packs}>Friend’s Pack</span>}{packId === userId ? <Button
                onClick={() => dispatch(newCardTC() as any)} disabled={status === 'loading'} variant="contained">Add new
                card</Button> : <Button variant="contained">Learn to pack</Button>}</div>
            <div className={s.panel}>
                <div className={s.search}>
                    <span className={s.str}>Search</span>
                    <SuperInput txt={searchQ} search={searchQCardsAC} setPage={setPage}/>
                </div>
            </div>
            <Paper sx={{width: '80%', overflow: 'hidden', margin: 'auto'}}>
                <TableContainer sx={{maxHeight: 600}}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell onClick={column.id === 'Updated' ? HandleClickSort : undefined}
                                               key={v1()}
                                               align={column.align}
                                               style={{
                                                   minWidth: column.minWidth,
                                                   cursor: "pointer",
                                                   backgroundColor: " #EFEFEF",
                                                   fontWeight: "bold"
                                               }}>
                                        {column.label}
                                        {column.id === 'Updated' ?
                                            <img className={sort === '1grade' ? s.row : undefined} src={row}
                                                 alt=""/> : undefined}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" key={v1()}>
                                            {columns.map((column) => {
                                                const value = row.id !== userId ? row[column.id] === row.Actions ? row.Actions = undefined : row[column.id] : row[column.id]
                                                return (
                                                    <TableCell key={v1()} align={column.align}>
                                                        {value}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 50]}
                    component="div"
                    count={cardsTotalCount}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </>
    );
}