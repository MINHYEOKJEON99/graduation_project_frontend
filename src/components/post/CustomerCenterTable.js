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
import { useRouter } from 'next/router';

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

export default function CustomerCenterTable({ inquriyList }) {
  const router = useRouter();

  const onClickRow = (id) => {
    router.push(`/user/customercenter/inquiryDetail/${id}`);
  };
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
              {inquriyList &&
                inquriyList.map((row) => (
                  <StyledTableRow
                    key={row.inquiryId}
                    sx={{
                      backgroundColor: 'white',
                      ':hover': {
                        backgroundColor: '#e0e0e0',
                      },
                      cursor: 'pointer',
                    }}
                    onClick={onClickRow.bind(null, row.inquiryId)}
                  >
                    <StyledTableCell align="left">
                      {row.inquiryId}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {row.title}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.writerName}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.createdDate.slice(0, 11)}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.replied ? '완료' : '미완료'}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
