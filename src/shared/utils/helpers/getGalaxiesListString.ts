export const getGalaxiesListString = (galaxies: { galaxyName: string }[]) => {
    return `${!!galaxies.length ? galaxies.map(({ galaxyName }) => galaxyName).join(', ') : '-'} `;
};
