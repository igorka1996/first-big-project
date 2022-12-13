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
import SchoolIcon from '@mui/icons-material/School';
import {
    PacksType,
    deletePacksTC,
    getPacksTC,
    idPacksAC,
    newPacksTC,
    pagePacksAC,
    pageCountPacksAC,
    sortPacksAC, searchPacksAC
} from "../store-reducers/packs-reducer";
import {Navigate, NavLink} from "react-router-dom";
import {useEffect, useState} from "react";
import row from './../IMG/Polygon 2.png'
import s from './AllPacks.module.css'
import {SuperInput} from "../features/SuperInput";
import {Button} from "@mui/material";
import {Range} from "../features/Range";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import {idCardsAC} from "../store-reducers/cards-reducer";
import {v1} from "uuid";
import {StatusType} from "../store-reducers/error-reducer";


interface Column {
    id: 'name' | 'Cards' | 'Updated' | 'Created' | 'Actions';
    label: string;
    minWidth?: number;
    align?: 'center';
}

const columns: readonly Column[] = [
    {id: 'name', label: 'Name', minWidth: 170},
    {id: 'Cards', label: 'Cards', minWidth: 100},
    {
        id: 'Updated',
        label: 'Last Updated',
        minWidth: 170,
        align: 'center'
    },
    {
        id: 'Created',
        label: 'Created by',
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
    name: string;
    Cards: number;
    Updated: string;
    Created: string;
    Actions: any;
    id: string;
}


function createData(
    name: string,
    Cards: number,
    Updated: string,
    Created: string,
    Actions: any,
    id: string
): Data {
    return {name, Cards, Updated, Created, Actions, id};
}


export function AllPacks() {
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const pageReducer = useSelector<AppRootStateType, number>(state => state.packsReducer.page)
    const [page, setPage] = useState(pageReducer !== 1 ? pageReducer : 0);
    const min = useSelector<AppRootStateType, number>(state => state.packsReducer.minCardsCount)
    const max = useSelector<AppRootStateType, number>(state => state.packsReducer.maxCardsCount)
    const [value, setValue] = useState<number[]>([min, max]);
    const packs = useSelector<AppRootStateType, PacksType[]>(state => state.packsReducer.cardPacks)
    const sort = useSelector<AppRootStateType, string>(state => state.packsReducer.sort)
    const id = useSelector<AppRootStateType, string>(state => state.registrationAuthLoginReducer.id)
    const myPackId = useSelector<AppRootStateType, string>(state => state.packsReducer.id)
    const search = useSelector<AppRootStateType, string>(state => state.packsReducer.search)
    const packTotalCount = useSelector<AppRootStateType, number>(state => state.packsReducer.cardPacksTotalCount)
    const auth = useSelector<AppRootStateType, boolean>(state => state.registrationAuthLoginReducer.auth)
    const status = useSelector<AppRootStateType, StatusType>(state => state.errorReducer.status)


    const pageCount = useSelector<AppRootStateType, number>(state => state.packsReducer.pageCount)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getPacksTC() as any)
    }, [pageCount, dispatch, pageReducer, sort, min, max, myPackId, search, id])
    if (!auth) {
        return <Navigate to='/signin'/>
    }
    const HandleClickSort = () => {
        if (sort === '0updated') {
            dispatch(sortPacksAC({sort: '1updated'}))
        } else {
            dispatch(sortPacksAC({sort: '0updated'}))
        }

    }

    const handleChangePage = (event: unknown, newPage: number) => {
        if(status === 'loading'){
            return
        }
        setPage(newPage);
        dispatch(pagePacksAC({page: newPage + 1}))
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        dispatch(pageCountPacksAC({pageCount: +event.target.value}))
        setPage(0);
        dispatch(pagePacksAC({page: 0}))
    };
    const rows = packs.map(el => createData(el.name, el.cardsCount, el.updated.slice(0, 10), el.user_name,
        [<button disabled={status === 'loading'}><NavLink key={v1()} onClick={() => dispatch(idCardsAC({id: el._id}) as any)} to='/cards'><SchoolIcon
            className={s.action}/></NavLink></button>,
            <button disabled={status === 'loading'}><BorderColorIcon key={v1()} className={s.action}/></button>,
            <button disabled={status === 'loading'}><DeleteForeverIcon key={v1()} onClick={() => dispatch(deletePacksTC(el._id) as any)}
                               className={s.action}/></button>], el.user_id
    ));


    const HandleChangeMyAndAllPacks = (id: string) => {
        dispatch(pagePacksAC({page: 1}))
        setPage(0)
        dispatch(idPacksAC({id}))
    }


    return (
        <>
            <div className={s.glav}><span className={s.packs}>Packs list</span><Button
                onClick={() => dispatch(newPacksTC() as any)} disabled={status === 'loading'} variant="contained">Add new
                pack</Button></div>
            <div className={s.panel}>
                <div className={s.search}>
                    <span className={s.str}>Search</span>
                    <SuperInput txt={search} setPage={setPage} search={searchPacksAC}/>
                </div>
                <div className={s.btn}>
                    <div className={s.str}><span>Show packs cards</span></div>
                    <Button disabled={status === 'loading'} onClick={() => HandleChangeMyAndAllPacks(id)} style={{padding: '15px 50px'}}
                            variant={myPackId !== '' ? "contained" : "outlined"}>My</Button>
                    <Button disabled={status === 'loading'} onClick={() => HandleChangeMyAndAllPacks('')} style={{padding: '15px 50px'}}
                            variant={myPackId === '' ? "contained" : "outlined"}>All</Button>
                </div>
                <div>
                    <span className={s.str}>Number of cards</span>
                    <Range setPage={setPage} value={value}
                           setValue={setValue}/>
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
                                            <img className={sort === '1updated' ? s.row : undefined} src={row}
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
                                                const value = row.id !== id ? row[column.id] === row.Actions ? row.Actions[0] : row[column.id] : row[column.id];
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
                    count={packTotalCount}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </>
    );
}