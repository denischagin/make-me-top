import { useAppSelector } from '@app/providers/store/hooks';
// TODO
export const useAuth = () => useAppSelector((state) => state.viewer);
