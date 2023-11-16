import { roles } from '@shared/constants/storageKeys';
import { ReactElement } from 'react';
import { ThemeCardHomeworkExplorer } from '@widgets/ThemeCardHomework/ui/ThemeCardHomeworkExplorer';
import { ThemeCardHomeworkKeeper } from '@widgets/ThemeCardHomework/ui/ThemeCardHomeworkKeeper';
import { useAuth } from '@entities/viewer';

const themeCardHomeworkByRole: Record<roles, ReactElement> = {
	EXPLORER: <ThemeCardHomeworkExplorer />,
	KEEPER: <ThemeCardHomeworkKeeper />
};

export const ThemeCardHomework = () => {
	const { role } = useAuth()
	return !!role ? themeCardHomeworkByRole[role] : null
}