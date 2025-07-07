'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { UserApiRepository } from '../../infrastructure/api/user-api.repository';
import { UserDTO } from '../../application/dto/user.dto';

/**
 * Custom hook to fetch user data by ID.
 */
export function useUser(userId: string | undefined) {
  const userRepository = new UserApiRepository();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      if (!userId) return null;
      return await userRepository.findById(userId);
    },
    enabled: !!userId,
  });

  const updateUser = useMutation({
    mutationFn: async (userData: Partial<UserDTO>) => {
      return await userRepository.update(userData);
    },
    onSuccess: () => {
      refetch();
    },
  });

  return { data, isLoading, isError, updateUser };
}
