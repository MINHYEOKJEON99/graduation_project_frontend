import axios from 'axios';

//로그인
export async function fetchLogin(userInfo) {
  try {
    const response = await axios.post(
      'http://ceprj.gachon.ac.kr:60011/user/login',
      userInfo
    );
    console.log(response.data);
    return response.data.token;
  } catch (e) {
    console.log(e);
  }
}

//회원가입
export async function fetchSignUp(newUser) {
  try {
    const response = await axios.post(
      'http://ceprj.gachon.ac.kr:60011/user/register',
      newUser
    );

    console.log('success, response: ', response);
  } catch (e) {
    console.log(e);
  }
}

//커뮤니티 새글 작성
export async function fetchNewPost(newPost, token) {
  try {
    const response = await axios.post(
      'http://ceprj.gachon.ac.kr:60011/board/write',
      newPost,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log('success, response: ', response);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

//커뮤니티 글 수정하기
export async function fetchUpdatePost(id, updatePost, token) {
  try {
    const response = await axios.patch(
      `http://ceprj.gachon.ac.kr:60011/board/${id}/update`,
      updatePost,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log('success, response: ', response);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

//커뮤니티 리스트 불러오기
export async function fetchCommunity() {
  try {
    const response = await axios.get(
      'http://ceprj.gachon.ac.kr:60011/board/list'
    );
    console.log('success, response: ', response);
    return response;
  } catch (e) {
    console.log(e);
  }
}

//커뮤니티 상세보기
export async function fetchCommunityDetail(id) {
  try {
    const response = await axios.get(
      `http://ceprj.gachon.ac.kr:60011/board/${id}`
    );
    console.log('success, response: ', response);
    return response;
  } catch (e) {
    console.log(e);
  }
}

//커뮤니티 삭제
export async function fetchCommunityDelete(id) {
  try {
    const response = await axios.delete(
      `http://ceprj.gachon.ac.kr:60011/board/${id}/delete`
    );
    console.log('delete success', response);
  } catch (e) {
    console.log(e);
  }
}

//커뮤니티 검색

export async function fetchCommunityTitleSearch(search) {
  try {
    const response = await axios.get(
      `http://ceprj.gachon.ac.kr:60011/board/search?title=${search}&content=a&writerName=a`
    );
    console.log('search success', response);
    return response;
  } catch (e) {
    console.log(e);
  }
}

//커뮤니티 댓글 보기
export async function fetchComment(id) {
  try {
    const response = await axios.get(
      `http://ceprj.gachon.ac.kr:60011/board/${id}/comment/list`
    );
    console.log('comment success', response);
    return response;
  } catch (e) {
    console.log(e);
  }
}

//커뮤니티 댓글 작성

export async function fetchWriteComment(id, comment, token) {
  try {
    const response = await axios.post(
      `http://ceprj.gachon.ac.kr:60011/board/${id}/comment/write`,
      comment,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log('comment success', response);
    return response;
  } catch (e) {
    console.log(e);
  }
}

//커뮤니티 댓글 삭제

export async function fetchCommentDelete(boardId, commentId, token) {
  try {
    const response = await axios.delete(
      `http://ceprj.gachon.ac.kr:60011/board/${boardId}/comment/delete/${commentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log('delete success', response);
    return response;
  } catch (e) {
    console.log(e);
  }
}

//커뮤니티 댓글 수정

export async function fetchUpdateComment(
  boardId,
  commentId,
  updateComment,
  token
) {
  try {
    const response = await axios.patch(
      `http://ceprj.gachon.ac.kr:60011/board/${boardId}/comment/update/${commentId}`,
      updateComment,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log('success, response: ', response);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

//고객센터 문의리스트

export async function fetchInquire() {
  try {
    const response = await axios.get(
      'http://ceprj.gachon.ac.kr:60011/inquiry/list'
    );
    console.log('success, response: ', response);
    return response;
  } catch (e) {
    console.log(e);
  }
}
//고객센터 문의하기 글쓰기

export async function fetchInquireWrite(inquriy, token) {
  try {
    const response = await axios.post(
      'http://ceprj.gachon.ac.kr:60011/inquiry/write',
      inquriy,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log('success, response: ', response);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

//고객센터 문의 상세보기
export async function fetchInquiryDetail(inquiryId, token) {
  try {
    const response = await axios.get(
      `http://ceprj.gachon.ac.kr:60011/inquiry/${inquiryId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log('success, response: ', response);
    return response;
  } catch (e) {
    console.log(e);
  }
}

//관리자 전체 사용자 조회
export async function fetchAdminUserInfo() {
  try {
    const response = await axios.get(
      `http://ceprj.gachon.ac.kr:60011/admin/user/list`
    );
    console.log('success, response: ', response);
    return response;
  } catch (e) {
    console.log(e);
  }
}

//관리자 사용자 삭제
export async function fetchAdminUserDelete(id) {
  try {
    const response = await axios.delete(
      `http://ceprj.gachon.ac.kr:60011/user/delete/${id}`
    );
    console.log('delete success: ', response);
  } catch (e) {
    console.log(e);
  }
}

//관리자 전체 커뮤니티 조회
export async function fetchAdminCommunityInfo() {
  try {
    const response = await axios.get(
      `http://ceprj.gachon.ac.kr:60011/admin/board/list`
    );
    console.log('success, response: ', response);
    return response;
  } catch (e) {
    console.log(e);
  }
}

//관리자 사용자 삭제
export async function fetchAdminCommunityDelete(id) {
  try {
    const response = await axios.delete(
      `http://ceprj.gachon.ac.kr:60011/board/delete/${id}`
    );
    console.log('delete success: ', response);
  } catch (e) {
    console.log(e);
  }
}

//관리자 전체 문의글 조회
export async function fetchAdminInquiry() {
  try {
    const response = await axios.get(
      `http://ceprj.gachon.ac.kr:60011/admin/inquiry/list`
    );
    console.log('success, response: ', response);
    return response;
  } catch (e) {
    console.log(e);
  }
}

//관리자 문의글 삭제
export async function fetchAdminInquiryDelete(id) {
  try {
    const response = await axios.delete(
      `http://ceprj.gachon.ac.kr:60011/admin/inquiry/delete/${id}`
    );
    console.log('success, response: ', response);
    return response;
  } catch (e) {
    console.log(e);
  }
}

//관리자 문의글 답변
export async function fetchAdminInquiryanswer(id) {
  try {
    const response = await axios.patch(
      `http://ceprj.gachon.ac.kr:60011/admin/inquiry/${id}/answer`
    );
    console.log('success, response: ', response);
  } catch (e) {
    console.log(e);
  }
}

//마이페이지 활동내역(커뮤니티 글)
export async function fetchMyPageCommunity(token) {
  try {
    const response = await axios.get(
      `http://ceprj.gachon.ac.kr:60011/mypage/board/list`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log('success, response: ', response);
    return response;
  } catch (e) {
    console.log(e);
  }
}

//마이페이지 활동내역(댓글)
export async function fetchMyPageComment(token) {
  try {
    const response = await axios.get(
      `http://ceprj.gachon.ac.kr:60011/mypage/comment/list`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log('success, response: ', response);
    return response;
  } catch (e) {
    console.log(e);
  }
}

//마이페이지 문의내역
export async function fetchMyPageInquiry(token) {
  try {
    const response = await axios.get(
      `http://ceprj.gachon.ac.kr:60011/mypage/inquiry/list`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log('success, response: ', response);
    return response;
  } catch (e) {
    console.log(e);
  }
}
