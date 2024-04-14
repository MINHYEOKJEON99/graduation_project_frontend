import style from './AdminHeader.module.css';
import Image from 'next/image';
import logo from '../../assets/logo.png';

import { CgProfile } from 'react-icons/cg';
import { HiOutlineChatBubbleLeftRight } from 'react-icons/hi2';
import { LiaComment } from 'react-icons/lia';
import { SlQuestion } from 'react-icons/sl';
import { LuBrainCircuit } from 'react-icons/lu';

export default function AdminHeader({ children }) {
  return (
    <div>
      <header className={style.header_admin}>
        <div className={style.logo}>
          <Image src={logo} alt="logo" className={style.img} priority />
        </div>
        <nav>
          <ul className={style.header_admin_nav}>
            <li>
              <CgProfile size={25} />
              사용자 계정 관리
            </li>
            <li>
              <HiOutlineChatBubbleLeftRight size={25} />
              커뮤니티 게시판 관리
            </li>
            <li>
              <LiaComment size={25} />
              후기 게시판 관리
            </li>
            <li>
              <SlQuestion size={25} />
              사용자 문의
            </li>
            <li>
              <LuBrainCircuit size={23} />
              AI 관리
            </li>
          </ul>
        </nav>

        <div />
      </header>
      <main className={style.main_admin}>{children}</main>
    </div>
  );
}
