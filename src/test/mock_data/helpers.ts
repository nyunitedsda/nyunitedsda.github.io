import {
	announcements,
	articles,
	contactInfos,
	donations,
	notifications,
	roles,
	services,
	severity,
	users,
} from "./index";

const entities = {
	announcements,
	articles,
	contact_info: contactInfos,
	donations,
	notifications,
	roles,
	services,
	severity,
	users,
} as const;

type EntitiesKey = keyof typeof entities;

const getMockEntity = async (entity: EntitiesKey) => {
	return await Promise.resolve({data:entities[entity]});
};

export { getMockEntity, type EntitiesKey };
