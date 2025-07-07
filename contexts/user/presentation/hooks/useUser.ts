"use client";

import { useQuery } from "@tanstack/react-query";
import { UserApiRepository } from "../../infrastructure/api/user-api.repository";

/**
 * Custom hook to fetch user data by ID.
 */
export function useUser(userId: string | undefined) {
  const userRepository = new UserApiRepository();

  return useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      if (!userId) return null;
      return await userRepository.findById(userId);
    },
    enabled: !!userId,
  });
}
