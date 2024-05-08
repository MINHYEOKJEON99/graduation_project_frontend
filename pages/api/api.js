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
