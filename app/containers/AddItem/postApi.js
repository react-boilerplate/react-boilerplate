export const postApi = async action => {
  const { item } = action;
  try {
    const response = await fetch('/api/addItem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({ item }),
    });
    console.log(response.status);
  } catch (e) {
    console.log(e);
  }
};
