import { useAppSelector } from '@app/providers/store/hooks';

export const useAuth = () => useAppSelector((state) => state.viewer);
