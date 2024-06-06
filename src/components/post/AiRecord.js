import style from './AiRecord.module.css';

import { fetchAiRecord } from '@/pages/api/api';
import { useEffect, useState } from 'react';
import Modal from '../UI/Modal';
import { useSelector } from 'react-redux';
import Paginaition from '../UI/Pagination';

export default function AiRecord({ onToggle, onClick }) {
  const [aiRecord, setAiRecord] = useState([]);
  const [totalPage, setTotalPage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const userLogin = useSelector((state) => state.auth.isUserAuthenticated);

  useEffect(() => {
    const token = localStorage.getItem('loginToken');
    const setInit = async () => {
      const response = await fetchAiRecord(token, currentPage - 1);

      if (response) {
        setAiRecord(response.data.content);
        setTotalPage(response.data.totalPages);
      }
    };
    if (userLogin) {
      setInit();
    }
  }, [currentPage]);

  return (
    <Modal onHide={onToggle}>
      <h3>과거 기록조회</h3>
      <ul>
        {aiRecord &&
          aiRecord.map((record) => (
            <li key={record.historyId}>
              <div
                className={style.record_box}
                onClick={onClick.bind(
                  null,
                  record.historyId,
                  record.negligence.slice(10, 15)
                )}
              >
                <div>과실비율 : {record.negligence.slice(10, 15)}</div>
                <div className={style.date}>{record.createdDate}</div>
              </div>
            </li>
          ))}
      </ul>
      <Paginaition totalPage={totalPage} paginate={paginate} />
    </Modal>
  );
}
