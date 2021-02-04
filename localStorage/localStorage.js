export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  }
  catch { }
}

export const getPageSizeFromLS = () => {
  try {
    const serializedState = localStorage.getItem('pageSize');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  }
  catch { }
}