import * as React from 'react';
import style from './CustomerCenterTable.module.css';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(no, name, nickname, date, ans) {
  return { no, name, nickname, date, ans };
}

const rows = [
  createData(1, '공지사항 1', '전빡빡', '2024-02-01', '완료'),
  createData(2, '공지사항 2', '돼지', '2024-02-02', '보류'),
  createData(3, '공지사항 3', '소', '2024-02-03', '완료'),
  createData(4, '공지사항 4', '토끼', '2024-02-05', '완료'),
  createData(5, '공지사항 5', '바보', '2024-03-01', '미완료'),
];

export default function CustomerCenterTable() {
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell style={{ backgroundColor: '#7e7e7e' }}>
                  번호
                </StyledTableCell>
                <StyledTableCell style={{ backgroundColor: '#7e7e7e' }}>
                  제목
                </StyledTableCell>
                <StyledTableCell
                  align="right"
                  style={{ backgroundColor: '#7e7e7e' }}
                >
                  글쓴이
                </StyledTableCell>
                <StyledTableCell
                  align="right"
                  style={{ backgroundColor: '#7e7e7e' }}
                >
                  작성일
                </StyledTableCell>
                <StyledTableCell
                  align="right"
                  style={{ backgroundColor: '#7e7e7e' }}
                >
                  답변여부
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell align="left">{row.no}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.nickname}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.date}</StyledTableCell>
                  <StyledTableCell align="right">{row.ans}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
