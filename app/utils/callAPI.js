const callAPI = async (api) => {
  try {
    const response = await fetch(api);
    let res = await response.json();

    // manipulate the response to make it more usable
    let main = { ...res.main };
    const temp = Math.floor(main.temp);
    main = { ...main, temp };
    res = { ...res, main };
    return res;
  } catch (err) {
    console.log(err);
  }
};

export default callAPI;
