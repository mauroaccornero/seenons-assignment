const getItems = async <ResultType>(path: string): Promise<ResultType> => {
  const data = await (await fetch(window.location.origin + path)).json();
  return data;
};

export default getItems;
