export const FILTER_BY_DIET = 'FILTER_BY_DIET';

export const filterByDiet = (diet) => ({
  type: FILTER_BY_DIET,
  diet,
});

export const FILTER_BY_ORIGIN = 'FILTER_BY_ORIGIN';

export const filterByOrigin = (origin) => ({
  type: FILTER_BY_ORIGIN,
  origin,
});

