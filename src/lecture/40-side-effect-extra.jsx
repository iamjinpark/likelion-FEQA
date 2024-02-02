import { Stack } from '@/components';
import { useEffect, useState } from 'react';

function Exercise() {
  // 사용자 목록 정보를 상태로 관리
  const [users, setUsers] = useState(null);

  useEffect(() => {
    // 네트워크 요청을 중단 인터페이스 제공
    const controller = new AbortController();

    // 네트워크 1회 요청
    fetch('https://jsonplaceholder.typicode.com/users', {
      signal: controller.signal,
    })
      // 응답
      .then((response) => {
        return response.json();
      })
      .then((jsonData) => {
        setUsers(jsonData);
      })
      .catch((error) => {
        console.error(error);
      });

    return () => {
      controller.abort();
    };
  }, []);

  // 사용자 목록 정보 순환 조회된 사용자 정보 표시
  // 리스트 렌더링
  return (
    <Stack vertical gap={6}>
      {users?.map((user) => {
        return <span key={user.id}>{user.email}</span>;
      })}
    </Stack>
  );
}

export default Exercise;
