export const addGet = (state) => {
  console.info(state.count)
  return state.count;
};

export const getUserId = (state) => {
  console.info('state is = '+state);
  console.info(state.id);
  return state.id;
};
