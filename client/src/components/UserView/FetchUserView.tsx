import { FC } from 'react';
import { fetchUser } from '../../api/User';
import { useQuery } from '@tanstack/react-query';
import { queryClient } from '../../api/queryClient';
import { UserView } from './';
import { Loader } from '../Loader';

interface FetchUserViewProps {
  userId: string;
}

export const FetchUserView: FC<FetchUserViewProps> = ({ userId }) => {
  const userQuery = useQuery(
    {
      queryFn: () => fetchUser(userId),
      queryKey: ['users', userId],
    },
    queryClient,
  );

  switch (userQuery.status) {
    case 'pending':
      return <Loader />;
    case 'success':
      return <UserView user={userQuery.data} />;
    case 'error':
      return (
        <div>
          <span>Произошла ошибка :(</span>&nbsp;
          <button onClick={() => userQuery.refetch()}>Повторить запрос</button>
        </div>
      );
  }
};
