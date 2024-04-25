import { useRouter } from 'next/router';
import style from './[id].module.css';
import { FaHeart } from 'react-icons/fa';
import { FaRegHeart } from 'react-icons/fa';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import CommunityPostDetail from '@/src/components/post/CommunityPostDetail';

export default function CommunityDetail() {
  const DUMMY_ARRAY = useSelector((state) => state.post);

  return (
    <>
      {DUMMY_ARRAY.map((post) => (
        <CommunityPostDetail
          key={post.id}
          title={post.title}
          content={post.content}
          like={post.like}
        />
      ))}
    </>
  );
}
