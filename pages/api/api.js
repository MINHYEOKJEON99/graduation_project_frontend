import axios from 'axios';

//로그인
export async function fetchLogin(userInfo) {
  try {
    const response = await axios.post(
      'http://ceprj.gachon.ac.kr:60011/user/login',
      userInfo
    );
    return response.data.token;
  } catch (e) {
    alert(`아이디와 비밀번호를 확인해주세요`);
    console.log(e);
  }
}

//로그인된 사용자 정보
export async function fetchMyPageUserInfo(token) {
  try {
    const response = await axios.get(
      'http://ceprj.gachon.ac.kr:60011/mypage/user/update',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
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

    return response;
  } catch (e) {
    console.log(e);
    return false;
  }
}

//커뮤니티 파일 업로드
export async function fetchCommunityFileUpload(file, token, boardId) {
  try {
    const response = await axios.post(
      `http://ceprj.gachon.ac.kr:60011/board/${boardId}/file/upload`,
      file,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
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

    return response;
  } catch (e) {
    console.log(e);
  }
}

//관리자 문의글 답변
export async function fetchAdminInquiryanswer(id, answer) {
  try {
    const response = await axios.patch(
      `http://ceprj.gachon.ac.kr:60011/admin/inquiry/${id}/answer`,
      answer
    );
  } catch (e) {
    console.log(e);
  }
}

//마이페이지 회원정보수정
export async function fetchMyPageUpdate(updateInfo, token) {
  try {
    const response = await axios.patch(
      `http://ceprj.gachon.ac.kr:60011/mypage/user/update`,
      updateInfo,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
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

    return response;
  } catch (e) {
    console.log(e);
  }
}

//마이페이지 게시글 삭제
export async function fetchMyPageCommunityDelete(id, token) {
  try {
    const response = await axios.delete(
      `http://ceprj.gachon.ac.kr:60011/mypage/board/list/${id}/delete`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (e) {
    console.log(e);
  }
}

//마이페이지 댓글 삭제
export async function fetchMyPageCommentDelete(id, token) {
  try {
    const response = await axios.delete(
      `http://ceprj.gachon.ac.kr:60011/mypage/comment/list/${id}/delete`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (e) {
    console.log(e);
  }
}

//마이페이지 회원탈퇴
export async function fetchMyPageUserDelete(id, token) {
  try {
    const response = await axios.delete(
      `http://ceprj.gachon.ac.kr:60011/mypage/user/update/${id}/delete`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (e) {
    console.log(e);
  }
}

//ai 비디오 파일 다운로드
export async function fetchVideo(token) {
  try {
    const response = await axios.get(
      `http://ceprj.gachon.ac.kr:60011/video/download?videoId=6`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob',
      }
    );

    const videoURL = window.URL.createObjectURL(response.data);
    return videoURL;
  } catch (e) {
    console.log(e);
  }
}

//ai 비디오 파일 업로드
export async function fetchVideoUpload(formData, token) {
  try {
    const response = await axios.post(
      `http://61.79.137.116:5000/detect`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error('업로드 에러:', error);
  }
}
