import { upperFirst } from 'lodash';

export function arrayToObjectHack(array) {
  const hashMap = {};
  for (let i = 0; i < array.length; i += 2) {
    hashMap[upperFirst(array[i])] = array[i + 1];
  }
  return hashMap;
}

export function stateAdapterHack(hashMap) {
  const retHashMap = {};

  const specialCases = ['Northwest', 'New', 'Brunswick', 'Nova', 'Scotia', 'British', 'Columbia', 'Prince', 'Edward', 'Island', 'Nunavut', 'Territory', 'Newfoundland', 'And', 'Labrador'];

    // 'british columbia'
  retHashMap['British Columbia'] = hashMap.British;

    // 'nunavut territory'
  retHashMap['Nunavut Territory'] = hashMap.Nunavut;

    // 'nova scotia'
  retHashMap['Nova Scotia'] = hashMap.Nova;

    // 'new brunswick'
  retHashMap['New Brunswick'] = hashMap.Brunswick;

    // 'prince edward island'
  retHashMap['Prince Edward Island'] = hashMap.Prince;

    // 'newfoundland and labrador'
  retHashMap['Newfoundland and Labrador'] = hashMap.Newfoundland;

    // All others
  Object.keys(hashMap).forEach((key) => {
    if (specialCases.indexOf(key) === -1) {
      retHashMap[key] = hashMap[key];
    }
  });

  return retHashMap;
}
