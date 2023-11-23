export interface ReviewInterface {
	planet: string;
	rating: number | null;
	name: string;
	avatar: string;
	comment: string;
	id?: number;
}

export interface KeeperState {
	isKeeper: boolean;
	keeperInfo: KeeperInfoInterface;
	keeperCardInfo: KeeperCardInfoInterface;
	keepersList: KeepersFilterInterface[];
}

export interface KeeperCourseAcceptedRequest {
	personId: number;
	requestId: number;
	firstName: string;
	lastName: string;
	patronymic: string;
	rating: number;
	responseDate: string;
}

export interface KeeperCourseGroupAcceptedRequests {
	courseTitle: string;
	courseId: number;
	requests: KeeperCourseAcceptedRequest[];
}

export interface KeeperCurrentGroupInterface {
	courseId: number;
	courseTitle: string;
	groupId: number;
	keeperId: number;
	explorers: StudyingExplorersInterface[];
}

export interface KeeperInfoInterface {
	person: Person;
	rating?: number | null;
	totalSystems: number;
	totalExplorers: number;
	studyingExplorers: Array<StudyingExplorersInterface>;
	studyRequests: StudyRequestGroupInterface[];
	finalAssessments: Array<FinalAssessmentsInterface>;
	reviewRequests: Array<ReviewRequestsInterface>;
	approvedRequests: KeeperCourseGroupAcceptedRequests[];
	currentGroup: KeeperCurrentGroupInterface;
}


export interface KeepersFilterInterface {
	personId: number;
	firstName: string;
	lastName: string;
	patronymic: string;
	rating: number;
	systems: number[];
	galaxyId: number;
	galaxyName: string;
}

export interface Person {
	personId: number;
	firstName: string;
	lastName: string;
	patronymic: string;
	registrationDate: string;
	maxExplorers: number;
}

export interface StudyingExplorersInterface {
	personId: number;
	firstName: string;
	lastName: string;
	patronymic: string;
	explorerId: number;
	courseId: number;
	groupId: number;
}

export interface StudyRequestsInterface {
	personId: number;
	firstName: string;
	lastName: string;
	patronymic: string;
	courseId: number;
	courseTitle: string;
	requestId: number;
	galaxyName: string;
	keeperId: number;
	rating: number;
	requestDate: string;
}

export interface StudyRequestGroupInterface {
	courseId: number;
	courseTitle: string;
	requests: StudyRequestsInterface[];
}

export type StudyRequestsGroupObject = Record<string, StudyRequestsInterface[]>


export interface FinalAssessmentsInterface {
	personId: number;
	firstName: string;
	lastName: string;
	patronymic: string;
	courseId: number;
	courseTitle: string;
	explorerId: number;
}

export interface ReviewRequestsInterface {
	personId: number;
	firstName: string;
	lastName: string;
	patronymic: string;
	courseId: number;
	courseTitle: string;
	requestId: number;
	explorerId: number;
	courseThemeId: number;
	courseThemeTitle: string;
}

export interface KeeperCardInfoInterface {
	person: Person;
	rating: number | null;
	totalSystems: number;
	totalExplorers: number;
	systems: Array<System>;
	feedback: Array<Feedback>;
}

export interface System {
	courseId: number;
	title: string;
	rating: number | null;
}

export interface Feedback {
	personId: number;
	firstName: string;
	lastName: string;
	patronymic: string;
	explorerId: number;
	courseId: number;
	courseTitle: string;
	rating: number | null;
	comment: string;
}
